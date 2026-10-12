-- ====================================================================
-- Dono Jaha (D O N O   J A H A)
-- Migration 006: Voice Introductions & Audio Privacy
-- ====================================================================

-- Voice privacy status enum
CREATE TYPE voice_privacy_enum AS ENUM (
    'public',
    'match_only',
    'request_required',
    'private'
);

-- Voice Introductions Table
CREATE TABLE IF NOT EXISTS voice_introductions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    duration_seconds NUMERIC(5,2) NOT NULL,
    mime_type TEXT NOT NULL DEFAULT 'audio/m4a',
    file_size_bytes BIGINT,
    waveform_data JSONB, -- Array of amplitude heights (0-100) for UI render
    prompt_selected TEXT,
    privacy_status voice_privacy_enum NOT NULL DEFAULT 'match_only',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    -- Duration check: min 30 seconds, max 120 seconds per specification
    CONSTRAINT chk_voice_duration CHECK (duration_seconds >= 30 AND duration_seconds <= 120)
);

CREATE INDEX IF NOT EXISTS idx_voice_profile ON voice_introductions(profile_id);

-- Voice Access Requests Table
CREATE TABLE IF NOT EXISTS voice_access_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    owner_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    voice_id UUID REFERENCES voice_introductions(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    responded_at TIMESTAMPTZ,
    CONSTRAINT uq_voice_request UNIQUE (requester_profile_id, owner_profile_id)
);

CREATE TRIGGER trg_voice_updated_at
BEFORE UPDATE ON voice_introductions
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
