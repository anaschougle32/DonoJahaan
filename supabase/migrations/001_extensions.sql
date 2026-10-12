-- ====================================================================
-- Dono Jaha (D O N O   J A H A)
-- Migration 001: Required Extensions and Helper Functions
-- ====================================================================

-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable cryptographic functions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Generic updated_at trigger function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
