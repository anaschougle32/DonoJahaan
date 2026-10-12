# DONO JAHA — CURRENT FRONTEND SCREEN INVENTORY
**Generated:** October 6, 2026  
**Repository Source of Truth:** `c:\Users\choug\OneDrive\Desktop\DonoJaha\src`  
**Purpose:** Comprehensive Codebase Scan & Screen Inventory for Visual Audit  

---

## 1. Summary of Identified Screens & Routes

| # | Screen Name | File Path | Route ID | Classification | Implementation Status |
|---|-------------|-----------|----------|----------------|-----------------------|
| 1 | Logo Splash | `src/features/auth/LogoSplashScreen.tsx` | `LogoSplash` | `[AUTH]` | UI Implemented • Mocked Navigation |
| 2 | Splash Onboarding Carousel | `src/features/auth/SplashScreen.tsx` | `Splash` | `[AUTH]` `[ONBOARDING]` | UI Implemented • Static Assets |
| 3 | Phone Login | `src/features/auth/PhoneAuthScreen.tsx` | `PhoneAuth` | `[AUTH]` | UI Implemented • Demo Bypass & Supabase Client |
| 4 | OTP Verification | `src/features/auth/OtpVerificationScreen.tsx` | `OtpVerification` | `[AUTH]` | UI Implemented • Interactive PIN State |
| 5 | Questionnaire (Phase 1) | `src/features/onboarding/QuestionnaireScreen.tsx` | `Questionnaire` | `[ONBOARDING]` | UI Implemented • Searchable Location Modals |
| 6 | Profile Setup Milestone (55%) | `src/features/onboarding/ProfileSetupCompleteScreen.tsx` | `ProfileSetupComplete` | `[ONBOARDING]` | UI Implemented • Progress Milestone |
| 7 | Secondary Profile Wizard (Phase 2) | `src/features/onboarding/SecondaryProfileWizardScreen.tsx` | `SecondaryProfileWizard` | `[ONBOARDING]` `[PROFILE]` | UI Implemented • 2A, 2B, 2C Batching |
| 8 | Selfie Verification | `src/features/onboarding/SelfieVerificationScreen.tsx` | `SelfieVerification` | `[VERIFICATION]` | UI Implemented • Native Camera + Front Viewfinder |
| 9 | Family Details (Legacy Direct) | `src/features/onboarding/FamilyDetailsScreen.tsx` | `FamilyDetails` | `[ONBOARDING]` `[PROFILE]` | UI Implemented • Form State |
| 10 | Partner Preferences (Legacy Direct) | `src/features/onboarding/PartnerPreferencesScreen.tsx` | `PartnerPreferences` | `[ONBOARDING]` `[PROFILE]` | UI Implemented • Chip Multi-select |
| 11 | Home Hub | `src/features/home/HomeScreen.tsx` | `HomeTab` (Tab) | `[PROFILE]` `[OTHER]` | UI Implemented • Active Chat Banner & Mock Data |
| 12 | Matches (Reels Snap Feed) | `src/features/matches/MatchesScreen.tsx` | `MatchesTab` (Tab) | `[MATCHES]` `[DISCOVERY]` | UI Implemented • Full-Screen Snapping Feed |
| 13 | Discover Grid (Stitch Legacy) | `src/features/discovery/DiscoverScreen.tsx` | None (Unrouted) | `[DISCOVERY]` `[MATCHES]` | UI: IMPLEMENTED • NAVIGATION: UNCONNECTED |
| 14 | Interests & Shortlists | `src/features/interests/InterestsScreen.tsx` | `InterestsTab` (Tab) | `[MATCHES]` `[PROFILE]` | UI Implemented • 3-Tab Filter (Received/Sent/Shortlist) |
| 15 | Chaperoned Chat | `src/features/chat/ChatScreen.tsx` | `ChatTab` (Tab) | `[CHAT]` `[VOICE]` | UI Implemented • Wali Banner & Contact Modal |
| 16 | My Profile Hub | `src/features/settings/ProfileHubScreen.tsx` | `ProfileTab` (Tab) | `[PROFILE]` `[SETTINGS]` | UI Implemented • Verification Badges & Menu |
| 17 | Profile Detail Modal | `src/features/profile/ProfileDetailScreen.tsx` | `ProfileDetail` | `[PROFILE]` `[MODAL]` | UI Implemented • Halal Exit & Modesty Curtain |
| 18 | Wali Chaperone Dashboard | `src/features/wali/WaliDashboardScreen.tsx` | `WaliDashboard` | `[SETTINGS]` `[OTHER]` | UI Implemented • Guardian Permissions & Invites |
| 19 | Advanced Filters Modal | `src/features/search/AdvancedFiltersScreen.tsx` | `AdvancedFilters` | `[MATCHES]` `[MODAL]` | UI Implemented • Deen & Lifestyle Criteria |
| 20 | Notifications & Quiet Hours | `src/features/notifications/NotificationsScreen.tsx` | `Notifications` | `[SETTINGS]` `[OTHER]` | UI Implemented • Unread Cards & Action Links |
| 21 | Account Settings | `src/features/settings/AccountSettingsScreen.tsx` | `AccountSettings` | `[SETTINGS]` | UI Implemented • Pause & Data Export & Delete |

---

## 2. Screen-by-Screen Detailed Audit

