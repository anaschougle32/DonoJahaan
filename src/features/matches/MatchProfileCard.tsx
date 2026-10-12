import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, radii, shadows, typography, spacing } from '../../theme/tokens';
import { MatrimonialProfile } from '../../types';

interface MatchProfileCardProps {
  suitor: MatrimonialProfile;
  cardHeight: number;
  isPhotoRevealed?: boolean;
  onViewProfile?: () => void;
  onRequestPhoto?: () => void;
  onConnect?: () => void;
  onOpenMenu?: () => void;
}

export const MatchProfileCard: React.FC<MatchProfileCardProps> = ({
  suitor,
  cardHeight,
  isPhotoRevealed = false,
  onViewProfile,
  onRequestPhoto,
  onConnect,
  onOpenMenu,
}) => {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const isFemale = suitor.gender === 'female';
  const shouldBlur = isFemale && suitor.isPhotoBlurred && !isPhotoRevealed;

  const toggleVoice = () => {
    setIsPlayingVoice(!isPlayingVoice);
  };

  // Measured card proportions to completely eliminate dead white space (Section 29 & 31)
  const effectiveCardHeight = Math.max(cardHeight, 480);
  const imageHeight = Math.max(Math.round(effectiveCardHeight * 0.45), 260);

  return (
    <View style={styles.card}>
      {/* ========================================================
          1. Profile Image Area (Blurred for Female Haya Privacy)
      ======================================================== */}
      <View style={[styles.imageContainer, { height: imageHeight }]}>
        <Image
          source={{ uri: suitor.avatar }}
          style={[
            styles.profileImage,
            shouldBlur && Platform.OS === 'web' && ({ filter: 'blur(16px)' } as any),
          ]}
          blurRadius={shouldBlur ? (Platform.OS === 'ios' ? 24 : 14) : 0}
          resizeMode="cover"
        />

        {/* Top Floating Badges (Promoted, VIP crown, More Options) */}
        <View style={styles.topBadgesRow}>
          <View style={styles.promotedPill}>
            <Text style={styles.promotedText}>Promoted</Text>
            <Ionicons name="information-circle-outline" size={13} color="#FFFFFF" />
          </View>

          <View style={styles.topRightActions}>
            <View style={styles.vipCrownBadge}>
              <MaterialIcons name="workspace-premium" size={16} color="#FFFFFF" />
            </View>
            <TouchableOpacity
              style={styles.moreBtn}
              onPress={onOpenMenu}
              activeOpacity={0.7}
            >
              <Ionicons name="ellipsis-vertical" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Female Haya Modesty Photo Veil & Reveal Request Action */}
        {shouldBlur && (
          <View style={styles.privacyOverlay}>
            <View style={styles.privacyLockIcon}>
              <Ionicons name="images-outline" size={22} color="#FFFFFF" />
              <View style={styles.lockMiniBadge}>
                <Ionicons name="lock-closed" size={10} color="#6A3794" />
              </View>
            </View>

            <Text style={styles.privacyText}>
              {suitor.name} has protected her photo{'\n'}under Haya privacy
            </Text>

            <TouchableOpacity
              style={styles.unlockPhotoBtn}
              onPress={onRequestPhoto}
              activeOpacity={0.88}
            >
              <MaterialIcons name="visibility" size={15} color="#FFFFFF" />
              <Text style={styles.unlockPhotoBtnText}>Request Photo Reveal</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* ========================================================
          2. Voice Introduction (Immediately Below Profile Image)
          Section 33: Voice introduction appears right below photo!
      ======================================================== */}
      {suitor.hasVoiceIntro && (
        <TouchableOpacity
          style={[styles.voiceIntroPill, isPlayingVoice && styles.voiceIntroPillActive]}
          onPress={toggleVoice}
          activeOpacity={0.85}
        >
          <View style={styles.voicePlayCircle}>
            <Ionicons
              name={isPlayingVoice ? 'pause' : 'play'}
              size={13}
              color="#FFFFFF"
            />
          </View>

          <View style={styles.voiceTrack}>
            <Text style={styles.voiceTitle} numberOfLines={1}>
              {isPlayingVoice ? 'Playing Voice Introduction...' : 'Listen to Voice Introduction'}
            </Text>
            <View style={styles.waveformBars}>
              <View style={[styles.waveBar, { height: 6 }]} />
              <View style={[styles.waveBar, { height: 12 }]} />
              <View style={[styles.waveBar, { height: 16 }]} />
              <View style={[styles.waveBar, { height: 10 }]} />
              <View style={[styles.waveBar, { height: 14 }]} />
              <View style={[styles.waveBar, { height: 18 }]} />
              <View style={[styles.waveBar, { height: 12 }]} />
              <View style={[styles.waveBar, { height: 7 }]} />
            </View>
          </View>

          <View style={styles.durationChip}>
            <Text style={styles.durationChipText}>
              0:{suitor.voiceDuration || 45}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {/* ========================================================
          3. Candidate Information Hierarchy (Stitch Layout)
      ======================================================== */}
      <Pressable style={styles.infoSection} onPress={onViewProfile}>
        {/* Name, Age, Verified badge */}
        <View style={styles.nameRow}>
          <Text style={styles.nameText} numberOfLines={1}>
            {suitor.name}, {suitor.age}
          </Text>
          {suitor.isVerified && (
            <MaterialIcons name="verified" size={18} color="#D4AF37" />
          )}
        </View>

        {/* Height • Sect / Community • Profession */}
        <Text style={styles.vitalSpecsText} numberOfLines={1}>
          {suitor.height ? `${suitor.height.split('(')[0].trim()} • ` : ''}
          {suitor.sect} • {suitor.profession}
        </Text>

        {/* Location with Pin */}
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={13} color="#59445F" />
          <Text style={styles.locationText} numberOfLines={1}>{suitor.location}</Text>
        </View>

        {/* Tags / Badges Row (NO WALI BADGES! Section 5) */}
        <View style={styles.badgesRow}>
          <View style={styles.onlineBadge}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Active Now</Text>
          </View>

          <View style={styles.matchFactorBadge}>
            <Ionicons name="sparkles" size={12} color="#6A3794" />
            <Text style={styles.matchFactorText}>High Compatibility</Text>
          </View>

          <View style={styles.verifiedCommunityBadge}>
            <MaterialIcons name="verified-user" size={12} color="#D4AF37" />
            <Text style={styles.verifiedCommunityText}>Verified Member</Text>
          </View>
        </View>

        {/* Bio Quote */}
        {suitor.bio && (
          <Text style={styles.bioText} numberOfLines={2}>
            "{suitor.bio}"
          </Text>
        )}
      </Pressable>

      {/* ========================================================
          4. Bottom Matrimonial Action Dock
      ======================================================== */}
      <View style={styles.bottomActionDock}>
        <View style={styles.actionTextCol}>
          <Text style={styles.likeQuestionText}>Like this Profile?</Text>
          <Text style={styles.connectNowText}>Connect Now</Text>
        </View>

        <TouchableOpacity
          style={styles.connectCircleBtn}
          onPress={onConnect}
          activeOpacity={0.88}
        >
          <Ionicons name="checkmark" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#DBCADD', // Lavender Surface
    overflow: 'hidden',
    justifyContent: 'space-between',
    ...shadows.card,
  },
  imageContainer: {
    width: '100%',
    backgroundColor: '#F0E6F1',
    position: 'relative',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  topBadgesRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  promotedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(36, 27, 51, 0.65)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  promotedText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  vipCrownBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(36, 27, 51, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacyOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(36, 27, 51, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    zIndex: 5,
  },
  privacyLockIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(106, 55, 148, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  lockMiniBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacyText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  unlockPhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6A3794',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: radii.pill,
    gap: 6,
    borderWidth: 1,
    borderColor: '#AD91C1',
  },
  unlockPhotoBtnText: {
    fontFamily: typography.fontFamilies.button,
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  voiceIntroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0E6F1', // Light Lavender
    marginHorizontal: 12,
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radii.pill,
    gap: 10,
    borderWidth: 1,
    borderColor: '#DBCADD',
  },
  voiceIntroPillActive: {
    backgroundColor: '#E8DCEB',
    borderColor: '#6A3794',
  },
  voicePlayCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6A3794',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceTrack: {
    flex: 1,
    gap: 3,
  },
  voiceTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 12,
    fontWeight: '700',
    color: '#241B33',
  },
  waveformBars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 14,
  },
  waveBar: {
    width: 3,
    backgroundColor: '#6A3794',
    borderRadius: 1.5,
  },
  durationChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  durationChipText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    color: '#6A3794',
    fontWeight: '700',
  },
  infoSection: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nameText: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 18,
    fontWeight: '800',
    color: '#241B33',
  },
  vitalSpecsText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 13,
    color: '#6A3794',
    fontWeight: '600',
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  locationText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: '#59445F',
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
    flexWrap: 'wrap',
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2E7D32',
  },
  onlineText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 10,
    color: '#2E7D32',
    fontWeight: '700',
  },
  matchFactorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0E6F1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  matchFactorText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 10,
    color: '#6A3794',
    fontWeight: '700',
  },
  verifiedCommunityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FCF8ED',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  verifiedCommunityText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 10,
    color: '#8A711E',
    fontWeight: '700',
  },
  bioText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: '#59445F',
    lineHeight: 16,
    fontStyle: 'italic',
    marginTop: 4,
  },
  bottomActionDock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAF5FB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0E6F1',
  },
  actionTextCol: {
    justifyContent: 'center',
  },
  likeQuestionText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: '#59445F',
  },
  connectNowText: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 15,
    fontWeight: '800',
    color: '#241B33',
  },
  connectCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6A3794',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
});
