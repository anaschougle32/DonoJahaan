import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, radii, shadows, spacing, typography } from '../../theme/tokens';

// Real Production Screens
import { LogoSplashScreen } from '../auth/LogoSplashScreen';
import { SplashScreen } from '../auth/SplashScreen';
import { PhoneAuthScreen } from '../auth/PhoneAuthScreen';
import { OtpVerificationScreen } from '../auth/OtpVerificationScreen';
import { QuestionnaireScreen } from '../onboarding/QuestionnaireScreen';
import { ProfileSetupCompleteScreen } from '../onboarding/ProfileSetupCompleteScreen';
import { SecondaryProfileWizardScreen } from '../onboarding/SecondaryProfileWizardScreen';
import { SelfieVerificationScreen } from '../onboarding/SelfieVerificationScreen';
import { FamilyDetailsScreen } from '../onboarding/FamilyDetailsScreen';
import { PartnerPreferencesScreen } from '../onboarding/PartnerPreferencesScreen';
import { HomeScreen } from '../home/HomeScreen';
import { MatchesScreen } from '../matches/MatchesScreen';
import { DiscoverScreen } from '../discovery/DiscoverScreen';
import { InterestsScreen } from '../interests/InterestsScreen';
import { ChatScreen } from '../chat/ChatScreen';
import { ProfileHubScreen } from '../settings/ProfileHubScreen';
import { ProfileDetailScreen } from '../profile/ProfileDetailScreen';
import { WaliDashboardScreen } from '../wali/WaliDashboardScreen';
import { AdvancedFiltersScreen } from '../search/AdvancedFiltersScreen';
import { NotificationsScreen } from '../notifications/NotificationsScreen';
import { AccountSettingsScreen } from '../settings/AccountSettingsScreen';

// Real Production Common Components
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { InputField } from '../../components/common/InputField';
import { SelectableChip } from '../../components/common/SelectableChip';
import { VoiceStudio } from '../../components/common/VoiceStudio';
import { ModestyPhotoCurtain } from '../../components/common/ModestyPhotoCurtain';
import { BottomSheetModal } from '../../components/common/BottomSheetModal';

type ShowcaseCategory =
  | 'ALL'
  | 'AUTH'
  | 'ONBOARDING'
  | 'MATCHES'
  | 'CHAT'
  | 'PROFILE'
  | 'COMPONENTS';

interface ScreenItem {
  id: string;
  name: string;
  category: ShowcaseCategory;
  file: string;
  route: string;
  badge: string;
  description: string;
  renderComponent: (onClose: () => void) => React.ReactNode;
}

interface FrontendShowcaseScreenProps {
  onBack?: () => void;
  onNavigateRoute?: (route: string, params?: any) => void;
}

