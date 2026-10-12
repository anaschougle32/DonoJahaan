# DONO JAHA — MASTER DEVELOPMENT OVERRIDE & IMPLEMENTATION PROMPT

> **Document type:** Implementation-level override/addendum to the existing Dono Jaha PRD  
> **Product:** Dono Jaha  
> **Purpose:** Give an Agentic AI coding/development agent a precise implementation brief for UI/UX refinement, project setup, Supabase backend, database, authentication, storage, realtime chat, security, testing, and deployment.

---

# 1. PROJECT IDENTITY

## Application Name

**Dono Jaha**

Exact spelling:

**D O N O   J A H A**

Do **not** rename it to Dono Jahan, Dono Jahaan, Dono-Jahan, or any automatically generated alternative.

Use **Dono Jaha** consistently in the logo, splash screen, UI branding, metadata, package/bundle configuration, documentation, and store-facing configuration.

---

# 2. RELATIONSHIP TO THE EXISTING PRD

This document is an **implementation override/addendum** to the previously supplied Dono Jaha PRD.

The existing PRD defines the product requirements: Muslim matrimonial functionality, onboarding questionnaire, profile creation, religion/practice fields, family information, partner preferences, photo privacy, voice introduction, Wali/family functionality, interest system, one-active-conversation rule, discovery, chat, safety and privacy.

**Do not replace or contradict the existing PRD.**

Use the existing PRD for **what the product does**.

Use this document for **how the product should be implemented**.

If there is a conflict between this document and generic implementation assumptions, **this document takes priority for technology and implementation decisions.**

---

# 3. PRODUCT OBJECTIVE

Build **Dono Jaha**, a modern Muslim matrimonial application designed for serious marriage intentions.

The application should feel:

- Premium
- Trustworthy
- Private
- Modern
- Culturally respectful
- Simple
- Smooth
- Fast
- Mature
- Matrimonial rather than dating-oriented

The objective of the initial build is:

> Build a highly usable, visually polished MVP that is good enough for real users/customers while maintaining a scalable technical architecture for future development.

Do **not** over-engineer unnecessarily.

Do **not** create shortcuts that compromise authentication, authorization, privacy, user data, or the one-conversation business rule.

---

# 4. EXISTING SKETCH UI/UX IS THE STARTING POINT

I already have an existing UI/UX created in Sketch and exported into HTML/CSS/assets.

Those files are the **starting visual reference and existing design work**.

## DO NOT

- Throw away the existing design
- Redesign the application from scratch
- Randomly change layouts
- Create an unrelated design language
- Create generic AI-generated SaaS UI
- Replace existing screens without understanding them
- Introduce random gradients
- Introduce random colors
- Introduce random typography
- Randomly change component sizes

## YOU MUST

1. Inspect the existing project.
2. Inspect every existing HTML file.
3. Inspect CSS.
4. Inspect assets.
5. Inspect images and SVGs.
6. Identify every existing screen.
7. Identify reusable components.
8. Identify current navigation.
9. Identify current spacing.
10. Identify current typography.
11. Identify current colors.
12. Identify existing responsive behavior.
13. Identify inconsistencies and broken UI.
14. Identify components that need refinement.

Before making major changes, create a concise **UI inventory and component map**.

---

# 5. EXISTING DESIGN → PRODUCTION UI

The exported HTML is:

> **Source of visual truth, not necessarily source of final production architecture.**

If the existing code can be cleanly reused, reuse it.

If it is static/exported HTML and unsuitable for the production framework, convert the visual design into reusable production components.

Do not blindly copy hundreds of duplicated HTML elements.

---

# 6. UI REFINEMENT OBJECTIVE

The existing UI needs to be **polished**, not replaced.

Perform visual refinement of:

- Spacing
- Alignment
- Typography
- Hierarchy
- Button sizing
- Card sizing
- Border radius
- Shadows
- Icons
- Input fields
- Error states
- Loading states
- Empty states
- Responsiveness
- Accessibility
- Animation
- Interaction feedback

For UX refinement, verify:

- Can the user immediately understand what to do?
- Is the CTA obvious?
- Is the screen too crowded?
- Is the hierarchy clear?
- Is the form easy to complete?
- Is keyboard behavior correct?
- Is navigation intuitive?
- Is progress obvious?
- Are errors understandable?
- Are privacy settings understandable?

---

# 7. CENTRALIZED DESIGN SYSTEM

Create one source of truth for the Dono Jaha design system.

Do **not** hardcode random values throughout the application.

Centralize:

- Colors
- Typography
- Spacing
- Radius
- Shadows
- Borders
- Icon sizes
- Button heights
- Input heights
- Animation durations
- Z-index
- Breakpoints

Use an architecture appropriate to the selected framework.

---

# 8. DESIGN SYSTEM — BASELINE

Use the following as the initial baseline unless the existing Sketch design provides a clearly superior equivalent.