### Screen 1: Brand Logo Splash
- **SCREEN ID:** `SCREEN-01`
- **SCREEN NAME:** Logo Splash
- **FILE:** `src/features/auth/LogoSplashScreen.tsx`
- **ROUTE:** `LogoSplash` (Initial Route of Root Stack)
- **CLASSIFICATION:** `[AUTH]`
- **PURPOSE:** Brand introduction screen displaying Bismillah, the Dono Jaha golden crescent crest, typography, and Quranic marriage verse (Surah Ar-Rum 30:21).
- **ENTRY POINT:** Cold app launch.
- **NEXT SCREENS:** 
  - `Splash` (via "Get Started" button)
  - `PhoneAuth` (via "I already have an account" button)
  - `MainTabs` / `MatchesTab` (via "Explore without account" link)
- **BACK/NAVIGATION BEHAVIOR:** Root screen; no back navigation.
- **IMPORTANT COMPONENTS:** Vector crescent crest, golden Bismillah callout, Quranic verse card, dual CTA buttons.
- **USER ACTIONS:** Tap "Begin Journey", Tap "Log In", Tap "Explore Modest Matches".
- **DATA DISPLAYED:** Surah Ar-Rum 30:21 translation and reference.
- **CURRENT UI STATES:** Default static layout.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • BACKEND: NOT NEEDED

---

### Screen 2: Splash Onboarding Carousel
- **SCREEN ID:** `SCREEN-02`
- **SCREEN NAME:** Splash Onboarding (3-Slide Carousel)
- **FILE:** `src/features/auth/SplashScreen.tsx`
- **ROUTE:** `Splash`
- **CLASSIFICATION:** `[AUTH]` `[ONBOARDING]`
- **PURPOSE:** Introduces core Islamic matrimonial value propositions (Sacred union, Modesty & Haya, Family & Wali involvement).
- **ENTRY POINT:** `LogoSplashScreen` ("Begin Journey").
- **NEXT SCREENS:**
  - `PhoneAuth` (upon completing 3 slides or tapping "Skip")
  - `MainTabs` / `MatchesTab` (optional skip)
- **BACK/NAVIGATION BEHAVIOR:** Tap back arrow to return to previous slide or exit to `LogoSplash`.
- **IMPORTANT COMPONENTS:** `SplashIllustrations` (`FamilyIllustration`, `ShieldIllustration`, `WaliIllustration`), dot indicators, progress bar, `PrimaryButton`.
- **USER ACTIONS:** Swipe/Next slide, Skip onboarding, Tap "Begin Account Creation".
- **DATA DISPLAYED:** Slide title, subtitle, Quranic motto, slide position (1 of 3, 2 of 3, 3 of 3).
- **CURRENT UI STATES:** Interactive state `activeSlide` (0, 1, 2).
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • BACKEND: NOT NEEDED

---

### Screen 3: Phone Authentication
- **SCREEN ID:** `SCREEN-03`
- **SCREEN NAME:** Phone Authentication
- **FILE:** `src/features/auth/PhoneAuthScreen.tsx`
- **ROUTE:** `PhoneAuth`
- **CLASSIFICATION:** `[AUTH]`
- **PURPOSE:** Collects mobile phone number with international country codes (+91 India, +971 UAE, +966 KSA, +44 UK, +1 USA) and initiates SMS verification.
- **ENTRY POINT:** `SplashScreen` or `LogoSplashScreen`.
- **NEXT SCREENS:** `OtpVerification` (passing parameter `{ phone: string }`).
- **BACK/NAVIGATION BEHAVIOR:** Returns to previous screen via header arrow.
- **IMPORTANT COMPONENTS:** `InputField`, `PrimaryButton`, country picker modal, quick demo autofill chip (`98230 12345`), Chaperone notice pill.
- **USER ACTIONS:** Edit phone number, select country code, tap quick demo number, tap "Send Verification Code".
- **DATA DISPLAYED:** Country code (+91), phone input, security disclaimers.
- **CURRENT UI STATES:** Empty input, Filled input, Country picker open, Loading indicator state.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • BACKEND: SUPABASE CLIENT CONFIGURED (Mocked bypass available for testing)

---

### Screen 4: OTP Verification
- **SCREEN ID:** `SCREEN-04`
- **SCREEN NAME:** OTP Verification
- **FILE:** `src/features/auth/OtpVerificationScreen.tsx`
- **ROUTE:** `OtpVerification`
- **CLASSIFICATION:** `[AUTH]`
- **PURPOSE:** Validates 6-digit one-time security passcode sent via SMS.
- **ENTRY POINT:** `PhoneAuthScreen`.
- **NEXT SCREENS:** `Questionnaire` (Phase 1 Essential Onboarding).
- **BACK/NAVIGATION BEHAVIOR:** Header back arrow returns to `PhoneAuth`.
- **IMPORTANT COMPONENTS:** 6-box PIN input array with auto-focus shifting, countdown timer (`0:45`), "Resend Code" link, `PrimaryButton`.
- **USER ACTIONS:** Type 6-digit digits, auto-advance, tap "Verify & Continue", tap "Change Number", tap "Resend Code".
- **DATA DISPLAYED:** Target phone number, countdown seconds remaining.
- **CURRENT UI STATES:** Empty PIN, Partial PIN, Complete PIN (triggers auto-verify), Error alert state.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • BACKEND: SIMULATED AUTO-VERIFY (Accepts any 6 digits or default demo `123456`)

---

