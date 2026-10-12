# Dono Jaha — Native React Native Migration Plan & Architecture

> **Document:** Master Native Migration Plan (`NATIVE_MIGRATION_PLAN.md`)  
> **Product:** Dono Jaha (D O N O   J A H A)  
> **Target Framework:** React Native + Expo + TypeScript  
> **Backend:** Supabase (PostgreSQL, Auth, Storage, Realtime)  
> **Design Reference:** 50 Stitch UI Screens (`stitch_duplicate_of_matrimony_app_green_palate`) + `serene_matrimony/DESIGN.md`

---

## Executive Summary

This document specifies the exact transition plan from the Stitch HTML/CSS source of visual truth into a production-grade **React Native mobile application** for iOS and Android.

Per the master development mandate:
1. **Zero WebView / Zero Iframe:** No HTML wrappers. Every screen is implemented using native React Native components (`View`, `Text`, `Pressable`, `ScrollView`, `FlatList`, `TextInput`, `Modal`, `SafeAreaView`).
2. **Visual Fidelity:** The React Native screens must match the Stitch visual design pixel-for-pixel (colors, typography, geometry, spacing rhythm, icons, and layout hierarchy).
3. **Database-Authoritative Business Logic:** The foundational **One Active Matrimonial Conversation Rule**, photo privacy curtains, voice introductions, and Wali chaperone mechanics are enforced by the existing Supabase PostgreSQL architecture.

---

## A. Complete Screen Inventory (50 Screens)

