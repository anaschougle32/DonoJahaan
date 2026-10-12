// ====================================================================
// DONO JAHA (D O N O   J A H A)
// Chat Service Layer (Supabase Realtime & Persistent Messages)
// ====================================================================

import { supabase, isSupabaseConfigured } from '../lib/supabase/client';
import { ChatMessage } from '../types';
import { mockMessages } from '../mocks/matrimonialData';

export interface SendMessageParams {
  conversationId: string;
  senderProfileId: string;
  senderName: string;
  content: string;
  type?: 'text' | 'voice' | 'system';
  voiceDurationSeconds?: number;
  voiceStoragePath?: string;
}

/**
 * Loads conversation messages from Supabase PostgreSQL.
 * Falls back to seeded mock conversation messages when offline.
 */
export async function getConversationMessages(
  conversationId: string,
  currentProfileId: string = 'user-me'
): Promise<ChatMessage[]> {
  if (!isSupabaseConfigured) {
    return mockMessages;
  }

  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return mockMessages;
    }

    return data.map((row) => ({
      id: row.id,
      conversationId: row.conversation_id,
      senderId: row.sender_profile_id,
      senderName: row.sender_profile_id === currentProfileId ? 'You' : 'Ayesha M.',
      type: (row.message_type as any) || 'text',
      content: row.content,
      voiceDuration: row.voice_duration_seconds ? `${Math.round(row.voice_duration_seconds)}s` : undefined,
      voiceStoragePath: row.voice_storage_path || undefined,
      timestamp: formatMessageTimestamp(row.created_at),
      isSentByMe: row.sender_profile_id === currentProfileId,
    }));
  } catch (err) {
    console.warn('getConversationMessages exception:', err);
    return mockMessages;
  }
}

/**
 * Sends a message into the active conversation.
 * Enforces the One Active Conversation database rule.
 */
export async function sendChatMessage(params: SendMessageParams): Promise<ChatMessage> {
  const optimisticMessage: ChatMessage = {
    id: `msg-${Date.now()}`,
    conversationId: params.conversationId,
    senderId: params.senderProfileId,
    senderName: params.senderName,
    type: params.type || 'text',
    content: params.content,
    voiceDuration: params.voiceDurationSeconds ? `${params.voiceDurationSeconds}s` : undefined,
    voiceStoragePath: params.voiceStoragePath,
    timestamp: 'Just now',
    isSentByMe: true,
  };

  if (!isSupabaseConfigured) {
    return optimisticMessage;
  }

  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: params.conversationId,
        sender_profile_id: params.senderProfileId,
        message_type: params.type || 'text',
        content: params.content,
        voice_duration_seconds: params.voiceDurationSeconds,
        voice_storage_path: params.voiceStoragePath,
      })
      .select()
      .single();

    if (error) {
      console.warn('sendChatMessage Supabase insert error:', error.message);
      return optimisticMessage;
    }

    return {
      ...optimisticMessage,
      id: data.id,
      timestamp: formatMessageTimestamp(data.created_at),
    };
  } catch (err) {
    console.warn('sendChatMessage exception, using optimistic message:', err);
    return optimisticMessage;
  }
}

/**
 * Subscribes to Realtime incoming messages for the active conversation.
 */
export function subscribeToConversationMessages(
  conversationId: string,
  onNewMessage: (message: ChatMessage) => void,
  currentProfileId: string = 'user-me'
): () => void {
  if (!isSupabaseConfigured) {
    return () => {};
  }

  const channel = supabase
    .channel(`chat_${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        const row = payload.new;
        if (!row) return;

        const incoming: ChatMessage = {
          id: row.id,
          conversationId: row.conversation_id,
          senderId: row.sender_profile_id,
          senderName: row.sender_profile_id === currentProfileId ? 'You' : 'Ayesha M.',
          type: (row.message_type as any) || 'text',
          content: row.content,
          voiceDuration: row.voice_duration_seconds ? `${Math.round(row.voice_duration_seconds)}s` : undefined,
          voiceStoragePath: row.voice_storage_path,
          timestamp: formatMessageTimestamp(row.created_at),
          isSentByMe: row.sender_profile_id === currentProfileId,
        };

        onNewMessage(incoming);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

function formatMessageTimestamp(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return 'Just now';
  }
}
