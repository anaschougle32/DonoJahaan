import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, radii, shadows, spacing, typography } from '../../theme/tokens';
import { MatchProfileCard } from './MatchProfileCard';
import { mockCuratedMatches } from '../../mocks/matrimonialData';
import { MatrimonialProfile } from '../../types';
import { InputField } from '../../components/common/InputField';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { getDiscoverableProfiles } from '../../services/profileService';
import { expressMatrimonialInterest } from '../../services/interestService';
import { currentUserProfile } from '../../data/userProfile';

interface MatchesScreenProps {
  onNavigate?: (screen: string) => void;
  onViewProfile?: (suitor: MatrimonialProfile) => void;
  onOpenNotifications?: () => void;
  onOpenFilters?: () => void;
  onOpenChatWithSuitor?: (suitorName: string) => void;
}

export const MatchesScreen: React.FC<MatchesScreenProps> = ({
  onNavigate,
  onViewProfile,
  onOpenNotifications,
  onOpenFilters,
  onOpenChatWithSuitor,
}) => {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<'daily' | 'new' | 'search'>('daily');
  const [profiles, setProfiles] = useState<MatrimonialProfile[]>(mockCuratedMatches);
  const [revealedPhotos, setRevealedPhotos] = useState<Record<string, boolean>>({});

  // Dynamic Viewport Height for Vertical Snap Feed (Requirement 9 & 10)
  const [feedViewportHeight, setFeedViewportHeight] = useState<number>(0);

  // Active Connection State (Dono Jaha One-Active-Conversation Rule)
  const [activeConversationSuitor, setActiveConversationSuitor] = useState<string>('Ayesha M., 27');
  const [showOneRuleModal, setShowOneRuleModal] = useState(false);
  const [selectedConnectCandidate, setSelectedConnectCandidate] = useState<MatrimonialProfile | null>(null);

  // Photo Reveal Request Modal
  const [selectedPhotoCandidate, setSelectedPhotoCandidate] = useState<MatrimonialProfile | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  // Search State
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch discoverable profiles from Supabase on mount with seamless fallback
  useEffect(() => {
    let isMounted = true;
    const fetchMatches = async () => {
      try {
        const liveProfiles = await getDiscoverableProfiles();
        if (isMounted && liveProfiles && liveProfiles.length > 0) {
          setProfiles(liveProfiles);
        }
      } catch (err) {
        console.warn('MatchesScreen fetch notice:', err);
      }
    };
    fetchMatches();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleConnect = (suitor: MatrimonialProfile) => {
    if (activeConversationSuitor && suitor.name !== 'Ayesha M.') {
      setSelectedConnectCandidate(suitor);
      setShowOneRuleModal(true);
      return;
    }

    expressMatrimonialInterest(currentUserProfile.id || 'user-me', suitor.id).catch((err) => {
      console.warn('expressMatrimonialInterest background sync notice:', err);
    });

    Alert.alert(
      'Interest Sent ✨',
      `Your sincere interest has been delivered to ${suitor.name}.`
    );
  };

  const handleRequestPhoto = (suitor: MatrimonialProfile) => {
    setSelectedPhotoCandidate(suitor);
    setShowPhotoModal(true);
  };

  const confirmPhotoReveal = () => {
    if (selectedPhotoCandidate) {
      setRevealedPhotos((prev) => ({ ...prev, [selectedPhotoCandidate.id]: true }));
      setShowPhotoModal(false);
      Alert.alert(
        'Request Sent',
        `A modest photo view request was sent to ${selectedPhotoCandidate.name}. (Preview unlocked for demonstration)`
      );
    }
  };

  return (
    <View style={[styles.safeContainer, { paddingTop: Math.max(insets.top, 10) }]}>
      {/* ========================================================
          1. App Header (Starts strictly below status bar)
      ======================================================== */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIconBtn}
          onPress={() => onNavigate?.('ProfileTab')}
          activeOpacity={0.7}
        >
          <Ionicons name="menu-outline" size={26} color="#241B33" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Matches</Text>

        <TouchableOpacity
          style={styles.headerIconBtn}
          onPress={onOpenNotifications || (() => onNavigate?.('Notifications'))}
          activeOpacity={0.7}
        >
          <Ionicons name="notifications-outline" size={24} color="#241B33" />
          <View style={styles.notifBadge}>
            <Text style={styles.notifBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ========================================================
          2. Filter Row
      ======================================================== */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={styles.filterIconBtn}
          onPress={onOpenFilters || (() => onNavigate?.('AdvancedFilters'))}
          activeOpacity={0.7}
        >
          <Ionicons name="funnel-outline" size={17} color="#59445F" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterPill, activeFilter === 'search' && styles.filterPillActive]}
          onPress={() => setShowSearchModal(true)}
          activeOpacity={0.7}
        >
          <Ionicons
            name="search-outline"
            size={14}
            color={activeFilter === 'search' ? '#FFFFFF' : '#59445F'}
          />
          <Text
            style={[
              styles.filterPillText,
              activeFilter === 'search' && styles.filterPillTextActive,
            ]}
          >
            Search
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterPill, activeFilter === 'new' && styles.filterPillActive]}
          onPress={() => setActiveFilter('new')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterPillText,
              activeFilter === 'new' && styles.filterPillTextActive,
            ]}
          >
            New (178)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterPill, activeFilter === 'daily' && styles.filterPillActive]}
          onPress={() => setActiveFilter('daily')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterPillText,
              activeFilter === 'daily' && styles.filterPillTextActive,
            ]}
          >
            Daily (20)
          </Text>
        </TouchableOpacity>
      </View>

      {/* ========================================================
          3. FULL-SCREEN VERTICAL PAGED FEED CONTAINER
          Requirement 9: Vertical Reels/TikTok Snap Interaction!
          Occupies exactly ONE available viewport.
          When user swipes upward: Profile A -> SNAP -> Profile B.
          No half of Profile A + half of Profile B visible simultaneously.
      ======================================================== */}
      <View
        style={styles.feedContainer}
        onLayout={(e) => {
          const { height } = e.nativeEvent.layout;
          if (height > 100 && Math.abs(height - feedViewportHeight) > 1) {
            setFeedViewportHeight(height);
          }
        }}
      >
        {feedViewportHeight > 0 && (
          <FlatList
            data={profiles}
            keyExtractor={(item) => item.id}
            pagingEnabled={true}
            snapToInterval={feedViewportHeight}
            snapToAlignment="start"
            decelerationRate="normal"
            disableIntervalMomentum={true}
            showsVerticalScrollIndicator={false}
            getItemLayout={(_, index) => ({
              length: feedViewportHeight,
              offset: feedViewportHeight * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={{ height: feedViewportHeight, width: '100%', paddingVertical: 4 }}>
                <MatchProfileCard
                  suitor={item}
                  cardHeight={feedViewportHeight - 8}
                  isPhotoRevealed={revealedPhotos[item.id]}
                  onViewProfile={() => {
                    if (onViewProfile) onViewProfile(item);
                    else onNavigate?.('ProfileDetail');
                  }}
                  onRequestPhoto={() => handleRequestPhoto(item)}
                  onConnect={() => handleConnect(item)}
                  onOpenMenu={() => {
                    Alert.alert(item.name, 'Profile Options', [
                      { text: 'Share Profile', onPress: () => {} },
                      { text: 'Save to Shortlist', onPress: () => {} },
                      { text: 'Dismiss', style: 'cancel' },
                    ]);
                  }}
                />
              </View>
            )}
          />
        )}
      </View>

      {/* ========================================================
          4. One Active Matrimonial Connection Rule Modal
      ======================================================== */}
      <Modal
        visible={showOneRuleModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowOneRuleModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.ruleModalCard}>
            <View style={styles.ruleIconCircle}>
              <MaterialIcons name="handshake" size={32} color="#6A3794" />
            </View>

            <Text style={styles.ruleModalHeading}>One Active Conversation Rule</Text>
            <Text style={styles.ruleModalBody}>
              In Dono Jahaan, members focus sincerely on one suitor at a time to honor marriage intentions and avoid casual dating.
            </Text>

            <View style={styles.currentChatNotice}>
              <Text style={styles.currentChatLabel}>Current Active Proposal:</Text>
              <Text style={styles.currentChatSuitor}>{activeConversationSuitor}</Text>
            </View>

            <Text style={styles.ruleModalPrompt}>
              To connect with {selectedConnectCandidate?.name}, you must respectfully conclude your active conversation first.
            </Text>

            <View style={styles.ruleModalActions}>
              <PrimaryButton
                title="Go to Active Chat"
                onPress={() => {
                  setShowOneRuleModal(false);
                  onOpenChatWithSuitor
                    ? onOpenChatWithSuitor(activeConversationSuitor)
                    : onNavigate?.('ChatTab');
                }}
              />

              <TouchableOpacity
                style={styles.cancelRuleBtn}
                onPress={() => setShowOneRuleModal(false)}
              >
                <Text style={styles.cancelRuleBtnText}>Keep Current Connection</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ========================================================
          5. Photo Reveal Request Modal
      ======================================================== */}
      <Modal
        visible={showPhotoModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPhotoModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.photoRequestCard}>
            <View style={styles.photoModalIcon}>
              <MaterialIcons name="security" size={28} color="#6A3794" />
            </View>

            <Text style={styles.photoModalHeading}>Request Photo Reveal</Text>
            <Text style={styles.photoModalBody}>
              {selectedPhotoCandidate?.name} observes Haya and has veiled her profile photograph.
              Your request will be delivered to her and her chaperone.
            </Text>

            <View style={styles.photoModalButtonRow}>
              <TouchableOpacity
                style={styles.secondaryModalBtn}
                onPress={() => setShowPhotoModal(false)}
              >
                <Text style={styles.secondaryModalBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.primaryModalBtn}
                onPress={confirmPhotoReveal}
              >
                <Text style={styles.primaryModalBtnText}>Send Modest Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ========================================================
          6. Instant Search Modal
      ======================================================== */}
      <Modal
        visible={showSearchModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowSearchModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.searchModalCard, { paddingTop: Math.max(insets.top, 16) }]}>
            <View style={styles.searchModalHeader}>
              <Text style={styles.searchModalTitle}>Quick Suitor Search</Text>
              <TouchableOpacity
                onPress={() => setShowSearchModal(false)}
                style={styles.searchModalClose}
              >
                <Ionicons name="close" size={22} color="#241B33" />
              </TouchableOpacity>
            </View>

            <InputField
              value={searchQuery}
              placeholder="Search by city, profession, or sect..."
              onChangeText={(t) => {
                setSearchQuery(t);
                if (!t.trim()) {
                  setProfiles(mockCuratedMatches);
                } else {
                  const filtered = mockCuratedMatches.filter(
                    (p) =>
                      p.name.toLowerCase().includes(t.toLowerCase()) ||
                      p.location.toLowerCase().includes(t.toLowerCase()) ||
                      p.profession.toLowerCase().includes(t.toLowerCase()) ||
                      p.sect.toLowerCase().includes(t.toLowerCase())
                  );
                  setProfiles(filtered);
                }
              }}
            />

            <View style={styles.quickFilterTags}>
              {['Doctors', 'Engineers', 'Delhi NCR', 'Lucknow', 'Sunni', 'Wali Chaperoned'].map(
                (tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={styles.quickTag}
                    onPress={() => {
                      setSearchQuery(tag);
                      const filtered = mockCuratedMatches.filter(
                        (p) =>
                          p.location.toLowerCase().includes(tag.toLowerCase()) ||
                          p.profession.toLowerCase().includes(tag.toLowerCase()) ||
                          p.sect.toLowerCase().includes(tag.toLowerCase())
                      );
                      setProfiles(filtered);
                      setShowSearchModal(false);
                    }}
                  >
                    <Text style={styles.quickTagText}>{tag}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FDFCFC', // Warm White
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6F1', // Light Lavender
    backgroundColor: '#FDFCFC',
  },
  headerTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 20,
    fontWeight: '800',
    color: '#241B33', // Dark Text
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#6A3794', // Primary Purple
    borderRadius: 9,
    width: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    backgroundColor: '#FDFCFC',
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6F1',
  },
  filterIconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#DBCADD', // Lavender Surface
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#DBCADD',
    backgroundColor: '#FFFFFF',
  },
  filterPillActive: {
    backgroundColor: '#6A3794',
    borderColor: '#6A3794',
  },
  filterPillText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    fontWeight: '600',
    color: '#59445F',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  feedContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FDFCFC',
  },
  // Rule Modal Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(36, 27, 51, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  ruleModalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    ...shadows.lg,
  },
  ruleIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0E6F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  ruleModalHeading: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 18,
    fontWeight: '800',
    color: '#241B33',
    textAlign: 'center',
    marginBottom: 8,
  },
  ruleModalBody: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 13,
    color: '#59445F',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  currentChatNotice: {
    width: '100%',
    backgroundColor: '#F0E6F1',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  currentChatLabel: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    color: '#59445F',
    marginBottom: 2,
  },
  currentChatSuitor: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    fontWeight: '700',
    color: '#6A3794',
  },
  ruleModalPrompt: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    color: '#59445F',
    textAlign: 'center',
    marginBottom: 18,
  },
  ruleModalActions: {
    width: '100%',
    gap: 8,
  },
  cancelRuleBtn: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelRuleBtnText: {
    fontFamily: typography.fontFamilies.button,
    fontSize: 13,
    color: '#59445F',
    fontWeight: '600',
  },
  // Photo Reveal Modal Styles
  photoRequestCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
    ...shadows.lg,
  },
  photoModalIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F0E6F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  photoModalHeading: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 17,
    fontWeight: '800',
    color: '#241B33',
    marginBottom: 6,
  },
  photoModalBody: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 13,
    color: '#59445F',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 18,
  },
  photoModalButtonRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  secondaryModalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBCADD',
    alignItems: 'center',
  },
  secondaryModalBtnText: {
    fontFamily: typography.fontFamilies.button,
    fontSize: 13,
    fontWeight: '600',
    color: '#59445F',
  },
  primaryModalBtn: {
    flex: 1.4,
    backgroundColor: '#6A3794',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryModalBtnText: {
    fontFamily: typography.fontFamilies.button,
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Search Modal
  searchModalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    marginTop: 'auto',
    maxHeight: '80%',
  },
  searchModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  searchModalTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 18,
    fontWeight: '800',
    color: '#241B33',
  },
  searchModalClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0E6F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickFilterTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  quickTag: {
    backgroundColor: '#F0E6F1',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radii.pill,
  },
  quickTagText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    color: '#6A3794',
    fontWeight: '600',
  },
});
