-- ====================================================================
-- Dono Jaha (D O N O   J A H A)
-- Migration 004: Family Structure & Family Members
-- ====================================================================

-- Family Overview Table
CREATE TABLE IF NOT EXISTS profile_family (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    family_values TEXT NOT NULL, -- traditional, moderate, liberal, prefer_not_to_specify
    family_type TEXT NOT NULL, -- nuclear, joint, extended
    economic_status TEXT NOT NULL, -- middle, upper_middle, affluent, prefer_not_to_say
    father_alive BOOLEAN NOT NULL DEFAULT TRUE,
    father_occupation TEXT,
    mother_alive BOOLEAN NOT NULL DEFAULT TRUE,
    mother_occupation TEXT,
    native_place TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Structured Individual Sibling/Family Members Table
CREATE TABLE IF NOT EXISTS family_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    relation_type TEXT NOT NULL, -- brother, sister, other
    full_name TEXT,
    age INT,
    marital_status TEXT NOT NULL, -- married, unmarried, divorced, widowed
    occupation TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_family_members_profile ON family_members(profile_id);

CREATE TRIGGER trg_profile_family_updated_at
BEFORE UPDATE ON profile_family
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
