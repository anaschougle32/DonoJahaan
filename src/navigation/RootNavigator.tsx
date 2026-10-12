import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import { LogoSplashScreen } from '../features/auth/LogoSplashScreen';
import { SplashScreen } from '../features/auth/SplashScreen';
import { PhoneAuthScreen } from '../features/auth/PhoneAuthScreen';
import { OtpVerificationScreen } from '../features/auth/OtpVerificationScreen';
import { QuestionnaireScreen } from '../features/onboarding/QuestionnaireScreen';
import { ProfileSetupCompleteScreen } from '../features/onboarding/ProfileSetupCompleteScreen';
import { PhysicalDetailsScreen } from '../features/onboarding/PhysicalDetailsScreen';
import { EducationScreen } from '../features/onboarding/EducationScreen';
import { ProfessionScreen } from '../features/onboarding/ProfessionScreen';
import { FamilyDetailsScreen } from '../features/onboarding/FamilyDetailsScreen';
import { PartnerPreferencesScreen } from '../features/onboarding/PartnerPreferencesScreen';
import { ProfilePhotosScreen } from '../features/onboarding/ProfilePhotosScreen';
import { VoiceIntroScreen } from '../features/onboarding/VoiceIntroScreen';
import { SelfieVerificationScreen } from '../features/onboarding/SelfieVerificationScreen';
import { ProfileViewsScreen } from '../features/profile/ProfileViewsScreen';
import { TabNavigator } from './TabNavigator';
import { ProfileDetailScreen } from '../features/profile/ProfileDetailScreen';
import { NotificationsScreen } from '../features/notifications/NotificationsScreen';
import { AccountSettingsScreen } from '../features/settings/AccountSettingsScreen';
import { AdvancedFiltersScreen } from '../features/search/AdvancedFiltersScreen';
import { SecondaryProfileWizardScreen } from '../features/onboarding/SecondaryProfileWizardScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="LogoSplash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* Brand Opening Logo Screen */}
      <Stack.Screen name="LogoSplash">
        {({ navigation }) => (
          <LogoSplashScreen
            onStart={() => navigation.navigate('Splash')}
            onDirectLogin={() => navigation.navigate('PhoneAuth')}
            onExplore={() => navigation.navigate('MainTabs', { screen: 'MatchesTab' })}
          />
        )}
      </Stack.Screen>

      {/* Onboarding & Authentication Stack */}
      <Stack.Screen name="Splash">
        {({ navigation }) => (
          <SplashScreen
            onComplete={() => navigation.navigate('PhoneAuth')}
            onSkip={() => navigation.navigate('MainTabs', { screen: 'MatchesTab' })}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="PhoneAuth">
        {({ navigation }) => (
          <PhoneAuthScreen
            onSendOtp={(phone) => navigation.navigate('OtpVerification', { phone })}
            onBack={() => navigation.goBack()}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="OtpVerification">
        {({ navigation, route }) => (
          <OtpVerificationScreen
            phoneNumber={route.params?.phone || '98230 12345'}
            onVerifySuccess={() => navigation.navigate('Questionnaire')}
            onChangeNumber={() => navigation.navigate('PhoneAuth')}
            onBack={() => navigation.goBack()}
          />
        )}
      </Stack.Screen>

      {/* Phase 1: Essential Onboarding Setup */}
      <Stack.Screen name="Questionnaire">
        {({ navigation }) => (
          <QuestionnaireScreen
            onComplete={() => navigation.navigate('ProfileSetupComplete')}
            onExit={() => navigation.replace('MainTabs', { screen: 'MatchesTab' })}
          />
        )}
      </Stack.Screen>

      {/* Profile Live Milestone with Progressive Animation */}
      <Stack.Screen name="ProfileSetupComplete">
        {({ navigation }) => (
          <ProfileSetupCompleteScreen
            onGoHome={() => navigation.replace('MainTabs', { screen: 'HomeTab' })}
            onViewMatches={() => navigation.replace('MainTabs', { screen: 'MatchesTab' })}
            onCompleteProfile={() => navigation.navigate('PhysicalDetails')}
          />
        )}
      </Stack.Screen>

      {/* Phase 2: Modular Dedicated Sections */}
      {/* Section 11: Dedicated Physical Details (Height strictly here) */}
      <Stack.Screen name="PhysicalDetails">
        {({ navigation }) => (
          <PhysicalDetailsScreen
            onBack={() => navigation.goBack()}
            onNext={() => navigation.navigate('EducationDetails')}
          />
        )}
      </Stack.Screen>

      {/* Section 12-13: Education with Structured Dataset */}
      <Stack.Screen name="EducationDetails">
        {({ navigation }) => (
          <EducationScreen
            onBack={() => navigation.goBack()}
            onNext={() => navigation.navigate('ProfessionDetails')}
          />
        )}
      </Stack.Screen>

      {/* Section 14-15: Profession with Single Search & Canonical Data */}
      <Stack.Screen name="ProfessionDetails">
        {({ navigation }) => (
          <ProfessionScreen
            onBack={() => navigation.goBack()}
            onNext={() => navigation.navigate('FamilyDetails')}
          />
        )}
      </Stack.Screen>

      {/* Section 16-19: Family Details with Structured Location Search */}
      <Stack.Screen name="FamilyDetails">
        {({ navigation }) => (
          <FamilyDetailsScreen
            onBack={() => navigation.goBack()}
            onSaved={() => navigation.navigate('PartnerPreferences')}
          />
        )}
      </Stack.Screen>

      {/* Section 21-23: Partner Preferences (Dedicated Selector Rows) */}
      <Stack.Screen name="PartnerPreferences">
        {({ navigation }) => (
          <PartnerPreferencesScreen
            onBack={() => navigation.goBack()}
            onApply={() => navigation.navigate('ProfilePhotos')}
          />
        )}
      </Stack.Screen>

      {/* Section 24: Dedicated Profile Photos with Modesty Shield */}
      <Stack.Screen name="ProfilePhotos">
        {({ navigation }) => (
          <ProfilePhotosScreen
            onBack={() => navigation.goBack()}
            onNext={() => navigation.navigate('VoiceIntro')}
          />
        )}
      </Stack.Screen>

      {/* Section 25: Dedicated Voice Introduction (Stitch UI Studio) */}
      <Stack.Screen name="VoiceIntro">
        {({ navigation }) => (
          <VoiceIntroScreen
            onBack={() => navigation.goBack()}
            onNext={() => navigation.navigate('SelfieVerification')}
          />
        )}
      </Stack.Screen>

      {/* Section 26-28: Dedicated Selfie Verification (Strictly Private) */}
      <Stack.Screen name="SelfieVerification">
        {({ navigation }) => (
          <SelfieVerificationScreen
            onBack={() => navigation.goBack()}
            onVerified={(_uri) => navigation.replace('MainTabs', { screen: 'MatchesTab' })}
            onSkip={() => navigation.replace('MainTabs', { screen: 'MatchesTab' })}
          />
        )}
      </Stack.Screen>

      {/* Section 36-38: Who Viewed Your Profile */}
      <Stack.Screen name="ProfileViews">
        {({ navigation }) => (
          <ProfileViewsScreen
            onBack={() => navigation.goBack()}
            onViewProfile={(viewerId, name) =>
              navigation.navigate('ProfileDetail', { profileId: viewerId, profileName: name })
            }
          />
        )}
      </Stack.Screen>

      {/* Legacy/Secondary Profile Wizard fallback */}
      <Stack.Screen name="SecondaryProfileWizard">
        {({ navigation, route }) => (
          <SecondaryProfileWizardScreen
            initialBatch={route.params?.initialBatch || '2A'}
            onBack={() => navigation.goBack()}
            onFinish={() => navigation.replace('MainTabs', { screen: 'MatchesTab' })}
            onOpenSelfieVerification={() => navigation.navigate('SelfieVerification')}
          />
        )}
      </Stack.Screen>

      {/* Main Authenticated Application */}
      <Stack.Screen name="MainTabs" component={TabNavigator} />

      {/* Detail & Setting Overlays */}
      <Stack.Screen
        name="ProfileDetail"
        options={{
          animation: 'slide_from_bottom',
        }}
      >
        {({ navigation }) => (
          <ProfileDetailScreen
            onBack={() => navigation.goBack()}
            onStartChat={() => navigation.navigate('MainTabs', { screen: 'ChatTab' })}
            onEndConversation={() => navigation.navigate('MainTabs', { screen: 'HomeTab' })}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Notifications">
        {({ navigation }) => (
          <NotificationsScreen
            onBack={() => navigation.goBack()}
            onOpenChat={() => navigation.navigate('MainTabs', { screen: 'ChatTab' })}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="AccountSettings">
        {({ navigation }) => (
          <AccountSettingsScreen
            onBack={() => navigation.goBack()}
            onLogout={() => navigation.reset({ index: 0, routes: [{ name: 'PhoneAuth' }] })}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="AdvancedFilters"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      >
        {({ navigation }) => (
          <AdvancedFiltersScreen
            onClose={() => navigation.goBack()}
            onApply={() => navigation.goBack()}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