| # | Screen Name | Stitch Source Directory | Screenshot Status | React Native Route | Reusable Native Components | Backend / Supabase Dependency | Status |
|---|---|---|---|---|---|---|---|
| 1 | Splash 01 (Values) | `splash_01_find_someone_who_shares_your_values` | Binary PNG Available | `/(auth)/splash/01` | `PrimaryButton`, `SurfaceCard`, `ProgressPill` | None (Local branding) | Planned |
| 2 | Splash 02 (Privacy) | `splash_02_privacy_comes_first` | Binary PNG Available | `/(auth)/splash/02` | `PrimaryButton`, `ModestyPhotoCurtain`, `SelectableChip` | None (Local branding) | Planned |
| 3 | Splash 03 (Purpose) | `splash_03_purpose` | Binary PNG Available | `/(auth)/splash/03` | `PrimaryButton`, `SurfaceCard`, `SelectableChip` | None (Local branding) | Planned |
| 4 | Phone Authentication | `authentication_enter_mobile_number` | Binary PNG Available | `/(auth)/phone` | `TopBar`, `PrimaryButton`, `CountryCodePicker`, `InputField` | Supabase Auth (Phone OTP) | Planned |
| 5 | OTP Verification | `authentication_otp_verification` | Binary PNG Available | `/(auth)/otp` | `TopBar`, `PrimaryButton`, `OTPInput6`, `CountdownTimer` | Supabase Auth (Verify OTP) | Planned |
| 6 | Profile Created By | `questionnaire_profile_created_by` | HTML Render Reference | `/(onboarding)/created_by` | `TopBar`, `SelectionCard`, `ProgressHeader`, `PrimaryButton` | `profiles.created_by` | Planned |
| 7 | Full Name & Gender | `questionnaire_full_name_gender` | Binary PNG Available | `/(onboarding)/name_gender` | `TopBar`, `InputField`, `GenderSelectorCard`, `PrimaryButton` | `profiles.gender`, `profile_basic` | Planned |
| 8 | Date of Birth | `questionnaire_date_of_birth` | Binary PNG Available | `/(onboarding)/date_of_birth` | `TopBar`, `DatePickerField`, `PrimaryButton` | `profile_basic.date_of_birth` | Planned |
| 9 | Marital Status | `questionnaire_marital_status` | HTML Render Reference | `/(onboarding)/marital_status` | `TopBar`, `SelectionCardList`, `PrimaryButton` | `profile_basic.marital_status` | Planned |
| 10 | Height & Weight | `questionnaire_height_weight` | Binary PNG Available | `/(onboarding)/height_weight` | `TopBar`, `ImperialMetricPicker`, `InputField`, `PrimaryButton` | `profile_physical` | Planned |
| 11 | Body & Accessibility | `questionnaire_body_type_accessibility` | HTML Render Reference | `/(onboarding)/body_accessibility` | `TopBar`, `SelectableChipGroup`, `DignifiedHealthField` | `profile_physical.accessibility_disclosure` | Planned |
| 12 | Religious Sect & Community | `questionnaire_religious_sect_community` | HTML Render Reference | `/(onboarding)/sect_community` | `TopBar`, `SelectableChipGroup`, `InputField`, `PrimaryButton` | `profile_religion.sect`, `school_of_thought` | Planned |
| 13 | Prayer & Quran Practice | `questionnaire_prayer_quran_practice` | HTML Render Reference | `/(onboarding)/prayer_quran` | `TopBar`, `SelectionCardList`, `PrimaryButton` | `profile_religion.prayer_frequency`, `quran` | Planned |
| 14 | Fasting & Halal Strictness | `questionnaire_fasting_dietary_strictness` | HTML Render Reference | `/(onboarding)/fasting_halal` | `TopBar`, `SelectionCardList`, `PrimaryButton` | `profile_religion.fasting_practice`, `halal` | Planned |
| 15 | Attire & Appearance | `questionnaire_attire_appearance_female_flow` | HTML Render Reference | `/(onboarding)/attire_modesty` | `TopBar`, `SelectableChipGroup`, `PrimaryButton` | `profile_religion.attire_modesty` | Planned |
| 16 | Education Details | `questionnaire_education_details` | HTML Render Reference | `/(onboarding)/education` | `TopBar`, `DropdownPicker`, `InputField`, `PrimaryButton` | `profile_education` | Planned |
| 17 | Career Details | `questionnaire_career_details` | HTML Render Reference | `/(onboarding)/career` | `TopBar`, `DropdownPicker`, `IncomeRangePicker`, `PrimaryButton` | `profile_career` | Planned |
| 18 | Location & Residency | `questionnaire_current_location_residency` | HTML Render Reference | `/(onboarding)/location` | `TopBar`, `LocationCityPicker`, `PrimaryButton` | `profile_location` | Planned |
| 19 | Hometown Origin | `questionnaire_hometown_origin` | HTML Render Reference | `/(onboarding)/hometown` | `TopBar`, `InputField`, `PrimaryButton` | `profile_location.hometown_*` | Planned |
| 20 | Family Values & Status | `questionnaire_family_values_status` | HTML Render Reference | `/(onboarding)/family_values` | `TopBar`, `SelectionCardList`, `PrimaryButton` | `profile_family` | Planned |
| 21 | Family Members | `questionnaire_family_members` | HTML Render Reference | `/(onboarding)/family_members` | `TopBar`, `SiblingCardAdder`, `PrimaryButton` | `family_members` (Structured relation) | Planned |
| 22 | Diet & Lifestyle Habits | `questionnaire_diet_lifestyle_habits` | HTML Render Reference | `/(onboarding)/diet_lifestyle` | `TopBar`, `SelectableChipGroup`, `PrimaryButton` | `partner_preferences.diet_preferences` | Planned |
| 23 | Marriage Expectations | `questionnaire_marriage_expectations_living_relocation` | Binary PNG Available | `/(onboarding)/expectations` | `TopBar`, `SelectionCardList`, `PrimaryButton` | `profile_marriage_expectations` | Planned |
| 24 | Career Expectations & Wali | `questionnaire_career_expectations_wali` | HTML Render Reference | `/(onboarding)/expectations_wali` | `TopBar`, `SelectionCardList`, `PrimaryButton` | `profile_marriage_expectations.wali_*` | Planned |
| 25 | Profile Bio | `questionnaire_profile_bio` | HTML Render Reference | `/(onboarding)/bio` | `TopBar`, `CharacterCounterTextArea`, `PromptChips` | `profile_basic.bio` | Planned |
| 26 | Photo Upload & Privacy | `questionnaire_photo_upload_privacy` | HTML Render Reference | `/(onboarding)/photos` | `TopBar`, `PhotoGridUploader`, `ModestySettingToggle` | `photos`, Supabase Storage (`profile-private`) | Planned |
| 27 | Voice Introduction Studio | `questionnaire_voice_introduction` | HTML Render Reference | `/(onboarding)/voice_studio` | `TopBar`, `NativeVoiceRecorder`, `WaveformView`, `PromptChips`| `voice_introductions`, Storage | Planned |
| 28 | Partner Preferences: Basic | `partner_preferences_basic_details` | HTML Render Reference | `/(onboarding)/pref_basic` | `TopBar`, `MultiRangeSlider`, `SelectableChipGroup` | `partner_preferences` | Planned |
| 29 | Partner Preferences: Location | `partner_preferences_location_lifestyle` | HTML Render Reference | `/(onboarding)/pref_location` | `TopBar`, `LocationCityPicker`, `SelectableChipGroup` | `partner_preferences` | Planned |
| 30 | Partner Preferences: Education | `partner_preferences_background_education` | Binary PNG Available | `/(onboarding)/pref_background`| `TopBar`, `SelectableChipGroup`, `PrimaryButton` | `partner_preferences` | Planned |
| 31 | Hard vs Soft Logic | `partner_preferences_hard_vs._soft_logic` | HTML Render Reference | `/(onboarding)/pref_priority` | `TopBar`, `PrioritySegmentedPicker`, `PrimaryButton` | `partner_preference_weights` | Planned |
| 32 | Trust Verification | `trust_verification_selfie_id` | HTML Render Reference | `/(onboarding)/verification` | `TopBar`, `CameraCaptureBox`, `GovtIdUploadCard` | `profiles.verification_level` | Planned |
| 33 | Profile Preview & Validation | `profile_preview_privacy_validation` | HTML Render Reference | `/(onboarding)/preview` | `TopBar`, `SummarySectionCard`, `PrivacyStatusBadge` | `profiles`, `profile_details` | Planned |
| 34 | Onboarding Success | `profile_setup_complete_onboarding_success` | Binary PNG Available | `/(onboarding)/success` | `SuccessSeal`, `PrimaryButton`, `SubtleBadge` | `profiles.is_onboarding_completed` | Planned |
| 35 | Home Screen Dashboard | `home_screen_dashboard` | HTML Render Reference | `/(main)/(tabs)/home` | `GreeterBar`, `CompletionBanner`, `ActiveChatHero`, `ProfileScroll` | `profiles`, `conversations` (Active) | Planned |
| 36 | Discover Profile Card | `discover_profile_card` | HTML Render Reference | `/(main)/(tabs)/discover` | `DiscoverCard`, `ModestyCurtain`, `VoiceBadge`, `ActionButtons` | `profiles`, `photos`, `voice_introductions` | Planned |
| 37 | Discover Loading State | `loading_state_discover_feed` | HTML Render Reference | `/(main)/(tabs)/discover` | `SkeletonCard`, `ShimmerBox` | Client UI State | Planned |
| 38 | Discover Empty State | `empty_state_discover` | HTML Render Reference | `/(main)/(tabs)/discover` | `EmptyStateBanner`, `SecondaryButton` | Client UI State | Planned |
| 39 | Advanced Search Filters | `advanced_search_filters` | HTML Render Reference | `/(main)/search/filters` | `TopBar`, `RangeSlider`, `SelectableChipGroup`, `ApplyButton` | PostgreSQL Filter Queries | Planned |
| 40 | Profile Detail (Ayesha 27) | `profile_detail_ayesha_27` | HTML Render Reference | `/(main)/profile/[id]` | `HeroPhotoGallery`, `VoicePlayer`, `DetailSection`, `ActionDock` | `profiles`, `profile_basic`, `photos` | Planned |
| 41 | Interests Received & Shortlist | `interests_received_shortlist` | HTML Render Reference | `/(main)/(tabs)/interests` | `TabSegments`, `InterestCard`, `AcceptDeclineButtons` | `interests`, `shortlists` | Planned |
| 42 | Active Matrimonial Chat | `active_conversation_ayesha` | HTML Render Reference | `/(main)/chat/[id]` | `ChaperoneHeader`, `ChatStream`, `VoiceBubble`, `Composer` | `conversations`, `messages`, Supabase Realtime | Planned |
| 43 | Request Photo Access Modal | `request_photo_access_modal_bottom_sheet`| HTML Render Reference | `/(main)/modals/photo_access` | `NativeBottomSheet`, `InputField`, `PrimaryButton` | `photo_access_requests` | Planned |
| 44 | Share Contact Modal | `share_contact_details_modal_bottom_sheet` | HTML Render Reference | `/(main)/modals/share_contact`| `NativeBottomSheet`, `ContactInfoCard`, `PrimaryButton` | `messages` (System/Contact type) | Planned |
| 45 | End Conversation Modal | `end_conversation_report_modal_bottom_sheet` | Binary PNG Available | `/(main)/modals/end_chat` | `NativeBottomSheet`, `WarningBanner`, `DestructiveButton` | `conversations` (End RPC trigger) | Planned |
| 46 | Report & Block Flow | `report_block_flow` | HTML Render Reference | `/(main)/modals/report_block` | `TopBar`, `SelectionCardList`, `TextArea`, `DangerButton` | `reports`, `blocks` | Planned |
| 47 | Family & Wali Dashboard | `family_wali_guardian_dashboard` | HTML Render Reference | `/(main)/wali` | `TopBar`, `LinkedProfileBanner`, `ChaperoneChatFeed` | `wali_relationships` | Planned |
| 48 | Notifications Center | `notifications` | HTML Render Reference | `/(main)/notifications` | `TopBar`, `NotificationItem`, `BadgeIndicator` | `notifications` | Planned |
| 49 | My Profile Hub & Settings | `my_profile_hub_settings_menu` | HTML Render Reference | `/(main)/(tabs)/profile` | `AvatarHeader`, `SettingRowGroup`, `LogoutButton` | `profiles`, `user_accounts` | Planned |
| 50 | Account Pause & Delete | `account_settings_pause_delete` | Binary PNG Available | `/(main)/settings/account` | `TopBar`, `DestructiveActionGroup`, `ConfirmDialog` | `profiles.status = 'suspended'` | Planned |

