import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { colors, radii, spacing, typography, shadows } from '../../theme/tokens';

interface ModestyPhotoCurtainProps {
  imageUri: string;
  isBlurred: boolean;
  onRequestAccess?: () => void;
  height?: number;
  width?: number | '100%';
  borderRadius?: number;
  hasVoiceBadge?: boolean;
  voiceDuration?: number;
  onVoicePress?: () => void;
}

export const ModestyPhotoCurtain: React.FC<ModestyPhotoCurtainProps> = ({
  imageUri,
  isBlurred,
  onRequestAccess,
  height = 260,
  width = '100%',
  borderRadius = radii.card,
  hasVoiceBadge = false,
  voiceDuration,
  onVoicePress,
}) => {
  return (
    <View style={[styles.container, { height, width: width as any, borderRadius }]}>
      <Image
        source={{ uri: imageUri }}
        style={[
          styles.image,
          isBlurred && styles.blurredImageScaling,
        ]}
        blurRadius={isBlurred ? 28 : 0}
        resizeMode="cover"
      />

      {isBlurred ? (
        <View style={styles.blurOverlay}>
          <BlurView
            intensity={35}
            tint="dark"
            blurMethod="none"
            style={[
              StyleSheet.absoluteFill,
              Platform.OS === 'android' && { backgroundColor: 'rgba(90, 47, 120, 0.48)' },
            ]}
          >
            <View style={styles.centerBadgeContainer}>
              <View style={styles.shieldBadge}>
                <MaterialIcons name="shield" size={16} color={colors.primary} />
                <Text style={styles.shieldText}>Photo Modesty Curtain</Text>
              </View>

              {onRequestAccess && (
                <Pressable
                  style={({ pressed }) => [
                    styles.requestButton,
                    pressed && styles.requestButtonPressed,
                  ]}
                  onPress={onRequestAccess}
                  accessibilityRole="button"
                >
                  <MaterialIcons name="vpn-key" size={16} color={colors.onPrimary} />
                  <Text style={styles.requestButtonText}>Request Photo Access</Text>
                </Pressable>
              )}
            </View>
          </BlurView>
        </View>
      ) : null}

      {hasVoiceBadge && (
        <Pressable
          style={({ pressed }) => [
            styles.voiceBadge,
            pressed && styles.voiceBadgePressed,
          ]}
          onPress={onVoicePress}
        >
          <MaterialIcons name="mic" size={16} color={colors.primary} />
          <Text style={styles.voiceBadgeText}>
            Voice Intro {voiceDuration ? `(0:${voiceDuration < 10 ? '0' + voiceDuration : voiceDuration})` : ''}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainerHigh,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  blurredImageScaling: {
    transform: [{ scale: 1.15 }],
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(36, 27, 51, 0.35)',
  },
  centerBadgeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.md,
  },
  shieldBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radii.pill,
    ...shadows.sm,
  },
  shieldText: {
    ...typography.labelSm,
    color: colors.primary,
    fontWeight: '700',
  },
  requestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: radii.button,
    ...shadows.sm,
  },
  requestButtonPressed: {
    backgroundColor: colors.primaryDark,
  },
  requestButtonText: {
    ...typography.labelSm,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  voiceBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    ...shadows.sm,
  },
  voiceBadgePressed: {
    opacity: 0.85,
  },
  voiceBadgeText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
});
