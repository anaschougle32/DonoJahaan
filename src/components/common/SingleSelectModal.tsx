import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows, spacing, typography } from '../../theme/tokens';

export interface SelectOption {
  id: string;
  label: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

interface SingleSelectModalProps {
  visible: boolean;
  title: string;
  subtitle?: string;
  options: SelectOption[];
  selectedId?: string;
  onSelect: (option: SelectOption) => void;
  onClose: () => void;
}

export const SingleSelectModal: React.FC<SingleSelectModalProps> = ({
  visible,
  title,
  subtitle,
  options,
  selectedId,
  onSelect,
  onClose,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[
            styles.sheetContainer,
            { paddingBottom: Math.max(insets.bottom + 12, 24) },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Top Grab Handle */}
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{title}</Text>
              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Options List */}
          <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const isSelected = selectedId === item.id;
              return (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    isSelected && styles.optionItemSelected,
                  ]}
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                  activeOpacity={0.75}
                >
                  <View style={styles.radioOuter}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>

                  <View style={styles.textWrap}>
                    <Text
                      style={[
                        styles.optionLabel,
                        isSelected && styles.optionLabelSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {item.subtitle && (
                      <Text style={styles.optionSub}>{item.subtitle}</Text>
                    )}
                  </View>

                  {item.icon && (
                    <Ionicons
                      name={item.icon}
                      size={18}
                      color={isSelected ? colors.primary : colors.textMuted}
                    />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(36, 27, 51, 0.55)', // Dimmed Deep Plum
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: radii.modal,
    borderTopRightRadius: radii.modal,
    maxHeight: '75%',
    paddingTop: 10,
    ...shadows.sheet,
  },
  handleBar: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.margin,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.primarySoft,
  },
  title: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 17,
    fontWeight: '700',
    color: colors.deepPlum,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  list: {
    paddingHorizontal: spacing.margin,
  },
  listContent: {
    paddingVertical: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: radii.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceSubtle,
  },
  optionItemSelected: {
    backgroundColor: colors.primarySoft,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.borderFocus,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  textWrap: {
    flex: 1,
  },
  optionLabel: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    color: colors.deepPlum,
    fontWeight: '500',
  },
  optionLabelSelected: {
    fontWeight: '700',
    color: colors.primary,
  },
  optionSub: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
});
