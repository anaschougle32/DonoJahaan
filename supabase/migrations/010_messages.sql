-- ====================================================================
-- Dono Jaha (D O N O   J A H A)
-- Migration 010: Persistent In-App Messages & Realtime
-- ====================================================================

-- Message Type Enum
CREATE TYPE message_type_enum AS ENUM (
    'text',
    'system',
    'voice'
);

-- Messages Table
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
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_profile_id);

-- Constraint: Disallow sending messages if the conversation is no longer active
CREATE OR REPLACE FUNCTION check_message_active_conversation()
RETURNS TRIGGER AS $$
DECLARE
    v_status conversation_status_enum;
BEGIN
    SELECT status INTO v_status
    FROM conversations
    WHERE id = NEW.conversation_id;

    IF v_status <> 'active' THEN
        RAISE EXCEPTION 'Cannot send message to an inactive conversation.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_message_active
BEFORE INSERT ON messages
FOR EACH ROW EXECUTE FUNCTION check_message_active_conversation();

-- Enable Supabase Realtime publication on messages
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE messages;
    END IF;
END $$;
