# Dono Jaha — UI Inventory, Component Map & Design System Audit

**Date:** October 2026  
**Document Version:** 1.0  
**Product:** Dono Jaha (D O N O   J A H A)  
**Starting Design Base:** 51 Stitch/Sketch exported screens and design specification (`serene_matrimony/DESIGN.md`)

---

## 1. Executive Summary & Brand Identity Correction

Per **Section 1 of the Master Development Override Document**, the application name is strictly **Dono Jaha** (exact spelling: **D O N O   J A H A**). The Stitch export directory and HTML templates contained temporary placeholder branding ("Serene Matrimony"). All UI headers, top greeter bars, metadata, and branding copy have been cataloged for unification under the **Dono Jaha** brand identity.

---

## 2. Complete Inventory of Existing Screens (50 Screens + Design Spec)

The 50 screens exported in `stitch_duplicate_of_matrimony_app_green_palate` map cleanly to the complete user journey defined in the Dono Jaha PRD:

### Flow 1: Brand & Onboarding Splash
1. `splash_01_find_someone_who_shares_your_values`: Onboarding slide 1 (Values, faith, family alignment).
2. `splash_02_privacy_comes_first`: Onboarding slide 2 (Photo privacy, modesty blur, controlled access).
3. `splash_03_purpose`: Onboarding slide 3 (Meet with purpose, one active conversation, Wali involvement).

### Flow 2: Authentication
4. `authentication_enter_mobile_number`: Phone authentication (+91 / country code picker, quick-fill demo chips, legal disclaimers).
5. `authentication_otp_verification`: 6-digit OTP verification, timer, resend OTP trigger, change number option.

### Flow 3: Profile Creator & Subject Setup
6. `questionnaire_profile_created_by`: Who are you creating this profile for? (Myself, Son/Daughter, Sibling, Relative, Guardian/Wali).
7. `questionnaire_full_name_gender`: Full name, gender selection (Male / Female), profile manager relationship.

### Flow 4: Core Demographic & Physical Questionnaire
8. `questionnaire_date_of_birth`: DOB input, age calculation, astrological/privacy disclaimer.
9. `questionnaire_marital_status`: Never married, Divorced, Widowed, Awaiting Divorce, Annulled.
10. `questionnaire_height_weight`: Height in ft/in and cm, weight in kg.
11. `questionnaire_body_type_accessibility`: Body type (Slim, Average, Athletic, Heavy) and dignified accessibility/health questions.

