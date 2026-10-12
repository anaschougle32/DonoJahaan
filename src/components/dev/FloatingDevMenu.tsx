import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ALL_SCREENS, ScreenDescriptor, ScreenId, navigateToScreen } from '../../navigation/navigationService';
import { colors, typography, radii, shadows } from '../../theme/tokens';

interface FloatingDevMenuProps {
  currentScreen?: string;
  onSelectScreen?: (id: ScreenId) => void;
}

export const FloatingDevMenu: React.FC<FloatingDevMenuProps> = ({
  currentScreen,
  onSelectScreen,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id: ScreenId) => {
    navigateToScreen(id);
    if (onSelectScreen) onSelectScreen(id);
    setIsOpen(false);
  };

  const categories = ['Onboarding & Auth', 'Main Tabs', 'Modals & Details'] as const;

  return (
    <>
      {/* Floating Pill on top of the preview */}
      <View style={styles.floatingAnchor} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setIsOpen(true)}
          activeOpacity={0.85}
        >
          <View style={styles.pulseDot} />
          <Ionicons name="compass" size={16} color="#D4AF37" />
          <Text style={styles.floatingButtonText}>Jump to Screen</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{ALL_SCREENS.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Full Quick Jump Modal */}
      <Modal
        visible={isOpen}
        animationType="fade"
        transparent
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.backdropDismiss}
            activeOpacity={1}
            onPress={() => setIsOpen(false)}
          />
          <View style={styles.modalSheet}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <View>
                <View style={styles.titleRow}>
                  <Ionicons name="sparkles" size={18} color="#D4AF37" />
                  <Text style={styles.modalTitle}>Dono Jaha Screen Switcher</Text>
                </View>
                <Text style={styles.modalSubtitle}>
                  Select any screen to preview immediately
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setIsOpen(false)}
              >
                <Ionicons name="close" size={20} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            {/* Screen List */}
            <ScrollView
              style={styles.screenList}
              contentContainerStyle={styles.screenListContent}
              showsVerticalScrollIndicator={false}
            >
              {categories.map((category) => {
                const categoryScreens = ALL_SCREENS.filter(
                  (s) => s.category === category
                );
                return (
                  <View key={category} style={styles.categorySection}>
                    <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>
                    <View style={styles.screenCardsGroup}>
                      {categoryScreens.map((screen) => {
                        const isActive = currentScreen === screen.id;
                        return (
                          <TouchableOpacity
                            key={screen.id}
                            style={[
                              styles.screenCard,
                              isActive && styles.screenCardActive,
                            ]}
                            onPress={() => handleSelect(screen.id)}
                            activeOpacity={0.7}
                          >
                            <View
                              style={[
                                styles.iconBox,
                                isActive && styles.iconBoxActive,
                              ]}
                            >
                              <Ionicons
                                name={screen.icon as any}
                                size={18}
                                color={isActive ? '#FFFFFF' : colors.primary}
                              />
                            </View>

                            <View style={styles.screenInfo}>
                              <View style={styles.screenTitleRow}>
                                <Text
                                  style={[
                                    styles.screenTitle,
                                    isActive && styles.screenTitleActive,
                                  ]}
                                >
                                  {screen.title}
                                </Text>
                                <View
                                  style={[
                                    styles.badgePill,
                                    isActive && styles.badgePillActive,
                                  ]}
                                >
                                  <Text
                                    style={[
                                      styles.badgePillText,
                                      isActive && styles.badgePillTextActive,
                                    ]}
                                  >
                                    {screen.badge}
                                  </Text>
                                </View>
                              </View>
                              <Text
                                style={styles.screenDesc}
                                numberOfLines={1}
                              >
                                {screen.description}
                              </Text>
                            </View>

                            <Ionicons
                              name="chevron-forward"
                              size={16}
                              color={isActive ? colors.primary : colors.outline}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            {/* Bottom Actions */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.quickResetBtn}
                onPress={() => handleSelect('Splash')}
              >
                <Ionicons name="refresh" size={16} color={colors.primary} />
                <Text style={styles.quickResetText}>Restart at Splash</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickHomeBtn}
                onPress={() => handleSelect('HomeTab')}
              >
                <Ionicons name="home" size={16} color="#FFFFFF" />
                <Text style={styles.quickHomeText}>Go to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingAnchor: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 14 : 44,
    right: 14,
    zIndex: 9999,
  },
  floatingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5A2F78', // Deep Purple: Plum / Royal Purple
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: '#D4AF37', // Gold border accent
    gap: 6,
    ...shadows.lg,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#AD91C1', // Soft Lavender
  },
  floatingButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  countBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.25)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 8,
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D4AF37',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  backdropDismiss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalSheet: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '85%',
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    ...shadows.modal,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainer,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  modalTitle: {
    ...typography.headlineSm,
    color: colors.primary,
    fontWeight: '800',
    fontSize: 17,
  },
  modalSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenList: {
    marginTop: 12,
  },
  screenListContent: {
    paddingBottom: 12,
  },
  categorySection: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
    marginBottom: 8,
  },
  screenCardsGroup: {
    gap: 8,
  },
  screenCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 14,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.surfaceContainer,
  },
  screenCardActive: {
    backgroundColor: 'rgba(11, 107, 87, 0.08)',
    borderColor: colors.primary,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconBoxActive: {
    backgroundColor: colors.primary,
  },
  screenInfo: {
    flex: 1,
    marginRight: 8,
  },
  screenTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  screenTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  screenTitleActive: {
    color: colors.primary,
  },
  badgePill: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgePillActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
  },
  badgePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
  },
  badgePillTextActive: {
    color: '#B8860B',
  },
  screenDesc: {
    fontSize: 11,
    color: colors.textMuted,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainer,
    marginTop: 8,
  },
  quickResetBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    gap: 6,
  },
  quickResetText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  quickHomeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.primary,
    gap: 6,
  },
  quickHomeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
