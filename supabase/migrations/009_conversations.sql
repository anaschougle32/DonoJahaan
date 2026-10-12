-- ====================================================================
-- Dono Jaha (D O N O   J A H A)
-- Migration 009: Matrimonial Conversations & 
-- HARD DATABASE ENFORCEMENT OF THE ONE ACTIVE CONVERSATION RULE
-- ====================================================================

-- Conversation Status Enum
CREATE TYPE conversation_status_enum AS ENUM (
    'pending',
    'active',
    'ended',
    'blocked'
);

-- Master Conversations Table
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    interest_id UUID REFERENCES interests(id) ON DELETE SET NULL,
    profile_1_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    profile_2_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status conversation_status_enum NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ended_at TIMESTAMPTZ,
    ended_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    end_reason TEXT,
    CONSTRAINT chk_profiles_distinct CHECK (profile_1_id <> profile_2_id),
    -- Canonical ordering ensures no duplicate (A, B) vs (B, A) race conditions
    CONSTRAINT chk_canonical_profile_order CHECK (profile_1_id < profile_2_id)
);

CREATE INDEX IF NOT EXISTS idx_conversations_status ON conversations(status);
CREATE INDEX IF NOT EXISTS idx_conversations_p1 ON conversations(profile_1_id);
CREATE INDEX IF NOT EXISTS idx_conversations_p2 ON conversations(profile_2_id);

-- Conversation Members Junction Table
CREATE TABLE IF NOT EXISTS conversation_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'ended', 'left')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ended_at TIMESTAMPTZ,
    CONSTRAINT uq_member_conversation UNIQUE (conversation_id, profile_id)
);

-- ====================================================================
-- HARD ENGINE-LEVEL ATOMIC ENFORCEMENT:
-- A profile can have EXACTLY ONE row with status = 'active' across the entire database!
-- Any concurrent, malicious, or duplicate attempt will be rejected by PostgreSQL.
-- ====================================================================
CREATE UNIQUE INDEX IF NOT EXISTS uq_one_active_conversation_per_profile
ON conversation_members(profile_id)
WHERE status = 'active';

-- Trigger Function on conversations to synchronize membership and enforce the rule
CREATE OR REPLACE FUNCTION process_conversation_status_change()
RETURNS TRIGGER AS $$
DECLARE
    active_count_p1 INT;
    active_count_p2 INT;
BEGIN
    IF NEW.status = 'active' THEN
        -- Check if profile 1 has any other active conversation
        SELECT COUNT(*) INTO active_count_p1
        FROM conversations
        WHERE id <> NEW.id
          AND status = 'active'
          AND (profile_1_id = NEW.profile_1_id OR profile_2_id = NEW.profile_1_id);

        IF active_count_p1 > 0 THEN
            RAISE EXCEPTION 'Profile % already has an active matrimonial conversation. In Dono Jaha, only one active conversation is permitted at a time.', NEW.profile_1_id;
        END IF;

        -- Check if profile 2 has any other active conversation
        SELECT COUNT(*) INTO active_count_p2
        FROM conversations
        WHERE id <> NEW.id
          AND status = 'active'
          AND (profile_1_id = NEW.profile_2_id OR profile_2_id = NEW.profile_2_id);

        IF active_count_p2 > 0 THEN
            RAISE EXCEPTION 'Profile % already has an active matrimonial conversation. In Dono Jaha, only one active conversation is permitted at a time.', NEW.profile_2_id;
        END IF;

        -- Ensure member rows exist and are active
        INSERT INTO conversation_members (conversation_id, profile_id, status)
        VALUES (NEW.id, NEW.profile_1_id, 'active')
        ON CONFLICT (conversation_id, profile_id) DO UPDATE SET status = 'active', ended_at = NULL;

        INSERT INTO conversation_members (conversation_id, profile_id, status)
        VALUES (NEW.id, NEW.profile_2_id, 'active')
        ON CONFLICT (conversation_id, profile_id) DO UPDATE SET status = 'active', ended_at = NULL;

    ELSIF NEW.status IN ('ended', 'blocked') THEN
        -- Update member rows to ended, immediately releasing both profiles
        UPDATE conversation_members
        SET status = 'ended', ended_at = now()
        WHERE conversation_id = NEW.id;

        IF NEW.ended_at IS NULL THEN
            NEW.ended_at = now();
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_conversation_status
BEFORE INSERT OR UPDATE OF status ON conversations
FOR EACH ROW EXECUTE FUNCTION process_conversation_status_change();

-- Transactional RPC to accept an interest and activate conversation
CREATE OR REPLACE FUNCTION accept_interest_and_create_conversation(
    p_interest_id UUID,
    p_receiver_profile_id UUID
)
RETURNS UUID AS $$
DECLARE
    v_interest RECORD;
    v_p1 UUID;
    v_p2 UUID;
    v_conv_id UUID;
BEGIN
    -- Select interest with row lock
    SELECT * INTO v_interest
    FROM interests
    WHERE id = p_interest_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Interest not found.';
    END IF;

    IF v_interest.receiver_profile_id <> p_receiver_profile_id THEN
        RAISE EXCEPTION 'Unauthorized: only the receiver can accept this interest.';
    END IF;

    IF v_interest.status <> 'sent' THEN
        RAISE EXCEPTION 'Interest is not in a pending state.';
    END IF;

    -- Canonical ordering for conversations table
    IF v_interest.sender_profile_id < v_interest.receiver_profile_id THEN
        v_p1 := v_interest.sender_profile_id;
        v_p2 := v_interest.receiver_profile_id;
    ELSE
        v_p1 := v_interest.receiver_profile_id;
        v_p2 := v_interest.sender_profile_id;
    END IF;

    -- Update interest status
    UPDATE interests
    SET status = 'accepted', responded_at = now()
    WHERE id = p_interest_id;

    -- Create conversation (Trigger will enforce the one active conversation rule)
    INSERT INTO conversations (interest_id, profile_1_id, profile_2_id, status)
    VALUES (p_interest_id, v_p1, v_p2, 'active')
    RETURNING id INTO v_conv_id;

    RETURN v_conv_id;
END;
$$ LANGUAGE plpgsql;

-- Transactional RPC to politely end conversation and free up both suitors
CREATE OR REPLACE FUNCTION end_active_conversation(
    p_conversation_id UUID,
    p_ending_profile_id UUID,
    p_reason TEXT DEFAULT 'Matrimonial alignment concluded'
)
RETURNS VOID AS $$
BEGIN
    UPDATE conversations
    SET status = 'ended',
        ended_at = now(),
        ended_by = p_ending_profile_id,
        end_reason = p_reason
    WHERE id = p_conversation_id
      AND status = 'active'
      AND (profile_1_id = p_ending_profile_id OR profile_2_id = p_ending_profile_id);

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Conversation not found or profile is not an active participant.';
    END IF;
END;
$$ LANGUAGE plpgsql;