---

## B. Design Token Inventory

The tokens below are extracted directly from `serene_matrimony/DESIGN.md` and the Master Override document. They will be codified into `src/theme/tokens.ts`:

### 1. Colors (`colors.ts`)
```typescript
export const colors = {
  // Brand Emeralds
  primary: '#0B6B57',              // Deep Emerald: Main CTAs, Active state, Identity
  primaryDark: '#075044',          // Pressed / Active touch
  primaryContainer: '#005141',     // Elevated Emerald Containers
  primarySoft: '#E8F4F0',          // Soft Tint (active chip fill, highlight backdrops)
  primaryTint: '#D8ECE6',
  primaryFixed: '#A1F2D9',
  onPrimary: '#FFFFFF',

  // Heritage Gold (Verified member seals, auspicious milestones, premium attributes)
  goldAccent: '#D4AF37',
  goldTint: '#FCF8ED',
  goldDark: '#8A711E',

  // Forest Secondary
  secondary: '#27855E',            // Forest Accent (verification badges)
  secondaryContainer: '#98F2C3',
  onSecondaryContainer: '#02714C',

  // Surfaces & Backgrounds
  background: '#FCFCFA',          // Warm parchment white
  surface: '#FCFCFA',
  surfaceCard: '#FFFFFF',          // Elevated pure white surface
  surfaceSubtle: '#F5F7F6',        // Nested attribute boxes, input fills
  surfaceContainerLow: '#ECF6F1',
  surfaceContainer: '#E6F0EB',
  surfaceContainerHigh: '#E0EAE5',
  surfaceContainerHighest: '#DBE5E0',

  // Borders & Dividers
  border: '#E4E9E6',               // Subtle slate-cream boundary
  outline: '#6F7975',
  outlineVariant: '#BEC9C3',

  // Typography
  textPrimary: '#17201D',          // Deep pine-slate: Highest contrast
  textMuted: '#68736F',            // Sage gray: Secondary metadata, timestamps
  textHint: '#9EABA6',             // Input placeholders
  textInverse: '#FFFFFF',

  // Feedback States
  success: '#27855E',
  warning: '#C98A22',
  error: '#BA1A1A',
  errorContainer: '#FFDAD6',
  onErrorContainer: '#93000A',
};
```

