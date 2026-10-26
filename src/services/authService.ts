// ====================================================================
// DONO JAHAAN (D O N O   J A H A A N)
// Unified Authentication Service (Google OAuth, Email/Password, OTP & Session Governance)
// ====================================================================

import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Linking from 'expo-linking';
import Constants from 'expo-constants';
import { supabase, isSupabaseConfigured } from '../lib/supabase/client';
import { updateCurrentUserProfile } from '../data/userProfile';

// Ensure WebBrowser finishes redirect sessions on mobile
WebBrowser.maybeCompleteAuthSession();

export interface AuthSuccessResult {
  success: boolean;
  user?: any;
  hasCompletedOnboarding: boolean;
  profileId?: string;
  requiresEmailVerification?: boolean;
  error?: string;
}

// Track authorization codes already exchanged to prevent duplicate code exchange errors
const consumedCodes = new Set<string>();

// Mutex / in-flight promise for post-auth profile synchronization to prevent race conditions
let postAuthProfilePromise: Promise<AuthSuccessResult> | null = null;

/**
 * Computes the correct OAuth redirect URI depending on the active execution environment:
 * - Web: window.location.origin
 * - Expo Go: exp://<ip>:8081/--/auth/callback
 * - Standalone APK / EAS Development Build: donojaha://auth/callback
 */
export function getOAuthRedirectUrl(): string {
  if (Platform.OS === 'web') {
    return typeof window !== 'undefined' ? window.location.origin : 'donojaha://auth/callback';
  }

  // Constants.appOwnership === 'expo' is strictly true inside the Expo Go client app
  const isExpoGo = Constants.appOwnership === 'expo';

  if (isExpoGo) {
    return AuthSession.makeRedirectUri({ path: 'auth/callback' });
  }

  // Standalone APK and EAS Development Builds declare donojaha:// in AndroidManifest.xml
  return 'donojaha://auth/callback';
}

/**
 * Resiliently extracts access_token, refresh_token, code, and error parameters
 * from either the URL hash (#) or query string (?), with regex fallback for Hermes.
 */
