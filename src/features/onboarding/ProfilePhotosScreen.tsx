import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, radii, shadows, spacing, typography } from '../../theme/tokens';
import { TopBar } from '../../components/common/TopBar';
import { PrimaryButton } from '../../components/common/PrimaryButton';

interface ProfilePhotosScreenProps {
  onBack?: () => void;
  onNext?: () => void;
}

export const ProfilePhotosScreen: React.FC<ProfilePhotosScreenProps> = ({
  onBack,
  onNext,
}) => {
  const insets = useSafeAreaInsets();

  const [photoUri, setPhotoUri] = useState<string>(
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600'
  );
  const [isHayaVeiled, setIsHayaVeiled] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Pick or Replace Photo from Device Gallery
  const handlePickPhoto = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Permission Needed',
          'Access to camera roll is required to select a profile photo.'
        );
        return;
      }

      setUploading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 5],
        quality: 0.85,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (err: any) {
      Alert.alert('Upload Error', 'Could not load image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = () => {
    Alert.alert(
      'Remove Photo',
      'Are you sure you want to remove your profile photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () =>
            setPhotoUri(
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600'
            ),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopBar title="Profile Photos" onBack={onBack} />

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.badgeRow}>
          <MaterialIcons name="photo-camera" size={16} color={colors.primary} />
          <Text style={styles.badgeText}>Phase 2: Modest Presentation</Text>
        </View>

        <Text style={styles.title}>Your Matrimonial Photo</Text>
        <Text style={styles.subtitle}>
          Add a modest, clear picture of yourself. You can keep it veiled under Haya privacy until you grant access to suitors.
        </Text>

        {/* Critical Distinction Notice (Section 27) */}
        <View style={styles.guaranteeNotice}>
          <MaterialIcons name="security" size={18} color={colors.primary} />
          <Text style={styles.guaranteeText}>
            <Text style={{ fontWeight: '700' }}>Verification Selfie ≠ Profile Photo:</Text> This photo will be shown to suitors according to your privacy settings. The selfie you take later is 100% private and used only for identity verification.
          </Text>
        </View>

        {/* Primary Photo Preview Card */}
        <View style={styles.photoCard}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: photoUri }}
              style={[
                styles.photoPreview,
                isHayaVeiled && Platform.OS === 'web' && ({ filter: 'blur(16px)' } as any),
              ]}
              blurRadius={isHayaVeiled ? 16 : 0}
            />

            {isHayaVeiled && (
              <View style={styles.veilOverlay}>
                <Ionicons name="eye-off" size={24} color="#FFFFFF" />
                <Text style={styles.veilOverlayText}>Haya Privacy Veil Active</Text>
              </View>
            )}
          </View>

          {/* Photo Actions Row */}
          <View style={styles.photoActionsRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handlePickPhoto}
              activeOpacity={0.8}
            >
              <Ionicons name="camera-reverse-outline" size={18} color={colors.primary} />
              <Text style={styles.actionBtnText}>
                {uploading ? 'Updating...' : 'Change Photo'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.deleteBtn]}
              onPress={handleDeletePhoto}
              activeOpacity={0.8}
            >
              <Ionicons name="trash-outline" size={18} color={colors.error} />
              <Text style={[styles.actionBtnText, { color: colors.error }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Haya / Modesty Veil Control Card */}
        <View style={styles.privacyCard}>
          <View style={styles.privacyHeaderRow}>
            <View style={styles.privacyIconBox}>
              <MaterialIcons name="visibility-off" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.privacyTitle}>Haya Modesty Photo Veil</Text>
              <Text style={styles.privacySubtitle}>
                When enabled, your photo is protected and blurred in the suitor feed. Suitors must request access to reveal your photo.
              </Text>
            </View>
            <Switch
              value={isHayaVeiled}
              onValueChange={setIsHayaVeiled}
              trackColor={{ false: colors.surfaceContainer, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Dignified Photo Guidelines */}
        <View style={styles.guidelinesCard}>
          <Text style={styles.guidelinesTitle}>MODEST MATRIMONIAL GUIDELINES</Text>
          <View style={styles.guidelineRow}>
            <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
            <Text style={styles.guidelineText}>Clear, recent, solo portrait with natural lighting</Text>
          </View>
          <View style={styles.guidelineRow}>
            <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
            <Text style={styles.guidelineText}>Modest Islamic attire adhering to Islamic dignity</Text>
          </View>
          <View style={styles.guidelineRow}>
            <Ionicons name="close-circle" size={16} color={colors.error} />
            <Text style={styles.guidelineText}>No sunglasses, heavy beauty filters, or group photos</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Dock */}
      <View
        style={[
          styles.bottomDock,
          { paddingBottom: Math.max(insets.bottom, spacing.md) },
        ]}
      >
        <PrimaryButton
          title="Save & Continue to Voice Introduction →"
          icon="arrow-forward"
          onPress={onNext || (() => {})}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollBody: {
    padding: spacing.margin,
    paddingBottom: 40,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radii.pill,
    marginBottom: spacing.md,
  },
  badgeText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  title: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 24,
    fontWeight: '700',
    color: colors.deepPlum,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  guaranteeNotice: {
    flexDirection: 'row',
    backgroundColor: colors.primarySoft,
    padding: 12,
    borderRadius: radii.md,
    gap: 10,
    marginBottom: spacing.lg,
  },
  guaranteeText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.primary,
    lineHeight: 18,
    flex: 1,
  },
  photoCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  imageWrapper: {
    width: '100%',
    height: 280,
    position: 'relative',
    backgroundColor: colors.surfaceContainerLow,
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  veilOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(36, 27, 51, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  veilOverlayText: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  photoActionsRow: {
    flexDirection: 'row',
    padding: 12,
    gap: 10,
    backgroundColor: '#FFFFFF',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: radii.input,
    backgroundColor: colors.primarySoft,
    gap: 6,
  },
  deleteBtn: {
    backgroundColor: '#FFF0F0',
  },
  actionBtnText: {
    fontFamily: typography.fontFamilies.button,
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  privacyCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    padding: 16,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  privacyHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  privacyIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacyTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 14,
    fontWeight: '700',
    color: colors.deepPlum,
  },
  privacySubtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
    lineHeight: 16,
  },
  guidelinesCard: {
    backgroundColor: colors.surfaceContainerLow,
    padding: 16,
    borderRadius: radii.card,
    marginBottom: spacing.xl,
    gap: 10,
  },
  guidelinesTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  guidelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  guidelineText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.deepPlum,
  },
  bottomDock: {
    padding: spacing.margin,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.primarySoft,
  },
});
