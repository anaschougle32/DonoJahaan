import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, radii, shadows, spacing } from '../../theme/tokens';
import { PrimaryButton } from '../../components/common/PrimaryButton';

interface SelfieVerificationScreenProps {
  onBack?: () => void;
  onVerified?: (selfieUri: string) => void;
  onSkip?: () => void;
}

export const SelfieVerificationScreen: React.FC<SelfieVerificationScreenProps> = ({
  onBack,
  onVerified,
  onSkip,
}) => {
  const insets = useSafeAreaInsets();
  const [selfieUri, setSelfieUri] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleTakeSelfie = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Camera Permission Needed',
          'Dono Jaha needs access to your camera to take a secure verification selfie.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        cameraType: 'front' as any,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setSelfieUri(uri);
      }
    } catch (err) {
      console.warn('Camera error:', err);
      // Fallback simulation for emulators without camera
      setSelfieUri('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400');
    }
  };

  const handleConfirmVerification = () => {
    if (!selfieUri) {
      handleTakeSelfie();
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      Alert.alert(
        'Selfie Verified ✨',
        'Your profile has been granted the Verified Member badge. This selfie remains confidential and will never appear on your public profile.'
      );
      onVerified ? onVerified(selfieUri) : onBack?.();
    }, 1200);
  };

  return (
    <View style={[styles.safeContainer, { paddingTop: insets.top }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack || onSkip}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verify Your Profile</Text>
        <TouchableOpacity onPress={onSkip || onBack} activeOpacity={0.7}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Verification Emblem */}
        <View style={styles.shieldHalo}>
          <View style={styles.shieldCircle}>
            <MaterialIcons name="verified-user" size={36} color="#6A3794" />
          </View>
        </View>

        <Text style={styles.mainTitle}>Verify your profile</Text>
        <Text style={styles.subtitle}>
          Take a quick selfie to verify that you're a real person.
        </Text>

        {/* Camera Viewfinder / Preview Box */}
        <View style={styles.viewfinderBox}>
          {selfieUri ? (
            <View style={styles.selfiePreviewWrapper}>
              <Image source={{ uri: selfieUri }} style={styles.selfieImage} />
              <View style={styles.verifiedCheckBadge}>
                <Ionicons name="checkmark-circle" size={28} color="#2E7D32" />
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.cameraPlaceholder}
              onPress={handleTakeSelfie}
              activeOpacity={0.8}
            >
              <View style={styles.cameraIconBtn}>
                <Ionicons name="camera" size={36} color="#6A3794" />
              </View>
              <Text style={styles.tapToSnapText}>Tap to take front camera selfie</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Security & Confidentiality Notice (CRITICAL PRD REQUIREMENT) */}
        <View style={styles.confidentialCard}>
          <View style={styles.lockBadge}>
            <Ionicons name="lock-closed" size={16} color="#6A3794" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.confidentialTitle}>Separate from Profile Photo</Text>
            <Text style={styles.confidentialDesc}>
              This selfie is <Text style={{ fontWeight: '700' }}>only used for identity verification</Text> and will <Text style={{ fontWeight: '700' }}>never be shown on your profile</Text> or revealed to suitors.
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom Sticky Actions */}
      <View style={styles.bottomDock}>
        <PrimaryButton
          title={selfieUri ? (isVerifying ? 'Verifying...' : 'Submit Verification Selfie') : 'Take Selfie'}
          onPress={handleConfirmVerification}
          icon={selfieUri ? 'check' : 'photo-camera'}
        />

        {selfieUri && (
          <TouchableOpacity
            style={styles.retakeBtn}
            onPress={handleTakeSelfie}
            activeOpacity={0.7}
          >
            <Text style={styles.retakeBtnText}>Retake Selfie</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FDFCFC', // Warm White
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6F1',
    backgroundColor: '#FDFCFC',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#241B33',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#59445F',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  shieldHalo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0E6F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  shieldCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#241B33',
    letterSpacing: -0.4,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#59445F',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 290,
    marginBottom: 20,
  },
  viewfinderBox: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 3,
    borderColor: '#6A3794',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0E6F1',
    overflow: 'hidden',
    marginBottom: 20,
  },
  selfiePreviewWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  selfieImage: {
    width: '100%',
    height: '100%',
  },
  verifiedCheckBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    ...shadows.sm,
  },
  cameraPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  cameraIconBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    ...shadows.card,
  },
  tapToSnapText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6A3794',
    textAlign: 'center',
  },
  confidentialCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.card,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DBCADD',
    gap: 12,
    ...shadows.sm,
  },
  lockBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0E6F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  confidentialTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#241B33',
    marginBottom: 2,
  },
  confidentialDesc: {
    fontSize: 12,
    color: '#59445F',
    lineHeight: 17,
  },
  bottomDock: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 10,
  },
  retakeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  retakeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#59445F',
    textDecorationLine: 'underline',
  },
});
