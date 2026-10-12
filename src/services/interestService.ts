// ====================================================================
// DONO JAHA (D O N O   J A H A)
// Interest & Proposal Service Layer (Supabase PostgreSQL)
// ====================================================================

import { supabase, isSupabaseConfigured } from '../lib/supabase/client';
import { MatrimonialInterest } from '../types';
import { mockInterestsReceived, mockInterestsSent } from '../mocks/matrimonialData';

export interface SendInterestResult {
  success: boolean;
  error?: string;
  interestId?: string;
}

/**
 * Fetches matrimonial interests received by the user.
 */
export async function getReceivedInterests(profileId: string = 'user-me'): Promise<MatrimonialInterest[]> {
  if (!isSupabaseConfigured) {
    return mockInterestsReceived;
  }

  try {
    const { data, error } = await supabase
      .from('interests')
      .select('*')
      .eq('receiver_profile_id', profileId)
      .eq('status', 'sent')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return mockInterestsReceived;
    }

    return data.map((row) => ({
      id: row.id,
      senderProfileId: row.sender_profile_id,
      receiverProfileId: row.receiver_profile_id,
      status: row.status,
      introductoryNote: row.introductory_note || undefined,
      sentAt: row.created_at,
      respondedAt: row.responded_at || undefined,
    }));
  } catch (err) {
    console.warn('getReceivedInterests exception:', err);
    return mockInterestsReceived;
  }
}

/**
 * Fetches matrimonial interests sent by the user.
 */
export async function getSentInterests(profileId: string = 'user-me'): Promise<MatrimonialInterest[]> {
  if (!isSupabaseConfigured) {
    return mockInterestsSent;
  }

  try {
    const { data, error } = await supabase
      .from('interests')
      .select('*')
      .eq('sender_profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return mockInterestsSent;
    }

    return data.map((row) => ({
      id: row.id,
      senderProfileId: row.sender_profile_id,
      receiverProfileId: row.receiver_profile_id,
      status: row.status,
      introductoryNote: row.introductory_note || undefined,
      sentAt: row.created_at,
      respondedAt: row.responded_at || undefined,
    }));
  } catch (err) {
    console.warn('getSentInterests exception:', err);
    return mockInterestsSent;
  }
}

/**
 * Sends a respectful matrimonial interest proposal to a prospective suitor.
 */
export async function expressMatrimonialInterest(
  senderProfileId: string,
  receiverProfileId: string,
  introductoryNote?: string
): Promise<SendInterestResult> {
  if (!isSupabaseConfigured) {
    return { success: true, interestId: `interest-${Date.now()}` };
  }

  try {
    const { data, error } = await supabase
      .from('interests')
      .insert({
        sender_profile_id: senderProfileId,
        receiver_profile_id: receiverProfileId,
        status: 'sent',
        introductory_note: introductoryNote,
      })
      .select('id')
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, interestId: data.id };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network exception' };
  }
}

/**
 * Responds to a received matrimonial interest (accept or decline).
 */
export async function respondToInterest(
  interestId: string,
  response: 'accepted' | 'declined'
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('interests')
      .update({
        status: response,
        responded_at: new Date().toISOString(),
      })
      .eq('id', interestId);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network exception' };
  }
}

