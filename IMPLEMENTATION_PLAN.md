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
