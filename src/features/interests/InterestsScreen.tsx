import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { colors, spacing, typography, radii, shadows } from '../../theme/tokens';
import { SelectableChip } from '../../components/common/SelectableChip';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { MatrimonialInterest, MatrimonialProfile } from '../../types';
import {
  mockInterestsReceived,
  mockInterestsSent,
  mockCuratedMatches,
} from '../../mocks/matrimonialData';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface InterestsScreenProps {
  interestsReceived?: MatrimonialInterest[];
  interestsSent?: MatrimonialInterest[];
  shortlists?: MatrimonialProfile[];
  hasActiveConversation?: boolean;
  activeConversationSuitorName?: string;
  onAcceptInterest?: (suitor: MatrimonialProfile) => void;
  onViewProfile?: (suitor: MatrimonialProfile) => void;
  onNavigate?: (screen: string) => void;
}

export const InterestsScreen: React.FC<InterestsScreenProps> = ({
  interestsReceived = mockInterestsReceived,
  interestsSent = mockInterestsSent,
  shortlists = mockCuratedMatches,
  hasActiveConversation = true,
  activeConversationSuitorName = 'Ayesha M., 27',
  onAcceptInterest,
  onViewProfile,
  onNavigate,
}) => {
  const insets = useSafeAreaInsets();
  const handleViewProfile = onViewProfile || (() => onNavigate?.('ProfileDetail'));
  const [activeTab, setActiveTab] = useState<'received' | 'sent' | 'shortlist'>('received');

  const handleAccept = (suitor: MatrimonialProfile) => {
    if (hasActiveConversation) {
      Alert.alert(
        'One Active Conversation Rule',
        `You currently have an active conversation with ${activeConversationSuitorName}.\n\nIn Dono Jaha, you can only engage in ONE active matrimonial conversation at a time. To accept this proposal and begin chatting, you must first respectfully conclude your ongoing connection.`
      );
      return;
    }

    Alert.alert(
      'Accept Proposal & Begin Chat',
      `Accept matrimonial interest from ${suitor.name}? This will establish your dedicated One Active Conversation.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept & Start Chat',
          onPress: () => (onAcceptInterest ? onAcceptInterest(suitor) : onNavigate?.('Chat')),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      {/*  Tab Header  */}
      <View style={styles.tabsRow}>
        <SelectableChip
          label={`Received (${interestsReceived.length})`}
          selected={activeTab === 'received'}
          onPress={() => setActiveTab('received')}
        />
        <SelectableChip
          label={`Sent (${interestsSent.length})`}
          selected={activeTab === 'sent'}
          onPress={() => setActiveTab('sent')}
        />
        <SelectableChip
          label={`Shortlisted (${shortlists.length})`}
          selected={activeTab === 'shortlist'}
          onPress={() => setActiveTab('shortlist')}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody}>
        {activeTab === 'received' && (
          <View style={styles.cardsList}>
            {interestsReceived.map((item) => {
              const suitor = item.profile!;
              return (
                <View key={item.id} style={styles.interestCard}>
                  <View style={styles.suitorHeaderRow}>
                    <Image source={{ uri: suitor.avatar }} style={styles.avatarImg} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.suitorName}>{suitor.name}, {suitor.age}</Text>
                      <Text style={styles.suitorDetails}>
                        {suitor.location} • {suitor.sect}
                      </Text>
                      <Text style={styles.timestampText}>{item.sentAt}</Text>
                    </View>
                  </View>

                  {item.introductoryNote && (
                    <View style={styles.noteContainer}>
                      <Text style={styles.noteText}>"{item.introductoryNote}"</Text>
                    </View>
                  )}

                  <View style={styles.actionButtonsRow}>
                    <View style={{ flex: 1 }}>
                      <PrimaryButton
                        title="Accept & Connect"
                        icon="check"
                        onPress={() => handleAccept(suitor)}
                        style={styles.cardActionBtn}
                      />
                    </View>
                    <View style={{ width: 100 }}>
                      <PrimaryButton
                        title="Decline"
                        variant="outline"
                        onPress={() => Alert.alert('Declined', 'Proposal declined respectfully.')}
                        style={styles.cardActionBtn}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {activeTab === 'sent' && (
          <View style={styles.cardsList}>
            {interestsSent.map((item) => {
              const suitor = item.profile!;
              return (
                <View key={item.id} style={styles.interestCard}>
                  <View style={styles.suitorHeaderRow}>
                    <Image source={{ uri: suitor.avatar }} style={styles.avatarImg} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.suitorName}>{suitor.name}, {suitor.age}</Text>
                      <Text style={styles.suitorDetails}>{suitor.location}</Text>
                      <Text style={styles.statusSentText}>Status: Pending Family Review</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {activeTab === 'shortlist' && (
          <View style={styles.cardsList}>
            {shortlists.map((suitor) => (
              <View key={suitor.id} style={styles.interestCard}>
                <View style={styles.suitorHeaderRow}>
                  <Image source={{ uri: suitor.avatar }} style={styles.avatarImg} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.suitorName}>{suitor.name}, {suitor.age}</Text>
                    <Text style={styles.suitorDetails}>{suitor.profession}</Text>
                  </View>
                  <PrimaryButton
                    title="View"
                    variant="outline"
                    onPress={() => handleViewProfile(suitor)}
                    style={styles.shortlistViewBtn}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.md,
    gap: spacing.xs,
  },
  scrollBody: {
    padding: spacing.margin,
    paddingBottom: 90,
  },
  cardsList: {
    gap: spacing.md,
  },
  interestCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  suitorHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  avatarImg: {
    width: 52,
    height: 52,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceContainerHigh,
  },
  suitorName: {
    ...typography.labelLg,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  suitorDetails: {
    ...typography.bodySm,
    color: colors.textMuted,
    marginTop: 1,
  },
  timestampText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  statusSentText: {
    ...typography.caption,
    color: colors.warning,
    fontWeight: '700',
    marginTop: 2,
  },
  noteContainer: {
    backgroundColor: colors.surfaceContainerLow,
    padding: spacing.sm + 2,
    borderRadius: radii.sm,
    marginBottom: spacing.md,
  },
  noteText: {
    ...typography.bodySm,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  cardActionBtn: {
    height: 40,
  },
  shortlistViewBtn: {
    width: 70,
    height: 38,
  },
});
