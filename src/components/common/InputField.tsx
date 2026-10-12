import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography, shadows } from '../../theme/tokens';

interface InputFieldProps extends TextInputProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: keyof typeof MaterialIcons.glyphMap;
  rightIcon?: keyof typeof MaterialIcons.glyphMap;
  onRightIconPress?: () => void;
  isPhoneInput?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  helperText,
  errorText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  isPhoneInput = false,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputWrapper}>
        {isPhoneInput && (
          <View style={styles.countryCodePicker}>
            <Text style={styles.flagEmoji}>🇮🇳</Text>
            <Text style={styles.countryCodeText}>+91</Text>
            <MaterialIcons name="keyboard-arrow-down" size={18} color={colors.outline} />
          </View>
        )}

        <View
          style={[
            styles.inputContainer,
            isFocused && styles.inputContainerFocused,
            Boolean(errorText) && styles.inputContainerError,
          ]}
        >
          {leftIcon && !isPhoneInput && (
            <MaterialIcons
              name={leftIcon}
              size={20}
              color={isFocused ? colors.primary : colors.outline}
              style={styles.leftIcon}
            />
          )}

          <TextInput
            placeholderTextColor={colors.textHint}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[styles.input, style]}
            {...props}
          />

          {rightIcon && (
            <Pressable onPress={onRightIconPress} hitSlop={8} style={styles.rightIcon}>
              <MaterialIcons
                name={rightIcon}
                size={18}
                color={colors.outline}
              />
            </Pressable>
          )}
        </View>
      </View>

      {errorText ? (
        <Text style={styles.errorText}>{errorText}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.md,
  },
  label: {
    ...typography.labelMd,
    color: colors.textPrimary,
    marginBottom: spacing.xs + 2,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  countryCodePicker: {
    height: 52,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: radii.button,
    backgroundColor: colors.surfaceCard,
    borderWidth: 1.5,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    ...shadows.sm,
  },
  flagEmoji: {
    fontSize: 18,
  },
  countryCodeText: {
    ...typography.labelMd,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  inputContainer: {
    flex: 1,
    height: 52,
    borderRadius: radii.button,
    backgroundColor: colors.surfaceCard,
    borderWidth: 1.5,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    ...shadows.sm,
  },
  inputContainerFocused: {
    borderColor: colors.borderFocus,
  },
  inputContainerError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    height: '100%',
    ...typography.bodyMd,
    color: colors.textPrimary,
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
  helperText: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
