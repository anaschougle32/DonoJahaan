import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, typography, radii, shadows } from '../../theme/tokens';
import { TopBar } from '../../components/common/TopBar';
import { PrimaryButton } from '../../components/common/PrimaryButton';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface WaliDashboardScreenProps {
  onBack: () => void;
}

export const WaliDashboardScreen: React.FC<WaliDashboardScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopBar title="Family & Wali Hub" onBack={onBack} />

      <ScrollView contentContainerStyle={styles.scrollBody}>
        {/*  Linked Elder Chaperone Header  */}
        <View style={styles.wardCard}>
          <View style={styles.shieldIconCircle}>
            <MaterialIcons name="security" size={28} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.wardTitle}>Linked Wali Representation</Text>
            <Text style={styles.wardSubtitle}>Tariq Khan (Father / Wali)</Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>Status: Confirmed & Active</Text>
            </View>
          </View>
        </View>

        {/*  Permissions Breakdown  */}
        <Text style={styles.sectionHeader}>CHAPERONE ACCESS & GOVERNANCE</Text>

        <View style={styles.settingsGroup}>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Chat Transcript Review</Text>
              <Text style={styles.settingSub}>Wali can review message logs for modesty and safety</Text>
            </View>
            <MaterialIcons name="check-circle" size={22} color={colors.primary} />
          </View>

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Approve Suitor Reveal Requests</Text>
              <Text style={styles.settingSub}>Photo requests notify the Wali for verification</Text>
            </View>
            <MaterialIcons name="check-circle" size={22} color={colors.primary} />
          </View>

          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Direct Father-to-Father Coordination</Text>
              <Text style={styles.settingSub}>Allows sharing guardian contact after accepted interest</Text>
            </View>
            <MaterialIcons name="check-circle" size={22} color={colors.primary} />
          </View>
        </View>

        {/*  Invite Additional Chaperone Button  */}
        <PrimaryButton
          title="Invite Elder / Mother as Co-Wali"
          variant="outline"
          icon="add"
          onPress={() => Alert.alert('Invite Wali', 'Invitation link generated for WhatsApp or SMS.')}
        />
      </ScrollView>
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
  wardCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  shieldIconCircle: {
    width: 52,
    height: 52,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wardTitle: {
    ...typography.labelLg,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  wardSubtitle: {
    ...typography.bodySm,
    color: colors.textMuted,
    marginTop: 2,
  },
  statusPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.pill,
    marginTop: 6,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  settingsGroup: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
    overflow: 'hidden',
    ...shadows.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  settingLabel: {
    ...typography.labelMd,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  settingSub: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
});
