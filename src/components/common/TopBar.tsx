import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, typography, radii } from '../../theme/tokens';

interface TopBarProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  stepText?: string;
  rightAction?: React.ReactNode;
  progressPercent?: number; // 0 to 100
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  onBack,
  showBack = true,
  stepText,
  rightAction,
  progressPercent,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerRow}>
        {showBack ? (
          <Pressable
            onPress={onBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
            hitSlop={8}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
          </Pressable>
        ) : (
          <View style={styles.placeholder} />
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.titleText} numberOfLines={1}>
            {title}
          </Text>
          {stepText && <Text style={styles.stepText}>{stepText}</Text>}
        </View>

        <View style={styles.rightContainer}>
          {rightAction ? rightAction : <View style={styles.placeholder} />}
        </View>
      </View>

      {typeof progressPercent === 'number' && (
        <View style={styles.progressRail}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.min(100, Math.max(0, progressPercent))}%` },
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingTop: 8,
    paddingBottom: 8,
  },
  innerRow: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.margin,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.xs,
  },
  backButtonPressed: {
    backgroundColor: colors.surfaceContainer,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  titleText: {
    ...typography.headlineSm,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  stepText: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  rightContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 40,
  },
  progressRail: {
    width: '100%',
    height: 3,
    backgroundColor: colors.surfaceContainerHigh,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
});
