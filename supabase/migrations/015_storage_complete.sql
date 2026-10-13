-- ====================================================================
-- Dono Jaha (D O N O   J A H A)
-- Migration 015: Complete Supabase Storage Buckets & Policies Setup
-- ====================================================================

-- 1. Create storage buckets idempotently
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    (
        'profile-public',
        'profile-public',
        TRUE,
        10485760, -- 10 MB limit
        ARRAY['image/jpeg', 'image/png', 'image/webp']
    ),
    (
        'profile-blurred',
        'profile-blurred',
        TRUE,
        10485760, -- 10 MB limit
        ARRAY['image/jpeg', 'image/png', 'image/webp']
    ),
    (
        'profile-private',
        'profile-private',
        FALSE,
        10485760, -- 10 MB limit (Private photos & confidential verification selfies)
        ARRAY['image/jpeg', 'image/png', 'image/webp']
    ),
    (
        'voice-introductions',
        'voice-introductions',
        FALSE,
        20971520, -- 20 MB limit (Audio recordings 30s-120s)
        ARRAY['audio/m4a', 'audio/mp4', 'audio/aac', 'audio/mpeg', 'audio/x-m4a', 'audio/wav']
    )
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Drop existing conflicting policies if re-running
DROP POLICY IF EXISTS "Public profile photos readable" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload public photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own public photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own public photos" ON storage.objects;

DROP POLICY IF EXISTS "Blurred profile photos readable" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload blurred photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own blurred photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own blurred photos" ON storage.objects;

DROP POLICY IF EXISTS "Users can upload private photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can read own private photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own private photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own private photos" ON storage.objects;

DROP POLICY IF EXISTS "Users can upload voice intro" ON storage.objects;
DROP POLICY IF EXISTS "Users can read own voice intro" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own voice intro" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own voice intro" ON storage.objects;

-- 3. Bucket: profile-public (Publicly visible profile photos)
CREATE POLICY "Public profile photos readable" ON storage.objects
    FOR SELECT TO public
    USING (bucket_id = 'profile-public');

CREATE POLICY "Users can upload public photos" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'profile-public'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can update own public photos" ON storage.objects
    FOR UPDATE TO authenticated
    USING (
        bucket_id = 'profile-public'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can delete own public photos" ON storage.objects
    FOR DELETE TO authenticated
    USING (
        bucket_id = 'profile-public'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- 4. Bucket: profile-blurred (Haya veil / blurred previews)
CREATE POLICY "Blurred profile photos readable" ON storage.objects
    FOR SELECT TO public
    USING (bucket_id = 'profile-blurred');

CREATE POLICY "Users can upload blurred photos" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'profile-blurred'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can update own blurred photos" ON storage.objects
    FOR UPDATE TO authenticated
    USING (
        bucket_id = 'profile-blurred'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can delete own blurred photos" ON storage.objects
    FOR DELETE TO authenticated
    USING (
        bucket_id = 'profile-blurred'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- 5. Bucket: profile-private (Private photos, request-only photos, and confidential verification selfies)
CREATE POLICY "Users can upload private photos" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'profile-private'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can read own private photos" ON storage.objects
    FOR SELECT TO authenticated
    USING (
        bucket_id = 'profile-private'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can update own private photos" ON storage.objects
    FOR UPDATE TO authenticated
    USING (
        bucket_id = 'profile-private'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can delete own private photos" ON storage.objects
    FOR DELETE TO authenticated
    USING (
        bucket_id = 'profile-private'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- 6. Bucket: voice-introductions (Private audio recordings)
CREATE POLICY "Users can upload voice intro" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'voice-introductions'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can read own voice intro" ON storage.objects
    FOR SELECT TO authenticated
    USING (
        bucket_id = 'voice-introductions'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can update own voice intro" ON storage.objects
    FOR UPDATE TO authenticated
    USING (
        bucket_id = 'voice-introductions'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can delete own voice intro" ON storage.objects
    FOR DELETE TO authenticated
    USING (
        bucket_id = 'voice-introductions'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );
