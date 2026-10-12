---
name: Serene Matrimony
colors:
  surface: '#f2fcf6'
  surface-dim: '#d2dcd7'
  surface-bright: '#f2fcf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf6f1'
  surface-container: '#e6f0eb'
  surface-container-high: '#e0eae5'
  surface-container-highest: '#dbe5e0'
  on-surface: '#141d1a'
  on-surface-variant: '#3f4945'
  inverse-surface: '#29322f'
  inverse-on-surface: '#e9f3ee'
  outline: '#6f7975'
  outline-variant: '#bec9c3'
  surface-tint: '#0b6b57'
  primary: '#005141'
  on-primary: '#ffffff'
  primary-container: '#0b6b57'
  on-primary-container: '#97e8cf'
  inverse-primary: '#85d6bd'
  secondary: '#006c48'
  on-secondary: '#ffffff'
  secondary-container: '#98f2c3'
  on-secondary-container: '#02714c'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cca72f'
  on-tertiary-container: '#4e3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a1f2d9'
  primary-fixed-dim: '#85d6bd'
  on-primary-fixed: '#002019'
  on-primary-fixed-variant: '#005141'
  secondary-fixed: '#9bf5c6'
  secondary-fixed-dim: '#7fd8ab'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005235'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#f2fcf6'
  on-background: '#141d1a'
  surface-variant: '#dbe5e0'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
  headline-sm:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies intentionality, dignity, and quiet refinement. Built for an Islamic matrimonial platform, it rejects gamified or superficial courtship tropes in favor of an environment grounded in clarity, solemnity, and warmth.

The design movement combines **Contemporary Minimalism** with **Tactile Heritage Accents**. Clean whitespace, balanced geometric proportions, and restrained ornamentation allow personal narratives, family values, and lifestyle preferences to breathe. Visual cues prioritize trust, emotional safety, and reverence for family-centered matrimonial traditions.

## Colors

The palette establishes an aura of trust, heritage, and serene clarity.

- **Primary (`#0B6B57` - Deep Emerald):** The foundational brand anchor, used across primary CTAs, active indicators, and prominent branding.
  - Hover / Pressed: `#075044`
  - Soft Tint / Tinted Surface: `#E8F4F0`
- **Secondary (`#27855E` - Forest Accent):** Supporting tone for badges, secondary progress fills, and verification states.
- **Tertiary (`#D4AF37` - Heritage Gold):** Used sparingly as a dignified accent for premium attributes, verified member seals, cultural badges, and auspicious milestones.
- **Neutrals & Surfaces:**
  - Base Canvas (`#FCFCFA`): Warm, cream-tinted parchment white that avoids the clinical chill of stark monochrome.
  - Secondary Card Canvas (`#F5F7F6`): Calm sage-tinted neutral for grouped lists, input fills, and nested modules.
  - Card Canvas (`#FFFFFF`): Pure white elevated surfaces for standalone cards, bottom sheets, and dialogs.
  - Border & Dividers (`#E4E9E6`): Subtle, warm-slate boundaries that delineate without sharp division.
- **Typography:**
  - Text Primary (`#17201D`): Deep pine-slate ensuring high contrast and effortless legibility.
  - Text Muted (`#68736F`): Grounded sage-gray for secondary metadata, timestamps, and placeholder labels.

## Typography

Typography relies on **Manrope**, selected for its geometric rhythm, open letterforms, and modern restraint.

- **Headlines:** Set with medium-to-bold weights with tight tracking (`-0.01em` to `-0.02em`) to project confidence and calm authority.
- **Body:** Neutral weights (`400`) coupled with comfortable line heights (`1.45` to `1.5`) preserve readability during profile narrative reading and questionnaire steps.
- **Labels & Microcopy:** Crisp weights (`600`) with subtle positive tracking in small captions (`label-sm`) guarantee clarity across pill tags, status pills, and form constraints.

## Layout & Spacing

The layout model balances focused, single-column interaction on mobile with multi-column side-by-side verification flows on larger viewports.

- **Mobile (<768px):** Single-column layout with fixed outer margin `margin` (16px), 16px gutter between modular stacked cards, and generous bottom viewport padding (96px minimum) to clear pinned primary action bars.
- **Tablet (768px - 1024px):** 8-column layout constrained to 720px max content width for forms and onboarding, or full-width profile cards with 32px outer margins.
- **Desktop (>1024px):** 12-column grid capped at 1120px max container width, centered within the `#FCFCFA` base canvas. Split screens reserve 40% for progression overview or bio highlights and 60% for detail forms.
- **Spacing Rhythm:** Built strictly on an 8pt base metric (using 4pt `space-xs` as the half-step micro token). Vertical rhythm between sections adheres to `space-xl` (32px), component internal padding uses `space-md` (16px) or `space-lg` (24px).

## Elevation & Depth

Depth is achieved through ambient, diffused shadows tinted with deep emerald and charcoal, avoiding sharp synthetic drops.

