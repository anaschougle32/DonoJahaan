# Dono Jaha — Project Implementation Audit

**Date:** October 2026  
**Auditor:** Senior Full-Stack Engineer & Project Recovery Agent  
**Product:** Dono Jaha (`D O N O   J A H A`)  
**Status:** Recovered, Audited & Actively Progressing  

---

## 1. Project Purpose & Verified Technology Stack

| Dimension | Specification |
|---|---|
| **Product Purpose** | Contemporary Islamic Matrimonial application for serious marriage intentions (`Nikah`). Built with strict Islamic decorum, verified user identities, modesty photo curtaining, voice introductions, Wali (guardian) chaperoning, and the signature **One Active Matrimonial Conversation Rule**. |
| **Mobile Framework** | React Native `0.86.3` with Expo SDK `57.0.26` |
| **Programming Language** | TypeScript `5.3.3` (Strict mode, clean compilation: `tsc --noEmit` passes with 0 errors) |
| **Navigation Architecture** | `@react-navigation/native` v7, `@react-navigation/native-stack` v7, `@react-navigation/bottom-tabs` v7 |
| **Backend & Database** | Supabase (`@supabase/supabase-js` v2.49.1) on PostgreSQL 15+ (`https://fcqyukdvfifpdcckhkep.supabase.co`). All 23 tables verified live and accessible. |
| **Design System & Palette** | Luxury Brand Identity codified in `src/theme/tokens.ts`: Rich Purple (`#6A3794`), Deep Plum (`#241B33`), Soft Lavender (`#AD91C1` / `#F0E6F1`), Warm White (`#FDFCFC`), and Heritage Gold (`#D4AF37`). |
| **Typography** | `@expo-google-fonts/manrope` (Headlines 600/700) and `@expo-google-fonts/inter` (Body/Controls 400/500/600/700) |
| **Hardware / Media APIs** | `expo-image-picker`, `expo-av`, `expo-camera`, `expo-blur`, `expo-linear-gradient` |

---

## 2. Architecture & Directory Structure

```
c:\Users\choug\OneDrive\Desktop\DonoJaha\
├── src/
│   ├── components/
│   │   ├── common/         # 13 reusable UI primitives (Buttons, Modals, TopBar, PhotoCurtain, etc.)
│   │   ├── dev/            # Developer tools (FloatingDevMenu, WebSidebarSwitcher)
│   │   └── illustrations/  # Vector illustrations & splash art
│   ├── data/
│   │   ├── lookupData.ts   # Canonical Indian states, cities, sects, and communities
│   │   └── userProfile.ts  # Current user profile state & progressive completion metric calculations
│   ├── features/
│   │   ├── auth/           # LogoSplash, Splash slides (1-3), PhoneAuth, OtpVerification
│   │   ├── onboarding/     # 11 onboarding screens (Questionnaire, Physical, Education, Profession, Family, Preferences, Photos, Voice, Selfie, Complete)
│   │   ├── home/           # Dashboard with Active Conversation Hero, Curated Matches, and Profile Views entry
│   │   ├── matches/        # Vertical snap match feed, profile cards, photo access request modal, 1-active rule modal
│   │   ├── discovery/      # Grid/list alternative discovery screen
│   │   ├── interests/      # Matrimonial proposals hub (Received, Sent, Shortlists) with 1-active guard
│   │   ├── chat/           # 1-on-1 chaperoned chat interface, voice bubbles, share contact modal, end chat flow
│   │   ├── profile/        # Full narrative profile details & "Who Viewed Your Profile" screen
│   │   ├── notifications/  # Notification center
│   │   ├── search/         # Advanced filter sheet (Age, sect, height, education, relocation, prayer)
│   │   ├── settings/       # Account Settings & Profile Hub
│   │   ├── wali/           # Family & Wali Guardian Dashboard
│   │   └── dev/            # Frontend screen showcase & tester
│   ├── lib/
│   │   └── supabase/       # Supabase client initializer
│   ├── mocks/              # Mock matrimonial profiles (Ayesha, Umra, Fatima, Bilal, Farhan, etc.)
│   ├── navigation/         # RootNavigator, TabNavigator, types.ts, navigationService.ts
│   └── theme/              # Centralized tokens (colors, spacing, typography, radii, shadows)
├── supabase/
│   └── migrations/         # 14 complete PostgreSQL migrations with tables, functions, triggers, and RLS
├── .env                    # Local environment secrets (safely gitignored)
├── .env.example            # Environment variable template
├── package.json            # Scripts and dependencies
└── tsconfig.json           # TypeScript configuration
```

---

## 3. Feature Classification

### COMPLETE
- **Theme & Design Tokens:** Complete implementation in `src/theme/tokens.ts` adhering to the brand identity.
- **Type Safety:** Clean compilation with `tsc --noEmit`.
- **Database Schema:** 23 PostgreSQL tables verified live in Supabase:
  - `user_accounts`, `profiles`, `profile_basic`, `profile_physical`, `profile_religion`, `profile_education`, `profile_career`, `profile_location`, `profile_family`, `family_members`, `profile_marriage_expectations`, `photos`, `photo_access_requests`, `voice_introductions`, `voice_access_requests`, `partner_preferences`, `interests`, `shortlists`, `conversations`, `conversation_members`, `messages`, `wali_relationships`, `notifications`.
