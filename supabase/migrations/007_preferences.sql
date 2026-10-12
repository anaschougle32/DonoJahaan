-- ====================================================================
-- Dono Jaha (D O N O   J A H A)
-- Migration 007: Partner Preferences & Hard vs Soft Priority Logic
-- ====================================================================

-- Partner Preference Weight Priority Enum
CREATE TYPE preference_priority_enum AS ENUM (
    'must_have',
    'preferred',
    'open_to'
);

-- Core Partner Preferences Table
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

-- Hard vs Soft Priority Weighting per Criteria
CREATE TABLE IF NOT EXISTS partner_preference_weights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    criteria_name TEXT NOT NULL, -- e.g. age, sect, location, education, smoking, relocation
    priority preference_priority_enum NOT NULL DEFAULT 'preferred',
    CONSTRAINT uq_pref_criteria UNIQUE (profile_id, criteria_name)
);

CREATE TRIGGER trg_partner_preferences_updated_at
BEFORE UPDATE ON partner_preferences
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
