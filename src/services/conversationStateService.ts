// ====================================================================
// DONO JAHA (D O N O   J A H A)
// Matrimonial Conversation State Machine Service
// Single Source of Truth for One-Active-Conversation Rule & Messaging Locks
// ====================================================================

import { supabase, isSupabaseConfigured } from '../lib/supabase/client';
import { MatrimonialProfile } from '../types';
import { mockActiveSuitor } from '../mocks/matrimonialData';

export type MessagingLockCode =
  | 'UNLOCKED_READY'
  | 'ALREADY_ACTIVE'
  | 'LOCKED_SELF_HAS_ACTIVE'
  | 'LOCKED_SUITOR_HAS_ACTIVE'
  | 'LOCKED_INTEREST_PENDING'
  | 'LOCKED_NO_INTEREST'
  | 'LOCKED_DECLINED';

export interface CanMessageResult {
  canMessage: boolean;
  code: MessagingLockCode;
  reason: string;
  conversationId?: string;
  partnerProfileId?: string;
  partnerName?: string;
}

export interface ActiveConversationInfo {
  conversationId: string;
  partnerProfileId: string;
  partnerName: string;
  interestId?: string;
  createdAt: string;
  status: 'active' | 'pending' | 'ended';
}

/**
 * 1. Checks whether the current user can unlock / message a specific suitor.
 * Queries the database state machine function `can_start_conversation`.
 */
export async function checkCanMessage(
  myProfileId: string,
  suitorProfileId: string
): Promise<CanMessageResult> {
  if (!isSupabaseConfigured || myProfileId === 'user-me') {
    // Local / Seeded Fallback: Allow messaging only if suitor is Ayesha M. (active suitor)
    if (suitorProfileId === mockActiveSuitor.id || suitorProfileId === 'prof-active') {
      return {
        canMessage: true,
        code: 'ALREADY_ACTIVE',
        reason: 'Active matrimonial conversation with Ayesha M.',
        conversationId: 'conv-active',
        partnerProfileId: mockActiveSuitor.id,
        partnerName: mockActiveSuitor.name,
      };
    }
    return {
      canMessage: false,
      code: 'LOCKED_SELF_HAS_ACTIVE',
      reason: 'Under Dono Jahaan rules, you have an ongoing active conversation with Ayesha M. Conclude it before messaging another suitor.',
    };
  }

  try {
    const { data, error } = await supabase.rpc('can_start_conversation', {
      p_profile_1_id: myProfileId,
      p_profile_2_id: suitorProfileId,
    });

    if (error) {
      console.warn('can_start_conversation RPC notice:', error.message);
      return {
        canMessage: false,
        code: 'LOCKED_NO_INTEREST',
        reason: 'Could not verify conversation status.',
      };
    }

    return {
      canMessage: Boolean(data?.can_start),
      code: data?.code || (data?.can_start ? 'UNLOCKED_READY' : 'LOCKED_NO_INTEREST'),
      reason: data?.reason || '',
      conversationId: data?.conversation_id,
    };
  } catch (err: any) {
    console.warn('checkCanMessage exception:', err);
    return {
      canMessage: false,
      code: 'LOCKED_NO_INTEREST',
      reason: 'Network verification failed.',
    };
  }
}

/**
 * 2. Retrieves the single ongoing active conversation for a profile, if any.
 */
export async function getActiveConversation(
  myProfileId: string
): Promise<ActiveConversationInfo | null> {
  if (!isSupabaseConfigured || myProfileId === 'user-me') {
    return {
      conversationId: 'conv-active',
      partnerProfileId: mockActiveSuitor.id,
      partnerName: mockActiveSuitor.name,
      createdAt: new Date().toISOString(),
      status: 'active',
    };
  }

  try {
    const { data, error } = await supabase.rpc('get_active_conversation_for_profile', {
      p_profile_id: myProfileId,
    });

    if (error || !data || data.length === 0) {
      return null;
    }

    const row = data[0];
    return {
      conversationId: row.conversation_id,
      partnerProfileId: row.partner_profile_id,
      partnerName: row.partner_name,
      interestId: row.interest_id,
      createdAt: row.created_at,
      status: row.status,
    };
  } catch (err) {
    console.warn('getActiveConversation exception:', err);
    return null;
  }
}

/**
 * 3. Accepts an interest and atomically unlocks the single active conversation.
 * Calls transactional RPC `accept_interest_and_create_conversation`.
 */
export async function acceptInterestAndStartConversation(
  interestId: string,
  myProfileId: string
): Promise<{ success: boolean; conversationId?: string; error?: string }> {
  if (!isSupabaseConfigured || myProfileId === 'user-me') {
    return {
      success: true,
      conversationId: 'conv-active',
    };
  }

  try {
    const { data, error } = await supabase.rpc('accept_interest_and_create_conversation', {
      p_interest_id: interestId,
      p_receiver_profile_id: myProfileId,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      conversationId: data,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to start conversation',
    };
  }
}

/**
 * 4. Politely concludes an active conversation with an honorable reason.
 * Releases both suitors to connect with other prospects.
 */
export async function concludeActiveConversation(
  conversationId: string,
  myProfileId: string,
  reason: string = 'Matrimonial alignment concluded respectfully'
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || myProfileId === 'user-me') {
    return { success: true };
  }

  try {
    const { error } = await supabase.rpc('end_active_conversation', {
      p_conversation_id: conversationId,
      p_ending_profile_id: myProfileId,
      p_reason: reason,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to end conversation' };
  }
}
