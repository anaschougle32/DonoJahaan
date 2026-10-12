-- ====================================================================
-- Dono Jaha (D O N O   J A H A)
-- Migration 002: User Accounts, Profiles, and Profile Creators
-- ====================================================================

-- Profile status enum
CREATE TYPE profile_status_enum AS ENUM (
    'draft',
    'pending_review',
    'approved',
    'rejected',
    'suspended',
    'deleted'
);

-- Profile creator role enum
CREATE TYPE profile_creator_role_enum AS ENUM (
    'myself',
    'parent',
    'sibling',
    'relative',
    'guardian_wali',
    'friend',
    'other'
);

-- Gender enum
CREATE TYPE gender_enum AS ENUM (
    'male',
    'female'
);

-- Core user account metadata (separate from matrimonial profile)
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

-- Primary Matrimonial Profiles table
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
    verification_level TEXT NOT NULL DEFAULT 'unverified', -- unverified, phone_verified, selfie_verified, id_verified
    is_discoverable BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_account_id ON profiles(account_id);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_gender ON profiles(gender);

-- Trigger for updated_at
CREATE TRIGGER trg_user_accounts_updated_at
BEFORE UPDATE ON user_accounts
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
