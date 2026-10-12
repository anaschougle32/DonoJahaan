-- ====================================================================
-- Dono Jaha (D O N O   J A H A)
-- Migration 008: Interest State Machine and Shortlists
-- ====================================================================

-- Interest status enum (strict state machine)
CREATE TYPE interest_status_enum AS ENUM (
    'sent',
    'accepted',
    'rejected',
    'withdrawn',
    'expired'
);

-- Interests Table
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

CREATE INDEX IF NOT EXISTS idx_interests_receiver ON interests(receiver_profile_id, status);
CREATE INDEX IF NOT EXISTS idx_interests_sender ON interests(sender_profile_id, status);

-- Shortlists Table (bookmarking without conversation creation)
CREATE TABLE IF NOT EXISTS shortlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    shortlisted_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_different_shortlist CHECK (profile_id <> shortlisted_profile_id),
    CONSTRAINT uq_shortlist_pair UNIQUE (profile_id, shortlisted_profile_id)
);

CREATE INDEX IF NOT EXISTS idx_shortlists_profile ON shortlists(profile_id);
