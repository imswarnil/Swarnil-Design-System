# Swarnil Design System — Design System Specification

**Version 1.0 · Rebuild spec · Author: Swarnil Singhai**

This is the complete build order for the v2 rebuild. It replaces `Swarnil-Design-System`
entirely. Every section below is a decision, not an option — where a choice exists, the
decision and its reason are stated so you never re-litigate it at 2am.

---

## 0 · Decisions locked before any code

| Question | Decision | Why |
| --- | --- | --- |
| Name | **Swarnil Design System** | A thesis, not a category. A frame holds; a signal means. It explains the two-colour system and survives you changing handles. |
| Package | `@imswarnil/swarnil-design` | Scoped, matches the name, not the repo. |
| Repo | `imswarnil/swarnil-design` (old repo redirects) | Repo name = product name. Three names for one thing is the root cause of the current mess. |
| Docs | `design.imswarnil.com` | Unchanged. |
| Tech | Plain CSS + CSS custom properties. No preprocessor. No runtime. | It already works and it is the differentiator. Nobody needs another React kit. |
| Framework support | Tailwind v4 bridge, optional. React wrappers, never. | You ship CSS. Frameworks consume it. |
| Cascade | Native `@layer`, declared once, first | Makes override order a stated contract instead of an accident of import order. |
| Colour model | `oklch()` for ramps, hex fallback removed | Perceptual steps, and `color-mix` behaves. Baseline everywhere since 2023. |
| Dark mode | Token remap only. `light-dark()` for the pairs. | One block, not three. No component ever knows which theme it is in. |
| Units | `rem` for type and space, `px` for hairlines and radii under 4px | Hairlines must not scale with root font size. |
| Naming | `block__part` / `block-modifier` / `u-utility` / `is-` never | State lives in ARIA and `data-*`. |
| Breakpoints | Container queries first, media queries only for page layout | A card does not care how wide the window is. It cares how wide its slot is. |

---

## 1 · Repository structure, end to end

```
swarnil-design/
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   ├── component_request.yml
│   │   └── config.yml
│   ├── workflows/
│   │   ├── ci.yml                  lint, build, size budget, a11y contrast audit
│   │   ├── pages.yml               build docs → deploy
│   │   └── release.yml             tag → npm publish → CDN purge
│   └── PULL_REQUEST_TEMPLATE.md
│
├── src/                            THE SYSTEM. Hand-authored. Nothing generated.
│   │
│   ├── 0-config/
│   │   ├── layers.css              @layer declaration — MUST be first import
│   │   ├── properties.css          @property registrations for animatable vars
│   │   └── index.css
│   │
│   ├── 1-foundation/
│   │   ├── 00-reset.css
│   │   ├── 01-color.css            Tier 1 ramps + Tier 2 semantics + themes
│   │   ├── 02-typography.css       families, scale, tracking, prose rhythm
│   │   ├── 03-space.css            4px ladder, container widths, gutters
│   │   ├── 04-elevation.css        shadow ladder + dark-mode lift equivalents
│   │   ├── 05-motion.css           durations, easings, reduced-motion contract
│   │   ├── 06-layout.css           stack, cluster, grid, sidebar, switcher, bleed
│   │   ├── 07-pattern.css          grid, dot, scanline, timecode, halftone, noise
│   │   ├── 08-a11y.css             focus rings, skip link, sr-only, target sizes
│   │   ├── 09-shape.css            radii, borders, dots, cutouts, notches
│   │   ├── 10-frame.css            corner brackets, viewfinder, window chrome
│   │   ├── 11-icon.css             icon sizing, stroke, optical alignment
│   │   ├── 12-logo.css             mark sizing, lockups, clear space
│   │   └── index.css
│   │
│   ├── 2-elements/
│   │   ├── 20-text.css
│   │   ├── 21-badge.css
│   │   ├── 22-table.css
│   │   ├── 23-indicator.css
│   │   ├── 24-code.css
│   │   ├── 25-divider.css
│   │   └── index.css
│   │
│   ├── 3-components/
│   │   ├── 30-button.css
│   │   ├── 31-input.css
│   │   ├── 32-choice.css           checkbox, radio, switch, segmented, rating
│   │   ├── 33-field.css            label, hint, error, fieldset, form layout
│   │   ├── 34-card.css             ONE card. No .c twin.
│   │   ├── 35-nav.css              breadcrumb, tabs, toc, pager, pagination
│   │   ├── 36-navbar.css           the bar itself only
│   │   ├── 37-navmenu.css          dropdown, mega, offcanvas
│   │   ├── 38-disclosure.css       accordion, collapse, details
│   │   ├── 39-overlay.css          dialog, popover, sheet, tooltip
│   │   ├── 40-feedback.css         alert, toast, empty, inline status
│   │   ├── 41-media.css            player, poster, figure, gallery, lightbox
│   │   ├── 42-list.css             plain, ordered, marker, definition, checklist
│   │   ├── 43-timeline.css
│   │   ├── 44-comment.css
│   │   ├── 45-command.css          ⌘K palette
│   │   ├── 46-carousel.css
│   │   └── index.css
│   │
│   ├── 4-patterns/
│   │   ├── 50-deck.css             a grid of cards, with its own density rules
│   │   ├── 51-index.css            the archive / listing pattern
│   │   ├── 52-article.css          long-form body: .prose
│   │   ├── 53-curriculum.css       course modules → lessons
│   │   ├── 54-buildlog.css         dated build entries
│   │   ├── 55-itinerary.css        travel days → stops
│   │   ├── 56-chat.css             transcript
│   │   ├── 57-compare.css          side-by-side table / cards
│   │   └── index.css
│   │
│   ├── 5-sections/
│   │   ├── 60-header.css
│   │   ├── 61-hero.css
│   │   ├── 62-stats.css
│   │   ├── 63-feature.css
│   │   ├── 64-pricing.css
│   │   ├── 65-faq.css
│   │   ├── 66-testimonial.css
│   │   ├── 67-logowall.css
│   │   ├── 68-cta.css
│   │   ├── 69-newsletter.css
│   │   ├── 70-footer.css
│   │   └── index.css
│   │
│   ├── 6-utilities/
│   │   ├── 80-layout.css
│   │   ├── 81-type.css
│   │   ├── 82-space.css
│   │   ├── 83-color.css
│   │   ├── 84-state.css            .u-hide-print, .u-no-motion, .u-truncate
│   │   └── index.css
│   │
│   ├── js/                         optional, additive, never required
│   │   ├── theme.js                sets data-theme, respects storage + OS
│   │   ├── nav.js                  sets data-scrolled, data-dir, data-open
│   │   ├── highlight.js            syntax token spans
│   │   ├── command.js              ⌘K
│   │   └── index.js
│   │
│   └── index.css                   imports 0→6. Not broadcast, not creator.
│
├── creator/                        NOT the web. Exports to YouTube/IG/print.
│   ├── 90-canvas.css               fixed-ratio export stages
│   ├── 91-thumbnail.css            YouTube 16:9, blog OG, podcast square
│   ├── 92-social.css               IG post/story/carousel, X card, LinkedIn
│   ├── 93-channel.css              banner, avatar, watermark, endcard
│   ├── 94-lowerthird.css           on-video name plates, tickers
│   ├── 95-scene.css                full-frame title/quote/section cards
│   ├── 96-print.css                sticker, business card, zine
│   └── index.css
│
├── themes/                         drop-in token overrides. One file each.
│   ├── default.css                 (empty — the system IS the default)
│   ├── high-contrast.css
│   ├── print.css
│   └── README.md
│
├── tailwind/
│   ├── theme.css                   @theme inline bridge
│   └── README.md
│
├── docs/                           SOURCE of the docs site (not output)
│   ├── build.py
│   ├── content/                    one .py or .md per doc page
│   ├── templates/
│   ├── assets/
│   └── README.md
│
├── site/                           BUILT docs output. gitignored. CI deploys.
│
├── dist/
│   ├── swarnil-design.css
│   ├── swarnil-design.min.css
│   ├── swarnil-design.creator.css
│   └── tokens.json                 generated, for Figma / design tools
│
├── assets/
│   ├── icons/                      SVG source, one file per icon
│   ├── logo/
│   └── fonts/                      self-hosted subsets only
│
├── scripts/
│   ├── build-tokens.py             CSS → tokens.json → Figma
│   ├── audit-contrast.py           every fg/bg pair, both themes, WCAG AA
│   ├── audit-classes.py            classes defined vs classes used in docs
│   ├── audit-layers.py             a layer may not reference a higher layer
│   └── size-budget.py
│
├── tests/
│   ├── visual/                     Playwright screenshots, both themes
│   └── a11y/                       axe-core over every docs page
│
├── AGENTS.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── PRINCIPLES.md                   ← the personality document. Public.
├── LICENSE
├── README.md
├── package.json
├── postcss.config.js
└── .stylelintrc.json
```

