import React, { useState, useEffect } from 'react';
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
import { SelectOption } from './SingleSelectModal';
import { PrimaryButton } from './PrimaryButton';

interface MultiSelectModalProps {
  visible: boolean;
  title: string;
  subtitle?: string;
  options: SelectOption[];
  selectedIds: string[];
  onApply: (selectedIds: string[]) => void;
  onClose: () => void;
}

export const MultiSelectModal: React.FC<MultiSelectModalProps> = ({
  visible,
  title,
  subtitle,
  options,
  selectedIds,
  onApply,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const [currentSelected, setCurrentSelected] = useState<string[]>(selectedIds);

  useEffect(() => {
    if (visible) {
      setCurrentSelected(selectedIds);
    }
  }, [visible, selectedIds]);

  const toggleOption = (id: string) => {
    if (currentSelected.includes(id)) {
      setCurrentSelected(currentSelected.filter((item) => item !== id));
    } else {
      setCurrentSelected([...currentSelected, id]);
    }
  };

  const handleApply = () => {
    onApply(currentSelected);
    onClose();
  };

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
          {/* Grab Handle */}
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
              const isChecked = currentSelected.includes(item.id);
              return (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    isChecked && styles.optionItemChecked,
                  ]}
                  onPress={() => toggleOption(item.id)}
                  activeOpacity={0.75}
                >
                  <View
                    style={[
                      styles.checkbox,
                      isChecked && styles.checkboxActive,
                    ]}
                  >
                    {isChecked && (
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                    )}
                  </View>

                  <View style={styles.textWrap}>
                    <Text
                      style={[
                        styles.optionLabel,
                        isChecked && styles.optionLabelChecked,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {item.subtitle && (
                      <Text style={styles.optionSub}>{item.subtitle}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
          />

          {/* Bottom Dock */}
          <View style={styles.bottomDock}>
            <PrimaryButton
              title={`Apply Selection (${currentSelected.length})`}
              icon="check-circle"
              onPress={handleApply}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(36, 27, 51, 0.55)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: radii.modal,
    borderTopRightRadius: radii.modal,
    maxHeight: '80%',
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
  optionItemChecked: {
    backgroundColor: colors.primarySoft,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.borderFocus,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
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
  optionLabelChecked: {
    fontWeight: '700',
    color: colors.primary,
  },
  optionSub: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  bottomDock: {
    paddingHorizontal: spacing.margin,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.primarySoft,
  },
});