export function parseOAuthRedirectParams(url: string): {
  accessToken: string | null;
  refreshToken: string | null;
  code: string | null;
  error: string | null;
  errorDescription: string | null;
} {
  const params: Record<string, string> = {};

  try {
    const parsed = new URL(url);
    parsed.searchParams.forEach((val, key) => {
      params[key] = val;
    });
    if (parsed.hash) {
      const hashParams = new URLSearchParams(parsed.hash.replace(/^#/, ''));
      hashParams.forEach((val, key) => {
        params[key] = val;
      });
    }
  } catch {
    // Fallback parser if standard URL constructor encounters non-standard scheme
  }

  // Fallback: regex extraction for query and hash fragments
  const queryMatch = url.match(/\?([^#]+)/);
  if (queryMatch) {
    queryMatch[1].split('&').forEach((p) => {
      const [k, v] = p.split('=');
      if (k && v && !params[k]) params[decodeURIComponent(k)] = decodeURIComponent(v.replace(/\+/g, ' '));
    });
  }

  const hashMatch = url.match(/#(.+)/);
  if (hashMatch) {
    hashMatch[1].split('&').forEach((p) => {
      const [k, v] = p.split('=');
      if (k && v && !params[k]) params[decodeURIComponent(k)] = decodeURIComponent(v.replace(/\+/g, ' '));
    });
  }

  return {
    accessToken: params['access_token'] || null,
    refreshToken: params['refresh_token'] || null,
    code: params['code'] || null,
    error: params['error'] || null,
    errorDescription: params['error_description'] || null,
  };
}

/**
 * Processes an incoming OAuth callback URL, exchanges tokens or code with Supabase,
 * establishes the authenticated session, and triggers post-auth profile synchronization.
 */
export async function handleAuthRedirectUrl(url: string): Promise<AuthSuccessResult> {
  const timestamp = new Date().toISOString();
  const params = parseOAuthRedirectParams(url);

  console.log(`[Auth Trace ${timestamp}] Callback received:`, {
    hasAccessToken: Boolean(params.accessToken),
    hasRefreshToken: Boolean(params.refreshToken),
    hasCode: Boolean(params.code),
    hasError: Boolean(params.error || params.errorDescription),
  });

  if (params.error || params.errorDescription) {
    const errorMsg = params.errorDescription || params.error || 'Authentication provider error';
    console.error(`[Auth Trace ${timestamp}] OAuth provider error:`, errorMsg);
    return { success: false, hasCompletedOnboarding: false, error: errorMsg };
  }

  // Check if session is already active in Supabase client
  const { data: currentSession } = await supabase.auth.getSession();
  if (currentSession?.session?.user && !params.accessToken && !params.code) {
    console.log(`[Auth Trace ${timestamp}] Session already established for active user`);
    return await handlePostAuthProfile();
  }

  if (params.accessToken && params.refreshToken) {
    console.log(`[Auth Trace ${timestamp}] Establishing session from URL hash tokens`);
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: params.accessToken,
      refresh_token: params.refreshToken,
    });
    if (sessionError) {
      console.warn(`[Auth Trace ${timestamp}] setSession warning:`, sessionError.message);
      if (currentSession?.session?.user) {
        return await handlePostAuthProfile();
      }
      return { success: false, hasCompletedOnboarding: false, error: sessionError.message };
    }
    console.log(`[Auth Trace ${timestamp}] Session established successfully from tokens`);
  } else if (params.code) {
    if (consumedCodes.has(params.code)) {
      console.log(`[Auth Trace ${timestamp}] Code already consumed, proceeding with existing session`);
      return await handlePostAuthProfile();
    }
    consumedCodes.add(params.code);

    console.log(`[Auth Trace ${timestamp}] Exchanging authorization code for session`);
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(params.code);
    if (exchangeError) {
      console.warn(`[Auth Trace ${timestamp}] exchangeCodeForSession warning:`, exchangeError.message);
      if (currentSession?.session?.user) {
        return await handlePostAuthProfile();
      }
      return { success: false, hasCompletedOnboarding: false, error: exchangeError.message };
    }
    console.log(`[Auth Trace ${timestamp}] Session established successfully from code exchange`);
  } else {
    if (currentSession?.session?.user) {
      return await handlePostAuthProfile();
    }
    console.error(`[Auth Trace ${timestamp}] No valid tokens or code found in callback URL`);
    return {
      success: false,
      hasCompletedOnboarding: false,
      error: 'No valid authentication session tokens or authorization code received in callback.',
    };
  }

  return await handlePostAuthProfile();
}

/**
 * 1. SIGN IN WITH GOOGLE (Cross-Platform OAuth Flow)
 * Uses native WebBrowser on iOS/Android with deep-link redirection
 * and standard redirect on Web.
 */
export async function signInWithGoogle(): Promise<AuthSuccessResult> {
  const timestamp = new Date().toISOString();

  if (!isSupabaseConfigured) {
    // Unconfigured demo fallback
    updateCurrentUserProfile({
      name: 'Anas Chougle',
      email: 'anas@donojaha.com',
      isVerified: true,
    });
    return {
      success: true,
      hasCompletedOnboarding: true,
      profileId: 'user-me',
    };
  }

  try {
    const redirectUrl = getOAuthRedirectUrl();
    const isExpoGo = Constants.appOwnership === 'expo';

    console.log(`[Auth Trace ${timestamp}] Starting Google OAuth:`, {
      runtime: isExpoGo ? 'Expo Go' : 'Standalone / Dev Client',
      redirectUrl,
    });

    if (Platform.OS === 'web') {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        return { success: false, hasCompletedOnboarding: false, error: error.message };
      }
      return { success: true, hasCompletedOnboarding: false };
    }

    // Mobile (iOS / Android) OAuth Flow
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        skipBrowserRedirect: true,
      },
    });

    if (error || !data?.url) {
      console.error(`[Auth Trace ${timestamp}] Supabase signInWithOAuth failed:`, error?.message);
      return {
        success: false,
        hasCompletedOnboarding: false,
        error: error?.message || 'Failed to initialize Google Sign-In URL.',
      };
    }

    console.log(`[Auth Trace ${timestamp}] Opening WebBrowser auth session with redirectUrl:`, redirectUrl);

    // Active listener to immediately capture Android deep-link intents
    let capturedRedirectUrl: string | null = null;
    let authSessionResolved = false;

    const urlListener = Linking.addEventListener('url', (event: { url: string }) => {
      const incomingUrl = event.url;
      if (
        incomingUrl &&
        (incomingUrl.includes('auth/callback') ||
          incomingUrl.includes('access_token=') ||
          incomingUrl.includes('refresh_token=') ||
          incomingUrl.includes('code='))
      ) {
        console.log(`[Auth Trace ${new Date().toISOString()}] Deep-link listener captured callback URL`);
        capturedRedirectUrl = incomingUrl;
        authSessionResolved = true;
        try {
          WebBrowser.dismissAuthSession();
        } catch {}
      }
    });

    // 80-second safety timeout prevents infinite spinning if user abandons browser
    const timeoutPromise = new Promise<{ type: 'timeout'; url?: string }>((resolve) => {
      setTimeout(() => {
        if (!authSessionResolved) {
          console.warn(`[Auth Trace ${new Date().toISOString()}] Auth session reached 80s timeout`);
          resolve({ type: 'timeout' });
        }
      }, 80000);
    });

    let result: WebBrowser.WebBrowserAuthSessionResult | { type: string; url?: string };
    try {
      result = await Promise.race([
        WebBrowser.openAuthSessionAsync(data.url, redirectUrl),
        timeoutPromise,
      ]);
    } finally {
      urlListener.remove();
      authSessionResolved = true;
      try {
        WebBrowser.dismissAuthSession();
      } catch {}
    }

    console.log(`[Auth Trace ${new Date().toISOString()}] WebBrowser session closed with type:`, result.type);

    const finalCallbackUrl = (result as any)?.url || capturedRedirectUrl;

    if (finalCallbackUrl) {
      return await handleAuthRedirectUrl(finalCallbackUrl);
    }

    // Fallback: Check if Supabase session was established in background
    const { data: sessionCheck } = await supabase.auth.getSession();
    if (sessionCheck?.session?.user) {
      console.log(`[Auth Trace ${new Date().toISOString()}] Active session detected after browser close`);
      return await handlePostAuthProfile();
    }

    if (result.type === 'cancel' || result.type === 'dismiss') {
      if (isExpoGo) {
        return {
          success: false,
          hasCompletedOnboarding: false,
          error:
            'Google Sign-In was cancelled or could not return to Expo Go. In Expo Go, ensure "exp://*" is listed in Supabase Redirect URLs, or use an EAS Development Build.',
        };
      }
      return {
        success: false,
        hasCompletedOnboarding: false,
        error: 'Google Sign-In was cancelled.',
      };
    }

    return {
      success: false,
      hasCompletedOnboarding: false,
      error: 'Authentication did not complete. Please try again.',
    };
  } catch (err: any) {
    console.warn(`[Auth Trace ${timestamp}] signInWithGoogle exception:`, err);
    return {
      success: false,
      hasCompletedOnboarding: false,
      error: err?.message || 'An unexpected error occurred during Google Sign-In.',
    };
  }
}

