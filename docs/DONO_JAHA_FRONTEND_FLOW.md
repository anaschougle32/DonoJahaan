# DONO JAHA — ACTUAL FRONTEND SCREEN FLOW MAP
**Generated:** October 6, 2026  
**Source Code Source of Truth:** `src/navigation/RootNavigator.tsx` & `src/navigation/TabNavigator.tsx`  

---

## 1. High-Level Architectural Flow

```mermaid
flowchart TD
    subgraph AUTH ["Authentication & Welcome Stack"]
        LS["LogoSplash (Screen 1)"] --> SP["Splash (Screen 2: 3-Slide Carousel)"]
        SP --> PA["PhoneAuth (Screen 3: +91 Phone Input)"]
        PA --> OTP["OtpVerification (Screen 4: 6-Digit PIN)"]
        LS -.->|Direct Login| PA
        LS -.->|Skip Auth| MT["MainTabs (MatchesTab)"]
        SP -.->|Skip Slides| PA
    end

    subgraph PHASE1 ["Phase 1: Essential Onboarding"]
        OTP --> QN["Questionnaire (Screen 5: 6 Essential Steps)"]
        QN -->|Save & Activate| PLC["ProfileSetupComplete (Screen 6: Milestone 55%)"]
    end

    subgraph PHASE2 ["Phase 2: Secondary Profile Wizard"]
        PLC -->|Continue Setup| SPW["SecondaryProfileWizard (Screen 7: Batches 2A, 2B, 2C)"]
        SPW -->|Batch 2C Link| SV["SelfieVerification (Screen 8: Dedicated Camera)"]
        SV -->|Confirmed| SPW
        PLC -.->|Explore for now| MT
    end

    subgraph LEGACY_ONBOARDING ["Deep Direct Profile Screens"]
        FD["FamilyDetails (Screen 9)"] --> PP["PartnerPreferences (Screen 10)"]
        PP --> MT
    end

    subgraph MAIN_APP ["Main Tab Navigator (5 Tabs)"]
        SPW -->|Complete (100%)| MT
        MT --> T1["HomeTab: HomeScreen (Screen 11)"]
        MT --> T2["MatchesTab: MatchesScreen (Screen 12: Reels Snap Feed)"]
        MT --> T3["InterestsTab: InterestsScreen (Screen 14)"]
        MT --> T4["ChatTab: ChatScreen (Screen 15: Chaperoned)"]
        MT --> T5["ProfileTab: ProfileHubScreen (Screen 16)"]
    end

    subgraph MODALS_AND_DETAILS ["Modals & Overlays"]
        T1 --> PD["ProfileDetail (Screen 17)"]
        T2 --> PD
        T2 --> AF["AdvancedFilters (Screen 19: Modal)"]
        T1 --> NOTIF["Notifications (Screen 20)"]
        T2 --> NOTIF
        T5 --> WD["WaliDashboard (Screen 18)"]
        T5 --> AS["AccountSettings (Screen 21)"]
        T5 --> FD
        T5 --> PP
        T3 --> PD
        T3 -->|Accept Interest| T4
        PD -->|Halal Exit Modal| T1
        PD -->|Chat Button| T4
    end

    subgraph UNROUTED ["Unrouted Artifacts"]
        DISC["DiscoverScreen (Screen 13: Legacy Stitch Grid)"]
        VSTUDIO["VoiceStudio (Component: Halal Voice Recorder)"]
    end
```

---

## 2. Screen-by-Screen Navigation Route Map

### 1. Root Stack (`RootNavigator.tsx`)
Initial Route: `LogoSplash`  
Transition Animation: `slide_from_right` (Standard iOS/Android push)

