import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, typography, radii, shadows } from '../../theme/tokens';
import { TopBar } from '../../components/common/TopBar';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { ModestyPhotoCurtain } from '../../components/common/ModestyPhotoCurtain';
import { BottomSheetModal } from '../../components/common/BottomSheetModal';
import { MatrimonialProfile } from '../../types';
import { mockActiveSuitor } from '../../mocks/matrimonialData';
import { expressMatrimonialInterest } from '../../services/interestService';
import { currentUserProfile } from '../../data/userProfile';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ProfileDetailScreenProps {
  suitor?: MatrimonialProfile;
  onBack?: () => void;
  onOpenChat?: () => void;
  onStartChat?: () => void;
  isActiveConnection?: boolean;
  onEndConversation?: () => void;
}

export const ProfileDetailScreen: React.FC<ProfileDetailScreenProps> = ({
  suitor = mockActiveSuitor,
  onBack,
  onOpenChat,
  onStartChat,
  isActiveConnection,
  onEndConversation,
}) => {
  const insets = useSafeAreaInsets();
  const handleChat = onStartChat || onOpenChat || (() => {});
  const [photoAccessGranted, setPhotoAccessGranted] = useState(false);
  const [endChatModalVisible, setEndChatModalVisible] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const isCurrentlyActive =
    isActiveConnection !== undefined
      ? isActiveConnection
      : suitor.id === mockActiveSuitor.id;

  const isBlurred = suitor.isPhotoBlurred && !photoAccessGranted;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopBar title={suitor.displayName} onBack={onBack} />

      <ScrollView contentContainerStyle={styles.scrollBody}>
        {/*  Top Hero Photo with Modesty Curtain  */}
        <ModestyPhotoCurtain
          imageUri={suitor.avatar}
          isBlurred={isBlurred}
          onRequestAccess={() => setPhotoAccessGranted(true)}
          height={320}
          borderRadius={0}
        />

        <View style={styles.contentPadding}>
          {/*  Name & Verification Row  */}
          <View style={styles.headlineRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.fullName}>{suitor.name}, {suitor.age}</Text>
                {suitor.isVerified && (
                  <MaterialIcons name="verified" size={20} color={colors.primary} />
                )}
              </View>
              <Text style={styles.professionText}>{suitor.profession}</Text>
              <Text style={styles.locationText}>
                {suitor.location} • Native of {suitor.hometown}
              </Text>
            </View>

            <View style={styles.sectBadge}>
              <Text style={styles.sectBadgeText}>
                {suitor.sect} • {suitor.schoolOfThought}
              </Text>
            </View>
          </View>

          {/*  Voice Introduction Card  */}
          {suitor.hasVoiceIntro && (
            <View style={styles.voiceCard}>
              <View style={styles.voiceCardHeader}>
                <View style={styles.micRow}>
                  <MaterialIcons name="mic" size={20} color={colors.primary} />
                  <Text style={styles.voiceCardTitle}>Voice Introduction</Text>
                </View>
                <Text style={styles.voiceDurationText}>0:{suitor.voiceDuration}</Text>
              </View>

              <Text style={styles.promptHint}>
                Prompt: "{suitor.voicePrompt || 'Ideal quiet Sunday morning routine'}"
              </Text>

              <PrimaryButton
                title={isPlayingVoice ? 'Pause Introduction' : 'Listen with Modesty'}
                variant="secondary"
                icon={isPlayingVoice ? 'pause' : 'play-arrow'}
                onPress={() => setIsPlayingVoice(!isPlayingVoice)}
                style={styles.voicePlayBtn}
              />
            </View>
          )}

          {/*  About Her Narrative  */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>ABOUT HER</Text>
            <Text style={styles.bioText}>{suitor.bio}</Text>
          </View>

          {/*  Islamic Practice Matrix  */}
          <View style={styles.matrixCard}>
            <Text style={styles.matrixTitle}>Islamic Practice & Compatibility</Text>
            <View style={styles.matrixGrid}>
              <View style={styles.matrixItem}>
                <Text style={styles.matrixLabel}>Salah Routine</Text>
                <Text style={styles.matrixVal}>{suitor.prayer}</Text>
              </View>
              <View style={styles.matrixItem}>
                <Text style={styles.matrixLabel}>Quran Practice</Text>
                <Text style={styles.matrixVal}>{suitor.quran}</Text>
              </View>
              <View style={styles.matrixItem}>
                <Text style={styles.matrixLabel}>Halal Adherence</Text>
                <Text style={styles.matrixVal}>{suitor.halal}</Text>
              </View>
              <View style={styles.matrixItem}>
                <Text style={styles.matrixLabel}>Modesty Attire</Text>
                <Text style={styles.matrixVal}>{suitor.attire}</Text>
              </View>
            </View>
          </View>

          {/* Family Background */}
          <View style={styles.familyCard}>
            <Text style={styles.familyTitle}>Family Background</Text>
            <View style={styles.familyRows}>
              <Text style={styles.familyText}>
                Father: <Text style={styles.familyTextBold}>{suitor.fatherOccupation}</Text>
              </Text>
              <Text style={styles.familyText}>
                Mother: <Text style={styles.familyTextBold}>{suitor.motherOccupation}</Text>
              </Text>
              <Text style={styles.familyText}>
                Family Origin: <Text style={styles.familyTextBold}>{suitor.hometown || 'Native Origin'}</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Pinned Action Dock */}
      <View style={[styles.bottomDock, { paddingBottom: Math.max(insets.bottom, spacing.margin) }]}>
        {isCurrentlyActive ? (
          <View style={styles.dualActionRow}>
            <View style={{ flex: 1 }}>
              <PrimaryButton
                title="Open Active Chat"
                icon="chat-bubble"
                onPress={handleChat}
              />
            </View>
            <PrimaryButton
              title="End Chat"
              variant="outline"
              onPress={() => setEndChatModalVisible(true)}
              style={styles.endChatMiniBtn}
            />
          </View>
        ) : (
          <PrimaryButton
            title="Express Matrimonial Interest"
            icon="favorite"
            onPress={async () => {
              await expressMatrimonialInterest(currentUserProfile.id || 'user-me', suitor.id);
              Alert.alert(
                'Interest Sent ✨',
                `Your sincere interest has been delivered to ${suitor.name} and family for respectful consideration.`
              );
            }}
          />
        )}
      </View>

      {/*  End Conversation Modal (Explaining One-Conversation Rule)  */}
      <BottomSheetModal
        visible={endChatModalVisible}
        onClose={() => setEndChatModalVisible(false)}
        title="End Active Conversation?"
      >
        <View style={styles.endModalHero}>
          <View style={styles.endIconCircle}>
            <MaterialIcons name="cancel" size={32} color={colors.error} />
          </View>
          <Text style={styles.endModalText}>
            Ending your conversation will respectfully archive your chat with{' '}
            <Text style={{ fontWeight: '700' }}>{suitor.name}</Text>.
            {'\n\n'}
            <Text style={{ fontWeight: '700', color: colors.textPrimary }}>
              Why this matters:
            </Text>{' '}
            Dono Jahaan allows one active conversation at a time. Concluding this connection frees up your profile to engage with another matrimonial prospect.
          </Text>
        </View>

        <PrimaryButton
          title="Yes, Respectfully End Conversation"
          variant="danger"
          onPress={() => {
            setEndChatModalVisible(false);
            onEndConversation?.();
          }}
          style={{ marginBottom: spacing.sm }}
        />

        <PrimaryButton
          title="Keep Conversation Active"
          variant="secondary"
          onPress={() => setEndChatModalVisible(false)}
        />
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollBody: {
    paddingBottom: 90,
  },
  contentPadding: {
    padding: spacing.margin,
  },
  headlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fullName: {
    ...typography.headlineMd,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  professionText: {
    ...typography.bodyMd,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 2,
  },
  locationText: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  sectBadge: {
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  sectBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  voiceCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.card,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  voiceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  micRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  voiceCardTitle: {
    ...typography.labelMd,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  voiceDurationText: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600',
  },
  promptHint: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.sm + 2,
  },
  voicePlayBtn: {
    height: 44,
  },
  sectionBlock: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
  },
  bioText: {
    ...typography.bodyMd,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  matrixCard: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radii.card,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  matrixTitle: {
    ...typography.labelMd,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  matrixGrid: {
    gap: spacing.sm,
  },
  matrixItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matrixLabel: {
    ...typography.bodySm,
    color: colors.textMuted,
  },
  matrixVal: {
    ...typography.labelSm,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  familyCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  familyTitle: {
    ...typography.labelMd,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  familyRows: {
    gap: 6,
  },
  familyText: {
    ...typography.bodySm,
    color: colors.textMuted,
  },
  familyTextBold: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  bottomDock: {
    padding: spacing.margin,
    backgroundColor: colors.surfaceCard,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  dualActionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  endChatMiniBtn: {
    width: 110,
  },
  endModalHero: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  endIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: colors.errorContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  endModalText: {
    ...typography.bodySm,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
