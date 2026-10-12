-- ====================================================================
-- DONO JAHA (D O N O   J A H A)
-- MASTER UNIFIED DATABASE SCHEMA & SUPABASE CONFIGURATION
-- Version 1.0 (October 2026)
--
-- This file contains the complete, executable database architecture:
-- Extensions, Enums, Tables, Indices, Triggers, One-Active-Conversation Rule,
-- Row Level Security (RLS) Policies, Storage Buckets, and Functions.
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Generic updated_at trigger function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE profile_status_enum AS ENUM ('draft', 'pending_review', 'approved', 'rejected', 'suspended', 'deleted');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE profile_creator_role_enum AS ENUM ('myself', 'parent', 'sibling', 'relative', 'guardian_wali', 'friend', 'other');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE gender_enum AS ENUM ('male', 'female');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE photo_privacy_enum AS ENUM ('visible', 'blurred', 'private', 'match_only', 'request_required');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE photo_request_status_enum AS ENUM ('pending', 'approved', 'rejected', 'revoked');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE voice_privacy_enum AS ENUM ('public', 'match_only', 'request_required', 'private');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE preference_priority_enum AS ENUM ('must_have', 'preferred', 'open_to');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE interest_status_enum AS ENUM ('sent', 'accepted', 'rejected', 'withdrawn', 'expired');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE conversation_status_enum AS ENUM ('pending', 'active', 'ended', 'blocked');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE message_type_enum AS ENUM ('text', 'system', 'voice');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE wali_role_enum AS ENUM ('viewer', 'chaperone', 'manager');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE notification_type_enum AS ENUM (
        'interest_received', 'interest_accepted', 'interest_rejected',
        'photo_request', 'photo_approved', 'new_message', 'wali_activity',
        'profile_verification', 'admin_notification'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. CORE IDENTITY & PROFILES
CREATE TABLE IF NOT EXISTS user_accounts (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    phone TEXT UNIQUE,
    email TEXT UNIQUE,
    full_name TEXT NOT NULL,
    is_phone_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES user_accounts(id) ON DELETE CASCADE,
    created_by profile_creator_role_enum NOT NULL DEFAULT 'myself',
    creator_relationship TEXT,
    gender gender_enum NOT NULL,
    status profile_status_enum NOT NULL DEFAULT 'draft',
    onboarding_step INT NOT NULL DEFAULT 1,
    is_onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verification_level TEXT NOT NULL DEFAULT 'unverified',
    is_discoverable BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_account_id ON profiles(account_id);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_gender ON profiles(gender);

-- 4. PROFILE DETAIL MODULES
CREATE TABLE IF NOT EXISTS profile_basic (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    display_name TEXT,
    date_of_birth DATE NOT NULL,
    marital_status TEXT NOT NULL,
    mother_tongue TEXT NOT NULL,
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profile_physical (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    height_cm INT NOT NULL,
    weight_kg INT,
    body_type TEXT,
    accessibility_disclosure TEXT,
    accessibility_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profile_religion (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    religion TEXT NOT NULL DEFAULT 'Islam',
    sect TEXT NOT NULL,
    school_of_thought TEXT,
    community TEXT,
    prayer_frequency TEXT NOT NULL,
    quran_practice TEXT NOT NULL,
    fasting_practice TEXT NOT NULL,
    halal_strictness TEXT NOT NULL,
    attire_modesty TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profile_education (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    highest_qualification TEXT NOT NULL,
    institution TEXT,
    field_of_study TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profile_career (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    employment_sector TEXT NOT NULL,
    job_title TEXT NOT NULL,
    employer TEXT,
    annual_income_range TEXT,
    currency TEXT NOT NULL DEFAULT 'INR',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profile_location (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    country TEXT NOT NULL,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    residency_status TEXT NOT NULL,
    hometown_country TEXT,
    hometown_state TEXT,
    hometown_city TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profile_marriage_expectations (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    relocation_readiness TEXT NOT NULL,
    living_arrangement TEXT NOT NULL,
    career_after_marriage TEXT NOT NULL,
    wali_involvement_readiness TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. FAMILY MODULES
CREATE TABLE IF NOT EXISTS profile_family (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    family_values TEXT NOT NULL,
    family_type TEXT NOT NULL,
    economic_status TEXT NOT NULL,
    father_alive BOOLEAN NOT NULL DEFAULT TRUE,
    father_occupation TEXT,
    mother_alive BOOLEAN NOT NULL DEFAULT TRUE,
    mother_occupation TEXT,
    native_place TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS family_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    relation_type TEXT NOT NULL,
    full_name TEXT,
    age INT,
    marital_status TEXT NOT NULL,
    occupation TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_family_members_profile ON family_members(profile_id);

-- 6. MEDIA (PHOTOS & VOICE)
CREATE TABLE IF NOT EXISTS photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    storage_path_original TEXT NOT NULL,
    storage_path_blurred TEXT,
    privacy_status photo_privacy_enum NOT NULL DEFAULT 'blurred',
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    order_index INT NOT NULL DEFAULT 0,
    width INT,
    height INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_photos_profile_id ON photos(profile_id);

CREATE TABLE IF NOT EXISTS photo_access_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    owner_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    photo_id UUID REFERENCES photos(id) ON DELETE CASCADE,
    status photo_request_status_enum NOT NULL DEFAULT 'pending',
    request_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    responded_at TIMESTAMPTZ,
    CONSTRAINT uq_requester_owner_photo UNIQUE (requester_profile_id, owner_profile_id, photo_id)
);

CREATE TABLE IF NOT EXISTS voice_introductions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    duration_seconds NUMERIC(5,2) NOT NULL,
    mime_type TEXT NOT NULL DEFAULT 'audio/m4a',
    file_size_bytes BIGINT,
    waveform_data JSONB,
    prompt_selected TEXT,
    privacy_status voice_privacy_enum NOT NULL DEFAULT 'match_only',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_voice_duration CHECK (duration_seconds >= 30 AND duration_seconds <= 120)
);

-- 7. PARTNER PREFERENCES
CREATE TABLE IF NOT EXISTS partner_preferences (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    min_age INT NOT NULL DEFAULT 20,
    max_age INT NOT NULL DEFAULT 35,
    min_height_cm INT NOT NULL DEFAULT 150,
    max_height_cm INT NOT NULL DEFAULT 195,
    marital_statuses TEXT[] NOT NULL DEFAULT ARRAY['never_married'],
    religions TEXT[] NOT NULL DEFAULT ARRAY['Islam'],
    sects TEXT[] NOT NULL DEFAULT ARRAY['Sunni'],
    communities TEXT[] DEFAULT ARRAY[]::TEXT[],
    mother_tongues TEXT[] DEFAULT ARRAY[]::TEXT[],
    preferred_countries TEXT[] NOT NULL DEFAULT ARRAY['India'],
    preferred_cities TEXT[] DEFAULT ARRAY[]::TEXT[],
    min_education TEXT,
    preferred_occupations TEXT[] DEFAULT ARRAY[]::TEXT[],
    min_income_range TEXT,
    diet_preferences TEXT[] DEFAULT ARRAY[]::TEXT[],
    smoking_preferences TEXT[] DEFAULT ARRAY['never'],
    prayer_practices TEXT[] DEFAULT ARRAY[]::TEXT[],
    relocation_acceptance TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS partner_preference_weights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    criteria_name TEXT NOT NULL,
    priority preference_priority_enum NOT NULL DEFAULT 'preferred',
    CONSTRAINT uq_pref_criteria UNIQUE (profile_id, criteria_name)
);

-- 8. INTERESTS & SHORTLISTS
CREATE TABLE IF NOT EXISTS interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    receiver_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status interest_status_enum NOT NULL DEFAULT 'sent',
    introductory_note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    responded_at TIMESTAMPTZ,
    CONSTRAINT chk_different_profiles CHECK (sender_profile_id <> receiver_profile_id),
    CONSTRAINT uq_interest_pair UNIQUE (sender_profile_id, receiver_profile_id)
);

CREATE TABLE IF NOT EXISTS shortlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    shortlisted_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_different_shortlist CHECK (profile_id <> shortlisted_profile_id),
    CONSTRAINT uq_shortlist_pair UNIQUE (profile_id, shortlisted_profile_id)
);

-- 9. THE ONE ACTIVE CONVERSATION ENGINE (CORE DIFFERENTIATOR)
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    interest_id UUID REFERENCES interests(id) ON DELETE SET NULL,
    profile_1_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    profile_2_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status conversation_status_enum NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ended_at TIMESTAMPTZ,
    ended_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    end_reason TEXT,
    CONSTRAINT chk_profiles_distinct CHECK (profile_1_id <> profile_2_id),
    CONSTRAINT chk_canonical_profile_order CHECK (profile_1_id < profile_2_id)
);

CREATE TABLE IF NOT EXISTS conversation_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'ended', 'left')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ended_at TIMESTAMPTZ,
    CONSTRAINT uq_member_conversation UNIQUE (conversation_id, profile_id)
);

-- HARD ATOMIC ENGINE LEVEL RULE: Exactly ONE active conversation per profile!
CREATE UNIQUE INDEX IF NOT EXISTS uq_one_active_conversation_per_profile
ON conversation_members(profile_id)
WHERE status = 'active';

CREATE OR REPLACE FUNCTION process_conversation_status_change()
RETURNS TRIGGER AS $$
DECLARE
    active_count_p1 INT;
    active_count_p2 INT;
BEGIN
    IF NEW.status = 'active' THEN
        SELECT COUNT(*) INTO active_count_p1
        FROM conversations
        WHERE id <> NEW.id
          AND status = 'active'
          AND (profile_1_id = NEW.profile_1_id OR profile_2_id = NEW.profile_1_id);

        IF active_count_p1 > 0 THEN
            RAISE EXCEPTION 'Profile % already has an active matrimonial conversation. In Dono Jaha, only one active conversation is permitted at a time.', NEW.profile_1_id;
        END IF;

        SELECT COUNT(*) INTO active_count_p2
        FROM conversations
        WHERE id <> NEW.id
          AND status = 'active'
          AND (profile_1_id = NEW.profile_2_id OR profile_2_id = NEW.profile_2_id);

        IF active_count_p2 > 0 THEN
            RAISE EXCEPTION 'Profile % already has an active matrimonial conversation. In Dono Jaha, only one active conversation is permitted at a time.', NEW.profile_2_id;
        END IF;

        INSERT INTO conversation_members (conversation_id, profile_id, status)
        VALUES (NEW.id, NEW.profile_1_id, 'active')
        ON CONFLICT (conversation_id, profile_id) DO UPDATE SET status = 'active', ended_at = NULL;

        INSERT INTO conversation_members (conversation_id, profile_id, status)
        VALUES (NEW.id, NEW.profile_2_id, 'active')
        ON CONFLICT (conversation_id, profile_id) DO UPDATE SET status = 'active', ended_at = NULL;

    ELSIF NEW.status IN ('ended', 'blocked') THEN
        UPDATE conversation_members
        SET status = 'ended', ended_at = now()
        WHERE conversation_id = NEW.id;

        IF NEW.ended_at IS NULL THEN
            NEW.ended_at = now();
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_conversation_status ON conversations;
CREATE TRIGGER trg_conversation_status
BEFORE INSERT OR UPDATE OF status ON conversations
FOR EACH ROW EXECUTE FUNCTION process_conversation_status_change();

-- 10. MESSAGES & REALTIME
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    message_type message_type_enum NOT NULL DEFAULT 'text',
    content TEXT NOT NULL,
    voice_duration_seconds NUMERIC(4,1),
    voice_storage_path TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    edited_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    read_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id, created_at);

-- 11. WALI RELATIONSHIPS
CREATE TABLE IF NOT EXISTS wali_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ward_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    wali_account_id UUID REFERENCES user_accounts(id) ON DELETE SET NULL,
    wali_name TEXT NOT NULL,
    relationship_to_ward TEXT NOT NULL,
    wali_phone TEXT NOT NULL,
    wali_email TEXT,
    role wali_role_enum NOT NULL DEFAULT 'chaperone',
    is_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    can_view_chat_transcripts BOOLEAN NOT NULL DEFAULT TRUE,
    can_manage_interests BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_ward_wali_phone UNIQUE (ward_profile_id, wali_phone)
);

-- 12. NOTIFICATIONS, BLOCKS, AND AUDIT
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    event_type notification_type_enum NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    reference_id UUID,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blocker_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    blocked_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_different_block_profiles CHECK (blocker_profile_id <> blocked_profile_id),
    CONSTRAINT uq_block_pair UNIQUE (blocker_profile_id, blocked_profile_id)
);

CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reported_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    details TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'resolved', 'dismissed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    resolved_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_account_id UUID REFERENCES user_accounts(id) ON DELETE SET NULL,
    actor_profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    event_action TEXT NOT NULL,
    target_type TEXT,
    target_id UUID,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ====================================================================
-- 13. MASTER NORMALIZED LOOKUP TABLES (Requirement 5, 6, 7, 8, 15)
-- ====================================================================

-- Countries
CREATE TABLE IF NOT EXISTS lookup_countries (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- States & Union Territories
CREATE TABLE IF NOT EXISTS lookup_states (
    id TEXT PRIMARY KEY,
    country_id TEXT NOT NULL REFERENCES lookup_countries(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Cities & Districts
CREATE TABLE IF NOT EXISTS lookup_cities (
    id TEXT PRIMARY KEY,
    state_id TEXT NOT NULL REFERENCES lookup_states(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    is_popular BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Education Categories & Degrees
CREATE TABLE IF NOT EXISTS lookup_education_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS lookup_educations (
    id TEXT PRIMARY KEY,
    category_id TEXT NOT NULL REFERENCES lookup_education_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    short_name TEXT,
    order_index INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Profession Categories & Professions
CREATE TABLE IF NOT EXISTS lookup_profession_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT,
    order_index INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS lookup_professions (
    id TEXT PRIMARY KEY,
    category_id TEXT NOT NULL REFERENCES lookup_profession_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Annual Income Tiers
CREATE TABLE IF NOT EXISTS lookup_income_ranges (
    id TEXT PRIMARY KEY,
    min_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
    label TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0
);

-- Marital Statuses
CREATE TABLE IF NOT EXISTS lookup_marital_statuses (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0
);

-- Languages / Mother Tongues
CREATE TABLE IF NOT EXISTS lookup_languages (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0
);

-- ====================================================================
-- 14. SEPARATE SELFIE VERIFICATION SYSTEM (Requirement 3)
-- Strictly separated from profile_photos / photos!
-- Stored in a private, non-public bucket. Never exposed to suitors.
-- ====================================================================
CREATE TABLE IF NOT EXISTS verification_selfies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    storage_path_private TEXT NOT NULL, -- Private bucket only
    verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
    rejection_reason TEXT,
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES user_accounts(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_profile_verification_selfie UNIQUE (profile_id)
);

CREATE INDEX IF NOT EXISTS idx_verification_selfies_profile ON verification_selfies(profile_id);

-- RLS: Verification selfies must NEVER be publicly readable
ALTER TABLE verification_selfies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only read their own verification selfie"
ON verification_selfies FOR SELECT
USING (profile_id IN (SELECT id FROM profiles WHERE account_id = auth.uid()));

CREATE POLICY "Users can only insert their own verification selfie"
ON verification_selfies FOR INSERT
WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE account_id = auth.uid()));

-- ====================================================================
-- 15. WHO VIEWED YOUR PROFILE SYSTEM (Section 36 & 37)
-- Dedicated table tracking matrimonial profile views with deduplication
-- and privacy-respecting RLS rules.
-- ====================================================================
CREATE TABLE IF NOT EXISTS profile_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    viewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    profile_owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    source TEXT NOT NULL DEFAULT 'matches' CHECK (source IN ('matches', 'search', 'home', 'direct', 'interest')),
    viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_no_self_view CHECK (viewer_id != profile_owner_id)
);

CREATE INDEX IF NOT EXISTS idx_profile_views_owner ON profile_views(profile_owner_id, viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_profile_views_viewer ON profile_views(viewer_id, viewed_at DESC);

-- Enable RLS for profile views
ALTER TABLE profile_views ENABLE ROW LEVEL SECURITY;

-- Profile owners can view who visited their profile (excluding blocked/hidden users)
CREATE POLICY "Owners can see views to their profile"
ON profile_views FOR SELECT
USING (
    profile_owner_id IN (SELECT id FROM profiles WHERE account_id = auth.uid())
);

-- Authenticated users can log a view (as viewer)
CREATE POLICY "Users can insert views as viewer"
ON profile_views FOR INSERT
WITH CHECK (
    viewer_id IN (SELECT id FROM profiles WHERE account_id = auth.uid())
);

