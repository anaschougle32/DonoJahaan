# Dono Jaha — Security, Privacy, and RLS Specification

**Product:** Dono Jaha (D O N O   J A H A)  
**Security Model:** Zero-Trust Client Architecture / Server-Authoritative RLS

---

## 1. Core Principles

1. **Client Authorization is UX-Only:** Frontend checks are strictly for UI state and user experience. Every sensitive operation is guarded by PostgreSQL Row Level Security (RLS) and server functions.
2. **Never Expose Private Media Directly:** Original unblurred photographs and voice recordings are never served over public buckets. They reside in private storage and are only delivered through short-lived signed URLs generated upon authorization verification.
3. **Database-Enforced One Active Conversation:** No client can bypass the one-conversation rule. The database engine enforces a unique partial index on active memberships and transactional triggers that reject concurrent requests.
4. **Wali Involvement with Privacy Boundaries:** Chaperones and Walis only view profiles and conversations they are explicitly authorized to monitor.
5. **No Password Storage in Application Tables:** Supabase Auth is the single source of truth for authentication. Custom password columns are prohibited.

---

## 2. Row Level Security (RLS) Policy Matrix

| Table | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| `user_accounts` | Own account | Trigger on Auth | Own account | Admin / Owner |
| `profiles` | Own OR Approved & Discoverable | Auth user | Own profile | Own profile |
| `profile_*` details | Own OR Discoverable suitor | Own profile | Own profile | Own profile |
| `photos` | Public / Blurred / Approved suitor | Own profile | Own profile | Own profile |
| `photo_access_requests` | Requester or Target Owner | Requester | Target Owner (Approve/Reject) | Owner/Requester |
| `voice_introductions` | Public OR Active Match | Own profile | Own profile | Own profile |
| `interests` | Sender or Receiver | Sender | Receiver (Accept/Reject) | Sender (Withdraw) |
| `conversations` | Conversation participants | Stored Proc Trigger | Participants (End) | Admin |
| `conversation_members`| Own membership | Trigger on Conv | Trigger on Conv | Admin |
| `messages` | Conversation participants | Active participants | Sender | Sender |
| `wali_relationships` | Ward profile owner or Linked Wali | Ward profile owner | Ward profile owner | Ward profile owner |

---

## 3. Dedicated Verification of the One-Active-Conversation Rule

### Test Scenario:
1. Suitor A sends an interest to Suitor B.
2. Suitor B accepts the interest.
3. A conversation row is created with `status = 'active'`, and both Suitor A and Suitor B receive active entries in `conversation_members`.
4. While active, Suitor A attempts to accept or initiate a conversation with Suitor C.
5. **Result:** The database rejects the operation with an exception:
   `Profile [A] already has an active matrimonial conversation. In Dono Jaha, only one active conversation is permitted at a time.`
   The unique index `uq_one_active_conversation_per_profile` acts as an atomic fallback.
6. Suitor A or Suitor B clicks **End Conversation**. The conversation status transitions to `ended`, and both member rows are marked `ended`.
7. Now, Suitor A or Suitor B can freely start another active matrimonial connection.
