export type RootStackParamList = {
  LogoSplash: undefined;
  Splash: undefined;
  PhoneAuth: undefined;
  OtpVerification: { phone: string };
  Questionnaire: undefined; // Phase 1: Essential Setup
  ProfileSetupComplete: undefined; // Profile Live Milestone with Animation
  PhysicalDetails: undefined; // Phase 2: Basic & Physical Details (Height)
  EducationDetails: undefined; // Phase 2: Education Details
  ProfessionDetails: undefined; // Phase 2: Profession & Work
  FamilyDetails: undefined; // Phase 2: Family Details
  PartnerPreferences: undefined; // Phase 2: Partner Preferences
  ProfilePhotos: undefined; // Phase 2: Profile Photos
  VoiceIntro: undefined; // Phase 2: Voice Introduction
  SelfieVerification: undefined; // Dedicated Verification Selfie
  ProfileViews: undefined; // New Feature: Who Viewed Your Profile
  MainTabs: { screen?: keyof MainTabParamList };
  ProfileDetail: { profileId?: string; profileName?: string };
  Notifications: undefined;
  AccountSettings: undefined;
  AdvancedFilters: undefined;
  SecondaryProfileWizard?: { initialBatch?: '2A' | '2B' | '2C' };
};

export type MainTabParamList = {
  HomeTab: undefined;
  MatchesTab: undefined;
  InterestsTab: undefined;
  ChatTab: undefined;
  ProfileTab: undefined;
};
