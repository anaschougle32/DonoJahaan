import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from './types';
import { colors, typography, shadows } from '../theme/tokens';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreen } from '../features/home/HomeScreen';
import { MatchesScreen } from '../features/matches/MatchesScreen';
import { InterestsScreen } from '../features/interests/InterestsScreen';
import { ChatScreen } from '../features/chat/ChatScreen';
import { ProfileHubScreen } from '../features/settings/ProfileHubScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const TabNavigator: React.FC = () => {
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'ios' ? 20 : 8);

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.outline,
        tabBarStyle: [
          styles.tabBar,
          {
            height: 54 + bottomInset,
            paddingBottom: bottomInset,
          },
        ],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={22}
                color={color}
              />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      >
        {() => (
          <HomeScreen
            onNavigate={(screen: string) => {
              if (screen === 'ProfileDetail') rootNavigation.navigate('ProfileDetail', {});
              else if (screen === 'Notifications') rootNavigation.navigate('Notifications');
              else if (screen === 'Questionnaire') rootNavigation.navigate('Questionnaire');
              else if (screen === 'Matches') rootNavigation.navigate('MainTabs', { screen: 'MatchesTab' });
              else if (screen === 'FamilyDetails') rootNavigation.navigate('FamilyDetails');
              else if (screen === 'PartnerPreferences') rootNavigation.navigate('PartnerPreferences');
            }}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="MatchesTab"
        options={{
          tabBarLabel: 'Matches',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name={focused ? 'people' : 'people-outline'}
                size={22}
                color={color}
              />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      >
        {() => (
          <MatchesScreen
            onNavigate={(screen: string) => {
              if (screen === 'ProfileDetail') rootNavigation.navigate('ProfileDetail', {});
              else if (screen === 'Notifications') rootNavigation.navigate('Notifications');
              else if (screen === 'AdvancedFilters') rootNavigation.navigate('AdvancedFilters');
              else if (screen === 'ChatTab') rootNavigation.navigate('MainTabs', { screen: 'ChatTab' });
              else if (screen === 'ProfileTab') rootNavigation.navigate('MainTabs', { screen: 'ProfileTab' });
            }}
            onOpenNotifications={() => rootNavigation.navigate('Notifications')}
            onOpenFilters={() => rootNavigation.navigate('AdvancedFilters')}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="InterestsTab"
        options={{
          tabBarLabel: 'Interests',
          tabBarBadge: 2,
          tabBarBadgeStyle: styles.badgeStyle,
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name={focused ? 'heart' : 'heart-outline'}
                size={22}
                color={color}
              />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      >
        {() => (
          <InterestsScreen
            onNavigate={(screen: string) => {
              if (screen === 'ProfileDetail') rootNavigation.navigate('ProfileDetail', {});
              else if (screen === 'Chat') rootNavigation.navigate('MainTabs', { screen: 'ChatTab' });
            }}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="ChatTab"
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name={focused ? 'chatbubble' : 'chatbubble-outline'}
                size={22}
                color={color}
              />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      >
        {() => (
          <ChatScreen
            onBack={() => rootNavigation.navigate('MainTabs', { screen: 'HomeTab' })}
            onViewProfile={() => rootNavigation.navigate('ProfileDetail', {})}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="ProfileTab"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={22}
                color={color}
              />
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      >
        {() => (
          <ProfileHubScreen
            onNavigate={(screen) => {
              if (screen === 'ProfileDetail') rootNavigation.navigate('ProfileDetail', {});
              else if (screen === 'ProfileViews') rootNavigation.navigate('ProfileViews');
              else if (screen === 'AccountSettings') rootNavigation.navigate('AccountSettings');
              else if (screen === 'AdvancedFilters') rootNavigation.navigate('AdvancedFilters');
              else if (screen === 'Questionnaire') rootNavigation.navigate('Questionnaire');
              else if (screen === 'PhysicalDetails') rootNavigation.navigate('PhysicalDetails');
              else if (screen === 'EducationDetails') rootNavigation.navigate('EducationDetails');
              else if (screen === 'ProfessionDetails') rootNavigation.navigate('ProfessionDetails');
              else if (screen === 'FamilyDetails') rootNavigation.navigate('FamilyDetails');
              else if (screen === 'PartnerPreferences') rootNavigation.navigate('PartnerPreferences');
              else if (screen === 'ProfilePhotos') rootNavigation.navigate('ProfilePhotos');
              else if (screen === 'VoiceIntro') rootNavigation.navigate('VoiceIntro');
              else if (screen === 'SelfieVerification') rootNavigation.navigate('SelfieVerification');
            }}
            onSignOut={() => rootNavigation.reset({ index: 0, routes: [{ name: 'PhoneAuth' }] })}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.surfaceContainer,
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 86 : 64,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 8,
    ...shadows.sm,
  },
  tabBarLabel: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  tabBarItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 26,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 2,
  },
  badgeStyle: {
    backgroundColor: colors.primary,
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
  },
});
