# Dono Jaha — Supabase Setup & Execution Guide

This document provides clear, step-by-step instructions for provisioning and configuring the Supabase backend for **Dono Jaha (D O N O   J A H A)**.

---

## 1. Create a Supabase Project

1. Log into your [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **New project**.
3. Set the project name to: `Dono Jaha Production` (or `Dono Jaha Staging`).
4. Generate or enter a secure database password.
5. Choose your nearest hosting region (e.g. `ap-south-1` Mumbai).
6. Wait for project initialization (~2 minutes).

---

## 2. Configure Authentication

1. In the Supabase Dashboard, navigate to **Authentication** > **Providers**.
2. **Phone Provider:**
   - Enable Phone.
   - Select SMS provider (Twilio, MessageBird, or Supabase default).
   - Set OTP expiration to `60 seconds`.
3. **Email Provider:**
   - Enable Email / Password.
   - Configure email confirmations as needed.
4. **URL Configuration:**
   - Add your application redirect URL (e.g. `https://your-domain.com` or `exp://`).

---

## 3. Database Execution Order

You can either execute the single unified schema or run migrations sequentially via the Supabase CLI.

### Option A: Unified Execution (Recommended for Fast Setup)
1. Open the **SQL Editor** in the Supabase Dashboard.
2. Open [`supabase/supabase_schema.sql`](./supabase/supabase_schema.sql).
3. Paste the contents into the SQL Editor and click **Run**.
4. Open [`supabase/migrations/012_security_rls.sql`](./supabase/migrations/012_security_rls.sql) and run it to establish Row Level Security.
5. Open [`supabase/migrations/013_storage.sql`](./supabase/migrations/013_storage.sql) and run it to initialize storage buckets and storage policies.

### Option B: Sequential Modular Migrations (CLI)
Run the migration files in this exact order:

```bash
npx supabase db push
# Or execute via psql in order:
# 1. 001_extensions.sql
# 2. 002_profiles.sql
# 3. 003_profile_details.sql
# 4. 004_family.sql
# 5. 005_photos.sql
# 6. 006_voice.sql
# 7. 007_preferences.sql
# 8. 008_interests.sql
# 9. 009_conversations.sql   <-- Enforces ONE ACTIVE CONVERSATION RULE
# 10. 010_messages.sql
# 11. 011_wali.sql
# 12. 012_security_rls.sql
# 13. 013_storage.sql
# 14. 014_notifications_audit.sql
```

---

## 4. Configure Supabase Storage Buckets

Execute [`supabase/migrations/013_storage.sql`](./supabase/migrations/013_storage.sql) or verify the following 4 buckets exist in **Storage**:

| Bucket ID | Public | Purpose |
|---|---|---|
| `profile-public` | **Yes** | Public avatar thumbnails and non-sensitive assets |
| `profile-blurred` | **Yes** | Server-generated blurred derivatives for suitor preview |
| `profile-private` | **No** | Full resolution original photos accessible only by signed URLs |
| `voice-introductions` | **No** | Audio recordings (M4A/AAC) accessible only by approved suitors |

---

## 5. Enable Realtime Replication

1. Navigate to **Database** > **Publications**.
2. Select `supabase_realtime`.
3. Verify that the table `messages` is toggled **ON** for realtime listening.

---

## 6. Configure Environment Variables

Create `.env` using `.env.example` as a template:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> **CRITICAL SECURITY RULE:** NEVER include `SUPABASE_SERVICE_ROLE_KEY` inside client application code or public git repositories.
