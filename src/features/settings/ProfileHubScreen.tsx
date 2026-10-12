import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, radius, shadows } from '../../theme/tokens';

import { useUserProfile } from '../../data/userProfile';

interface ProfileHubScreenProps {
  onNavigate?: (screen: string) => void;
  onSignOut?: () => void;
}

export const ProfileHubScreen: React.FC<ProfileHubScreenProps> = ({
  onNavigate,
  onSignOut,
}) => {
  const { profile, metrics } = useUserProfile();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>D O N O   J A H A</Text>
          <Text style={styles.greeting}>Good morning, {profile.name.split(' ')[0]}</Text>
        </View>
        <View style={styles.headerAvatar}>
          <Ionicons name="person" size={18} color="#FFFFFF" />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Summary Card */}
        <TouchableOpacity
          style={styles.profileCard}
          activeOpacity={0.88}
          onPress={() => onNavigate?.('ProfileDetail')}
        >
          <View style={styles.cardMain}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: profile.avatar,
                }}
                style={styles.avatarImage}
              />
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark" size={12} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.profileName}>{profile.name.split(' ')[0]}, {profile.age}</Text>
                <View style={styles.countryBadge}>
                  <Text style={styles.countryText}>{profile.country === 'India' ? 'IN' : 'GLOBAL'}</Text>
                </View>
              </View>

              <View style={styles.completionRow}>
                <View style={styles.checkCircle}>
                  <Ionicons name="checkmark" size={10} color={colors.primary} />
                </View>
                <Text style={styles.completionText}>Profile {metrics.percentage}% Complete</Text>
              </View>

              <Text style={styles.professionText} numberOfLines={1}>
                {profile.profession} • {profile.city}
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={20} color={colors.outline} />
        </TouchableOpacity>

        {/* Completion Milestone Micro-Banner (Hidden once 100% complete) */}
        {!metrics.isComplete && (
          <View style={styles.milestoneBanner}>
            <View style={styles.milestoneLeft}>
              <Ionicons name="star" size={18} color={colors.gold} />
              <Text style={styles.milestoneText} numberOfLines={1}>
                Profile {metrics.percentage}% complete • {metrics.nextStepTitle}
              </Text>
            </View>
            <TouchableOpacity onPress={() => onNavigate?.(metrics.nextStepRoute)}>
              <Text style={styles.milestoneAction}>Add Details →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Section 1: Preferences & Journey */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>PREFERENCES & JOURNEY</Text>
          <View style={styles.menuGroup}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => onNavigate?.('FamilyDetails')}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="people-outline" size={20} color={colors.primary} />
                </View>
                <View style={styles.menuTextWrap}>
                  <Text style={styles.menuTitle}>Family Details</Text>
                  <Text style={styles.menuSubtitle}>
                    Location, living arrangement & financial status
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.outline} />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => onNavigate?.('PartnerPreferences')}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="options-outline" size={20} color={colors.primary} />
                </View>
                <View style={styles.menuTextWrap}>
                  <Text style={styles.menuTitle}>Partner Preferences</Text>
                  <Text style={styles.menuSubtitle}>
                    Age range, profession, income & location
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.outline} />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => onNavigate?.('Questionnaire')}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="person-outline" size={20} color={colors.primary} />
                </View>
                <View style={styles.menuTextWrap}>
                  <Text style={styles.menuTitle}>Edit Essential Profile</Text>
                  <Text style={styles.menuSubtitle}>
                    Bio, career, education, deen & habits
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.outline} />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => onNavigate?.('AccountSettings')}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color={colors.primary} />
                </View>
                <View style={styles.menuTextWrap}>
                  <Text style={styles.menuTitle}>Privacy & Photos</Text>
                  <Text style={styles.menuSubtitle}>
                    Photo blur, view history & visibility
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.outline} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 2: Trust & Guardianship */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>TRUST & GUARDIANSHIP</Text>
          <View style={styles.menuGroup}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => onNavigate?.('SelfieVerification')}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
                </View>
                <View style={styles.menuTextWrap}>
                  <Text style={styles.menuTitle}>Identity Verification</Text>
                  <Text style={styles.menuSubtitle}>
                    Confidential selfie & trust badge status
                  </Text>
                </View>
              </View>
              <View style={styles.statusPill}>
                <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
                <Text style={styles.statusPillText}>
                  {profile.isVerified ? 'Verified' : 'Pending'}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => onNavigate?.('WaliDashboard')}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="shield-outline" size={20} color={colors.primary} />
                </View>
                <View style={styles.menuTextWrap}>
                  <Text style={styles.menuTitle}>Family & Wali Hub</Text>
                  <Text style={styles.menuSubtitle}>
                    Chaperone oversight, permissions & guardian coordination
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.outline} />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => onNavigate?.('ProfileViews')}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="eye-outline" size={20} color={colors.primary} />
                </View>
                <View style={styles.menuTextWrap}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={styles.menuTitle}>Who Viewed Your Profile</Text>
                    <View style={styles.activePill}>
                      <Text style={styles.activePillText}>12 New</Text>
                    </View>
                  </View>
                  <Text style={styles.menuSubtitle}>
                    See suitors who reviewed your profile this week
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.outline} />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => onNavigate?.('AccountSettings')}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="settings-outline" size={20} color={colors.primary} />
                </View>
                <View style={styles.menuTextWrap}>
                  <Text style={styles.menuTitle}>Account & Pause</Text>
                  <Text style={styles.menuSubtitle}>
                    Pause profile, privacy, data export & deletion
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.outline} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Matrimonial Code / Spiritual Etiquette Tile */}
        <View style={styles.etiquetteCard}>
          <View style={styles.etiquetteIconCircle}>
            <Ionicons name="heart" size={18} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.etiquetteTitle}>Pure Intentions Guarantee</Text>
            <Text style={styles.etiquetteDesc}>
              Profiles are strictly vetted to uphold family respect, Islamic decorum, and genuine intention toward Nikah.
            </Text>
          </View>
        </View>

        {/* Sign Out Button */}
        <View style={styles.footerSection}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={onSignOut}
            activeOpacity={0.8}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
          <Text style={styles.versionText}>
            Dono Jaha • Version 1.0.0 (Native Build)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    height: 64,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainer,
  },
  appTitle: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: typography.fontSizes.caption,
    color: colors.outline,
    letterSpacing: 2,
  },
  greeting: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSizes.headlineSm,
    fontWeight: '700',
    color: colors.onSurface,
  },
  headerAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl * 2,
  },
  profileCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.card,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.sm,
  },
  cardMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.md,
  },
  avatarContainer: {
    position: 'relative',
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  avatarImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileName: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  countryBadge: {
    backgroundColor: colors.parchmentDark,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  countryText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    fontWeight: '700',
    color: colors.gold,
  },
  completionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 3,
  },
  checkCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.parchmentDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completionText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  professionText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.outline,
    marginTop: 2,
  },
  milestoneBanner: {
    marginTop: spacing.sm,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  milestoneLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  milestoneText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    flex: 1,
  },
  milestoneAction: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    paddingLeft: 8,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionHeader: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.outline,
    marginBottom: spacing.xs,
    paddingHorizontal: 4,
  },
  menuGroup: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.card,
    overflow: 'hidden',
    ...shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  menuIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextWrap: {
    flex: 1,
  },
  menuTitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 15,
    fontWeight: '600',
    color: colors.onSurface,
  },
  menuSubtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.outline,
    marginTop: 2,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.surfaceContainer,
    marginLeft: 58,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPillText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  activePill: {
    backgroundColor: colors.goldLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  activePillText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 10,
    fontWeight: '700',
    color: colors.gold,
  },
  etiquetteCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.card,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  etiquetteIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  etiquetteTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  etiquetteDesc: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.outline,
    lineHeight: 18,
    marginTop: 2,
  },
  footerSection: {
    marginTop: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  signOutButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: radius.button,
    backgroundColor: 'rgba(186, 26, 26, 0.08)',
    alignItems: 'center',
  },
  signOutText: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 15,
    fontWeight: '700',
    color: colors.error,
  },
  versionText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    color: colors.outline,
    marginTop: spacing.xs,
  },
});
