// ====================================================================
// DONO JAHAAN (D O N O   J A H A A N)
// Redesigned Ultra-Premium Matrimonial Authentication Screen
// Faithful implementation of stitch_dono_jahaan design system
// ====================================================================

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  G,
  Rect,
  Circle,
} from 'react-native-svg';
import { supabase, isSupabaseConfigured } from '../../lib/supabase/client';
import {
  signInWithGoogle,
  signUpWithEmail,
  signInWithEmail,
  resetPasswordForEmail,
} from '../../services/authService';
import { navigateToScreen } from '../../navigation/navigationService';

interface PhoneAuthScreenProps {
  onSendOtp: (phone: string) => void;
  onLoginSuccess?: () => void;
  onOnboardingRequired?: () => void;
  onBack?: () => void;
}

// Stitch Design System Color Palette
const brandColors = {
  plum: '#522F5E',
  plumDark: '#44244F',
  lavender: '#EFE9F4',
  lavenderLight: '#F7F4FB',
  lavenderDark: '#8E799C',
  heading: '#1F1325',
  subtext: '#685D70',
  cream: '#FBF9F7',
  cardBg: '#FFFFFF',
  border: '#EDE6F2',
  inputBorder: '#D8CFE0',
  error: '#C62828',
};

// -------------------------------------------------------------
// Atmospheric Architectural Top-Right Arch & Dome Graphic SVG
// -------------------------------------------------------------
const ArchitecturalArchBackground: React.FC = () => (
  <View style={styles.archGraphicContainer} pointerEvents="none">
    <Svg
      width={270}
      height={480}
      viewBox="0 0 270 480"
      fill="none"
      style={styles.archSvg}
    >
      <Defs>
        <LinearGradient
          id="archWall"
          x1={0}
          y1={0}
          x2={270}
          y2={480}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0%" stopColor="#ebdcd6" stopOpacity={0.9} />
          <Stop offset="45%" stopColor="#f2e7e3" stopOpacity={0.8} />
          <Stop offset="100%" stopColor="#faf5f3" stopOpacity={0.05} />
        </LinearGradient>

        <LinearGradient
          id="innerSky"
          x1={100}
          y1={50}
          x2={200}
          y2={350}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0%" stopColor="#fdf4ee" />
          <Stop offset="60%" stopColor="#f5e8ea" />
          <Stop offset="100%" stopColor="#f9f5f6" />
        </LinearGradient>

        <LinearGradient id="archBevel" x1={0} y1={0} x2={1} y2={0}>
          <Stop offset="0%" stopColor="#c9b3b0" stopOpacity={0.6} />
          <Stop offset="100%" stopColor="#ebd5ce" stopOpacity={0.2} />
        </LinearGradient>

        <LinearGradient
          id="leafGrad"
          x1={0}
          y1={0}
          x2={100}
          y2={100}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0%" stopColor="#677353" />
          <Stop offset="100%" stopColor="#8a976f" />
        </LinearGradient>
      </Defs>

      {/* Outer Arch Wall */}
      <Path
        d="M70,0 L270,0 L270,480 L180,480 C110,410 70,320 70,220 L70,0 Z"
        fill="url(#archWall)"
      />

      {/* Deep Arch Molding Frame */}
      <Path
        d="M102 0 L270 0 L270 440 L210 440 C145 365 102 285 102 185 L102 0 Z"
        fill="url(#archBevel)"
      />

      {/* Through Arch Opening */}
      <Path
        d="M120 0 L270 0 L270 410 C165 330 120 250 120 160 L120 0 Z"
        fill="url(#innerSky)"
      />

      {/* Distant Mosque Silhouette in Mist */}
      <G fill="#7d637c" opacity={0.28}>
        {/* Central Dome */}
        <Path d="M210 320 C210 275 245 258 245 245 C245 258 280 275 280 320 Z" />
        <Rect x={243.5} y={232} width={3} height={15} rx={1} />
        {/* Minaret Tower Left */}
        <Rect x={175} y={220} width={18} height={110} rx={3} />
        <Path d="M172 220 L196 220 L184 175 Z" />
        <Rect x={183} y={165} width={2} height={12} />
        <Circle cx={184} cy={164} r={2.5} />
        {/* Smaller Dome */}
        <Path d="M152 320 C152 295 168 285 168 276 C168 285 184 295 184 320 Z" />
      </G>

      {/* Elegant Green Botanical Leaves Entering from Right Edge */}
      <G id="botanical-branch" opacity={0.82}>
        <Path
          d="M270 230 C235 250 205 295 195 335"
          fill="none"
          stroke="#5a6747"
          strokeLinecap="round"
          strokeWidth={2.5}
        />
        <Path
          d="M240 260 C220 280 215 305 210 320"
          fill="none"
          stroke="#5a6747"
          strokeLinecap="round"
          strokeWidth={1.8}
        />
        <Path
          d="M215 280 C200 275 190 285 185 290 C190 300 205 300 215 280 Z"
          fill="url(#leafGrad)"
        />
        <Path
          d="M232 255 C215 250 206 258 200 265 C208 273 222 271 232 255 Z"
          fill="#697753"
        />
        <Path
          d="M195 330 C180 332 170 342 168 350 C178 356 190 350 195 330 Z"
          fill="#586744"
        />
        <Path
          d="M225 300 C210 305 204 318 205 328 C215 328 225 318 225 300 Z"
          fill="#75845c"
        />
        <Path
          d="M255 240 C240 230 228 238 224 246 C235 252 248 250 255 240 Z"
          fill="#7d8d64"
        />
        <Path
          d="M268 290 C250 295 240 310 242 322 C252 320 262 308 268 290 Z"
          fill="#606f4a"
        />
        <Path
          d="M250 330 C238 340 235 355 240 365 C248 360 256 348 250 330 Z"
          fill="#52603e"
        />
      </G>
    </Svg>
  </View>
);

