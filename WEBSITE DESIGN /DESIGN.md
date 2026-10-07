---
name: Precision Earth
colors:
  surface: '#f7faf5'
  surface-dim: '#d8dbd6'
  surface-bright: '#f7faf5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f0'
  surface-container: '#ecefea'
  surface-container-high: '#e6e9e4'
  surface-container-highest: '#e0e3df'
  on-surface: '#191c1a'
  on-surface-variant: '#414844'
  inverse-surface: '#2d312e'
  inverse-on-surface: '#eff2ed'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#116c4a'
  on-secondary: '#ffffff'
  secondary-container: '#a1f4c8'
  on-secondary-container: '#1b724f'
  tertiary: '#2c2519'
  on-tertiary: '#ffffff'
  tertiary-container: '#423b2e'
  on-tertiary-container: '#afa594'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#a1f4c8'
  secondary-fixed-dim: '#86d7ad'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ede1ce'
  tertiary-fixed-dim: '#d0c5b3'
  on-tertiary-fixed: '#201b0f'
  on-tertiary-fixed-variant: '#4d4638'
  background: '#f7faf5'
  on-background: '#191c1a'
  surface-variant: '#e0e3df'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
  display-lg-mobile:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
  headline-xl:
    fontFamily: Outfit
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
  headline-xl-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2.5rem
  margin-sm: 1rem
  margin-lg: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an architectural, technical aesthetic for industrial-scale sustainable packaging. The brand persona merges the rigorous precision of high-volume engineering with tactile raw-material authenticity. It completely avoids rustic or artisanal green tropes in favor of clean structural lines, expansive whitespace, crisp micro-borders, and high-spec industrial typography.

The target audience encompasses enterprise procurement leads, supply-chain architects, food-service distributors, and commercial packaging engineers who demand measurable performance specs (tensile strength, thermal limits, oil barrier metrics) alongside verifiable circular-economy credentials.

