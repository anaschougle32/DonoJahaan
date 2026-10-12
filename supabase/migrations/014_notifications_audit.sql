-- ====================================================================
-- Dono Jaha (D O N O   J A H A)
-- Migration 014: Notifications, Moderation (Reports & Blocks), and Audit Logs
-- ====================================================================

-- Notification Event Types
CREATE TYPE notification_type_enum AS ENUM (
    'interest_received',
    'interest_accepted',
    'interest_rejected',
    'photo_request',
    'photo_approved',
    'new_message',
    'wali_activity',
    'profile_verification',
    'admin_notification'
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    event_type notification_type_enum NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    reference_id UUID,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_profile ON notifications(profile_id, is_read);

-- Blocked Users Table
CREATE TABLE IF NOT EXISTS blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blocker_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    blocked_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_different_block_profiles CHECK (blocker_profile_id <> blocked_profile_id),
    CONSTRAINT uq_block_pair UNIQUE (blocker_profile_id, blocked_profile_id)
);

-- User Reports / Safety Moderation Table
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reported_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reason TEXT NOT NULL, -- inappropriate_conduct, fake_profile, offensive_photo, commercial_solicitation, other
    details TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'resolved', 'dismissed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    resolved_at TIMESTAMPTZ
);

-- Security and Business Event Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_account_id UUID REFERENCES user_accounts(id) ON DELETE SET NULL,
    actor_profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    event_action TEXT NOT NULL,
    target_type TEXT,
    target_id UUID,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS for Notifications & Moderation
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY rls_notif_select ON notifications
    FOR SELECT TO authenticated
    USING (profile_id IN (SELECT auth_user_profile_ids()));

CREATE POLICY rls_notif_update ON notifications
    FOR UPDATE TO authenticated
    USING (profile_id IN (SELECT auth_user_profile_ids()));

CREATE POLICY rls_blocks_all ON blocks
    FOR ALL TO authenticated
    USING (blocker_profile_id IN (SELECT auth_user_profile_ids()))
    WITH CHECK (blocker_profile_id IN (SELECT auth_user_profile_ids()));

CREATE POLICY rls_reports_insert ON reports
    FOR INSERT TO authenticated
    WITH CHECK (reporter_profile_id IN (SELECT auth_user_profile_ids()));
