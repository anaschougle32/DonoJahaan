# Dono Jaha — Unified Design System & Aesthetic Tokens

**Product:** Dono Jaha (D O N O   J A H A)  
**Movement:** Contemporary Islamic Matrimonial Minimalism with Heritage Accents  
**Tone:** Dignified, Serene, Trustworthy, Private, Calm, Intentional

---

## 1. Color Palette

The color system avoids harsh high-contrast black/white or loud dating-app neon gradients.

```css
:root {
  /* Brand Primaries */
  --color-primary: #0B6B57;             /* Deep Emerald: CTAs, active indicators, brand logo */
  --color-primary-dark: #075044;        /* Pressed / Hover primary */
  --color-primary-container: #005141;   /* Deep Container */
  --color-primary-soft: #E8F4F0;         /* Gentle tint for cards, chips, active tags */
  
  /* Brand Secondary & Accent */
  --color-secondary: #27855E;           /* Forest Accent: Verifications, health chips */
  --color-tertiary-gold: #D4AF37;       /* Heritage Gold: Verified member seals, premium badges */
  --color-tertiary-tint: #FCF8ED;       /* Warm gold container surface */
  
  /* Backgrounds & Surfaces */
  --color-bg-canvas: #FCFCFA;           /* Warm parchment white */
  --color-surface-card: #FFFFFF;        /* Elevated card canvas */
  --color-surface-subtle: #F5F7F6;      /* Nested attribute boxes, input fills */
  --color-surface-container: #E6F0EB;   /* Low container */
  --color-border: #E4E9E6;              /* Crisp dividers and card strokes */
  
  /* Text & Microcopy */
  --color-text-primary: #17201D;        /* Deep pine-slate: Headings and high readability */
  --color-text-muted: #68736F;          /* Sage gray: Subtitles, helper text, timestamps */
  --color-text-inverse: #FFFFFF;        /* Text on primary buttons */
  
  /* Feedback States */
  --color-success: #27855E;
  --color-warning: #C98A22;
  --color-error: #BA1A1A;
  --color-error-container: #FFDAD6;
}
```

---

## 2. Typography

Two primary font families work together:

- **Manrope:** Headlines, section titles, display copy, and editorial greeting bars.
  - Weights: `600 SemiBold`, `700 Bold`
  - Tracking: `-0.01em` to `-0.02em`
- **Inter:** Body narrative, form inputs, button labels, and small metadata captions.
  - Weights: `400 Regular`, `500 Medium`, `600 SemiBold`

---

## 3. Spacing & Grid System

Built strictly on an 8-point geometric scale:

- `space-xs`: `4px`
- `space-sm`: `8px`
- `space-md`: `16px`
- `space-lg`: `24px`
- `space-xl`: `32px`
- `space-2xl`: `48px`
- Mobile Horizontal Margin: `20px` (`1.25rem`)

---

## 4. Radii & Elevation

- **Buttons & Inputs:** `14px` border-radius
- **Cards & Bottom Sheets:** `16px` border-radius
- **Pills & Status Chips:** `9999px` (`full`)
- **Card Shadow:** `0 2px 8px rgba(11, 107, 87, 0.04), 0 1px 3px rgba(23, 32, 29, 0.03)`
- **Modal Backdrop:** `rgba(20, 29, 26, 0.45)` with `backdrop-filter: blur(8px)`
