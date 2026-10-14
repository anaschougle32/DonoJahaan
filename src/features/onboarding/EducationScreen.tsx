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
import {
  SearchSelectModal,
  SearchItem,
} from '../../components/common/SearchSelectModal';
import { EDUCATION_LOOKUP } from '../../data/lookupData';
import { updateCurrentUserProfile } from '../../data/userProfile';
import { syncEducationDetailsToSupabase } from '../../services/profileService';

interface EducationScreenProps {
  onBack?: () => void;
  onNext?: () => void;
}

export const EducationScreen: React.FC<EducationScreenProps> = ({
  onBack,
  onNext,
}) => {
  const insets = useSafeAreaInsets();

  const [selectedEduId, setSelectedEduId] = useState('edu-mbbs-md');
  const [degreeSpecialization, setDegreeSpecialization] = useState('MD / Internal Medicine');
  const [institutionName, setInstitutionName] = useState('All India Institute of Medical Sciences (AIIMS)');
  const [eduModalVisible, setEduModalVisible] = useState(false);

  // Transform EDUCATION_LOOKUP to SearchItem
  const educationItems: SearchItem[] = EDUCATION_LOOKUP.map((e) => ({
    id: e.id,
    name: e.name,
    subtitle: e.categoryName,
    categoryId: e.categoryId,
  }));

  const selectedEdu = EDUCATION_LOOKUP.find((e) => e.id === selectedEduId);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopBar title="Education & Academics" onBack={onBack} />

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.badgeRow}>
          <MaterialIcons name="school" size={16} color={colors.primary} />
          <Text style={styles.badgeText}>Phase 2: Academic Background</Text>
        </View>

        <Text style={styles.title}>Educational Qualifications</Text>
        <Text style={styles.subtitle}>
          Select your highest qualification from our accredited degrees database.
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionHeader}>ACADEMIC CREDENTIALS</Text>

          <SelectorRow
            label="Highest Education"
            value={selectedEdu?.name || 'Select highest qualification'}
            placeholder="Search qualification..."
            icon="school-outline"
            required
            onPress={() => setEduModalVisible(true)}
          />

          <InputField
            label="Degree / Specialization"
            value={degreeSpecialization}
            onChangeText={setDegreeSpecialization}
            placeholder="e.g. Computer Science, Cardiology, Corporate Law"
            helperText="Your major area of study"
          />

          <InputField
            label="College / University"
            value={institutionName}
            onChangeText={setInstitutionName}
            placeholder="e.g. Jamia Millia Islamia, IIT Delhi, AMU"
            helperText="Name of your graduating university or college"
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
          title="Save & Continue to Career →"
          icon="arrow-forward"
          onPress={() => {
            const selectedEduName =
              educationItems.find((e) => e.id === selectedEduId)?.name || 'Degree / Qualification';
            updateCurrentUserProfile({
              education: `${selectedEduName}${degreeSpecialization ? ' - ' + degreeSpecialization : ''}`,
              degree: selectedEduName,
              hasEducationDetails: true,
            });

            // Asynchronously sync to Supabase profile_education table
            syncEducationDetailsToSupabase({
              highestQualification: selectedEduName,
              institution: institutionName,
              fieldOfStudy: degreeSpecialization || selectedEduName,
            }).catch((err) => console.warn('Supabase education sync notice:', err));

            onNext?.();
          }}
        />
      </View>

      {/* Searchable Education Modal */}
      <SearchSelectModal
        visible={eduModalVisible}
        title="Search Highest Education"
        placeholder="Search degrees, e.g. MBBS, B.Tech, MBA..."
        items={educationItems}
        selectedId={selectedEduId}
        onSelect={(item) => setSelectedEduId(item.id)}
        onClose={() => setEduModalVisible(false)}
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