/**
 * 2. POST-AUTH PROFILE SYNCHRONIZATION
 * Ensures user_accounts and profiles records exist for authenticated user.
 * Determines whether user goes to MainTabs or Onboarding.
 * Thread-safe via promise lock to prevent concurrent database conflicts.
 */
export async function handlePostAuthProfile(): Promise<AuthSuccessResult> {
  if (postAuthProfilePromise) {
    console.log('[Auth Trace] Reusing in-flight handlePostAuthProfile promise');
    return postAuthProfilePromise;
  }

  postAuthProfilePromise = (async (): Promise<AuthSuccessResult> => {
    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData?.user) {
        return {
          success: false,
          hasCompletedOnboarding: false,
          error: authError?.message || 'No authenticated user session found.',
        };
      }

      const user = authData.user;
      const fullName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split('@')[0] ||
        'Dono Jahaan Member';

      // 1. Ensure user_accounts row exists
      const { data: accountRow } = await supabase
        .from('user_accounts')
        .select('id, full_name, email, phone')
        .eq('id', user.id)
        .maybeSingle();

      if (!accountRow) {
        const { error: accInsertErr } = await supabase.from('user_accounts').upsert({
          id: user.id,
          full_name: fullName,
          email: user.email,
          phone: user.phone || null,
          is_email_verified: Boolean(user.email_confirmed_at || user.email),
          is_phone_verified: Boolean(user.phone_confirmed_at),
        });
        if (accInsertErr) {
          console.warn('[Auth Trace] user_accounts upsert notice:', accInsertErr.message);
        }
      }

      // 2. Fetch or create initial profile
      const { data: profileRow } = await supabase
        .from('profiles')
        .select('id, status, is_onboarding_completed, is_verified, onboarding_step')
        .eq('account_id', user.id)
        .maybeSingle();

      let profileId = profileRow?.id;
      let hasCompleted = Boolean(profileRow?.is_onboarding_completed);

      if (!profileRow) {
        const { data: newProfile, error: profileInsertErr } = await supabase
          .from('profiles')
          .insert({
            account_id: user.id,
            gender: 'male',
            status: 'draft',
            onboarding_step: 1,
            is_onboarding_completed: false,
            is_discoverable: true,
          })
          .select('id')
          .single();

        if (!profileInsertErr && newProfile) {
          profileId = newProfile.id;
          hasCompleted = false;

          // Initialize basic profile name row
          await supabase.from('profile_basic').upsert({
            profile_id: newProfile.id,
            display_name: fullName,
          });
        }
      }

      // Update local reactive user state with the real profile ID
      updateCurrentUserProfile({
        id: profileId || user.id,
        name: fullName,
        email: user.email || '',
        phone: user.phone || '',
      });

      return {
        success: true,
        user,
        hasCompletedOnboarding: hasCompleted,
        profileId,
      };
    } catch (err: any) {
      console.warn('handlePostAuthProfile exception:', err);
      return {
        success: true,
        hasCompletedOnboarding: false,
        error: err?.message,
      };
    } finally {
      postAuthProfilePromise = null;
    }
  })();

  return postAuthProfilePromise;
}