### 2. Typography (`typography.ts`)
*   **Headline Font Family:** `Manrope-Bold` (700), `Manrope-SemiBold` (600)
*   **Body Font Family:** `Inter-Regular` (400), `Inter-Medium` (500), `Inter-SemiBold` (600)

| Style Token | Font Family | Size | Line Height | Weight | Letter Spacing |
|---|---|---|---|---|---|
| `displayLg` | Manrope | 36px | 44px | 700 | `-0.02em` |
| `headlineXl` | Manrope | 32px | 40px | 700 | `-0.02em` |
| `headlineLg` | Manrope | 26px | 34px | 700 | `-0.01em` |
| `headlineMd` | Manrope | 22px | 30px | 600 | `0` |
| `headlineSm` | Manrope | 18px | 26px | 600 | `0` |
| `bodyLg` | Inter | 16px | 24px | 400 | `0` |
| `bodyMd` | Inter | 14px | 22px | 400 | `0` |
| `bodySm` | Inter | 12px | 18px | 400 | `0` |
| `labelLg` | Inter | 16px | 22px | 600 | `0` |
| `labelMd` | Inter | 14px | 20px | 600 | `0` |
| `labelSm` | Inter | 12px | 16px | 600 | `0.02em` |
| `caption` | Inter | 11px | 14px | 500 | `0` |