### Flow 5: Religious Identity & Practice
12. `questionnaire_religious_sect_community`: Religion (Islam), Sect (Sunni - Hanafi, Shafi'i, Maliki, Hanbali; Shia - Jafari, Ismaili; Ahle-Hadith, Salafi, Sufi), community/caste.
13. `questionnaire_prayer_quran_practice`: Salah frequency (5 times regularly, usually, sometimes, etc.), Quran reading practice.
14. `questionnaire_fasting_dietary_strictness`: Fasting in Ramadan, Halal dietary adherence level.
15. `questionnaire_attire_appearance_female_flow`: Modesty & attire (Hijab, Niqab, Abaya, Modest attire) / male equivalent (Beard style).

### Flow 6: Education, Career & Location
16. `questionnaire_education_details`: Highest qualification, institution, field of study.
17. `questionnaire_career_details`: Employment sector, job title, company, annual income range.
18. `questionnaire_current_location_residency`: Country, State, City, residency status (Citizen, PR, Visa).
19. `questionnaire_hometown_origin`: Grew up in, origin state and city.

### Flow 7: Family Background & Expectations
20. `questionnaire_family_values_status`: Family values (Traditional, Moderate, Liberal), family type (Nuclear, Joint, Extended), economic status.
21. `questionnaire_family_members`: Father occupation, mother occupation, structured sibling cards (brothers & sisters).
22. `questionnaire_diet_lifestyle_habits`: Diet preferences, smoking, alcohol, personal lifestyle habits.
23. `questionnaire_marriage_expectations_living_relocation`: Relocation readiness, living arrangement preferences post-marriage.
24. `questionnaire_career_expectations_wali`: Career after marriage (Full-time, Part-time, Homemaker), Wali involvement preferences.

### Flow 8: Personal Narrative & Media
25. `questionnaire_profile_bio`: Character counter (50-1000 chars), inspiration prompt chips.
26. `questionnaire_photo_upload_privacy`: Profile photo slots, modesty blur curtain settings, privacy level.
27. `questionnaire_voice_introduction`: Voice recording studio (30s-120s timer, live waveform, inspiration prompts, modesty disclaimer).

### Flow 9: Partner Preferences & Hard/Soft Filters
28. `partner_preferences_basic_details`: Age range slider, height range, marital status preferences.
29. `partner_preferences_location_lifestyle`: Preferred cities/countries, diet, smoking, religious practice.
30. `partner_preferences_background_education`: Preferred sects, education levels, career domains.
31. `partner_preferences_hard_vs._soft_logic`: Hard vs soft preference weighting ("Must Have" vs "Preferred" vs "Open to").

### Flow 10: Verification & Onboarding Finalization
32. `trust_verification_selfie_id`: Liveness selfie check, Govt ID upload for trust seal.
33. `profile_preview_privacy_validation`: Full profile summary review with privacy status check.
34. `profile_setup_complete_onboarding_success`: Success celebration, verification status badge, transition to dashboard.

### Flow 11: Main App Experience (Home & Discovery)
35. `home_screen_dashboard`: Calm matrimonial dashboard (Profile completion 80%, Active conversation banner, Curated matches).
36. `discover_profile_card`: Full-width profile card with blurred photo preview, voice introduction button, compatibility highlights.
37. `loading_state_discover_feed`: Shimmer skeleton loading cards.
38. `empty_state_discover`: Respectful empty state ("No more profiles matching your strict criteria", relax filters CTA).
39. `advanced_search_filters`: Comprehensive filter drawer (Age, sect, education, prayer frequency, relocation).
40. `profile_detail_ayesha_27`: Complete profile narrative (Voice player, photos, religious practice, family details, marriage expectations).

### Flow 12: Matrimonial Interaction & One-Active-Conversation
41. `interests_received_shortlist`: Tabbed hub (Interests Received, Sent, Shortlisted).
42. `active_conversation_ayesha`: 1-on-1 chaperoned chat interface (Active Wali badge, voice note bubble, text messages, send composer).
43. `request_photo_access_modal_bottom_sheet`: Permission request dialog for private/blurred photos.
44. `share_contact_details_modal_bottom_sheet`: Unlocking phone/email/WhatsApp with guardian confirmation.
45. `end_conversation_report_modal_bottom_sheet`: Polite conversation closure modal to free up slot for next conversation.
46. `report_block_flow`: Modesty, safety, and conduct reporting options.

### Flow 13: Wali / Chaperone & Account Management
47. `family_wali_guardian_dashboard`: Wali hub (Linked daughter/son profile, chaperone chat feed, prospective suitors review).
48. `notifications`: Categorized matrimonial notifications (Interest received, photo access granted, Wali note, verification).
49. `my_profile_hub_settings_menu`: Profile management, privacy settings, edit profile, Wali settings.
50. `account_settings_pause_delete`: Dignified account snooze, profile hide, and permanent deletion flow.

---

## 3. Existing Assets & Resources Found

- **Fonts:**
  - `Manrope`: Primary headline and display typeface (weights 600, 700).
  - `Inter`: Body, label, and microcopy typeface (weights 400, 500, 600, 700).
  - `Material Symbols Outlined`: Vector icon system.
- **Images:** High-resolution portrait photographs hosted on Google Cloud Storage / CDN (`https://lh3.googleusercontent.com/aida/...`).
- **Icons:** Material Symbols with custom font-variation settings (`'FILL' 1` for active states).
- **Design Tokens:** Documented in `serene_matrimony/DESIGN.md`.

---

## 4. Centralized Design System Tokens

| Category | Token Name | Hex / CSS Value | Semantic Role |
|---|---|---|---|
| **Brand Colors** | `primary` | `#0B6B57` | Deep Emerald (Primary CTA, Active state) |
| | `primary-dark` | `#075044` | Hover/Pressed Primary |
| | `primary-soft` | `#E8F4F0` | Tinted background, active chip fill |
| | `secondary` | `#27855E` | Forest Accent (Verified seals, badges) |
| | `tertiary` | `#D4AF37` / `#B79A5B` | Heritage Gold (Premium accents, Wali shields) |
| **Surfaces** | `background` | `#FCFCFA` | Warm cream-tinted parchment |
| | `surface-card` | `#FFFFFF` | Elevated white card canvas |
| | `surface-subtle`| `#F5F7F6` / `#ECF6F1` | Nested attribute boxes, input fills |
| **Borders** | `border-subtle` | `#E4E9E6` | Subtle boundary dividers |
| **Text** | `text-primary` | `#17201D` | Deep pine-slate (Highest contrast) |
| | `text-muted` | `#68736F` | Grounded sage-gray (Secondary metadata) |
| **Spacing** | 8pt System | `4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px` | Mobile horizontal margin: `20px` (`1.25rem`) |
| **Radii** | `rounded-card` | `16px` | Profile cards, sheets, panels |
| | `rounded-button`| `14px` | Action buttons, inputs |
| | `rounded-pill` | `9999px` | Chips, status tags, avatars |

---

## 5. Components: Reusable vs. To Be Refactored

### Reusable Production Components:
1. **DonoJahaTopBar:** Sticky top bar with back navigation, step indicator, and avatar badge.
2. **ProgressBar:** 3px smooth emerald progress rail.
3. **PrimaryButton / SecondaryButton:** 14px radius, 52px height buttons with loading state.
4. **PhoneOTPInput:** Dual component with country code trigger (+91) and 6-digit OTP fields.
5. **QuestionnaireCard:** Single-select & multi-select card with emerald active borders.
6. **VoiceStudio:** Waveform visualizer, timer (30s-120s), record/pause/play controls, inspiration prompt selector.
7. **ModestyPhotoCurtain:** Gaussian blurred photo container with lock shield overlay and "Request Photo Access" trigger.
8. **ActiveConversationBanner:** Home screen hero banner indicating current connection and Wali status.
9. **ChatBubbleStream:** Modest conversation stream supporting text, timestamps, read receipts, and voice note bubbles.
10. **BottomSheetModal:** Pinned bottom modal with backdrop blur for Photo Access, Contact Sharing, and End Conversation.

### Inconsistencies & Required Refactorings:
- **Branding:** Replaced all hardcoded "Serene Matrimony" references with **Dono Jaha**.
- **Navigation:** Replaced static `onclick="history.back()"` and dead anchor tags with a comprehensive single-page application router and Screen Explorer drawer.
- **One Active Conversation Rule:** Connected the frontend conversation state directly to a backend-enforced validation engine.
