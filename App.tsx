import React, { Component, ReactNode, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {
  Manrope_600SemiBold,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Platform,
  LogBox,
} from 'react-native';
import * as Linking from 'expo-linking';
import { RootNavigator } from './src/navigation/RootNavigator';
import { colors } from './src/theme/tokens';
import { navigationRef, navigateToScreen } from './src/navigation/navigationService';
import { restoreSession, handleAuthRedirectUrl, handlePostAuthProfile } from './src/services/authService';
import { getMyProfile } from './src/services/profileService';
import { supabase } from './src/lib/supabase/client';

// Suppress transient dev environment warnings in Expo Go
LogBox.ignoreLogs([
  'Cannot connect to Expo CLI',
  'Native ExponentAV module not found in current runtime',
  '[Dono Jahaan Audio]',
]);

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.surface,
    card: colors.surface,
    text: colors.onSurface,
    border: colors.surfaceContainer,
  },
};

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('App render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>D O N O   J A H A A N</Text>
          <Text style={styles.errorSubtitle}>An issue occurred during screen render:</Text>
          <View style={styles.errorBox}>
            <Text style={styles.errorMessage}>{this.state.error?.message || 'Unknown error'}</Text>
          </View>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => this.setState({ hasError: false, error: null })}
            activeOpacity={0.8}
          >
            <Text style={styles.retryText}>Reload Application</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Manrope_600SemiBold,
    Manrope_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [fontTimeout, setFontTimeout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFontTimeout(true), 1500);

    // Listen for Supabase authentication state changes (OAuth, OTP, email login)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[App Auth] State changed:', event, Boolean(session?.user));
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          const res = await handlePostAuthProfile();
          if (res.success) {
            if (res.hasCompletedOnboarding) {
              navigateToScreen('MatchesTab');
            } else {
              navigateToScreen('Questionnaire');
            }
          }
        } catch (err) {
          console.warn('[App Auth] onAuthStateChange profile sync error:', err);
        }
      }
    });

    // Deep-link callback listener for OAuth redirects (cold start & foreground/background)
    const handleDeepLink = async (event: { url: string }) => {
      const url = event.url;
      if (!url) return;
      if (
        url.includes('auth/callback') ||
        url.includes('access_token=') ||
        url.includes('refresh_token=') ||
        url.includes('code=')
      ) {
        console.log('[App DeepLink] Captured OAuth redirect URL');
        try {
          const res = await handleAuthRedirectUrl(url);
          if (res.success) {
            if (res.hasCompletedOnboarding) {
              navigateToScreen('MatchesTab');
            } else {
              navigateToScreen('Questionnaire');
            }
          }
        } catch (err) {
          console.warn('[App DeepLink] Error processing callback:', err);
        }
      }
    };

    const linkSub = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then((initialUrl) => {
      if (initialUrl) {
        handleDeepLink({ url: initialUrl });
      }
    });

    // Hydrate existing Supabase authentication session and matrimonial profile
    restoreSession()
      .then((res) => {
        if (res.isAuthenticated) {
          getMyProfile().catch((err) => console.warn('Startup profile hydration error:', err));
          if (res.hasCompletedOnboarding) {
            navigateToScreen('MatchesTab');
          } else {
            navigateToScreen('Questionnaire');
          }
        }
      })
      .catch((err) => console.warn('Startup session restoration error:', err));

    return () => {
      authListener.subscription.unsubscribe();
      linkSub.remove();
      clearTimeout(timer);
    };
  }, []);

  // On web, render immediately with system fallback fonts so there is zero initial delay
  if (Platform.OS !== 'web' && !fontsLoaded && !fontError) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const isWeb = Platform.OS === 'web';

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <View style={isWeb ? styles.webDeskContainer : styles.nativeFill}>
          {/* Mobile phone mockup frame */}
          <View style={isWeb ? styles.webPhoneMockup : styles.nativeFill}>
            <NavigationContainer
              ref={navigationRef}
              theme={AppTheme}
            >
              <StatusBar style="dark" />
              <RootNavigator />
            </NavigationContainer>
          </View>
        </View>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  nativeFill: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  webDeskContainer: {
    flex: 1,
    backgroundColor: '#1E122B', // Deep royal plum luxury desk background for web preview
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh' as any,
    width: '100%',
    padding: 16,
  },
  webPhoneMockup: {
    flex: 1,
    width: '100%',
    maxWidth: 440,
    maxHeight: 900,
    minHeight: 760,
    backgroundColor: colors.surface,
    borderRadius: 36,
    overflow: 'hidden',
    borderWidth: 8,
    borderColor: '#341E47', // Premium Royal Plum phone bezel
    boxShadow: '0 24px 70px rgba(18, 10, 26, 0.65), 0 0 0 1px rgba(173, 145, 193, 0.35)', // Subtle lavender ambient halo
  } as any,
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 2,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: 16,
    textAlign: 'center',
  },
  errorBox: {
    backgroundColor: 'rgba(186, 26, 26, 0.08)',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 24,
  },
  errorMessage: {
    fontSize: 13,
    color: colors.error,
    fontFamily: 'monospace',
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