**Deleted on day one:** `inspiration- Do not use just take refrence will delete later/`
(5.3 MB, and its name is a sentence), `video/` (3.4 MB — move to a CDN or a separate
repo), `collection/` (Ghost/Jekyll templates — that is a *theme*, not a design system;
split it to `swarnil-design-theme`), the 134 committed `docs/*.html` files (CI builds and
deploys; nothing generated goes in git).

**Repo weight target:** under 4 MB checked out. Today it is 17 MB.

---

## 2 · The cascade contract

`src/0-config/layers.css` is the first file and contains exactly this:

```css
@layer reset, tokens, elements, components, patterns, sections, theme, tailwind, utilities;
```

Nine layers, in override order. Rules:

1. **Every rule in `src/` is inside a layer.** An unlayered rule beats all layers and
   is therefore a bug. Stylelint enforces this.
2. **A file may only reference tokens and classes from a lower layer.**
   `scripts/audit-layers.py` greps for violations and fails CI.
3. **`theme` sits above `sections`** so a drop-in theme file can retint anything
   without `!important`.
4. **`tailwind` sits above `theme`** so a utility wins over a component — which is the
   only reason to have utilities.
5. **`utilities` (your `u-*`) is last** so your own escape hatch always wins, including
   over Tailwind.

Consumer overrides live outside all layers, so a user's own stylesheet always wins with
zero specificity fights. That is the entire customisation API.

---

## 3 · Token architecture

Two tiers. Components read **tier 2 only**. Never a ramp step, never a raw value.

### Tier 1 — primitives

| Ramp | Steps | Role |
| --- | --- | --- |
| `--ink-{0,25,50,100,200,300,400,500,600,700,800,900,950,1000}` | 14 | Near-neutral with blue in the shadows, so dark reads unlit not muddy |
| `--signal-{50…950}` | 11 | Vermilion. The record light. The only chromatic voice with authority |
| `--craft-{50…900}` | 10 | Amber. Construction lines, brackets, one highlighted word. Rationed |
| `--mint / --azure / --rose` | 5 each | success / info / danger. Must never be confusable with signal |

Written in `oklch()`, one lightness ladder shared by every hue so steps match across
ramps:

```css
--ink-500:    oklch(58% 0.018 275);
--signal-500: oklch(63% 0.190 34);
--craft-500:  oklch(66% 0.110 78);
```

### Tier 2 — semantics (the only public names)

**Surface** — `--bg-canvas`, `--bg-surface`, `--bg-raised`, `--bg-sunken`, `--bg-muted`,
`--bg-inverse`, `--bg-scrim`, `--bg-media`

**Foreground** — `--fg-default`, `--fg-muted`, `--fg-subtle`, `--fg-faint`,
`--fg-on-inverse`, `--fg-on-accent`, `--fg-accent`, `--fg-link`, `--fg-link-hover`

**Line** — `--line-subtle`, `--line-default`, `--line-strong`, `--line-inverse`,
`--line-accent`

**Accent** — `--accent`, `--accent-hover`, `--accent-press`, `--accent-soft`,
`--accent-soft-fg`, `--accent-ring`

**Craft** — `--craft`, `--craft-soft`, `--craft-fg`

**Status** — `--{success,warning,danger,info}-{bg,fg,line}`

**Interaction** — `--focus-ring`, `--focus-ring-alt`, `--selection-bg`, `--selection-fg`,
`--hover-wash`, `--press-wash`

**Elevation** — `--elevation-{0,1,2,3,4}` (resolves to shadow in light, to a surface
step + translucent hairline in dark — components ask for elevation, never for shadow)

**Pattern** — `--pattern-ink`, `--pattern-ink-2`

**Type** — `--font-{display,body,slate}`, `--text-{2xs…5xl}`, `--leading-{tight,snug,
normal,relaxed}`, `--tracking-{tighter,tight,normal,slate}`

