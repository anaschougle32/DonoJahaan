# DONO JAHA — MASTER STITCH FIDELITY & COMPLETE FRONTEND UI POLISH REPORT

**Date:** October 6, 2026  
**Project:** Dono Jaha (D O N O   J A H A) — Muslim Matrimonial Mobile Application  
**Execution Pass:** Master Stitch Fidelity + Complete Frontend UI Polish  
**Status:** Successfully Audited, Polished, Unified & Verified  

---

## EXECUTIVE SUMMARY

Following the complete frontend inventory and visual audit, this Polish Pass addressed all 20 top UI polish issues, resolved cross-screen inconsistencies, removed legacy prototype theme leaks, enforced strict safe-area insets for modern Android edge-to-edge screens, synchronized user profile data across tabs, data-driven the profile completion metric, integrated the real halal `VoiceStudio` into the profile setup flow, and standardized session security/logout behavior.

---

## 1. SCREENS POLISHED (21 + 1 Unrouted)

| # | Screen Name | File Path | Polish Highlights |
|---|---|---|---|
| 1 | **LogoSplashScreen** | `src/features/auth/LogoSplashScreen.tsx` | Enforced top safe insets (`insets.top + 12`), isolated dev showcase button behind `__DEV__`, brand purple backdrop & gold calligraphy preserved. |
| 2 | **SplashScreen** | `src/features/auth/SplashScreen.tsx` | Added `useSafeAreaInsets` (top/bottom), removed prototype label `"Splash 01"`, unified tagline `"Serene Matrimony"`. |
| 3 | **PhoneAuthScreen** | `src/features/auth/PhoneAuthScreen.tsx` | Added top safe inset to header, removed prototype `"QUICK FILL DEMO"` chips, empty initial state, disabled button until 10 digits entered, bottom safe dock. |
| 4 | **OtpVerificationScreen** | `src/features/auth/OtpVerificationScreen.tsx` | Added top safe inset, empty 6-box initial state, auto-advance focus forwarding across inputs, backspace navigation, button disabled until 6 digits entered. |
| 5 | **QuestionnaireScreen** | `src/features/onboarding/QuestionnaireScreen.tsx` | 6 Phase 1 essential discoverability questions, verified top/bottom insets, progress rail, structured lookup integration for States and Cities. |
| 6 | **ProfileSetupCompleteScreen** | `src/features/onboarding/ProfileSetupCompleteScreen.tsx` | Profile Live celebration milestone (55% milestone badge), replaced hardcoded hex codes with design tokens, non-blocking transition into Phase 2. |
| 7 | **FamilyDetailsScreen** | `src/features/onboarding/FamilyDetailsScreen.tsx` | Phase 2 family background & values, radio selector cards, safe bottom dock inset, updates central profile state. |
| 8 | **PartnerPreferencesScreen** | `src/features/onboarding/PartnerPreferencesScreen.tsx` | Structured age, education, and sect preferences; multi-select chips; safe bottom dock inset. |
| 9 | **SecondaryProfileWizardScreen** | `src/features/onboarding/SecondaryProfileWizardScreen.tsx` | Batches 2A (physical/career), 2B (income/family), 2C (media). **Integrated real `VoiceStudio` directly into Batch 2C**; verified separation of profile photo and selfie verification. |
| 10 | **SelfieVerificationScreen** | `src/features/onboarding/SelfieVerificationScreen.tsx` | Removed duplicate double-padding, updated camera options to modern Expo API, strict privacy messaging, halal verified badge assurance. |
| 11 | **HomeScreen** | `src/features/home/HomeScreen.tsx` | Added top safe inset to greeter row, synced user identity to `currentUserProfile` ("Anas"), connected dynamic data-driven completion metrics (`getProfileCompletionMetrics`). |
| 12 | **MatchesScreen** | `src/features/matches/MatchesScreen.tsx` | Dynamic `feedViewportHeight` single-viewport snapping (1 card = 1 exact viewport, 0 overlap), safe top insets, search and filter modals. |
| 13 | **MatchProfileCard** | `src/features/matches/MatchProfileCard.tsx` | Veiled female photo (`ModestyPhotoCurtain`), photo reveal request modal, male clear photo, voice intro placed **immediately below** profile image, bio chips. |
| 14 | **DiscoverScreen** | `src/features/search/DiscoverScreen.tsx` | Preserved as legacy prototype artifact; excluded from primary routing to prevent competing with Matches feed. |
| 15 | **AdvancedFiltersScreen** | `src/features/search/AdvancedFiltersScreen.tsx` | Safe area insets (top/bottom), Salah frequency, dietary options, voice intro, modesty veil filters. |
| 16 | **InterestsScreen** | `src/features/interests/InterestsScreen.tsx` | Added top safe inset to tabs row, Sent/Received/Shortlist views, one active conversation guard logic. |
| 17 | **ChatScreen** | `src/features/chat/ChatScreen.tsx` | Added safe top/bottom insets, **removed legacy emerald leak** `rgba(11, 107, 87, 0.1)` from `shieldIconCircle`, synced sender name to `currentUserProfile`, contact share sheet. |
| 18 | **ProfileHubScreen** | `src/features/settings/ProfileHubScreen.tsx` | Synchronized user identity to `currentUserProfile` ("Anas, 28 • Mumbai"), **resolved completion contradiction** using dynamic metrics (no simultaneous 100% and 65%), **removed legacy emerald leak** on line 509, standardized sign-out. |
| 19 | **ProfileDetailScreen** | `src/features/profile/ProfileDetailScreen.tsx` | Added safe top inset to header, safe bottom dock inset, Modesty Photo Curtain, voice player, respectful End Chat sheet. |
| 20 | **WaliDashboardScreen** | `src/features/wali/WaliDashboardScreen.tsx` | Added safe top inset, linked chaperone status, permission toggles, guardian governance cards. |
| 21 | **NotificationsScreen** | `src/features/notifications/NotificationsScreen.tsx` | **Removed legacy emerald leak** on line 347 (`thumbLockOverlay`), verified top safe inset, modesty veiled thumbnails. |
| 22 | **AccountSettingsScreen** | `src/features/settings/AccountSettingsScreen.tsx` | Added dedicated "Session Security / Log Out" action card, updated copy from "Discover" to "Matches feed", standardized reset navigation to `PhoneAuth`. |

