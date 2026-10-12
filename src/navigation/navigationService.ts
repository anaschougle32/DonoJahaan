import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export type ScreenId =
  | 'LogoSplash'
  | 'Splash'
  | 'PhoneAuth'
  | 'OtpVerification'
  | 'Questionnaire'
  | 'ProfileSetupComplete'
  | 'PhysicalDetails'
  | 'EducationDetails'
  | 'ProfessionDetails'
  | 'FamilyDetails'
  | 'PartnerPreferences'
  | 'ProfilePhotos'
  | 'VoiceIntro'
  | 'SelfieVerification'
  | 'ProfileViews'
  | 'SecondaryProfileWizard'
  | 'HomeTab'
  | 'MatchesTab'
  | 'InterestsTab'
  | 'ChatTab'
  | 'ProfileTab'
  | 'ProfileDetail'
  | 'AdvancedFilters'
  | 'Notifications'
  | 'AccountSettings';

export interface ScreenDescriptor {
  id: ScreenId;
  title: string;
  category: 'Onboarding & Auth' | 'Main Tabs' | 'Modals & Details';
  badge: string;
  icon: string;
  description: string;
}

export const ALL_SCREENS: ScreenDescriptor[] = [
  {
    id: 'LogoSplash',
    title: 'Brand Logo Splash',
    category: 'Onboarding & Auth',
    badge: 'Opening',
    icon: 'star',
    description: 'Bismillah, golden Islamic crescent crest & Quranic marriage verse',
  },
  {
    id: 'Splash',
    title: 'Splash Onboarding (1-3)',
    category: 'Onboarding & Auth',
    badge: '3 Slides',
    icon: 'sparkles',
    description: 'Exact Stitch vector family, modesty shield, and verified matching cards',
  },
  {
    id: 'PhoneAuth',
    title: 'Phone Login',
    category: 'Onboarding & Auth',
    badge: 'Auth',
    icon: 'call',
    description: 'Country picker (+91), phone input, Islamic welcome & auth methods',
  },
  {
    id: 'OtpVerification',
    title: 'OTP Verification',
    category: 'Onboarding & Auth',
    badge: 'Auth',
    icon: 'keypad',
    description: '6-digit secure PIN verification with countdown resend timer',
  },
  {
    id: 'Questionnaire',
    title: 'Matrimonial Onboarding',
    category: 'Onboarding & Auth',
    badge: 'Fast 8-Step',
    icon: 'clipboard',
    description: 'Low-friction 8 essential questions to get profile live immediately',
  },
  {
    id: 'ProfileSetupComplete',
    title: 'Profile Ready (Alhamdulillah)',
    category: 'Onboarding & Auth',
    badge: 'Live',
    icon: 'checkmark-circle',
    description: 'Celebratory moment: Your profile is live! 55% completed',
  },
  {
    id: 'SecondaryProfileWizard',
    title: 'Profile Wizard (Phase 2)',
    category: 'Onboarding & Auth',
    badge: 'Batches',
    icon: 'create',
    description: 'Phase 2A, 2B, 2C structured education, profession, family & preferences',
  },
  {
    id: 'SelfieVerification',
    title: 'Selfie Verification',
    category: 'Onboarding & Auth',
    badge: 'Security',
    icon: 'camera',
    description: 'Dedicated selfie verification separated from public profile photo',
  },
  {
    id: 'FamilyDetails',
    title: 'Family Details',
    category: 'Onboarding & Auth',
    badge: 'Secondary',
    icon: 'people',
    description: 'Family location, living arrangement & financial status (Elite to Aspiring)',
  },
  {
    id: 'PartnerPreferences',
    title: 'Partner Preferences',
    category: 'Onboarding & Auth',
    badge: 'Secondary',
    icon: 'options',
    description: 'Age range, marital status, income, searchable profession & managed by',
  },
  {
    id: 'HomeTab',
    title: 'Home Dashboard',
    category: 'Main Tabs',
    badge: 'Tab 1',
    icon: 'home',
    description: 'Active match hero card, prayer times, profile views & daily Hadith',
  },
  {
    id: 'MatchesTab',
    title: 'Matches (Shaadi UX)',
    category: 'Main Tabs',
    badge: 'Tab 2',
    icon: 'people',
    description: 'Daily matches, female Haya blur privacy, voice intro pill & connect action',
  },
  {
    id: 'InterestsTab',
    title: 'Interests & Requests',
    category: 'Main Tabs',
    badge: 'Tab 3',
    icon: 'heart',
    description: 'Received & sent requests + One-Active-Conversation rule modal',
  },
  {
    id: 'ChatTab',
    title: 'Dignified Chat',
    category: 'Main Tabs',
    badge: 'Tab 4',
    icon: 'chatbubble-ellipses',
    description: 'Halal communication banner, voice note player, contact exchange modal',
  },
  {
    id: 'ProfileTab',
    title: 'My Profile Hub',
    category: 'Main Tabs',
    badge: 'Tab 5',
    icon: 'person',
    description: 'Personal matrimonial biodata, verification badges, preferences',
  },
  {
    id: 'ProfileDetail',
    title: 'Profile Detail View',
    category: 'Modals & Details',
    badge: 'Detail',
    icon: 'person-circle',
    description: 'Deen & lifestyle matrix, Islamic values, and Halal exit modal',
  },
  {
    id: 'ProfileViews',
    title: 'Who Viewed Your Profile',
    category: 'Modals & Details',
    badge: 'Views',
    icon: 'eye',
    description: 'Suitor visit tracking, timestamps, privacy blur & direct connect',
  },
  {
    id: 'AdvancedFilters',
    title: 'Advanced Search Filters',
    category: 'Modals & Details',
    badge: 'Search',
    icon: 'options',
    description: 'Filter by Sect, Salah habit, Halal diet, Education, Profession, Height',
  },
  {
    id: 'Notifications',
    title: 'Notifications & Alerts',
    category: 'Modals & Details',
    badge: 'Alerts',
    icon: 'notifications',
    description: 'Interest requests, messages, verification updates',
  },
  {
    id: 'AccountSettings',
    title: 'Account & Privacy Settings',
    category: 'Modals & Details',
    badge: 'Settings',
    icon: 'settings',
    description: 'Pause matchmaking, privacy controls, data export & account deletion',
  },
];