| Token | Value |
|---|---|
| Primary | `#0B6B57` |
| Primary Dark | `#075044` |
| Primary Soft | `#E8F4F0` |
| Background | `#FCFCFA` |
| Surface | `#FFFFFF` |
| Primary Text | `#17201D` |
| Secondary Text | `#68736F` |
| Border | `#E4E9E6` |
| Success | `#27855E` |
| Warning | `#C98A22` |
| Error | `#C94A4A` |
| Information | `#3E6F9E` |
| Optional Premium Accent | `#B79A5B` |

Use the gold only sparingly.

---

# 9. TYPOGRAPHY

Preferred primary typeface:

**Manrope**

Fallback:

- Inter
- System sans-serif

Suggested scale:

| Style | Size / Line Height |
|---|---:|
| Display | 32 / 40 |
| H1 | 28 / 36 |
| H2 | 24 / 32 |
| H3 | 20 / 28 |
| Body Large | 17 / 26 |
| Body | 15 / 23 |
| Body Small | 13 / 20 |
| Caption | 12 / 18 |
| Button | 15 / 20 |

Weights:

- 400 Regular
- 500 Medium
- 600 SemiBold
- 700 Bold

---

# 10. SPACING SYSTEM

Use an 8-point-based spacing system:

```text
4
8
12
16
20
24
32
40
48
64
80
```

Primary mobile horizontal padding: `20px`

Large layouts: `24px`

Do not randomly create new spacing values unless they are justified and added to the design token system.

---

# 11. CORNER RADIUS

Centralize:

```text
Small:  8px
Medium: 12px
Large:  16px
XL:     20px
Pill:   999px
```

Recommended:

- Profile cards: 20px
- Primary buttons: 14px
- Inputs: 14px

---

# 12. ICON SYSTEM

Use one icon family.

Preferred:

**Lucide**

Use approximately `1.8–2px` stroke.

Do not mix random icon packs, FontAwesome, Material icons, emoji, or unrelated SVG icon styles in the primary UI.

---

# 13. MOBILE-FIRST

Dono Jaha is primarily a mobile application.

Primary targets:

- Android
- iOS

If the existing repository already establishes a mobile technology stack, preserve it where practical.

If the project is being established from zero, prefer:

- React Native
- Expo
- TypeScript

unless there is a concrete technical reason to choose another architecture.

The Sketch-exported HTML is the visual reference, not automatically the production mobile UI.

---

# 14. DEVELOPMENT PRINCIPLE

Do not attempt to generate the entire application blindly in one step.

Work in phases:

1. Inspect project
2. Create architecture
3. Create design system
4. Convert/refactor existing UI
5. Create Supabase project structure
6. Create database schema
7. Create authentication
8. Create onboarding
9. Create profiles
10. Create discovery/matching
11. Create interest system
12. Create one-conversation system
13. Create chat
14. Create photo privacy
15. Create voice introduction
16. Create settings/security
17. Test
18. Production build

---

# 15. BEFORE WRITING CODE

First inspect:

```text
project structure
package.json
existing source files
HTML
CSS
assets
images
SVGs
fonts
navigation
components
screens
existing dependencies
```

Then produce a concise implementation plan.

Do not ask me to manually explain things that can be determined from the existing code.

Only ask for clarification when a decision genuinely cannot be determined from the PRD, this document, existing code, existing assets, or established product rules.

---

# 16. SUPABASE IS THE BACKEND

Use **Supabase** for:

- PostgreSQL database
- Supabase Auth
- Supabase Storage
- Supabase Realtime
- PostgreSQL Row Level Security
- Supabase-compatible server-side functions where appropriate

---

# 17. AUTHENTICATION

There are two primary authentication methods.

## Mobile OTP

```text
+91 XXXXX XXXXX
        ↓
Send OTP
        ↓
Verify OTP
        ↓
Authenticated user
```

## Email + Password

```text
Email
Password
    ↓
Supabase Auth
```

Do not build custom authentication.

Do not store passwords manually.

Do not create a custom password table.

Supabase Auth must remain the authentication source of truth.

---

# 18. AUTHENTICATION ARCHITECTURE

Separate:

### Authentication identity

from:

### Matrimonial profile

Conceptually:

```text
auth.users
     ↓
profiles
     ↓
profile_details
```

Never put the entire matrimonial profile into the authentication table.

---

# 19. USER ACCOUNT VS PROFILE SUBJECT

A user account and matrimonial profile are not necessarily the same person.

Example:

```text
Mother's account
       ↓
Daughter's matrimonial profile
```

Support:

- User account
- Profile subject
- Profile manager
- Profile relationship

A profile can have authorized managers.

---

# 20. DATABASE ARCHITECTURE

Create normalized tables.

Minimum conceptual structure:

