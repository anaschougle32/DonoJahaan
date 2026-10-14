import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Pressable,
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
import { getReceivedInterests, getSentInterests, respondToInterest } from '../../services/interestService';
import { acceptInterestAndStartConversation } from '../../services/conversationStateService';
import { currentUserProfile } from '../../data/userProfile';

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
  const [receivedList, setReceivedList] = useState<MatrimonialInterest[]>(interestsReceived);
  const [sentList, setSentList] = useState<MatrimonialInterest[]>(interestsSent);

  useEffect(() => {
    let isMounted = true;
    const fetchInterests = async () => {
      try {
        const [rx, sx] = await Promise.all([
          getReceivedInterests(),
          getSentInterests(),
        ]);
        if (isMounted) {
          if (rx && rx.length > 0) setReceivedList(rx);
          if (sx && sx.length > 0) setSentList(sx);
        }
      } catch (err) {
        console.warn('InterestsScreen background fetch notice:', err);
      }
    };
    fetchInterests();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAccept = (item: MatrimonialInterest) => {
    const suitor = item.profile;
    if (!suitor) return;

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
          onPress: async () => {
            const startRes = await acceptInterestAndStartConversation(item.id, currentUserProfile.id);
            if (!startRes.success && startRes.error) {
              Alert.alert('One Active Conversation Limit', startRes.error);
              return;
            }
            await respondToInterest(item.id, 'accepted');
            setReceivedList((prev) => prev.filter((i) => i.id !== item.id));
            if (onAcceptInterest) {
              onAcceptInterest(suitor);
            } else {
              onNavigate?.('Chat');
            }
          },
        },
      ]
    );
  };

  const handleDecline = async (item: MatrimonialInterest) => {
    await respondToInterest(item.id, 'declined');
    setReceivedList((prev) => prev.filter((i) => i.id !== item.id));
    Alert.alert('Declined', 'Proposal declined respectfully.');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      {/*  Tab Header  */}
      <View style={styles.tabsRow}>
        <SelectableChip
          label={`Received (${receivedList.length})`}
          selected={activeTab === 'received'}
          onPress={() => setActiveTab('received')}
        />
        <SelectableChip
          label={`Sent (${sentList.length})`}
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
            {receivedList.map((item) => {
              const suitor = item.profile!;
              if (!suitor) return null;
              return (
                <View key={item.id} style={styles.interestCard}>
                  <Pressable
                    style={styles.suitorHeaderRow}
                    onPress={() => handleViewProfile(suitor)}
                  >
                    <Image source={{ uri: suitor.avatar }} style={styles.avatarImg} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.suitorName}>{suitor.name}, {suitor.age}</Text>
                      <Text style={styles.suitorDetails}>
                        {suitor.location} • {suitor.sect}
                      </Text>
                      <Text style={styles.timestampText}>{item.sentAt}</Text>
                    </View>
                  </Pressable>

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
                        onPress={() => handleAccept(item)}
                        style={styles.cardActionBtn}
                      />
                    </View>
                    <View style={{ width: 100 }}>
                      <PrimaryButton
                        title="Decline"
                        variant="outline"
                        onPress={() => handleDecline(item)}
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
            {sentList.map((item) => {
              const suitor = item.profile;
              if (!suitor) return null;
              return (
                <View key={item.id} style={styles.interestCard}>
                  <Pressable
                    style={styles.suitorHeaderRow}
                    onPress={() => handleViewProfile(suitor)}
                  >
                    <Image source={{ uri: suitor.avatar }} style={styles.avatarImg} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.suitorName}>{suitor.name}, {suitor.age}</Text>
                      <Text style={styles.suitorDetails}>{suitor.location}</Text>
                      <Text style={styles.statusSentText}>Status: Pending Family Review</Text>
                    </View>
                  </Pressable>
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