### Screen 5: Questionnaire (Phase 1 Essential Setup)
- **SCREEN ID:** `SCREEN-05`
- **SCREEN NAME:** Matrimonial Questionnaire (Phase 1)
- **FILE:** `src/features/onboarding/QuestionnaireScreen.tsx`
- **ROUTE:** `Questionnaire`
- **CLASSIFICATION:** `[ONBOARDING]`
- **PURPOSE:** Asks the minimum 6 essential discoverability questions to make a basic matrimonial profile discoverable in suitor searches.
- **ENTRY POINT:** `OtpVerificationScreen`.
- **NEXT SCREENS:** `ProfileSetupComplete` (Live Milestone).
- **BACK/NAVIGATION BEHAVIOR:** Back arrow decrements step; at step 0 exits to splash/auth.
- **IMPORTANT COMPONENTS:** Step indicator rail, `SelectionCard`, `InputField`, `SelectableChip`, Search State Modal (FlatList with 36 Indian states), Search City Modal (FlatList with 40+ normalized cities with parent state links).
- **USER ACTIONS:**
  - Step 1: Select profile creator (Myself, Daughter, Son, Sibling, Ward) + Gender (Sister / Brother)
  - Step 2: Input First Name, Last Name, Verified Email
  - Step 3: Input DOB Day, Month, Year (Calculates live age)
  - Step 4: Verify Religion (Muslim), Sect (Sunni, Shia, etc.), Madhhab (Hanafi, Shafi'i, etc.)
  - Step 5: Open State Search Modal $\rightarrow$ pick state; Open City Search Modal $\rightarrow$ pick city; select Sub-community
  - Step 6: Select Marital Status & Mother Tongue
  - Tap "Save & Make Profile Live 🎉"
- **DATA DISPLAYED:** Current step (1 to 6), progress percentage (16% to 100%), calculated age, active selections.
- **CURRENT UI STATES:** 6 distinct step screens, Search State Modal open/filtered, Search City Modal open/filtered.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • BACKEND: MOCKED IN LOCAL STATE (Saves to state and advances to milestone)

---

### Screen 6: Profile Setup Complete (Phase 1 Milestone)
- **SCREEN ID:** `SCREEN-06`
- **SCREEN NAME:** Profile Live Milestone
- **FILE:** `src/features/onboarding/ProfileSetupCompleteScreen.tsx`
- **ROUTE:** `ProfileSetupComplete`
- **CLASSIFICATION:** `[ONBOARDING]`
- **PURPOSE:** Celebratory milestone screen confirming that basic profile is now **LIVE / ACTIVE**, showing **55% completeness**, and seamlessly inviting continuation into Phase 2.
- **ENTRY POINT:** `QuestionnaireScreen` completion.
- **NEXT SCREENS:**
  - `SecondaryProfileWizard` (via primary button "Continue to Complete Profile →")
  - `MainTabs` / `MatchesTab` (via secondary link "Explore Matches for now")
- **BACK/NAVIGATION BEHAVIOR:** Back button disabled/intercepted to prevent re-entering completed questionnaire.
- **IMPORTANT COMPONENTS:** Ambient checkmark badge, 55% progress rail, Phase 2 preview checklist (Education & Profession, Family details, Photos & Selfie verification), trust pill.
- **USER ACTIONS:** Tap "Continue to Complete Profile", Tap "Explore Matches for now".
- **DATA DISPLAYED:** "BISMILLAH • PROFILE ACTIVE", "Your profile is live! 🎉", "Profile 55% complete", copy: *"Complete your profile to improve your match recommendations."*
- **CURRENT UI STATES:** Default static celebration state.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • BACKEND: NOT NEEDED

---

### Screen 7: Secondary Profile Wizard (Phase 2 Batches)
- **SCREEN ID:** `SCREEN-07`
- **SCREEN NAME:** Secondary Profile Wizard (Batches 2A, 2B, 2C)
- **FILE:** `src/features/onboarding/SecondaryProfileWizardScreen.tsx`
- **ROUTE:** `SecondaryProfileWizard`
- **CLASSIFICATION:** `[ONBOARDING]` `[PROFILE]`
- **PURPOSE:** Completes profile in bite-sized batches (2A: Academic/Professional, 2B: Family/Preferences, 2C: Media/Selfie) avoiding long 50-question fatigue.
- **ENTRY POINT:** `ProfileSetupCompleteScreen`.
- **NEXT SCREENS:**
  - `SelfieVerification` (opens dedicated camera verification)
  - `MainTabs` / `MatchesTab` (upon batch 2C completion)
- **BACK/NAVIGATION BEHAVIOR:** Returns to previous batch (2C $\rightarrow$ 2B $\rightarrow$ 2A) or exits back to milestone.
- **IMPORTANT COMPONENTS:**
  - Height stepper (`ft / in` with live `cm`)
  - Search Education Modal (Searchable list of 20 degrees with `education_id`)
  - Search Profession Modal (15 category filter pills + 30+ professions with `profession_id`)
  - Preferred Education & Profession modals with `[ Open to All ]`
  - Photo picker (`expo-image-picker`) + Haya Modesty Curtain toggle
  - Voice Introduction audio preview pill
  - Dedicated Selfie Verification card leading to verification flow
- **USER ACTIONS:** Step height, search education, search profession, select income tier, toggle modesty veil, play voice preview, tap "Take Verification Selfie", advance batches.
- **DATA DISPLAYED:** Batch 2A (75%), Batch 2B (90%), Batch 2C (100%), structured IDs and labels.
- **CURRENT UI STATES:** Batch 2A state, Batch 2B state, Batch 2C state, Education Search Modal, Profession Search Modal, Preferred Education Modal, Preferred Profession Modal.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • BACKEND: NORMALIZED DATASETS CONNECTED

---

### Screen 8: Selfie Verification
- **SCREEN ID:** `SCREEN-08`
- **SCREEN NAME:** Dedicated Selfie Verification
- **FILE:** `src/features/onboarding/SelfieVerificationScreen.tsx`
- **ROUTE:** `SelfieVerification`
- **CLASSIFICATION:** `[VERIFICATION]`
- **PURPOSE:** Dedicated identity verification capturing a real selfie with front camera, strictly separated from public profile photos and stored privately.
- **ENTRY POINT:** `SecondaryProfileWizardScreen` (Batch 2C) or Profile Hub.
- **NEXT SCREENS:** Returns to caller upon verification confirmation.
- **BACK/NAVIGATION BEHAVIOR:** Header back arrow or "Skip" link.
- **IMPORTANT COMPONENTS:** Front-camera viewfinder (`expo-image-picker`), verified green emblem, confidentiality disclaimer box, `PrimaryButton`, Retake button.
- **USER ACTIONS:** Tap "Take Selfie", permit camera access, snap front selfie, preview photo, tap "Retake Selfie", tap "Submit Verification Selfie".
- **DATA DISPLAYED:** "Verify your profile", "This selfie is only used for verification and won't be shown on your profile", camera preview URI.
- **CURRENT UI STATES:** Uncaptured state (viewfinder placeholder), Captured state (preview with checkmark), Verifying spinner state.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • CAMERA: NATIVE EXPO CAMERA PERMISSION CONNECTED • BACKEND: STORAGE ISOLATED

---

### Screen 9: Family Details (Legacy Direct Screen)
- **SCREEN ID:** `SCREEN-09`
- **SCREEN NAME:** Family Details Screen
- **FILE:** `src/features/onboarding/FamilyDetailsScreen.tsx`
- **ROUTE:** `FamilyDetails`
- **CLASSIFICATION:** `[ONBOARDING]` `[PROFILE]`
- **PURPOSE:** Deep standalone form for family location, living arrangement, financial status, and parent occupations.
- **ENTRY POINT:** Profile Hub menu or direct route.
- **NEXT SCREENS:** `PartnerPreferencesScreen` (via "Save Family Details").
- **BACK/NAVIGATION BEHAVIOR:** Header back arrow.
- **IMPORTANT COMPONENTS:** `InputField`, Yes/No button toggle, Selectable chips for financial status (`Elite`, `High`, `Middle`, `Aspiring`), Family type chips (`Nuclear`, `Joint`), `PrimaryButton`.
- **USER ACTIONS:** Edit location, toggle living with family, select financial status, edit parents' occupations, save.
- **DATA DISPLAYED:** Current family details.
- **CURRENT UI STATES:** Default form, Edited form.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • ROUTE: REGISTERED IN ROOT NAVIGATOR

---

### Screen 10: Partner Preferences (Legacy Direct Screen)
- **SCREEN ID:** `SCREEN-10`
- **SCREEN NAME:** Partner Preferences Screen
- **FILE:** `src/features/onboarding/PartnerPreferencesScreen.tsx`
- **ROUTE:** `PartnerPreferences`
- **CLASSIFICATION:** `[ONBOARDING]` `[PROFILE]`
- **PURPOSE:** Standalone preference filter for partner age range, marital status, income, and profession.
- **ENTRY POINT:** `FamilyDetailsScreen` or Profile Hub menu.
- **NEXT SCREENS:** `MainTabs` / `MatchesTab`.
- **BACK/NAVIGATION BEHAVIOR:** Header back arrow.
- **IMPORTANT COMPONENTS:** Age stepper buttons, multi-select chips for marital status, income tier selector chips, profession chips with typeahead search, `PrimaryButton`.
- **USER ACTIONS:** Adjust age range, select marital status, search professions, toggle managed by, tap "Apply & Find Compatible Matches".
- **DATA DISPLAYED:** Current partner criteria.
- **CURRENT UI STATES:** Default state, Filtered profession state.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • ROUTE: REGISTERED IN ROOT NAVIGATOR

---

### Screen 11: Home Dashboard (Tab 1)
- **SCREEN ID:** `SCREEN-11`
- **SCREEN NAME:** Home Screen
- **FILE:** `src/features/home/HomeScreen.tsx`
- **ROUTE:** `HomeTab` in `MainTabs`
- **CLASSIFICATION:** `[PROFILE]` `[OTHER]`
- **PURPOSE:** Main logged-in dashboard highlighting the user's single active matrimonial conversation, prayer times, profile completion banner, and daily Hadith on marriage.
- **ENTRY POINT:** Bottom tab bar "Home" tab or login completion.
- **NEXT SCREENS:**
  - `ChatTab` (via "Open Chaperoned Chat")
  - `ProfileDetail` (via tapping suitor card)
  - `Notifications` (via bell icon)
  - `FamilyDetails` (via completion banner)
  - `MatchesTab` (via "Explore Daily Matches")
- **BACK/NAVIGATION BEHAVIOR:** Root tab; standard Android back button handles tab switching.
- **IMPORTANT COMPONENTS:** Greeter card, profile progress micro-banner (65%), **Active Matrimonial Conversation Hero Card** (with Wali Monitored badge and action button), Curated Proposals carousel, Daily Marriage Hadith card, Prayer Times widget.
- **USER ACTIONS:** Tap active suitor, tap chat, tap match proposals, tap notifications bell, tap complete profile link.
- **DATA DISPLAYED:** User greeting ("Good morning, Anas"), active suitor name, photo, status, prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha), Hadith text.
- **CURRENT UI STATES:** Active conversation present, No active conversation (fallback prompt), 65% completion banner.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • BACKEND: MOCK DATA DRIVEN

---

### Screen 12: Matches (Full-Screen Vertical Paged Snap Feed - Tab 2)
- **SCREEN ID:** `SCREEN-12`
- **SCREEN NAME:** Matches Feed (Reels/TikTok Snap UX)
- **FILE:** `src/features/matches/MatchesScreen.tsx` & `src/components/matches/MatchProfileCard.tsx`
- **ROUTE:** `MatchesTab` in `MainTabs`
- **CLASSIFICATION:** `[MATCHES]` `[DISCOVERY]`
- **PURPOSE:** Full-screen vertical paged feed where each profile occupies **exactly one viewport** with snap-to-interval scrolling.
- **ENTRY POINT:** Bottom tab bar "Matches" tab or onboarding completion.
- **NEXT SCREENS:**
  - `ProfileDetail` (tapping profile specs)
  - `Notifications` (bell icon)
  - `AdvancedFilters` (funnel icon)
  - `ChatTab` (from One Active Conversation modal)
- **BACK/NAVIGATION BEHAVIOR:** Root tab.
- **IMPORTANT COMPONENTS:**
  - Header with notification badge
  - Subheader filter pills (Funnel, Search, New 178, Daily 20)
  - Paged `FlatList` with `snapToInterval={feedViewportHeight}` and dynamic `onLayout` measurement
  - `MatchProfileCard`:
    - Female profile with Haya blurred veil + "Request Photo Reveal" button
    - Male profile with clear photo
    - **Interactive Voice Introduction Pill immediately below image** (Waveforms, play/pause, duration `0:45`)
    - Name, Age, Verified badge, Height, Sect, Profession, Location, Online/Wali tags, Bio
    - Action dock: "Like this Profile?" / "Connect Now" checkmark
  - One Active Conversation Rule Modal (Intercepts 2nd active connection)
  - Photo Reveal Request Modal
  - Quick Suitor Search Modal
- **USER ACTIONS:** Swipe vertically up/down (snaps to profile), tap play on voice intro, tap request photo reveal, tap connect button, tap filter pill, search suitors.
- **DATA DISPLAYED:** Suitor matrimonial biodata, photo, voice status, compatibility badge.
- **CURRENT UI STATES:**
  - Veiled female photo state
  - Clear male photo state
  - Revealed photo state (after request)
  - Playing voice intro state (animated waveforms)
  - One Active Conversation Rule Modal visible
  - Photo Request Modal visible
  - Quick Search Modal visible
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • SNAPPING: NATIVE REACT NATIVE FLATLIST SNAP

---

### Screen 13: Discover Grid (Stitch Legacy Screen)
- **SCREEN ID:** `SCREEN-13`
- **SCREEN NAME:** Discover Screen (Legacy Stitch Grid)
- **FILE:** `src/features/discovery/DiscoverScreen.tsx`
- **ROUTE:** *Unrouted in RootNavigator / TabNavigator*
- **CLASSIFICATION:** `[DISCOVERY]` `[MATCHES]`
- **PURPOSE:** Early prototype grid discovery screen with card list, `ModestyPhotoCurtain`, and bottom sheet filters.
- **ENTRY POINT:** None currently registered in `RootNavigator`.
- **NEXT SCREENS:** `ProfileDetail`.
- **BACK/NAVIGATION BEHAVIOR:** None.
- **IMPORTANT COMPONENTS:** Search input, filter button, `ModestyPhotoCurtain`, `PrimaryButton`, `BottomSheetModal` for filters and photo requests.
- **USER ACTIONS:** Search, open filter bottom sheet, tap request photo, send interest.
- **DATA DISPLAYED:** List of suitors from `mockCuratedMatches`.
- **CURRENT UI STATES:** Unblurred suitor, Blurred suitor, Filter bottom sheet open, Photo request bottom sheet open.
- **IMPLEMENTATION STATUS:** **UI: IMPLEMENTED • NAVIGATION: UNCONNECTED / UNROUTED**

---

### Screen 14: Interests & Requests (Tab 3)
- **SCREEN ID:** `SCREEN-14`
- **SCREEN NAME:** Interests Screen
- **FILE:** `src/features/interests/InterestsScreen.tsx`
- **ROUTE:** `InterestsTab` in `MainTabs`
- **CLASSIFICATION:** `[MATCHES]` `[PROFILE]`
- **PURPOSE:** Manages incoming matrimonial interests, sent interests, and shortlisted candidate profiles.
- **ENTRY POINT:** Bottom tab bar "Interests" tab (shows unread badge "2").
- **NEXT SCREENS:**
  - `ProfileDetail` (tapping any suitor card)
  - `ChatTab` (upon accepting interest)
- **BACK/NAVIGATION BEHAVIOR:** Root tab.
- **IMPORTANT COMPONENTS:** 3-chip filter switch (`Received (2)`, `Sent (1)`, `Shortlisted (4)`), suitor interest cards with avatar, Wali note, Accept button, One-Active-Conversation rule dialog interceptor.
- **USER ACTIONS:** Toggle tabs, view proposal notes, tap Accept Proposal, tap suitor card.
- **DATA DISPLAYED:** Suitor name, age, sect, location, received timestamp, introduction note.
- **CURRENT UI STATES:** Received tab active, Sent tab active, Shortlisted tab active, One Active Conversation alert modal.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • BACKEND: MOCK DATA DRIVEN

---

