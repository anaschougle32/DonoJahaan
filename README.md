# Dono Jaha (D O N O   J A H A)

> **A Serene, Respectful Muslim Matrimonial Mobile Application**  
> Built with **React Native (Expo SDK 52) + TypeScript + Supabase + Native Mobile APIs**.  
> Designed with intentionality, modesty photo curtains, authentic voice introductions (30–120s), family/wali chaperone oversight, and the foundational **One Active Matrimonial Conversation** rule.

---

## Technical Stack

- **Mobile Framework:** React Native 0.76.7 / Expo SDK 52
- **Language:** TypeScript 5.3 (strict mode)
- **Navigation:** React Navigation v7 (Native Stack + Bottom Tabs)
- **Audio & Media:** `expo-av` (recording + soundwave playback), `expo-blur` (modesty curtains)
- **Database & Realtime:** Supabase (PostgreSQL 15, Auth OTP, Storage, Realtime, Edge Functions)
- **Typography:** Google Fonts `@expo-google-fonts/manrope` (Headlines) and `@expo-google-fonts/inter` (Body/Labels)
- **Design System:** Deep Emerald (`#0B6B57` / `#005141`), Warm Parchment (`#FCFCFA` / `#F2FCF6`), Heritage Gold (`#D4AF37`), 8pt grid rhythm, 14px button radius, 16px card radius.

---

## Quick Start — Running the Mobile Application

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Start Expo Dev Server
```bash
# Start the Expo development bundler
npx expo start

# Run directly on Android emulator / connected device
npm run android

# Run directly on iOS simulator (macOS)
npm run ios
```

Scan the QR code with **Expo Go** on your physical Android or iOS device to test with native touch, safe areas, camera, and microphone.

---

## Native Architecture & Project Structure

```text
DonoJaha/
├── App.tsx                     # Native root component with font loader & theme
├── index.js                    # Expo registerRootComponent entry
├── app.json                    # Expo configuration & permissions (microphone, etc.)
├── babel.config.js             # Babel preset for Expo
├── tsconfig.json               # TypeScript strict configuration
├── NATIVE_MIGRATION_PLAN.md    # Master 50-screen inventory & token migration plan
│
├── src/
│   ├── theme/
│   │   └── tokens.ts           # Unified palette, typography, spacing, radii, shadows
│   ├── types/
│   │   └── index.ts            # Type definitions (Profiles, Suitors, Messages, Wali, etc.)
│   ├── lib/
│   │   └── supabase/client.ts  # Supabase client with offline/mock fallback
│   ├── navigation/
│   │   ├── types.ts            # Navigation parameter types
│   │   ├── TabNavigator.tsx    # 5 native bottom tabs (Home, Discover, Interests, Chat, Profile)
│   │   └── RootNavigator.tsx   # Stack orchestrating Auth, Questionnaire, Tabs & Modals
│   ├── components/
│   │   └── common/
│   │       ├── TopBar.tsx              # Native top bar with back chevron & step progress
│   │       ├── PrimaryButton.tsx       # 52px height, 14px radius native button
│   │       ├── InputField.tsx          # 52px input with +91 phone prefix and focus glow
│   │       ├── SelectionCard.tsx       # Option selection cards with active border
│   │       ├── SelectableChip.tsx      # Filter and demographic pill chips
│   │       ├── ModestyPhotoCurtain.tsx # Expo blur curtain with lock badge and tap-to-request
│   │       ├── VoiceStudio.tsx         # Mobile audio recorder, preview & soundwave player
│   │       └── BottomSheetModal.tsx    # Native slide-up modal bottom sheet
│   └── features/
│       ├── auth/
│       │   ├── SplashScreen.tsx        # 3-slide onboarding (Values, Privacy, Purpose)
│       │   ├── PhoneAuthScreen.tsx     # +91 phone number entry & trust verification
│       │   └── OtpVerificationScreen.tsx # 6-digit OTP verification with countdown timer
│       ├── onboarding/
│       │   └── QuestionnaireScreen.tsx # 8-step comprehensive profile creation questionnaire
│       ├── home/
│       │   └── HomeScreen.tsx          # Dashboard, profile completion, active conversation hero
│       ├── discovery/
│       │   └── DiscoverScreen.tsx      # Curated match cards with modesty blur & voice preview
│       ├── search/
│       │   └── AdvancedFiltersScreen.tsx # Preference filters (Salah, Education, Wali, Halal)
│       ├── interests/
│       │   └── InterestsScreen.tsx     # Received, Sent, Shortlisted hub with One-Conversation guard
│       ├── chat/
│       │   └── ChatScreen.tsx          # Chaperoned 1-on-1 chat, voice note bubbles, contact modal
│       ├── wali/
│       │   └── WaliDashboardScreen.tsx # Chaperone controls, transcript review & co-Wali invites
│       └── settings/
│           ├── ProfileHubScreen.tsx    # Profile summary, journey links, trust verification
│           └── AccountSettingsScreen.tsx # Pause profile toggle, delete account modal, data export
│
└── supabase/
    ├── migrations/             # 14 modular, atomic SQL migrations
    │   ├── 001_extensions.sql
    │   ├── 002_profiles.sql
    │   ├── 003_profile_details.sql
    │   ├── 004_family.sql
    │   ├── 005_photos.sql
    │   ├── 006_voice.sql
    │   ├── 007_preferences.sql
    │   ├── 008_interests.sql
    │   ├── 009_conversations.sql  # Database-enforced One Active Conversation Rule
    │   ├── 010_messages.sql
    │   ├── 011_wali.sql
    │   ├── 012_security_rls.sql
    │   ├── 013_storage.sql
    │   └── 014_notifications_audit.sql
    └── supabase_schema.sql     # Unified single-run migration script
```

---

## The One Active Conversation Rule

In Dono Jaha, users may only engage in **one active matrimonial conversation** at a time to promote serious commitment, intentionality, and dignified focus.

### Database-Level Enforcement:
This rule is strictly enforced at the PostgreSQL database engine level and **cannot be bypassed by the client**:

1. **Atomic Partial Unique Index:**
   ```sql
   CREATE UNIQUE INDEX uq_one_active_conversation_per_profile
   ON conversation_members(profile_id)
   WHERE status = 'active';
   ```
2. **Transactional Trigger:**
   The `process_conversation_status_change()` trigger intercepts all status updates and interest acceptances, raising a clean SQL exception (`P0001`) if a suitor already has an active conversation.
3. **Atomic RPC:**
   The `accept_interest_and_create_conversation()` function manages interest transitions and conversation activation atomically within a single database transaction.

---

## Connecting Supabase Backend

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Set your project credentials in `.env`:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. Execute the SQL migrations located in `supabase/migrations/` (or run `supabase/supabase_schema.sql` directly in the Supabase SQL Editor).
5. All Row Level Security (RLS) policies and Storage buckets (`profile-public`, `profile-blurred`, `profile-private`, `voice-introductions`) will be provisioned automatically.
"# DonoJahaan" 
