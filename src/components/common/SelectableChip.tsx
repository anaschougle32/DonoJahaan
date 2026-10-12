import React from 'react';
import { Text, StyleSheet, Pressable, ViewStyle, TextStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../../theme/tokens';

interface SelectableChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const SelectableChip: React.FC<SelectableChipProps> = ({
  label,
  selected,
  onPress,
  icon,
  style,
  textStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.chipPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      {icon && (
        <MaterialIcons
          name={icon}
          size={16}
          color={selected ? colors.primary : colors.outline}
          style={styles.icon}
        />
      )}
      <Text style={[styles.label, selected && styles.labelSelected, textStyle]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    height: 38,
    paddingHorizontal: spacing.md - 2,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceCard,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs + 2,
    marginBottom: spacing.xs + 4,
  },
  chipSelected: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  chipPressed: {
    opacity: 0.85,
  },
  icon: {
    marginRight: 4,
  },
  label: {
    ...typography.labelSm,
    color: colors.textMuted,
    fontWeight: '500',
  },
  labelSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
});