### Screen 15: Chaperoned Chat (Tab 4)
- **SCREEN ID:** `SCREEN-15`
- **SCREEN NAME:** Chaperoned Chat Screen
- **FILE:** `src/features/chat/ChatScreen.tsx`
- **ROUTE:** `ChatTab` in `MainTabs`
- **CLASSIFICATION:** `[CHAT]` `[VOICE]`
- **PURPOSE:** Dedicated one-on-one communication hub enforcing the One-Active-Conversation rule with prominent Wali oversight banner and direct contact sharing modal.
- **ENTRY POINT:** Bottom tab bar "Chat" tab, Home active chat card, or Interests accept.
- **NEXT SCREENS:**
  - `ProfileDetail` (via menu)
  - `WaliDashboard` (via menu)
- **BACK/NAVIGATION BEHAVIOR:** TopBar back button.
- **IMPORTANT COMPONENTS:**
  - TopBar with candidate name and menu
  - **Dignified & Chaperoned Chat Banner** ("Active Wali" tag and modesty reminder)
  - Message bubble list (text messages, system timestamps, read receipts `done-all`)
  - **Voice Message Bubble with play/pause and progress bar**
  - Composer dock: TextInput, Send button, Contact Share trigger icon
  - **Share Direct Contact Bottom Sheet Modal** (shares mobile + guardian coordinate)
- **USER ACTIONS:** Type text message, tap send (appends to message list), play voice note, tap contact share button, confirm contact share modal.
- **DATA DISPLAYED:** Messages between user and active suitor (Ayesha M.), timestamps, read status.
- **CURRENT UI STATES:** Empty composer, Filled composer, Voice note playing, Share Contact bottom sheet modal open.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • REALTIME: LOCAL STATE DRIVEN (Supabase client ready for channel subscription)

---

### Screen 16: My Profile Hub (Tab 5)
- **SCREEN ID:** `SCREEN-16`
- **SCREEN NAME:** Profile Hub Screen
- **FILE:** `src/features/settings/ProfileHubScreen.tsx`
- **ROUTE:** `ProfileTab` in `MainTabs`
- **CLASSIFICATION:** `[PROFILE]` `[SETTINGS]`
- **PURPOSE:** User's personal account dashboard displaying photo, verification status, completion rate, preferences menu, Wali link, and security options.
- **ENTRY POINT:** Bottom tab bar "Profile" tab.
- **NEXT SCREENS:**
  - `ProfileDetail` (tapping profile card)
  - `FamilyDetails` (tapping completion milestone)
  - `PartnerPreferences` (menu item)
  - `WaliDashboard` (menu item)
  - `Notifications` (menu item)
  - `AccountSettings` (menu item)
  - `PhoneAuth` (sign out)
- **BACK/NAVIGATION BEHAVIOR:** Root tab.
- **IMPORTANT COMPONENTS:** Profile avatar with verification checkmark, completion micro-banner, grouped menu lists with icons and chevrons, Sign Out button.
- **USER ACTIONS:** Tap profile card, tap add family details, navigate to sub-screens, tap sign out.
- **DATA DISPLAYED:** User name, age, country, completion status (100% card vs 65% banner), profession.
- **CURRENT UI STATES:** Default menu state.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • BACKEND: MOCK DATA DRIVEN

---

### Screen 17: Profile Detail Modal
- **SCREEN ID:** `SCREEN-17`
- **SCREEN NAME:** Profile Detail Screen
- **FILE:** `src/features/profile/ProfileDetailScreen.tsx`
- **ROUTE:** `ProfileDetail` (Stack Screen with slide_from_bottom animation)
- **CLASSIFICATION:** `[PROFILE]` `[MODAL]`
- **PURPOSE:** Deep full-screen candidate profile view showcasing photos with modesty veil, voice introduction, Deen & lifestyle matrix, family background, and halal exit modal.
- **ENTRY POINT:** Tapping any suitor card across Home, Matches, Interests, or Profile Hub.
- **NEXT SCREENS:**
  - `ChatTab` (via "Open Chaperoned Chat")
  - `HomeTab` (upon concluding connection)
- **BACK/NAVIGATION BEHAVIOR:** TopBar back arrow closes modal.
- **IMPORTANT COMPONENTS:**
  - `TopBar` with suitor name
  - `ModestyPhotoCurtain` with tap-to-request photo reveal
  - Voice Introduction card with prompt and audio play button
  - About Me bio card
  - **Deen & Islamic Practice Grid** (Salah habit, Quran recitation, Fasting, Halal diet, Attire)
  - **Career & Education Matrix** (Degree, Field, University, Annual Income)
  - **Family & Living Background Card** (Family values, living arrangement, Wali details)
  - Bottom Action Dock with "Chat" and "Respectfully End Conversation" button
  - **Respectful Halal Exit Bottom Sheet Modal** (Select reason: "Values mismatch", "No mutual chemistry", "Found another proposal", etc.)
- **USER ACTIONS:** Request photo unlock, play voice intro, scroll matrix, tap chat, open halal exit modal, confirm termination.
- **DATA DISPLAYED:** Complete candidate matrimonial biodata.
- **CURRENT UI STATES:** Veiled photo state, Unveiled photo state, Playing voice state, Halal exit bottom sheet open.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • MOCK PROFILE: `mockActiveSuitor`

---

