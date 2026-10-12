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
import { InputField } from '../../components/common/InputField';
import { SelectorRow } from '../../components/common/SelectorRow';
import { SingleSelectModal, SelectOption } from '../../components/common/SingleSelectModal';
import {
  SearchSelectModal,
  SearchItem,
  SearchCategory,
} from '../../components/common/SearchSelectModal';
import {
  PROFESSION_CATEGORIES,
  PROFESSIONS_LOOKUP,
  INCOME_RANGES,
} from '../../data/lookupData';
import { updateCurrentUserProfile } from '../../data/userProfile';

interface ProfessionScreenProps {
  onBack?: () => void;
  onNext?: () => void;
}

const EMPLOYMENT_SECTORS: SelectOption[] = [
  { id: 'private', label: 'Private Sector / MNC' },
  { id: 'gov', label: 'Government / Public Sector (PSU)' },
  { id: 'defense', label: 'Civil Services / Defense' },
  { id: 'business', label: 'Business / Self-Employed' },
  { id: 'non-working', label: 'Not Working / Student' },
];

const INCOME_OPTIONS: SelectOption[] = INCOME_RANGES.map((inc) => ({
  id: inc.id,
  label: inc.label,
}));

export const ProfessionScreen: React.FC<ProfessionScreenProps> = ({
  onBack,
  onNext,
}) => {
  const insets = useSafeAreaInsets();

  const [selectedProfId, setSelectedProfId] = useState('prof-doctor');
  const [selectedSector, setSelectedSector] = useState('private');
  const [employerName, setEmployerName] = useState('Apollo Hospitals');
  const [selectedIncomeId, setSelectedIncomeId] = useState('inc-10-15');
  const [workCity, setWorkCity] = useState('Noida, Uttar Pradesh');

  const [profModalVisible, setProfModalVisible] = useState(false);
  const [sectorModalVisible, setSectorModalVisible] = useState(false);
  const [incomeModalVisible, setIncomeModalVisible] = useState(false);

  // Categories & Items for Single-Input Search Modal (Section 14)
  const categories: SearchCategory[] = PROFESSION_CATEGORIES.map((c) => ({
    id: c.id,
    name: c.name,
  }));

  const professionItems: SearchItem[] = PROFESSIONS_LOOKUP.map((p) => ({
    id: p.id,
    name: p.name,
    subtitle: p.categoryName,
    categoryId: p.categoryId,
  }));

  const selectedProf = PROFESSIONS_LOOKUP.find((p) => p.id === selectedProfId);
  const sectorLabel =
    EMPLOYMENT_SECTORS.find((s) => s.id === selectedSector)?.label || 'Private Sector';
  const incomeLabel =
    INCOME_OPTIONS.find((i) => i.id === selectedIncomeId)?.label || '₹10 - ₹15 Lakhs';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopBar title="Career & Profession" onBack={onBack} />

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.badgeRow}>
          <MaterialIcons name="work" size={16} color={colors.primary} />
          <Text style={styles.badgeText}>Phase 2: Professional Profile</Text>
        </View>

        <Text style={styles.title}>Occupation & Employment</Text>
        <Text style={styles.subtitle}>
          Detailed career credentials help prospective suitors understand your financial stability and life routine.
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionHeader}>PROFESSIONAL CREDENTIALS</Text>

          <SelectorRow
            label="Profession"
            value={selectedProf?.name || 'Select profession'}
            placeholder="Search profession..."
            icon="briefcase-outline"
            required
            onPress={() => setProfModalVisible(true)}
          />

          <SelectorRow
            label="Employment Sector"
            value={sectorLabel}
            placeholder="Select sector"
            icon="business-outline"
            onPress={() => setSectorModalVisible(true)}
          />

          <InputField
            label="Organization / Employer"
            value={employerName}
            onChangeText={setEmployerName}
            placeholder="e.g. Google, Apollo Hospitals, TCS, Self-Owned Firm"
            helperText="Where you currently work"
          />

          <SelectorRow
            label="Annual Income"
            value={incomeLabel}
            placeholder="Select annual income range"
            icon="cash-outline"
            onPress={() => setIncomeModalVisible(true)}
          />

          <InputField
            label="Work Location"
            value={workCity}
            onChangeText={setWorkCity}
            placeholder="e.g. Mumbai, Bengaluru, Dubai, London"
            helperText="City where your workplace or firm is located"
          />
        </View>
      </ScrollView>

      {/* Sticky Bottom Dock */}
      <View
        style={[
          styles.bottomDock,
          { paddingBottom: Math.max(insets.bottom, spacing.md) },
        ]}
      >
        <PrimaryButton
          title="Save & Continue to Family Details →"
          icon="arrow-forward"
          onPress={() => {
            const selectedProfName =
              professionItems.find((p) => p.id === selectedProfId)?.name || 'Professional';
            updateCurrentUserProfile({
              profession: selectedProfName,
              employer: employerName,
              hasProfessionDetails: true,
            });
            onNext?.();
          }}
        />
      </View>

      {/* Clean Single-Input Profession Search Modal (No Nested Input!) */}
      <SearchSelectModal
        visible={profModalVisible}
        title="Search Profession"
        placeholder="Search profession, job title..."
        categories={categories}
        items={professionItems}
        selectedId={selectedProfId}
        onSelect={(item) => setSelectedProfId(item.id)}
        onClose={() => setProfModalVisible(false)}
      />

      {/* Sector Modal */}
      <SingleSelectModal
        visible={sectorModalVisible}
        title="Employment Sector"
        options={EMPLOYMENT_SECTORS}
        selectedId={selectedSector}
        onSelect={(opt) => setSelectedSector(opt.id)}
        onClose={() => setSectorModalVisible(false)}
      />

      {/* Income Modal */}
      <SingleSelectModal
        visible={incomeModalVisible}
        title="Annual Income Range"
        options={INCOME_OPTIONS}
        selectedId={selectedIncomeId}
        onSelect={(opt) => setSelectedIncomeId(opt.id)}
        onClose={() => setIncomeModalVisible(false)}
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
