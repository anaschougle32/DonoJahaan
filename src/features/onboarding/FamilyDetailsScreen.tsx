import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radii, shadows, spacing, typography } from '../../theme/tokens';
import { TopBar } from '../../components/common/TopBar';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SelectorRow } from '../../components/common/SelectorRow';
import { SingleSelectModal, SelectOption } from '../../components/common/SingleSelectModal';
import {
  SearchSelectModal,
  SearchItem,
} from '../../components/common/SearchSelectModal';
import {
  CITIES,
  INDIAN_STATES,
  PROFESSIONS_LOOKUP,
} from '../../data/lookupData';
import { updateCurrentUserProfile } from '../../data/userProfile';
import { syncFamilyDetailsToSupabase } from '../../services/profileService';

interface FamilyDetailsScreenProps {
  onBack?: () => void;
  onSaved?: () => void;
}

const LIVING_WITH_FAMILY_OPTIONS: SelectOption[] = [
  { id: 'yes', label: 'Yes, living with family', subtitle: 'Residing in family household' },
  { id: 'no', label: 'No, living independently', subtitle: 'Living separately due to work/study' },
  { id: 'relocating', label: 'Planning to relocate after marriage', subtitle: 'Open to setting up separate or joint home' },
];

const FINANCIAL_STATUS_OPTIONS: SelectOption[] = [
  { id: 'elite', label: 'Elite', subtitle: 'High net-worth & established heritage' },
  { id: 'high', label: 'High', subtitle: 'Affluent background & well established' },
  { id: 'middle', label: 'Middle', subtitle: 'Comfortable & respectable standing' },
  { id: 'aspiring', label: 'Aspiring', subtitle: 'Emerging & hard-working background' },
];

const FAMILY_STRUCTURE_OPTIONS: SelectOption[] = [
  { id: 'nuclear', label: 'Nuclear Family', subtitle: 'Parents and children' },
  { id: 'joint', label: 'Joint Family', subtitle: 'Extended family living together' },
];

const SIBLINGS_OPTIONS: SelectOption[] = [
  { id: 'none', label: 'None (Only Child)' },
  { id: '1', label: '1 Sibling' },
  { id: '2', label: '2 Siblings' },
  { id: '3', label: '3 Siblings' },
  { id: '4_plus', label: '4 or more Siblings' },
];