**Space** — `--space-{0,1,2,3,4,5,6,8,10,12,16,20,24}` on a 4px ladder,
`--gutter`, `--measure` (65ch), `--width-{xs,sm,md,lg,xl,full}`

**Shape** — `--radius-{xs,sm,md,lg,xl,full}`, `--border-{hair,1,2,3}`, `--dot-{sm,md,lg}`

**Motion** — `--dur-{1,2,3,4,5}` (60/120/200/320/480ms), `--ease-{out,inout,snap,
overshoot}`

**Z** — `--z-{base,raised,sticky,overlay,modal,toast,max}`

### Component-scoped variables

Every component exposes its own knobs, scoped to itself, defaulting to tier 2:

```css
.card {
  --card-pad: var(--space-5);
  --card-radius: var(--radius-lg);
  --card-bg: var(--bg-surface);
  --card-line: var(--line-default);
}
```

This is the second half of the customisation API: retheme globally with tier 2,
retheme one instance with the component's own vars. Every component in this spec
lists its vars under **Properties**.

### Generated outputs

`scripts/build-tokens.py` parses `01-color.css`, `02-typography.css`, `03-space.css`
and emits `dist/tokens.json` in the W3C Design Tokens format. That feeds Figma
Variables and any future native app. Tokens are authored in CSS, never in JSON —
one source of truth, and the CSS is the one people actually read.

---

## 4 · Responsive strategy

### The rule

> Media queries describe the **page**. Container queries describe the **component**.

A card in a 300px sidebar and a card in a 300px slot of a wide grid are the same card
and must look identical. Only container queries can express that.

### Named containers

```css
.deck  { container: deck / inline-size; }
.card  { container: card / inline-size; }
.shell { container: shell / inline-size; }
```

### Container breakpoints (component-level)

| Name | Width | Meaning |
| --- | --- | --- |
| `cq-xs` | ≥ 20rem (320px) | the component has room for two columns of text |
| `cq-sm` | ≥ 28rem (448px) | media can sit beside text |
| `cq-md` | ≥ 40rem (640px) | full horizontal layout |
| `cq-lg` | ≥ 56rem (896px) | the component can host its own grid |

### Media breakpoints (page-level only — five, no more)

| Token | Width | Used for |
| --- | --- | --- |
| `--bp-sm` | 30rem / 480px | phone landscape |
| `--bp-md` | 48rem / 768px | tablet — nav collapses below this |
| `--bp-lg` | 64rem / 1024px | laptop — sidebars appear |
| `--bp-xl` | 80rem / 1280px | desktop — max content width reached |
| `--bp-2xl` | 96rem / 1536px | wide — gutters grow, content does not |

### Fluid by default, stepped by exception

Type and space are fluid via `clamp()` so most components need no breakpoint at all:

```css
--text-3xl: clamp(1.75rem, 1.2rem + 2.4vw, 2.75rem);
--space-8:  clamp(2rem, 1.4rem + 2.8vw, 4rem);
```

Only reach for a breakpoint when the *layout topology* changes — one column becomes
two, a sidebar appears, a nav collapses. Never for a font size.

### Intrinsic layout primitives (foundation layer 06)

These remove most breakpoints entirely. Every one is a class in `06-layout.css`:

| Class | Behaviour | Vars |
| --- | --- | --- |
| `.stack` | vertical rhythm via `> * + *` | `--stack-gap` |
| `.cluster` | wrapping horizontal group | `--cluster-gap`, `--cluster-align` |
| `.grid-auto` | `repeat(auto-fit, minmax(var(--col), 1fr))` | `--col`, `--grid-gap` |
| `.sidebar` | sidebar + main, wraps when main < 50% | `--side-width`, `--side-min` |
| `.switcher` | N columns until below threshold, then 1 | `--switch-at`, `--switch-max` |
| `.cover` | centred content with min-height | `--cover-min` |
| `.reel` | horizontal scroll strip with snap | `--reel-item`, `--reel-gap` |
| `.frame-ratio` | fixed aspect ratio box | `--ratio` |
| `.center` | max-width + auto margins + gutter | `--measure`, `--gutter` |
| `.bleed` | break out of `.center` to full width | — |

### Responsive checklist per component

Every component's docs page must state:
- its container query breakpoints and what changes at each
- its behaviour at 320px width (the floor — nothing may overflow)
- its touch target size (44px minimum for anything interactive)
- whether it reflows or scrolls when it cannot fit

---

## 5 · Dark mode contract

Three laws, enforced by CI.

**Law 1 — no component may contain the string `data-theme` or `prefers-color-scheme`.**
If a component needs a dark-specific value, tier 2 is missing a token. `audit-layers.py`
greps for this and fails the build.

**Law 2 — dark lifts, light drops.** Elevation in light is shadow. Elevation in dark is
a lighter surface plus a translucent white hairline. Components request
`box-shadow: var(--elevation-2)` and the token resolves correctly per theme:

```css
:root            { --elevation-2: 0 1px 2px rgb(8 8 12/.04), 0 8px 24px -12px rgb(8 8 12/.10); }
:root[data-theme='dark'] { --elevation-2: 0 0 0 1px rgb(255 255 255/.06); }
```

**Law 3 — one theme block, not three.** Today you hand-maintain a `[data-theme='dark']`
block and a near-identical `prefers-color-scheme` copy, and the copy is already missing
`--craft`, the status tokens and `--pattern-ink`. Collapse both with `light-dark()`:

```css
:root {
  color-scheme: light dark;
  --bg-canvas: light-dark(var(--ink-0), var(--ink-1000));
  --fg-default: light-dark(var(--ink-900), var(--ink-50));
}
:root[data-theme='light'] { color-scheme: light; }
:root[data-theme='dark']  { color-scheme: dark; }
```

One declaration per token, both themes, and the explicit attribute still wins.

**Dark is not an inversion.** Specific adjustments that must be made and documented:
- Accent steps down one (`signal-500` → `signal-400` for *text*, stays 500 for *fills*)
  so it does not bloom against black.
- Hairlines become translucent white, never a grey step, so they survive over media.
- Shadows are replaced by lift, never merely darkened.
- Status tints become 15–18% alpha washes of their hue rather than the 50 step.
- Images get `--img-dim: brightness(.88)` in dark. Photos are lit for white pages.
- Focus ring alternate becomes the near-black `--ink-1000` outer halo instead of white.

**Contrast gate.** `scripts/audit-contrast.py` walks every documented fg/bg pairing in
both themes and fails CI below 4.5:1 for body text, 3:1 for large text and UI borders.
No exceptions list.

---

## 6 · Layer 1 — Foundation

Nothing here paints a component. It defines what values exist.

### 00-reset.css
Box sizing, margin zeroing, `text-size-adjust`, media `display:block` + `max-width:100%`,
form font inheritance, `:target` scroll margin, `hanging-punctuation`, list role
preservation for `list-style:none`, `interpolate-size: allow-keywords` for
height-auto transitions.

### 01-color.css
Tier 1 ramps, tier 2 semantics, `light-dark()` pairs, `::selection`, forced-colors mode
mapping. This file is the entire theming surface of the system.

### 02-typography.css
Three voices, and they are the personality:
- `--font-display` — Inter, aliased to `--font-body`. Headlines, numbers, the mark;
  separated by weight and tight tracking rather than by a second family.
- `--font-body` — Inter. Everything read in sentences.
- `--font-slate` — IBM Plex Mono. The metadata voice: labels, timecodes, code,
  coordinates, dimensions. This is the one that makes the system look like a camera.

Scale: `2xs .6875 / xs .75 / sm .875 / base 1 / lg 1.125 / xl 1.25 / 2xl 1.5 /
3xl 1.875 / 4xl 2.5 / 5xl 3.5` — fluid via `clamp()` from `2xl` up.
Also: `--measure: 65ch`, `.num-tabular`, `.balance` (`text-wrap: balance` for
headings), `.pretty` (`text-wrap: pretty` for body).

### 03-space.css
4px ladder `0 1 2 3 4 5 6 8 10 12 16 20 24`, fluid from `8` up. Container widths.
`--gutter` responsive from 1rem to 2.5rem.

### 04-elevation.css
`--elevation-0…4` resolving per theme as described in §5. Plus `--shadow-focus`,
`--shadow-media` (the letterbox glow under video).

### 05-motion.css
Durations `60 / 120 / 200 / 320 / 480ms`. Easings `out`, `inout`, `snap`, `overshoot`.
The reduced-motion contract: `--dur-*` collapse to `1ms` inside the media query, so
every component gets it for free and no component writes its own query. Named keyframes
live here: `fx-pulse`, `fx-blink`, `fx-sweep`, `fx-scan`, `fx-rise`.

### 06-layout.css
The ten intrinsic primitives listed in §4.

### 07-pattern.css
Background textures that derive from `--pattern-ink` so they never know the theme:
`.pattern-grid`, `.pattern-dot`, `.pattern-line`, `.pattern-scan`, `.pattern-timecode`
(film edge with a taller tick every 5th), `.pattern-halftone`, `.pattern-noise`,
`.pattern-hatch`. Each takes `--pattern-size` and `--pattern-angle`.

### 08-a11y.css
`:focus-visible` ring (two-tone: accent inner, alt outer, so it survives any backdrop),
`.skip`, `.u-sr-only`, `@media (forced-colors: active)` mappings, minimum target size
enforcement helper `.target-44`.

### 09-shape.css
Radii ladder, border widths, dot sizes, `.cut-corner` (notched corner via
`clip-path`), `.notch-*`.

### 10-frame.css — **the signature layer**
Everything that says "this is footage before you read it".

| Class | What it is | Vars |
| --- | --- | --- |
| `.frame` | two corner brackets (TL, BR) via pseudos | `--frame-size`, `--frame-inset`, `--frame-weight`, `--frame-color` |
| `.frame-4` | four corners; TR and BL are real spans | ↑ |
| `.frame-hover` | brackets absent, then close in on hover / focus-visible / focus-within | `--frame-travel` |
| `.frame-sm` / `-lg` | scaled for buttons / full-bleed stages | ↑ |
| `.vf` | full viewfinder: four corners + rec bug | `--vf-color`, `--vf-size`, `--vf-inset`, `--vf-weight` |
| `.vf-thirds` | rule-of-thirds composition grid | ↑ |
| `.vf__rec` | the pulsing record bug | ↑ |
| `.vf__tc` | timecode readout, tabular mono | ↑ |
| `.vf__xh` | centre crosshair | `--xh-size` |
| `.win` + `.win-mac` / `-code` / `-term` / `-browser` / `-phone` | window chrome | `--win-bar` |
| `.shutter` | six-blade shutter iris | `--shutter-size` |
| `.filmstrip` | sprocket-hole edges | `--strip-gap` |
| `.polaroid` | photo with caption lip and a 1.2° rotate | `--polaroid-tilt` |

**Composition warnings that must stay in the file header:** `.frame`, `.vf` and
`.pattern` all paint on `::before`. Never two on one element. `.btn-live` uses
`::before` for its record dot; `[data-loading]` uses `::after`.

### 11-icon.css
24px grid, 1.5px stroke, `currentColor`, optical alignment class, sizes `xs…xl`.

### 12-logo.css
Mark sizes, wordmark lockups, clear space equal to the mark's cap height, minimum
legible size, monochrome and knockout variants.

---

## 7 · Layer 2 — Elements

Single-purpose. Usually one HTML tag. No internal parts beyond one child.

| Component | Variants | Properties | States |
| --- | --- | --- | --- |
| `.slate` | — | `--slate-size`, `--slate-track` | — |
| `.eyebrow` | `-accent`, `-rule` | `--eyebrow-gap` | — |
| `.code` | inline | `--code-bg`, `--code-pad` | — |
| `.mark` | `-craft`, `-signal` | `--mark-bg` | — |
| `.kbd` | `-lg` | `--kbd-shadow` | `:active` |
| `.badge` | `-solid`, `-soft`, `-outline`, `-dot`, `-{status}` | `--badge-bg`, `--badge-fg`, `--badge-pad` | — |
| `.chip` | `-removable`, `-count`, `-selected` | `--chip-h` | `[aria-pressed]`, `:hover` |
| `.pill` | `-live`, `-building`, `-archived` | `--pill-dot` | animated dot |
| `.timecode` | `-lg`, `-live` | `--tc-track` | — |
| `.avatar` | `-xs…xl`, `-square`, `-stack`, `-fallback` | `--avatar-size`, `--avatar-ring` | — |
| `.dot` | `-{status}`, `-pulse` | `--dot-size` | — |
| `.table` | `-zebra`, `-compact`, `-bordered`, `-numeric`, `-scroll` | `--table-pad`, `--table-line` | `[aria-sort]` |
| `.dl` | `-inline`, `-grid` | `--dl-gap` | — |
| `.rule` | `-label`, `-dashed`, `-accent`, `-vertical` | `--rule-weight` | — |
| `.progress` | `-segments`, `-thin`, `-labelled` | `--progress-h` | `[value]`, indeterminate |
| `.meter` | `-{status}` | `--meter-h` | — |
| `.spinner` | `-sm`, `-lg`, `-inline` | `--spinner-size` | reduced-motion → static |
| `.skeleton` | `-text`, `-block`, `-circle`, `-lines` | `--skel-bg` | shimmer off under RM |
| `.tip` | `-top/right/bottom/left` | `--tip-bg` | `:hover`, `:focus-visible` |
| `.codebox` | `-lines`, `-wrap`, `-tabs`, `-diff` | `--codebox-max` | copy `[data-copied]` |
| `.figure` | `-wide`, `-bleed`, `-side` | `--fig-gap` | — |
| `.pullquote` | `-lg`, `-side` | `--pq-mark` | — |
| `.note` | `-{status}`, `-margin` | `--note-line` | — |
| `.fn` | footnote ref + backlink | — | `:target` |
| `.drop` | drop cap | `--drop-lines` | — |
| `.term` | `<abbr>` styling | — | `:hover` |