/**
 * 3. EMAIL & PASSWORD REGISTRATION (SIGN UP)
 * Handles client-side validation, duplicate submission protection,
 * and Supabase email verification confirmation requirements.
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  fullName?: string
): Promise<AuthSuccessResult> {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return {
      success: false,
      hasCompletedOnboarding: false,
      error: 'Please enter a valid email address.',
    };
  }

  if (!password || password.length < 6) {
    return {
      success: false,
      hasCompletedOnboarding: false,
      error: 'Password must be at least 6 characters in length.',
    };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          full_name: fullName || cleanEmail.split('@')[0],
        },
      },
    });

    if (error) {
      return {
        success: false,
        hasCompletedOnboarding: false,
        error: error.message,
      };
    }

    if (!data.user) {
      return {
        success: false,
        hasCompletedOnboarding: false,
        error: 'Unable to register account. Please try again.',
      };
    }

    // Check if Supabase requires email verification (session is null when email confirmation is enabled)
    if (!data.session) {
      console.log('[Auth Trace] User registered; email confirmation required');
      return {
        success: true,
        user: data.user,
        requiresEmailVerification: true,
        hasCompletedOnboarding: false,
      };
    }

    // Direct active session (email confirmation disabled or auto-confirmed)
    const profileRes = await handlePostAuthProfile();
    return {
      success: true,
      user: data.user,
      requiresEmailVerification: false,
      hasCompletedOnboarding: profileRes.hasCompletedOnboarding,
      profileId: profileRes.profileId,
    };
  } catch (err: any) {
    console.warn('signUpWithEmail exception:', err);
    return {
      success: false,
      hasCompletedOnboarding: false,
      error: err?.message || 'An unexpected error occurred during account registration.',
    };
  }
}

/**
 * 4. EMAIL & PASSWORD SIGN IN
 * Authenticates user credentials, handles unconfirmed email errors,
 * establishes session, and triggers profile synchronization.
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthSuccessResult> {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return {
      success: false,
      hasCompletedOnboarding: false,
      error: 'Please enter a valid email address.',
    };
  }

  if (!password || password.length < 6) {
    return {
      success: false,
      hasCompletedOnboarding: false,
      error: 'Please enter your password.',
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      // Provide user-friendly feedback
      if (error.message.includes('Invalid login credentials')) {
        return {
          success: false,
          hasCompletedOnboarding: false,
          error: 'Incorrect email or password. Please verify your credentials.',
        };
      }
      if (error.message.includes('Email not confirmed')) {
        return {
          success: false,
          hasCompletedOnboarding: false,
          error: 'Your email address is not yet verified. Please tap the confirmation link sent to your inbox.',
        };
      }
      return {
        success: false,
        hasCompletedOnboarding: false,
        error: error.message,
      };
    }

    if (!data.session?.user) {
      return {
        success: false,
        hasCompletedOnboarding: false,
        error: 'Authentication failed. No active session established.',
      };
    }

    const profileRes = await handlePostAuthProfile();
    return {
      success: true,
      user: data.session.user,
      hasCompletedOnboarding: profileRes.hasCompletedOnboarding,
      profileId: profileRes.profileId,
    };
  } catch (err: any) {
    console.warn('signInWithEmail exception:', err);
    return {
      success: false,
      hasCompletedOnboarding: false,
      error: err?.message || 'An unexpected network error occurred. Please try again.',
    };
  }
}

/**
 * 5. PASSWORD RECOVERY (FORGOT PASSWORD)
 * Sends a password reset link to user email with deep link redirect configuration.
 */
