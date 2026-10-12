import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, radii, shadows, spacing, typography } from '../../theme/tokens';
import { TopBar } from '../../components/common/TopBar';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SelectorRow } from '../../components/common/SelectorRow';
import { SingleSelectModal, SelectOption } from '../../components/common/SingleSelectModal';
import { MultiSelectModal } from '../../components/common/MultiSelectModal';
import { SearchSelectModal, SearchItem } from '../../components/common/SearchSelectModal';
import { INDIAN_STATES } from '../../data/lookupData';

interface PartnerPreferencesScreenProps {
  onBack?: () => void;
  onApply?: () => void;
}

const MARITAL_OPTIONS: SelectOption[] = [
  { id: 'never_married', label: 'Never Married', subtitle: 'First-time marriage' },
  { id: 'divorced', label: 'Divorced', subtitle: 'Previously married' },
  { id: 'widowed', label: 'Widowed', subtitle: 'Spouse deceased' },
  { id: 'awaiting_divorce', label: 'Awaiting Divorce', subtitle: 'Legal proceedings active' },
];

const INCOME_PREF_OPTIONS: SelectOption[] = [
  { id: 'open', label: 'Open to All Incomes', subtitle: 'Income is not a constraint' },
  { id: '5_plus', label: '₹5 Lakhs and above', subtitle: 'Starting professional tier' },
  { id: '10_plus', label: '₹10 Lakhs and above', subtitle: 'Established professional tier' },
  { id: '15_plus', label: '₹15 Lakhs and above', subtitle: 'Senior / Tech / Doctor tier' },
  { id: '25_plus', label: '₹25 Lakhs and above', subtitle: 'Executive / High earner tier' },
  { id: '50_plus', label: '₹50 Lakhs and above', subtitle: 'Elite / Business tier' },
];

const EDU_PREF_OPTIONS: SelectOption[] = [
  { id: 'open', label: 'Open to All Qualifications' },
  { id: 'bachelors', label: `Bachelor's Degree or Higher (Graduate)` },
  { id: 'masters', label: `Master's Degree or Higher (Post-Graduate)` },
  { id: 'doctor', label: 'Doctor / Medical Specialist (MBBS / MD / MDS)' },
  { id: 'tech', label: 'Engineering / Computer Science (B.Tech / M.Tech)' },
  { id: 'ca', label: 'Chartered Accountant / Finance (CA / CFA / MBA)' },
  { id: 'alim', label: 'Islamic Scholar / Alimiyyah with Graduation' },
];

const PROF_PREF_OPTIONS: SelectOption[] = [
  { id: 'open', label: 'Open to All Professions' },
  { id: 'doctor', label: 'Doctor / Healthcare Specialist' },
  { id: 'engineer', label: 'Software Engineer / Tech Professional' },
  { id: 'finance', label: 'Chartered Accountant / Banker / Corporate' },
  { id: 'civil', label: 'Civil Services / Government / Defense' },
  { id: 'business', label: 'Business Owner / Entrepreneur' },
  { id: 'academic', label: 'Professor / Teacher / Researcher' },
];

const SECT_PREF_OPTIONS: SelectOption[] = [
  { id: 'open', label: 'Open to Any Muslim Tradition' },
  { id: 'sunni', label: 'Sunni Muslim' },
  { id: 'shia', label: 'Shia Muslim' },
];