---

## 8 · Layer 3 — Components

Composed objects with named parts. Each entry: **parts · variants · properties ·
states · a11y · responsive**.

### `.btn`
- **Parts** `.btn__icon`, `.btn__label`, `.btn__badge`
- **Variants** `-primary`, `-secondary`, `-ghost`, `-link`, `-danger`, `-live`
  (record dot), `-icon` (square), `-block`, `-sm` / `-lg`, `-loading`
- **Properties** `--btn-h`, `--btn-pad`, `--btn-radius`, `--btn-bg`, `--btn-fg`,
  `--btn-line`, `--btn-gap`
- **States** `:hover` (wash), `:active` (scale .98 + press wash), `:focus-visible`,
  `[disabled]`, `[aria-busy='true']`, `[aria-pressed]`
- **a11y** 44px min target, icon-only requires `aria-label`, loading keeps width
- **Responsive** `-block` below `--bp-sm` in button groups

### `.input`
- **Variants** `-sm`/`-lg`, `-flush`, `-invalid`, `-with-prefix`, `-with-suffix`,
  `-float` (floating label), `-search`, `-file`, `-range`
- **Properties** `--input-h`, `--input-bg`, `--input-line`, `--input-pad`,
  `--input-radius`
- **States** `:hover`, `:focus-visible`, `[aria-invalid]`, `[readonly]`, `[disabled]`,
  `:placeholder-shown`, `:autofill`
- **a11y** always paired with `.label`; error text linked by `aria-describedby`

### `.choice` family
`.check`, `.radio`, `.switch`, `.segmented`, `.rating`
- **Variants** `-card` (whole tile is the control), `-inline`, `-lg`
- **Properties** `--choice-size`, `--choice-accent`
- **States** `:checked`, `:indeterminate`, `:focus-visible`, `[disabled]`
- **a11y** native inputs only; `.segmented` is a radio group, not buttons

### `.field`
- **Parts** `.field__label`, `.field__control`, `.field__hint`, `.field__error`,
  `.field__counter`
- **Variants** `-inline`, `-horizontal`, `-required`
- **Properties** `--field-gap`
- **a11y** error uses `role="alert"`, hint uses `aria-describedby`

### `.card` — one card, no twin
- **Parts** `.card__media`, `.card__above` (overlay strip on media), `.card__body`,
  `.card__kicker`, `.card__title`, `.card__excerpt`, `.card__meta`, `.card__foot`,
  `.card__link` (stretched-link overlay), `.card__go` (arrow), `.card__frame`
- **Variants**
  - shape: `-row` (media left), `-tile` (media full-bleed behind text),
    `-bare` (no border), `-inset` (media inside padding), `-flush`
  - emphasis: `-hero` (spans 2 cols), `-feature`, `-quiet`
  - accent: `-signal`, `-craft`
  - interaction: `-hover-lift`, `-hover-frame` (the viewfinder brackets),
    `-hover-scan`
  - content: `-post`, `-video`, `-project`, `-product`, `-note`, `-link`
- **Properties** `--card-pad`, `--card-radius`, `--card-bg`, `--card-line`,
  `--card-media-ratio`, `--card-gap`, `--card-lift`
- **States** `:hover`, `:focus-within`, `[data-status]`, `[aria-current]`
- **a11y** one stretched link per card; the arrow is decorative
- **Responsive** `-row` collapses to stacked below `cq-sm`; `-hero` drops to one
  column below `cq-md`

The old `.c` collection block is folded in as `-row` / `-tile` / `-bare`. Ship `.c` as
a deprecated alias for one minor version with a console warning in the docs, then delete.

### `.nav` family
`.breadcrumb`, `.tabs`, `.toc`, `.pager`, `.pagination`
- **Variants** `.tabs-underline` / `-pill` / `-vertical` / `-scroll`;
  `.toc-sticky` / `-numbered`; `.pagination-compact`
- **States** `[aria-current='page']`, `[aria-selected]`
- **House rule** active state is a dot or a 2px rule, never a filled pill

### `.navbar`
- **Parts** `.navbar__brand`, `.navbar__links`, `.navbar__actions`, `.navbar__burger`
- **Variants** `-sticky`, `-transparent`, `-bordered`, `-centered`, `-hide-on-scroll`
- **Properties** `--navbar-h`, `--navbar-bg`, `--navbar-blur`
- **States** `[data-scrolled]`, `[data-dir='up'|'down']`, `[aria-expanded]`
- **Responsive** collapses to burger below `--bp-md`
- Burger animations live in their own file. The current 1,574-line navbar is split
  three ways: bar, menu, burger.

### `.menu` (dropdown / mega / offcanvas)
- **Parts** `__trigger`, `__panel`, `__item`, `__group`, `__divider`, `__head`
- **Variants** `-mega`, `-offcanvas`, `-context`, `-end` (right-aligned)
- **Built on** Popover API + `<details>` fallback. Escape and click-outside come free.

### `.acc` / `.collapse`
- Built on `<details>` / `<summary>`, animated with `interpolate-size`
- **Variants** `-bordered`, `-flush`, `-exclusive` (name attribute)

