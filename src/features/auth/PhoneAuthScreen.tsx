import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography, radii, shadows } from '../../theme/tokens';
import { TopBar } from '../../components/common/TopBar';
import { InputField } from '../../components/common/InputField';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { supabase, isSupabaseConfigured } from '../../lib/supabase/client';

interface PhoneAuthScreenProps {
  onSendOtp: (phone: string) => void;
  onLoginSuccess?: () => void;
  onBack?: () => void;
}

export const PhoneAuthScreen: React.FC<PhoneAuthScreenProps> = ({
  onSendOtp,
  onLoginSuccess,
  onBack,
}) => {
  const insets = useSafeAreaInsets();

  // Active Auth Method Tab: 'phone' | 'email'
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');

  // Phone Auth State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Email Auth State
  const [emailMode, setEmailMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Google OAuth Loading
  const [googleLoading, setGoogleLoading] = useState(false);

  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const isValidPhone = cleanPhone.length === 10;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidPassword = password.length >= 6;

  // Handle Phone OTP Submission
  const handleSendPhoneOtp = async () => {
    if (!isValidPhone) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }
    setPhoneError(null);
    setPhoneLoading(true);

    try {
      if (isSupabaseConfigured) {
        const fullPhone = `+91${cleanPhone}`;
        const { error } = await supabase.auth.signInWithOtp({
          phone: fullPhone,
        });
        if (error) {
          console.warn('Supabase SMS OTP error, falling back to verification screen:', error.message);
        }
      }
      onSendOtp(phoneNumber);
    } catch (err: any) {
      console.warn('SMS dispatch error:', err);
      onSendOtp(phoneNumber);
    } finally {
      setPhoneLoading(false);
    }
  };

  // Handle Email Sign In / Sign Up
  const handleEmailAuth = async () => {
    if (!isValidEmail) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (!isValidPassword) {
      setEmailError('Password must be at least 6 characters long');
      return;
    }
    setEmailError(null);
    setEmailLoading(true);

    try {
      if (emailMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });
        if (error) {
          setEmailError(error.message);
          return;
        }
        Alert.alert(
          'Account Created',
          'Welcome to Dono Jaha! Proceeding to setup your matrimonial profile.',
          [{ text: 'Continue', onPress: () => (onLoginSuccess || (() => onSendOtp('9823012345')))() }]
        );
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) {
          setEmailError(error.message);
          return;
        }
        (onLoginSuccess || (() => onSendOtp('9823012345')))();
      }
    } catch (err: any) {
      setEmailError(err?.message || 'Authentication failed. Please try again.');
    } finally {
      setEmailLoading(false);
    }
  };

  // Handle Google OAuth
  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    try {
      if (Platform.OS === 'web') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin,
          },
        });
        if (error) {
          Alert.alert('Google Sign-In', error.message);
        }
      } else {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
        });
        if (error) {
          Alert.alert('Google Sign-In', error.message);
        } else {
          (onLoginSuccess || (() => onSendOtp('9823012345')))();
        }
      }
    } catch (err: any) {
      Alert.alert('Google Sign-In Error', err?.message || 'Could not connect to Google.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopBar title="Authentication" onBack={onBack} />

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Spiritual Assurance Badge */}
        <View style={styles.badgeRow}>
          <MaterialIcons name="verified-user" size={16} color={colors.primary} />
          <Text style={styles.badgeText}>Pure Intentions • Halal & Verified</Text>
        </View>

        {/* Screen Headline */}
        <Text style={styles.title}>Welcome to Dono Jaha</Text>
        <Text style={styles.subtitle}>
          Sign in or create your account to begin your blessed journey with complete privacy.
        </Text>

        {/* 1. Continue with Google Primary Social OAuth */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleAuth}
          disabled={googleLoading}
          activeOpacity={0.85}
        >
          {googleLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <>
              <View style={styles.googleIconBox}>
                <Ionicons name="logo-google" size={18} color="#EA4335" />
              </View>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR CHOOSE METHOD</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Segmented Method Tabs: Phone vs Email */}
        <View style={styles.methodTabsRow}>
          <TouchableOpacity
            style={[
              styles.methodTab,
              authMethod === 'phone' && styles.methodTabActive,
            ]}
            onPress={() => {
              setAuthMethod('phone');
              setPhoneError(null);
            }}
            activeOpacity={0.8}
          >
            <Ionicons
              name="call-outline"
              size={16}
              color={authMethod === 'phone' ? colors.primary : colors.textMuted}
            />
            <Text
              style={[
                styles.methodTabText,
                authMethod === 'phone' && styles.methodTabTextActive,
              ]}
            >
              Continue with Phone
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodTab,
              authMethod === 'email' && styles.methodTabActive,
            ]}
            onPress={() => {
              setAuthMethod('email');
              setEmailError(null);
            }}
            activeOpacity={0.8}
          >
            <Ionicons
              name="mail-outline"
              size={16}
              color={authMethod === 'email' ? colors.primary : colors.textMuted}
            />
            <Text
              style={[
                styles.methodTabText,
                authMethod === 'email' && styles.methodTabTextActive,
              ]}
            >
              Continue with Email
            </Text>
          </TouchableOpacity>
        </View>

        {/* ========================================================
            METHOD A: PHONE OTP AUTHENTICATION FLOW
        ======================================================== */}
        {authMethod === 'phone' && (
          <View style={styles.flowCard}>
            <Text style={styles.flowCardTitle}>Mobile Verification</Text>
            <Text style={styles.flowCardDesc}>
              We will send a 6-digit confirmation code via SMS. Your number remains strictly confidential.
            </Text>

            {phoneError && (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={16} color={colors.error} />
                <Text style={styles.errorText}>{phoneError}</Text>
              </View>
            )}

            <InputField
              label="Mobile Number"
              isPhoneInput
              keyboardType="numeric"
              maxLength={10}
              value={phoneNumber}
              onChangeText={(t) => {
                setPhoneNumber(t);
                if (phoneError) setPhoneError(null);
              }}
              placeholder="98765 43210"
              helperText="Indian mobile number without +91 prefix"
            />

            <PrimaryButton
              title={phoneLoading ? 'Sending OTP...' : 'Send Confirmation OTP'}
              icon="arrow-forward"
              disabled={!isValidPhone || phoneLoading}
              onPress={handleSendPhoneOtp}
              style={{ marginTop: spacing.md }}
            />
          </View>
        )}

        {/* ========================================================
            METHOD B: EMAIL & PASSWORD AUTHENTICATION FLOW
        ======================================================== */}
        {authMethod === 'email' && (
          <View style={styles.flowCard}>
            <View style={styles.emailModeSwitchRow}>
              <TouchableOpacity
                style={[
                  styles.modeSwitchBtn,
                  emailMode === 'signin' && styles.modeSwitchBtnActive,
                ]}
                onPress={() => setEmailMode('signin')}
              >
                <Text
                  style={[
                    styles.modeSwitchText,
                    emailMode === 'signin' && styles.modeSwitchTextActive,
                  ]}
                >
                  Sign In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modeSwitchBtn,
                  emailMode === 'signup' && styles.modeSwitchBtnActive,
                ]}
                onPress={() => setEmailMode('signup')}
              >
                <Text
                  style={[
                    styles.modeSwitchText,
                    emailMode === 'signup' && styles.modeSwitchTextActive,
                  ]}
                >
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>

            {emailError && (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={16} color={colors.error} />
                <Text style={styles.errorText}>{emailError}</Text>
              </View>
            )}

            <InputField
              label="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                if (emailError) setEmailError(null);
              }}
              placeholder="name@example.com"
            />

            <View style={styles.passwordWrapper}>
              <InputField
                label="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  if (emailError) setEmailError(null);
                }}
                placeholder="At least 6 characters"
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={8}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <PrimaryButton
              title={
                emailLoading
                  ? 'Verifying...'
                  : emailMode === 'signup'
                  ? 'Sign Up with Email'
                  : 'Sign In with Email'
              }
              icon={emailMode === 'signup' ? 'person-add' : 'login'}
              disabled={!isValidEmail || !isValidPassword || emailLoading}
              onPress={handleEmailAuth}
              style={{ marginTop: spacing.md }}
            />
          </View>
        )}

        {/* Trust & Confidentiality Card (Section 5: NO Wali mentions!) */}
        <View style={styles.trustCard}>
          <View style={styles.trustIconBox}>
            <MaterialIcons name="shield" size={22} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.trustTitle}>100% Confidential & Modest</Text>
            <Text style={styles.trustDesc}>
              Your phone and email are never shared publicly with prospective suitors.
            </Text>
          </View>
        </View>

        {/* Legal Footer */}
        <Text style={styles.legalText}>
          By continuing, you agree to Dono Jaha's{' '}
          <Text style={styles.legalLink}>Terms of Service</Text> and{' '}
          <Text style={styles.legalLink}>Privacy Policy</Text>.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollBody: {
    padding: spacing.margin,
    paddingBottom: 40,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radii.pill,
    marginBottom: spacing.md,
  },
  badgeText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  title: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 24,
    fontWeight: '700',
    color: colors.deepPlum,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.button,
    paddingVertical: 14,
    paddingHorizontal: 16,
    ...shadows.card,
  },
  googleIconBox: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  googleButtonText: {
    fontFamily: typography.fontFamilies.button,
    fontSize: 15,
    color: colors.deepPlum,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.primarySoft,
  },
  dividerText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: 0.8,
    fontWeight: '600',
  },
  methodTabsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.input,
    padding: 4,
    marginBottom: spacing.lg,
    gap: 4,
  },
  methodTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: radii.input - 2,
    gap: 6,
  },
  methodTabActive: {
    backgroundColor: '#FFFFFF',
    ...shadows.card,
  },
  methodTabText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '500',
  },
  methodTabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  flowCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    padding: 16,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  flowCardTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 16,
    fontWeight: '700',
    color: colors.deepPlum,
    marginBottom: 4,
  },
  flowCardDesc: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.errorContainer,
    padding: 10,
    borderRadius: radii.md,
    marginBottom: spacing.md,
  },
  errorText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.onErrorContainer,
    flex: 1,
  },
  emailModeSwitchRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.primarySoft,
    marginBottom: spacing.md,
  },
  modeSwitchBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  modeSwitchBtnActive: {
    borderBottomColor: colors.primary,
  },
  modeSwitchText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '500',
  },
  modeSwitchTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  passwordWrapper: {
    position: 'relative',
  },
  eyeBtn: {
    position: 'absolute',
    right: 14,
    top: 38,
  },
  trustCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surfaceContainerLow,
    padding: 14,
    borderRadius: radii.card,
    marginBottom: spacing.xl,
  },
  trustIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 13,
    fontWeight: '600',
    color: colors.deepPlum,
  },
  trustDesc: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  legalText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  legalLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});
