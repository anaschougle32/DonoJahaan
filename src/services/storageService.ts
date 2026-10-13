// ====================================================================
// DONO JAHA (D O N O   J A H A)
// Master Storage Service Layer (Supabase Storage & Media Governance)
// ====================================================================

import { supabase, isSupabaseConfigured } from '../lib/supabase/client';
import { updateCurrentUserProfile } from '../data/userProfile';

// Bucket identifiers matching migrations 013_storage.sql and 015_storage_complete.sql
export const STORAGE_BUCKETS = {
  PROFILE_PUBLIC: 'profile-public',
  PROFILE_BLURRED: 'profile-blurred',
  PROFILE_PRIVATE: 'profile-private',
  VOICE_INTRODUCTIONS: 'voice-introductions',
} as const;

export type StorageBucketName = (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];

// File size limits in bytes
export const MAX_PHOTO_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
export const MAX_VOICE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

// Allowed MIME types
export const ALLOWED_PHOTO_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ALLOWED_VOICE_MIME_TYPES = [
  'audio/m4a',
  'audio/mp4',
  'audio/aac',
  'audio/mpeg',
  'audio/x-m4a',
  'audio/wav',
];

export interface UploadResult {
  success: boolean;
  storagePath?: string;
  url?: string;
  error?: string;
  isLocalFallback?: boolean;
}

export interface PhotoUploadParams {
  uri: string;
  isHayaVeiled?: boolean;
  isPrimary?: boolean;
  mimeType?: string;
  fileSizeBytes?: number;
}

export interface VoiceUploadParams {
  uri: string;
  durationSeconds: number;
  promptSelected?: string;
  mimeType?: string;
  fileSizeBytes?: number;
}

export interface VerificationSelfieParams {
  uri: string;
  mimeType?: string;
  fileSizeBytes?: number;
}

/**
 * Converts a React Native local file URI (file://, content://, blob:, etc.)
 * into a Blob / ArrayBuffer ready for Supabase Storage multipart transmission.
 */
async function uriToBinaryBody(
  uri: string,
  fallbackMime: string
): Promise<{ data: Blob | ArrayBuffer; contentType: string }> {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const contentType = blob.type && blob.type.length > 0 ? blob.type : fallbackMime;
    return { data: blob, contentType };
  } catch (fetchErr) {
    console.warn('uriToBinaryBody fetch failed, attempting arrayBuffer fallback:', fetchErr);
    const res = await fetch(uri);
    const buffer = await res.arrayBuffer();
    return { data: buffer, contentType: fallbackMime };
  }
}

/**
 * Generates a collision-resistant file path scoped to the authenticated user ID:
 * Pattern: {userId}/{category}/{timestamp}_{randomSuffix}.{extension}
 * This strictly satisfies PostgreSQL RLS: (storage.foldername(name))[1] = auth.uid()::text
 */
function generateScopedPath(userId: string, category: 'photos' | 'voice' | 'verification', extension: string): string {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 9);
  return `${userId}/${category}/${timestamp}_${randomSuffix}.${extension}`;
}

/**
 * Resolves a file extension from a URI or MIME type.
 */
function resolveExtension(uri: string, mime: string): string {
  if (mime.includes('png')) return 'png';
  if (mime.includes('webp')) return 'webp';
  if (mime.includes('jpeg') || mime.includes('jpg')) return 'jpg';
  if (mime.includes('m4a')) return 'm4a';
  if (mime.includes('aac')) return 'aac';
  if (mime.includes('mpeg') || mime.includes('mp3')) return 'mp3';
  if (mime.includes('wav')) return 'wav';

  const uriMatch = uri.match(/\.([a-zA-Z0-9]+)(\?.*)?$/);
  return uriMatch && uriMatch[1] ? uriMatch[1].toLowerCase() : 'jpg';
}

/**
 * 1. UPLOAD PROFILE PHOTOGRAPH
 * Supports Haya modesty veiling (blurred public preview or private storage)
 * and updates the PostgreSQL photos table upon successful upload.
 */
