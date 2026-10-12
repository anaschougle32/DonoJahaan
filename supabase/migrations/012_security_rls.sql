-- ====================================================================
-- Dono Jaha (D O N O   J A H A)
-- Migration 012: PostgreSQL Row Level Security (RLS) Policies
-- ====================================================================

-- 1. Enable RLS on all tables
ALTER TABLE user_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_basic ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_physical ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_religion ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_career ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_location ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_family ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_marriage_expectations ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_access_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_introductions ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_access_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_preference_weights ENABLE ROW LEVEL SECURITY;
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE wali_relationships ENABLE ROW LEVEL SECURITY;

-- Helper function: get profile IDs belonging to current auth user
CREATE OR REPLACE FUNCTION auth_user_profile_ids()
RETURNS SETOF UUID AS $$
    SELECT p.id
    FROM profiles p
    JOIN user_accounts u ON p.account_id = u.id
    WHERE u.id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Helper function: check if profile belongs to current auth user
CREATE OR REPLACE FUNCTION is_profile_owner(p_profile_id UUID)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1
        FROM profiles p
        JOIN user_accounts u ON p.account_id = u.id
        WHERE p.id = p_profile_id AND u.id = auth.uid()
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- ====================================================================
-- USER ACCOUNTS
-- ====================================================================
CREATE POLICY rls_user_accounts_select ON user_accounts
    FOR SELECT TO authenticated
    USING (id = auth.uid());

CREATE POLICY rls_user_accounts_update ON user_accounts
    FOR UPDATE TO authenticated
    USING (id = auth.uid());

-- ====================================================================
-- PROFILES
-- ====================================================================
CREATE POLICY rls_profiles_select ON profiles
    FOR SELECT TO authenticated
    USING (
        account_id = auth.uid()
        OR (status = 'approved' AND is_discoverable = TRUE)
    );

CREATE POLICY rls_profiles_insert ON profiles
    FOR INSERT TO authenticated
    WITH CHECK (account_id = auth.uid());

CREATE POLICY rls_profiles_update ON profiles
    FOR UPDATE TO authenticated
    USING (account_id = auth.uid());

-- ====================================================================
-- PROFILE DETAILS (READ FOR DISCOVERABLE PROFILES, WRITE FOR OWNER)
-- ====================================================================
CREATE POLICY rls_profile_basic_select ON profile_basic
    FOR SELECT TO authenticated
    USING (
        is_profile_owner(profile_id)
        OR EXISTS (SELECT 1 FROM profiles WHERE id = profile_basic.profile_id AND status = 'approved' AND is_discoverable = TRUE)
    );

CREATE POLICY rls_profile_basic_modify ON profile_basic
    FOR ALL TO authenticated
    USING (is_profile_owner(profile_id))
    WITH CHECK (is_profile_owner(profile_id));

CREATE POLICY rls_profile_physical_select ON profile_physical
    FOR SELECT TO authenticated
    USING (
        is_profile_owner(profile_id)
        OR EXISTS (SELECT 1 FROM profiles WHERE id = profile_physical.profile_id AND status = 'approved' AND is_discoverable = TRUE)
    );

CREATE POLICY rls_profile_physical_modify ON profile_physical
    FOR ALL TO authenticated
    USING (is_profile_owner(profile_id))
    WITH CHECK (is_profile_owner(profile_id));

CREATE POLICY rls_profile_religion_select ON profile_religion
    FOR SELECT TO authenticated
    USING (
        is_profile_owner(profile_id)
        OR EXISTS (SELECT 1 FROM profiles WHERE id = profile_religion.profile_id AND status = 'approved' AND is_discoverable = TRUE)
    );

CREATE POLICY rls_profile_religion_modify ON profile_religion
    FOR ALL TO authenticated
    USING (is_profile_owner(profile_id))
    WITH CHECK (is_profile_owner(profile_id));

CREATE POLICY rls_profile_location_select ON profile_location
    FOR SELECT TO authenticated
    USING (
        is_profile_owner(profile_id)
        OR EXISTS (SELECT 1 FROM profiles WHERE id = profile_location.profile_id AND status = 'approved' AND is_discoverable = TRUE)
    );

CREATE POLICY rls_profile_location_modify ON profile_location
    FOR ALL TO authenticated
    USING (is_profile_owner(profile_id))
    WITH CHECK (is_profile_owner(profile_id));

CREATE POLICY rls_profile_family_select ON profile_family
    FOR SELECT TO authenticated
    USING (
        is_profile_owner(profile_id)
        OR EXISTS (SELECT 1 FROM profiles WHERE id = profile_family.profile_id AND status = 'approved' AND is_discoverable = TRUE)
    );

CREATE POLICY rls_profile_family_modify ON profile_family
    FOR ALL TO authenticated
    USING (is_profile_owner(profile_id))
    WITH CHECK (is_profile_owner(profile_id));