```text
profiles
profile_creators
profile_relationships

profile_basic
profile_physical
profile_religion
profile_education
profile_employment
profile_location
profile_family
family_members
profile_marriage_expectations

photos
photo_permissions

voice_introductions
voice_permissions

partner_preferences
partner_preference_values

interests
shortlists

conversations
conversation_members
messages

wali_relationships

verifications
reports
blocks

notifications

user_settings
privacy_settings

audit_logs
```

Do not create one giant table containing 100+ unrelated columns.

---

# 21. SQL MIGRATIONS

Create modular PostgreSQL migrations.

Suggested structure:

```text
supabase/
    migrations/
        001_extensions.sql
        002_profiles.sql
        003_profile_details.sql
        004_family.sql
        005_photos.sql
        006_voice.sql
        007_preferences.sql
        008_interests.sql
        009_conversations.sql
        010_messages.sql
        011_wali.sql
        012_security.sql
        013_storage.sql
        014_notifications.sql
```

Use a better structure if technically justified, but keep migrations modular and understandable.

---

# 22. SQL REQUIREMENTS

Generate SQL for:

- Required extensions
- Tables
- UUID primary keys
- Foreign keys
- Indexes
- Constraints
- Check constraints/enums where appropriate
- Timestamps
- `updated_at` triggers
- RLS
- RLS policies
- Helper functions
- Conversation constraints
- Storage policies

The final implementation must provide executable SQL/migrations.

---

# 23. CRITICAL BUSINESS RULE — ONE ACTIVE CONVERSATION

This is a core differentiator.

A profile may have:

> **Only ONE ACTIVE MATRIMONIAL CONVERSATION at a time.**

Example:

```text
Profile A
    ↕
Profile B
ACTIVE
```

While this exists:

```text
Profile A
    ↕
Profile C
```

must not be allowed to become another active conversation.

This rule must be enforced **server-side/database-side**, not only through frontend UI.

---

# 24. ONE-CONVERSATION DATABASE ENFORCEMENT

Use an appropriate PostgreSQL constraint/index/function/transactional mechanism to prevent race conditions.

The implementation must handle:

- Simultaneous requests
- Duplicate requests
- Repeated button presses
- Malicious clients
- Manually crafted API requests

The rule must remain valid even if the frontend is bypassed.

---

# 25. INTEREST STATE MACHINE

Use explicit states:

```text
sent
accepted
rejected
withdrawn
expired
```

When an interest is accepted:

```text
Interest
   ↓
Eligibility checks
   ↓
Create active conversation
```

Only if both profiles are eligible.

---

# 26. CONVERSATION STATE MACHINE

Use:

```text
pending
active
ended
blocked
```

Only `active` counts toward the one-conversation restriction.

---

# 27. CONVERSATION CREATION VALIDATION

The backend/database must validate:

1. Interest exists.
2. Interest was accepted.
3. Both profiles are eligible.
4. Neither profile has another active conversation.
5. Neither profile has blocked the other.
6. Profiles are active.
7. Required privacy/communication rules are satisfied.

---

# 28. CHAT

Use:

**Supabase PostgreSQL + Supabase Realtime**

for in-app messaging.

Messages must be persisted in the database.

Realtime is for delivery/update behavior, not permanent message storage.

---

# 29. MESSAGE MODEL

Conceptually:

```text
id
conversation_id
sender_profile_id
message_type
content
created_at
edited_at
deleted_at
read_at
```

Initial message types:

```text
text
system
```

Future types may include image/voice, but do not overbuild the MVP without a concrete requirement.

---

# 30. CHAT SECURITY

RLS must ensure a user can only:

- Read conversations they belong to
- Read messages in conversations they belong to
- Send messages to conversations they belong to
- Send messages only while the conversation is active

A user must not be able to access another conversation by manipulating IDs.

---

# 31. PHOTO STORAGE

Use Supabase Storage.

Recommended logical separation:

```text
profile-public
profile-private
profile-blurred
voice-introductions
```

The exact bucket architecture may differ if a more secure structure is justified.

---

# 32. CRITICAL PHOTO PRIVACY RULE

Do NOT store a private image and merely blur it using CSS.

For example, this is **not sufficient**:

```css
filter: blur(...)
```

if the original image is already available to the client.

Instead:

```text
Original Image
      ↓
Private Storage
      ↓
Blurred Derivative
      ↓
Unauthorized viewer sees blurred image
```

When access is granted:

```text
Authorized request
      ↓
Temporary signed access
      ↓
Original image
```

---

# 33. PHOTO VISIBILITY STATES

Support:

```text
visible
blurred
private
request_required
match_only
```

The profile owner controls the appropriate setting.

Backend authorization is always authoritative.

---

# 34. PHOTO ACCESS REQUESTS

Create a photo permission/request model:

```text
photo_access_requests

requester_profile_id
owner_profile_id
photo_id
status
created_at
responded_at
```

States:

```text
pending
approved
rejected
revoked
```

---

# 35. VOICE INTRODUCTION

Voice introduction is a signature Dono Jaha feature.

Recommended:

- Minimum: 30 seconds
- Maximum: 120 seconds

Do not autoplay voice.

User must intentionally press Play.

---

# 36. VOICE STORAGE

Use Supabase Storage.

Practical formats may include:

- M4A/AAC
- MP3 if required by the product specification

Choose a practical format based on platform compatibility, quality, storage size and playback support.

Store metadata:

```text
duration
mime_type
file_size
storage_path
created_at
status
```

---

# 37. VOICE PRIVACY

Support:

```text
public
match_only
request_required
private
```

Do not expose unrestricted audio URLs.

Use authorized/signed access.

---

# 38. DO NOT ANALYZE VOICE FOR CHARACTER

Do not create AI systems that claim to determine personality, character, religiousness, honesty, attractiveness, compatibility, or akhlaq from someone's voice.

Voice is for human introduction/listening.

---

# 39. QUESTIONNAIRE ENGINE

Do not hard-code every question into separate custom screens.

Create reusable question components.

Support:

```text
single_select
multi_select
text
number
date
range
dropdown
searchable_dropdown
location
yes_no
photo
audio
repeater
conditional
```

---

# 40. CONDITIONAL QUESTION LOGIC

Examples:

```text
Gender = Female
→ Show female-specific questions
```

```text
Marital Status = Divorced
→ Show relevant additional questions
```

```text
Created By ≠ Self
→ Show creator relationship
```

---

# 41. SAVE ONBOARDING PROGRESS

Save progress continuously.

If a user closes the app at step 27, they should return to step 27 rather than restarting.

---

# 42. PROFILE STATUS

Support:

```text
draft
pending_review
approved
rejected
suspended
deleted
```

---

# 43. HOME SCREEN

Create a calm matrimonial dashboard.

Suggested structure:

```text
Greeting

Profile Completion

Active Conversation

Recommended Matches

Shortlisted / Recently Viewed

Notifications
```

Do not make the Home screen resemble a dating app.

---

# 44. DISCOVERY

Profile cards may show:

- Name
- Age
- Location
- Education
- Profession
- Relevant faith information
- Verification
- Voice availability
- Photo privacy state

Do not overload cards with every profile field.

---

# 45. PROFILE DETAIL

Recommended hierarchy:

```text
Photo
Name
Age
Location

Voice Introduction

About

Basic Details

Faith & Practice

Education & Career

Family

Lifestyle

Marriage Expectations

Partner Preferences
```

Use reusable section components.

---

# 46. MATCHING

MVP matching should be deterministic and explainable.

Do not invent a meaningless AI compatibility score.

Use actual profile and preference data.

Example:

### Why you're seeing this profile

- Age preference matched
- Location matched
- Education matched
- Religion matched
- Mother tongue matched
- Marriage expectations matched

---

# 47. PARTNER PREFERENCES

Support:

- Age range
- Height range
- Marital status
- Religion
- Sect
- Community
- Mother tongue
- Location
- Education
- Income
- Diet
- Smoking
- Alcohol
- Religious practice
- Relocation
- Living arrangement
- Career expectations

---

# 48. SHORTLIST

Users can shortlist multiple profiles.

Shortlisting does **not** create a conversation.

The one-conversation restriction applies to active matrimonial communication.

---

# 49. INTEREST SYSTEM

Implement:

```text
Send Interest
Accept
Reject
Withdraw
```

Display clear statuses:

```text
Pending
Accepted
Rejected
Withdrawn
```

---

# 50. ONE-CONVERSATION UX

If a user already has an active conversation and visits another profile, do not silently disable everything.

Explain:

> **You're currently getting to know someone.**

> Dono Jaha allows one active conversation at a time so you can focus on one meaningful connection.

Actions:

- View Profile
- Shortlist
- Back

If they attempt to initiate another:

> **Finish your current conversation first.**

---

# 51. CHAT UI

Keep chat simple and respectful.

Header:

- Profile photo
- Name
- Active Conversation
- More menu

Message bubbles.

Composer:

`Write a message...`

Send button.

Avoid dating-style UI and excessive gamification.

---

# 52. WALI

Support optional Wali involvement.

Conceptually:

```text
wali_relationships
```

Potential roles:

```text
viewer
chaperone
manager
```

Do not assume every Muslim user follows exactly the same Wali workflow.

Make functionality configurable.

---

# 53. PRIVACY SETTINGS

Users should be able to control:

## Photos

- Visible
- Blurred
- Request only
- Match only

## Voice

- Visible
- Match only
- Request only
- Private

## Profile Discoverability

- Discoverable
- Hidden

## Contact Information

Private by default.

---

# 54. SECURITY

Use Row Level Security for sensitive data.

Do not leave sensitive profile tables publicly readable.

Avoid broad policies such as:

```sql
USING (true)
```

for private information unless the exact exposure is intentional and safe.

---

# 55. RLS PHILOSOPHY

Every sensitive query should answer:

> **Who is allowed to see this row?**

Examples:

### Public profile data
Only intentionally public fields.

### Private photo
Only owner/authorized viewer.

### Messages
Only conversation participants.

### Wali information
Only authorized parties.

### Phone number
Private unless explicitly authorized.

---

# 56. NEVER TRUST FRONTEND AUTHORIZATION

Frontend checks are UX only.

Security must exist server-side.

Backend/database must independently enforce:

- Profile access
- Photo access
- Voice access
- Chat access
- Conversation creation
- Message sending
- Wali access
- Admin actions

---

# 57. ADMIN ROLE

Create a secure admin architecture.

Do not rely on a simple frontend `is_admin = true` check.

Use secure role verification.

---

# 58. ADMIN FUNCTIONS

Admin should eventually manage:

```text
Users
Profiles
Verification
Photos
Voice
Reports
Blocks
Interests
Conversations
Questionnaire
Content
Notifications
Settings
```

---

# 59. AUDIT LOGS

Log important security/business actions:

```text
profile_created
profile_updated
photo_uploaded
photo_access_granted
photo_access_revoked
voice_uploaded
interest_sent
interest_accepted
conversation_created
conversation_ended
user_blocked
user_reported
admin_action
```

---

# 60. ERROR HANDLING

Every important operation must support:

- Loading
- Success
- Empty
- Error
- Retry
- Offline
- Unauthorized
- Forbidden

Never expose raw PostgreSQL/Supabase errors to users.

---

# 61. NETWORK / OFFLINE

If the network disappears:

> **No internet connection**

`Try Again`

Never make a user believe a message was sent if it was not.

Messages should support:

```text
sending
sent
failed
retry
```

---

# 62. PERFORMANCE

Optimize:

- Profile images
- Audio
- Lists
- Pagination
- Database queries
- Realtime subscriptions

Do not load every profile, photo or message at once.

---

# 63. IMAGE PERFORMANCE

Use thumbnails for:

- Discovery
- Search
- Lists

Use higher-resolution images only on profile detail.

Never download a multi-megabyte original image to render a tiny profile card.

---

# 64. CHAT PERFORMANCE

Use:

- Pagination
- Cursor-based loading where appropriate
- Realtime subscription
- Persistent message storage

Do not query the entire conversation history every time the chat screen opens.

---

# 65. ENVIRONMENT VARIABLES

Create:

```text
.env.example
```

Never hardcode:

- Supabase secrets
- Service role keys
- API secrets
- Storage secrets

The Supabase service-role key must **never** be shipped inside the mobile application.

---

# 66. SUPABASE CLIENT

Use public Supabase configuration appropriately.

Server-side secrets must remain server-side.

---

# 67. STORAGE SECURITY

Storage policies must follow the same privacy model as the database.

A private bucket alone is not enough.

Define exact policies for:

- Upload
- Read
- Update
- Delete

---

# 68. IMAGE PRIVACY ARCHITECTURE

Recommended:

```text
Original
   ↓
Private Storage
   ↓
Blurred derivative
   ↓
Blurred display
```

When access is granted:

```text
Authorized request
       ↓
Temporary signed URL
       ↓
Original image
```

---

# 69. VOICE ARCHITECTURE

```text
Record
 ↓
Validate
 ↓
Compress/normalize
 ↓
Upload
 ↓
Database metadata
 ↓
Authorized playback
```

Backend must validate audio duration and file properties even if the frontend already does so.

---

# 70. DELETE ACCOUNT

Support account deletion.

Consider:

- Auth account
- Profile
- Photos
- Voice
- Interests
- Preferences
- Messages
- Notifications
- Storage objects

Follow an appropriate retention/deletion policy for information that must be retained for security/legal reasons.

---

# 71. PRIVACY BY DEFAULT

Default settings should be conservative.

Especially:

- Phone hidden
- Email hidden
- Private media controlled
- Location shown at city level
- No public contact information

---

# 72. EXACT LOCATION

Do not expose exact home addresses through normal matrimonial discovery.

Use:

- Country
- State
- City

Optionally use locality/area only where deliberately provided and genuinely required.

---

# 73. UI STATES

Every important component must have:

- Default
- Selected
- Disabled
- Loading
- Error
- Success
- Empty
- Permission denied
- Locked/private

Especially:

- Photos
- Voice
- Interest
- Conversation
- Verification

---

# 74. ANIMATION

Keep animations subtle.

Default duration:

`150–250ms`

Use:

- Fade
- Slide
- Scale
- Spring

Avoid:

- Excessive bouncing
- Confetti
- Heart explosions
- Dating-app-style gamification

---

# 75. NO AI-SLOP DESIGN

This is a hard requirement.

Do **not** produce:

- Generic purple gradients
- Random glassmorphism
- Excessive rounded cards
- Fake 3D illustrations
- Random blobs
- Neon gradients
- Meaningless AI-generated illustrations
- Random icon styles
- Unnecessary dashboard cards

The product must feel intentionally designed.

---

# 76. USE EXISTING ASSETS

If an existing asset exists in the repository:

**Reuse it.**

Do not generate a replacement simply because you prefer it.

If an asset is low quality or unsuitable:

Flag it before replacing it.

---

# 77. COMPONENT REUSE

Create reusable components such as:

```text
Button
Input
OTPInput
SelectCard
MultiSelect
RangeSlider
ProfileCard
PhotoViewer
ProtectedPhoto
VoicePlayer
VoiceRecorder
VerificationBadge
SectionHeader
ProgressHeader
BottomSheet
Modal
Toast
EmptyState
Skeleton
InterestButton
ConversationCard
ChatBubble
```

Do not duplicate components unnecessarily.

---

# 78. QUESTION COMPONENT ARCHITECTURE

Use one question renderer where possible.

Conceptually:

```tsx
<QuestionRenderer
  question={question}
  answer={answer}
  onChange={...}
/>
```

The renderer should support single-select, multi-select, text, range, date, location, and other configured question types.

---

# 79. RESPONSIVE UI

Mobile is primary, but the code architecture should remain maintainable.

Do not hardcode device-specific pixel positions.

Use layout primitives and reusable responsive rules.

---

# 80. ACCESSIBILITY

Ensure:

- Readable font sizes
- Sufficient contrast
- Screen reader labels
- Accessible buttons
- Accessible audio controls
- Minimum touch target approximately 44px
- Errors not communicated by color alone

---

# 81. NOTIFICATIONS

Support:

```text
interest_received
interest_accepted
interest_rejected
photo_request
photo_approved
new_message
wali_activity
profile_verification
admin_notification
```

Do not expose sensitive information unnecessarily on lock screens.

---

# 82. SEARCH

Start with PostgreSQL filtering/search.

Do not introduce Elasticsearch/OpenSearch until actual scale requires it.

---

# 83. MATCHING ENGINE — MVP

Start deterministic.

Do not introduce machine learning simply because an AI coding agent is being used.

Use actual:

- Profile attributes
- Partner preferences
- Matching rules
- Filters

Future intelligent matching can be introduced after real behavioral data exists.

---

# 84. ANALYTICS

Track product events carefully:

```text
onboarding_started
onboarding_completed
profile_completed
profile_viewed
voice_played
photo_requested
photo_approved
interest_sent
interest_accepted
conversation_started
message_sent
conversation_ended
profile_reported
profile_blocked
```

Avoid unnecessary collection of sensitive information.

---

# 85. TESTING

Before calling the MVP complete, test:

## Authentication

- Phone OTP
- Email/password
- Invalid OTP
- Expired OTP
- Logout
- Session restoration
- Password recovery

## Profile

- Create
- Edit
- Resume onboarding
- Incomplete profile
- Gender conditional questions

## Photos

- Upload
- Blur
- Request
- Approve
- Revoke
- Unauthorized access

## Voice

- Record
- Upload
- Playback
- Invalid duration
- Privacy
- Unauthorized playback

## Interest

- Send
- Accept
- Reject
- Withdraw

## Conversation

- Creation
- Active state
- One-conversation rule
- Ending
- Second-conversation attempt

## Chat

- Realtime
- Persistence
- Authorization
- Failed message
- Blocked user

## Security

- RLS
- Unauthorized requests
- Manipulated IDs
- Direct storage access
- Privilege escalation

---

# 86. DEDICATED ONE-CONVERSATION TEST

Scenario:

User A has:

```text
A ↔ B
ACTIVE
```

User A attempts:

```text
A ↔ C
```

Expected:

```text
DENIED
```

even if the request is manually crafted outside the normal UI.

Then:

```text
A ↔ B
END
```

After ending, if all other rules permit:

```text
A ↔ C
```

should become possible.

---

# 87. RLS TESTING

Test at minimum:

- Unauthenticated user
- Normal user
- Profile owner
- Authorized profile manager
- Conversation participant
- Non-participant
- Wali
- Admin
- Blocked user

---

# 88. BUILD WORKFLOW

After each major phase:

1. Implement
2. Run/build
3. Inspect errors
4. Fix
5. Test
6. Continue

Do not generate thousands of files and only discover errors at the end.

---

# 89. GIT

Use logical commits.

Examples:

```text
chore: initialize Dono Jaha app
feat: establish design system
feat: implement authentication
feat: implement onboarding
feat: implement profile creation
feat: implement photo privacy
feat: implement voice introduction
feat: implement discovery
feat: implement interest system
feat: implement one-conversation rule
feat: implement realtime chat
feat: implement settings
fix: ...
```

