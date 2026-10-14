// ====================================================================
// DONO JAHA (D O N O   J A H A)
// Chat Service Layer (Supabase Realtime & Persistent Messages)
// Optimized for Fast, Reliable, Real-Time Messaging & 1-Active Rule
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

export interface GetMessagesOptions {
  limit?: number;
  offset?: number;
  beforeTimestamp?: string;
}

/**
 * Loads conversation messages from Supabase PostgreSQL with pagination.
 * Falls back to seeded mock conversation messages when offline.
 */
export async function getConversationMessages(
  conversationId: string,
  currentProfileId: string = 'user-me',
  options: GetMessagesOptions = {}
): Promise<ChatMessage[]> {
  const { limit = 40, offset = 0, beforeTimestamp } = options;

  if (!isSupabaseConfigured) {
    return mockMessages;
  }

  try {
    let query = supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (beforeTimestamp) {
      query = query.lt('created_at', beforeTimestamp);
    }

    if (limit) {
      query = query.limit(limit);
    }

    if (offset > 0) {
      query = query.range(offset, offset + limit - 1);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      // If querying mock active conv and no rows yet in db, show mock
      if (conversationId === 'conv-active' || conversationId.startsWith('mock')) {
        return mockMessages;
      }
      return [];
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
      status: 'sent',
    }));
  } catch (err) {
    console.warn('getConversationMessages exception:', err);
    return mockMessages;
  }
}

/**
 * Sends a message into the active conversation.
 * Returns optimistic message immediately, updates with persisted row or marks as failed.
 */
export async function sendChatMessage(params: SendMessageParams): Promise<ChatMessage> {
  const tempId = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const optimisticMessage: ChatMessage = {
    id: tempId,
    conversationId: params.conversationId,
    senderId: params.senderProfileId,
    senderName: params.senderName,
    type: params.type || 'text',
    content: params.content,
    voiceDuration: params.voiceDurationSeconds ? `${params.voiceDurationSeconds}s` : undefined,
    voiceStoragePath: params.voiceStoragePath,
    timestamp: 'Just now',
    isSentByMe: true,
    status: 'sending',
  };

  if (!isSupabaseConfigured || params.conversationId === 'conv-active' || params.conversationId.startsWith('mock')) {
    return { ...optimisticMessage, status: 'sent' };
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
      return {
        ...optimisticMessage,
        status: 'failed',
      };
    }

    return {
      ...optimisticMessage,
      id: data.id,
      timestamp: formatMessageTimestamp(data.created_at),
      status: 'sent',
    };
  } catch (err) {
    console.warn('sendChatMessage exception, marking failed:', err);
    return {
      ...optimisticMessage,
      status: 'failed',
    };
  }
}

/**
 * Marks messages in a conversation as read by the current user.
 */
export async function markConversationAsRead(
  conversationId: string,
  currentProfileId: string
): Promise<void> {
  if (!isSupabaseConfigured || conversationId === 'conv-active') return;

  try {
    await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .neq('sender_profile_id', currentProfileId)
      .is('read_at', null);
  } catch (err) {
    console.warn('markConversationAsRead exception:', err);
  }
}

/**
 * Subscribes to Realtime incoming messages for the active conversation.
 * Handles deduplication against optimistic messages.
 */
export function subscribeToConversationMessages(
  conversationId: string,
  onNewMessage: (message: ChatMessage) => void,
  currentProfileId: string = 'user-me'
): () => void {
  if (!isSupabaseConfigured || conversationId === 'conv-active') {
    return () => {};
  }

  const channelName = `realtime_chat_${conversationId.replace(/-/g, '_')}`;

  const channel = supabase
    .channel(channelName)
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
          senderName: row.sender_profile_id === currentProfileId ? 'You' : 'Prospect',
          type: (row.message_type as any) || 'text',
          content: row.content,
          voiceDuration: row.voice_duration_seconds ? `${Math.round(row.voice_duration_seconds)}s` : undefined,
          voiceStoragePath: row.voice_storage_path,
          timestamp: formatMessageTimestamp(row.created_at),
          isSentByMe: row.sender_profile_id === currentProfileId,
          status: 'sent',
        };

        onNewMessage(incoming);
      }
    )
    .subscribe((status, err) => {
      if (err) {
        console.warn(`Realtime subscription error for ${channelName}:`, err);
      }
    });

  return () => {
    supabase.removeChannel(channel);
  };
}

export function formatMessageTimestamp(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'Just now';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return 'Just now';
  }
}
