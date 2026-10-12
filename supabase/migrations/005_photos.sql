-- ====================================================================
-- Dono Jaha (D O N O   J A H A)
-- Migration 005: Photographs, Modesty Privacy States & Access Requests
-- ====================================================================

-- Photo privacy status enum
CREATE TYPE photo_privacy_enum AS ENUM (
    'visible',
    'blurred',
    'private',
    'match_only',
    'request_required'
);

-- Photo access request status enum
CREATE TYPE photo_request_status_enum AS ENUM (
    'pending',
    'approved',
    'rejected',
    'revoked'
);

-- Photos Table
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

-- Photo Access Permissions & Explicit Suitor Requests
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

CREATE INDEX IF NOT EXISTS idx_photo_req_owner ON photo_access_requests(owner_profile_id, status);
CREATE INDEX IF NOT EXISTS idx_photo_req_requester ON photo_access_requests(requester_profile_id);

CREATE TRIGGER trg_photos_updated_at
BEFORE UPDATE ON photos
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