### 3. Spacing (`spacing.ts`)
Strict 8-point base metric:
*   `xs`: `4px`
*   `sm`: `8px`
*   `md`: `16px`
*   `lg`: `24px`
*   `xl`: `32px`
*   `2xl`: `48px`
*   `margin`: `20px` (Standard mobile screen horizontal padding)

### 4. Radii (`radius.ts`)
*   `sm`: `8px`
*   `md`: `12px` (Inputs, secondary cards)
*   `button`: `14px` (Standard action buttons & primary inputs)
*   `card`: `16px` (Profile cards, bottom sheets)
*   `xl`: `20px` (Hero containers)
*   `pill`: `9999px` (Status badges, chips, round avatars)

### 5. Shadows (`shadows.ts`)
*   `card`: `0px 2px 8px rgba(11, 107, 87, 0.04), 0px 1px 3px rgba(23, 32, 29, 0.03)`
*   `modal`: `0px 12px 36px rgba(20, 29, 26, 0.16)`
*   `glow`: `0px 0px 0px 3px rgba(11, 107, 87, 0.12)` (Input focus state)

### 6. Icon System
Native Vector Icons: `@expo/vector-icons` (`MaterialIcons` & `MaterialCommunityIcons`), mapped 1:1 to Google Material Symbols.

---

## C. Feature Mapping Matrix

| Feature | Primary UI Screens | Supabase Tables Involved | Storage Bucket | Realtime Channel | Edge Functions / RPCs | External Services |
|---|---|---|---|---|---|---|
| **Phone OTP Auth** | `auth/phone`, `auth/otp` | `auth.users`, `user_accounts` | None | None | None | Indian SMS Provider (MSG91 / 2Factor / Twilio) |
| **Profile Creation** | 18 Questionnaire Steps | `profiles`, `profile_basic`, `profile_physical`, `profile_religion`, `profile_education`, `profile_career`, `profile_location`, `profile_family`, `family_members` | None | None | Auto-save RPC | None |
| **Modesty Photos** | `photos`, `photo_access_modal` | `photos`, `photo_access_requests` | `profile-private`, `profile-blurred`, `profile-public` | None | Blur generation hook, Signed URL generator | Native Camera / Image Picker |
| **Voice Introduction** | `voice_studio`, `discover`, `profile_detail` | `voice_introductions`, `voice_access_requests` | `voice-introductions` | None | Duration validator (30s-120s) | Native Audio Recording (`expo-av`) |
| **Partner Preferences** | 4 Preference Screens | `partner_preferences`, `partner_preference_weights` | None | None | Deterministic match scorer | None |
| **Matrimonial Discovery** | `home`, `discover`, `filters` | `profiles`, `photos`, `voice_introductions`, `partner_preferences` | `profile-blurred` | None | Filter & search query | None |
| **Interest System** | `discover`, `interests`, `profile_detail` | `interests`, `shortlists` | None | `interests` | `accept_interest_and_create_conversation` | Push Notifications |
| **One Active Conversation** | `home`, `chat`, `end_chat_modal` | `conversations`, `conversation_members` | None | None | `process_conversation_status_change()`, `end_active_conversation()` | Database constraint engine |
| **Chaperoned Chat** | `chat/[id]`, `modals/share_contact` | `conversations`, `messages`, `wali_relationships` | `voice-introductions` (Voice Notes) | `messages:conversation_id` | Realtime broadcast | Native Audio Player |
| **Wali Oversight** | `wali`, `notifications` | `wali_relationships`, `conversations`, `messages` | None | `messages` | Chaperone transcript access validator | SMS / Email invites |
| **Governance & Safety** | `report_block`, `settings/account` | `reports`, `blocks`, `audit_logs`, `profiles` | None | None | Account anonymizer / soft delete | None |

---

## D. Migration Risks & Native Solutions

