# DONO JAHA — REUSABLE UI COMPONENT INVENTORY & TOKEN AUDIT
**Generated:** October 6, 2026  
**Source Code Source of Truth:** `src/components/common` & `src/theme/tokens.ts`  

---

## 1. Reusable Component Inventory

### 1. `PrimaryButton`
- **FILE:** `src/components/common/PrimaryButton.tsx`
- **USED BY:** `PhoneAuthScreen`, `OtpVerificationScreen`, `ProfileSetupCompleteScreen`, `HomeScreen`, `DiscoverScreen`, `InterestsScreen`, `ChatScreen`, `ProfileDetailScreen`, `WaliDashboardScreen`, `FamilyDetailsScreen`, `PartnerPreferencesScreen`, `SelfieVerificationScreen`, `SecondaryProfileWizardScreen`, `MatchesScreen`
- **PROPS:**
  - `title: string`
  - `onPress: () => void`
  - `variant?: 'primary' | 'secondary' | 'outline' | 'danger'`
  - `icon?: keyof typeof MaterialIcons.glyphMap`
  - `loading?: boolean`
  - `disabled?: boolean`
  - `style?: ViewStyle`
  - `textStyle?: TextStyle`
- **VARIANTS:**
  - `primary`: Background `#6A3794`, text `#FFFFFF`, elevation 2
  - `secondary`: Background `#F0E6F1`, text `#6A3794`, border transparent
  - `outline`: Background transparent, border `#6A3794` (1.5px), text `#6A3794`
  - `danger`: Background `#BA1A1A`, text `#FFFFFF`
- **IMPLEMENTED STATES:**
  - `Default`: Standard variant colors
  - `Pressed`: Background dims (uses `colors.primaryDark` or `colors.primaryTint`)
  - `Disabled`: Opacity 0.5, non-pressable
  - `Loading`: Displays `ActivityIndicator` (white or primary color)
- **CURRENT DESIGN TOKENS:**
  - Radius: `radii.button` (14px)
  - Typography: `typography.fontFamilies.button` (`Inter_600SemiBold`), 16px
  - Shadow: `shadows.button`
- **POTENTIAL INCONSISTENCIES:**
  - Some screens (e.g. `QuestionnaireScreen`, `MatchesScreen`, `ProfileSetupCompleteScreen`) use inline `TouchableOpacity` buttons with `continueButton` styles instead of calling `<PrimaryButton />`.

---

### 2. `InputField`
- **FILE:** `src/components/common/InputField.tsx`
- **USED BY:** `PhoneAuthScreen`, `OtpVerificationScreen`, `QuestionnaireScreen`, `DiscoverScreen`, `ChatScreen`, `FamilyDetailsScreen`, `PartnerPreferencesScreen`, `SecondaryProfileWizardScreen`, `MatchesScreen`
- **PROPS:**
  - `label?: string`
  - `value: string`
  - `placeholder?: string`
  - `error?: string`
  - `helperText?: string`
  - `leftIcon?: keyof typeof MaterialIcons.glyphMap`
  - `secureTextEntry?: boolean`
  - `keyboardType?: KeyboardTypeOptions`
  - `multiline?: boolean`
  - `maxLength?: number`
  - `onChangeText?: (text: string) => void`
  - `style?: TextStyle`
- **VARIANTS:** Standard single-line input, Multiline input, Left-icon decorated input
- **IMPLEMENTED STATES:**
  - `Empty`: Placeholder displayed with `colors.textHint` (`#AD91C1`)
  - `Focused`: Border color turns `colors.borderFocus` (`#6A3794`, 1.5px)
  - `Filled`: Standard text displayed
  - `Error`: Border turns `colors.error` (`#BA1A1A`), helper text in red
  - `Disabled`: Not implemented
- **CURRENT DESIGN TOKENS:**
  - Background: `#FFFFFF`
  - Border: `#DBCADD` (1px)
  - Radius: `radii.input` (14px)
  - Height: Minimum 52px
- **POTENTIAL INCONSISTENCIES:**
  - `ChatScreen.tsx` uses raw React Native `<TextInput>` inside `composerDock` instead of `<InputField>`.

---

### 3. `SelectableChip`
- **FILE:** `src/components/common/SelectableChip.tsx`
- **USED BY:** `QuestionnaireScreen`, `DiscoverScreen`, `InterestsScreen`, `FamilyDetailsScreen`, `PartnerPreferencesScreen`, `SecondaryProfileWizardScreen`
- **PROPS:**
  - `label: string`
  - `selected: boolean`
  - `icon?: keyof typeof MaterialIcons.glyphMap`
  - `onPress: () => void`
  - `style?: ViewStyle`
- **VARIANTS:** Standard Chip, Icon-prefixed Chip
- **IMPLEMENTED STATES:**
  - `Unselected (Default)`: Background `#FFFFFF`, Border `#DBCADD` (1px), Text `#241B33`
  - `Selected`: Background `#6A3794` (Primary Purple), Border `#6A3794`, Text `#FFFFFF`