---

## 2. COMPONENTS POLISHED

1. **`TopBar` (`src/components/common/TopBar.tsx`)**:
   - Replaced hardcoded cream background (`rgba(252, 252, 250, 0.95)`) with `colors.surface` (`#FDFCFC`).
   - Standardized back arrow icon (`arrow-back`, size 24), title typography, and progress rail.
2. **`ModestyPhotoCurtain` (`src/components/common/ModestyPhotoCurtain.tsx`)**:
   - Fixed deprecated `experimentalBlurMethod` to `blurMethod="none"`.
   - **Removed legacy emerald overlay** (`rgba(11, 107, 87, 0.4)`) on Android, replaced with Royal Plum privacy tint (`rgba(90, 47, 120, 0.48)`).
   - Replaced dark background from old prototype green-black (`rgba(20, 29, 26, 0.25)`) to Deep Plum (`rgba(36, 27, 51, 0.35)`).
3. **`BottomSheetModal` (`src/components/common/BottomSheetModal.tsx`)**:
   - Replaced dark backdrop from legacy green-black (`rgba(20, 29, 26, 0.55)`) to Deep Plum (`rgba(36, 27, 51, 0.65)`).
   - Added `useSafeAreaInsets` for dynamic bottom padding on edge-to-edge Android devices (`Math.max(insets.bottom + 16, spacing.xl)`).
   - Standardized top radius to `radii.modal` (24px).
4. **`TabNavigator` (`src/navigation/TabNavigator.tsx`)**:
   - Added `useSafeAreaInsets` to dynamically scale bottom tab bar height and padding (`54 + bottomInset`).
   - Prevents Android gesture navigation bar from obscuring tab labels or icons.
5. **`VoiceStudio` (`src/components/common/VoiceStudio.tsx`)**:
   - Connected to `SecondaryProfileWizardScreen` (Batch 2C).
   - Features 4 inspiration prompts, live recording waveform animation, 120-second safety clamp, playback preview, and timer formatting.
6. **`PrimaryButton` (`src/components/common/PrimaryButton.tsx`)**:
   - Verified 4 variants (`primary`, `secondary`, `outline`, `danger`), `radii.button` (14px), loading spinner, and disabled contrast states.
7. **`InputField` (`src/components/common/InputField.tsx`)**:
   - Verified focus state borders, error text, helper text, country code selector (`+91`), and left/right icon buttons.
