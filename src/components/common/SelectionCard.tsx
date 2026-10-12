import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography, shadows } from '../../theme/tokens';

interface SelectionCardProps {
  title: string;
  description?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  selected: boolean;
  onPress: () => void;
  showRadio?: boolean;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  title,
  description,
  icon,
  selected,
  onPress,
  showRadio = true,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        pressed && styles.cardPressed,
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
    >
      {icon && (
        <View style={[styles.iconBox, selected && styles.iconBoxSelected]}>
          <MaterialIcons
            name={icon}
            size={22}
            color={selected ? colors.primary : colors.outline}
          />
        </View>
      )}

      <View style={styles.textContainer}>
        <Text style={[styles.title, selected && styles.titleSelected]}>
          {title}
        </Text>
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
      </View>

      {showRadio && (
        <View style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
          {selected && <View style={styles.radioDot} />}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceCard,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radii.card,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm + 2,
    ...shadows.sm,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconBoxSelected: {
    backgroundColor: colors.surfaceCard,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.labelLg,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  titleSelected: {
    color: colors.primaryDark,
  },
  description: {
    ...typography.bodySm,
    color: colors.textMuted,
    marginTop: 2,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  radioCircleSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  radioDot: {
    width: 6,
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.onPrimary,
  },
});