-- ====================================================================
-- PHOTOS & PHOTO ACCESS REQUESTS
-- ====================================================================
CREATE POLICY rls_photos_select ON photos
    FOR SELECT TO authenticated
    USING (
        is_profile_owner(profile_id)
        OR privacy_status IN ('visible', 'blurred')
        OR (
            privacy_status = 'request_required'
            AND EXISTS (
                SELECT 1 FROM photo_access_requests
                WHERE owner_profile_id = photos.profile_id
                  AND requester_profile_id IN (SELECT auth_user_profile_ids())
                  AND status = 'approved'
            )
        )
    );

CREATE POLICY rls_photos_modify ON photos
    FOR ALL TO authenticated
    USING (is_profile_owner(profile_id))
    WITH CHECK (is_profile_owner(profile_id));

CREATE POLICY rls_photo_req_select ON photo_access_requests
    FOR SELECT TO authenticated
    USING (
        is_profile_owner(owner_profile_id)
        OR requester_profile_id IN (SELECT auth_user_profile_ids())
    );

CREATE POLICY rls_photo_req_insert ON photo_access_requests
    FOR INSERT TO authenticated
    WITH CHECK (requester_profile_id IN (SELECT auth_user_profile_ids()));

CREATE POLICY rls_photo_req_update ON photo_access_requests
    FOR UPDATE TO authenticated
    USING (is_profile_owner(owner_profile_id));

-- ====================================================================
-- VOICE INTRODUCTIONS
-- ====================================================================
CREATE POLICY rls_voice_select ON voice_introductions
    FOR SELECT TO authenticated
    USING (
        is_profile_owner(profile_id)
        OR privacy_status = 'public'
        OR (
            privacy_status = 'match_only'
            AND EXISTS (
                SELECT 1 FROM conversations
                WHERE status = 'active'
                  AND (
                    (profile_1_id = voice_introductions.profile_id AND profile_2_id IN (SELECT auth_user_profile_ids()))
                    OR (profile_2_id = voice_introductions.profile_id AND profile_1_id IN (SELECT auth_user_profile_ids()))
                  )
            )
        )
    );

CREATE POLICY rls_voice_modify ON voice_introductions
    FOR ALL TO authenticated
    USING (is_profile_owner(profile_id))
    WITH CHECK (is_profile_owner(profile_id));

-- ====================================================================
-- INTERESTS & SHORTLISTS
-- ====================================================================
CREATE POLICY rls_interests_select ON interests
    FOR SELECT TO authenticated
    USING (
        sender_profile_id IN (SELECT auth_user_profile_ids())
        OR receiver_profile_id IN (SELECT auth_user_profile_ids())
    );

CREATE POLICY rls_interests_insert ON interests
    FOR INSERT TO authenticated
    WITH CHECK (sender_profile_id IN (SELECT auth_user_profile_ids()));

CREATE POLICY rls_interests_update ON interests
    FOR UPDATE TO authenticated
    USING (
        sender_profile_id IN (SELECT auth_user_profile_ids())
        OR receiver_profile_id IN (SELECT auth_user_profile_ids())
    );

CREATE POLICY rls_shortlists_all ON shortlists
    FOR ALL TO authenticated
    USING (profile_id IN (SELECT auth_user_profile_ids()))
    WITH CHECK (profile_id IN (SELECT auth_user_profile_ids()));

-- ====================================================================
-- CONVERSATIONS & MESSAGES
-- ====================================================================
CREATE POLICY rls_conversations_select ON conversations
    FOR SELECT TO authenticated
    USING (
        profile_1_id IN (SELECT auth_user_profile_ids())
        OR profile_2_id IN (SELECT auth_user_profile_ids())
    );

CREATE POLICY rls_conversation_members_select ON conversation_members
    FOR SELECT TO authenticated
    USING (profile_id IN (SELECT auth_user_profile_ids()));

CREATE POLICY rls_messages_select ON messages
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM conversations c
            WHERE c.id = messages.conversation_id
              AND (
                c.profile_1_id IN (SELECT auth_user_profile_ids())
                OR c.profile_2_id IN (SELECT auth_user_profile_ids())
              )
        )
    );

CREATE POLICY rls_messages_insert ON messages
    FOR INSERT TO authenticated
    WITH CHECK (
        sender_profile_id IN (SELECT auth_user_profile_ids())
        AND EXISTS (
            SELECT 1 FROM conversations c
            WHERE c.id = messages.conversation_id
              AND c.status = 'active'
              AND (
                c.profile_1_id = messages.sender_profile_id
                OR c.profile_2_id = messages.sender_profile_id
              )
        )
    );

-- ====================================================================
-- WALI RELATIONSHIPS
-- ====================================================================
CREATE POLICY rls_wali_select ON wali_relationships
    FOR SELECT TO authenticated
    USING (
        is_profile_owner(ward_profile_id)
        OR wali_account_id = auth.uid()
    );

CREATE POLICY rls_wali_modify ON wali_relationships
    FOR ALL TO authenticated
    USING (is_profile_owner(ward_profile_id))
    WITH CHECK (is_profile_owner(ward_profile_id));
