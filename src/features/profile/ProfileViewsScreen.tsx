import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, radii, shadows, spacing, typography } from '../../theme/tokens';
import { TopBar } from '../../components/common/TopBar';

interface ProfileViewer {
  id: string;
  name: string;
  age: number;
  location: string;
  profession: string;
  avatar: string;
  viewedTime: string;
  isVerified: boolean;
  isPhotoBlurred: boolean;
  timeGroup: 'today' | 'yesterday' | 'earlier';
}

const MOCK_VIEWERS: ProfileViewer[] = [
  {
    id: 'profile-ayesha-27',
    name: 'Ayesha M.',
    age: 27,
    location: 'Mumbai, Maharashtra',
    profession: 'Clinical Psychologist',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    viewedTime: 'Viewed 2h ago',
    isVerified: true,
    isPhotoBlurred: true,
    timeGroup: 'today',
  },
  {
    id: 'profile-umra-26',
    name: 'Umra S.',
    age: 26,
    location: 'Noida, Uttar Pradesh',
    profession: 'Doctor (MD)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    viewedTime: 'Viewed 5h ago',
    isVerified: true,
    isPhotoBlurred: false,
    timeGroup: 'today',
  },
  {
    id: 'profile-fatima-25',
    name: 'Fatima Z.',
    age: 25,
    location: 'South Delhi, Delhi NCR',
    profession: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    viewedTime: 'Viewed yesterday',
    isVerified: true,
    isPhotoBlurred: true,
    timeGroup: 'yesterday',
  },
  {
    id: 'v-4',
    name: 'Mariam R.',
    age: 28,
    location: 'Hyderabad, Telangana',
    profession: 'Chartered Accountant (CA)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
    viewedTime: 'Viewed yesterday',
    isVerified: false,
    isPhotoBlurred: false,
    timeGroup: 'yesterday',
  },
  {
    id: 'v-5',
    name: 'Sana Q.',
    age: 26,
    location: 'Bengaluru, Karnataka',
    profession: 'Data Scientist',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
    viewedTime: 'Viewed 3 days ago',
    isVerified: true,
    isPhotoBlurred: true,
    timeGroup: 'earlier',
  },
];

interface ProfileViewsScreenProps {
  onBack?: () => void;
  onViewProfile?: (viewerId: string, name: string) => void;
}

export const ProfileViewsScreen: React.FC<ProfileViewsScreenProps> = ({
  onBack,
  onViewProfile,
}) => {
  const insets = useSafeAreaInsets();
  const [viewers] = useState<ProfileViewer[]>(MOCK_VIEWERS);

  const todayViewers = viewers.filter((v) => v.timeGroup === 'today');
  const yesterdayViewers = viewers.filter((v) => v.timeGroup === 'yesterday');
  const earlierViewers = viewers.filter((v) => v.timeGroup === 'earlier');

  const renderViewerItem = (item: ProfileViewer) => {
    return (
      <View key={item.id} style={styles.viewerItem}>
        {/* Avatar with Modesty Blur Support */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: item.avatar }}
            style={[
              styles.avatarImage,
              item.isPhotoBlurred && Platform.OS === 'web' && ({ filter: 'blur(12px)' } as any),
            ]}
            blurRadius={item.isPhotoBlurred ? 12 : 0}
          />
          {item.isPhotoBlurred && (
            <View style={styles.blurVeilBadge}>
              <Ionicons name="lock-closed" size={10} color="#FFFFFF" />
            </View>
          )}
        </View>

        {/* Info */}
        <View style={styles.infoCol}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>
              {item.name}, {item.age}
            </Text>
            {item.isVerified && (
              <MaterialIcons name="verified" size={15} color="#D4AF37" />
            )}
          </View>
          <Text style={styles.professionText} numberOfLines={1}>
            {item.profession}
          </Text>
          <Text style={styles.locationText} numberOfLines={1}>
            📍 {item.location}
          </Text>
          <Text style={styles.timeText}>{item.viewedTime}</Text>
        </View>

        {/* View Profile Action */}
        <TouchableOpacity
          style={styles.viewProfileBtn}
          onPress={() => onViewProfile?.(item.id, item.name)}
          activeOpacity={0.8}
        >
          <Text style={styles.viewProfileBtnText}>View</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.primary} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopBar title="Who Viewed Your Profile" onBack={onBack} />

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Hero Card */}
        <View style={styles.statsCard}>
          <View style={styles.statsHeaderRow}>
            <View style={styles.statsIconBox}>
              <Ionicons name="eye" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.statsCountText}>{viewers.length} Profile Views</Text>
              <Text style={styles.statsSubText}>
                Active suitors who reviewed your matrimonial biodata this week
              </Text>
            </View>
          </View>

          <View style={styles.statsDivider} />

          <View style={styles.statsMetricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>+{todayViewers.length}</Text>
              <Text style={styles.metricLabel}>Today</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>100%</Text>
              <Text style={styles.metricLabel}>Verified Accounts</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>High</Text>
              <Text style={styles.metricLabel}>Match Intent</Text>
            </View>
          </View>
        </View>

        {/* Group 1: TODAY */}
        {todayViewers.length > 0 && (
          <View style={styles.groupSection}>
            <Text style={styles.groupHeader}>TODAY</Text>
            <View style={styles.groupCard}>
              {todayViewers.map(renderViewerItem)}
            </View>
          </View>
        )}

        {/* Group 2: YESTERDAY */}
        {yesterdayViewers.length > 0 && (
          <View style={styles.groupSection}>
            <Text style={styles.groupHeader}>YESTERDAY</Text>
            <View style={styles.groupCard}>
              {yesterdayViewers.map(renderViewerItem)}
            </View>
          </View>
        )}

        {/* Group 3: EARLIER */}
        {earlierViewers.length > 0 && (
          <View style={styles.groupSection}>
            <Text style={styles.groupHeader}>EARLIER THIS WEEK</Text>
            <View style={styles.groupCard}>
              {earlierViewers.map(renderViewerItem)}
            </View>
          </View>
        )}

        <Text style={styles.privacyNote}>
          🔒 Dono Jahaan protects suitor privacy: Profile views are recorded only when genuine prospective matches review your profile card.
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
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    padding: 18,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  statsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statsIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsCountText: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 20,
    fontWeight: '700',
    color: colors.deepPlum,
  },
  statsSubText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  statsDivider: {
    height: 1,
    backgroundColor: colors.primarySoft,
    marginVertical: 14,
  },
  statsMetricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  metricLabel: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
  groupSection: {
    marginBottom: spacing.lg,
  },
  groupHeader: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  groupCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    overflow: 'hidden',
    ...shadows.card,
  },
  viewerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceSubtle,
    gap: 12,
  },
  avatarWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.surfaceContainerLow,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  blurVeilBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nameText: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 15,
    fontWeight: '700',
    color: colors.deepPlum,
  },
  professionText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 1,
  },
  locationText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 1,
  },
  timeText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 3,
  },
  viewProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radii.pill,
    gap: 4,
  },
  viewProfileBtnText: {
    fontFamily: typography.fontFamilies.button,
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  privacyNote: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 8,
    paddingHorizontal: 12,
  },
});