// -------------------------------------------------------------
// Dono Jahaan Multi-Dome Arch Logo SVG
// -------------------------------------------------------------
const DonoJahaanLogo: React.FC = () => (
  <View style={styles.logoWrapper}>
    <Svg width={64} height={40} viewBox="0 0 72 44" fill="none">
      <Defs>
        <LinearGradient
          id="logoArchGrad"
          x1={0}
          y1={0}
          x2={72}
          y2={44}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0%" stopColor="#73477e" />
          <Stop offset="100%" stopColor="#462251" />
        </LinearGradient>
      </Defs>
      {/* Primary Center Arch Dome */}
      <Path
        d="M10 40 C10 18 24 4 36 4 C48 4 62 18 62 40 Z"
        fill="url(#logoArchGrad)"
      />
      {/* Secondary Overlapping Right Dome */}
      <Path
        d="M42 40 C42 27 50 18 58 18 C64 18 70 25 72 40 Z"
        fill="url(#logoArchGrad)"
        opacity={0.65}
      />
      {/* Hollow Inner Keyhole Arch */}
      <Path
        d="M26 40 C26 28 31 22 36 22 C41 22 46 28 46 40 Z"
        fill="#fbf9f7"
      />
    </Svg>
  </View>
);

// -------------------------------------------------------------
// Google 'G' Icon SVG
// -------------------------------------------------------------
const GoogleIcon: React.FC = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      fill="#4285F4"
    />
    <Path
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
      fill="#34A853"
    />
    <Path
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.97 0 12c0 2.03.45 3.84 1.24 5.42l4.04-3.15z"
      fill="#FBBC05"
    />
    <Path
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      fill="#EA4335"
    />
  </Svg>
);

export const PhoneAuthScreen: React.FC<PhoneAuthScreenProps> = ({
  onSendOtp,
  onLoginSuccess,
  onOnboardingRequired,
  onBack,
}) => {
  const insets = useSafeAreaInsets();

  // Mode: 'signup' | 'signin'
  const [authIntent, setAuthIntent] = useState<'signup' | 'signin'>('signup');

  // Active Method: 'phone' | 'email'
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');

  // Phone State
  const [phoneNumber, setPhoneNumber] = useState('98765 43210');
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Email State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Forgot Password Modal State
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotStatus, setForgotStatus] = useState<{ message: string; isError: boolean } | null>(null);

  // Email Verification Pending Modal State
  const [verificationPendingVisible, setVerificationPendingVisible] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  // Google OAuth Loading
  const [googleLoading, setGoogleLoading] = useState(false);

  // Listen for Supabase session changes
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setGoogleLoading(false);
        setEmailLoading(false);
        setPhoneLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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
          console.warn('Supabase SMS OTP notice:', error.message);
        }
      }
      onSendOtp(phoneNumber);
    } catch (err: any) {
      console.warn('SMS dispatch notice:', err);
      onSendOtp(phoneNumber);
    } finally {
      setPhoneLoading(false);
    }
  };

  // Handle Email Authentication
  const handleEmailAuth = async () => {
    if (!isValidEmail) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    if (!isValidPassword) {
      setEmailError('Password must be at least 6 characters long.');
      return;
    }
    if (authIntent === 'signup' && password !== confirmPassword) {
      setEmailError('Passwords do not match. Please re-enter.');
      return;
    }

    setEmailError(null);
    setEmailLoading(true);

    try {
      if (authIntent === 'signup') {
        const res = await signUpWithEmail(email, password);
        if (!res.success) {
          setEmailError(res.error || 'Failed to create account. Please try again.');
          return;
        }

        if (res.requiresEmailVerification) {
          setPendingEmail(email.trim());
          setVerificationPendingVisible(true);
          return;
        }

        if (res.hasCompletedOnboarding) {
          if (onLoginSuccess) onLoginSuccess();
          else navigateToScreen('MatchesTab');
        } else {
          if (onOnboardingRequired) onOnboardingRequired();
          else navigateToScreen('Questionnaire');
        }
      } else {
        const res = await signInWithEmail(email, password);
        if (!res.success) {
          setEmailError(res.error || 'Incorrect email or password.');
          return;
        }

        if (res.hasCompletedOnboarding) {
          if (onLoginSuccess) onLoginSuccess();
          else navigateToScreen('MatchesTab');
        } else {
          if (onOnboardingRequired) onOnboardingRequired();
          else navigateToScreen('Questionnaire');
        }
      }
    } catch (err: any) {
      setEmailError(err?.message || 'Authentication failed. Please try again.');
    } finally {
      setEmailLoading(false);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async () => {
    const targetEmail = forgotEmail.trim();
    if (!targetEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) {
      setForgotStatus({
        message: 'Please enter a valid email address.',
        isError: true,
      });
      return;
    }

    setForgotStatus(null);
    setForgotLoading(true);

    try {
      const res = await resetPasswordForEmail(targetEmail);
      if (res.success) {
        setForgotStatus({
          message: 'Password reset link sent! Check your inbox to set a new password.',
          isError: false,
        });
      } else {
        setForgotStatus({
          message: res.error || 'Could not send reset email. Please try again.',
          isError: true,
        });
      }
    } catch (err: any) {
      setForgotStatus({
        message: err?.message || 'Failed to request password reset.',
        isError: true,
      });
    } finally {
      setForgotLoading(false);
    }
  };

  // Handle Google OAuth
  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    try {
      const res = await signInWithGoogle();
      if (!res.success) {
        if (res.error && !res.error.includes('cancelled')) {
          Alert.alert('Google Sign-In', res.error);
        }
        return;
      }

      if (res.hasCompletedOnboarding) {
        if (onLoginSuccess) onLoginSuccess();
        else navigateToScreen('MatchesTab');
      } else {
        if (onOnboardingRequired) onOnboardingRequired();
        else navigateToScreen('Questionnaire');
      }
    } catch (err: any) {
      Alert.alert('Google Sign-In Notice', err?.message || 'Could not complete Google authentication.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <View style={[styles.root, { paddingTop: Math.max(insets.top, 14) }]}>
      {/* Top-Right Architectural Background Graphic */}
      <ArchitecturalArchBackground />

      {/* Top Nav: Circular Back Button & Sign In/Up Toggle */}
      <View style={styles.topNavRow}>
        <TouchableOpacity
          style={styles.circleBackButton}
          onPress={onBack}
          activeOpacity={0.8}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={20} color={brandColors.heading} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setAuthIntent(authIntent === 'signup' ? 'signin' : 'signup');
            setPhoneError(null);
            setEmailError(null);
          }}
          activeOpacity={0.7}
          style={styles.topRightToggleBtn}
        >
          <Text style={styles.topRightToggleText}>
            {authIntent === 'signup' ? 'Sign in' : 'Sign up'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 20) + 16 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Brand Logo & Name Section */}
        <View style={styles.brandSection}>
          <DonoJahaanLogo />
          <Text style={styles.brandTitle}>DONO JAHAAN</Text>
          <View style={styles.taglineBlock}>
            <Text style={styles.taglineText}>COMPATIBLE VALUES</Text>
            <Text style={styles.taglineText}>BRIGHTER TOMORROWS</Text>
            <View style={styles.taglineUnderline} />
          </View>
        </View>

        {/* Hero Title & Subtitle */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            {authIntent === 'signup'
              ? 'Begin your\ndua-aligned journey.'
              : 'Welcome back to\nyour matrimonial journey.'}
          </Text>
          <Text style={styles.heroSubtitle}>
            {authIntent === 'signup'
              ? 'Create an account to find a compatible partner with complete privacy and respect.'
              : 'Sign in to access your active proposal, view verified suitors, and continue your conversation.'}
          </Text>
        </View>

        {/* 1. Continue with Google Pill Button */}
        <TouchableOpacity
          style={styles.googlePillButton}
          onPress={handleGoogleAuth}
          disabled={googleLoading}
          activeOpacity={0.85}
        >
          <GoogleIcon />
          <Text style={styles.googlePillText}>
            {googleLoading ? 'Connecting to Google...' : 'Continue with Google'}
          </Text>
          {googleLoading ? (
            <ActivityIndicator size="small" color={brandColors.plum} />
          ) : (
            <Ionicons name="chevron-forward" size={18} color="#9E9E9E" />
          )}
        </TouchableOpacity>

        {/* Divider with Centered Tracking Badge */}
        <View style={styles.dividerWrap}>
          <View style={styles.dividerLine} />
          <View style={styles.dividerBadge}>
            <Text style={styles.dividerBadgeText}>OR CONTINUE WITH</Text>
          </View>
        </View>

        {/* Method Switcher Tabs (Phone vs Email) */}
        <View style={styles.methodSwitcherRow}>
          <TouchableOpacity
            style={[
              styles.methodPill,
              authMethod === 'phone'
                ? styles.methodPillActive
                : styles.methodPillInactive,
            ]}
            onPress={() => {
              setAuthMethod('phone');
              setPhoneError(null);
            }}
            activeOpacity={0.85}
          >
            <Ionicons
              name="call-outline"
              size={16}
              color={authMethod === 'phone' ? '#FFFFFF' : brandColors.heading}
            />
            <Text
              style={[
                styles.methodPillText,
                authMethod === 'phone'
                  ? styles.methodPillTextActive
                  : styles.methodPillTextInactive,
              ]}
            >
              Phone Number
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodPill,
              authMethod === 'email'
                ? styles.methodPillActive
                : styles.methodPillInactive,
            ]}
            onPress={() => {
              setAuthMethod('email');
              setEmailError(null);
            }}
            activeOpacity={0.85}
          >
            <Ionicons
              name="mail-outline"
              size={16}
              color={authMethod === 'email' ? '#FFFFFF' : brandColors.heading}
            />
            <Text
              style={[
                styles.methodPillText,
                authMethod === 'email'
                  ? styles.methodPillTextActive
                  : styles.methodPillTextInactive,
              ]}
            >
              Email Address
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Card (White Rounded Card with Soft Plum Border and Shadow) */}
        <View style={styles.formCard}>
          {authMethod === 'phone' ? (
            /* ========================================================
               PHONE NUMBER VERIFICATION FORM
            ======================================================== */
            <View>
              <Text style={styles.cardHeaderTitle}>Enter your mobile number</Text>
              <Text style={styles.cardHeaderSubtitle}>
                We will send a 6-digit verification code via SMS. Your number remains strictly confidential.
              </Text>

              {/* Phone Input Box */}
              <View style={styles.phoneInputRow}>
                {/* Country Flag & Code Selector */}
                <View style={styles.countryPickerBox}>
                  <Text style={styles.flagEmoji}>🇮🇳</Text>
                  <Text style={styles.countryCodeText}>+91</Text>
                  <Ionicons name="chevron-down" size={14} color="#757575" />
                </View>

                {/* Vertical Divider */}
                <View style={styles.inputVerticalDivider} />

                {/* Number Input */}
                <TextInput
                  style={styles.phoneTextInput}
                  value={phoneNumber}
                  onChangeText={(val) => {
                    setPhoneNumber(val);
                    if (phoneError) setPhoneError(null);
                  }}
                  placeholder="98765 43210"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="phone-pad"
                  maxLength={13}
                />
              </View>

              {phoneError && (
                <View style={styles.errorNoticeRow}>
                  <Ionicons name="alert-circle-outline" size={14} color={brandColors.error} />
                  <Text style={styles.errorNoticeText}>{phoneError}</Text>
                </View>
              )}

              {/* Submit Button */}
              <TouchableOpacity
                style={[
                  styles.primaryPlumButton,
                  phoneLoading && styles.buttonDisabled,
                ]}
                onPress={handleSendPhoneOtp}
                disabled={phoneLoading}
                activeOpacity={0.9}
              >
                {phoneLoading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Text style={styles.primaryPlumButtonText}>Send verification code</Text>
                    <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                  </>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            /* ========================================================
               EMAIL & PASSWORD AUTHENTICATION FORM
            ======================================================== */
            <View>
              <Text style={styles.cardHeaderTitle}>
                {authIntent === 'signup' ? 'Create your account' : 'Sign in with Email'}
              </Text>
              <Text style={styles.cardHeaderSubtitle}>
                {authIntent === 'signup'
                  ? 'Set your email and password to begin your confidential matrimonial search.'
                  : 'Enter your registered email and password to access your account.'}
              </Text>

              {/* Email Address Input */}
              <View style={styles.emailFieldRow}>
                <Ionicons name="mail-outline" size={18} color="#757575" style={{ marginLeft: 12 }} />
                <TextInput
                  style={styles.emailTextInput}
                  value={email}
                  onChangeText={(val) => {
                    setEmail(val);
                    if (emailError) setEmailError(null);
                  }}
                  placeholder="your.email@example.com"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password Input */}
              <View style={[styles.emailFieldRow, { marginTop: 10 }]}>
                <Ionicons name="lock-closed-outline" size={18} color="#757575" style={{ marginLeft: 12 }} />
                <TextInput
                  style={styles.emailTextInput}
                  value={password}
                  onChangeText={(val) => {
                    setPassword(val);
                    if (emailError) setEmailError(null);
                  }}
                  placeholder="Password (min 6 characters)"
                  placeholderTextColor="#9E9E9E"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeToggleBtn}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color="#757575"
                  />
                </TouchableOpacity>
              </View>

              {/* Confirm Password Input (Signup only) */}
              {authIntent === 'signup' && (
                <View style={[styles.emailFieldRow, { marginTop: 10 }]}>
                  <Ionicons name="lock-closed-outline" size={18} color="#757575" style={{ marginLeft: 12 }} />
                  <TextInput
                    style={styles.emailTextInput}
                    value={confirmPassword}
                    onChangeText={(val) => {
                      setConfirmPassword(val);
                      if (emailError) setEmailError(null);
                    }}
                    placeholder="Confirm Password"
                    placeholderTextColor="#9E9E9E"
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeToggleBtn}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={18}
                      color="#757575"
                    />
                  </TouchableOpacity>
                </View>
              )}

              {/* Forgot Password Link (Signin only) */}
              {authIntent === 'signin' && (
                <TouchableOpacity
                  onPress={() => {
                    setForgotEmail(email);
                    setForgotStatus(null);
                    setForgotPasswordVisible(true);
                  }}
                  style={styles.forgotPasswordLink}
                  activeOpacity={0.7}
                >
                  <Text style={styles.forgotPasswordLinkText}>Forgot password?</Text>
                </TouchableOpacity>
              )}

              {emailError && (
                <View style={styles.errorNoticeRow}>
                  <Ionicons name="alert-circle-outline" size={14} color={brandColors.error} />
                  <Text style={styles.errorNoticeText}>{emailError}</Text>
                </View>
              )}

              {/* Submit Button */}
              <TouchableOpacity
                style={[
                  styles.primaryPlumButton,
                  emailLoading && styles.buttonDisabled,
                ]}
                onPress={handleEmailAuth}
                disabled={emailLoading}
                activeOpacity={0.9}
              >
                {emailLoading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Text style={styles.primaryPlumButtonText}>
                      {authIntent === 'signup' ? 'Create Account' : 'Sign In'}
                    </Text>
                    <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                  </>
                )}
              </TouchableOpacity>

              {/* Bottom Mode Switcher Link */}
              <TouchableOpacity
                onPress={() => {
                  setAuthIntent(authIntent === 'signup' ? 'signin' : 'signup');
                  setEmailError(null);
                }}
                style={styles.cardFooterModeSwitch}
                activeOpacity={0.7}
              >
                <Text style={styles.cardFooterModeSwitchText}>
                  {authIntent === 'signup'
                    ? 'Already have an account? '
                    : "Don't have an account? "}
                  <Text style={styles.cardFooterModeSwitchHighlight}>
                    {authIntent === 'signup' ? 'Sign in' : 'Sign up'}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Trust & Privacy Pillars (3 Columns) */}
        <View style={styles.trustPillarsRow}>
          {/* Pillar 1: 100% Private */}
          <View style={styles.pillarItem}>
            <View style={styles.pillarIconCircle}>
              <Ionicons name="shield-checkmark-outline" size={16} color={brandColors.plum} />
            </View>
            <Text style={styles.pillarTitle}>100% Private</Text>
            <Text style={styles.pillarSubtitle}>Your details are never shared publicly.</Text>
          </View>

          {/* Vertical Separator */}
          <View style={styles.pillarDivider} />

          {/* Pillar 2: Safe & Verified */}
          <View style={styles.pillarItem}>
            <View style={styles.pillarIconCircle}>
              <Ionicons name="lock-closed-outline" size={16} color={brandColors.plum} />
            </View>
            <Text style={styles.pillarTitle}>Safe & Verified</Text>
            <Text style={styles.pillarSubtitle}>Genuine profiles with verification.</Text>
          </View>

          {/* Vertical Separator */}
          <View style={styles.pillarDivider} />

          {/* Pillar 3: For Serious Intentions */}
          <View style={styles.pillarItem}>
            <View style={styles.pillarIconCircle}>
              <Ionicons name="people-outline" size={16} color={brandColors.plum} />
            </View>
            <Text style={styles.pillarTitle}>For Serious Intentions</Text>
            <Text style={styles.pillarSubtitle}>Halal & respectful community.</Text>
          </View>
        </View>

        {/* Legal Terms & Privacy Footer */}
        <View style={styles.legalFooter}>
          <Text style={styles.legalFooterText}>
            By continuing, you agree to Dono Jahaan's{'\n'}
            <Text style={styles.legalLink}>Terms of Service</Text> and{' '}
            <Text style={styles.legalLink}>Privacy Policy</Text>.
          </Text>
        </View>
      </ScrollView>

      {/* ========================================================
          MODAL: Forgot Password Recovery
      ======================================================== */}
      <Modal
        visible={forgotPasswordVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setForgotPasswordVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Password Recovery</Text>
              <TouchableOpacity
                onPress={() => setForgotPasswordVisible(false)}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={22} color={brandColors.heading} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Enter your registered email address and we will dispatch a secure link to reset your password.
            </Text>

            <View style={[styles.emailFieldRow, { marginTop: 14 }]}>
              <Ionicons name="mail-outline" size={18} color="#757575" style={{ marginLeft: 12 }} />
              <TextInput
                style={styles.emailTextInput}
                value={forgotEmail}
                onChangeText={setForgotEmail}
                placeholder="your.email@example.com"
                placeholderTextColor="#9E9E9E"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {forgotStatus && (
              <View
                style={[
                  styles.forgotStatusBox,
                  forgotStatus.isError
                    ? styles.forgotStatusBoxError
                    : styles.forgotStatusBoxSuccess,
                ]}
              >
                <Text
                  style={[
                    styles.forgotStatusText,
                    forgotStatus.isError
                      ? styles.forgotStatusTextError
                      : styles.forgotStatusTextSuccess,
                  ]}
                >
                  {forgotStatus.message}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.primaryPlumButton,
                { marginTop: 16 },
                forgotLoading && styles.buttonDisabled,
              ]}
              onPress={handleForgotPassword}
              disabled={forgotLoading}
              activeOpacity={0.9}
            >
              {forgotLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryPlumButtonText}>Send Recovery Link</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ========================================================
          MODAL: Email Verification Pending
      ======================================================== */}
      <Modal
        visible={verificationPendingVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setVerificationPendingVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.verifyIconBox}>
              <Ionicons name="mail-unread-outline" size={36} color={brandColors.plum} />
            </View>

            <Text style={styles.verifyTitle}>Verify Your Email</Text>
            <Text style={styles.verifySubtitle}>We have sent a verification email to:</Text>
            <Text style={styles.verifyEmailText}>{pendingEmail}</Text>

            <Text style={styles.verifyDesc}>
              Please check your inbox (and spam folder) and tap the confirmation link to activate your Dono Jahaan account. Once verified, you can sign in directly.
            </Text>

            <TouchableOpacity
              style={[styles.primaryPlumButton, { marginTop: 18 }]}
              onPress={() => {
                setVerificationPendingVisible(false);
                setAuthIntent('signin');
              }}
              activeOpacity={0.9}
            >
              <Text style={styles.primaryPlumButtonText}>Return to Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: brandColors.cream,
  },
  archGraphicContainer: {
    position: 'absolute',
    top: 0,
    right: -20,
    width: 270,
    height: 480,
    zIndex: 0,
  },
  archSvg: {
    opacity: 0.9,
  },
  topNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 4,
    zIndex: 10,
  },
  circleBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(220, 215, 226, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#522F5E',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  topRightToggleBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  topRightToggleText: {
    fontSize: 15,
    fontWeight: '600',
    color: brandColors.plum,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 4,
    zIndex: 10,
  },
  brandSection: {
    alignItems: 'flex-start',
    marginTop: 6,
  },
  logoWrapper: {
    width: 64,
    height: 40,
    marginBottom: 6,
  },
  brandTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 4.5,
    color: brandColors.heading,
    textTransform: 'uppercase',
  },
  taglineBlock: {
    marginTop: 3,
    alignItems: 'flex-start',
  },
  taglineText: {
    fontSize: 8.5,
    fontWeight: '500',
    letterSpacing: 1.6,
    color: '#737373',
    textTransform: 'uppercase',
    lineHeight: 12,
  },
  taglineUnderline: {
    width: 32,
    height: 1,
    backgroundColor: '#D6CBDD',
    marginTop: 4,
  },
  heroSection: {
    marginTop: 18,
  },
  heroTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 34,
    fontWeight: '600',
    color: brandColors.heading,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 14,
    color: brandColors.subtext,
    lineHeight: 20,
    marginTop: 8,
    maxWidth: 320,
  },
  googlePillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2D9E8',
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 16,
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#522F5E',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  googlePillText: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#262626',
    flex: 1,
    textAlign: 'center',
    paddingRight: 4,
  },
  dividerWrap: {
    position: 'relative',
    marginVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#E4DCED',
  },
  dividerBadge: {
    position: 'absolute',
    backgroundColor: brandColors.cream,
    paddingHorizontal: 12,
  },
  dividerBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: '#8E799C',
    textTransform: 'uppercase',
  },
  methodSwitcherRow: {
    flexDirection: 'row',
    gap: 10,
  },
  methodPill: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  methodPillActive: {
    backgroundColor: brandColors.plum,
    ...Platform.select({
      ios: {
        shadowColor: brandColors.plum,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.22,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  methodPillInactive: {
    backgroundColor: 'rgba(239, 233, 244, 0.7)',
  },
  methodPillText: {
    fontSize: 13.5,
    fontWeight: '600',
  },
  methodPillTextActive: {
    color: '#FFFFFF',
  },
  methodPillTextInactive: {
    color: brandColors.heading,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: brandColors.border,
    marginTop: 14,
    ...Platform.select({
      ios: {
        shadowColor: brandColors.plum,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardHeaderTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 19,
    fontWeight: '600',
    color: brandColors.heading,
    lineHeight: 24,
  },
  cardHeaderSubtitle: {
    fontSize: 12,
    color: brandColors.subtext,
    lineHeight: 17,
    marginTop: 4,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDFDFD',
    borderWidth: 1,
    borderColor: brandColors.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginTop: 14,
  },
  countryPickerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 8,
  },
  flagEmoji: {
    fontSize: 16,
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: '700',
    color: brandColors.heading,
  },
  inputVerticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#DDD2E5',
    marginRight: 10,
  },
  phoneTextInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: brandColors.heading,
    letterSpacing: 0.5,
    paddingVertical: 0,
  },
  emailFieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDFDFD',
    borderWidth: 1,
    borderColor: brandColors.inputBorder,
    borderRadius: 12,
    height: 48,
    marginTop: 14,
  },
  emailTextInput: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '500',
    color: brandColors.heading,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  eyeToggleBtn: {
    paddingHorizontal: 12,
    height: '100%',
    justifyContent: 'center',
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: 8,
    paddingVertical: 2,
  },
  forgotPasswordLinkText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: brandColors.plum,
  },
  primaryPlumButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: brandColors.plum,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
    ...Platform.select({
      ios: {
        shadowColor: brandColors.plum,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryPlumButtonText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '600',
  },
  cardFooterModeSwitch: {
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 4,
  },
  cardFooterModeSwitchText: {
    fontSize: 12.5,
    color: brandColors.subtext,
  },
  cardFooterModeSwitchHighlight: {
    fontWeight: '700',
    color: brandColors.plum,
  },
  errorNoticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  errorNoticeText: {
    fontSize: 12,
    color: brandColors.error,
    fontWeight: '500',
  },
  trustPillarsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    paddingHorizontal: 4,
  },
  pillarItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  pillarIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(239, 233, 244, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  pillarTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: brandColors.heading,
    textAlign: 'center',
    lineHeight: 14,
  },
  pillarSubtitle: {
    fontSize: 9.5,
    color: brandColors.subtext,
    textAlign: 'center',
    lineHeight: 13,
    marginTop: 3,
  },
  pillarDivider: {
    width: 1,
    height: 48,
    backgroundColor: '#E8E0EE',
  },
  legalFooter: {
    marginTop: 22,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  legalFooterText: {
    fontSize: 11.5,
    color: '#737373',
    textAlign: 'center',
    lineHeight: 18,
  },
  legalLink: {
    color: brandColors.plum,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(31, 19, 37, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 20,
    fontWeight: '700',
    color: brandColors.heading,
  },
  modalSubtitle: {
    fontSize: 13,
    color: brandColors.subtext,
    lineHeight: 18,
    marginTop: 6,
  },
  forgotStatusBox: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  forgotStatusBoxSuccess: {
    backgroundColor: '#E8F5E9',
  },
  forgotStatusBoxError: {
    backgroundColor: '#FFEBEE',
  },
  forgotStatusText: {
    fontSize: 12.5,
    lineHeight: 17,
  },
  forgotStatusTextSuccess: {
    color: '#2E7D32',
  },
  forgotStatusTextError: {
    color: brandColors.error,
  },
  verifyIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: brandColors.lavender,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  verifyTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 22,
    fontWeight: '700',
    color: brandColors.heading,
    textAlign: 'center',
  },
  verifySubtitle: {
    fontSize: 13,
    color: brandColors.subtext,
    textAlign: 'center',
    marginTop: 6,
  },
  verifyEmailText: {
    fontSize: 14,
    fontWeight: '700',
    color: brandColors.plum,
    textAlign: 'center',
    marginTop: 2,
  },
  verifyDesc: {
    fontSize: 12.5,
    color: brandColors.subtext,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 12,
  },
});