export const FamilyDetailsScreen: React.FC<FamilyDetailsScreenProps> = ({
  onBack,
  onSaved,
}) => {
  const insets = useSafeAreaInsets();

  // Selected State
  const [selectedLocationCityId, setSelectedLocationCityId] = useState('city-lucknow');
  const [selectedLivingId, setSelectedLivingId] = useState('yes');
  const [selectedFinancialId, setSelectedFinancialId] = useState('high');
  const [selectedStructureId, setSelectedStructureId] = useState('nuclear');
  const [selectedFatherProfId, setSelectedFatherProfId] = useState('prof-prof');
  const [selectedMotherProfId, setSelectedMotherProfId] = useState('prof-home');
  const [selectedSiblingsId, setSelectedSiblingsId] = useState('2');

  // Modals
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [livingModalVisible, setLivingModalVisible] = useState(false);
  const [financialModalVisible, setFinancialModalVisible] = useState(false);
  const [structureModalVisible, setStructureModalVisible] = useState(false);
  const [fatherProfModalVisible, setFatherProfModalVisible] = useState(false);
  const [motherProfModalVisible, setMotherProfModalVisible] = useState(false);
  const [siblingsModalVisible, setSiblingsModalVisible] = useState(false);

  // Structured City items
  const locationItems: SearchItem[] = CITIES.map((c) => {
    const st = INDIAN_STATES.find((s) => s.id === c.stateId);
    return {
      id: c.id,
      name: `${c.name}`,
      subtitle: `${st ? st.name : 'India'}`,
    };
  });

  // Structured Profession items
  const professionItems: SearchItem[] = PROFESSIONS_LOOKUP.map((p) => ({
    id: p.id,
    name: p.name,
    subtitle: p.categoryName,
    categoryId: p.categoryId,
  }));

  const selectedCity = CITIES.find((c) => c.id === selectedLocationCityId);
  const selectedState = selectedCity
    ? INDIAN_STATES.find((s) => s.id === selectedCity.stateId)
    : null;
  const locationDisplay = selectedCity
    ? `${selectedCity.name}, ${selectedState ? selectedState.name : ''}`
    : 'Select family location';

  const livingLabel =
    LIVING_WITH_FAMILY_OPTIONS.find((l) => l.id === selectedLivingId)?.label || 'Yes';
  const financialLabel =
    FINANCIAL_STATUS_OPTIONS.find((f) => f.id === selectedFinancialId)?.label || 'High';
  const structureLabel =
    FAMILY_STRUCTURE_OPTIONS.find((s) => s.id === selectedStructureId)?.label || 'Nuclear';
  const fatherProf =
    PROFESSIONS_LOOKUP.find((p) => p.id === selectedFatherProfId)?.name || 'Professor / Academic';
  const motherProf =
    PROFESSIONS_LOOKUP.find((p) => p.id === selectedMotherProfId)?.name || 'Homemaker';
  const siblingsLabel =
    SIBLINGS_OPTIONS.find((s) => s.id === selectedSiblingsId)?.label || '2 Siblings';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopBar title="Family Details" onBack={onBack} />

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.badgeRow}>
          <MaterialIcons name="family-restroom" size={16} color={colors.primary} />
          <Text style={styles.badgeText}>Phase 2: Family Background</Text>
        </View>

        <Text style={styles.title}>Family Values & Heritage</Text>
        <Text style={styles.subtitle}>
          Family transparency is central to blessed Islamic matrimony. Provide details to help suitors appreciate your family warmth.
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionHeader}>FAMILY RESIDENCE & STRUCTURE</Text>

          {/* Structured Location Selector (Section 17) */}
          <SelectorRow
            label="Family Location"
            value={locationDisplay}
            placeholder="Search family city / state..."
            icon="location-outline"
            required
            onPress={() => setLocationModalVisible(true)}
          />

          {/* Living with Family */}
          <SelectorRow
            label="Do you live with your family?"
            value={livingLabel}
            placeholder="Select living arrangement"
            icon="home-outline"
            onPress={() => setLivingModalVisible(true)}
          />

          {/* Family Structure */}
          <SelectorRow
            label="Family Structure"
            value={structureLabel}
            placeholder="Select family structure"
            icon="people-outline"
            onPress={() => setStructureModalVisible(true)}
          />

          {/* Family Financial Status (Section 20) */}
          <SelectorRow
            label="Family Financial Status"
            value={financialLabel}
            placeholder="Select financial status"
            icon="wallet-outline"
            onPress={() => setFinancialModalVisible(true)}
          />

          {/* Siblings */}
          <SelectorRow
            label="Siblings Count"
            value={siblingsLabel}
            placeholder="Select number of siblings"
            icon="person-add-outline"
            onPress={() => setSiblingsModalVisible(true)}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeader}>PARENTS' OCCUPATION</Text>

          {/* Father's Occupation */}
          <SelectorRow
            label="Father's Occupation"
            value={fatherProf}
            placeholder="Search father's profession..."
            icon="briefcase-outline"
            onPress={() => setFatherProfModalVisible(true)}
          />

          {/* Mother's Occupation */}
          <SelectorRow
            label="Mother's Occupation"
            value={motherProf}
            placeholder="Search mother's profession..."
            icon="heart-outline"
            onPress={() => setMotherProfModalVisible(true)}
          />
        </View>
      </ScrollView>

      {/* Bottom Dock */}
      <View
        style={[
          styles.bottomDock,
          { paddingBottom: Math.max(insets.bottom, spacing.md) },
        ]}
      >
        <PrimaryButton
          title="Save & Continue to Partner Preferences →"
          icon="arrow-forward"
          onPress={() => {
            const familyType = selectedStructureId === 'nuclear' ? 'Nuclear' : 'Joint Family';
            updateCurrentUserProfile({
              hasFamilyDetails: true,
              familyType,
              familyValues: 'Traditional & Deen-centered',
            });

            // Asynchronously sync to Supabase profile_family table
            syncFamilyDetailsToSupabase({
              familyType,
              familyValues: 'Traditional & Deen-centered',
              economicStatus: financialLabel || 'Middle Class',
              fatherOccupation: fatherProf,
              motherOccupation: motherProf,
              nativePlace: locationDisplay,
            }).catch((err) => console.warn('Supabase family sync notice:', err));

            onSaved?.();
          }}
        />
      </View>

      {/* Structured Location Search Modal */}
      <SearchSelectModal
        visible={locationModalVisible}
        title="Search Family Location"
        placeholder="Search city, district, e.g. Mumbai, Lucknow..."
        items={locationItems}
        selectedId={selectedLocationCityId}
        onSelect={(item) => setSelectedLocationCityId(item.id)}
        onClose={() => setLocationModalVisible(false)}
      />

      {/* Living Arrangement Modal */}
      <SingleSelectModal
        visible={livingModalVisible}
        title="Living Arrangement"
        options={LIVING_WITH_FAMILY_OPTIONS}
        selectedId={selectedLivingId}
        onSelect={(opt) => setSelectedLivingId(opt.id)}
        onClose={() => setLivingModalVisible(false)}
      />

      {/* Financial Status Modal */}
      <SingleSelectModal
        visible={financialModalVisible}
        title="Family Financial Status"
        options={FINANCIAL_STATUS_OPTIONS}
        selectedId={selectedFinancialId}
        onSelect={(opt) => setSelectedFinancialId(opt.id)}
        onClose={() => setFinancialModalVisible(false)}
      />

      {/* Family Structure Modal */}
      <SingleSelectModal
        visible={structureModalVisible}
        title="Family Structure"
        options={FAMILY_STRUCTURE_OPTIONS}
        selectedId={selectedStructureId}
        onSelect={(opt) => setSelectedStructureId(opt.id)}
        onClose={() => setStructureModalVisible(false)}
      />

      {/* Siblings Modal */}
      <SingleSelectModal
        visible={siblingsModalVisible}
        title="Siblings"
        options={SIBLINGS_OPTIONS}
        selectedId={selectedSiblingsId}
        onSelect={(opt) => setSelectedSiblingsId(opt.id)}
        onClose={() => setSiblingsModalVisible(false)}
      />

      {/* Father's Occupation Modal */}
      <SearchSelectModal
        visible={fatherProfModalVisible}
        title="Father's Occupation"
        placeholder="Search occupation..."
        items={professionItems}
        selectedId={selectedFatherProfId}
        onSelect={(item) => setSelectedFatherProfId(item.id)}
        onClose={() => setFatherProfModalVisible(false)}
      />

      {/* Mother's Occupation Modal */}
      <SearchSelectModal
        visible={motherProfModalVisible}
        title="Mother's Occupation"
        placeholder="Search occupation..."
        items={professionItems}
        selectedId={selectedMotherProfId}
        onSelect={(item) => setSelectedMotherProfId(item.id)}
        onClose={() => setMotherProfModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollBody: {
    padding: spacing.margin,
    paddingBottom: 40,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radii.pill,
    marginBottom: spacing.md,
  },
  badgeText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  title: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 24,
    fontWeight: '700',
    color: colors.deepPlum,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    padding: 16,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  sectionHeader: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  bottomDock: {
    padding: spacing.margin,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.primarySoft,
  },
});