---

# 90. DOCUMENTATION

Create:

```text
README.md
ARCHITECTURE.md
DATABASE.md
SUPABASE_SETUP.md
DESIGN_SYSTEM.md
ENVIRONMENT.md
SECURITY.md
```

Documentation must explain how another developer can continue the project.

---

# 91. SUPABASE SETUP DOCUMENT

Provide step-by-step instructions:

```text
1. Create Supabase project
2. Configure Auth
3. Configure phone provider
4. Configure email
5. Run migrations
6. Create storage buckets
7. Configure storage policies
8. Configure realtime
9. Configure environment variables
10. Run application
```

---

# 92. SQL DELIVERY REQUIREMENT

At the end of database implementation, provide:

- Complete migration folder
- And/or `supabase_schema.sql`
- `SUPABASE_SETUP.md`

Clearly explain:

> Which SQL files need to be executed and in what order.

There must be no ambiguity.

---

# 93. DO NOT ASK ME TO MANUALLY WRITE SQL

Generate the SQL based on the PRD and architecture.

If a decision is ambiguous:

1. Choose the safest reasonable architecture.
2. Document the assumption.
3. Continue.

Only stop and ask when the decision materially changes the product or cannot reasonably be inferred.

---

# 94. NO FAKE BACKEND

Do not use fake production data:

- Mock users
- Fake chat
- Fake profile arrays
- Fake authentication
- Fake OTP
- localStorage as the database

Temporary mocks may be used during isolated UI development, but they must be clearly isolated and removable.

---

# 95. REAL SUPABASE INTEGRATION

The production flow must use:

```text
Supabase Auth
Supabase Database
Supabase Storage
Supabase Realtime
```

rather than simulated services.

---

# 96. UI DEVELOPMENT ORDER

First make these screens visually excellent:

1. Splash
2. Phone
3. OTP
4. Profile Created By
5. Questionnaire template
6. Photo upload
7. Voice recorder
8. Profile preview
9. Discover
10. Profile detail
11. Interest
12. Active conversation
13. Chat
14. Privacy

Once these are polished, use the same components to build the remaining screens.

---

# 97. SCREEN GENERATION RULE

When implementing a screen:

> **Do not invent a new UI pattern if an existing pattern already exists.**

For example, if onboarding uses:

```text
Back
Progress
Title
Description
Options
Bottom CTA
```

then every onboarding screen should reuse the same architecture.

Only the content should change.

---

# 98. DESIGN CONSISTENCY AUDIT

Before completing the UI, verify:

- Are all buttons the same height?
- Are primary buttons the same radius?
- Are inputs the same height?
- Are cards consistent?
- Are margins consistent?
- Are typography styles centralized?
- Are icons from the same library?
- Are profile cards consistent?
- Are bottom navigation states consistent?
- Are error states consistent?
- Are loaders consistent?
- Are empty states consistent?

---

# 99. FINAL QA CHECKLIST

## UI

- [ ] Existing Sketch UI preserved
- [ ] Theme updated
- [ ] Typography consistent
- [ ] Spacing consistent
- [ ] Components reusable
- [ ] Responsive
- [ ] Loading states
- [ ] Error states
- [ ] Empty states

## Auth

- [ ] Phone OTP
- [ ] Email/password
- [ ] Session persistence
- [ ] Logout
- [ ] Password recovery

## Profile

- [ ] Profile creator
- [ ] Gender-specific flow
- [ ] Questionnaire
- [ ] Family
- [ ] Religion
- [ ] Education
- [ ] Career
- [ ] Preferences
- [ ] Photos
- [ ] Voice

## Privacy

- [ ] Blurred images
- [ ] Private originals
- [ ] Photo access
- [ ] Voice privacy
- [ ] RLS
- [ ] Storage policies

## Matching

- [ ] Discovery
- [ ] Filters
- [ ] Shortlist
- [ ] Interest

## Conversation

- [ ] Accept interest
- [ ] Active conversation
- [ ] One-conversation restriction
- [ ] End conversation
- [ ] Start next conversation

## Chat

- [ ] Realtime
- [ ] Persistence
- [ ] Authorization
- [ ] Read state
- [ ] Failed messages

## Admin

- [ ] Profile moderation
- [ ] Reports
- [ ] Verification
- [ ] User management

---

# 100. MOST IMPORTANT AGENTIC AI RULE

Do not rush to coding.

Use:

```text
ANALYZE
↓
PLAN
↓
IMPLEMENT
↓
TEST
↓
FIX
↓
VERIFY
```

Do not claim:

> Everything is implemented

unless the implementation has actually been tested.

A feature is complete only when:

```text
UI
+
Frontend logic
+
Backend
+
Database
+
Authorization
+
Error handling
+
Testing
```

are working together.

---

# 101. FINAL EXECUTION INSTRUCTION