export const PartnerPreferencesScreen: React.FC<PartnerPreferencesScreenProps> = ({
  onBack,
  onApply,
}) => {
  const insets = useSafeAreaInsets();

  // Preferences State
  const [minAge, setMinAge] = useState(24);
  const [maxAge, setMaxAge] = useState(32);
  const [selectedMaritalIds, setSelectedMaritalIds] = useState<string[]>(['never_married']);
  const [selectedIncomeId, setSelectedIncomeId] = useState('15_plus');
  const [selectedEduId, setSelectedEduId] = useState('open');
  const [selectedProfId, setSelectedProfId] = useState('open');
  const [selectedStateId, setSelectedStateId] = useState('state-up');
  const [selectedSectId, setSelectedSectId] = useState('sunni');

  // Modals
  const [ageModalVisible, setAgeModalVisible] = useState(false);
  const [maritalModalVisible, setMaritalModalVisible] = useState(false);
  const [incomeModalVisible, setIncomeModalVisible] = useState(false);
  const [eduModalVisible, setEduModalVisible] = useState(false);
  const [profModalVisible, setProfModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [sectModalVisible, setSectModalVisible] = useState(false);

  // Labels
  const ageLabel = `${minAge} – ${maxAge} years`;
  const maritalLabel = selectedMaritalIds
    .map((id) => MARITAL_OPTIONS.find((m) => m.id === id)?.label)
    .filter(Boolean)
    .join(', ') || 'Never Married';
  const incomeLabel =
    INCOME_PREF_OPTIONS.find((i) => i.id === selectedIncomeId)?.label || '₹15 Lakhs and above';
  const eduLabel =
    EDU_PREF_OPTIONS.find((e) => e.id === selectedEduId)?.label || 'Open to all';
  const profLabel =
    PROF_PREF_OPTIONS.find((p) => p.id === selectedProfId)?.label || 'Open to all';
  const stateLabel =
    INDIAN_STATES.find((s) => s.id === selectedStateId)?.name || 'Uttar Pradesh & Delhi NCR';
  const sectLabel =
    SECT_PREF_OPTIONS.find((s) => s.id === selectedSectId)?.label || 'Sunni Muslim';

  const locationItems: SearchItem[] = INDIAN_STATES.map((s) => ({
    id: s.id,
    name: s.name,
    subtitle: 'State / Union Territory',
  }));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopBar title="Partner Preferences" onBack={onBack} />

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.badgeRow}>
          <MaterialIcons name="tune" size={16} color={colors.primary} />
          <Text style={styles.badgeText}>Phase 2: Partner Compatibility</Text>
        </View>

        <Text style={styles.title}>Match Criteria</Text>
        <Text style={styles.subtitle}>
          Tap each criterion to define your expectations. We use these to prioritize sincere, compatible proposals.
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionHeader}>BASIC & AGE EXPECTATIONS</Text>

          {/* Age Range Row */}
          <SelectorRow
            label="Age Range"
            value={ageLabel}
            placeholder="Select preferred age range"
            icon="calendar-outline"
            required
            onPress={() => setAgeModalVisible(true)}
          />

          {/* Marital Status Multi-Select Row */}
          <SelectorRow
            label="Marital Status"
            value={maritalLabel}
            placeholder="Select marital status"
            icon="heart-outline"
            required
            onPress={() => setMaritalModalVisible(true)}
          />

          {/* Religious Tradition */}
          <SelectorRow
            label="Religious Tradition"
            value={sectLabel}
            placeholder="Select tradition"
            icon="shield-outline"
            onPress={() => setSectModalVisible(true)}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeader}>EDUCATION & PROFESSIONAL CRITERIA</Text>

          {/* Education Row */}
          <SelectorRow
            label="Qualification Preference"
            value={eduLabel}
            placeholder="Select education level"
            icon="school-outline"
            onPress={() => setEduModalVisible(true)}
          />

          {/* Profession Row */}
          <SelectorRow
            label="Profession Preference"
            value={profLabel}
            placeholder="Select preferred professions"
            icon="briefcase-outline"
            onPress={() => setProfModalVisible(true)}
          />

          {/* Annual Income Row */}
          <SelectorRow
            label="Annual Income"
            value={incomeLabel}
            placeholder="Select income bracket"
            icon="cash-outline"
            onPress={() => setIncomeModalVisible(true)}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeader}>LOCATION & RESIDENCE</Text>

          {/* Preferred Location Row */}
          <SelectorRow
            label="Preferred Location"
            value={stateLabel}
            placeholder="Select preferred states or cities"
            icon="location-outline"
            onPress={() => setLocationModalVisible(true)}
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
          title="Save & Continue to Profile Photos →"
          icon="arrow-forward"
          onPress={onApply || (() => {})}
        />
      </View>

      {/* 1. Age Range Stepper Modal */}
      <Modal
        visible={ageModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAgeModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.ageModalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Set Age Range</Text>
              <TouchableOpacity onPress={() => setAgeModalVisible(false)}>
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <Text style={styles.ageValueDisplay}>{minAge} to {maxAge} years</Text>

            <View style={styles.stepperContainer}>
              <View style={styles.stepperCol}>
                <Text style={styles.stepperLabel}>Minimum Age</Text>
                <View style={styles.stepperControls}>
                  <TouchableOpacity
                    style={styles.stepperBtn}
                    onPress={() => setMinAge(Math.max(18, minAge - 1))}
                  >
                    <Ionicons name="remove" size={18} color={colors.primary} />
                  </TouchableOpacity>
                  <Text style={styles.stepperNumber}>{minAge}</Text>
                  <TouchableOpacity
                    style={styles.stepperBtn}
                    onPress={() => setMinAge(Math.min(maxAge - 1, minAge + 1))}
                  >
                    <Ionicons name="add" size={18} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.stepperCol}>
                <Text style={styles.stepperLabel}>Maximum Age</Text>
                <View style={styles.stepperControls}>
                  <TouchableOpacity
                    style={styles.stepperBtn}
                    onPress={() => setMaxAge(Math.max(minAge + 1, maxAge - 1))}
                  >
                    <Ionicons name="remove" size={18} color={colors.primary} />
                  </TouchableOpacity>
                  <Text style={styles.stepperNumber}>{maxAge}</Text>
                  <TouchableOpacity
                    style={styles.stepperBtn}
                    onPress={() => setMaxAge(Math.min(65, maxAge + 1))}
                  >
                    <Ionicons name="add" size={18} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <PrimaryButton
              title="Apply Age Range"
              icon="check"
              onPress={() => setAgeModalVisible(false)}
              style={{ marginTop: spacing.md }}
            />
          </View>
        </View>
      </Modal>

      {/* 2. Marital Status Multi-Select Modal */}
      <MultiSelectModal
        visible={maritalModalVisible}
        title="Preferred Marital Status"
        subtitle="Select all acceptable marital statuses"
        options={MARITAL_OPTIONS}
        selectedIds={selectedMaritalIds}
        onApply={(ids) => setSelectedMaritalIds(ids.length > 0 ? ids : ['never_married'])}
        onClose={() => setMaritalModalVisible(false)}
      />

      {/* 3. Income Modal */}
      <SingleSelectModal
        visible={incomeModalVisible}
        title="Minimum Annual Income"
        options={INCOME_PREF_OPTIONS}
        selectedId={selectedIncomeId}
        onSelect={(opt) => setSelectedIncomeId(opt.id)}
        onClose={() => setIncomeModalVisible(false)}
      />

      {/* 4. Education Modal */}
      <SingleSelectModal
        visible={eduModalVisible}
        title="Education Level"
        options={EDU_PREF_OPTIONS}
        selectedId={selectedEduId}
        onSelect={(opt) => setSelectedEduId(opt.id)}
        onClose={() => setEduModalVisible(false)}
      />

      {/* 5. Profession Modal */}
      <SingleSelectModal
        visible={profModalVisible}
        title="Profession Expectation"
        options={PROF_PREF_OPTIONS}
        selectedId={selectedProfId}
        onSelect={(opt) => setSelectedProfId(opt.id)}
        onClose={() => setProfModalVisible(false)}
      />

      {/* 6. Location Modal */}
      <SearchSelectModal
        visible={locationModalVisible}
        title="Preferred Location"
        placeholder="Search state / region..."
        items={locationItems}
        selectedId={selectedStateId}
        onSelect={(item) => setSelectedStateId(item.id)}
        onClose={() => setLocationModalVisible(false)}
      />

      {/* 7. Religious Tradition Modal */}
      <SingleSelectModal
        visible={sectModalVisible}
        title="Religious Tradition"
        options={SECT_PREF_OPTIONS}
        selectedId={selectedSectId}
        onSelect={(opt) => setSelectedSectId(opt.id)}
        onClose={() => setSectModalVisible(false)}
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(36, 27, 51, 0.55)',
    justifyContent: 'flex-end',
  },
  ageModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: radii.modal,
    borderTopRightRadius: radii.modal,
    padding: spacing.margin,
    paddingBottom: 34,
    ...shadows.sheet,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 17,
    fontWeight: '700',
    color: colors.deepPlum,
  },
  ageValueDisplay: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    marginVertical: 12,
  },
  stepperContainer: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 12,
  },
  stepperCol: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    padding: 14,
    borderRadius: radii.md,
  },
  stepperLabel: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 8,
  },
  stepperControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  stepperBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperNumber: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 18,
    fontWeight: '700',
    color: colors.deepPlum,
    minWidth: 26,
    textAlign: 'center',
  },
});
