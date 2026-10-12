# Dono Jaha — System Architecture & Implementation Blueprint

**Product:** Dono Jaha (D O N O   J A H A)  
**Version:** 1.0  
**Target Environment:** Mobile-First Web & Hybrid Mobile App (iOS / Android) + Supabase

---

## 1. System Topology

```text
                          DONO JAHA CLIENT
              (Responsive Mobile Web / Expo Hybrid Container)
                               │
               ┌───────────────┴───────────────┐
               │                               │
       State & Flow Engine              Design System
       - Auth Context                   - Manrope / Inter Typography
       - Questionnaire Engine           - Emerald / Parchment Tokens
       - Discovery & Filter Store       - 14px Button / 16px Card Radii
       - Active Conversation Store      - Modesty Gaussian Curtains
               │                               │
               └───────────────┬───────────────┘
                               │ HTTPS / WSS
                               ▼
                        SUPABASE BACKEND
                               │
       ┌───────────────┬───────┴───────┬───────────────┐
       │               │               │               │
  PostgreSQL         Auth           Storage         Realtime
  - 14 Migrations   - Phone OTP     - Public        - Active Chat
  - Strict RLS      - Email/Pass    - Blurred       - Notifications
  - One-Active-Chat - Session Persist- Private (Signed)
```

---

## 2. Client Application Architecture

The client application is organized into modular layers:

- **`/src/tokens` or `/css/design-system.css`:** Centralized tokens for colors, typography, spacing, elevations, and radii.
- **`/src/components`:**
  - `DonoJahaTopBar`: Universal header with dynamic back button, progress indicator, and profile crest.
  - `QuestionnaireRenderer`: Dynamic step-based questionnaire engine with autosaving.
  - `VoiceStudio`: Waveform visualizer, inspiration prompts, and audio recorder/player.
  - `ModestyCurtain`: Privacy-first photo reveal container with blurred background and lock overlay.
  - `ChatStream`: Realtime messaging stream with chaperone banners and voice notes.
  - `ModalDrawer`: Accessible bottom sheets for photo access requests, contact sharing, and conversation endings.
- **`/src/services/supabase.js`:** Clean Supabase client integration with transparent offline mock fallback so the application functions flawlessly both with and without cloud credentials.
- **`/src/navigator`:** Storybook / Screen Explorer drawer allowing immediate jumps between all 50 exported screens for development and inspection.

---

## 3. The One Active Conversation Architecture

```text
[ Suitor A ] ────── Sends Matrimonial Interest ──────> [ Suitor B ]
                                                              │
                                                        Accepts Interest
                                                              ▼
                                               [ Transactional Stored Proc ]
                                                              │
                    ┌─────────────────────────────────────────┴─────────────────────────────────────────┐
                    ▼                                                                                   ▼
   [ Check Suitor A Active Status ]                                                    [ Check Suitor B Active Status ]
   If active: EXCEPTION RAISED                                                         If active: EXCEPTION RAISED
                    │                                                                                   │
                    └─────────────────────────────────┬─────────────────────────────────────────────────┘
                                                      │ Both Free
                                                      ▼
                                       [ Create Conversation: ACTIVE ]
                                       [ Insert Member A: status='active' ]
                                       [ Insert Member B: status='active' ]
                                                      │
                       UNIQUE INDEX uq_one_active_conversation_per_profile guarantees
                       no other active conversation can be established for either party.
```
