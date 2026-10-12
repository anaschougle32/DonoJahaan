import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../../theme/tokens';

interface SelectorRowProps {
  label: string;
  value?: string;
  placeholder?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  required?: boolean;
  disabled?: boolean;
}

export const SelectorRow: React.FC<SelectorRowProps> = ({
  label,
  value,
  placeholder = 'Select option',
  icon,
  onPress,
  required = false,
  disabled = false,
}) => {
  const hasValue = Boolean(value && value.trim().length > 0);

  return (
    <View style={styles.wrapper}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.requiredAsterisk}> *</Text>}
      </View>

      <TouchableOpacity
        style={[styles.row, disabled && styles.disabledRow]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.75}
      >
        <View style={styles.leftContent}>
          {icon && (
            <Ionicons
              name={icon}
              size={18}
              color={hasValue ? colors.primary : colors.textMuted}
              style={styles.icon}
            />
          )}
          <Text
            style={[styles.valueText, !hasValue && styles.placeholderText]}
            numberOfLines={1}
          >
            {hasValue ? value : placeholder}
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 13,
    fontWeight: '600',
    color: colors.deepPlum,
    letterSpacing: 0.1,
  },
  requiredAsterisk: {
    color: colors.error,
    fontSize: 13,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.input,
    paddingHorizontal: 14,
    paddingVertical: 13,
    minHeight: 48,
  },
  disabledRow: {
    backgroundColor: colors.surfaceSubtle,
    opacity: 0.6,
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  valueText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    color: colors.deepPlum,
    fontWeight: '500',
  },
  placeholderText: {
    color: colors.textMuted,
    fontWeight: '400',
  },
});