Start now.

## STEP 1

Inspect the entire existing repository and exported Sketch HTML.

## STEP 2

Create a screen/component inventory.

## STEP 3

Identify the current technology stack.

## STEP 4

Do not destroy the existing UI.

## STEP 5

Create/refine the Dono Jaha design system.

## STEP 6

Refactor the existing UI into reusable production components.

## STEP 7

Create the Supabase architecture.

## STEP 8

Generate the complete SQL schema and migrations.

## STEP 9

Implement Supabase Auth:

- Phone OTP
- Email + Password

## STEP 10

Implement onboarding.

## STEP 11

Implement profile creation.

## STEP 12

Implement photo storage/privacy.

## STEP 13

Implement voice recording/storage/privacy.

## STEP 14

Implement discovery and preferences.

## STEP 15

Implement interest system.

## STEP 16

Implement the **ONE ACTIVE CONVERSATION** backend rule.

## STEP 17

Implement Supabase Realtime chat.

## STEP 18

Implement Wali/family functionality.

## STEP 19

Implement security/RLS.

## STEP 20

Test everything.

## STEP 21

Fix all errors.

## STEP 22

Run the final UI consistency audit.

## STEP 23

Provide a final implementation report containing:

```text
1. What was implemented
2. What files were created
3. What files were modified
4. Supabase tables created
5. Storage buckets created
6. RLS policies created
7. SQL that needs to be executed
8. Environment variables required
9. Features fully functional
10. Features requiring configuration
11. Known limitations
12. How to run the project
```

---

# HARD RULES

## DO NOT

- Rename Dono Jaha
- Discard the existing Sketch UI
- Introduce AI-slop design
- Invent random UI components
- Use fake authentication
- Use fake backend data in production
- Expose private photos
- Expose private voice files
- Trust frontend authorization
- Bypass RLS
- Allow multiple active matrimonial conversations
- Store passwords yourself
- Hardcode Supabase secrets
- Claim something works without testing it
- Create unnecessary infrastructure
- Over-engineer the MVP

## DO

- Preserve existing design
- Polish it
- Centralize design tokens
- Reuse components
- Use Supabase
- Use real authentication
- Use PostgreSQL
- Use Storage
- Use Realtime
- Implement RLS
- Implement server-side authorization
- Implement the one-conversation rule at backend level
- Protect photos
- Protect voice
- Save onboarding progress
- Make the app fast
- Make the UI consistent
- Document everything
- Produce executable SQL
- Build incrementally
- Test before declaring completion

---

# FINAL PRODUCT DEFINITION

At the end of this implementation, a real user should be able to:

```text
Download Dono Jaha
       ↓
See branded onboarding
       ↓
Register using phone OTP
       OR
Email/password
       ↓
Choose who the profile is for
       ↓
Complete the questionnaire
       ↓
Upload photos
       ↓
Configure photo privacy
       ↓
Record voice introduction
       ↓
Configure voice privacy
       ↓
Set partner preferences
       ↓
Preview profile
       ↓
Publish profile
       ↓
Discover suitable profiles
       ↓
Listen to eligible voice introductions
       ↓
View protected/blurred photos according to permissions
       ↓
Send Interest
       ↓
Wait for acceptance
       ↓
Interest accepted
       ↓
One Active Conversation created
       ↓
Chat through Dono Jaha
       ↓
Optional Wali involvement
       ↓
End conversation
       ↓
Only then become eligible for another active conversation
```

---

# RECOMMENDED FIRST AGENTIC TASK

Because the existing Sketch → HTML export already exists, **do not immediately tell the agent to build the entire application**.

First give the agent the repository and ask it to perform only:

> **Audit the existing UI and convert it into a Dono Jaha design-system/component architecture without changing the visual identity yet.**

It should return:

1. Existing screens found
2. Existing components found
3. Existing assets found
4. Existing fonts
5. Existing colors
6. Existing spacing system
7. Existing navigation
8. Screens that are incomplete/broken
9. Components that can be reused
10. Components that should be refactored
11. Proposed production architecture
12. Files it intends to modify

Only after this audit should it begin the theme/color polish and full implementation.

---

# DONO JAHA ARCHITECTURE TARGET

```text
                         DONO JAHA
                             │
              ┌──────────────┴──────────────┐
              │                             │
         MOBILE APP                     SUPABASE
              │                             │
       React Native/Expo               PostgreSQL
       TypeScript                      Auth
              │                        Storage
              │                        Realtime
              │                        RLS
              │
       ┌──────┼────────┐
       │      │        │
   Onboarding Profiles Discovery
       │      │        │
       ├──────┼────────┤
       │      │        │
     Photos Voice   Preferences
       │      │        │
       └──────┼────────┘
              │
          Interests
              │
     ONE ACTIVE CHAT
              │
            Wali
              │
          Settings
```

**This is the implementation target.**
