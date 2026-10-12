# DONO JAHA — FRONTEND FEATURE & BACKEND STATUS MATRIX
**Generated:** October 6, 2026  
**Purpose:** Precise status classification of every user-facing feature across UI, Mocking, and Backend Connectivity  

---

| Feature | UI Exists? | Screen / Component | Interaction Exists? | Mock Data? | Backend Connected? | Loading State? | Error State? | Empty State? | Production Ready? | UI Review Required? |
|:---|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Brand Logo Splash & Verse** | YES | `LogoSplashScreen.tsx` | YES | Static | N/A | NO | NO | N/A | YES | YES |
| **3-Slide Value Carousel** | YES | `SplashScreen.tsx` | YES | Static | N/A | NO | NO | N/A | YES | YES |
| **Phone Authentication (+91)** | YES | `PhoneAuthScreen.tsx` | YES | YES (Bypass) | Supabase Client Ready | YES | YES | YES | PARTIAL | YES |
| **6-Digit OTP Verification** | YES | `OtpVerificationScreen.tsx` | YES | YES (Demo PIN) | Supabase Client Ready | YES | YES | YES | PARTIAL | YES |
| **Phase 1: Essential Onboarding (6 Steps)** | YES | `QuestionnaireScreen.tsx` | YES | YES (Local state) | Pending Auth Profile API | NO | YES | YES | PARTIAL | YES |
| **Normalized Searchable States (36 UTs)** | YES | `QuestionnaireScreen.tsx` | YES | Normalized `lookupData.ts` | Local Dataset (DDL table ready) | NO | NO | YES | YES | YES |
| **Normalized Searchable Cities (40+ Cities)** | YES | `QuestionnaireScreen.tsx` | YES | Normalized `lookupData.ts` | Local Dataset (DDL table ready) | NO | NO | YES | YES | YES |
| **Profile Live Milestone (55%)** | YES | `ProfileSetupCompleteScreen.tsx` | YES | Static | N/A | NO | NO | N/A | YES | YES |
| **Phase 2A: Height & Education & Profession** | YES | `SecondaryProfileWizardScreen.tsx` | YES | Normalized `lookupData.ts` | Local Dataset (DDL table ready) | NO | NO | NO | YES | YES |
| **Structured Education Selector (20 Degrees)** | YES | `SecondaryProfileWizardScreen.tsx` | YES | Normalized `lookupData.ts` | Local Dataset (DDL table ready) | NO | NO | YES | YES | YES |
| **Structured Profession Selector (15 Categories)** | YES | `SecondaryProfileWizardScreen.tsx` | YES | Normalized `lookupData.ts` | Local Dataset (DDL table ready) | NO | NO | YES | YES | YES |
| **Phase 2B: Income & Family & Preferences** | YES | `SecondaryProfileWizardScreen.tsx` | YES | Normalized `lookupData.ts` | Local Dataset (DDL table ready) | NO | NO | NO | YES | YES |
| **Phase 2C: Profile Photo Upload** | YES | `SecondaryProfileWizardScreen.tsx` | YES | Native `expo-image-picker` | Local URI / Pending Supabase Storage | NO | YES | NO | PARTIAL | YES |
| **Haya Modesty Photo Veil Toggle** | YES | `SecondaryProfileWizardScreen.tsx` | YES | Dynamic Blur Radius | Local State | NO | NO | NO | YES | YES |
| **Voice Intro Audio Preview Pill** | YES | `SecondaryProfileWizardScreen.tsx` | YES | Animated Waveforms | Mock Audio | NO | NO | NO | PARTIAL | YES |
| **Dedicated Selfie Verification Flow** | YES | `SelfieVerificationScreen.tsx` | YES | Native Front Camera | Isolated Storage Bucket Schema Ready | YES | YES | YES | PARTIAL | YES |
| **Standalone Family Details Form** | YES | `FamilyDetailsScreen.tsx` | YES | Local state | Pending Supabase Table | NO | NO | NO | PARTIAL | YES |
| **Standalone Partner Preferences Form** | YES | `PartnerPreferencesScreen.tsx` | YES | Local state | Pending Supabase Table | NO | NO | NO | PARTIAL | YES |
| **Home Dashboard & Hadith Widget** | YES | `HomeScreen.tsx` | YES | `mockActiveSuitor` | Pending Realtime Profile | NO | NO | YES | PARTIAL | YES |
| **Prayer Times Schedule Display** | YES | `HomeScreen.tsx` | Static | Static times | External Adhan API Missing | NO | NO | NO | PARTIAL | YES |
| **Full-Screen Vertical Snapping Feed** | YES | `MatchesScreen.tsx` | YES (Native Snap) | `mockCuratedMatches` | Pending Match Engine API | NO | NO | YES | YES | YES |
| **Haya Blurred Image on Match Card** | YES | `MatchProfileCard.tsx` | YES | Mock Profiles | Local Filter | NO | NO | NO | YES | YES |
| **Photo Reveal Request Flow** | YES | `MatchesScreen.tsx` | YES | Local State | Pending Notification Trigger | NO | NO | NO | PARTIAL | YES |
| **Voice Intro Player on Match Card** | YES | `MatchProfileCard.tsx` | YES | Simulated Waveforms | Mock Duration | NO | NO | NO | PARTIAL | YES |
| **One-Active-Conversation Rule Modal** | YES | `MatchesScreen.tsx` / `InterestsScreen.tsx` | YES | Intercepts 2nd Chat | Atomic DB Index Exists | NO | NO | NO | PARTIAL | YES |
| **Quick Suitor Search Modal** | YES | `MatchesScreen.tsx` | YES | Filters mock list | Local String Match | NO | NO | YES | YES | YES |
| **Legacy Discover Grid** | YES | `DiscoverScreen.tsx` | YES | `mockCuratedMatches` | **Unrouted / Navigation Unconnected** | NO | NO | YES | NO | YES |
| **Interests Received / Sent / Shortlist** | YES | `InterestsScreen.tsx` | YES | Mock lists | Pending Interests Table Sync | NO | NO | YES | PARTIAL | YES |
| **Chaperoned Chat & Wali Banner** | YES | `ChatScreen.tsx` | YES | `mockMessages` | Supabase Realtime Channels Ready | NO | NO | YES | PARTIAL | YES |
| **Voice Message Player in Chat** | YES | `ChatScreen.tsx` | YES | Simulated Play/Pause | Mock Audio Note | NO | NO | NO | PARTIAL | YES |
| **Share Direct Contact Modal** | YES | `ChatScreen.tsx` | YES | Local State | Pending WhatsApp / SMS Handshake | NO | NO | NO | PARTIAL | YES |
| **Profile Hub & Verification Badges** | YES | `ProfileHubScreen.tsx` | YES | Mock User | Pending Auth Account Sync | NO | NO | NO | PARTIAL | YES |
| **Candidate Profile Detail View** | YES | `ProfileDetailScreen.tsx` | YES | `mockActiveSuitor` | Pending Profile Query API | NO | NO | NO | PARTIAL | YES |
| **Respectful Halal Exit Modal** | YES | `ProfileDetailScreen.tsx` | YES | Local State | Pending Match Deactivation API | NO | NO | NO | PARTIAL | YES |
| **Wali Oversight Dashboard & Invites** | YES | `WaliDashboardScreen.tsx` | YES | Mock Guardian | Pending Chaperone SMS Invite API | NO | NO | NO | PARTIAL | YES |
| **Deen & Salah Advanced Filters** | YES | `AdvancedFiltersScreen.tsx` | YES | Local Filter State | Pending Query Filter API | NO | NO | NO | PARTIAL | YES |
| **Notifications & Quiet Hours** | YES | `NotificationsScreen.tsx` | YES | Mock Notifications | Pending Push / DB Trigger | NO | NO | YES | PARTIAL | YES |
| **Account Pause & Permanent Erasure** | YES | `AccountSettingsScreen.tsx` | YES | Local Switch & Modal | Pending Supabase Auth Deletion | NO | NO | NO | PARTIAL | YES |
| **Interactive Voice Studio** | YES | `VoiceStudio.tsx` | YES | Live Stopwatch & Waveforms | **Component Isolated (Unrendered in app)** | NO | NO | NO | PARTIAL | YES |
