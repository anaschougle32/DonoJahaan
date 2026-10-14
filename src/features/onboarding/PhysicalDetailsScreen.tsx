import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, radii, shadows, spacing, typography } from '../../theme/tokens';
import { TopBar } from '../../components/common/TopBar';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SelectorRow } from '../../components/common/SelectorRow';
import { SingleSelectModal, SelectOption } from '../../components/common/SingleSelectModal';
import { updateCurrentUserProfile } from '../../data/userProfile';
import { syncPhysicalDetailsToSupabase } from '../../services/profileService';

interface PhysicalDetailsScreenProps {
  onBack?: () => void;
  onNext?: () => void;
}

const HEIGHT_OPTIONS: SelectOption[] = [
  { id: '4-10', label: `4' 10" (147 cm)` },
  { id: '4-11', label: `4' 11" (150 cm)` },
  { id: '5-0', label: `5' 0" (152 cm)` },
  { id: '5-1', label: `5' 1" (155 cm)` },
  { id: '5-2', label: `5' 2" (157 cm)` },
  { id: '5-3', label: `5' 3" (160 cm)` },
  { id: '5-4', label: `5' 4" (163 cm)` },
  { id: '5-5', label: `5' 5" (165 cm)` },
  { id: '5-6', label: `5' 6" (168 cm)` },
  { id: '5-7', label: `5' 7" (170 cm)` },
  { id: '5-8', label: `5' 8" (173 cm)` },
  { id: '5-9', label: `5' 9" (175 cm)` },
  { id: '5-10', label: `5' 10" (178 cm)` },
  { id: '5-11', label: `5' 11" (180 cm)` },
  { id: '6-0', label: `6' 0" (183 cm)` },
  { id: '6-1', label: `6' 1" (185 cm)` },
  { id: '6-2', label: `6' 2" (188 cm)` },
  { id: '6-3', label: `6' 3" (191 cm)` },
  { id: '6-4', label: `6' 4" (193 cm)` },
];

const BODY_TYPE_OPTIONS: SelectOption[] = [
  { id: 'slim', label: 'Slim / Slender' },
  { id: 'athletic', label: 'Athletic / Toned' },
  { id: 'average', label: 'Average / Modest build' },
  { id: 'heavy', label: 'Heavy / Plus size' },
];

const PHYSICAL_STATUS_OPTIONS: SelectOption[] = [
  { id: 'normal', label: 'Normal / Healthy' },
  { id: 'differently-abled', label: 'Differently-Abled / Special Need' },
];

export const PhysicalDetailsScreen: React.FC<PhysicalDetailsScreenProps> = ({
  onBack,
  onNext,
}) => {
  const insets = useSafeAreaInsets();

  const [selectedHeight, setSelectedHeight] = useState('5-4');
  const [selectedBodyType, setSelectedBodyType] = useState('average');
  const [selectedPhysicalStatus, setSelectedPhysicalStatus] = useState('normal');

  const [heightModalVisible, setHeightModalVisible] = useState(false);
  const [bodyTypeModalVisible, setBodyTypeModalVisible] = useState(false);
  const [physicalStatusModalVisible, setPhysicalStatusModalVisible] = useState(false);

  const heightLabel =
    HEIGHT_OPTIONS.find((h) => h.id === selectedHeight)?.label || `5' 4" (163 cm)`;
  const bodyTypeLabel =
    BODY_TYPE_OPTIONS.find((b) => b.id === selectedBodyType)?.label || 'Average';
  const physicalStatusLabel =
    PHYSICAL_STATUS_OPTIONS.find((p) => p.id === selectedPhysicalStatus)?.label || 'Normal';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopBar title="Physical & Basic Details" onBack={onBack} />

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        {/* Domain Badge */}
        <View style={styles.badgeRow}>
          <MaterialIcons name="accessibility" size={16} color={colors.primary} />
          <Text style={styles.badgeText}>Phase 2: Personal Profile</Text>
        </View>

        <Text style={styles.title}>Physical Attributes</Text>
        <Text style={styles.subtitle}>
          Accurate physical information helps suitors assess mutual matrimonial expectations with transparency.
        </Text>

        {/* Height Selector (Strictly Here - Section 11) */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>HEIGHT & STATURE</Text>
          <SelectorRow
            label="Height"
            value={heightLabel}
            placeholder="Select height"
            icon="resize-outline"
            required
            onPress={() => setHeightModalVisible(true)}
          />

          <View style={styles.heightHighlightBox}>
            <Ionicons name="information-circle-outline" size={18} color={colors.primary} />
            <Text style={styles.heightHighlightText}>
              Selected: <Text style={{ fontWeight: '700' }}>{heightLabel}</Text>
            </Text>
          </View>
        </View>

        {/* Body Type & Stature */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>BODY BUILD & HEALTH</Text>

          <SelectorRow
            label="Body Type"
            value={bodyTypeLabel}
            placeholder="Select body build"
            icon="body-outline"
            onPress={() => setBodyTypeModalVisible(true)}
          />

          <SelectorRow
            label="Physical Health Status"
            value={physicalStatusLabel}
            placeholder="Select physical status"
            icon="fitness-outline"
            onPress={() => setPhysicalStatusModalVisible(true)}
          />
        </View>
      </ScrollView>

      {/* Sticky Bottom CTA */}
      <View
        style={[
          styles.bottomDock,
          { paddingBottom: Math.max(insets.bottom, spacing.md) },
        ]}
      >
        <PrimaryButton
          title="Save & Continue to Education →"
          icon="arrow-forward"
          onPress={() => {
            const cmMatch = heightLabel.match(/\((\d+)\s*cm\)/);
            const heightCm = cmMatch ? parseInt(cmMatch[1], 10) : 163;

            updateCurrentUserProfile({
              height: heightLabel,
              hasPhysicalDetails: true,
            });

            // Asynchronously sync to Supabase profile_physical table
            syncPhysicalDetailsToSupabase({
              heightCm,
              bodyType: selectedBodyType,
              physicalStatus: selectedPhysicalStatus,
            }).catch((err) => console.warn('Supabase physical sync notice:', err));

            onNext?.();
          }}
        />
      </View>

      {/* Height Selection Modal */}
      <SingleSelectModal
        visible={heightModalVisible}
        title="Select Height"
        subtitle="Measured in feet/inches and centimeters"
        options={HEIGHT_OPTIONS}
        selectedId={selectedHeight}
        onSelect={(opt) => setSelectedHeight(opt.id)}
        onClose={() => setHeightModalVisible(false)}
      />

      {/* Body Type Modal */}
      <SingleSelectModal
        visible={bodyTypeModalVisible}
        title="Select Body Build"
        options={BODY_TYPE_OPTIONS}
        selectedId={selectedBodyType}
        onSelect={(opt) => setSelectedBodyType(opt.id)}
        onClose={() => setBodyTypeModalVisible(false)}
      />

      {/* Physical Status Modal */}
      <SingleSelectModal
        visible={physicalStatusModalVisible}
        title="Physical Health Status"
        options={PHYSICAL_STATUS_OPTIONS}
        selectedId={selectedPhysicalStatus}
        onSelect={(opt) => setSelectedPhysicalStatus(opt.id)}
        onClose={() => setPhysicalStatusModalVisible(false)}
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
  heightHighlightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primarySoft,
    padding: 10,
    borderRadius: radii.md,
    marginTop: 6,
  },
  heightHighlightText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 13,
    color: colors.primary,
  },
  bottomDock: {
    padding: spacing.margin,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.primarySoft,
  },
});
