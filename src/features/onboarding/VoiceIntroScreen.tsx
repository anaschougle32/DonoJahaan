import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, radii, shadows, spacing, typography } from '../../theme/tokens';
import { TopBar } from '../../components/common/TopBar';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { updateCurrentUserProfile } from '../../data/userProfile';

interface VoiceIntroScreenProps {
  onBack?: () => void;
  onNext?: () => void;
}

export const VoiceIntroScreen: React.FC<VoiceIntroScreenProps> = ({
  onBack,
  onNext,
}) => {
  const insets = useSafeAreaInsets();

  const [hasRecording, setHasRecording] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationSeconds, setDurationSeconds] = useState(42);
  const [activePrompt, setActivePrompt] = useState(
    '🌿 Your ideal quiet Sunday morning routine'
  );

  const prompts = [
    '🌿 Your ideal quiet Sunday morning routine',
    '✨ What does barakah mean in your day?',
    '📖 A book, value or sunnah currently shaping you',
    '🏡 What family traditions mean the most to you?',
  ];

  const waveHeights = [8, 16, 24, 12, 32, 20, 36, 28, 14, 22, 32, 40, 24, 16, 8];

  // Recording timer effect
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setDurationSeconds((prev) => {
          if (prev >= 120) {
            setIsRecording(false);
            setHasRecording(true);
            return 120;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecord = () => {
    setDurationSeconds(0);
    setIsRecording(true);
    setIsPlaying(false);
  };

  const handleStopRecord = () => {
    setIsRecording(false);
    setHasRecording(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleDeleteRecording = () => {
    Alert.alert(
      'Delete Voice Introduction',
      'Are you sure you want to delete this recording? You will need to record a new one.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setHasRecording(false);
            setIsPlaying(false);
            setDurationSeconds(0);
          },
        },
      ]
    );
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopBar title="Voice Introduction" onBack={onBack} />

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.badgeRow}>
          <MaterialIcons name="mic" size={16} color={colors.primary} />
          <Text style={styles.badgeText}>Phase 2: Halal Demeanor</Text>
        </View>

        <Text style={styles.title}>Your Voice Introduction</Text>
        <Text style={styles.subtitle}>
          Hearing your speech cadence, calmness, and articulation creates genuine warmth that photos and text alone cannot convey.
        </Text>

        {/* Modesty Banner (Section 5: NO Wali mentions!) */}
        <View style={styles.modestyCard}>
          <View style={styles.shieldIconBox}>
            <MaterialIcons name="verified-user" size={20} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.modestyTitle}>Dignified & Respectful Audio</Text>
            <Text style={styles.modestyDesc}>
              Voice notes are accessible right below your profile photo on Matches for serious matrimonial suitors.
            </Text>
          </View>
        </View>

        {/* Inspiration Prompts (Stitch UI) */}
        <View style={styles.promptsSection}>
          <View style={styles.promptsHeader}>
            <MaterialIcons name="lightbulb" size={18} color={colors.primary} />
            <Text style={styles.promptsTitle}>Choose a Prompt to Answer</Text>
          </View>

          <View style={styles.promptsWrap}>
            {prompts.map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setActivePrompt(p)}
                style={[
                  styles.promptChip,
                  activePrompt === p && styles.promptChipActive,
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.promptChipText,
                    activePrompt === p && styles.promptChipTextActive,
                  ]}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ========================================================
            RECORDING STUDIO CONTAINER (Stitch Audio UI)
        ======================================================== */}
        <View style={styles.studioCard}>
          {/* Active Prompt Banner */}
          <View style={styles.activePromptBanner}>
            <Text style={styles.activePromptLabel}>PROMPT</Text>
            <Text style={styles.activePromptText}>"{activePrompt}"</Text>
          </View>

          {/* Timer Display */}
          <Text style={styles.timerText}>
            {formatTimer(durationSeconds)}{' '}
            <Text style={styles.timerMaxText}>/ 02:00</Text>
          </Text>

          {/* Status Label */}
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusDot,
                isRecording && styles.statusDotRecording,
              ]}
            />
            <Text style={styles.statusLabel}>
              {isRecording
                ? 'Recording your voice...'
                : hasRecording
                ? 'Voice introduction recorded'
                : 'Tap microphone below to record'}
            </Text>
          </View>

          {/* Waveform Visualization Bars */}
          <View style={styles.waveformContainer}>
            {waveHeights.map((h, idx) => (
              <View
                key={idx}
                style={[
                  styles.waveBar,
                  {
                    height: isRecording
                      ? Math.min(48, Math.max(8, h + (idx % 3) * 6))
                      : isPlaying
                      ? h
                      : 8,
                    backgroundColor:
                      isRecording || isPlaying ? colors.primary : colors.border,
                  },
                ]}
              />
            ))}
          </View>

          {/* Recording / Playback Interactive Controls */}
          {isRecording ? (
            /* Recording State: Big Stop Button */
            <TouchableOpacity
              style={styles.stopRecordBtn}
              onPress={handleStopRecord}
              activeOpacity={0.85}
            >
              <Ionicons name="stop" size={26} color="#FFFFFF" />
            </TouchableOpacity>
          ) : hasRecording ? (
            /* Recorded State: Play / Pause, Re-Record, Delete (Section 25) */
            <View style={styles.playbackControlsRow}>
              <TouchableOpacity
                style={styles.deleteCircleBtn}
                onPress={handleDeleteRecording}
                activeOpacity={0.8}
              >
                <Ionicons name="trash-outline" size={20} color={colors.error} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.playPauseBtn}
                onPress={handleTogglePlay}
                activeOpacity={0.85}
              >
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={30}
                  color="#FFFFFF"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.reRecordBtn}
                onPress={handleStartRecord}
                activeOpacity={0.8}
              >
                <Ionicons name="refresh" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          ) : (
            /* Empty State: Big Record Button */
            <TouchableOpacity
              style={styles.startRecordBtn}
              onPress={handleStartRecord}
              activeOpacity={0.85}
            >
              <Ionicons name="mic" size={32} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          {/* Control Labels */}
          {hasRecording && !isRecording && (
            <View style={styles.controlLabelsRow}>
              <Text style={[styles.controlLabel, { color: colors.error }]}>Delete</Text>
              <Text style={styles.controlLabel}>
                {isPlaying ? 'Pause' : 'Play Preview'}
              </Text>
              <Text style={[styles.controlLabel, { color: colors.primary }]}>Re-record</Text>
            </View>
          )}
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
          title="Save & Continue to Selfie Verification →"
          icon="arrow-forward"
          onPress={() => {
            updateCurrentUserProfile({
              hasVoiceIntro: true,
              voiceDuration: durationSeconds,
            });
            onNext?.();
          }}
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
  modestyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surfaceContainerLow,
    padding: 14,
    borderRadius: radii.card,
    marginBottom: spacing.lg,
  },
  shieldIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modestyTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 13,
    fontWeight: '700',
    color: colors.deepPlum,
  },
  modestyDesc: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
    lineHeight: 16,
  },
  promptsSection: {
    marginBottom: spacing.lg,
  },
  promptsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  promptsTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 13,
    fontWeight: '700',
    color: colors.deepPlum,
  },
  promptsWrap: {
    gap: 8,
  },
  promptChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radii.md,
  },
  promptChipActive: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  promptChipText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 13,
    color: colors.deepPlum,
  },
  promptChipTextActive: {
    fontWeight: '700',
    color: colors.primary,
  },
  studioCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.card,
    padding: 20,
    alignItems: 'center',
    marginBottom: spacing.xl,
    ...shadows.card,
  },
  activePromptBanner: {
    backgroundColor: colors.surfaceContainerLow,
    width: '100%',
    padding: 12,
    borderRadius: radii.md,
    alignItems: 'center',
    marginBottom: 16,
  },
  activePromptLabel: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  activePromptText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 13,
    fontStyle: 'italic',
    color: colors.deepPlum,
    textAlign: 'center',
  },
  timerText: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 32,
    fontWeight: '700',
    color: colors.deepPlum,
  },
  timerMaxText: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.textMuted,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 10,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  statusDotRecording: {
    backgroundColor: colors.error,
  },
  statusLabel: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 13,
    color: colors.textMuted,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 60,
    marginVertical: 16,
    width: '100%',
  },
  waveBar: {
    width: 4,
    borderRadius: 2,
  },
  startRecordBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  stopRecordBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  playbackControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  playPauseBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  deleteCircleBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reRecordBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
    marginTop: 10,
  },
  controlLabel: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
  bottomDock: {
    padding: spacing.margin,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.primarySoft,
  },
});