export function navigateToScreen(id: ScreenId) {
  if (!navigationRef.isReady()) return;

  switch (id) {
    case 'LogoSplash':
      navigationRef.navigate('LogoSplash');
      break;
    case 'Splash':
      navigationRef.navigate('Splash');
      break;
    case 'PhoneAuth':
      navigationRef.navigate('PhoneAuth');
      break;
    case 'OtpVerification':
      navigationRef.navigate('OtpVerification', { phone: '98230 12345' });
      break;
    case 'Questionnaire':
      navigationRef.navigate('Questionnaire');
      break;
    case 'ProfileSetupComplete':
      navigationRef.navigate('ProfileSetupComplete');
      break;
    case 'SecondaryProfileWizard':
      navigationRef.navigate('SecondaryProfileWizard', {});
      break;
    case 'SelfieVerification':
      navigationRef.navigate('SelfieVerification');
      break;
    case 'FamilyDetails':
      navigationRef.navigate('FamilyDetails');
      break;
    case 'PartnerPreferences':
      navigationRef.navigate('PartnerPreferences');
      break;
    case 'HomeTab':
      navigationRef.navigate('MainTabs', { screen: 'HomeTab' });
      break;
    case 'MatchesTab':
      navigationRef.navigate('MainTabs', { screen: 'MatchesTab' });
      break;
    case 'InterestsTab':
      navigationRef.navigate('MainTabs', { screen: 'InterestsTab' });
      break;
    case 'ChatTab':
      navigationRef.navigate('MainTabs', { screen: 'ChatTab' });
      break;
    case 'ProfileTab':
      navigationRef.navigate('MainTabs', { screen: 'ProfileTab' });
      break;
    case 'ProfileDetail':
      navigationRef.navigate('ProfileDetail', { profileId: 'p-1', profileName: 'Ayesha M.' });
      break;
    case 'PhysicalDetails':
      navigationRef.navigate('PhysicalDetails');
      break;
    case 'EducationDetails':
      navigationRef.navigate('EducationDetails');
      break;
    case 'ProfessionDetails':
      navigationRef.navigate('ProfessionDetails');
      break;
    case 'ProfilePhotos':
      navigationRef.navigate('ProfilePhotos');
      break;
    case 'VoiceIntro':
      navigationRef.navigate('VoiceIntro');
      break;
    case 'ProfileViews':
      navigationRef.navigate('ProfileViews');
      break;
    case 'AdvancedFilters':
      navigationRef.navigate('AdvancedFilters');
      break;
    case 'Notifications':
      navigationRef.navigate('Notifications');
      break;
    case 'AccountSettings':
      navigationRef.navigate('AccountSettings');
      break;
  }
}