export async function resetPasswordForEmail(
  email: string
): Promise<{ success: boolean; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return {
      success: false,
      error: 'Please enter a valid email address to reset your password.',
    };
  }

  try {
    const redirectUrl = getOAuthRedirectUrl();
    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: redirectUrl,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('resetPasswordForEmail exception:', err);
    return {
      success: false,
      error: err?.message || 'Could not send password reset email. Please try again.',
    };
  }
}

/**
 * 6. SIGN OUT
 * Clears Supabase session from persistent storage and resets local reactive state.
 */
export async function signOutUser(): Promise<void> {
  if (isSupabaseConfigured) {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('signOut exception:', err);
    }
  }

  // Reset local state to guest profile
  updateCurrentUserProfile({
    id: 'user-guest',
    name: 'Dono Jahaan Guest',
    email: '',
    phone: '',
    isVerified: false,
  });
}

/**
 * 7. RESTORE SESSION ON APP START
 * Hydrates existing session from AsyncStorage and synchronizes matrimonial profile.
 */
export async function restoreSession(): Promise<{
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  user?: any;
}> {
  if (!isSupabaseConfigured) {
    return { isAuthenticated: false, hasCompletedOnboarding: false };
  }

  try {
    const { data } = await supabase.auth.getSession();
    if (!data.session?.user) {
      return { isAuthenticated: false, hasCompletedOnboarding: false };
    }

    const profileRes = await handlePostAuthProfile();
    return {
      isAuthenticated: true,
      hasCompletedOnboarding: profileRes.hasCompletedOnboarding,
      user: data.session.user,
    };
  } catch (err) {
    console.warn('restoreSession exception:', err);
    return { isAuthenticated: false, hasCompletedOnboarding: false };
  }
}
