import React from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radii, typography, spacing } from '../../theme/tokens';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  icon?: keyof typeof MaterialIcons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const getContainerStyle = (pressed: boolean): ViewStyle => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: pressed ? colors.primaryTint : colors.primarySoft,
          borderColor: 'transparent',
        };
      case 'outline':
        return {
          backgroundColor: pressed ? colors.primarySoft : 'transparent',
          borderWidth: 1.5,
          borderColor: colors.primary,
        };
      case 'danger':
        return {
          backgroundColor: pressed ? '#991B1B' : colors.error,
          borderColor: 'transparent',
        };
      case 'primary':
      default:
        return {
          backgroundColor: pressed ? colors.primaryDark : colors.primary,
          borderColor: 'transparent',
        };
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'secondary':
      case 'outline':
        return colors.primary;
      case 'danger':
      case 'primary':
      default:
        return colors.onPrimary;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.baseButton,
        getContainerStyle(pressed),
        disabled && styles.disabledButton,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <View style={styles.contentRow}>
          <Text style={[styles.baseText, { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
          {icon && (
            <MaterialIcons
              name={icon}
              size={18}
              color={getTextColor()}
              style={styles.iconStyle}
            />
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    height: 52,
    borderRadius: radii.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    width: '100%',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs + 2,
  },
  baseText: {
    ...typography.labelLg,
    fontWeight: '700',
  },
  iconStyle: {
    marginLeft: 2,
  },
  disabledButton: {
    opacity: 0.45,
    shadowOpacity: 0,
    elevation: 0,
  },
});
