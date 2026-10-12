import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, typography, radii, shadows } from '../../theme/tokens';
import { TopBar } from '../../components/common/TopBar';
import { BottomSheetModal } from '../../components/common/BottomSheetModal';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { ChatMessage, MatrimonialProfile } from '../../types';
import { mockActiveSuitor, mockMessages } from '../../mocks/matrimonialData';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { currentUserProfile } from '../../data/userProfile';

interface ChatScreenProps {
  suitor?: MatrimonialProfile;
  messages?: ChatMessage[];
  onSendMessage?: (content: string) => void;
  onBack?: () => void;
  onViewProfile?: () => void;
  onEndConversation?: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  suitor = mockActiveSuitor,
  messages: initialMessages = mockMessages,
  onSendMessage,
  onBack,
  onViewProfile,
  onEndConversation,
}) => {
  const insets = useSafeAreaInsets();
  const [messagesList, setMessagesList] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [shareContactModalVisible, setShareContactModalVisible] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: 'conv-active',
      senderId: 'user-me',
      senderName: currentUserProfile.name.split(' ')[0],
      type: 'text',
      content: inputText.trim(),
      timestamp: 'Just now',
      isSentByMe: true,
    };
    setMessagesList((prev) => [...prev, newMsg]);
    onSendMessage?.(inputText.trim());
    setInputText('');
  };

  const handleShareContactConfirmed = () => {
    setShareContactModalVisible(false);
    onSendMessage?.(`📞 Direct Contact Shared: Mobile +91 98230 12345 (${currentUserProfile.name})`);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TopBar
        title={suitor.displayName}
        onBack={onBack}
        rightAction={
          <Pressable onPress={onEndConversation} hitSlop={8}>
            <MaterialIcons name="more-vert" size={24} color={colors.textPrimary} />
          </Pressable>
        }
      />

      {/* Dignified Matrimonial Chat Notice */}
      <View style={styles.chaperoneBanner}>
        <View style={styles.shieldIconCircle}>
          <MaterialIcons name="verified-user" size={18} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.bannerHeaderRow}>
            <Text style={styles.bannerTitle}>Dignified Matrimonial Chat</Text>
            <View style={styles.activeWaliPill}>
              <Text style={styles.activeWaliText}>Verified Intentions</Text>
            </View>
          </View>
          <Text style={styles.bannerSubtitle}>
            Communication is preserved for modesty and respectful decorum. Keep discussions focused on marriage.
          </Text>
        </View>
      </View>

      {/*  Message History Stream  */}
      <ScrollView contentContainerStyle={styles.messagesScroll}>
        {/*  Top Partner Snapshot Context Card  */}
        <View style={styles.partnerSnapshotCard}>
          <View style={styles.snapshotAvatarWrapper}>
            <Image source={{ uri: suitor.avatar }} style={styles.snapshotAvatar} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.nameVerifiedRow}>
              <Text style={styles.snapshotName}>{suitor.name}</Text>
              <View style={styles.greenOnlineDot} />
            </View>
            <Text style={styles.snapshotProfession}>{suitor.profession}</Text>
          </View>
          <Pressable
            style={styles.viewProfileBtn}
            onPress={() => onViewProfile?.()}
          >
            <Text style={styles.viewProfileBtnText}>View</Text>
            <MaterialIcons name="chevron-right" size={16} color={colors.primary} />
          </Pressable>
        </View>

        {/*  Date Separator  */}
        <View style={styles.dateSeparator}>
          <Text style={styles.dateSeparatorText}>TODAY</Text>
        </View>

        {/*  Messages Bubble Stream  */}
        {messagesList.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageRow,
              msg.isSentByMe ? styles.messageRowSent : styles.messageRowReceived,
            ]}
          >
            <View
              style={[
                styles.bubble,
                msg.isSentByMe ? styles.bubbleSent : styles.bubbleReceived,
              ]}
            >
              {msg.type === 'voice' ? (
                <View style={styles.voiceNoteContent}>
                  <Pressable
                    style={[
                      styles.voicePlayBtn,
                      { backgroundColor: msg.isSentByMe ? '#FFF' : colors.primary },
                    ]}
                    onPress={() => setIsPlayingVoice(!isPlayingVoice)}
                  >
                    <MaterialIcons
                      name={isPlayingVoice ? 'pause' : 'play-arrow'}
                      size={20}
                      color={msg.isSentByMe ? colors.primary : '#FFF'}
                    />
                  </Pressable>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.voiceNoteLabel,
                        { color: msg.isSentByMe ? '#FFF' : colors.textPrimary },
                      ]}
                    >
                      Voice Note ({msg.voiceDuration || '0:38'})
                    </Text>
                    {/*  Waveform simulation  */}
                    <View style={styles.chatWaveformRow}>
                      {[12, 20, 8, 24, 16, 22, 10, 18, 24, 14].map((h, i) => (
                        <View
                          key={i}
                          style={[
                            styles.chatWaveBar,
                            {
                              height: h,
                              backgroundColor: msg.isSentByMe
                                ? 'rgba(255,255,255,0.7)'
                                : colors.primary,
                            },
                          ]}
                        />
                      ))}
                    </View>
                  </View>
                </View>
              ) : (
                <Text
                  style={[
                    styles.messageText,
                    msg.isSentByMe ? styles.messageTextSent : styles.messageTextReceived,
                  ]}
                >
                  {msg.content}
                </Text>
              )}
            </View>

            <View style={styles.msgMetaRow}>
              <Text style={styles.timestampText}>{msg.timestamp}</Text>
              {msg.isSentByMe && (
                <MaterialIcons name="done-all" size={14} color={colors.primary} />
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Chat Composer Dock */}
      <View style={[styles.composerDock, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
        <Pressable
          style={styles.contactShareTrigger}
          onPress={() => setShareContactModalVisible(true)}
          accessibilityLabel="Share contact details"
        >
          <MaterialIcons name="contact-phone" size={22} color={colors.primary} />
        </Pressable>

        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a respectful message..."
          placeholderTextColor={colors.textHint}
          style={styles.textInput}
          multiline
        />

        <Pressable
          style={[
            styles.sendButton,
            !inputText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <MaterialIcons name="send" size={18} color="#FFF" />
        </Pressable>
      </View>

      {/*  Share Contact Modal Bottom Sheet  */}
      <BottomSheetModal
        visible={shareContactModalVisible}
        onClose={() => setShareContactModalVisible(false)}
        title="Share Direct Contact"
      >
        <View style={styles.contactModalHero}>
          <View style={styles.contactIconCircle}>
            <MaterialIcons name="call" size={28} color={colors.primary} />
          </View>
          <Text style={styles.contactModalSubtitle}>
            Share your verified phone and parent/guardian contact for direct coordination.
          </Text>
        </View>

        <View style={styles.contactDetailsBox}>
          <Text style={styles.contactLine}>Mobile: <Text style={{ fontWeight: '700' }}>+91 98230 12345</Text></Text>
          <Text style={styles.contactLine}>Wali/Parent: <Text style={{ fontWeight: '700' }}>Tariq Khan (Father)</Text></Text>
        </View>

        <PrimaryButton
          title="Share With Ayesha & Chaperone"
          icon="check-circle"
          onPress={handleShareContactConfirmed}
        />
      </BottomSheetModal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  chaperoneBanner: {
    backgroundColor: colors.surfaceContainerLow,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.margin,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 2,
  },
  shieldIconCircle: {
    width: 32,
    height: 32,
    borderRadius: radii.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  bannerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  activeWaliPill: {
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radii.pill,
  },
  activeWaliText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.primary,
  },
  bannerSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
    lineHeight: 14,
  },
  messagesScroll: {
    padding: spacing.margin,
    paddingBottom: 24,
  },
  partnerSnapshotCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.card,
    padding: spacing.sm + 2,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 2,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  snapshotAvatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  snapshotAvatar: {
    width: '100%',
    height: '100%',
  },
  nameVerifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  snapshotName: {
    ...typography.labelMd,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  greenOnlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  snapshotProfession: {
    ...typography.caption,
    color: colors.textMuted,
  },
  viewProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radii.sm,
  },
  viewProfileBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  dateSeparator: {
    alignSelf: 'center',
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: radii.pill,
    marginVertical: spacing.sm,
  },
  dateSeparatorText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  messageRow: {
    marginBottom: spacing.sm + 2,
    maxWidth: '82%',
  },
  messageRowSent: {
    alignSelf: 'flex-end',
  },
  messageRowReceived: {
    alignSelf: 'flex-start',
  },
  bubble: {
    padding: 12,
    borderRadius: 16,
    ...shadows.sm,
  },
  bubbleSent: {
    backgroundColor: colors.primary,
    borderTopRightRadius: 2,
  },
  bubbleReceived: {
    backgroundColor: colors.surfaceCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopLeftRadius: 2,
  },
  messageText: {
    ...typography.bodyMd,
    lineHeight: 20,
  },
  messageTextSent: {
    color: '#FFF',
  },
  messageTextReceived: {
    color: colors.textPrimary,
  },
  msgMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
    alignSelf: 'flex-end',
  },
  timestampText: {
    fontSize: 10,
    color: colors.textMuted,
  },
  voiceNoteContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: 200,
  },
  voicePlayBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceNoteLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  chatWaveformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 24,
  },
  chatWaveBar: {
    width: 3,
    borderRadius: 2,
  },
  composerDock: {
    backgroundColor: colors.surfaceCard,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.margin,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  contactShareTrigger: {
    width: 42,
    height: 42,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radii.button,
    paddingHorizontal: spacing.md,
    ...typography.bodyMd,
    color: colors.textPrimary,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: radii.button,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
  contactModalHero: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  contactIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  contactModalSubtitle: {
    ...typography.bodySm,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  contactDetailsBox: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radii.card,
    padding: spacing.md,
    gap: 6,
    marginBottom: spacing.lg,
  },
  contactLine: {
    ...typography.bodyMd,
    color: colors.textPrimary,
  },
});
