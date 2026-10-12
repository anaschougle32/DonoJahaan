import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, radii, shadows } from '../../theme/tokens';

interface ProfileSetupCompleteScreenProps {
  onGoHome: () => void;
  onViewMatches?: () => void;
  onCompleteProfile?: () => void;
}

export const ProfileSetupCompleteScreen: React.FC<ProfileSetupCompleteScreenProps> = ({
  onGoHome,
  onViewMatches,
  onCompleteProfile,
}) => {
  const insets = useSafeAreaInsets();
  const handleViewMatches = onViewMatches || onGoHome;
  const handleContinuePhase2 = onCompleteProfile || handleViewMatches;

  // Progressive Milestone Animation Values (Section 9 Sequence)
  const contentFade = useRef(new Animated.Value(0)).current;
  const checkScale = useRef(new Animated.Value(0.3)).current;
  const ringScale = useRef(new Animated.Value(0.8)).current;
  const ringOpacity = useRef(new Animated.Value(0.8)).current;
  const bismillahFade = useRef(new Animated.Value(0)).current;
  const bismillahSlideY = useRef(new Animated.Value(14)).current;
  const titleFade = useRef(new Animated.Value(0)).current;
  const titleSlideY = useRef(new Animated.Value(14)).current;
  const progressFill = useRef(new Animated.Value(0)).current;
  const checkItem1 = useRef(new Animated.Value(0)).current;
  const checkItem2 = useRef(new Animated.Value(0)).current;
  const checkItem3 = useRef(new Animated.Value(0)).current;
  const ctaSlideY = useRef(new Animated.Value(20)).current;
  const ctaFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Content Fade In
    Animated.timing(contentFade, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();

    // 2. Checkmark spring & slight scale bounce
    Animated.spring(checkScale, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // 3. Circular ring animation expands
    Animated.parallel([
      Animated.timing(ringScale, {
        toValue: 1.35,
        duration: 900,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(ringOpacity, {
        toValue: 0.15,
        duration: 900,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    // 4. "BISMILLAH • PROFILE ACTIVE" fades upward
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(bismillahFade, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bismillahSlideY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, 100);

    // 5. "Your profile is live!" appears
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(titleFade, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(titleSlideY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, 200);

    // 6. Progress indicator animates/fills
    setTimeout(() => {
      Animated.timing(progressFill, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }, 300);

    // 7. Checklist items appear sequentially
    setTimeout(() => {
      Animated.timing(checkItem1, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }, 450);

    setTimeout(() => {
      Animated.timing(checkItem2, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }, 600);

    setTimeout(() => {
      Animated.timing(checkItem3, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }, 750);

    // 8. CTA appears with subtle upward motion
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(ctaFade, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(ctaSlideY, {
          toValue: 0,
          duration: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, 900);
  }, []);

  const progressInterpolate = progressFill.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '55%'],
  });

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, 24),
          paddingBottom: Math.max(insets.bottom, 24),
        },
      ]}
    >
      <Animated.View style={[styles.content, { opacity: contentFade }]}>
        {/* Expanding Ring Halo + Centered Checkmark */}
        <View style={styles.haloWrapper}>
          <Animated.View
            style={[
              styles.expandingRing,
              {
                transform: [{ scale: ringScale }],
                opacity: ringOpacity,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.checkCircle,
              {
                transform: [{ scale: checkScale }],
              },
            ]}
          >
            <Ionicons name="checkmark" size={42} color="#6A3794" />
          </Animated.View>
        </View>

        {/* Milestone Text Hierarchy */}
        <Animated.View
          style={{
            opacity: bismillahFade,
            transform: [{ translateY: bismillahSlideY }],
          }}
        >
          <Text style={styles.bismillahText}>BISMILLAH • PROFILE ACTIVE</Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: titleFade,
            transform: [{ translateY: titleSlideY }],
            alignItems: 'center',
          }}
        >
          <Text style={styles.liveTitle}>Your profile is live! 🎉</Text>
          <Text style={styles.liveSubtitle}>
            Your profile is now discoverable to compatible suitors. Let's complete the important details to improve your matches.
          </Text>
        </Animated.View>

        {/* Profile Completion Milestone Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeaderRow}>
            <View style={styles.percentBadge}>
              <Text style={styles.percentBadgeText}>Profile 55% complete</Text>
            </View>
            <View style={styles.phasePill}>
              <Text style={styles.phasePillText}>Milestone Reached</Text>
            </View>
          </View>

          <View style={styles.progressRail}>
            <Animated.View
              style={[styles.progressFill, { width: progressInterpolate }]}
            />
          </View>

          <Text style={styles.progressHint}>
            This is an active milestone, not the end of onboarding. Complete your profile details to improve proposal compatibility and family alignment.
          </Text>

          {/* Sequential Checklist Items (Section 9) */}
          <View style={styles.phase2PreviewList}>
            <Animated.View style={[styles.previewStepItem, { opacity: checkItem1 }]}>
              <Ionicons name="body-outline" size={16} color="#6A3794" />
              <Text style={styles.previewStepText}>Physical Details & Education</Text>
            </Animated.View>

            <Animated.View style={[styles.previewStepItem, { opacity: checkItem2 }]}>
              <Ionicons name="briefcase-outline" size={16} color="#6A3794" />
              <Text style={styles.previewStepText}>Profession, Family & Partner Preferences</Text>
            </Animated.View>

            <Animated.View style={[styles.previewStepItem, { opacity: checkItem3 }]}>
              <Ionicons name="shield-checkmark-outline" size={16} color="#6A3794" />
              <Text style={styles.previewStepText}>Profile Photos, Voice & Verification</Text>
            </Animated.View>
          </View>
        </View>

        {/* Trust & Privacy Assurance Pill */}
        <View style={styles.previewPill}>
          <View style={styles.pillItem}>
            <View style={styles.pillIconBox}>
              <MaterialIcons name="verified-user" size={16} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.pillItemTitle}>Discoverable</Text>
              <Text style={styles.pillItemSub}>Active in Suitors Feed</Text>
            </View>
          </View>

          <View style={styles.pillDivider} />

          <View style={styles.pillItem}>
            <View style={styles.pillIconBox}>
              <MaterialIcons name="shield" size={16} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.pillItemTitle}>Haya Privacy</Text>
              <Text style={styles.pillItemSub}>Protected & Dignified</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Animated Bottom Actions Dock */}
      <Animated.View
        style={[
          styles.bottomSection,
          {
            opacity: ctaFade,
            transform: [{ translateY: ctaSlideY }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.continuePhase2Btn}
          onPress={handleContinuePhase2}
          activeOpacity={0.88}
        >
          <Text style={styles.continuePhase2BtnText}>Continue to Complete Profile</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exploreMatchesLink}
          onPress={handleViewMatches}
          activeOpacity={0.7}
        >
          <Text style={styles.exploreMatchesLinkText}>Explore Matches for now</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFCFC',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    paddingTop: 16,
  },
  haloWrapper: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  expandingRing: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#6A3794',
    backgroundColor: '#F0E6F1',
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#6A3794',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  bismillahText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    fontWeight: '700',
    color: '#6A3794',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  liveTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 26,
    fontWeight: '700',
    color: '#241B33',
    marginBottom: 6,
    textAlign: 'center',
  },
  liveSubtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    color: '#59445F',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    maxWidth: 320,
  },
  progressCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DBCADD',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    ...shadows.card,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  percentBadge: {
    backgroundColor: '#F0E6F1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentBadgeText: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 12,
    color: '#6A3794',
    fontWeight: '700',
  },
  phasePill: {
    backgroundColor: '#FCF8ED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  phasePillText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 11,
    color: '#D4AF37',
    fontWeight: '700',
  },
  progressRail: {
    height: 8,
    backgroundColor: '#DBCADD',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6A3794',
    borderRadius: 4,
  },
  progressHint: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: '#59445F',
    lineHeight: 18,
    marginBottom: 14,
  },
  phase2PreviewList: {
    borderTopWidth: 1,
    borderTopColor: '#F0E6F1',
    paddingTop: 12,
    gap: 8,
  },
  previewStepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  previewStepText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 13,
    color: '#241B33',
    fontWeight: '500',
  },
  previewPill: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5A2F78',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  pillItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pillIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillItemTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pillItemSub: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 10,
    color: '#DBCADD',
  },
  pillDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 8,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
    paddingTop: 10,
  },
  continuePhase2Btn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6A3794',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
    ...shadows.card,
  },
  continuePhase2BtnText: {
    fontFamily: typography.fontFamilies.button,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  exploreMatchesLink: {
    paddingVertical: 6,
  },
  exploreMatchesLinkText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    color: '#59445F',
    fontWeight: '600',
  },
});