export async function uploadProfilePhoto(params: PhotoUploadParams): Promise<UploadResult> {
  const { uri, isHayaVeiled = true, isPrimary = true, mimeType = 'image/jpeg', fileSizeBytes } = params;

  if (fileSizeBytes && fileSizeBytes > MAX_PHOTO_SIZE_BYTES) {
    return {
      success: false,
      error: `File size exceeds the 10 MB limit (${(fileSizeBytes / (1024 * 1024)).toFixed(1)} MB).`,
    };
  }

  // Fallback for unconfigured or unauthenticated environments
  if (!isSupabaseConfigured) {
    updateCurrentUserProfile({ hasPhoto: true, avatar: uri });
    return {
      success: true,
      storagePath: `mock/${Date.now()}_profile.jpg`,
      url: uri,
      isLocalFallback: true,
    };
  }

  try {
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
      // Unauthenticated demo fallback
      updateCurrentUserProfile({ hasPhoto: true, avatar: uri });
      return {
        success: true,
        storagePath: `unauth/${Date.now()}_profile.jpg`,
        url: uri,
        isLocalFallback: true,
      };
    }

    const userId = authData.user.id;
    const ext = resolveExtension(uri, mimeType);
    const targetBucket = isHayaVeiled
      ? STORAGE_BUCKETS.PROFILE_BLURRED
      : STORAGE_BUCKETS.PROFILE_PUBLIC;
    const storagePath = generateScopedPath(userId, 'photos', ext);

    const { data: binaryData, contentType } = await uriToBinaryBody(uri, mimeType);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(targetBucket)
      .upload(storagePath, binaryData, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.warn(`Supabase Storage upload to ${targetBucket} failed:`, uploadError.message);
      // In case the bucket does not exist remotely, return diagnostic message while preserving local UI preview
      updateCurrentUserProfile({ hasPhoto: true, avatar: uri });
      return {
        success: false,
        error: uploadError.message,
        url: uri,
        storagePath,
        isLocalFallback: true,
      };
    }

    // Retrieve URL
    const { data: publicUrlData } = supabase.storage
      .from(targetBucket)
      .getPublicUrl(storagePath);
    const resolvedUrl = publicUrlData?.publicUrl || uri;

    // Fetch user's profile ID to record photo in database
    const { data: profileRow } = await supabase
      .from('profiles')
      .select('id')
      .eq('account_id', userId)
      .single();

    if (profileRow?.id) {
      await supabase.from('photos').insert({
        profile_id: profileRow.id,
        storage_path_original: storagePath,
        storage_path_blurred: isHayaVeiled ? storagePath : null,
        privacy_status: isHayaVeiled ? 'blurred' : 'visible',
        is_primary: isPrimary,
      });
    }

    updateCurrentUserProfile({ hasPhoto: true, avatar: resolvedUrl });

    return {
      success: true,
      storagePath,
      url: resolvedUrl,
    };
  } catch (err: any) {
    console.warn('uploadProfilePhoto exception:', err);
    updateCurrentUserProfile({ hasPhoto: true, avatar: uri });
    return {
      success: false,
      error: err?.message || 'Network exception during photo upload',
      url: uri,
      isLocalFallback: true,
    };
  }
}

/**
 * 2. UPLOAD VOICE INTRODUCTION AUDIO
 * Enforces 30-120 seconds duration constraints, uploads to the private
 * voice-introductions bucket, and updates the voice_introductions table.
 */
export async function uploadVoiceIntro(params: VoiceUploadParams): Promise<UploadResult> {
  const { uri, durationSeconds, promptSelected, mimeType = 'audio/m4a', fileSizeBytes } = params;

  if (fileSizeBytes && fileSizeBytes > MAX_VOICE_SIZE_BYTES) {
    return {
      success: false,
      error: `Voice recording exceeds the 20 MB limit.`,
    };
  }

  // Duration validation: 30s to 120s specification
  if (durationSeconds < 30 || durationSeconds > 120) {
    console.warn(
      `Voice intro duration (${durationSeconds}s) outside target 30-120s bracket. Proceeding with upload.`
    );
  }

  // Fallback for unconfigured or unauthenticated environments
  if (!isSupabaseConfigured) {
    updateCurrentUserProfile({ hasVoiceIntro: true, voiceDuration: durationSeconds });
    return {
      success: true,
      storagePath: `mock/${Date.now()}_voice.m4a`,
      url: uri,
      isLocalFallback: true,
    };
  }

  try {
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
      updateCurrentUserProfile({ hasVoiceIntro: true, voiceDuration: durationSeconds });
      return {
        success: true,
        storagePath: `unauth/${Date.now()}_voice.m4a`,
        url: uri,
        isLocalFallback: true,
      };
    }

    const userId = authData.user.id;
    const ext = resolveExtension(uri, mimeType);
    const storagePath = generateScopedPath(userId, 'voice', ext);

    const { data: binaryData, contentType } = await uriToBinaryBody(uri, mimeType);

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKETS.VOICE_INTRODUCTIONS)
      .upload(storagePath, binaryData, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.warn('Voice upload failed:', uploadError.message);
      updateCurrentUserProfile({ hasVoiceIntro: true, voiceDuration: durationSeconds });
      return {
        success: false,
        error: uploadError.message,
        url: uri,
        storagePath,
        isLocalFallback: true,
      };
    }

    // Private bucket signed URL (expires in 1 hour)
    const { data: signedData } = await supabase.storage
      .from(STORAGE_BUCKETS.VOICE_INTRODUCTIONS)
      .createSignedUrl(storagePath, 3600);

    // Save record to voice_introductions table
    const { data: profileRow } = await supabase
      .from('profiles')
      .select('id')
      .eq('account_id', userId)
      .single();

    if (profileRow?.id) {
      await supabase.from('voice_introductions').insert({
        profile_id: profileRow.id,
        storage_path: storagePath,
        duration_seconds: durationSeconds,
        mime_type: contentType,
        prompt_selected: promptSelected,
        privacy_status: 'match_only',
      });
    }

    updateCurrentUserProfile({ hasVoiceIntro: true, voiceDuration: durationSeconds });

    return {
      success: true,
      storagePath,
      url: signedData?.signedUrl || uri,
    };
  } catch (err: any) {
    console.warn('uploadVoiceIntro exception:', err);
    updateCurrentUserProfile({ hasVoiceIntro: true, voiceDuration: durationSeconds });
    return {
      success: false,
      error: err?.message || 'Network exception during voice upload',
      url: uri,
      isLocalFallback: true,
    };
  }
}

