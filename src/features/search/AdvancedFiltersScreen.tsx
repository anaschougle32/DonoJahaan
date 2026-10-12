import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, radius, shadows } from '../../theme/tokens';

interface AdvancedFiltersScreenProps {
  onClose?: () => void;
  onApply?: () => void;
}

export const AdvancedFiltersScreen: React.FC<AdvancedFiltersScreenProps> = ({
  onClose,
  onApply,
}) => {
  const [selectedSalah, setSelectedSalah] = useState<string[]>(['always', 'usually']);
  const [hasVoiceIntro, setHasVoiceIntro] = useState(true);
  const [modestyBlurOnly, setModestyBlurOnly] = useState(false);
  const [halalDiet, setHalalDiet] = useState(true);
  const [nonDrinker, setNonDrinker] = useState(true);

  const toggleSalah = (val: string) => {
    if (selectedSalah.includes(val)) {
      setSelectedSalah(selectedSalah.filter((s) => s !== val));
    } else {
      setSelectedSalah([...selectedSalah, val]);
    }
  };

  const handleReset = () => {
    setSelectedSalah(['always']);
    setHasVoiceIntro(false);
    setModestyBlurOnly(false);
    setHalalDiet(true);
    setNonDrinker(true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
            <Ionicons name="close" size={24} color={colors.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Preference Filters</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleReset} activeOpacity={0.7}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <View style={styles.headerAvatar}>
            <Ionicons name="person" size={16} color="#FFFFFF" />
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Subtle Barakah Banner */}
        <View style={styles.barakahBanner}>
          <View style={styles.barakahIconWrap}>
            <Ionicons name="heart" size={18} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.barakahTitle}>Intentional Compatibility</Text>
            <Text style={styles.barakahSubtitle}>
              Refining values for a blessed, family-aligned union
            </Text>
          </View>
        </View>

        {/* Section 1: Location */}
        <View style={styles.filterSection}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.distanceBadge}>
              <Ionicons name="navigate-outline" size={12} color={colors.primary} />
              <Text style={styles.distanceText}>Within 50 km</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.selectorField} activeOpacity={0.8}>
            <View style={styles.fieldLeft}>
              <Ionicons name="location-outline" size={20} color={colors.outline} />
              <Text style={styles.fieldValue}>Mumbai, Maharashtra</Text>
            </View>
            <Ionicons name="chevron-down" size={18} color={colors.outline} />
          </TouchableOpacity>
        </View>

        {/* Section 2: Prayers (Salah) */}
        <View style={styles.filterSection}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Prayers (Salah)</Text>
            <Text style={styles.sectionSubtitle}>Core spiritual habit</Text>
          </View>

          <View style={styles.chipsWrap}>
            {[
              { id: 'always', label: 'Always Prays' },
              { id: 'usually', label: 'Usually Prays' },
              { id: 'sometimes', label: 'Sometimes' },
              { id: 'reverting', label: 'Learning / Revert' },
            ].map((chip) => {
              const active = selectedSalah.includes(chip.id);
              return (
                <TouchableOpacity
                  key={chip.id}
                  style={[styles.filterChip, active && styles.filterChipActive]}
                  onPress={() => toggleSalah(chip.id)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={active ? 'checkmark' : 'time-outline'}
                    size={14}
                    color={active ? '#FFFFFF' : colors.outline}
                  />
                  <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
                    {chip.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section 3: Minimum Education */}
        <View style={styles.filterSection}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Minimum Education</Text>
            <Text style={styles.sectionSubtitle}>Level completed</Text>
          </View>

          <TouchableOpacity style={styles.selectorField} activeOpacity={0.8}>
            <View style={styles.fieldLeft}>
              <Ionicons name="school-outline" size={20} color={colors.outline} />
              <Text style={styles.fieldValue}>Bachelor's Degree or higher</Text>
            </View>
            <Ionicons name="chevron-down" size={18} color={colors.outline} />
          </TouchableOpacity>
        </View>

        {/* Section 4: Verified Profile Status Card */}
        <View style={styles.verifiedCard}>
          <View style={styles.verifiedLeft}>
            <View style={styles.verifiedIconCircle}>
              <Ionicons name="shield-checkmark" size={18} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.verifiedCardTitle}>Verified Profiles Only</Text>
              <Text style={styles.verifiedCardSubtitle}>Selfie & identity authenticated members</Text>
            </View>
          </View>
          <View style={styles.preferredBadge}>
            <Text style={styles.preferredText}>Preferred</Text>
          </View>
        </View>

        {/* Section 5: Profile Features (Toggles) */}
        <View style={styles.toggleCard}>
          <View style={styles.toggleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.toggleTitle}>Has Voice Introduction</Text>
              <Text style={styles.toggleSubtitle}>Hear speech cadence and demeanor</Text>
            </View>
            <Switch
              value={hasVoiceIntro}
              onValueChange={setHasVoiceIntro}
              trackColor={{ false: colors.surfaceContainerHighest, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.toggleDivider} />

          <View style={styles.toggleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.toggleTitle}>Photo Modesty Blur</Text>
              <Text style={styles.toggleSubtitle}>Revealed only upon mutual request</Text>
            </View>
            <Switch
              value={modestyBlurOnly}
              onValueChange={setModestyBlurOnly}
              trackColor={{ false: colors.surfaceContainerHighest, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Section 6: Diet & Halal */}
        <View style={styles.filterSection}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Diet & Halal</Text>
            <Text style={styles.sectionSubtitle}>Multi-select</Text>
          </View>

          <View style={styles.dietGrid}>
            <TouchableOpacity
              style={[styles.dietCard, halalDiet && styles.dietCardActive]}
              onPress={() => setHalalDiet(!halalDiet)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="silverware-fork-knife"
                size={18}
                color={halalDiet ? colors.primary : colors.outline}
              />
              <Text style={[styles.dietCardText, halalDiet && styles.dietCardTextActive]}>
                Always Halal Only
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.dietCard, nonDrinker && styles.dietCardActive]}
              onPress={() => setNonDrinker(!nonDrinker)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="glass-cocktail-off"
                size={18}
                color={nonDrinker ? colors.primary : colors.outline}
              />
              <Text style={[styles.dietCardText, nonDrinker && styles.dietCardTextActive]}>
                Non-Drinker
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Apply Bar */}
      <View style={styles.floatingBottomBar}>
        <View style={styles.matchCounterLeft}>
          <Text style={styles.matchCountHeading}>18 Profiles Match</Text>
          <Text style={styles.matchCountSubtitle}>Based on intentional criteria</Text>
        </View>
        <TouchableOpacity style={styles.applyButton} onPress={onApply} activeOpacity={0.85}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    height: 56,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainer,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.xs,
  },
  headerTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  resetButtonText: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  headerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: 110,
    gap: spacing.lg,
  },
  barakahBanner: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.card,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.sm,
  },
  barakahIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barakahTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  barakahSubtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  filterSection: {
    gap: spacing.xs,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
  },
  sectionSubtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  selectorField: {
    height: 52,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.input,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.sm,
  },
  fieldLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  fieldValue: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    color: colors.onSurface,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: 4,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerLowest,
    ...shadows.sm,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurface,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  verifiedCard: {
    backgroundColor: 'rgba(106, 55, 148, 0.08)',
    borderRadius: radius.card,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(106, 55, 148, 0.2)',
  },
  verifiedLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  verifiedIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(106, 55, 148, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedCardTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  verifiedCardSubtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  preferredBadge: {
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    ...shadows.sm,
  },
  preferredText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    fontWeight: '700',
    color: colors.gold,
  },
  toggleCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.card,
    padding: spacing.md,
    gap: spacing.md,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  toggleSubtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  toggleDivider: {
    height: 1,
    backgroundColor: colors.surfaceContainerHigh,
  },
  dietGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: 4,
  },
  dietCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.card,
    padding: spacing.sm + 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    ...shadows.sm,
  },
  dietCardActive: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  dietCardText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSurface,
    flex: 1,
  },
  dietCardTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  floatingBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainer,
    ...shadows.lg,
  },
  matchCounterLeft: {
    flex: 1,
  },
  matchCountHeading: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
  },
  matchCountSubtitle: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    color: colors.outline,
  },
  applyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    borderRadius: radius.button,
  },
  applyButtonText: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
