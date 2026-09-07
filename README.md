<div align="center">

# Swarnil Design System

A token-first, dependency-free CSS design system.
Almost monochrome, so that one colour can mean something.

[![CI](https://github.com/imswarnil/Swarnil-Design-System/actions/workflows/ci.yml/badge.svg)](https://github.com/imswarnil/Swarnil-Design-System/actions/workflows/ci.yml)
[![Deploy docs](https://github.com/imswarnil/Swarnil-Design-System/actions/workflows/pages.yml/badge.svg)](https://github.com/imswarnil/Swarnil-Design-System/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Documentation](https://design.imswarnil.com) ·
[Principles](https://design.imswarnil.com/principles.html) ·
[Templates](https://design.imswarnil.com/templates.html) ·
[Broadcast](https://design.imswarnil.com/canvas.html) ·
[Icons](https://icons.imswarnil.com) ·
[Sponsor](https://github.com/sponsors/imswarnil)

</div>

---

## Why

Creators publish in more shapes than anyone: posts, videos, courses, series,
products, trips. Each shape pulls the design somewhere else. This system settles
the argument once, in tokens, and reuses the answer everywhere.

- **Plain CSS.** No framework, no build step required, no runtime.
- **Two-tier tokens.** Primitives feed semantics; components read semantics only.
  Change three variables and the whole site follows.
- **Nine cascade layers, declared first.** Your own stylesheet always wins, with
  no `!important` on either side.
- **Four small voices, one of them monospace.** Labels and data are Inter worn
  differently; mono is for code. CI enforces it.
- **The platform first.** `<details>`, `<dialog>`, the Popover API, native inputs.
- **State lives in ARIA.** Styles read `[aria-current]`, never `.active`.
- **Light, lines and a frame, each in its own slot.** Backgrounds paint on the
  element, patterns on `::before`, veils are children — so a band can carry all
  three without a fight.
- **The broadcast layer.** Thumbnails, OG images, stream scenes, lower thirds
  and overlay widgets, sized in container units so one design renders at
  1280px for export and at 320px in the docs. Its own bundle; a website never
  pays for it.

## Use it

```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@imswarnil/swarnil-design/dist/swarnil-design.min.css">
```

```bash
npm install @imswarnil/swarnil-design
```

```css
@import "@imswarnil/swarnil-design";              /* everything for the web */
@import "@imswarnil/swarnil-design/foundation";   /* tokens only */
@import "@imswarnil/swarnil-design/components";   /* + components */
@import "@imswarnil/swarnil-design/broadcast";    /* the web bundle + the creator layer */
```

For OBS, point a Browser source at an HTML file that loads
`dist/swarnil-broadcast.min.css` and one `<div class="canvas canvas-wide canvas-flush">`.

Then rebrand in one rule, outside every layer:

```css
:root { --accent: oklch(62% 0.19 250); --font-display: 'Your Face', sans-serif; }
```

## Layout

| Layer | Holds |
| --- | --- |
| `0-config` | the `@layer` order |
| `1-foundation` | reset, colour, typography, space, elevation, motion, layout, pattern, a11y, shape, frame, icon, background |
| `2-elements` | badge, table, code, indicators, text, effects & interactions, veils & glass |
| `3-components` | button, card, field, navigation, alert, navbar, menu, overlay, disclosure, media, code player |
| `4-patterns` | deck, chat, timeline, curriculum, thread, log, share, prose |
| `5-sections` | hero, stats, cta, footer, pricing |
| `7-broadcast` | canvas, scene, lower third, stream widgets, thumbnail & OG image — separate bundle |
| `6-utilities` | the `u-*` escape hatch |
| `templates/` | whole pages built out of the system: a personal homepage, a blog home, a post |

## Develop

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # dist/ + site/
npm run lint     # stylelint, zero errors
npm run audit    # mono-voice + class audits
```

The docs are one markdown file per page in `docs/content/`; a `:::demo` block
is both the live preview and the code you copy. See [AGENTS.md](AGENTS.md) for
the rules and [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow.

## Licence

MIT © Swarnil Singhai