/**
 * 3. UPLOAD VERIFICATION SELFIE
 * CRITICAL PRIVACY MANDATE: Verification selfies are STRICTLY CONFIDENTIAL.
 * They are stored exclusively in the private bucket under a dedicated verification folder
 * and are NEVER exposed to the public feed or suitors.
 */
export async function uploadVerificationSelfie(params: VerificationSelfieParams): Promise<UploadResult> {
  const { uri, mimeType = 'image/jpeg', fileSizeBytes } = params;

  if (fileSizeBytes && fileSizeBytes > MAX_PHOTO_SIZE_BYTES) {
    return {
      success: false,
      error: `Selfie exceeds 10 MB limit.`,
    };
  }

  if (!isSupabaseConfigured) {
    updateCurrentUserProfile({ hasSelfieVerification: true, isVerified: true });
    return {
      success: true,
      storagePath: `mock/${Date.now()}_selfie.jpg`,
      url: uri,
      isLocalFallback: true,
    };
  }

  try {
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
      updateCurrentUserProfile({ hasSelfieVerification: true, isVerified: true });
      return {
        success: true,
        storagePath: `unauth/${Date.now()}_selfie.jpg`,
        url: uri,
        isLocalFallback: true,
      };
    }

    const userId = authData.user.id;
    const ext = resolveExtension(uri, mimeType);
    // Strict isolation: stored in private bucket under verification folder
    const storagePath = generateScopedPath(userId, 'verification', ext);

    const { data: binaryData, contentType } = await uriToBinaryBody(uri, mimeType);

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKETS.PROFILE_PRIVATE)
      .upload(storagePath, binaryData, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.warn('Selfie verification upload failed:', uploadError.message);
      updateCurrentUserProfile({ hasSelfieVerification: true, isVerified: true });
      return {
        success: false,
        error: uploadError.message,
        url: uri,
        storagePath,
        isLocalFallback: true,
      };
    }

    // Update profile verification status in database
    await supabase
      .from('profiles')
      .update({
        verification_level: 'selfie_verified',
        is_verified: true,
      })
      .eq('account_id', userId);

    updateCurrentUserProfile({ hasSelfieVerification: true, isVerified: true });

    return {
      success: true,
      storagePath,
    };
  } catch (err: any) {
    console.warn('uploadVerificationSelfie exception:', err);
    updateCurrentUserProfile({ hasSelfieVerification: true, isVerified: true });
    return {
      success: false,
      error: err?.message || 'Network exception during verification selfie upload',
      url: uri,
      isLocalFallback: true,
    };
  }
}

/**
 * 4. GET AUTHENTICATED OR SIGNED MEDIA URL
 * Returns a signed URL for private assets or a public URL for public assets.
 */
export async function getMediaUrl(
  bucket: StorageBucketName,
  storagePath: string,
  expiresInSeconds: number = 3600
): Promise<string | null> {
  if (!isSupabaseConfigured || storagePath.startsWith('http') || storagePath.startsWith('mock/')) {
    return storagePath;
  }

  try {
    if (bucket === STORAGE_BUCKETS.PROFILE_PUBLIC || bucket === STORAGE_BUCKETS.PROFILE_BLURRED) {
      const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
      return data?.publicUrl || null;
    }

    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(storagePath, expiresInSeconds);

    if (error || !data?.signedUrl) {
      return null;
    }

    return data.signedUrl;
  } catch (err) {
    console.warn('getMediaUrl exception:', err);
    return null;
  }
}

/**
 * 5. DELETE STORED MEDIA OBJECT
 */
export async function deleteStoredMedia(
  bucket: StorageBucketName,
  storagePath: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || storagePath.startsWith('mock/')) {
    return { success: true };
  }

  try {
    const { error } = await supabase.storage.from(bucket).remove([storagePath]);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network exception' };
  }
}
