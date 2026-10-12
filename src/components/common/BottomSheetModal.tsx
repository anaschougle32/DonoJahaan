import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii, spacing, typography, shadows } from '../../theme/tokens';

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={[styles.sheetContent, { paddingBottom: Math.max(insets.bottom + 16, spacing.xl) }]}>
              <View style={styles.dragHandle} />
              {title && <Text style={styles.sheetTitle}>{title}</Text>}
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollBody}
              >
                {children}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(36, 27, 51, 0.65)',
    justifyContent: 'flex-end',
  },
  sheetContent: {
    backgroundColor: colors.surfaceCard,
    borderTopLeftRadius: radii.modal,
    borderTopRightRadius: radii.modal,
    paddingHorizontal: spacing.margin,
    paddingTop: spacing.md,
    maxHeight: '85%',
    ...shadows.modal,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceContainerHigh,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  sheetTitle: {
    ...typography.headlineSm,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  scrollBody: {
    paddingBottom: spacing.lg,
  },
});