### `.dialog` / `.popover` / `.sheet` / `.tooltip`
- Native `<dialog>` and Popover API only
- **Variants** `.dialog-sm/-lg/-full`, `.sheet-bottom/-side`
- **Properties** `--dialog-w`, `--dialog-pad`, `--scrim`
- **a11y** focus trap is native; `::backdrop` styled from `--bg-scrim`

### `.alert` / `.toast` / `.empty`
- **Variants** `-{status}`, `-inline`, `-dismissible`, `-icon`
- **Copy rules** errors say what happened then what to do; empty states are an
  invitation with a verb CTA, never "Nothing here yet"

### `.player` / `.poster` / `.gallery` / `.lightbox`
- **Parts** `.player__rail`, `__played`, `__buffer`, `__time`, `__bar`, `__cc`
- **Variants** `-mini`, `-audio`, `-chapters`
- **Properties** `--player-h`, `--player-accent`

### `.list`
- **Variants** `-marker`, `-check`, `-inline`, `-divided`, `-numbered`, `-tree`

### `.tl` (timeline)
- **Parts** `__item`, `__node`, `__time`, `__title`, `__body`, `__meta`
- **Variants** `-compact`, `-alternating`, `-branch`

### `.comment`
- **Parts** `__face`, `__head`, `__author`, `__time`, `__text`, `__actions`
- **Variants** `-nested`, `-op`, `-pinned`

### `.command` (⌘K)
- **Parts** `__input`, `__list`, `__group`, `__item`, `__kbd`, `__empty`
- Progressive: without JS it is a search form that submits

### `.carousel` / `.reel`
- CSS scroll-snap only, no JS required
- **Variants** `-peek`, `-full`, `-dots`, `-cards`

---

## 9 · Layer 4 — Patterns

Recurring arrangements of components. These are what make a *site* rather than a kit.

| Pattern | Composed of | Variants | Properties |
| --- | --- | --- | --- |
| `.deck` | grid of `.card` | `-2/-3/-4`, `-masonry`, `-feature-first`, `-dense` | `--deck-col`, `--deck-gap` |
| `.index` | filter bar + `.deck` + `.pagination` | `-list`, `-grid`, `-table` | `--index-gap` |
| `.prose` | long-form body defaults | `-lg`, `-narrow`, `-docs` | `--measure`, `--prose-rhythm` |
| `.curriculum` | modules → lessons | `-numbered`, `-progress` | `--curr-indent` |
| `.buildlog` | dated entries with nodes | `-compact` | `--log-node` |
| `.itinerary` | days → stops | `-map` | `--itin-gap` |
| `.chat` | transcript turns | `-transcript`, `-bubbles` | `--chat-max` |
| `.compare` | side-by-side | `-table`, `-cards`, `-sticky-head` | `--compare-cols` |

`.prose` is worth its own attention: it is what wraps every blog post, and it must
style `h2…h6, p, ul, ol, blockquote, pre, code, table, img, figure, hr, a, dl, kbd,
mark, sup, details` with vertical rhythm derived from one variable, plus first-child /
last-child margin collapse, plus `:has(> img:only-child)` bleed handling.

---

## 10 · Layer 5 — Sections

Full-width page bands. Each takes `--sec-pad-block` and a `-tight` / `-loose` variant.

| Section | Parts | Variants |
| --- | --- | --- |
| `.header` | `__brand`, `__nav`, `__actions` | `-minimal`, `-split`, `-stacked` |
| `.hero` | `__eyebrow`, `__title`, `__lead`, `__actions`, `__media`, `__note` | `-split`, `-centre`, `-media-bg`, `-terminal`, `-viewfinder`, `-minimal` |
| `.stats` | `__item`, `__value`, `__label`, `__note` | `-2/-3/-4`, `-bordered`, `-inline` |
| `.feature` | `__media`, `__body`, `__title`, `__list` | `-alternating`, `-grid`, `-side` |
| `.pricing` | `__plan`, `__name`, `__price`, `__period`, `__features`, `__cta`, `__flag` | `-2/-3`, `-toggle`, `-comparison` |
| `.faq` | built on `.acc` | `-2col`, `-grouped` |
| `.testimonial` | `__quote`, `__who`, `__face`, `__logo` | `-single`, `-grid`, `-marquee` |
| `.logowall` | `__logo` | `-grid`, `-marquee`, `-muted` |
| `.cta` | `__kicker`, `__title`, `__body`, `__actions`, `__fine` | `-band`, `-boxed`, `-split`, `-inverse` |
| `.newsletter` | `__form`, `__note` | `-inline`, `-boxed` |
| `.footer` | `__brand`, `__grid`, `__links`, `__social`, `__signoff`, `__rec` | `-minimal`, `-fat`, `-centred` |

`.plan` currently lives in the card file. It is a section concern. Move it.

---

## 11 · Layer 6 — Utilities

All `u-` prefixed, all values from a foundation ladder, all in the last cascade layer.
A utility is a token with a class name and nothing more.

Groups: display, visibility, flex, grid, spacing (`u-m*` / `u-p*` on the 4px ladder),
sizing, position, overflow, type (size, weight, align, transform, truncate, balance),
colour (fg/bg/line from tier 2 only), border, radius, shadow, z, motion
(`u-no-motion`), print (`u-hide-print`, `u-print-only`), a11y (`u-sr-only`).

Responsive utilities use a container-query prefix, not a media prefix, wherever the
property is component-scoped: `u-md:u-row`.

---

## 12 · The creator layer — thumbnails, social, channel art

This is the half of the system nobody else has and the reason it is *yours*. It never
ships to a website. Separate entry point, separate bundle.

### Export stages

```css
.canvas { --w: 1280; --h: 720; aspect-ratio: var(--w) / var(--h); }
```

| Class | Pixels | Use |
| --- | --- | --- |
| `.canvas-yt` | 1280 × 720 | YouTube thumbnail |
| `.canvas-og` | 1200 × 630 | blog OG / Twitter card |
| `.canvas-sq` | 1080 × 1080 | Instagram post, podcast art |
| `.canvas-portrait` | 1080 × 1350 | Instagram feed portrait |
| `.canvas-story` | 1080 × 1920 | Story, Reel, Short |
| `.canvas-banner` | 2560 × 1440 | YouTube channel banner |
| `.canvas-wide` | 1920 × 1080 | slide, scene card, end card |

Each stage carries `--safe-inset` and a `.canvas__safe` guide that is visible in the
docs and hidden on export.

### `.thumb` — the thumbnail component

