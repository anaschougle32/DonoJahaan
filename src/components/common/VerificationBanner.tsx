import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, radii, shadows, spacing, typography } from '../../theme/tokens';

interface VerificationBannerProps {
  isVerified: boolean;
  onVerifyPress?: () => void;
  compact?: boolean;
}

export const VerificationBanner: React.FC<VerificationBannerProps> = ({
  isVerified,
  onVerifyPress,
  compact = false,
}) => {
  if (isVerified) {
    return (
      <View style={[styles.verifiedCard, compact && styles.compactContainer]}>
        <View style={styles.verifiedLeft}>
          <MaterialIcons name="verified" size={18} color="#D4AF37" />
          <Text style={styles.verifiedTitle}>Verified Identity</Text>
        </View>
        <View style={styles.verifiedBadge}>
          <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
          <Text style={styles.verifiedBadgeText}>Verified</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.unverifiedCard, compact && styles.compactContainer]}>
      <View style={styles.unverifiedIconBox}>
        <Ionicons name="lock-closed" size={20} color={colors.primary} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.unverifiedTitle}>Verification Required</Text>
        <Text style={styles.unverifiedDesc}>
          Verify your profile with a private selfie to unlock full messaging and verified suitor discovery.
        </Text>
      </View>

      {onVerifyPress && (
        <TouchableOpacity
          style={styles.verifyBtn}
          onPress={onVerifyPress}
          activeOpacity={0.85}
        >
          <Text style={styles.verifyBtnText}>Verify</Text>
          <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  verifiedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FCF8ED', // Gold tint
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: radii.card,
    marginBottom: spacing.md,
  },
  verifiedLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verifiedTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 13,
    fontWeight: '700',
    color: '#8A711E',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
    gap: 4,
  },
  verifiedBadgeText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
  },
  unverifiedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    borderRadius: radii.card,
    gap: 12,
    marginBottom: spacing.md,
    ...shadows.card,
  },
  compactContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  unverifiedIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  unverifiedTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 13,
    fontWeight: '700',
    color: colors.deepPlum,
  },
  unverifiedDesc: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 15,
    marginTop: 2,
  },
  verifyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radii.button,
    gap: 4,
  },
  verifyBtnText: {
    fontFamily: typography.fontFamilies.button,
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