### Screen 18: Wali Chaperone Dashboard
- **SCREEN ID:** `SCREEN-18`
- **SCREEN NAME:** Wali Dashboard Screen
- **FILE:** `src/features/wali/WaliDashboardScreen.tsx`
- **ROUTE:** `WaliDashboard`
- **CLASSIFICATION:** `[SETTINGS]` `[OTHER]`
- **PURPOSE:** Guardian control center displaying linked Wali identity, permissions governance (chat review, suitor photo approvals, father-to-father coordination), and co-chaperone invite.
- **ENTRY POINT:** `ProfileHubScreen` menu item.
- **NEXT SCREENS:** Back to Profile Hub.
- **BACK/NAVIGATION BEHAVIOR:** Header back arrow.
- **IMPORTANT COMPONENTS:** `TopBar`, Linked Wali card with active status pill, Governance settings rows with checkmarks, "Invite Elder / Mother as Co-Wali" button.
- **USER ACTIONS:** Review permissions, tap invite co-Wali.
- **DATA DISPLAYED:** Guardian name (Tariq Khan), relationship (Father), status (Confirmed & Active), permission rules.
- **CURRENT UI STATES:** Default static layout.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • BACKEND: MOCK DATA DRIVEN

---

### Screen 19: Advanced Filters Modal
- **SCREEN ID:** `SCREEN-19`
- **SCREEN NAME:** Advanced Filters Screen
- **FILE:** `src/features/search/AdvancedFiltersScreen.tsx`
- **ROUTE:** `AdvancedFilters` (Stack modal presentation)
- **CLASSIFICATION:** `[MATCHES]` `[MODAL]`
- **PURPOSE:** Detailed matrimonial matching criteria modal filtering by Salah frequency, Voice Intro presence, Modesty photo veil, Halal diet, and non-drinking lifestyle.
- **ENTRY POINT:** Funnel icon on `MatchesScreen`.
- **NEXT SCREENS:** Returns to Matches on Apply or Close.
- **BACK/NAVIGATION BEHAVIOR:** Close "X" icon returns to caller.
- **IMPORTANT COMPONENTS:** Header with Reset button, Barakah banner, Location picker, Multi-select chip group for Salah habit (`Always 5 Times`, `Usually`, `Sometimes`), Toggle switches for Voice intro, Modesty blur only, Halal diet, and Non-drinker, `PrimaryButton` ("Apply Filters").
- **USER ACTIONS:** Reset filters, toggle Salah chips, toggle switches, tap apply.
- **DATA DISPLAYED:** Filter states and counts.
- **CURRENT UI STATES:** Default filters, Modified filters, Reset state.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • FILTERS: LOCAL STATE APPLIED

---

### Screen 20: Notifications & Quiet Hours
- **SCREEN ID:** `SCREEN-20`
- **SCREEN NAME:** Notifications Screen
- **FILE:** `src/features/notifications/NotificationsScreen.tsx`
- **ROUTE:** `Notifications`
- **CLASSIFICATION:** `[SETTINGS]` `[OTHER]`
- **PURPOSE:** Notification inbox showing interest acceptances, photo requests, and guardian approvals, along with a prayer-time quiet hours scheduler.
- **ENTRY POINT:** Bell icon on `HomeScreen` or `MatchesScreen`, or menu in Profile Hub.
- **NEXT SCREENS:** `ChatTab` (via notification action link).
- **BACK/NAVIGATION BEHAVIOR:** Header back arrow.
- **IMPORTANT COMPONENTS:** Header with "Mark all read" button, Unread notification card with veiled thumbnail, Wali Activity card, **Prayer Time Quiet Hours Banner** (pauses notifications during Tahajjud and Fajr), action button "Open Chat".
- **USER ACTIONS:** Tap "Mark all read", tap notification card, open chat.
- **DATA DISPLAYED:** Notification titles, subtitles, timestamps, quiet hours schedule (11:00 PM - 5:30 AM).
- **CURRENT UI STATES:** Unread state (1 New badge, purple tint), All Read state.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • REALTIME: STATIC MOCK DATA

---

### Screen 21: Account Settings
- **SCREEN ID:** `SCREEN-21`
- **SCREEN NAME:** Account & Privacy Settings Screen
- **FILE:** `src/features/settings/AccountSettingsScreen.tsx`
- **ROUTE:** `AccountSettings`
- **CLASSIFICATION:** `[SETTINGS]`
- **PURPOSE:** Privacy and account lifecycle settings: Pause profile from discoverability, request GDPR/data export archive, and permanent account erasure with confirmation modal.
- **ENTRY POINT:** Menu in `ProfileHubScreen`.
- **NEXT SCREENS:** `LogoSplash` (upon confirmed account deletion or sign out).
- **BACK/NAVIGATION BEHAVIOR:** Header back arrow.
- **IMPORTANT COMPONENTS:**
  - Pause Profile toggle switch with active/inactive status banners
  - Request Data Archive button with confirmation alert
  - Delete Account card with danger button
  - **Account Deletion Confirmation Modal** (Bilingual warning, reason, Confirm / Cancel buttons)
- **USER ACTIONS:** Toggle pause profile, request data archive, tap delete account, confirm deletion modal.
- **DATA DISPLAYED:** Account status, data export status, deletion warnings.
- **CURRENT UI STATES:** Profile paused state, Profile visible state, Data export sent state, Delete modal visible.
- **IMPLEMENTATION STATUS:** UI: IMPLEMENTED • LIFECYCLE: LOCAL STATE / MOCK CONFIRMATIONS

---

## 3. Safe Area & System UI Audit

