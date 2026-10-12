import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, typography, radii, shadows } from '../../theme/tokens';
import {
  Splash01Illustration,
  Splash02Illustration,
  Splash03Illustration,
} from '../../components/illustrations/SplashIllustrations';

interface SplashScreenProps {
  onFinish?: () => void;
  onComplete?: () => void;
  onSkip?: () => void;
  initialSlide?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  onComplete,
  onSkip,
  initialSlide = 0,
}) => {
  const insets = useSafeAreaInsets();
  const triggerFinish = onComplete || onFinish || onSkip || (() => {});
  const [slideIndex, setSlideIndex] = useState(initialSlide);

  const slides = [
    {
      title: 'Find Someone Who Shares Your Values',
      subtitle:
        'Discover Muslim profiles based on values, faith, family and life goals.',
      renderIllustration: () => <Splash01Illustration />,
      btnText: 'Continue',
    },
    {
      title: 'Privacy Comes First',
      subtitle:
        'Control who can see your photos and personal information.',
      renderIllustration: () => <Splash02Illustration />,
      btnText: 'Continue',
    },
    {
      title: 'Meet With Purpose',
      subtitle:
        'One active conversation at a time. Involve family and chaperones when you choose.',
      renderIllustration: () => <Splash03Illustration />,
      btnText: 'Get Started',
    },
  ];

  const currentSlide = slides[slideIndex];

  const handleNext = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      triggerFinish();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top + 8, spacing.xl),
          paddingBottom: Math.max(insets.bottom + 12, spacing.xl),
        },
      ]}
    >
      {/* Top Header Bar */}
      <View style={styles.topRow}>
        <View style={styles.brandRow}>
          <View style={styles.brandLogoBox}>
            <MaterialIcons name="mosque" size={18} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.brandText}>DONO JAHAAN</Text>
            <Text style={styles.screenIndicator}>Serene Matrimony</Text>
          </View>
        </View>

        <TouchableOpacity onPress={onSkip || triggerFinish} activeOpacity={0.7} style={styles.skipTouch}>
          <Text style={styles.skipBtn}>Skip to App</Text>
        </TouchableOpacity>
      </View>

      {/* Center Slide Illustration & Typography */}
      <View style={styles.centerHero}>
        <View style={styles.illustrationCard}>
          {currentSlide.renderIllustration()}
        </View>

        <Text style={styles.title}>{currentSlide.title}</Text>
        <Text style={styles.subtitle}>{currentSlide.subtitle}</Text>
      </View>

      {/* Bottom Pinned Pagination & Primary Action */}
      <View style={styles.bottomDock}>
        <View style={styles.dotsRow}>
          {slides.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setSlideIndex(i)}
              activeOpacity={0.7}
              style={[
                styles.dot,
                i === slideIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleNext}
          activeOpacity={0.88}
        >
          <Text style={styles.continueButtonText}>{currentSlide.btnText}</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFCFC', // Warm White: Main background
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 44,
    paddingBottom: 28,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandLogoBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#6A3794', // Primary Purple: Rich Purple
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  brandText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#241B33', // Dark Text: Deep Plum
    letterSpacing: 1.2,
  },
  screenIndicator: {
    fontSize: 10,
    color: '#59445F', // Muted Text: Soft Plum
    fontWeight: '600',
  },
  skipTouch: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#F0E6F1', // Light Lavender: Background tint
  },
  skipBtn: {
    fontSize: 12,
    color: '#6A3794', // Primary Purple
    fontWeight: '700',
  },
  centerHero: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  illustrationCard: {
    width: 270,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#241B33', // Dark Text: Deep Plum
    textAlign: 'center',
    lineHeight: 33,
    letterSpacing: -0.5,
    marginBottom: 10,
    maxWidth: 320,
  },
  subtitle: {
    fontSize: 14,
    color: '#59445F', // Muted Text: Soft Plum
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 290,
  },
  bottomDock: {
    width: '100%',
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DBCADD', // Lavender Surface
  },
  dotActive: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6A3794', // Primary Purple
  },
  continueButton: {
    width: '100%',
    height: 54,
    borderRadius: 18,
    backgroundColor: '#6A3794', // Primary Purple
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...shadows.card,
  },
  continueButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF', // Contrast White
    letterSpacing: -0.2,
  },
});
