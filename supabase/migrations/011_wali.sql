-- ====================================================================
-- Dono Jaha (D O N O   J A H A)
-- Migration 011: Wali & Family Guardian Involvement
-- ====================================================================

-- Wali Role Enum
CREATE TYPE wali_role_enum AS ENUM (
    'viewer',
    'chaperone',
    'manager'
);

-- Wali Relationships Table
CREATE TABLE IF NOT EXISTS wali_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ward_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    wali_account_id UUID REFERENCES user_accounts(id) ON DELETE SET NULL,
    wali_name TEXT NOT NULL,
    relationship_to_ward TEXT NOT NULL, -- Father, Brother, Uncle, Mother, Paternal Grandfather, Guardian
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

CREATE INDEX IF NOT EXISTS idx_wali_ward ON wali_relationships(ward_profile_id);
CREATE INDEX IF NOT EXISTS idx_wali_account ON wali_relationships(wali_account_id);

CREATE TRIGGER trg_wali_relationships_updated_at
BEFORE UPDATE ON wali_relationships
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