The aesthetic fuses **Tactile Modernism** with **Engineered Minimalism**:
- **Tactile Modernism:** Warm silica and bamboo-cellulose neutrals (#F7F5F0 base) prevent clinical sterility, anchoring the digital experience to the physical molded product.
- **Engineered Minimalism:** Structural data-dense displays, balanced column geometry, fine hairline dividers, and deliberate information hierarchies create clarity and institutional trust.

## Colors

The palette balances technical forest tones with fibrous mineral neutrals to convey high-grade manufacturing maturity.

### Hierarchy & Functional Roles
- **Primary (`#1B4332` - Deep Evergreen):** The dominant brand and action color. Reserved for primary calls-to-action, high-level navigational chrome, and key operational anchors.
- **Secondary (`#40916C` - Precision Sage):** Used for technical accents, active states, verified material metrics, and interactive hover shifts.
- **Tertiary (`#C5BAA8` - Raw Bamboo Tan):** Grounding neutral-warm accent for subtle badge fills, containment outlines, physical dimension tags, and structural separators.
- **Neutral Primary (`#1F2421` & `#2B2F2C` - Deep Carbon):** Dedicated to high-contrast technical typography, precision readouts, and primary labeling. Never use pure `#000000`.
- **Canvas & Surface System:**
  - `surface-base`: `#F7F5F0` (warm fibrous ground)
  - `surface-raised`: `#FFFFFF` (crisp white for interactive cards and technical spec panels)
  - `surface-subtle`: `#EFECE6` (inset wells, table alternate rows, disabled surfaces)
  - `border-hairline`: `#D8D2C6` (subtle framing outlines)
  - `border-strong`: `#C5BAA8` (active inputs, defined component boundaries)

## Typography

The typographic hierarchy pairs the geometric, architectural presence of **Outfit** for structural headings with the legible, engineered clarity of **Plus Jakarta Sans** for high-density documentation and interface controls.

### Architectural Rules
- **Headlines:** Use Outfit with tight letter-spacing (`-0.02em` on display sizes, `-0.01em` on headline levels) to reinforce engineering precision and industrial weight.
- **Technical Specs & Numerics:** Tabular numerals (`tnum`) must be enforced for all capacity data, metric conversions, and SKU tables.
- **Labels & Microcopy:** `label-sm` and `label-md` frequently leverage uppercase tracking (`+0.04em`) when identifying unit codes, material certifications (e.g., ASTM D6400), and manufacturing tolerances.

## Layout & Spacing

The layout philosophy uses a disciplined **12-column fluid grid** system bounded by a max container width of 1440px on large viewports, ensuring content preserves an uncluttered, high-end industrial gallery feel.

### Breakpoints & Geometry
- **Mobile (< 768px):** 4 columns, `margin-sm` (1rem / 16px), `gutter-sm` (1rem / 16px). Cards and metric panels stack into single-column flows.
- **Tablet (768px - 1024px):** 8 columns, `margin` (2.5rem / 40px), `gutter` (1.5rem / 24px).
- **Desktop (> 1024px):** 12 columns, `margin-lg` (4rem / 64px), `gutter` (1.5rem / 24px).

### Spacing Rhythm
Component interior padding follows the strictly proportional `space-*` scale. High-spec technical elements (such as dimensional drawings or batch spec cards) use `space-xl` internally to provide ample room for diagram callouts and dense specification tables without visual collisions.

## Elevation & Depth

This system avoids floating, heavy drop shadows in favor of **low-contrast outlines combined with warm, ambient micro-diffusion**. Depth communicates structural layers of physical surfaces, reminiscent of cleanly stamped bamboo pulp prototypes on an inspection table.

### Layer Tiers
- **Tier 0 (Base Canvas):** Flat `#F7F5F0`. No shadows or outlines.
- **Tier 1 (Resting Cards & Modules):** Pure white (`#FFFFFF`) surface framed with a 1px hairline border in `#D8D2C6`. Shadow: `0 2px 8px -2px rgba(31, 36, 33, 0.04), 0 1px 3px 0 rgba(31, 36, 33, 0.02)`.
- **Tier 2 (Hover & Focus States):** 1px border shifts to `#C5BAA8` or `#40916C`. Shadow: `0 8px 24px -4px rgba(27, 67, 50, 0.08), 0 2px 6px -1px rgba(31, 36, 33, 0.03)`.
- **Tier 3 (Floating Overlays, Flyouts, Spec Drawers):** `#FFFFFF` surface with an assertive border (`#C5BAA8`). Shadow: `0 16px 36px -8px rgba(31, 36, 33, 0.12), 0 4px 12px -2px rgba(31, 36, 33, 0.04)`.

## Shapes

The design system adopts **Level 2 (Rounded)** architecture, directly reflecting the natural radius produced in thermoformed and molded fiber manufacturing tooling. 

- **Containers & Product Cards:** Use `rounded-xl` (1.5rem / 24px) to replicate the smooth, draft-angled contours of molded bamboo food packaging.
- **Interactive Controls (Buttons, Inputs, Selectors):** Standardized on base `rounded` (0.5rem / 8px) to retain technical precision and structural clarity.
- **Badges & Tags:** Micro elements use `rounded-lg` (1rem / 16px) or continuous pill caps to balance the solid geometric type.

## Components

### Buttons
- **Primary:** Background `#1B4332`, text `#FFFFFF`, radius `0.5rem`, padding `0.75rem 1.5rem`. Hover state deepens to `#143326` with a crisp `0 4px 12px rgba(27, 67, 50, 0.2)` elevation.
- **Secondary / Outline:** Background `transparent`, text `#1B4332`, 1.5px solid border in `#1B4332`. Hover state shifts background to `#EFECE6`.
- **Tertiary / Ghost:** Text `#2B2F2C`, no border, active hover fills with `#EFECE6`.

### Cards & Spec Panels
- Always utilize `surface-raised` (`#FFFFFF`), `rounded-xl` (1.5rem), and 1px border `#D8D2C6`.
- Cards housing product samples include an inset preview panel in `#F7F5F0` with `rounded-lg` (1rem) inner radius.

### Form Inputs
- Background `#FFFFFF`, border 1px solid `#D8D2C6`, radius `0.5rem`, text `#1F2421`.
- Focus state switches border to 1.5px solid `#2D6A4F` paired with an external `0 0 0 3px rgba(45, 106, 79, 0.15)` focus ring.

### Chips & Material Badges
- **Technical Indicator Chips:** Neutral fill `#EFECE6`, border 1px solid `#D8D2C6`, text `#2B2F2C`, uppercase `label-sm`.
- **Sustainability Badges:** Pale forest fill `rgba(82, 183, 136, 0.12)`, border 1px solid `#52B788`, text `#1B4332`.

### Checkboxes & Radios
- Box size 18px by 18px, radius `0.25rem` (checkbox) or circular (radio), border 1.5px `#C5BAA8`.
- Checked state fills `#1B4332` with an engineered white checkmark / inner dot.

### Specialized Components
- **Spec Telemetry Strip:** A continuous horizontal bar segmenting mold cycle time, wall thickness (mm), compost degradation duration (days), and grease-barrier rating. Uses `#EFECE6` with hairline `#D8D2C6` vertical dividers and monospace tabular values.
- **Batch Order Calculator:** A specialized data input unit combining integer steppers with instant metric ton raw bamboo-waste offset calculations.