- **CURRENT DESIGN TOKENS:**
  - Radius: `radii.pill` (9999px)
  - Padding: 8px vertical, 14px horizontal
  - Typography: `typography.fontFamilies.caption` (`Inter_500Medium`), 13px
- **POTENTIAL INCONSISTENCIES:**
  - In `MatchesScreen.tsx`, subheader filter pills implement inline pill styles rather than `<SelectableChip />`.

---

### 4. `SelectionCard`
- **FILE:** `src/components/common/SelectionCard.tsx`
- **USED BY:** `QuestionnaireScreen` (Step 1: Creator role selection)
- **PROPS:**
  - `title: string`
  - `description?: string`
  - `icon?: keyof typeof MaterialIcons.glyphMap`
  - `selected: boolean`
  - `onPress: () => void`
  - `badge?: string`
- **VARIANTS:** Radio card with optional icon and description
- **IMPLEMENTED STATES:**
  - `Unselected (Default)`: Background `#FFFFFF`, Border `#DBCADD` (1px), Radio circle unchecked
  - `Selected`: Background `#F0E6F1` (Light Lavender), Border `#6A3794` (1.5px), Radio circle filled with checkmark
- **CURRENT DESIGN TOKENS:**
  - Radius: `radii.card` (16px)
  - Padding: 14px
  - Shadow: `shadows.card`
- **POTENTIAL INCONSISTENCIES:**
  - Only used on Step 1 of `QuestionnaireScreen`. Could be reused for family structure, living arrangements, etc.

---

### 5. `TopBar`
- **FILE:** `src/components/common/TopBar.tsx`
- **USED BY:** `ChatScreen`, `ProfileDetailScreen`, `WaliDashboardScreen`
- **PROPS:**
  - `title: string`
  - `onBack?: () => void`
  - `rightAction?: React.ReactNode`
  - `subtitle?: string`
- **VARIANTS:** Title only, Title + Subtitle, Title + Right Action Menu
- **IMPLEMENTED STATES:** Default static layout
- **CURRENT DESIGN TOKENS:**
  - Height: 56px
  - Background: `colors.surface` (`#FDFCFC`)
  - Border: 1px bottom border `#DBCADD`
- **POTENTIAL INCONSISTENCIES:**
  - **Does NOT integrate safe area insets.** TopBar touches Android status bar when rendered inside raw `<View>` containers (e.g. `ProfileDetailScreen`, `ChatScreen`).

---

### 6. `ModestyPhotoCurtain`
- **FILE:** `src/components/common/ModestyPhotoCurtain.tsx`
- **USED BY:** `ProfileDetailScreen`, `DiscoverScreen`
- **PROPS:**
  - `imageUri?: string`
  - `isBlurred: boolean`
  - `onRequestAccess?: () => void`
  - `height?: number`
  - `borderRadius?: number`
- **VARIANTS:** Veiled (Blurred) with Lock Overlay vs Unveiled (Clear)
- **IMPLEMENTED STATES:**
  - `Veiled`: Image blurred (radius 18 on Android, 24 on iOS), dark modesty backdrop, lock emblem, "Protected Under Haya Privacy" notice, "Request Photo Access" button
  - `Clear`: Clear image rendering without overlay
- **CURRENT DESIGN TOKENS:**
  - Background: `#F0E6F1`
  - Button inside curtain: Rich Purple (`#6A3794`) with pill radius
- **POTENTIAL INCONSISTENCIES:**
  - `MatchProfileCard.tsx` in `MatchesScreen` implements its own custom modesty overlay directly rather than reusing `<ModestyPhotoCurtain />`.

---

### 7. `BottomSheetModal`
- **FILE:** `src/components/common/BottomSheetModal.tsx`
- **USED BY:** `ChatScreen` (Share contact), `ProfileDetailScreen` (Halal exit), `DiscoverScreen` (Filters, Photo request)
- **PROPS:**
  - `visible: boolean`
  - `onClose: () => void`
  - `title?: string`
  - `children: React.ReactNode`
- **VARIANTS:** Animated bottom sliding sheet with backdrop
- **IMPLEMENTED STATES:**
  - `Hidden`: Modal invisible
  - `Visible`: Slide-up animation, dimmed background `rgba(36, 27, 51, 0.6)`
- **CURRENT DESIGN TOKENS:**
  - Top border radius: 24px
  - Background: `#FDFCFC`
  - Shadow: `shadows.modal`
- **POTENTIAL INCONSISTENCIES:**
  - `QuestionnaireScreen`, `SecondaryProfileWizardScreen`, `MatchesScreen`, and `AccountSettingsScreen` use raw React Native `<Modal>` sheets with inline styles instead of `<BottomSheetModal>`.

---

### 8. `VoiceStudio`
- **FILE:** `src/components/common/VoiceStudio.tsx`
- **USED BY:** **Currently isolated (Not directly rendered by any screen route)**
- **PROPS:**
  - `onRecordingComplete?: (duration: number, path: string) => void`
  - `initialDuration?: number`
- **VARIANTS:** Interactive voice recorder with prompts
- **IMPLEMENTED STATES:**
  - `Idle`: Shows prompt list, timer at 00:00, "Hold / Tap to Record" CTA
  - `Recording`: Live seconds timer advancing every second up to 120s, red pulsing recording dot, animated waveform bars
  - `Recorded / Playing`: Play/pause button, audio track scrubbing
- **CURRENT DESIGN TOKENS:**
  - Background: `#FFFFFF`
  - Waveform color: `#6A3794`
- **POTENTIAL INCONSISTENCIES:**
  - A comprehensive component, but left unlinked during feature additions.

---

### 9. `MatchProfileCard`
- **FILE:** `src/components/matches/MatchProfileCard.tsx`
- **USED BY:** `MatchesScreen`
- **PROPS:**
  - `suitor: MatrimonialProfile`
  - `cardHeight: number`
  - `isPhotoRevealed?: boolean`
  - `onViewProfile?: () => void`
  - `onRequestPhoto?: () => void`
  - `onConnect?: () => void`
  - `onOpenMenu?: () => void`
- **VARIANTS:** Female profile (Veiled image + Reveal CTA) vs Male profile (Clear image)
- **IMPLEMENTED STATES:**
  - `Veiled Photo`: Haya lock overlay
  - `Audio Idle`: "Listen to Voice Introduction" pill below photo
  - `Audio Playing`: Waveform animated state
  - `Photo Revealed`: Clear image displayed
- **CURRENT DESIGN TOKENS:**
  - Border: 1px `#DBCADD`
  - Radius: 22px
  - Sizing: Dynamically computed from `cardHeight - 12`
- **POTENTIAL INCONSISTENCIES:**
  - None. Implemented strictly to specification.

---

## 2. Design Token System Audit

### Master Tokens (`src/theme/tokens.ts`)

| Category | Token Key | Value | Purpose / Usage |
|:---------|:----------|:------|:----------------|
| **Brand Primaries** | `colors.primary` | `#6A3794` | Primary Rich Purple: CTAs, active highlights, badges |
| | `colors.primaryDark` | `#5A2F78` | Deep Purple: Pressed states, royal accents |
| | `colors.primarySoft` | `#F0E6F1` | Light Lavender: Background tint, tags, chip default |
| | `colors.primaryFixed` | `#DBCADD` | Lavender Surface: Card borders, dividers |
| | `colors.onPrimary` | `#FFFFFF` | Contrast white on primary purple |
| **Heritage Gold** | `colors.gold` | `#D4AF37` | Auspicious seals, verified badges, VIP crown |
| | `colors.goldDark` | `#8A711E` | Wali badge text, deep accents |
| **Secondary** | `colors.secondary` | `#AD91C1` | Soft Lavender |
| **Neutrals** | `colors.background` | `#FDFCFC` | Warm White main canvas |
| | `colors.surface` | `#FDFCFC` | Neutral surfaces |
| | `colors.surfaceCard` | `#FFFFFF` | White card background |
| | `colors.onSurface` | `#241B33` | Dark Text (Deep Plum) |
| | `colors.onSurfaceVariant` | `#59445F` | Muted Text (Soft Plum) |
| | `colors.border` | `#DBCADD` | Neutral border |
| | `colors.outline` | `#59445F` | Muted outline |
| **Status** | `colors.success` | `#2E7D32` | Verified green, active status dot |
| | `colors.error` | `#BA1A1A` | Validation errors, delete account |

### Corner Radius Tokens

| Token Key | Defined Value | Audit Findings / Inconsistencies |
|:----------|:--------------|:---------------------------------|
| `radii.xs` | `4` | Used for mini tags |
| `radii.sm` | `8` | Used for chip badges |
| `radii.md` | `12` | Used for small boxes |
| `radii.input` | `14` | Used for TextInputs |
| `radii.button` | `14` | Used for PrimaryButtons |
| `radii.card` | `16` | Standard card radius |
| `radii.xl` | `20` | Used for celebratory cards |
| `radii.pill` | `9999` | Used for chips, pills, badges |
| *Arbitrary Hardcoded* | `18`, `22`, `24`, `28` | `MatchesScreen` uses `22` and `24`; `SecondaryProfileWizard` uses `18` and `28`; `BottomSheetModal` uses `24`. |

### Spacing Tokens

| Token Key | Defined Value | Audit Findings |
|:----------|:--------------|:---------------|
| `spacing.xs` | `4` | Micro gap |
| `spacing.sm` | `8` | Small gap |
| `spacing.md` | `16` | Card padding |
| `spacing.lg` | `24` | Section padding |
| `spacing.margin` | `20` | Standard screen horizontal margin |
| *Arbitrary Hardcoded* | `10`, `12`, `14` | Many inline styles use `gap: 10`, `gap: 12`, `padding: 14` instead of token keys. |
