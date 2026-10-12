import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radii, spacing, typography, shadows } from '../../theme/tokens';
import { PrimaryButton } from './PrimaryButton';

interface VoiceStudioProps {
  onRecordingComplete?: (duration: number, path: string) => void;
  initialDuration?: number;
}

export const VoiceStudio: React.FC<VoiceStudioProps> = ({
  onRecordingComplete,
  initialDuration = 38,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedDuration, setRecordedDuration] = useState(initialDuration);
  const [activePrompt, setActivePrompt] = useState('🌿 Your ideal quiet Sunday morning routine');

  const prompts = [
    '✨ What does barakah mean in your day?',
    '🌿 Your ideal quiet Sunday morning routine',
    '📖 A book or value currently shaping you',
    '🏡 What family traditions mean the most to you?',
  ];

  // Simulator wave animation heights
  const waveHeights = [8, 16, 24, 12, 32, 20, 36, 28, 14, 22, 32, 40, 24, 16, 8];

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setIsPlaying(false);
      setRecordedDuration(0);
    } else {
      setIsRecording(false);
      if (onRecordingComplete) {
        onRecordingComplete(recordedDuration || 45, 'mock_voice_sample.m4a');
      }
    }
  };

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordedDuration((prev) => {
          if (prev >= 120) {
            setIsRecording(false);
            return 120;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <View style={styles.container}>
      {/*  Modesty & Halal Respect Card  */}
      <View style={styles.modestyCard}>
        <View style={styles.shieldIconBox}>
          <MaterialIcons name="verified-user" size={20} color={colors.primary} />
        </View>
        <View style={styles.modestyTextContainer}>
          <View style={styles.modestyHeaderRow}>
            <Text style={styles.modestyTitle}>Modest & Dignified</Text>
            <View style={styles.familyBadge}>
              <Text style={styles.familyBadgeText}>FAMILY FIRST</Text>
            </View>
          </View>
          <Text style={styles.modestyDesc}>
            Voice notes are shared only with mutually accepted matrimonial suitors and their chaperones.
          </Text>
        </View>
      </View>

      {/*  Inspiration Prompts  */}
      <View style={styles.promptContainer}>
        <View style={styles.promptHeader}>
          <MaterialIcons name="lightbulb" size={18} color={colors.primary} />
          <Text style={styles.promptTitle}>Inspiration Prompts</Text>
        </View>
        <View style={styles.chipsWrap}>
          {prompts.map((p) => (
            <Pressable
              key={p}
              onPress={() => setActivePrompt(p)}
              style={[
                styles.promptChip,
                activePrompt === p && styles.promptChipActive,
              ]}
            >
              <Text
                style={[
                  styles.promptChipText,
                  activePrompt === p && styles.promptChipTextActive,
                ]}
              >
                {p}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/*  Recording Studio Box  */}
      <View style={styles.studioBox}>
        <Text style={styles.timerText}>
          {formatTimer(recordedDuration)}{' '}
          <Text style={styles.timerMaxText}>/ 02:00</Text>
        </Text>

        <View style={styles.statusIndicatorRow}>
          <View
            style={[
              styles.statusDot,
              isRecording && styles.statusDotRecording,
            ]}
          />
          <Text style={styles.statusText}>
            {isRecording
              ? 'Recording in progress...'
              : recordedDuration > 0
              ? 'Voice Introduction Recorded'
              : 'Tap to start recording'}
          </Text>
        </View>

        {/*  Waveform Visualization  */}
        <View style={styles.waveformContainer}>
          {waveHeights.map((h, i) => (
            <View
              key={i}
              style={[
                styles.waveBar,
                { height: isRecording || isPlaying ? h : 6 },
                isRecording && styles.waveBarActive,
              ]}
            />
          ))}
        </View>

        {/*  Studio Controls  */}
        <View style={styles.controlsRow}>
          <PrimaryButton
            title={isRecording ? 'Stop Recording' : recordedDuration > 0 ? 'Re-record Voice' : 'Start Recording'}
            variant={isRecording ? 'danger' : 'primary'}
            icon={isRecording ? 'stop' : 'mic'}
            onPress={handleToggleRecord}
            style={styles.actionBtn}
          />

          {recordedDuration > 0 && !isRecording && (
            <PrimaryButton
              title={isPlaying ? 'Pause' : 'Listen Preview'}
              variant="secondary"
              icon={isPlaying ? 'pause' : 'play-arrow'}
              onPress={() => setIsPlaying(!isPlaying)}
              style={styles.actionBtn}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  modestyCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.card,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm + 2,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  shieldIconBox: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modestyTextContainer: {
    flex: 1,
  },
  modestyHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  modestyTitle: {
    ...typography.labelMd,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  familyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
    backgroundColor: colors.secondaryContainer,
  },
  familyBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.onSecondaryContainer,
  },
  modestyDesc: {
    ...typography.caption,
    color: colors.textMuted,
    lineHeight: 16,
  },
  promptContainer: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radii.card,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  promptTitle: {
    ...typography.labelSm,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  chipsWrap: {
    flexDirection: 'column',
    gap: 6,
  },
  promptChip: {
    backgroundColor: colors.surfaceCard,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  promptChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  promptChipText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  promptChipTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  studioBox: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.card,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  timerText: {
    ...typography.displayLg,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  timerMaxText: {
    fontSize: 18,
    color: colors.textMuted,
    fontWeight: '400',
  },
  statusIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
  statusDotRecording: {
    backgroundColor: colors.error,
  },
  statusText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 48,
    marginVertical: spacing.md,
  },
  waveBar: {
    width: 4,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 2,
  },
  waveBarActive: {
    backgroundColor: colors.primary,
  },
  controlsRow: {
    width: '100%',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  actionBtn: {
    height: 48,
  },
});