| # | Web/Stitch HTML Construct | React Native Limitation / Risk | Native Mobile Solution |
|---|---|---|---|
| 1 | **CSS Gaussian Blur (`filter: blur(...)`)** | React Native does not support arbitrary CSS filter strings on `<Image />`. | Use `expo-blur` (`<BlurView intensity={35} />`) layered directly on top of the image container, combined with server-rendered blurred thumbnails from `profile-blurred`. |
| 2 | **HTML Web Audio (`<audio>` / Web Audio API)** | Browser audio primitives do not exist in React Native. | Use `expo-av` (`Audio.Sound` and `Audio.Recording`) with native microphone permissions and real audio waveforms. |
| 3 | **Sticky Top Header & Safe Areas (`pt-safe`, `pb-safe`)** | Web CSS environment variables (`env(safe-area-inset-top)`) are inconsistent in RN. | Use `react-native-safe-area-context` (`useSafeAreaInsets()`) and structured `<SafeAreaView>` containers. |
| 4 | **Fixed Bottom Dock / Keyboard Overlap** | Floating action bars and chat composers get obscured when the virtual keyboard opens. | Use `KeyboardAvoidingView` with `behavior={Platform.OS === 'ios' ? 'padding' : 'height'}` and `react-native-keyboard-controller`. |
| 5 | **Modal Bottom Sheets (`backdrop-blur-xl`)** | Web CSS backdrop-filter is unavailable on standard Android views. | Use `@gorhom/bottom-sheet` or native React Native `<Modal>` with an animated semi-transparent overlay backdrop. |
| 6 | **Horizontal Scrollbars & Touch Sluggishness** | Web `overflow-x: auto` is clunky in mobile WebViews. | Use native `<FlatList horizontal showsHorizontalScrollIndicator={false} />` with optimal view recycling. |
| 7 | **Material Symbols Outlined Web Font** | Web `<span class="material-symbols-outlined">icon</span>` requires web font glyph rendering. | Map all 139 discovered icons directly to `@expo/vector-icons` (`MaterialIcons` / `MaterialCommunityIcons`) with `'FILL' 1` emulation. |

---

## E. Native Implementation Sequence

```text
Phase 1: Project Initialization & Foundation
├── 1.1 Expo + TypeScript Project Scaffold (SDK 52 / React Native 0.76+)
├── 1.2 Asset & Font Pipeline (Manrope, Inter, Native Icons)
├── 1.3 Design System Tokens (colors.ts, typography.ts, spacing.ts, radius.ts)
└── 1.4 Supabase Client Integration (supabase.ts with SecureStore session persistence)

Phase 2: Reusable Native Component Library
├── 2.1 TopBar & ProgressHeader
├── 2.2 PrimaryButton, SecondaryButton, OutlinedButton
├── 2.3 InputField, OTPInput6, CountryCodePicker
├── 2.4 SelectionCard & SelectableChip
├── 2.5 ModestyPhotoCurtain & ProtectedPhotoView
├── 2.6 NativeVoiceStudio (Recorder & Waveform Player via expo-av)
└── 2.7 NativeBottomSheetModal

Phase 3: Auth & Onboarding Flow
├── 3.1 Splash Screens 01, 02, 03
├── 3.2 Mobile Number Input & SMS OTP Verification
├── 3.3 Profile Creator & Demographic Steps (1 to 10)
├── 3.4 Religious Identity & Islamic Practice Steps (11 to 15)
├── 3.5 Education, Career & Family Steps (16 to 24)
├── 3.6 Media Studio (Bio, Photos & Voice Intro)
├── 3.7 Partner Preferences & Priority Weighting (Must Have / Preferred / Open To)
└── 3.8 Trust Verification & Profile Success

Phase 4: Main Navigation & Discovery
├── 4.1 Tab Navigation (Home, Discover, Interests, Chat, Profile)
├── 4.2 Home Dashboard (Completion Banner, Active Connection Hero, Curated Carousel)
├── 4.3 Discover Feed (Profile Cards with Modesty Curtains & Voice Intro Pills)
├── 4.4 Advanced Search & Filter Sheet
└── 4.5 Profile Details View (Ayesha M., 27)

Phase 5: Matrimonial Interaction & The One-Conversation Rule
├── 5.1 Interests & Shortlists Hub (Received / Sent / Shortlisted)
├── 5.2 Database One Active Conversation Enforcement Testing
├── 5.3 Active Chaperoned Chat Stream (Text, Timestamps, Read Receipts)
├── 5.4 In-App Voice Notes Playback
├── 5.5 Modals: Request Photo Access, Share Contact Details, End Conversation
└── 5.6 Wali Dashboard, Notifications, and Account Governance
```

---

*This blueprint guarantees exact visual fidelity to the Stitch source of truth, eliminates all web/iframe dependencies, and prepares Dono Jaha for production store submission.*