export const FrontendShowcaseScreen: React.FC<FrontendShowcaseScreenProps> = ({
  onBack,
  onNavigateRoute,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<ShowcaseCategory>('ALL');
  const [activePreviewScreen, setActivePreviewScreen] = useState<ScreenItem | null>(null);

  // Component state explorer states
  const [testInputText, setTestInputText] = useState('Anas Shakeel');
  const [testChipSelected, setTestChipSelected] = useState(true);
  const [testCurtainBlurred, setTestCurtainBlurred] = useState(true);
  const [testModalVisible, setTestModalVisible] = useState(false);

  // Master Screen Registry (Exact Production Components)
  const screensList: ScreenItem[] = [
    {
      id: 'logo-splash',
      name: 'Logo Splash',
      category: 'AUTH',
      file: 'src/features/auth/LogoSplashScreen.tsx',
      route: 'LogoSplash',
      badge: 'Opening',
      description: 'Gold crescent crest, Bismillah, and Surah Ar-Rum 30:21 verse.',
      renderComponent: (onClose) => (
        <LogoSplashScreen
          onStart={onClose}
          onDirectLogin={onClose}
          onExplore={onClose}
        />
      ),
    },
    {
      id: 'splash-carousel',
      name: 'Splash Carousel (3 Slides)',
      category: 'AUTH',
      file: 'src/features/auth/SplashScreen.tsx',
      route: 'Splash',
      badge: 'Value Prop',
      description: '3 vector illustration slides introducing Haya, Sacred union & Wali.',
      renderComponent: (onClose) => (
        <SplashScreen onComplete={onClose} onSkip={onClose} />
      ),
    },
    {
      id: 'phone-auth',
      name: 'Phone Authentication',
      category: 'AUTH',
      file: 'src/features/auth/PhoneAuthScreen.tsx',
      route: 'PhoneAuth',
      badge: 'SMS Login',
      description: '+91 Phone entry, country code picker, and demo bypass chip.',
      renderComponent: (onClose) => (
        <PhoneAuthScreen onSendOtp={() => onClose()} onBack={onClose} />
      ),
    },
    {
      id: 'otp-verification',
      name: 'OTP PIN Verification',
      category: 'AUTH',
      file: 'src/features/auth/OtpVerificationScreen.tsx',
      route: 'OtpVerification',
      badge: '6-Digit',
      description: 'Auto-advancing 6-digit passcode array with countdown resend timer.',
      renderComponent: (onClose) => (
        <OtpVerificationScreen
          phoneNumber="98230 12345"
          onVerifySuccess={onClose}
          onChangeNumber={onClose}
          onBack={onClose}
        />
      ),
    },
    {
      id: 'questionnaire-p1',
      name: 'Questionnaire (Phase 1 Essential)',
      category: 'ONBOARDING',
      file: 'src/features/onboarding/QuestionnaireScreen.tsx',
      route: 'Questionnaire',
      badge: '6 Steps',
      description: '6 essential discoverability questions with searchable State & City modals.',
      renderComponent: (onClose) => (
        <QuestionnaireScreen onComplete={onClose} onExit={onClose} onBack={onClose} />
      ),
    },
    {
      id: 'profile-live-milestone',
      name: 'Profile Live Milestone (55%)',
      category: 'ONBOARDING',
      file: 'src/features/onboarding/ProfileSetupCompleteScreen.tsx',
      route: 'ProfileSetupComplete',
      badge: 'Milestone',
      description: 'Confirms profile is active & discoverable; invites Phase 2 completion.',
      renderComponent: (onClose) => (
        <ProfileSetupCompleteScreen
          onGoHome={onClose}
          onViewMatches={onClose}
          onCompleteProfile={onClose}
        />
      ),
    },
    {
      id: 'secondary-wizard-2a',
      name: 'Profile Wizard (Phase 2A - 75%)',
      category: 'ONBOARDING',
      file: 'src/features/onboarding/SecondaryProfileWizardScreen.tsx',
      route: 'SecondaryProfileWizard',
      badge: 'Batch 2A',
      description: 'Height stepper + Searchable Education & Profession modals.',
      renderComponent: (onClose) => (
        <SecondaryProfileWizardScreen
          initialBatch="2A"
          onBack={onClose}
          onFinish={onClose}
          onOpenSelfieVerification={onClose}
        />
      ),
    },
    {
      id: 'secondary-wizard-2b',
      name: 'Profile Wizard (Phase 2B - 90%)',
      category: 'ONBOARDING',
      file: 'src/features/onboarding/SecondaryProfileWizardScreen.tsx',
      route: 'SecondaryProfileWizard',
      badge: 'Batch 2B',
      description: 'Income tiers, Family financial status & Preferred Education/Profession.',
      renderComponent: (onClose) => (
        <SecondaryProfileWizardScreen
          initialBatch="2B"
          onBack={onClose}
          onFinish={onClose}
          onOpenSelfieVerification={onClose}
        />
      ),
    },
    {
      id: 'secondary-wizard-2c',
      name: 'Profile Wizard (Phase 2C - 100%)',
      category: 'ONBOARDING',
      file: 'src/features/onboarding/SecondaryProfileWizardScreen.tsx',
      route: 'SecondaryProfileWizard',
      badge: 'Batch 2C',
      description: 'Photo upload, Haya modesty veil switch, Voice pill & Selfie link.',
      renderComponent: (onClose) => (
        <SecondaryProfileWizardScreen
          initialBatch="2C"
          onBack={onClose}
          onFinish={onClose}
          onOpenSelfieVerification={onClose}
        />
      ),
    },
    {
      id: 'selfie-verification',
      name: 'Dedicated Selfie Verification',
      category: 'ONBOARDING',
      file: 'src/features/onboarding/SelfieVerificationScreen.tsx',
      route: 'SelfieVerification',
      badge: 'Identity',
      description: 'Front camera capture strictly separated from public profile photos.',
      renderComponent: (onClose) => (
        <SelfieVerificationScreen onBack={onClose} onVerified={onClose} onSkip={onClose} />
      ),
    },
    {
      id: 'family-details-direct',
      name: 'Family Details (Standalone)',
      category: 'ONBOARDING',
      file: 'src/features/onboarding/FamilyDetailsScreen.tsx',
      route: 'FamilyDetails',
      badge: 'Direct Form',
      description: 'Standalone form for living arrangement, financial status & parents.',
      renderComponent: (onClose) => (
        <FamilyDetailsScreen onBack={onClose} onSaved={onClose} />
      ),
    },
    {
      id: 'partner-pref-direct',
      name: 'Partner Preferences (Standalone)',
      category: 'ONBOARDING',
      file: 'src/features/onboarding/PartnerPreferencesScreen.tsx',
      route: 'PartnerPreferences',
      badge: 'Direct Form',
      description: 'Multi-select chips for age, marital status, income & professions.',
      renderComponent: (onClose) => (
        <PartnerPreferencesScreen onBack={onClose} onApply={onClose} />
      ),
    },
    {
      id: 'home-tab',
      name: 'Home Dashboard (Tab 1)',
      category: 'PROFILE',
      file: 'src/features/home/HomeScreen.tsx',
      route: 'MainTabs (HomeTab)',
      badge: 'Tab 1',
      description: 'Active suitor hero card, prayer times schedule, and daily Hadith.',
      renderComponent: (onClose) => (
        <HomeScreen
          onOpenChat={onClose}
          onViewProfile={onClose}
          onExploreMatches={onClose}
          onOpenNotifications={onClose}
        />
      ),
    },
    {
      id: 'matches-snap-feed',
      name: 'Matches Feed (Reels Snap UX - Tab 2)',
      category: 'MATCHES',
      file: 'src/features/matches/MatchesScreen.tsx',
      route: 'MainTabs (MatchesTab)',
      badge: 'Tab 2',
      description: 'Full-screen vertical paged snap feed (1 profile = 1 viewport).',
      renderComponent: (onClose) => (
        <MatchesScreen
          onNavigate={() => onClose()}
          onOpenNotifications={onClose}
          onOpenFilters={onClose}
        />
      ),
    },
    {
      id: 'discover-grid-legacy',
      name: 'Discover Grid (Legacy Unrouted)',
      category: 'MATCHES',
      file: 'src/features/discovery/DiscoverScreen.tsx',
      route: 'Unrouted',
      badge: 'Artifact',
      description: 'Initial Stitch grid with ModestyPhotoCurtain and bottom sheet filters.',
      renderComponent: (onClose) => (
        <DiscoverScreen
          onViewProfile={() => onClose()}
          onNavigate={() => onClose()}
          onOpenFilters={onClose}
        />
      ),
    },
    {
      id: 'interests-tab',
      name: 'Interests & Requests (Tab 3)',
      category: 'MATCHES',
      file: 'src/features/interests/InterestsScreen.tsx',
      route: 'MainTabs (InterestsTab)',
      badge: 'Tab 3',
      description: 'Received & Sent proposals + One-Active-Conversation rule modal.',
      renderComponent: (onClose) => (
        <InterestsScreen
          onAcceptInterest={() => onClose()}
          onViewProfile={() => onClose()}
          onNavigate={() => onClose()}
        />
      ),
    },
    {
      id: 'chat-tab',
      name: 'Chaperoned Chat (Tab 4)',
      category: 'CHAT',
      file: 'src/features/chat/ChatScreen.tsx',
      route: 'MainTabs (ChatTab)',
      badge: 'Tab 4',
      description: 'Active Wali oversight banner, voice notes, and contact sharing modal.',
      renderComponent: (onClose) => (
        <ChatScreen
          onBack={onClose}
          onViewProfile={onClose}
          onEndConversation={onClose}
        />
      ),
    },
    {
      id: 'profile-hub-tab',
      name: 'My Profile Hub (Tab 5)',
      category: 'PROFILE',
      file: 'src/features/settings/ProfileHubScreen.tsx',
      route: 'MainTabs (ProfileTab)',
      badge: 'Tab 5',
      description: 'Matrimonial biodata, verification badges, and settings directory.',
      renderComponent: (onClose) => (
        <ProfileHubScreen onNavigate={() => onClose()} onSignOut={onClose} />
      ),
    },
    {
      id: 'profile-detail-modal',
      name: 'Profile Detail View',
      category: 'PROFILE',
      file: 'src/features/profile/ProfileDetailScreen.tsx',
      route: 'ProfileDetail',
      badge: 'Modal',
      description: 'Modesty veil, voice intro, Deen & career matrix, Halal exit modal.',
      renderComponent: (onClose) => (
        <ProfileDetailScreen
          onBack={onClose}
          onOpenChat={onClose}
          onEndConversation={onClose}
        />
      ),
    },
    {
      id: 'wali-dashboard',
      name: 'Wali Chaperone Dashboard',
      category: 'PROFILE',
      file: 'src/features/wali/WaliDashboardScreen.tsx',
      route: 'WaliDashboard',
      badge: 'Guardian',
      description: 'Chaperone transcript review permissions & co-Wali invite.',
      renderComponent: (onClose) => (
        <WaliDashboardScreen onBack={onClose} />
      ),
    },
    {
      id: 'advanced-filters',
      name: 'Advanced Search Filters',
      category: 'MATCHES',
      file: 'src/features/search/AdvancedFiltersScreen.tsx',
      route: 'AdvancedFilters',
      badge: 'Modal',
      description: 'Filter by Salah frequency, Voice Intro, Modesty blur, and Halal diet.',
      renderComponent: (onClose) => (
        <AdvancedFiltersScreen onClose={onClose} onApply={onClose} />
      ),
    },
    {
      id: 'notifications-screen',
      name: 'Notifications & Quiet Hours',
      category: 'PROFILE',
      file: 'src/features/notifications/NotificationsScreen.tsx',
      route: 'Notifications',
      badge: 'Inbox',
      description: 'Accepted interest alert, Wali activity, and prayer quiet hours schedule.',
      renderComponent: (onClose) => (
        <NotificationsScreen onBack={onClose} onOpenChat={onClose} />
      ),
    },
    {
      id: 'account-settings',
      name: 'Account & Privacy Settings',
      category: 'PROFILE',
      file: 'src/features/settings/AccountSettingsScreen.tsx',
      route: 'AccountSettings',
      badge: 'Settings',
      description: 'Pause profile visibility, request GDPR data archive, account deletion.',
      renderComponent: (onClose) => (
        <AccountSettingsScreen onBack={onClose} onLogout={onClose} />
      ),
    },
  ];

  const filteredScreens =
    selectedCategory === 'ALL'
      ? screensList
      : screensList.filter((s) => s.category === selectedCategory);

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 10) }]}>
      {/* 1. Showcase Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <View style={styles.crescentBadge}>
            <Ionicons name="moon" size={16} color="#D4AF37" />
          </View>
          <View>
            <Text style={styles.headerTitle}>DONO JAHA — UI AUDIT & SHOWCASE</Text>
            <Text style={styles.headerSubtitle}>
              Interactive Frontend Review • {screensList.length} Implemented Screens
            </Text>
          </View>
        </View>

        {onBack && (
          <TouchableOpacity style={styles.exitBtn} onPress={onBack}>
            <Text style={styles.exitBtnText}>Exit Showcase</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 2. Category Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryPillsScroll}
      >
        {(
          [
            'ALL',
            'AUTH',
            'ONBOARDING',
            'MATCHES',
            'CHAT',
            'PROFILE',
            'COMPONENTS',
          ] as ShowcaseCategory[]
        ).map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterPill,
              selectedCategory === cat && styles.filterPillActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.filterPillText,
                selectedCategory === cat && styles.filterPillTextActive,
              ]}
            >
              {cat === 'ALL' ? `All (${screensList.length})` : cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 3. Screen Registry / Component State Explorer */}
      <ScrollView
        contentContainerStyle={styles.scrollList}
        showsVerticalScrollIndicator={false}
      >
        {selectedCategory === 'COMPONENTS' ? (
          /* ========================================================
              COMPONENT STATE EXPLORER
          ======================================================== */
          <View style={styles.componentsSection}>
            <Text style={styles.sectionHeading}>REUSABLE COMPONENT STATES</Text>

            {/* 1. PrimaryButton States */}
            <View style={styles.componentCard}>
              <Text style={styles.componentCardTitle}>PrimaryButton Variants</Text>
              <View style={styles.buttonGrid}>
                <PrimaryButton title="Primary Default" onPress={() => {}} />
                <PrimaryButton title="Secondary Variant" variant="secondary" onPress={() => {}} />
                <PrimaryButton title="Outline Variant" variant="outline" onPress={() => {}} />
                <PrimaryButton title="Danger Variant" variant="danger" onPress={() => {}} />
                <PrimaryButton title="Loading State" loading={true} onPress={() => {}} />
                <PrimaryButton title="Disabled State" disabled={true} onPress={() => {}} />
              </View>
            </View>

            {/* 2. InputField States */}
            <View style={styles.componentCard}>
              <Text style={styles.componentCardTitle}>InputField States</Text>
              <InputField
                label="Filled State"
                value={testInputText}
                onChangeText={setTestInputText}
                leftIcon="person"
              />
              <InputField
                label="Empty Placeholder"
                value=""
                placeholder="e.g. Software Engineer"
                leftIcon="work"
              />
              <InputField
                label="Error State"
                value="invalid_email"
                errorText="Please enter a valid verified email address."
                leftIcon="email"
              />
            </View>

            {/* 3. SelectableChip States */}
            <View style={styles.componentCard}>
              <Text style={styles.componentCardTitle}>SelectableChip States</Text>
              <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                <SelectableChip
                  label="Selected Chip"
                  selected={testChipSelected}
                  onPress={() => setTestChipSelected(!testChipSelected)}
                />
                <SelectableChip
                  label="Unselected Chip"
                  selected={!testChipSelected}
                  onPress={() => setTestChipSelected(!testChipSelected)}
                />
                <SelectableChip label="Hanafi" selected={true} onPress={() => {}} />
                <SelectableChip label="Never Married" selected={false} onPress={() => {}} />
              </View>
            </View>

            {/* 4. Live VoiceStudio Component (Isolated Artifact) */}
            <View style={styles.componentCard}>
              <Text style={styles.componentCardTitle}>VoiceStudio Component (Isolated)</Text>
              <Text style={styles.componentCardDesc}>
                Live halal voice intro recorder with waveforms and countdown timer.
              </Text>
              <VoiceStudio />
            </View>

            {/* 5. ModestyPhotoCurtain Live Preview */}
            <View style={styles.componentCard}>
              <Text style={styles.componentCardTitle}>ModestyPhotoCurtain Component</Text>
              <TouchableOpacity
                style={styles.toggleCurtainBtn}
                onPress={() => setTestCurtainBlurred(!testCurtainBlurred)}
              >
                <Text style={styles.toggleCurtainBtnText}>
                  Toggle Veil: {testCurtainBlurred ? 'Blurred (Active)' : 'Clear (Revealed)'}
                </Text>
              </TouchableOpacity>
              <ModestyPhotoCurtain
                imageUri="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600"
                isBlurred={testCurtainBlurred}
                onRequestAccess={() => setTestCurtainBlurred(false)}
                height={260}
              />
            </View>

            {/* 6. BottomSheetModal Live Preview */}
            <View style={styles.componentCard}>
              <Text style={styles.componentCardTitle}>BottomSheetModal Component</Text>
              <PrimaryButton
                title="Open Test Bottom Sheet"
                variant="secondary"
                onPress={() => setTestModalVisible(true)}
              />
              <BottomSheetModal
                visible={testModalVisible}
                onClose={() => setTestModalVisible(false)}
                title="Example Bottom Sheet"
              >
                <Text style={{ fontSize: 14, color: '#59445F', marginBottom: 14 }}>
                  This is the reusable animated bottom sheet used by Chat contact sharing and Halal exit modals.
                </Text>
                <PrimaryButton title="Close Sheet" onPress={() => setTestModalVisible(false)} />
              </BottomSheetModal>
            </View>
          </View>
        ) : (
          /* ========================================================
              SCREEN INVENTORY TILES
          ======================================================== */
          <View style={styles.screensSection}>
            <Text style={styles.sectionHeading}>
              {selectedCategory} SCREENS ({filteredScreens.length})
            </Text>

            {filteredScreens.map((screen) => (
              <View key={screen.id} style={styles.screenTile}>
                <View style={styles.tileHeader}>
                  <View style={styles.tileTitleCol}>
                    <Text style={styles.tileName}>{screen.name}</Text>
                    <Text style={styles.tileFile}>{screen.file}</Text>
                  </View>
                  <View style={styles.tileBadge}>
                    <Text style={styles.tileBadgeText}>{screen.badge}</Text>
                  </View>
                </View>

                <Text style={styles.tileDesc}>{screen.description}</Text>

                <View style={styles.tileActionsRow}>
                  <TouchableOpacity
                    style={styles.previewInPlaceBtn}
                    onPress={() => setActivePreviewScreen(screen)}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="eye" size={15} color="#FFFFFF" />
                    <Text style={styles.previewInPlaceText}>In-Place Preview</Text>
                  </TouchableOpacity>

                  {onNavigateRoute && screen.route !== 'Unrouted' && (
                    <TouchableOpacity
                      style={styles.navigateRouteBtn}
                      onPress={() => onNavigateRoute(screen.route)}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="open-outline" size={14} color="#6A3794" />
                      <Text style={styles.navigateRouteText}>Go via Router</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* ========================================================
          FULL-SCREEN IN-PLACE SCREEN PREVIEW MODAL
          Renders the real production screen with an overlay return bar
      ======================================================== */}
      {activePreviewScreen && (
        <Modal
          visible={true}
          animationType="slide"
          onRequestClose={() => setActivePreviewScreen(null)}
        >
          <View style={styles.previewModalContainer}>
            {/* Floating Top Back-Bar */}
            <View style={[styles.floatingBackBar, { paddingTop: Math.max(insets.top, 10) }]}>
              <TouchableOpacity
                style={styles.floatingBackBtn}
                onPress={() => setActivePreviewScreen(null)}
                activeOpacity={0.85}
              >
                <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
                <Text style={styles.floatingBackText}>Return to Showcase Index</Text>
              </TouchableOpacity>
              <Text style={styles.previewScreenTitle} numberOfLines={1}>
                {activePreviewScreen.name}
              </Text>
            </View>

            {/* Real Production Screen Render */}
            <View style={styles.renderedScreenContainer}>
              {activePreviewScreen.renderComponent(() => setActivePreviewScreen(null))}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E122B', // Royal Plum review desk background
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(173, 145, 193, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  crescentBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    color: '#AD91C1',
    marginTop: 1,
  },
  exitBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  exitBtnText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  categoryPillsScroll: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(173, 145, 193, 0.25)',
  },
  filterPillActive: {
    backgroundColor: '#6A3794',
    borderColor: '#AD91C1',
  },
  filterPillText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    fontWeight: '700',
    color: '#AD91C1',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },
  scrollList: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  sectionHeading: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    fontWeight: '800',
    color: '#AD91C1',
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 6,
  },
  screensSection: {
    gap: 12,
  },
  screenTile: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DBCADD',
    ...shadows.card,
  },
  tileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  tileTitleCol: {
    flex: 1,
    marginRight: 8,
  },
  tileName: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 16,
    fontWeight: '800',
    color: '#241B33',
  },
  tileFile: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#59445F',
    marginTop: 2,
  },
  tileBadge: {
    backgroundColor: '#F0E6F1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  tileBadgeText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    fontWeight: '700',
    color: '#6A3794',
  },
  tileDesc: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: '#59445F',
    lineHeight: 16,
    marginBottom: 12,
  },
  tileActionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  previewInPlaceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#6A3794',
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  previewInPlaceText: {
    fontFamily: typography.fontFamilies.button,
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  navigateRouteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0E6F1',
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  navigateRouteText: {
    fontFamily: typography.fontFamilies.button,
    fontSize: 12,
    fontWeight: '700',
    color: '#6A3794',
  },
  // Components Section
  componentsSection: {
    gap: 16,
  },
  componentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DBCADD',
    gap: 10,
  },
  componentCardTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 15,
    fontWeight: '800',
    color: '#241B33',
  },
  componentCardDesc: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    color: '#59445F',
  },
  buttonGrid: {
    gap: 8,
  },
  toggleCurtainBtn: {
    backgroundColor: '#F0E6F1',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  toggleCurtainBtnText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    fontWeight: '700',
    color: '#6A3794',
  },
  // Modal Preview Styles
  previewModalContainer: {
    flex: 1,
    backgroundColor: '#FDFCFC',
  },
  floatingBackBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#241B33',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#AD91C1',
    zIndex: 999,
  },
  floatingBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#6A3794',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radii.pill,
  },
  floatingBackText: {
    fontFamily: typography.fontFamilies.button,
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  previewScreenTitle: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 13,
    fontWeight: '700',
    color: '#AD91C1',
    maxWidth: 160,
  },
  renderedScreenContainer: {
    flex: 1,
  },
});
