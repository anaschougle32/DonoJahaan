# Dono Jaha — Master Implementation Plan

**Product:** Dono Jaha (`D O N O   J A H A`)  
**Architecture:** React Native + Expo + TypeScript + Supabase  

---

## Milestone P0: Stabilization & Environment Normalization
- [x] Audit entire codebase and verify all 23 Supabase PostgreSQL tables.
- [x] Add dual-compatibility (`EXPO_PUBLIC_*` + `NEXT_PUBLIC_*`) in `.env` and `src/lib/supabase/client.ts` to ensure seamless runtime resolution in Expo client.
- [x] Validate TypeScript typecheck (`tsc --noEmit`).

## Milestone P1: Navigation Repair & Frontend Polish
- [x] Register `WaliDashboard` in `src/navigation/types.ts` and `src/navigation/RootNavigator.tsx`.
- [x] Add interactive "Wali & Guardian Chaperone" and "Identity Verification" navigation rows in `src/features/settings/ProfileHubScreen.tsx`.
- [x] Fix suitor dynamic lookup in `src/features/profile/ProfileDetailScreen.tsx` so clicking any profile (from Home, Matches, Views, or Interests) accurately displays that specific suitor instead of defaulting to Ayesha M.
- [x] Ensure all suitor cards across `HomeScreen`, `MatchesScreen`, `ProfileViewsScreen`, and `InterestsScreen` pass their `profileId` into navigation.

## Milestone P2: State Continuity & Onboarding Form Persistence
- [x] Implement reactive state subscriptions and `updateCurrentUserProfile()` in `src/data/userProfile.ts`.
- [x] Connect all Phase 2 onboarding screens (`PhysicalDetailsScreen`, `EducationScreen`, `ProfessionScreen`, `FamilyDetailsScreen`, `PartnerPreferencesScreen`, `ProfilePhotosScreen`, `VoiceIntroScreen`, `SelfieVerificationScreen`) to persist user input and calculate real-time completion percentages.
- [x] Wire `QuestionnaireScreen` completion to update profile basic data and mark step 1 completed.

## Milestone P3: Supabase Backend Service Layer
- [x] Implement `src/services/profileService.ts`:
  - `getMyProfile()`: load profile, details, preferences, and photos from Supabase.
  - `syncBasicProfileToSupabase()`: update basic profile tables with RLS security.
  - `getDiscoverableProfiles()`: query active, discoverable profiles matching criteria.
- [x] Implement `src/services/interestService.ts`:
  - Send, accept, decline, and query matrimonial interests with 1-active-conversation validation.
- [x] Implement `src/services/chatService.ts`:
  - Fetch active conversation messages, send message, and listen to Realtime updates.

## Milestone P4: Verification & Quality Assurance
- [x] Run full TypeScript compilation check (`npm.cmd run lint` passed with 0 errors).
- [x] Verify fallback safety for offline/demo scenarios with seamless live data switching.
- [x] Verify live Supabase database connectivity across all 23 PostgreSQL tables.

## Milestone P5: Google Authentication (Cross-Platform OAuth)
- [x] Install and configure `expo-auth-session` and `expo-web-browser` compatible with Expo SDK 57.
- [x] Configure custom deep-link scheme `"scheme": "donojaha"` in `app.json`.
- [x] Implement `src/services/authService.ts` with `signInWithGoogle()`, `handlePostAuthProfile()`, `restoreSession()`, and `signOutUser()`.
- [x] Add "Continue with Google" button to `PhoneAuthScreen.tsx` with error handling and loading indicators.
- [x] Hydrate authenticated session and matrimonial profile in `App.tsx` on application startup.
- [x] Route existing users directly to `MainTabs` and new users to `Questionnaire`.

## Milestone P6: Messaging Lock/Unlock State Machine (1-Active Conversation Rule)
- [x] Author migration `016_conversation_state_machine.sql` with atomic RPCs (`can_start_conversation`, `get_active_conversation_for_profile`, `accept_interest_and_create_conversation`, `end_active_conversation`).
- [x] Add PostgreSQL trigger `check_message_active_conversation()` rejecting message inserts on closed conversations.
- [x] Implement `src/services/conversationStateService.ts` state machine client layer.
- [x] Wire `acceptInterestAndStartConversation()` into `InterestsScreen.tsx` with row-locked atomic verification.
- [x] Update `ChatScreen.tsx` to dynamically query active conversation and support respectful conclusion modal.

## Milestone P7: Fast & Reliable Realtime Messaging
- [x] Enhance `src/services/chatService.ts` with pagination (`limit`, `offset`, `beforeTimestamp`).
- [x] Add message delivery statuses (`'sending' | 'sent' | 'failed'`) and failed message retry capability.
- [x] Add `markConversationAsRead()`.
- [x] Deduplicate Realtime incoming events against local optimistic messages.
- [x] Implement clean unsubscribe teardown on conversation exit.

## Milestone P8: Profile Creation & Sub-Table Persistence
- [x] Implement modular persistence functions in `src/services/profileService.ts` (`syncPhysicalDetailsToSupabase`, `syncEducationDetailsToSupabase`, `syncCareerDetailsToSupabase`, `syncFamilyDetailsToSupabase`, `syncPartnerPreferencesToSupabase`).
- [x] Connect `PhysicalDetailsScreen.tsx`, `EducationScreen.tsx`, `ProfessionScreen.tsx`, `FamilyDetailsScreen.tsx`, and `PartnerPreferencesScreen.tsx` to Supabase sub-tables.
- [x] Update `getMyProfile()` to query and hydrate all profile sub-tables, `partner_preferences`, and `photos`.
- [x] Dynamically calculate profile completion metrics from real saved database records.

## Milestone P9: Single-Image Modesty Veil (Zero Duplicate Uploads)
- [x] Refactor `src/services/storageService.ts` to upload strictly ONE original photograph to `profile-public` (or `profile-private`).
- [x] Eliminate redundant `profile-blurred` upload targets and duplicate files.
- [x] Store single record in `photos` with `storage_path_original` and `storage_path_blurred: null`.
- [x] Render modesty blur purely on the client using native `blurRadius` and `<BlurView>` directly on the single image source.
- [x] Maintain strict confidentiality of verification selfies in `profile-private` under `verification/`.

## Milestone P10: Storage Provisioning Instructions
- [ ] User executes `supabase/migrations/015_storage_complete.sql` in Supabase Dashboard SQL Editor to initialize remote storage buckets with service-role permissions.