| Screen Name | Top Inset Handling | Bottom Inset Handling | Potential System Overlap | Status |
|-------------|--------------------|-----------------------|--------------------------|--------|
| `LogoSplashScreen` | Raw `<View>` | Raw `<View>` | Status bar overlays splash header | ⚠️ Minor overlap on Android notch |
| `SplashScreen` | `SafeAreaView` | `SafeAreaView` | None | ✅ Clean |
| `PhoneAuthScreen` | `SafeAreaView edges={['top']}` | Raw dock | None | ✅ Clean |
| `OtpVerificationScreen` | `SafeAreaView edges={['top']}` | Raw dock | None | ✅ Clean |
| `QuestionnaireScreen` | `useSafeAreaInsets() (Math.max(top, 14))` | `useSafeAreaInsets() (Math.max(bottom, 16))` | None | ✅ Clean |
| `ProfileSetupCompleteScreen` | `useSafeAreaInsets() (Math.max(top, 24))` | `useSafeAreaInsets() (Math.max(bottom, 24))` | None | ✅ Clean |
| `SecondaryProfileWizardScreen` | `useSafeAreaInsets() (Math.max(top, 14))` | `useSafeAreaInsets() (Math.max(bottom, 16))` | None | ✅ Clean |
| `SelfieVerificationScreen` | `useSafeAreaInsets() (Math.max(top, 12))` | Bottom dock padding | None | ✅ Clean |
| `FamilyDetailsScreen` | `SafeAreaView edges={['top']}` | ScrollView padding | None | ✅ Clean |
| `PartnerPreferencesScreen` | `SafeAreaView edges={['top']}` | ScrollView padding | None | ✅ Clean |
| `HomeScreen` | Raw `<ScrollView>` (No insets) | Handled by Tab Bar | Top greeter touches Android status bar | ⚠️ Needs safe area padding |
| `MatchesScreen` | `useSafeAreaInsets() (Math.max(top, 10))` | Handled by Tab Bar | None | ✅ Clean |
| `DiscoverScreen` | Raw `<View>` (No insets) | Raw dock | Search bar overlays status bar | ⚠️ Needs safe area padding |
| `InterestsScreen` | Raw `<View>` (No insets) | Handled by Tab Bar | Tabs row touches status bar | ⚠️ Needs safe area padding |
| `ChatScreen` | `KeyboardAvoidingView` (No insets on TopBar) | Handled by Tab Bar | TopBar touches status bar | ⚠️ Needs safe area padding |
| `ProfileHubScreen` | `SafeAreaView edges={['top']}` | Handled by Tab Bar | None | ✅ Clean |
| `ProfileDetailScreen` | Raw `<View>` (No insets on TopBar) | Raw dock | TopBar touches status bar | ⚠️ Needs safe area padding |
| `WaliDashboardScreen` | Raw `<View>` (No insets on TopBar) | Raw scroll | TopBar touches status bar | ⚠️ Needs safe area padding |
| `AdvancedFiltersScreen` | `SafeAreaView edges={['top', 'bottom']}` | `SafeAreaView` | None | ✅ Clean |
| `NotificationsScreen` | `SafeAreaView edges={['top']}` | Raw scroll | None | ✅ Clean |
| `AccountSettingsScreen` | `SafeAreaView edges={['top', 'bottom']}` | `SafeAreaView` | None | ✅ Clean |

---

## 4. Reusable Common Components Inventory

| Component Name | File Path | Used By (Screens) | Variants / Props | Implemented States |
|----------------|-----------|-------------------|------------------|--------------------|
| `PrimaryButton` | `src/components/common/PrimaryButton.tsx` | 14 screens | `primary`, `secondary`, `outline`, `danger`, `loading`, `disabled`, `icon` | Default, Pressed, Loading, Disabled |
| `InputField` | `src/components/common/InputField.tsx` | 9 screens | `label`, `placeholder`, `error`, `helperText`, `leftIcon`, `multiline` | Empty, Focused, Filled, Error |
| `SelectableChip` | `src/components/common/SelectableChip.tsx` | 6 screens | `label`, `selected`, `icon` | Default (Unselected), Selected |
| `SelectionCard` | `src/components/common/SelectionCard.tsx` | `QuestionnaireScreen` | `title`, `description`, `icon`, `selected` | Default, Selected (Radio checked) |
| `TopBar` | `src/components/common/TopBar.tsx` | `ChatScreen`, `ProfileDetailScreen`, `WaliDashboardScreen` | `title`, `onBack`, `rightAction` | Default with Back / Custom Right |
| `ModestyPhotoCurtain` | `src/components/common/ModestyPhotoCurtain.tsx` | `ProfileDetailScreen`, `DiscoverScreen` | `imageUri`, `isBlurred`, `onRequestAccess`, `height` | Blurred (Lock overlay), Clear/Revealed |
| `BottomSheetModal` | `src/components/common/BottomSheetModal.tsx` | `ChatScreen`, `ProfileDetailScreen`, `DiscoverScreen` | `visible`, `onClose`, `title`, `children` | Hidden, Visible (Animated backdrop) |
| `VoiceStudio` | `src/components/common/VoiceStudio.tsx` | Isolated component | `onRecordingComplete`, `initialDuration` | Idle, Recording (Live counter), Playing |
| `MatchProfileCard` | `src/components/matches/MatchProfileCard.tsx` | `MatchesScreen` | `suitor`, `cardHeight`, `isPhotoRevealed`, actions | Veiled Female, Clear Male, Audio Playing |
| `SplashIllustrations` | `src/components/illustrations/SplashIllustrations.tsx` | `SplashScreen` | `FamilyIllustration`, `ShieldIllustration`, `WaliIllustration` | Static Vector SVG / View illustrations |