- **Base Layer (Flat):** Neutral backgrounds `#FCFCFA` and nested fields `#F5F7F6` rest flat without shadow, bounded solely by `#E4E9E6` borders.
- **Level 1 (Cards & Modules):** `0px 2px 8px rgba(11, 107, 87, 0.04), 0px 1px 3px rgba(23, 32, 29, 0.03)` with a 1px solid `#E4E9E6` border. This creates a grounded, physical card presence.
- **Level 2 (Pinned Bars, Dropdowns & Modals):** `0px 8px 24px rgba(23, 32, 29, 0.08), 0px 2px 6px rgba(11, 107, 87, 0.04)`.
- **Top Stack Bar & Bottom Pinned Dock:** Subtle frosted translucent backdrops (`rgba(252, 252, 250, 0.92)` with `backdrop-filter: blur(12px)`) provide boundary separation from scrolling profile content underneath, finished with a 1px border on the bottom or top edge respectively.

## Shapes

The shape system communicates friendliness tempered by poise.

- **Buttons:** 14px corner radius (`rounded-[14px]`). This curvature creates a deliberate pill-adjacent geometry that retains architectural substance without becoming a bubble.
- **Cards & Sheets:** 16px corner radius (`rounded-[16px]`). Applied to profile cards, verification panels, and modal containers.
- **Chips & Status Tags:** Fully rounded pill shapes (`rounded-full`) to contrast against rectangular card frames and provide immediate tactile affordance.
- **Inputs & Dropdowns:** 12px to 14px corner radius, matching button geometry for visual harmony across form states.

## Components

### Top Navigation & Progress Header
- **Navigation Bar:** Fixed height (56px) top stack with native back chevron on the leading edge and optional contextual action (e.g., "Save & Exit") trailing. Center area supports small section identifiers or brand crest.
- **Linear Progress Bar:** A persistent 3px line positioned directly below the top bar. Background rail is `#E8F4F0`; active indicator fills with `#0B6B57` smoothly animated between flow steps.

### Bottom Pinned Action Bar
- **Container:** Pinned to viewport bottom with `rgba(252, 252, 250, 0.95)` fill, `backdrop-filter: blur(12px)`, and a 1px border-t `#E4E9E6`. Padding is 16px horizontal and 16px vertical plus safe area inset.
- **Action Height:** Primary CTA sits at 52px (mobile standard) or 56px (onboarding flows) with 14px radius, filled with `#0B6B57`, text color `#FFFFFF` in `label-lg`.
- **Secondary Actions:** Dual action layouts use an outlined secondary button (border 1.5px `#0B6B57`, text `#0B6B57`) alongside the primary button, or a ghost link placed above the primary CTA.

### Buttons
- **Primary:** Background `#0B6B57`, hover `#075044`, text `#FFFFFF`, radius 14px. Full-width on mobile flows.
- **Secondary / Subdued:** Background `#E8F4F0`, hover `#D8ECE6`, text `#0B6B57`, radius 14px.
- **Tertiary Accent:** Used for premium or religious verification actions; subtle gold tint `#FCF8ED`, border `#D4AF37`, text `#8A711E`.

### Cards & Profile Containers
- **Surface:** `#FFFFFF` background with 16px radius and 1px border `#E4E9E6`.
- **Inner Padding:** 20px on mobile, 24px on desktop.
- **Nested Attribute Boxes:** Inner groups (e.g., family background, education, religious practices) sit inside `#F5F7F6` containers with 12px radius and 12px padding.

### Chips & Badges
- **Status / Interest Chips:** Height 32px, `rounded-full`, padding 0 14px.
  - Inactive: `#F5F7F6` fill, `#68736F` text, border 1px solid `#E4E9E6`.
  - Active: `#E8F4F0` fill, `#0B6B57` text, border 1px solid `#0B6B57`.
- **Verification Badges:** Gold seal (`#D4AF37`) icon accompanied by `#17201D` text, surrounded by `#FCF8ED` fill.

### Input Fields & Selectors
- **Input Height:** 52px with 14px radius.
- **Fill & Stroke:** Base fill `#FFFFFF` (or `#F5F7F6` in stacked forms), border 1.5px `#E4E9E6`. On focus, border transitions to `#0B6B57` with an ambient glow (`box-shadow: 0 0 0 3px rgba(11, 107, 87, 0.12)`).
- **Labels & Hints:** Labels sit above inputs in `label-md` (`#17201D`), helper text below in `body-sm` (`#68736F`).

### Checkboxes & Radio Selection Cards
- **Radio / Checkbox Glyphs:** 20px size with 6px border radius (checkbox) or circular (radio). Unselected: border 1.5px `#E4E9E6`. Selected: background `#0B6B57` with white checkmark.
- **Selectable Row Cards:** Entire card highlights on selection with 1.5px `#0B6B57` border and `#E8F4F0` background tint.

### Modesty & Privacy Blur Controls
- **Photo Privacy Module:** For profiles choosing photo modesty curtains, use a specialized 16px radius container with a layered 24px Gaussian blur image preview, overlaid with an emerald shield badge and a "Request Photo Access" action.