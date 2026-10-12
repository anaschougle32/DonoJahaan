-- ====================================================================
-- Dono Jaha (D O N O   J A H A)
-- Migration 003: Modular Profile Detail Tables
-- ====================================================================

-- 1. Basic Profile Details
CREATE TABLE IF NOT EXISTS profile_basic (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    display_name TEXT,
    date_of_birth DATE NOT NULL,
    marital_status TEXT NOT NULL, -- never_married, divorced, widowed, awaiting_divorce, annulled
    mother_tongue TEXT NOT NULL,
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Physical & Health Details
CREATE TABLE IF NOT EXISTS profile_physical (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    height_cm INT NOT NULL,
    weight_kg INT,
    body_type TEXT, -- slim, average, athletic, heavy
    accessibility_disclosure TEXT, -- no, yes, discuss_privately
    accessibility_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Islamic & Religious Practice Details
CREATE TABLE IF NOT EXISTS profile_religion (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    religion TEXT NOT NULL DEFAULT 'Islam',
    sect TEXT NOT NULL, -- Sunni, Shia, Other
    school_of_thought TEXT, -- Hanafi, Shafi'i, Maliki, Hanbali, Jafari, Ismaili, Salafi, Ahle-Hadith, Sufi
    community TEXT, -- Sheikh, Syed, Pathan, Ansari, Qureshi, Mughal, Memon, etc.
    prayer_frequency TEXT NOT NULL, -- prays_5_times_regularly, usually_prays, sometimes, only_jummah, learning, prefer_not_to_say
    quran_practice TEXT NOT NULL, -- daily, frequently, occasionally, hafiz_hafiza, learning, prefer_not_to_say
    fasting_practice TEXT NOT NULL, -- always_ramadan, usually, sometimes, medical_exemption, prefer_not_to_say
    halal_strictness TEXT NOT NULL, -- strictly_halal, halal_preferred, halal_or_veg_outside
    attire_modesty TEXT, -- female: hijab, niqab, abaya, modest_clothing, no_hijab; male: clean_shaven, trimmed_beard, full_beard
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Education & Academic Background
CREATE TABLE IF NOT EXISTS profile_education (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    highest_qualification TEXT NOT NULL, -- high_school, diploma, bachelors, masters, mphil, phd, professional_degree
    institution TEXT,
    field_of_study TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Career & Financial Background
CREATE TABLE IF NOT EXISTS profile_career (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    employment_sector TEXT NOT NULL, -- private, government, business_self_employed, defense, ngo, student, homemaker, not_employed, retired
    job_title TEXT NOT NULL,
    employer TEXT,
    annual_income_range TEXT, -- below_2_lakh, 2_5_lakh, 5_10_lakh, 10_20_lakh, 20_30_lakh, 30_50_lakh, 50_lakh_plus, prefer_not_to_say
    currency TEXT NOT NULL DEFAULT 'INR',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Geographical Location & Residency
CREATE TABLE IF NOT EXISTS profile_location (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    country TEXT NOT NULL,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    residency_status TEXT NOT NULL, -- citizen, permanent_resident, work_permit, student_visa, other
    hometown_country TEXT,
    hometown_state TEXT,
    hometown_city TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Marriage Expectations & Future Plans
CREATE TABLE IF NOT EXISTS profile_marriage_expectations (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    relocation_readiness TEXT NOT NULL, -- willing_to_relocate, prefer_current_city, expect_partner_to_relocate, open_to_discussion
    living_arrangement TEXT NOT NULL, -- independent_with_spouse, with_parents, joint_family, open_to_discussion
    career_after_marriage TEXT NOT NULL, -- full_time, part_time, homemaker, open_to_discussion
    wali_involvement_readiness TEXT NOT NULL, -- immediately, before_meeting, after_compatibility, optional
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Triggers for updated_at
CREATE TRIGGER trg_profile_basic_updated_at BEFORE UPDATE ON profile_basic FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_profile_physical_updated_at BEFORE UPDATE ON profile_physical FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_profile_religion_updated_at BEFORE UPDATE ON profile_religion FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_profile_education_updated_at BEFORE UPDATE ON profile_education FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_profile_career_updated_at BEFORE UPDATE ON profile_career FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_profile_location_updated_at BEFORE UPDATE ON profile_location FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_profile_marriage_exp_updated_at BEFORE UPDATE ON profile_marriage_expectations FOR EACH ROW EXECUTE FUNCTION set_updated_at();
