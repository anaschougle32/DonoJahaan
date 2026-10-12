import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows, spacing, typography } from '../../theme/tokens';

export interface SearchCategory {
  id: string;
  name: string;
}

export interface SearchItem {
  id: string;
  name: string;
  subtitle?: string;
  categoryId?: string;
}

interface SearchSelectModalProps {
  visible: boolean;
  title: string;
  placeholder?: string;
  categories?: SearchCategory[];
  items: SearchItem[];
  selectedId?: string;
  onSelect: (item: SearchItem) => void;
  onClose: () => void;
}

export const SearchSelectModal: React.FC<SearchSelectModalProps> = ({
  visible,
  title,
  placeholder = 'Search...',
  categories,
  items,
  selectedId,
  onSelect,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    let list = items;
    if (selectedCategory) {
      list = list.filter((i) => i.categoryId === selectedCategory);
    }
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        (i.subtitle && i.subtitle.toLowerCase().includes(q))
    );
  }, [items, selectedCategory, searchQuery]);

  const handleClose = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <Pressable style={styles.backdrop} onPress={handleClose}>
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
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* SINGLE Search Field (No nested inputs, cleanly isolated!) */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color={colors.textMuted} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder={placeholder}
                placeholderTextColor={colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCorrect={false}
                clearButtonMode="while-editing"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  hitSlop={8}
                >
                  <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Optional Category Filter Row */}
          {categories && categories.length > 0 && (
            <View style={styles.categoriesWrapper}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScroll}
              >
                <TouchableOpacity
                  style={[
                    styles.catChip,
                    !selectedCategory && styles.catChipActive,
                  ]}
                  onPress={() => setSelectedCategory(null)}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[
                      styles.catChipText,
                      !selectedCategory && styles.catChipTextActive,
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>

                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.catChip,
                      selectedCategory === cat.id && styles.catChipActive,
                    ]}
                    onPress={() => setSelectedCategory(cat.id)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        styles.catChipText,
                        selectedCategory === cat.id && styles.catChipTextActive,
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Independent Results List */}
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={styles.list}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={32} color={colors.textMuted} />
                <Text style={styles.emptyText}>No matching options found</Text>
              </View>
            }
            renderItem={({ item }) => {
              const isSelected = selectedId === item.id;
              return (
                <TouchableOpacity
                  style={[
                    styles.resultItem,
                    isSelected && styles.resultItemSelected,
                  ]}
                  onPress={() => {
                    onSelect(item);
                    handleClose();
                  }}
                  activeOpacity={0.75}
                >
                  <View style={styles.resultTextCol}>
                    <Text
                      style={[
                        styles.resultName,
                        isSelected && styles.resultNameSelected,
                      ]}
                    >
                      {item.name}
                    </Text>
                    {item.subtitle && (
                      <Text style={styles.resultSub}>{item.subtitle}</Text>
                    )}
                  </View>

                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={colors.primary}
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
    backgroundColor: 'rgba(36, 27, 51, 0.55)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: radii.modal,
    borderTopRightRadius: radii.modal,
    height: '82%',
    paddingTop: 10,
    ...shadows.sheet,
  },
  handleBar: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.margin,
    paddingBottom: 10,
  },
  title: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 17,
    fontWeight: '700',
    color: colors.deepPlum,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: spacing.margin,
    paddingVertical: 6,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radii.input,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    color: colors.deepPlum,
    padding: 0,
  },
  categoriesWrapper: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.primarySoft,
  },
  categoryScroll: {
    paddingHorizontal: spacing.margin,
    gap: 8,
  },
  catChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
  },
  catChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  catChipText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
  catChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  list: {
    flex: 1,
    paddingHorizontal: spacing.margin,
  },
  listContent: {
    paddingVertical: 8,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: radii.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceSubtle,
  },
  resultItemSelected: {
    backgroundColor: colors.primarySoft,
  },
  resultTextCol: {
    flex: 1,
    paddingRight: 8,
  },
  resultName: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    color: colors.deepPlum,
    fontWeight: '500',
  },
  resultNameSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
  resultSub: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 13,
    color: colors.textMuted,
  },
});
