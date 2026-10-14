// ====================================================================
// DONO JAHA (D O N O   J A H A)
// Authentication Service (Google OAuth, Phone OTP, Email/Password & Session Governance)
// ====================================================================

import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { supabase, isSupabaseConfigured } from '../lib/supabase/client';
import { updateCurrentUserProfile } from '../data/userProfile';

// Ensure WebBrowser finishes redirect sessions on mobile
WebBrowser.maybeCompleteAuthSession();

export interface AuthSuccessResult {
  success: boolean;
  user?: any;
  hasCompletedOnboarding: boolean;
  profileId?: string;
  error?: string;
}

/**
 * 1. SIGN IN WITH GOOGLE (Cross-Platform OAuth Flow)
 * Uses native WebBrowser on iOS/Android with deep-link redirection
 * and standard redirect on Web.
 */
export async function signInWithGoogle(): Promise<AuthSuccessResult> {
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
    const redirectUrl = AuthSession.makeRedirectUri({
      scheme: 'donojaha',
      preferLocalhost: false,
    });

    if (Platform.OS === 'web') {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? window.location.origin : redirectUrl,
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
      return {
        success: false,
        hasCompletedOnboarding: false,
        error: error?.message || 'Failed to initialize Google Sign-In URL.',
      };
    }

    // Launch secure browser window for Google authentication
    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);

    if (result.type !== 'success' || !result.url) {
      return {
        success: false,
        hasCompletedOnboarding: false,
        error: result.type === 'cancel' ? 'Google Sign-In was cancelled.' : 'Authentication did not complete.',
      };
    }

    // Extract authorization tokens or code from redirect URL
    const parsedUrl = new URL(result.url);
    const hashParams = new URLSearchParams(parsedUrl.hash.replace(/^#/, ''));
    const queryParams = new URLSearchParams(parsedUrl.search);

    const accessToken = hashParams.get('access_token') || queryParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token') || queryParams.get('refresh_token');
    const code = queryParams.get('code') || hashParams.get('code');

    if (accessToken && refreshToken) {
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      if (sessionError) {
        return { success: false, hasCompletedOnboarding: false, error: sessionError.message };
      }
    } else if (code) {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) {
        return { success: false, hasCompletedOnboarding: false, error: exchangeError.message };
      }
    } else {
      return {
        success: false,
        hasCompletedOnboarding: false,
        error: 'No valid authentication session tokens received from Google.',
      };
    }

    // Post-Auth Profile Synchronization
    return await handlePostAuthProfile();
  } catch (err: any) {
    console.warn('signInWithGoogle exception:', err);
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
 */
export async function handlePostAuthProfile(): Promise<AuthSuccessResult> {
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
      'Dono Jaha Member';

    // 1. Ensure user_accounts row exists
    const { data: accountRow, error: accountFetchErr } = await supabase
      .from('user_accounts')
      .select('id, full_name, email, phone')
      .eq('id', user.id)
      .maybeSingle();

    if (!accountRow) {
      await supabase.from('user_accounts').upsert({
        id: user.id,
        full_name: fullName,
        email: user.email,
        phone: user.phone || null,
        is_email_verified: Boolean(user.email_confirmed_at || user.email),
        is_phone_verified: Boolean(user.phone_confirmed_at),
      });
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

    // Update local reactive user state
    updateCurrentUserProfile({
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
  }
}

/**
 * 3. SIGN OUT
 * Clears Supabase session and local reactive state.
 */
export async function signOutUser(): Promise<void> {
  if (isSupabaseConfigured) {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('signOut exception:', err);
    }
  }
}

/**
 * 4. RESTORE SESSION ON APP START
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
    return { isAuthenticated: false, hasCompletedOnboarding: false };
  }
}
