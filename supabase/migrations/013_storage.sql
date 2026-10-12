-- ====================================================================
-- Dono Jaha (D O N O   J A H A)
-- Migration 013: Supabase Storage Buckets & Storage Policies
-- ====================================================================

-- Create storage buckets if they do not exist
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('profile-public', 'profile-public', TRUE),
    ('profile-blurred', 'profile-blurred', TRUE),
    ('profile-private', 'profile-private', FALSE),
    ('voice-introductions', 'voice-introductions', FALSE)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy 1: Authenticated users can upload to their own folder in private bucket
CREATE POLICY "Users can upload private photos" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'profile-private'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- Storage Policy 2: Users can view their own private photos
CREATE POLICY "Users can read own private photos" ON storage.objects
    FOR SELECT TO authenticated
    USING (
        bucket_id = 'profile-private'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- Storage Policy 3: Public & Blurred buckets are publicly readable
CREATE POLICY "Public profile photos readable" ON storage.objects
    FOR SELECT TO public
    USING (bucket_id IN ('profile-public', 'profile-blurred'));

-- Storage Policy 4: Authenticated users can upload voice introductions
CREATE POLICY "Users can upload voice intro" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'voice-introductions'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- Storage Policy 5: Users can read own voice intro
CREATE POLICY "Users can read own voice intro" ON storage.objects
    FOR SELECT TO authenticated
    USING (
        bucket_id = 'voice-introductions'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );
