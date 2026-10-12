// ====================================================================
// DONO JAHA (D O N O   J A H A)
// Master Design System Tokens (React Native TypeScript)
// Brand Palette: Rich Purple, Royal Plum, Soft Lavender, Warm White
// ====================================================================

export const colors = {
  // Brand Primaries (Rich Purple & Plum)
  primary: '#6A3794', // Primary Purple: Rich Purple
  primaryDark: '#5A2F78', // Deep Purple: Plum / Royal Purple
  primaryContainer: '#5A2F78',
  primarySoft: '#F0E6F1', // Light Lavender: Background tint
  primaryTint: '#F0E6F1',
  primaryFixed: '#DBCADD', // Lavender Surface: Cards / accents
  onPrimary: '#FFFFFF', // Contrast White

  // Heritage Gold (Auspicious seals, verified member badges, premium accents)
  gold: '#D4AF37',
  goldAccent: '#D4AF37',
  goldTint: '#FCF8ED',
  goldLight: '#FCF8ED',
  goldDark: '#8A711E',

  // Secondary (Soft Lavender)
  secondary: '#AD91C1', // Soft Lavender: Secondary
  secondaryContainer: '#F0E6F1', // Light Lavender: Background tint
  onSecondaryContainer: '#241B33', // Dark Text: Deep Plum

  // Warm Surfaces & Neutral Backgrounds
  background: '#FDFCFC', // Warm White: Main background
  surface: '#FDFCFC',
  surfaceCard: '#FFFFFF', // White: Contrast cards
  surfaceSubtle: '#F0E6F1', // Light Lavender
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#F0E6F1', // Light Lavender background tint
  surfaceContainer: '#DBCADD', // Lavender Surface: Cards / accents
  surfaceContainerHigh: '#DBCADD',
  surfaceContainerHighest: '#DBCADD',
  parchmentDark: '#E8DCEB',

  // Borders & Dividers
  border: '#DBCADD', // Lavender Surface
  borderFocus: '#6A3794', // Primary Rich Purple
  outline: '#59445F', // Muted Text: Soft Plum
  outlineVariant: '#AD91C1', // Soft Lavender

  // Typography
  onSurface: '#241B33', // Dark Text: Deep Plum
  onSurfaceVariant: '#59445F', // Muted Text: Soft Plum
  textPrimary: '#241B33', // Dark Text: Deep Plum
  textMuted: '#59445F', // Muted Text: Soft Plum
  textHint: '#AD91C1', // Soft Lavender
  textInverse: '#FFFFFF', // Contrast White

  // Status & Feedback
  success: '#2E7D32',
  warning: '#D4AF37',
  error: '#BA1A1A',
  errorContainer: '#FFDAD6',
  onErrorContainer: '#93000A',

  // Semantic Aliases (Required by Design System)
  primaryLight: '#F0E6F1',
  text: '#241B33',
  textSecondary: '#59445F',
  privacy: '#5A2F78', // Royal Plum for modesty curtain & privacy badges
  verified: '#D4AF37', // Heritage Gold for verified member badge
  lightLavender: '#F0E6F1',
  lavenderSurface: '#DBCADD',
  deepPlum: '#241B33',
  softPlum: '#59445F',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  margin: 20, // Standard mobile screen horizontal padding
};

export const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  input: 14,
  button: 14, // 14px for primary buttons and input fields
  card: 16, // 16px for cards, sheets, panels
  xl: 20,
  modal: 24, // 24px for bottom sheets & dialogue modals
  sheet: 24,
  full: 9999,
  pill: 9999, // Status tags, chips, round avatars
};

export const radius = radii;

export const typography = {
  fontFamilies: {
    headline: 'Manrope_700Bold',
    heading: 'Manrope_700Bold',
    body: 'Inter_400Regular',
    caption: 'Inter_500Medium',
    button: 'Inter_600SemiBold',
  },
  fontSizes: {
    headlineLg: 24,
    headlineMd: 20,
    headlineSm: 18,
    bodyLg: 16,
    bodyMd: 14,
    bodySm: 12,
    caption: 11,
  },

  // Headlines: Manrope
  displayLg: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 34,
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  headlineXl: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.3,
  },
  headlineLg: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.2,
  },
  headlineMd: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 20,
    lineHeight: 28,
  },
  headlineSm: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 18,
    lineHeight: 26,
  },

  // Body: Inter
  bodyLg: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMd: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22,
  },
  bodySm: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 18,
  },

  // Labels: Inter Bold/Medium
  labelLg: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 22,
  },
  labelMd: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 20,
  },
  labelSm: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  caption: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    lineHeight: 14,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#241B33',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  card: {
    shadowColor: '#6A3794',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  lg: {
    shadowColor: '#241B33',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  modal: {
    shadowColor: '#241B33',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 8,
  },
  sheet: {
    shadowColor: '#241B33',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 8,
  },
  button: {
    shadowColor: '#6A3794',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },
};