- **Parts** `.thumb__bg`, `__subject`, `__title`, `__kicker`, `__num`, `__badge`,
  `__frame`, `__grade` (colour-grade overlay), `__scrim`
- **Variants**
  - `-talking` — face right, text left, hard scrim
  - `-code` — terminal or editor window as the subject
  - `-split` — before / after diagonal
  - `-list` — a big number plus a noun ("7 mistakes")
  - `-quote` — words only, type as the image
  - `-face` — subject full-bleed, two words of text
  - `-series` — a locked strip with the episode number
- **Properties** `--thumb-title-size`, `--thumb-grade`, `--thumb-scrim`,
  `--thumb-accent`, `--thumb-safe`
- **States** none — it is an export, not a UI

### `.blogcard` / OG image

- **Parts** `__eyebrow`, `__title`, `__meta`, `__mark`, `__rule`, `__pattern`
- **Variants** `-text` (type only), `-photo`, `-code`, `-series`
- Auto-fits the title with `clamp()` across three tiers so 4-word and 14-word titles
  both fill the frame.

### `.social`

`.social-post`, `.social-story`, `.social-carousel` (with `__slide` and a page dot
strip), `.social-quote`, `.social-tip`. Each has a `__handle` lockup and a
`__swipe` affordance for carousels.

### `.channel`

Banner with the three safe zones drawn (TV 2560×1440, desktop 2560×423,
mobile 1546×423), avatar, watermark, end card with subscribe and next-video slots.

### `.lowerthird` and `.scene`

`.lowerthird` — name plate, `-bar`, `-box`, `-ticker`, with a `--lt-enter` slide.
`.scene` — full-frame `-title`, `-quote`, `-section`, `-outro`, `-stinger`.

### Export rules

- Every creator component must render correctly with `#print-color-adjust: exact`.
- No web fonts loaded at export time — subset and inline, or the render races.
- Type never below 44px on a 1280-wide canvas (it must survive the 168px grid preview).
- Every stage validates against its safe area in the docs with a toggle.

---

## 13 · Thumbnail & blog-image design guidelines

The rules, not just the classes. This section goes in `PRINCIPLES.md` and the docs.

### The three-second test
A thumbnail is read at 168 × 94 pixels on a phone, in a scroll, next to eleven others.
If the idea does not survive being 13% of its size, the idea is wrong, not the design.
Every thumbnail must be reviewed at 168px wide before it ships. The docs page shows
every thumbnail at both sizes side by side, always.

### Word count
- **Thumbnail: four words maximum.** Three is better. Zero is allowed if the subject
  carries it.
- **Never repeat the video title.** The title says what it is; the thumbnail says why
  you would care. If they say the same thing you have wasted one of them.
- **OG image: the title, verbatim, and nothing else** except the eyebrow and the mark.
  A blog card is a label, not a poster.

### Type
- Display face only. Never body face, never mono, for the headline.
- One size per thumbnail. If you need two sizes you have two ideas.
- Tracking tighter than on the web (`--tracking-tighter`) — at that scale, loose
  tracking reads as smudge.
- Set in sentence case. All-caps at thumbnail scale loses word-shape, which is the
  main thing a reader has at 168px.
- Minimum 44px on the 1280 canvas. That is 5.8px in the grid — the floor of legibility.

### Contrast and the scrim
- Text sits on a scrim, never directly on a photo. `--thumb-scrim` is a hard-edged
  linear gradient, not a blur — blurs render inconsistently across export paths.
- Measure contrast against the *lightest pixel under the text*, not the average.
- The scrim is allowed to be ugly. It is doing a job.

### Colour
- **One accent per thumbnail.** Signal for urgency and live things; craft for
  process, tutorial and build things. Never both.
- The accent may occupy at most ~10% of the frame. A thumbnail that is mostly accent
  has no accent.
- Grade the photo toward the ink ramp (`--thumb-grade`) so the subject sits in the
  same world as the type. Ungraded stock photography is the fastest way to look
  generic.

### Composition
- Subject on one third, text on the other two. The rule-of-thirds guide is built into
  `.canvas` — use it.
- Faces: eyes on the upper third line, looking toward the text, never away from frame.
- Leave the bottom-right 15% clear. The duration stamp lives there and will cover
  whatever you put under it.
- The corner brackets are a frame device, not decoration: they mark that this is
  *footage*. Use them on video thumbnails. Do not put them on a blog OG card, where
  nothing was ever recorded.

### Series consistency
- A series locks: one layout variant, one accent, one type size, one badge position.
- The only thing that changes between episodes is the subject and the number.
- If episode 6 needs a different layout, it is not the same series.

### What never appears
Drop shadows on text (use the scrim). Outer glows. Gradient text. More than one
arrow. Circled faces. Red arrows pointing at a face. Emoji. Any typeface not in the
three-voice system.

---

## 14 · Component contract

Every component file — no exceptions — contains, in this order:

1. **Header comment**: what the component argues, not what it does. One paragraph.
2. **Composition warnings**: which pseudo-elements it consumes, what it cannot be
   combined with.
3. **The block**, with its `--component-*` variables declared first.
4. **Parts** (`__`), in DOM order.
5. **Variants** (`-`), grouped by axis with a comment per axis.
6. **States**, as attribute selectors only.
7. **Container queries**, last.

Every component's docs page — no exceptions — contains:

- One-line description
- Anatomy diagram with parts labelled
- Minimal HTML (copyable)
- Every variant rendered
- The properties table
- The states table
- The responsive table
- A11y notes: roles, keyboard, focus order, announcements
- "Do / Don't" pair, with a real wrong example
- Both themes, toggled live
- 320px width preview

If a component cannot fill this template, it is not finished.

---

## 15 · Tailwind bridge

Tailwind never owns a token. It reads yours.

```css
/* tailwind/theme.css */
@import "@imswarnil/swarnil-design";
@import "tailwindcss";

@theme inline {
  --color-canvas:  var(--bg-canvas);
  --color-surface: var(--bg-surface);
  --color-sunken:  var(--bg-sunken);
  --color-fg:      var(--fg-default);
  --color-muted:   var(--fg-muted);
  --color-accent:  var(--accent);
  --color-craft:   var(--craft);
  --color-line:    var(--line-default);

  --font-display: var(--font-display);
  --font-body:    var(--font-body);
  --font-slate:   var(--font-slate);

  --radius-card: var(--radius-lg);
  --ease-out:    var(--ease-out);
}
```

