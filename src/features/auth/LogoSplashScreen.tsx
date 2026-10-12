import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogoEmblemSvg } from '../../components/illustrations/SplashIllustrations';
import { colors, spacing, typography, radii, shadows } from '../../theme/tokens';
import { MaterialIcons } from '@expo/vector-icons';

interface LogoSplashScreenProps {
  onStart: () => void;
  onDirectLogin: () => void;
  onExplore: () => void;
}

export const LogoSplashScreen: React.FC<LogoSplashScreenProps> = ({
  onStart,
  onDirectLogin,
  onExplore,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top + 12, spacing.xxl),
          paddingBottom: Math.max(insets.bottom + 12, spacing.xl),
        },
      ]}
    >
      {/* Top Spiritual Blessing */}
      <View style={styles.topHeader}>
        <Text style={styles.bismillahArabic}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
        <Text style={styles.bismillahEnglish}>
          In the Name of Allah, the Most Gracious, the Most Merciful
        </Text>
      </View>

      {/* Center Grand Logo Crest */}
      <View style={styles.centerSection}>
        <View style={styles.emblemHalo}>
          <LogoEmblemSvg size={110} />
        </View>

        <Text style={styles.brandTitle}>DONO JAHAAN</Text>
        <View style={styles.goldDivider} />
        <Text style={styles.tagline}>SERENE ISLAMIC MATRIMONY</Text>

        <Text style={styles.missionText}>
          A dignified space where faith meets companionship, protected by privacy, family values, and halal intentional communication.
        </Text>

        {/* Quranic Anchor */}
        <View style={styles.quranCard}>
          <MaterialIcons name="auto-awesome" size={16} color="#D4AF37" />
          <Text style={styles.quranVerse}>
            “And of His signs is that He created for you spouses from among yourselves, that you may find tranquility in them...”
          </Text>
          <Text style={styles.quranSurah}>— Surah Ar-Rum 30:21</Text>
        </View>
      </View>

      {/* Bottom Pinned CTAs */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={onStart}
          activeOpacity={0.88}
        >
          <Text style={styles.primaryBtnText}>Begin Blessed Journey</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.subActionsRow}>
          <TouchableOpacity onPress={onDirectLogin} activeOpacity={0.7}>
            <Text style={styles.signInLink}>Already registered? <Text style={styles.signInLinkBold}>Sign In</Text></Text>
          </TouchableOpacity>

          <Text style={styles.actionDot}>•</Text>

          <TouchableOpacity onPress={onExplore} activeOpacity={0.7}>
            <Text style={styles.exploreLink}>Explore App</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#241B33', // Deep Plum backdrop
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
  },
  topHeader: {
    alignItems: 'center',
    paddingTop: 8,
  },
  bismillahArabic: {
    fontSize: 20,
    color: '#D4AF37', // Heritage Gold
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 1,
  },
  bismillahEnglish: {
    fontSize: 11,
    color: '#AD91C1', // Soft Lavender
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
  centerSection: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  emblemHalo: {
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF', // Contrast White
    letterSpacing: 4,
    textAlign: 'center',
  },
  goldDivider: {
    width: 48,
    height: 2,
    backgroundColor: '#D4AF37',
    marginVertical: 8,
    borderRadius: 1,
  },
  tagline: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D4AF37',
    letterSpacing: 2,
    marginBottom: spacing.md,
  },
  missionText: {
    fontSize: 13,
    color: '#F0E6F1', // Light Lavender
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
    marginBottom: spacing.lg,
  },
  quranCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(173, 145, 193, 0.3)', // Soft Lavender subtle border
    alignItems: 'center',
    maxWidth: 340,
  },
  quranVerse: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 18,
    marginVertical: 6,
  },
  quranSurah: {
    fontSize: 10,
    color: '#D4AF37',
    fontWeight: '700',
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  primaryBtn: {
    width: '100%',
    height: 54,
    backgroundColor: '#6A3794', // Primary Purple: Rich Purple
    borderRadius: radii.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(219, 202, 221, 0.4)',
    ...shadows.card,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF', // Contrast White
  },
  subActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  signInLink: {
    fontSize: 13,
    color: '#AD91C1', // Soft Lavender
  },
  signInLinkBold: {
    color: '#FFFFFF',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  actionDot: {
    color: '#AD91C1',
  },
  exploreLink: {
    fontSize: 13,
    color: '#AD91C1',
    fontWeight: '600',
  },
});
