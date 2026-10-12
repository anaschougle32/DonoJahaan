import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, radius, shadows } from '../../theme/tokens';

interface NotificationsScreenProps {
  onBack?: () => void;
  onOpenChat?: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onBack,
  onOpenChat,
}) => {
  const [allRead, setAllRead] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        <View style={styles.headerAvatar}>
          <Ionicons name="person" size={16} color="#FFFFFF" />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Inbox Subheader */}
        <View style={styles.inboxRow}>
          <View>
            <Text style={styles.inboxLabel}>INBOX</Text>
            <Text style={styles.inboxSubtext}>Stay updated on matches & guardian activity</Text>
          </View>
          <TouchableOpacity
            style={[styles.markReadButton, allRead && styles.markReadButtonDisabled]}
            onPress={() => setAllRead(true)}
            disabled={allRead}
            activeOpacity={0.7}
          >
            <Ionicons
              name={allRead ? 'checkmark' : 'checkmark-done'}
              size={16}
              color={allRead ? colors.outline : colors.primary}
            />
            <Text style={[styles.markReadText, allRead && { color: colors.outline }]}>
              {allRead ? 'All Read' : 'Mark all read'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Section: Today */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionLabelWrap}>
            <View style={styles.activeDot} />
            <Text style={styles.sectionTitle}>TODAY</Text>
          </View>
          {!allRead && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>1 New</Text>
            </View>
          )}
        </View>

        {/* Notification 1: Accepted Interest with Chaperone & Quick CTA */}
        <View style={[styles.notificationCard, !allRead && styles.notificationCardUnread]}>
          <View style={styles.notifTop}>
            <View style={styles.blurredThumbWrap}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
                }}
                style={styles.blurredImage}
                blurRadius={6}
              />
              <View style={styles.thumbLockOverlay}>
                <Ionicons name="lock-closed" size={11} color={colors.primary} />
              </View>
            </View>

            <View style={styles.notifBody}>
              <Text style={styles.notifTitle}>Fatima accepted your interest!</Text>
              <Text style={styles.notifSubtitle}>You can now start a conversation.</Text>
            </View>

            <View style={styles.notifMeta}>
              <Text style={styles.timeAgoActive}>2m ago</Text>
              {!allRead && <View style={styles.unreadDot} />}
            </View>
          </View>

          {/* Action Row */}
          <View style={styles.chaperoneActionRow}>
            <View style={styles.chaperoneTagWrap}>
              <MaterialCommunityIcons name="handshake-outline" size={16} color={colors.gold} />
              <Text style={styles.chaperoneTagText}>Chaperone enabled conversation</Text>
            </View>
            <TouchableOpacity
              style={styles.saySalamButton}
              onPress={onOpenChat}
              activeOpacity={0.85}
            >
              <Text style={styles.saySalamText}>Say Salam</Text>
              <Ionicons name="send" size={12} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification 2: Photo Access Granted */}
        <View style={styles.notificationCard}>
          <View style={styles.notifTop}>
            <View style={styles.iconCircle}>
              <Ionicons name="images-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.notifBody}>
              <Text style={styles.notifTitle}>Photo access granted.</Text>
              <Text style={styles.notifSubtitle}>Sara allowed you to view her private photos.</Text>
            </View>
            <Text style={styles.timeAgo}>1h ago</Text>
          </View>
        </View>

        {/* Section: Yesterday */}
        <View style={[styles.sectionHeaderRow, { marginTop: spacing.lg }]}>
          <View style={styles.sectionLabelWrap}>
            <View style={[styles.activeDot, { backgroundColor: colors.outlineVariant }]} />
            <Text style={styles.sectionTitle}>YESTERDAY</Text>
          </View>
        </View>

        {/* Notification 3: Profile Verification Approved */}
        <View style={styles.notificationCard}>
          <View style={styles.notifTop}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(106, 55, 148, 0.12)' }]}>
              <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
            </View>
            <View style={styles.notifBody}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={styles.notifTitle}>Identity verified.</Text>
                <View style={styles.familyBadge}>
                  <Text style={styles.familyBadgeText}>BADGE</Text>
                </View>
              </View>
              <Text style={styles.notifSubtitle}>Your selfie verification has been approved.</Text>
            </View>
            <Text style={styles.timeAgo}>Yesterday</Text>
          </View>
        </View>

        {/* Notification 4: Verification Approved */}
        <View style={styles.notificationCard}>
          <View style={styles.notifTop}>
            <View style={styles.iconCircle}>
              <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
            </View>
            <View style={styles.notifBody}>
              <Text style={styles.notifTitle}>Identity verification approved</Text>
              <Text style={styles.notifSubtitle}>Your profile now displays the Verified badge.</Text>
            </View>
            <Text style={styles.timeAgo}>Yesterday</Text>
          </View>
        </View>

        {/* Quiet Hours Banner */}
        <View style={styles.quietHoursCard}>
          <View style={styles.quietHoursIcon}>
            <MaterialCommunityIcons name="moon-waning-crescent" size={20} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.quietHoursTitle}>Quiet Hours Active</Text>
            <Text style={styles.quietHoursDesc}>
              Match alerts are muted between Isha and Fajr prayers.
            </Text>
          </View>
          <Ionicons name="options-outline" size={18} color={colors.outline} />
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
    height: 56,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainer,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.xs,
  },
  headerTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl * 2,
    gap: spacing.sm,
  },
  inboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  inboxLabel: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    fontWeight: '700',
    color: colors.outline,
    letterSpacing: 1,
  },
  inboxSubtext: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  markReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  markReadButtonDisabled: {
    opacity: 0.6,
  },
  markReadText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  sectionLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  sectionTitle: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.outline,
  },
  newBadge: {
    backgroundColor: colors.parchmentDark,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  newBadgeText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  notificationCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.card,
    padding: spacing.md,
    ...shadows.sm,
  },
  notificationCardUnread: {
    backgroundColor: colors.surfaceContainer,
  },
  notifTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blurredThumbWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.surfaceContainerHighest,
  },
  blurredImage: {
    width: '100%',
    height: '100%',
  },
  thumbLockOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(90, 47, 120, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBody: {
    flex: 1,
    marginLeft: spacing.sm,
    marginRight: spacing.xs,
  },
  notifTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  notifSubtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  notifMeta: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 40,
  },
  timeAgoActive: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  timeAgo: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    color: colors.outline,
  },
  chaperoneActionRow: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: radius.md,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  chaperoneTagWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  chaperoneTagText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  saySalamButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  saySalamText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  familyBadge: {
    backgroundColor: colors.parchmentDark,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  familyBadgeText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 9,
    fontWeight: '700',
    color: colors.gold,
  },
  quietHoursCard: {
    marginTop: spacing.md,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.card,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  quietHoursIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quietHoursTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 13,
    fontWeight: '700',
    color: colors.onSurface,
  },
  quietHoursDesc: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
});