`bg-surface` in Tailwind and `var(--bg-surface)` in your CSS are then the same pixel
forever, including in dark mode, with no duplicated config. Tailwind's own layer sits
below `u-*`, which is why your escape hatch still wins.

---

## 16 · Docs site

The docs are a product. Structure:

```
Overview      what the system argues, install, quick start
Foundations   colour · type · space · elevation · motion · layout · pattern · frame · icons
Elements      one page each
Components    one page each
Patterns      one page each
Sections      one page each
Utilities     searchable table
Creator       thumbnails · social · channel · scene, each with live canvases
Guidelines    thumbnail rules · writing · accessibility · dark mode · contributing
Tokens        the full table, both themes, with contrast ratios shown
Playground    live token editor writing to :root, with a copy-out button
Changelog
```

Every page: theme toggle, copy-HTML button, 320px preview toggle, contrast badge.
Nothing in `site/` is committed. CI builds and deploys.

---

## 17 · Build, CI, release

**Scripts**

| Command | Does |
| --- | --- |
| `npm run dev` | build docs, watch, serve |
| `npm run build` | `dist/*.css`, `dist/tokens.json`, docs |
| `npm run lint` | stylelint, zero errors required |
| `npm run audit` | layers + classes + contrast + size |
| `npm run test` | Playwright visual, both themes; axe over docs |
| `npm run size` | gzip budget |

**Size budgets** (gzipped, fail CI if exceeded):
foundation ≤ 8 KB · elements ≤ 5 KB · components ≤ 22 KB · patterns ≤ 8 KB ·
sections ≤ 7 KB · utilities ≤ 6 KB · **full bundle ≤ 55 KB** · creator ≤ 15 KB

**Release**: semver. Adding a component is minor. Removing or renaming a class is
major. Changing a token *value* is minor; changing a token *name* is major.
Deprecations ship as aliases with a docs warning for one full minor cycle.

---

## 18 · Migration plan

You do not need a big-bang rewrite. Six phases, each shippable.

**Phase 1 — clear the ground (1 day).**
New repo `swarnil-design`. Delete `inspiration-…`, `video/`, committed `docs/*.html`.
Split `collection/` into a separate theme repo. Copy `src/` across unchanged. Add
`0-config/layers.css` and wrap every existing file in its layer. Nothing else changes.
Ship. The system still works; the repo is now 4 MB.

**Phase 2 — tokens (2 days).**
Rewrite `01-color.css` in `oklch` with `light-dark()`. Collapse the three theme
blocks to one. Add the missing dark tokens. Add `--elevation-*`. Write
`audit-contrast.py` and fix whatever it finds. Ship.

**Phase 3 — the card merge (2 days).**
Fold `.c` into `.card` as `-row` / `-tile` / `-bare`. Alias `.c`. Move `.plan` to
sections. Update your site's `_includes/card.html` to the merged class names — it is
one file and it is the best test the merge worked. Ship.

**Phase 4 — the splits (2 days).**
Navbar → bar / menu / burger. Form → input / choice / field. `27-composite` and
`23-collection` → layer 4 patterns. `4-broadcast` → `creator/`. Renumber. Run
`audit-layers.py`. Ship.

**Phase 5 — the gaps (1 week).**
Add what is missing: `.command`, `.tooltip` as a real component, `.upload`,
`.segmented`, `.rating`, `.stepper`, `.meter`, `.divider-label`, and sections
`.pricing`, `.faq`, `.logowall`, `.testimonial`, `.newsletter`. One per commit, each
with its full docs page. Ship weekly.

**Phase 6 — creator and container queries (1 week).**
Build out `creator/` properly with all seven canvases and the thumbnail variants.
Convert every component's media queries to container queries. Add the Tailwind bridge.
Write `PRINCIPLES.md`. Tag `1.0.0`.

---

## 19 · Definition of done

A component is finished when all of these are true:

- [ ] Lives in the right layer and references nothing above it
- [ ] Declares its `--component-*` variables before any other rule
- [ ] Uses tier-2 tokens only — no ramp steps, no raw values, no hex
- [ ] Contains no `data-theme` and no `prefers-color-scheme`
- [ ] Works at 320px without overflow
- [ ] Uses container queries, not media queries, for its own layout
- [ ] Interactive parts are ≥ 44px
- [ ] Focus is visible in both themes and on media backdrops
- [ ] State is expressed in ARIA or `data-*`, never an `.is-` class
- [ ] Degrades correctly with JavaScript disabled
- [ ] Respects `prefers-reduced-motion` through `--dur-*`, with no local query
- [ ] Passes the contrast audit in both themes
- [ ] Header comment explains the argument, and lists pseudo-element conflicts
- [ ] Docs page has anatomy, all variants, properties, states, responsive, a11y,
      do/don't, and both themes
- [ ] `npm run lint && npm run audit && npm run test` clean

---

## 20 · PRINCIPLES.md — the personality, stated once

These are the house rules. They go public, because they are the reason someone would
choose this system over Bootstrap.

1. **One accent, rationed.** The system is almost monochrome so that a single colour
   can mean something. Adding a second hue amends the argument, it is not a tweak.
2. **Active state is a dot or a 2px rule. Never a filled pill.**
3. **State lives in ARIA.** Style `[aria-current]`, `[aria-expanded]`, `[data-*]`.
   An `.active` class can disagree with the accessibility tree; an attribute cannot.
4. **The platform first.** `<details>`, `<dialog>`, Popover, native inputs. Keyboard
   and Escape should come free rather than be rebuilt badly.
5. **Motion is honest.** Under 200ms for feedback, one property at a time, everything
   off under reduced motion. The finished state is the resting state — nothing may be
   unreachable if an animation never runs.
6. **Two tiers of token, never three.** Primitives are referenced by semantics.
   Components read semantics. That is why one override rebrands everything.
7. **Frames say what a thing is before you read it.** A window says app, a terminal
   says command, a viewfinder says footage. Use them to mean, not to decorate.
8. **Dark is not an inversion.** Surfaces lift with light. Hairlines go translucent.
   Shadow becomes elevation.
9. **The mono voice is metadata only.** Timecodes, labels, dimensions, code. The
   moment mono carries a sentence, it stops meaning "this is data".
10. **Nothing generated is committed.** If CI can build it, git should not hold it.
11. **A component that cannot fill the docs template is not finished.**
12. **Copy is design.** Errors say what happened then what to do. Empty states are an
    invitation. Buttons name the thing that happens. No "please", no "successfully",
    no exclamation marks.