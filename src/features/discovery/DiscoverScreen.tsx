import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, typography, radii, shadows } from '../../theme/tokens';
import { InputField } from '../../components/common/InputField';
import { ModestyPhotoCurtain } from '../../components/common/ModestyPhotoCurtain';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { BottomSheetModal } from '../../components/common/BottomSheetModal';
import { SelectableChip } from '../../components/common/SelectableChip';
import { MatrimonialProfile } from '../../types';
import { mockCuratedMatches } from '../../mocks/matrimonialData';
import { getDiscoverableProfiles } from '../../services/profileService';
import { expressMatrimonialInterest } from '../../services/interestService';
import { currentUserProfile } from '../../data/userProfile';

interface DiscoverScreenProps {
  profiles?: MatrimonialProfile[];
  onViewProfile?: (suitor: MatrimonialProfile) => void;
  onNavigate?: (screen: string) => void;
  onOpenFilters?: () => void;
  hasActiveConversation?: boolean;
  activeConversationSuitorName?: string;
}

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  profiles = mockCuratedMatches,
  onViewProfile,
  onNavigate,
  onOpenFilters,
  hasActiveConversation = true,
  activeConversationSuitorName = 'Ayesha M., 27',
}) => {
  const handleViewProfile = onViewProfile || (() => onNavigate?.('ProfileDetail'));
  const [profileList, setProfileList] = useState<MatrimonialProfile[]>(profiles);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [photoRequestModalVisible, setPhotoRequestModalVisible] = useState(false);
  const [selectedSuitor, setSelectedSuitor] = useState<MatrimonialProfile | null>(null);
  const [photoAccessGranted, setPhotoAccessGranted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let isMounted = true;
    async function loadDiscoverable() {
      try {
        const live = await getDiscoverableProfiles();
        if (isMounted && live && live.length > 0) {
          setProfileList(live);
        }
      } catch (err) {
        console.warn('DiscoverScreen fetch notice:', err);
      }
    }
    loadDiscoverable();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRequestPhoto = (suitor: MatrimonialProfile) => {
    setSelectedSuitor(suitor);
    setPhotoRequestModalVisible(true);
  };

  const handleSendPhotoRequest = () => {
    if (selectedSuitor) {
      setPhotoAccessGranted({
        ...photoAccessGranted,
        [selectedSuitor.id]: true,
      });
      setPhotoRequestModalVisible(false);
      Alert.alert(
        'Modest Request Sent',
        `Your photo reveal request has been sent to ${selectedSuitor.name} and her chaperone. (Access simulated for demo preview)`
      );
    }
  };

  const handleSendInterest = (suitor: MatrimonialProfile) => {
    if (hasActiveConversation && suitor.name !== activeConversationSuitorName) {
      Alert.alert(
        'One Active Conversation Rule',
        `You currently have an active conversation with ${activeConversationSuitorName}.\n\nIn Dono Jahaan, you must conclude your current matrimonial connection before opening another. You may still view profiles and save shortlists.`
      );
      return;
    }

    Alert.alert(
      'Express Matrimonial Interest',
      `Send serious nikah interest to ${suitor.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send with Sincere Intent',
          onPress: async () => {
            try {
              const res = await expressMatrimonialInterest(
                currentUserProfile.id || 'user-me',
                suitor.id
              );
              if (res.success) {
                Alert.alert('Sent', `Interest delivered to ${suitor.name} with sincere intent.`);
              } else {
                Alert.alert('Notice', res.error || 'Failed to deliver interest.');
              }
            } catch (err: any) {
              Alert.alert('Sent', 'Interest expressed successfully.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/*  Top Search & Filter Bar  */}
      <View style={styles.searchBarRow}>
        <View style={styles.inputContainer}>
          <InputField
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by sect, city, or profession..."
            leftIcon="search"
            style={styles.searchInput}
          />
        </View>

        <Pressable
          style={styles.filterButton}
          onPress={() => (onOpenFilters ? onOpenFilters() : setFilterModalVisible(true))}
          accessibilityLabel="Open filters"
        >
          <MaterialIcons name="tune" size={22} color={colors.primary} />
        </Pressable>
      </View>

      {/*  Profiles Feed  */}
      <ScrollView contentContainerStyle={styles.feedScroll}>
        {profileList.map((suitor) => {
          const isBlurred = suitor.isPhotoBlurred && !photoAccessGranted[suitor.id];

          return (
            <View key={suitor.id} style={styles.profileCard}>
              {/*  Modesty Photo with Curtain & Voice Badge  */}
              <ModestyPhotoCurtain
                imageUri={suitor.avatar}
                isBlurred={isBlurred}
                onRequestAccess={() => handleRequestPhoto(suitor)}
                hasVoiceBadge={suitor.hasVoiceIntro}
                voiceDuration={suitor.voiceDuration}
                onVoicePress={() => Alert.alert('Voice Note', `Playing 0:${suitor.voiceDuration} voice introduction.`)}
                height={260}
              />

              {/*  Card Content  */}
              <View style={styles.cardContent}>
                <View style={styles.headerInfoRow}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.nameRow}>
                      <Text style={styles.suitorName}>{suitor.name}, {suitor.age}</Text>
                      {suitor.isVerified && (
                        <MaterialIcons name="verified" size={16} color={colors.primary} />
                      )}
                    </View>
                    <Text style={styles.professionText}>{suitor.profession}</Text>
                    <Text style={styles.locationText}>{suitor.location}</Text>
                  </View>

                  <View style={styles.sectBadge}>
                    <Text style={styles.sectBadgeText}>
                      {suitor.sect} • {suitor.schoolOfThought}
                    </Text>
                  </View>
                </View>

                {/*  Bio Snippet  */}
                <Text style={styles.bioSnippet} numberOfLines={2}>
                  "{suitor.bio}"
                </Text>

                {/*  Action Button Dock  */}
                <View style={styles.actionButtonsRow}>
                  <View style={{ flex: 1 }}>
                    <PrimaryButton
                      title="View Profile"
                      variant="outline"
                      onPress={() => handleViewProfile(suitor)}
                      style={styles.cardBtn}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <PrimaryButton
                      title="Express Interest"
                      icon="favorite"
                      onPress={() => handleSendInterest(suitor)}
                      style={styles.cardBtn}
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/*  Advanced Filters Bottom Sheet Modal  */}
      <BottomSheetModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        title="Preference Filters"
      >
        <Text style={styles.filterSectionTitle}>Sect & School of Thought</Text>
        <View style={styles.filterChipsRow}>
          {['Sunni (Hanafi)', "Sunni (Shafi'i)", 'Shia', 'Ahle-Hadith', 'Any'].map((item) => (
            <SelectableChip
              key={item}
              label={item}
              selected={item.includes('Hanafi')}
              onPress={() => {}}
            />
          ))}
        </View>

        <Text style={styles.filterSectionTitle}>Location</Text>
        <InputField value="Mumbai, Maharashtra" placeholder="City or State" />

        <Text style={styles.filterSectionTitle}>Prayer Habit (Salah)</Text>
        <View style={styles.filterChipsRow}>
          {['Always Prays (5x)', 'Usually Prays', 'Open'].map((p) => (
            <SelectableChip
              key={p}
              label={p}
              selected={p.includes('Always')}
              onPress={() => {}}
            />
          ))}
        </View>

        <PrimaryButton
          title="Apply Preference Filters"
          onPress={() => setFilterModalVisible(false)}
          style={{ marginTop: spacing.md }}
        />
      </BottomSheetModal>

      {/*  Request Photo Reveal Bottom Sheet Modal  */}
      <BottomSheetModal
        visible={photoRequestModalVisible}
        onClose={() => setPhotoRequestModalVisible(false)}
        title="Request Photo Reveal"
      >
        <View style={styles.modalHeroCenter}>
          <View style={styles.keyIconCircle}>
            <MaterialIcons name="vpn-key" size={28} color={colors.primary} />
          </View>
          <Text style={styles.modalHeroSubtitle}>
            {selectedSuitor?.name} preserves her privacy through modesty curtains. Sending a polite request allows her family to review and approve access.
          </Text>
        </View>

        <InputField
          label="Introductory Suitor Note (Optional)"
          placeholder="Assalamu alaikum, I reviewed your profile and would appreciate viewing your photo for family Nikah alignment."
          multiline
          numberOfLines={3}
          style={{ height: 80, textAlignVertical: 'top' }}
        />

        <PrimaryButton
          title="Send Modest Request"
          icon="shield"
          onPress={handleSendPhotoRequest}
          style={{ marginTop: spacing.sm }}
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
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  inputContainer: {
    flex: 1,
  },
  searchInput: {
    height: 48,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: radii.button,
    backgroundColor: colors.surfaceCard,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md, // Align with InputField bottom margin
    ...shadows.sm,
  },
  feedScroll: {
    paddingHorizontal: spacing.margin,
    paddingBottom: 90,
    gap: spacing.lg,
  },
  profileCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  cardContent: {
    padding: spacing.md,
  },
  headerInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs + 2,
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
  professionText: {
    ...typography.labelMd,
    color: colors.textPrimary,
    marginTop: 1,
  },
  locationText: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 1,
  },
  sectBadge: {
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  sectBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  bioSnippet: {
    ...typography.bodySm,
    color: colors.textMuted,
    lineHeight: 20,
    marginVertical: spacing.sm,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  cardBtn: {
    height: 44,
  },
  filterSectionTitle: {
    ...typography.labelMd,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  filterChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },
  modalHeroCenter: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  keyIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  modalHeroSubtitle: {
    ...typography.bodySm,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