- **UI Components:** 13 common components built, styled, and responsive across web and mobile viewports.
- **Brand Splash & Walkthrough:** `LogoSplashScreen.tsx` and 3-slide `SplashScreen.tsx`.
- **Auth UI:** Phone authentication, SMS OTP input with 6-digit auto-advancing boxes and countdown timer.
- **Core 6-Step Questionnaire:** Interactive creator selection, gender branching, name, DOB, sect, state/city search modals.
- **Matches Feed:** Vertical snap cards with modesty photo curtains, voice playback preview, and compatibility highlights.
- **Active Matrimonial Chat UI:** Chaperone banner, text messages, voice player bubble, contact sharing modal, end conversation modal.
- **Profile Views:** Dedicated suitor viewer screen with time grouping (Today, Yesterday, Earlier).
- **Search & Filters:** Modal filter drawer with multi-selects and numerical ranges.
- **Wali & Guardian Hub Navigation:** `WaliDashboardScreen.tsx` registered in `RootNavigator.tsx`, `types.ts`, and accessible from `ProfileHubScreen.tsx`.
- **Dynamic Profile Details:** `ProfileDetailScreen.tsx` dynamically resolves suitors by `profileId` across Home, Matches, Views, and Interests.
- **Dynamic 1-Active Guard:** Evaluates current suitor connection dynamically on `ProfileDetailScreen.tsx`.
- **Onboarding State Reactivity:** `userProfile.ts` subscribes reactively across all Phase 2 onboarding screens, `HomeScreen`, and `ProfileHubScreen`.
- **Supabase Service Layer:** `src/services/` (`profileService.ts`, `chatService.ts`, `interestService.ts`, `storageService.ts`) actively implemented and linked.
- **Realtime Chat Integration:** Supabase Realtime channel connected in `chatService.ts` and `ChatScreen.tsx`.
- **Supabase Storage Service:** Production-oriented `storageService.ts` implemented for profile photographs, private verification selfies, voice introduction audio clips, and signed URL generation with user-scoped collision-resistant paths.
- **Connected Media Screens:** `ProfilePhotosScreen.tsx`, `VoiceIntroScreen.tsx`, and `SelfieVerificationScreen.tsx` wired to `storageService`.
- **Google Authentication:** Cross-platform OAuth flow built in `src/services/authService.ts` utilizing `expo-auth-session`, `expo-web-browser`, and `donojaha://` deep-linking. Wired to `PhoneAuthScreen.tsx`. Automatic post-auth profile resolution provisions user accounts and checks onboarding status.
- **Messaging Lock/Unlock State Machine:** Strict database-level enforcement of Dono Jaha's 1-Active-Conversation rule in `supabase/migrations/016_conversation_state_machine.sql` with transactional RPCs `can_start_conversation`, `accept_interest_and_create_conversation`, and `end_active_conversation`. Supported by `src/services/conversationStateService.ts`.
- **Fast & Reliable Realtime Messaging:** Realtime chat with message delivery states (`'sending' | 'sent' | 'failed'`), failed message retry, pagination support, deduplication, and graceful channel cleanup in `src/services/chatService.ts` and `src/features/chat/ChatScreen.tsx`.
- **Profile Creation & Sub-Table Persistence:** Modular sub-table sync in `src/services/profileService.ts` (`syncPhysicalDetailsToSupabase`, `syncEducationDetailsToSupabase`, `syncCareerDetailsToSupabase`, `syncFamilyDetailsToSupabase`, `syncPartnerPreferencesToSupabase`). Wired into all onboarding screens. `getMyProfile` enhanced to hydrate complete profile data upon app start.
- **Single-Image Modesty Blur Requirement:** Strictly ONE original photo uploaded to `profile-public` (or private if locked); no redundant blurred copies uploaded or maintained in storage. Client renders visual blur directly on the single image source using native `blurRadius` and `<BlurView>`.
- **Startup Session Hydration:** `App.tsx` calls `restoreSession()` and `getMyProfile()` to automatically restore authenticated state across app restarts.

### PARTIALLY IMPLEMENTED
- **Remote Storage Bucket Provisioning:** Storage buckets (`profile-public`, `profile-private`, `voice-introductions`) must be initialized via executing `supabase/migrations/015_storage_complete.sql` in the Supabase Dashboard SQL Editor (due to service-role permissions required to write to `storage.buckets`). Mobile app handles unprovisioned remote buckets gracefully with non-blocking diagnostic notices and seamless local preview.

### NOT IMPLEMENTED
- **Push Notifications Integration:** APNs / FCM push notification triggers for incoming interest notifications.
- **Automated E2E Tests.**

---

## 4. Blockers & Technical Debt Status

1. **Environment Variables:** RESOLVED. Dual-compatible keys (`EXPO_PUBLIC_*` and `NEXT_PUBLIC_*`) configured.
2. **Missing Navigation Links:** RESOLVED. `WaliDashboardScreen` and `SelfieVerificationScreen` wired into `ProfileHubScreen` and `RootNavigator`.
3. **Data Flow Disconnect:** RESOLVED. State persistence helpers in `src/data/userProfile.ts` connected to all onboarding screens.
4. **Dynamic Profile Detail Loading:** RESOLVED. Suitors resolved dynamically by `profileId` in `ProfileDetailScreen`.
5. **Supabase Integration:** RESOLVED. Live services implemented for Profiles, Interests, Realtime Chaperoned Chat, and Storage.
6. **Schema Alignment:** RESOLVED. Audited and aligned exact PostgreSQL schema column names across all modular profile tables (`profile_physical.height_cm`, `profile_career.employer`, `photos.storage_path_original`, `photos.privacy_status`).
7. **Messaging State Machine:** RESOLVED. Enforced at the database level via RPC functions, row locking (`FOR UPDATE`), and message insertion triggers.
8. **Single-Image Modesty Veil:** RESOLVED. Eliminated redundant blurred image uploads, utilizing native client-side blur layers directly on the single photo source.
9. **Google Auth:** RESOLVED. Integrated cross-platform OAuth flow with Supabase and deep-link handling.


