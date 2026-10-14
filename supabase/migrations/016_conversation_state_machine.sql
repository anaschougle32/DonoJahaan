-- ====================================================================
-- Dono Jaha (D O N O   J A H A)
-- Migration 016: Conversation State Machine & 1-Active Rule Enforcement
-- ====================================================================

-- 1. Function: Check if two suitors can unlock/start an active conversation
CREATE OR REPLACE FUNCTION can_start_conversation(
    p_profile_1_id UUID,
    p_profile_2_id UUID
)
RETURNS JSONB AS $$
DECLARE
    v_p1_active_count INT;
    v_p2_active_count INT;
    v_has_accepted_interest BOOLEAN;
    v_has_pending_interest BOOLEAN;
    v_existing_active_conv_id UUID;
BEGIN
    -- Check if an active conversation already exists between this pair
    SELECT id INTO v_existing_active_conv_id
    FROM conversations
    WHERE status = 'active'
      AND (
        (profile_1_id = p_profile_1_id AND profile_2_id = p_profile_2_id)
        OR (profile_1_id = p_profile_2_id AND profile_2_id = p_profile_1_id)
      )
    LIMIT 1;

    IF v_existing_active_conv_id IS NOT NULL THEN
        RETURN jsonb_build_object(
            'can_start', TRUE,
            'is_already_active', TRUE,
            'conversation_id', v_existing_active_conv_id,
            'reason', 'Active matrimonial conversation already in progress.'
        );
    END IF;

    -- Check if p_profile_1 has any other active conversation
    SELECT COUNT(*) INTO v_p1_active_count
    FROM conversations
    WHERE status = 'active'
      AND (profile_1_id = p_profile_1_id OR profile_2_id = p_profile_1_id);

    IF v_p1_active_count > 0 THEN
        RETURN jsonb_build_object(
            'can_start', FALSE,
            'code', 'LOCKED_SELF_HAS_ACTIVE',
            'reason', 'You already have an ongoing active matrimonial conversation. Under Dono Jaha rules, only one active conversation is allowed at a time.'
        );
    END IF;

    -- Check if p_profile_2 has any other active conversation
    SELECT COUNT(*) INTO v_p2_active_count
    FROM conversations
    WHERE status = 'active'
      AND (profile_1_id = p_profile_2_id OR profile_2_id = p_profile_2_id);

    IF v_p2_active_count > 0 THEN
        RETURN jsonb_build_object(
            'can_start', FALSE,
            'code', 'LOCKED_SUITOR_HAS_ACTIVE',
            'reason', 'This prospect currently has an active matrimonial conversation in progress with another suitor. You may express interest, which will queue until their conversation concludes.'
        );
    END IF;

    -- Check if mutual interest has been accepted
    SELECT EXISTS (
        SELECT 1 FROM interests
        WHERE status = 'accepted'
          AND (
            (sender_profile_id = p_profile_1_id AND receiver_profile_id = p_profile_2_id)
            OR (sender_profile_id = p_profile_2_id AND receiver_profile_id = p_profile_1_id)
          )
    ) INTO v_has_accepted_interest;

    IF NOT v_has_accepted_interest THEN
        SELECT EXISTS (
            SELECT 1 FROM interests
            WHERE status = 'sent'
              AND (
                (sender_profile_id = p_profile_1_id AND receiver_profile_id = p_profile_2_id)
                OR (sender_profile_id = p_profile_2_id AND receiver_profile_id = p_profile_1_id)
              )
        ) INTO v_has_pending_interest;

        IF v_has_pending_interest THEN
            RETURN jsonb_build_object(
                'can_start', FALSE,
                'code', 'LOCKED_INTEREST_PENDING',
                'reason', 'Matrimonial interest has been sent but is awaiting acceptance. Messaging unlocks once accepted.'
            );
        ELSE
            RETURN jsonb_build_object(
                'can_start', FALSE,
                'code', 'LOCKED_NO_INTEREST',
                'reason', 'Matrimonial interest must be expressed and accepted before conversation unlocks.'
            );
        END IF;
    END IF;

    -- All conditions met: Ready to unlock
    RETURN jsonb_build_object(
        'can_start', TRUE,
        'code', 'UNLOCKED_READY',
        'reason', 'Mutual interest verified and both suitors are free to engage.'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Function: Get active conversation details for a profile
CREATE OR REPLACE FUNCTION get_active_conversation_for_profile(p_profile_id UUID)
RETURNS TABLE (
    conversation_id UUID,
    interest_id UUID,
    partner_profile_id UUID,
    partner_name TEXT,
    created_at TIMESTAMPTZ,
    status conversation_status_enum
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id AS conversation_id,
        c.interest_id,
        CASE 
            WHEN c.profile_1_id = p_profile_id THEN c.profile_2_id 
            ELSE c.profile_1_id 
        END AS partner_profile_id,
        COALESCE(pb.display_name, 'Prospect') AS partner_name,
        c.created_at,
        c.status
    FROM conversations c
    LEFT JOIN profile_basic pb ON pb.profile_id = (
        CASE WHEN c.profile_1_id = p_profile_id THEN c.profile_2_id ELSE c.profile_1_id END
    )
    WHERE c.status = 'active'
      AND (c.profile_1_id = p_profile_id OR c.profile_2_id = p_profile_id)
    LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Transactional RPC: Accept an interest and unlock the single active conversation
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
    v_check JSONB;
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
        RAISE EXCEPTION 'Unauthorized: only the recipient can accept this matrimonial interest.';
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

    -- Update interest status to accepted
    UPDATE interests
    SET status = 'accepted', responded_at = now()
    WHERE id = p_interest_id;

    -- Check if either suitor already has an active conversation
    v_check := can_start_conversation(v_p1, v_p2);

    IF (v_check->>'can_start')::BOOLEAN = FALSE THEN
        -- Create conversation in pending state if either suitor has another active chat
        INSERT INTO conversations (interest_id, profile_1_id, profile_2_id, status)
        VALUES (p_interest_id, v_p1, v_p2, 'pending')
        RETURNING id INTO v_conv_id;

        RETURN v_conv_id;
    END IF;

    -- Insert active conversation (Database trigger enforces 1-active rule)
    INSERT INTO conversations (interest_id, profile_1_id, profile_2_id, status)
    VALUES (p_interest_id, v_p1, v_p2, 'active')
    RETURNING id INTO v_conv_id;

    -- Insert introductory matrimonial greeting message
    INSERT INTO messages (conversation_id, sender_profile_id, message_type, content)
    VALUES (
        v_conv_id,
        v_interest.receiver_profile_id,
        'system',
        'Assalamu Alaikum. Matrimonial interest accepted. Conversation is now active under chaperone governance.'
    );

    RETURN v_conv_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Transactional RPC: Conclude and end the active conversation politely
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
        RAISE EXCEPTION 'Conversation not found or caller is not an active participant.';
    END IF;

    -- Insert polite closing system note
    INSERT INTO messages (conversation_id, sender_profile_id, message_type, content)
    VALUES (
        p_conversation_id,
        p_ending_profile_id,
        'system',
        'Matrimonial conversation concluded respectfully: "' || p_reason || '". Both suitors are now released to connect with other prospects.'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Trigger: Disallow sending messages if conversation is no longer active
CREATE OR REPLACE FUNCTION check_message_active_conversation()
RETURNS TRIGGER AS $$
DECLARE
    v_status conversation_status_enum;
BEGIN
    SELECT status INTO v_status
    FROM conversations
    WHERE id = NEW.conversation_id;

    IF v_status <> 'active' THEN
        RAISE EXCEPTION 'Cannot send message to an inactive conversation. Under Dono Jaha rules, messages can only be exchanged in active conversations.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_check_message_active ON messages;
CREATE TRIGGER trg_check_message_active
BEFORE INSERT ON messages
FOR EACH ROW EXECUTE FUNCTION check_message_active_conversation();