| Route Name | Screen Component | Params | Next Routes Accessible | Back Behavior |
|:-----------|:-----------------|:-------|:-----------------------|:--------------|
| `LogoSplash` | `LogoSplashScreen` | `undefined` | `Splash`, `PhoneAuth`, `MainTabs` | None (App Root) |
| `Splash` | `SplashScreen` | `undefined` | `PhoneAuth`, `MainTabs` | Returns to `LogoSplash` |
| `PhoneAuth` | `PhoneAuthScreen` | `undefined` | `OtpVerification` (`phone`) | `navigation.goBack()` |
| `OtpVerification` | `OtpVerificationScreen` | `{ phone: string }` | `Questionnaire`, `PhoneAuth` | `navigation.goBack()` |
| `Questionnaire` | `QuestionnaireScreen` | `undefined` | `ProfileSetupComplete`, `MainTabs` | Step decrement $\rightarrow$ exit |
| `ProfileSetupComplete` | `ProfileSetupCompleteScreen` | `undefined` | `SecondaryProfileWizard`, `MainTabs` | Intercepted / None |
| `SecondaryProfileWizard` | `SecondaryProfileWizardScreen` | `{ initialBatch?: '2A' \| '2B' \| '2C' }` | `SelfieVerification`, `MainTabs` | Batch decrement $\rightarrow$ `goBack()` |
| `SelfieVerification` | `SelfieVerificationScreen` | `undefined` | Returns to caller | `navigation.goBack()` |
| `FamilyDetails` | `FamilyDetailsScreen` | `undefined` | `PartnerPreferences` | `navigation.goBack()` |
| `PartnerPreferences` | `PartnerPreferencesScreen` | `undefined` | `MainTabs` (`MatchesTab`) | `navigation.goBack()` |
| `MainTabs` | `TabNavigator` | `{ screen?: keyof MainTabParamList }` | Tab switching | System back button |
| `ProfileDetail` | `ProfileDetailScreen` | `{ profileId?: string, profileName?: string }` | `MainTabs` (`ChatTab`), `MainTabs` (`HomeTab`) | `navigation.goBack()` |
| `WaliDashboard` | `WaliDashboardScreen` | `undefined` | None | `navigation.goBack()` |
| `Notifications` | `NotificationsScreen` | `undefined` | `MainTabs` (`ChatTab`) | `navigation.goBack()` |
| `AccountSettings` | `AccountSettingsScreen` | `undefined` | `LogoSplash` (Logout/Delete) | `navigation.goBack()` |
| `AdvancedFilters` | `AdvancedFiltersScreen` | `undefined` | Returns to caller | `navigation.goBack()` |

---

### 2. Main Tab Navigator (`TabNavigator.tsx`)
Tab Bar: Fixed bottom bar (`height: 64` on Android, `86` on iOS) with active dot indicators

| Tab Name | Tab Screen Component | Badge | Accessible Child Actions |
|:---------|:---------------------|:------|:-------------------------|
| `HomeTab` | `HomeScreen` | None | Taps active suitor $\rightarrow$ `ProfileDetail`<br>Taps chat $\rightarrow$ `ChatTab`<br>Taps complete $\rightarrow$ `FamilyDetails`<br>Taps bell $\rightarrow$ `Notifications` |
| `MatchesTab` | `MatchesScreen` | None | Snapping feed $\rightarrow$ `ProfileDetail`<br>Funnel icon $\rightarrow$ `AdvancedFilters`<br>Bell icon $\rightarrow$ `Notifications`<br>One-rule modal $\rightarrow$ `ChatTab` |
| `InterestsTab` | `InterestsScreen` | `2` (Red badge) | Taps suitor $\rightarrow$ `ProfileDetail`<br>Accepts interest $\rightarrow$ `ChatTab` |
| `ChatTab` | `ChatScreen` | None | Header menu $\rightarrow$ `ProfileDetail`, `WaliDashboard`<br>Contact modal $\rightarrow$ appends message |
| `ProfileTab` | `ProfileHubScreen` | None | Taps profile $\rightarrow$ `ProfileDetail`<br>Taps banner $\rightarrow$ `FamilyDetails`<br>Menu $\rightarrow$ `PartnerPreferences`, `WaliDashboard`, `Notifications`, `AccountSettings`<br>Sign Out $\rightarrow$ `PhoneAuth` |

---

## 3. Discovered Navigation Gaps & Unreachable Artifacts

1. **`DiscoverScreen.tsx` is completely unrouted:**
   - Defined in `src/features/discovery/DiscoverScreen.tsx`.
   - It implements a legacy Stitch-style grid feed with `ModestyPhotoCurtain`.
   - Neither `RootNavigator.tsx` nor `TabNavigator.tsx` registers a route for it.
   - It is currently unreachable through normal app navigation.

2. **`VoiceStudio.tsx` is unrouted as a standalone screen:**
   - Defined in `src/components/common/VoiceStudio.tsx`.
   - Contains a complete Halal voice recording studio with inspiration prompts, timer, and waveforms.
   - Currently, no screen renders it directly (Batch 2C in `SecondaryProfileWizard` uses an embedded audio pill instead).

3. **Inconsistent Sign-Out destination:**
   - `ProfileHubScreen.tsx` line 173 navigates to `PhoneAuth`.
   - `AccountSettingsScreen.tsx` line 44 navigates to `LogoSplash`.
