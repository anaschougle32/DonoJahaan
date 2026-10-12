import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ALL_SCREENS, ScreenId, navigateToScreen } from '../../navigation/navigationService';
import { colors, radii, shadows } from '../../theme/tokens';

interface WebSidebarSwitcherProps {
  currentScreen?: string;
  onSelectScreen?: (id: ScreenId) => void;
}

export const WebSidebarSwitcher: React.FC<WebSidebarSwitcherProps> = ({
  currentScreen,
  onSelectScreen,
}) => {
  const handleSelect = (id: ScreenId) => {
    navigateToScreen(id);
    if (onSelectScreen) onSelectScreen(id);
  };

  const categories = [
    { name: 'Onboarding & Auth', icon: 'person-add' },
    { name: 'Main Tabs', icon: 'grid' },
    { name: 'Modals & Details', icon: 'layers' },
  ] as const;

  return (
    <View style={styles.sidebarContainer}>
      {/* Brand Header */}
      <View style={styles.brandHeader}>
        <View style={styles.logoRow}>
          <View style={styles.logoIcon}>
            <Ionicons name="moon" size={18} color="#D4AF37" />
          </View>
          <View>
            <Text style={styles.brandTitle}>DONO JAHA</Text>
            <Text style={styles.brandTagline}>Islamic Matrimonial Suite</Text>
          </View>
        </View>

        <View style={styles.liveBadge}>
          <View style={styles.livePulse} />
          <Text style={styles.liveText}>Interactive Screen Navigator</Text>
        </View>
      </View>

      {/* Screen Sections */}
      <ScrollView
        style={styles.scrollList}
        contentContainerStyle={styles.scrollListContent}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((cat) => {
          const screens = ALL_SCREENS.filter((s) => s.category === cat.name);
          return (
            <View key={cat.name} style={styles.sectionGroup}>
              <View style={styles.sectionHeader}>
                <Ionicons name={cat.icon as any} size={14} color="#D4AF37" />
                <Text style={styles.sectionHeaderText}>{cat.name.toUpperCase()}</Text>
                <View style={styles.sectionCount}>
                  <Text style={styles.sectionCountText}>{screens.length}</Text>
                </View>
              </View>

              <View style={styles.screenButtons}>
                {screens.map((screen) => {
                  const isActive = currentScreen === screen.id;
                  return (
                    <TouchableOpacity
                      key={screen.id}
                      style={[
                        styles.screenItem,
                        isActive && styles.screenItemActive,
                      ]}
                      onPress={() => handleSelect(screen.id)}
                      activeOpacity={0.8}
                    >
                      <View
                        style={[
                          styles.itemIconBox,
                          isActive && styles.itemIconBoxActive,
                        ]}
                      >
                        <Ionicons
                          name={screen.icon as any}
                          size={15}
                          color={isActive ? '#FFFFFF' : '#AD91C1'}
                        />
                      </View>

                      <View style={styles.itemDetails}>
                        <View style={styles.itemHeader}>
                          <Text
                            style={[
                              styles.itemTitle,
                              isActive && styles.itemTitleActive,
                            ]}
                            numberOfLines={1}
                          >
                            {screen.title}
                          </Text>
                          <View
                            style={[
                              styles.badge,
                              isActive && styles.badgeActive,
                            ]}
                          >
                            <Text
                              style={[
                                styles.badgeText,
                                isActive && styles.badgeTextActive,
                              ]}
                            >
                              {screen.badge}
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={[
                            styles.itemDescription,
                            isActive && styles.itemDescriptionActive,
                          ]}
                          numberOfLines={1}
                        >
                          {screen.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Footer Info */}
      <View style={styles.sidebarFooter}>
        <View style={styles.footerNote}>
          <Ionicons name="shield-checkmark" size={14} color="#10B981" />
          <Text style={styles.footerText}>
            Single-Active-Conversation Rule enforced
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    width: 340,
    maxHeight: 900,
    backgroundColor: '#1E1428', // Deep Plum luxury control panel
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(173, 145, 193, 0.25)', // Soft lavender subtle border
    padding: 18,
    marginRight: 24,
    ...shadows.modal,
    display: 'flex',
    flexDirection: 'column',
  },
  brandHeader: {
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(106, 55, 148, 0.35)',
    borderWidth: 1,
    borderColor: '#AD91C1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FDFCFC', // Warm White
    letterSpacing: 1.5,
  },
  brandTagline: {
    fontSize: 11,
    color: '#AD91C1', // Soft Lavender
    fontWeight: '500',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(106, 55, 148, 0.25)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(173, 145, 193, 0.4)',
  },
  livePulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#AD91C1',
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DBCADD',
  },
  scrollList: {
    flex: 1,
    marginTop: 10,
  },
  scrollListContent: {
    paddingBottom: 8,
  },
  sectionGroup: {
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    marginTop: 4,
  },
  sectionHeaderText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#DBCADD',
    letterSpacing: 1,
  },
  sectionCount: {
    backgroundColor: 'rgba(106, 55, 148, 0.35)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    marginLeft: 'auto',
  },
  sectionCountText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#DBCADD',
  },
  screenButtons: {
    gap: 6,
  },
  screenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  screenItemActive: {
    backgroundColor: '#6A3794', // Rich Primary Purple
    borderColor: '#AD91C1',
  },
  itemIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  itemIconBoxActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  itemDetails: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F0E6F1',
  },
  itemTitleActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  badgeActive: {
    backgroundColor: 'rgba(90, 47, 120, 0.6)',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#AD91C1',
  },
  badgeTextActive: {
    color: '#FFFFFF',
  },
  itemDescription: {
    fontSize: 10,
    color: '#AD91C1',
    marginTop: 1,
  },
  itemDescriptionActive: {
    color: '#F0E6F1',
  },
  sidebarFooter: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    marginTop: 6,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(106, 55, 148, 0.2)',
    padding: 8,
    borderRadius: 8,
  },
  footerText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#DBCADD',
  },
});
