import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, radii, shadows } from '../../theme/tokens';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { MatrimonialProfile } from '../../types';
import { mockActiveSuitor, mockCuratedMatches } from '../../mocks/matrimonialData';
import { getDiscoverableProfiles } from '../../services/profileService';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserProfile } from '../../data/userProfile';

interface HomeScreenProps {
  onOpenChat?: () => void;
  onViewProfile?: (suitor: MatrimonialProfile) => void;
  onExploreMatches?: () => void;
  onOpenNotifications?: () => void;
  onNavigate?: (screen: string) => void;
  activeSuitor?: MatrimonialProfile;
  curatedMatches?: MatrimonialProfile[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenChat,
  onViewProfile,
  onExploreMatches,
  onOpenNotifications,
  onNavigate,
  activeSuitor = mockActiveSuitor,
  curatedMatches = mockCuratedMatches,
}) => {
  const insets = useSafeAreaInsets();
  const { profile, metrics } = useUserProfile();
  const [liveCurated, setLiveCurated] = useState<MatrimonialProfile[]>(curatedMatches);

  useEffect(() => {
    let isMounted = true;
    async function loadCurated() {
      try {
        const live = await getDiscoverableProfiles();
        if (isMounted && live && live.length > 0) {
          setLiveCurated(live);
        }
      } catch (err) {
        console.warn('HomeScreen curated matches notice:', err);
      }
    }
    loadCurated();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenChat = onOpenChat || (() => onNavigate?.('Chat'));
  const handleViewProfile = onViewProfile || (() => onNavigate?.('ProfileDetail'));
  const handleExploreMatches = onExploreMatches || (() => onNavigate?.('Matches'));
  const handleOpenNotifications = onOpenNotifications || (() => onNavigate?.('Notifications'));

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={[styles.scrollBody, { paddingBottom: spacing.xl + 20 }]}
    >
      {/* Top Greeter & Notification Row */}
      <View style={styles.greeterRow}>
        <View>
          <View style={styles.intentBadge}>
            <View style={styles.pulsingDot} />
            <Text style={styles.intentText}>DONO JAHAAN MATRIMONIAL</Text>
          </View>
          <Text style={styles.greetingTitle}>Good morning, {profile.name.split(' ')[0]}</Text>
        </View>

        <Pressable
          style={styles.notifButton}
          onPress={handleOpenNotifications}
          accessibilityLabel="Notifications"
        >
          <MaterialIcons name="notifications" size={20} color={colors.textPrimary} />
        </Pressable>
      </View>

      {/* Profile Completion Progress Banner (Data-driven metrics) */}
      {!metrics.isComplete && (
        <Pressable
          style={styles.completionCard}
          onPress={() => onNavigate?.(metrics.nextStepRoute)}
        >
          <View style={styles.completionHeaderRow}>
            <View style={styles.completionBadgeRow}>
              <MaterialIcons name="verified-user" size={18} color={colors.primary} />
              <Text style={styles.completionTitle}>Profile {metrics.percentage}% Complete</Text>
            </View>
            <View style={styles.stepsPill}>
              <Text style={styles.stepsPillText}>Live • Next: {metrics.nextStepTitle.split(' ')[0]}</Text>
            </View>
          </View>

          <View style={styles.progressRail}>
            <View style={[styles.progressFill, { width: `${metrics.percentage}%` }]} />
          </View>

          <View style={styles.completionActionRow}>
            <Text style={styles.completionHint}>{metrics.nextStepTitle}</Text>
            <Text style={styles.completeLink}>Complete →</Text>
          </View>
        </Pressable>
      )}

      {/* Profile Views Entry Card (Section 36 & 37) */}
      <Pressable
        style={styles.profileViewsCard}
        onPress={() => onNavigate?.('ProfileViews')}
      >
        <View style={styles.viewsLeft}>
          <View style={styles.viewsIconCircle}>
            <Ionicons name="eye" size={20} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.viewsTitle}>12 suitors viewed your profile</Text>
            <Text style={styles.viewsSub}>Tap to see who reviewed your profile this week</Text>
          </View>
        </View>
        <View style={styles.viewsActionRow}>
          <Text style={styles.viewsActionText}>View All</Text>
          <Ionicons name="arrow-forward" size={14} color={colors.primary} />
        </View>
      </Pressable>

      {/* CORE DIFFERENTIATOR: Active Matrimonial Conversation Banner */}
      {activeSuitor ? (
        <View style={styles.activeChatHero}>
          <View style={styles.activeChatHeader}>
            <View style={styles.activeTagRow}>
              <View style={styles.activeGreenDot} />
              <Text style={styles.activeTagText}>YOUR ACTIVE CONVERSATION</Text>
            </View>
            <View style={styles.activeTagPill}>
              <MaterialIcons name="handshake" size={13} color={colors.primary} />
              <Text style={styles.activeTagPillText}>One Active Proposal</Text>
            </View>
          </View>

          <Pressable
            style={styles.activeSuitorRow}
            onPress={() => handleViewProfile(activeSuitor)}
          >
            <View style={styles.avatarCircle}>
              <Image
                source={{ uri: activeSuitor.avatar }}
                style={styles.avatarImage}
              />
            </View>

            <View style={styles.suitorInfoContainer}>
              <View style={styles.nameRow}>
                <Text style={styles.suitorName}>{activeSuitor.name}, {activeSuitor.age}</Text>
                <MaterialIcons name="verified" size={16} color={colors.primary} />
              </View>
              <Text style={styles.activityNotice}>Sent a voice note 10m ago</Text>
              <Text style={styles.suitorSubtitle} numberOfLines={1}>
                {activeSuitor.profession} • {activeSuitor.location}
              </Text>
            </View>
          </Pressable>

          <PrimaryButton
            title="Open Matrimonial Chat"
            icon="chat-bubble"
            onPress={handleOpenChat}
            style={styles.openChatBtn}
          />
        </View>
      ) : (
        <View style={styles.noActiveChatCard}>
          <MaterialIcons name="connect-without-contact" size={32} color={colors.primary} />
          <Text style={styles.noActiveChatTitle}>No Active Conversation</Text>
          <Text style={styles.noActiveChatDesc}>
            Explore vetted suitors and express interest to begin one dedicated matrimonial conversation.
          </Text>
          <PrimaryButton
            title="Explore Matches"
            variant="secondary"
            onPress={handleExploreMatches}
          />
        </View>
      )}

      {/*  Recommended Curated Matches Carousel  */}
      <View style={styles.carouselHeaderRow}>
        <View>
          <Text style={styles.carouselTitle}>Based on Your Preferences</Text>
          <Text style={styles.carouselSubtitle}>
            Curated for family and spiritual harmony
          </Text>
        </View>
        <Pressable onPress={handleExploreMatches}>
          <Text style={styles.viewAllLink}>View all</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {liveCurated.map((suitor) => (
          <Pressable
            key={suitor.id}
            style={styles.miniCard}
            onPress={() => handleViewProfile(suitor)}
          >
            <View style={styles.miniCardImageWrapper}>
              <Image
                source={{ uri: suitor.avatar }}
                style={styles.miniCardImage}
                blurRadius={suitor.isPhotoBlurred ? 18 : 0}
              />
              {suitor.isPhotoBlurred && (
                <View style={styles.protectedOverlay}>
                  <View style={styles.protectedPill}>
                    <MaterialIcons name="lock" size={11} color={colors.primary} />
                    <Text style={styles.protectedText}>Protected</Text>
                  </View>
                </View>
              )}
            </View>

            <View style={styles.miniCardBody}>
              <Text style={styles.miniCardName} numberOfLines={1}>
                {suitor.name}, {suitor.age}
              </Text>
              <Text style={styles.miniCardLocation} numberOfLines={1}>
                {suitor.location.split(',')[0]}
              </Text>
              <Text style={styles.miniCardSect} numberOfLines={1}>
                {suitor.sect} • {suitor.schoolOfThought}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollBody: {
    padding: spacing.margin,
    paddingBottom: 90,
  },
  greeterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  intentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  pulsingDot: {
    width: 6,
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
  intentText: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  greetingTitle: {
    ...typography.headlineMd,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  notifButton: {
    width: 38,
    height: 38,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completionCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  completionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  completionBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  completionTitle: {
    ...typography.labelMd,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  stepsPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceContainerLow,
  },
  stepsPillText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  progressRail: {
    width: '100%',
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceContainerHigh,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
  },
  completionActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  completionHint: {
    ...typography.bodySm,
    color: colors.textMuted,
  },
  completeLink: {
    ...typography.labelSm,
    color: colors.primary,
    fontWeight: '700',
  },
  activeChatHero: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.card,
    padding: spacing.lg,
    borderWidth: 1.5,
    borderColor: colors.primarySoft,
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  activeChatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  activeTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeGreenDot: {
    width: 8,
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
  activeTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  activeTagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceCard,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  activeTagPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  profileViewsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    padding: 14,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  viewsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  viewsIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewsTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 14,
    fontWeight: '700',
    color: colors.deepPlum,
  },
  viewsSub: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  viewsActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingLeft: 8,
  },
  viewsActionText: {
    fontFamily: typography.fontFamilies.button,
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  activeSuitorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  suitorInfoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  suitorName: {
    ...typography.headlineSm,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  activityNotice: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    marginTop: 1,
  },
  suitorSubtitle: {
    ...typography.bodySm,
    color: colors.textMuted,
    marginTop: 1,
  },
  openChatBtn: {
    height: 48,
  },
  noActiveChatCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.card,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.border,
    marginBottom: spacing.xl,
    gap: spacing.xs,
  },
  noActiveChatTitle: {
    ...typography.labelLg,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  noActiveChatDesc: {
    ...typography.bodySm,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: 18,
  },
  carouselHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  carouselTitle: {
    ...typography.headlineSm,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  carouselSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
  },
  viewAllLink: {
    ...typography.labelSm,
    color: colors.primary,
    fontWeight: '700',
  },
  horizontalScroll: {
    gap: spacing.md,
    paddingBottom: spacing.sm,
  },
  miniCard: {
    width: 148,
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  miniCardImageWrapper: {
    width: '100%',
    height: 120,
    backgroundColor: colors.surfaceContainerHigh,
    position: 'relative',
    overflow: 'hidden',
  },
  miniCardImage: {
    width: '100%',
    height: '100%',
  },
  protectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(20, 29, 26, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  protectedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  protectedText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  miniCardBody: {
    padding: spacing.sm,
  },
  miniCardName: {
    ...typography.labelMd,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  miniCardLocation: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 1,
  },
  miniCardSect: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 4,
  },
});