8. **`SelectableChip` (`src/components/common/SelectableChip.tsx`)**:
   - Verified pill shape, primary soft background when selected, and smooth border transitions.
9. **`SelectionCard` (`src/components/common/SelectionCard.tsx`)**:
   - Verified radio indicators, icon box styling, and selected purple tint.
10. **`MatchProfileCard` (`src/features/matches/MatchProfileCard.tsx`)**:
    - Normalized vertical proportions to `cardHeight`, locked voice intro directly under image, and protected modesty overlays.

---

## 3. GLOBAL TOKEN CHANGES (`src/theme/tokens.ts`)

Added centralized semantic color roles requested by the Design System:
- `primaryLight: '#F0E6F1'` (Light Lavender background tint)
- `text: '#241B33'` (Deep Plum dark text)
- `textSecondary: '#59445F'` (Soft Plum muted text)
- `privacy: '#5A2F78'` (Royal Plum for modesty curtain & privacy badges)
- `verified: '#D4AF37'` (Heritage Gold for verified member badge)
- `lightLavender: '#F0E6F1'`
- `lavenderSurface: '#DBCADD'`
- `deepPlum: '#241B33'`
- `softPlum: '#59445F'`
- `radii.modal: 24` (Standardized for bottom sheets & dialogue modals)
- `radii.sheet: 24`

---

## 4. TYPOGRAPHY CHANGES

- Preserved Stitch font families: `Manrope` for display headlines, `Inter` for body, labels, and buttons.
- Removed random uppercase strings where sentence case was required.
- Unified screen titles to `headlineMd` (20px / weight 600) and card titles to `labelLg` (16px / weight 600).
- Standardized caption typography to `11px / weight 500` with proper letter spacing.

---

## 5. COLOR CHANGES & THEME LEAK REMOVAL

Completely eradicated legacy prototype theme colors:
1. **`ChatScreen.tsx:290`**: Replaced `'rgba(11, 107, 87, 0.1)'` with `colors.primarySoft` (`#F0E6F1`).
2. **`ProfileHubScreen.tsx:515`**: Replaced `'rgba(11, 107, 87, 0.1)'` with `colors.primarySoft` (`#F0E6F1`).
3. **`NotificationsScreen.tsx:347`**: Replaced `'rgba(11, 107, 87, 0.25)'` with Royal Plum tint `'rgba(90, 47, 120, 0.35)'`.
4. **`ModestyPhotoCurtain.tsx:50`**: Replaced `'rgba(11, 107, 87, 0.4)'` with Royal Plum tint `'rgba(90, 47, 120, 0.48)'`.
5. **`ModestyPhotoCurtain.tsx:114`**: Replaced `'rgba(20, 29, 26, 0.25)'` with Deep Plum `'rgba(36, 27, 51, 0.35)'`.
6. **`BottomSheetModal.tsx:56`**: Replaced `'rgba(20, 29, 26, 0.55)'` with Deep Plum `'rgba(36, 27, 51, 0.65)'`.
7. **`TopBar.tsx:72`**: Replaced hardcoded `'rgba(252, 252, 250, 0.95)'` with `colors.surface`.

---

## 6. RADIUS NORMALIZATION

Standardized intentional radii hierarchy:
- **Buttons and Inputs:** `radii.button = 14px`
- **Cards and Panels:** `radii.card = 16px`
- **Hero Containers & Badges:** `radii.xl = 20px`
- **Bottom Sheets & Dialog Modals:** `radii.modal = 24px`
- **Chips & Avatars:** `radii.pill = 9999px`

---

## 7. SPACING NORMALIZATION

- Standardized mobile horizontal screen margin to `spacing.margin = 20px`.
- Standardized card content padding to `spacing.md = 16px`.
- Replaced arbitrary pixel gutters (`10px`, `14px`) with tokens `spacing.sm (8px)` and `spacing.md (16px)`.

---

## 8. SAFE-AREA & SYSTEM BAR FIXES

Fixed missing safe top insets on screens that previously collided with Android status bars:
- `HomeScreen`: Added `paddingTop: insets.top` to container.
- `InterestsScreen`: Added `paddingTop: insets.top + 8` to container.
- `ChatScreen`: Added `paddingTop: insets.top` to container.
- `ProfileDetailScreen`: Added `paddingTop: insets.top` to container and safe bottom padding to dock.
- `WaliDashboardScreen`: Added `paddingTop: insets.top` to container.
- `PhoneAuthScreen` & `OtpVerificationScreen`: Added `paddingTop: insets.top`.
- `TabNavigator`: Added dynamic bottom inset handling (`54 + bottomInset`).
- `SelfieVerificationScreen`: Removed duplicate `paddingTop` inside `SafeAreaView`.

---

## 9. NAVIGATION FIXES & STANDARDIZATION

1. **Standardized Logout Destination**:
   - `AccountSettingsScreen` and `ProfileHubScreen` now both execute `navigation.reset({ index: 0, routes: [{ name: 'PhoneAuth' }] })`.
   - Clears back-stack completely upon sign out so unauthenticated users cannot navigate back into private screens.
2. **Exclusion of Competing Discover Screen**:
   - `DiscoverScreen.tsx` remains strictly unrouted in bottom tabs; `MatchesScreen` is the sole discovery experience.
3. **Showcase Mode Isolation**:
   - Wrapped `"UI Showcase"` link in `LogoSplashScreen` behind `__DEV__`.
   - Normal production builds display only clean user CTAs.

---

## 10. COPY & DATA CONSISTENCY FIXES

1. **User Identity Synchronization**:
   - Created `src/data/userProfile.ts` with `currentUserProfile`.
   - Reconciled greeting across Home and Profile Hub to `"Anas, 28 • Software Architect • Mumbai"`.
2. **Reconciled Completion Contradiction**:
   - Implemented `getProfileCompletionMetrics(currentUserProfile)`.
   - Dynamically calculates exact percentage (e.g., 65%) based on completed profile fields.
   - Profile Hub now shows matching percentage and next step (`"Profile 65% complete • Add family details"`).
   - Removed simultaneous `"Profile 100% Complete"` badge.
3. **Copy Polish**:
   - Replaced `"hidden from Discover"` in Account Settings with `"hidden from Matches feed"`.
   - Replaced `"Splash 01"` in Splash screen with `"Serene Matrimony"`.

---

## 11. ACCESSIBILITY FIXES

- Added `accessibilityRole="button"` and `accessibilityRole="checkbox"` to interactive cards.
- Added `accessibilityLabel` to icon-only buttons (Notifications, Back, Close, Filter).
- Ensured minimum touch target sizes (`>= 44x44 dp`).

---

## 12. LEGACY PROTOTYPE CODE REMOVED

- Removed `"QUICK FILL DEMO"` chips from `PhoneAuthScreen`.
- Removed hardcoded dummy OTP array (`['5', '8', '2', '4', '1', '9']`) from `OtpVerificationScreen`.
- Removed prototype labels (`"Splash 01"`, `"Splash 02"`, `"Splash 03"`).
- Removed legacy green/emerald theme values (`rgba(11, 107, 87, ...)` and `rgba(20, 29, 26, ...)`).

---

## 13. FEATURES INTENTIONALLY NOT CHANGED

- Supabase backend client configuration (`src/services/supabase.ts`) and database schema (`supabase_schema.sql`) were preserved untouched.
- Core matrimonial matchmaking algorithms, Islamic moderation rules, and database schema remain intact.

---

## 14. REMAINING VISUAL DISCREPANCIES

- Dynamic blurred photos in web view use CSS `filter: blur(14px)`, whereas native platforms use `BlurView` from `expo-blur`. Both render consistent visual privacy.

---

## 15. REMAINING FUNCTIONAL DISCREPANCIES

- Live SMS delivery requires Supabase Twilio/Msg91 SMS provider credentials in `.env`.
- Live camera capture in `SelfieVerificationScreen` falls back gracefully to a sample avatar when running on Android emulator environments without physical cameras.

---

## 16. SCREENS REQUIRING STITCH COMPARISON

- All 21 actively routed screens have been compared and aligned with the Stitch HTML/CSS source of truth in `stitch_duplicate_of_matrimony_app_green_palate/`.

---

## 17. VERIFICATION MATRIX

- **TypeScript Compilation:** `npx tsc --noEmit` passed with **0 errors**.
- **Metro Bundler:** Running on port 8081 with cleared cache, bundling Android and Web modules cleanly.
- **Safe Area Inset Handling:** Tested and confirmed on edge-to-edge layouts.
