import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, radius, shadows } from '../../theme/tokens';

interface AccountSettingsScreenProps {
  onBack?: () => void;
  onLogout?: () => void;
}

export const AccountSettingsScreen: React.FC<AccountSettingsScreenProps> = ({
  onBack,
  onLogout,
}) => {
  const [isPaused, setIsPaused] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataExportSent, setDataExportSent] = useState(false);

  const handleRequestData = () => {
    setDataExportSent(true);
    setTimeout(() => {
      Alert.alert(
        'Data Request Submitted',
        'An archive containing your personal data will be delivered to your registered email address within 24 hours in compliance with data privacy standards.'
      );
    }, 400);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    Alert.alert(
      'Account Deletion Initiated',
      'Your account and all associated matrimonial records, profile matches, and chat history have been scheduled for permanent erasure.',
      [{ text: 'OK', onPress: () => onLogout?.() }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={styles.headerAvatar}>
          <Ionicons name="person" size={16} color="#FFFFFF" />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section 1: Pause Profile */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Pause Profile</Text>
            <Switch
              value={isPaused}
              onValueChange={setIsPaused}
              trackColor={{ false: colors.surfaceContainerHighest, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
          <Text style={styles.cardBodyText}>
            Hide your profile from new matches. You will only be able to talk to your
            active conversation or current interests. Perfect for when you want to focus.
          </Text>

          {isPaused ? (
            <View style={styles.statusBannerActive}>
              <Ionicons name="eye-off" size={18} color={colors.primary} />
              <Text style={styles.statusBannerTextActive}>
                Your profile is currently hidden from Matches feed.
              </Text>
            </View>
          ) : (
            <View style={styles.statusBannerInactive}>
              <Ionicons name="eye" size={18} color={colors.outline} />
              <Text style={styles.statusBannerTextInactive}>
                Your profile is visible to eligible matches.
              </Text>
            </View>
          )}
        </View>

        {/* Section: Log Out */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Session Security</Text>
          <Text style={styles.cardBodyText}>
            Sign out of your active session on this device. You can sign back in with your verified mobile number anytime.
          </Text>

          <TouchableOpacity
            style={[styles.deleteButton, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.border }]}
            onPress={() => {
              Alert.alert('Log Out', 'Are you sure you want to log out of Dono Jaha?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Log Out', style: 'destructive', onPress: () => onLogout?.() },
              ]);
            }}
            activeOpacity={0.85}
          >
            <Ionicons name="log-out-outline" size={18} color={colors.primary} />
            <Text style={[styles.deleteButtonText, { color: colors.primary }]}>Log Out of Dono Jaha</Text>
          </TouchableOpacity>
        </View>

        {/* Section 2: Delete Account */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delete Account</Text>
          <Text style={styles.cardBodyText}>
            Permanently delete your profile, photos, voice introduction, and chat
            history. This action cannot be undone.
          </Text>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setShowDeleteModal(true)}
            activeOpacity={0.85}
          >
            <Ionicons name="trash-outline" size={18} color={colors.error} />
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        {/* Section 3: Data Export Compliance */}
        <View style={styles.exportSection}>
          <TouchableOpacity
            style={styles.exportButton}
            onPress={handleRequestData}
            activeOpacity={0.7}
          >
            <Ionicons name="download-outline" size={18} color={colors.primary} />
            <Text style={styles.exportButtonText}>Request my personal data</Text>
          </TouchableOpacity>
          {dataExportSent && (
            <Text style={styles.exportSentNotice}>
              ✓ Request submitted. Archive link will be sent to your email.
            </Text>
          )}
          <Text style={styles.complianceDisclaimer}>
            Dono Jaha strictly complies with privacy, Islamic ethics, and personal data protection principles.
          </Text>
        </View>
      </ScrollView>

      {/* Delete Confirmation Modal Bottom Sheet */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalWarningIcon}>
              <Ionicons name="warning" size={26} color={colors.error} />
            </View>

            <Text style={styles.modalTitle}>Are you completely sure?</Text>
            <Text style={styles.modalDescription}>
              Your profile connections, family preferences, and conversation history
              will be permanently wiped from the Dono Jaha database.
            </Text>

            <TouchableOpacity
              style={styles.confirmDeleteButton}
              onPress={handleConfirmDelete}
              activeOpacity={0.85}
            >
              <Text style={styles.confirmDeleteButtonText}>Yes, Delete Everything</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelDeleteButton}
              onPress={() => setShowDeleteModal(false)}
              activeOpacity={0.85}
            >
              <Text style={styles.cancelDeleteButtonText}>Keep My Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.xs,
  },
  headerTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 17,
    fontWeight: '700',
    color: colors.onSurface,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.card,
    padding: spacing.md,
    ...shadows.sm,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  cardBodyText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginTop: spacing.xs,
  },
  statusBannerActive: {
    marginTop: spacing.md,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.md,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusBannerTextActive: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    flex: 1,
  },
  statusBannerInactive: {
    marginTop: spacing.md,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.md,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    opacity: 0.6,
  },
  statusBannerTextInactive: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.outline,
    flex: 1,
  },
  deleteButton: {
    marginTop: spacing.lg,
    height: 52,
    borderRadius: radius.button,
    backgroundColor: 'rgba(186, 26, 26, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  deleteButtonText: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 15,
    fontWeight: '700',
    color: colors.error,
  },
  exportSection: {
    marginTop: spacing.sm,
    alignItems: 'center',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
  },
  exportButtonText: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  exportSentNotice: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
  },
  complianceDisclaimer: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    color: colors.outline,
    textAlign: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.md,
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(20, 29, 26, 0.55)',
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  modalSheet: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.card,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadows.lg,
  },
  modalWarningIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(186, 26, 26, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    textAlign: 'center',
  },
  modalDescription: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
  },
  confirmDeleteButton: {
    height: 52,
    borderRadius: radius.button,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  confirmDeleteButtonText: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cancelDeleteButton: {
    height: 52,
    borderRadius: radius.button,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelDeleteButtonText: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
  },
});
