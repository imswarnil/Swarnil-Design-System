<div align="center">

# Swarnil Design System

A token-first design system on **Tailwind CSS 4** and **daisyUI**.
Almost monochrome, so that one colour can mean something.

[![CI](https://github.com/imswarnil/Swarnil-Design-System/actions/workflows/ci.yml/badge.svg)](https://github.com/imswarnil/Swarnil-Design-System/actions/workflows/ci.yml)
[![Deploy docs](https://github.com/imswarnil/Swarnil-Design-System/actions/workflows/pages.yml/badge.svg)](https://github.com/imswarnil/Swarnil-Design-System/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Documentation](https://design.imswarnil.com) ·
[Principles](https://design.imswarnil.com/principles.html) ·
[Broadcast](https://design.imswarnil.com/canvas.html) ·
[Icons](https://icons.imswarnil.com) ·
[Sponsor](https://github.com/sponsors/imswarnil)

</div>

---

## Why

Creators publish in more shapes than anyone: posts, videos, courses, series,
products, trips. Each shape pulls the design somewhere else. This system settles
the argument once, in tokens, and reuses the answer everywhere.

- **Tailwind for the floor, daisyUI for the parts, this for the design.**
  Tailwind supplies the reset, the theme and every utility; daisyUI supplies the
  thirty-one components this system never built; this system wins every name it
  shares with daisyUI and still loses to a utility. No `!important`, either way.
- **Two-tier tokens, and they are Tailwind's theme.** Primitives feed semantics;
  components read semantics only. Every token is also a utility — `bg-surface`,
  `text-fg-muted`, `rounded-card` — with variants for free.
  Change three variables and the whole site follows.
- **Two ways in.** A link tag with nothing to install, or the source entry inside
  your own Tailwind build, generating only the utilities your markup uses.
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
@import "tailwindcss";
@import "@imswarnil/swarnil-design";              /* everything for the web  */
@import "@imswarnil/swarnil-design/broadcast";    /* + the creator layer     */
@import "@imswarnil/swarnil-design/theme";        /* the tokens alone        */
```

The link tag above needs nothing installed — Tailwind and daisyUI are compiled
into it. The `@import` form needs Tailwind 4 and compiles against your markup.

For OBS, point a Browser source at an HTML file that loads
`dist/swarnil-broadcast.min.css` and one `<div class="canvas canvas-wide canvas-flush">`.

Then rebrand in one rule, outside every layer:

```css
:root { --accent: oklch(62% 0.19 250); --font-display: 'Your Face', sans-serif; }
```

## Layout

| Layer | Holds |
| --- | --- |
| `0-config` | the `@layer` order, the `@theme` token bridge, the prebuilt safelist |
| `1-foundation` | reset, colour, typography, space, elevation, motion, layout, pattern, a11y, shape, frame, icon, background |
| `2-elements` | badge, table, code, indicators, text, effects & interactions, veils & glass, link cards & references |
| `3-components` | button, card, field, navigation, alert, navbar, menu, overlay, disclosure, media, code player, shelf, filter & facets, masthead, ad |
| `4-patterns` | deck, chat, timeline, curriculum, thread, log, share, prose, kit, results |
| `5-sections` | hero, stats, cta, footer, pricing |
| `0-daisy` | daisyUI's own knobs, pointed at this system's tokens |
| `7-broadcast` | canvas, scene, lower third, stream widgets, thumbnail & OG image — separate bundle |
| `6-utilities` | the few utilities Tailwind lacks, as `@utility`: the surface pairs, the hairline, the measures |
| `8-framework` | the page column and the twelve-column row, as `@utility`. The grid itself is Tailwind's |

## Develop

```bash
npm install
npm run dev      # http://localhost:8080
npm run stop     # stop it and free the port
npm run build    # dist/ + site/
npm run lint     # stylelint, zero errors
npm run audit    # mono-voice + class audits
```

The docs are one markdown file per page in `docs/content/`; a `:::demo` block
is both the live preview and the code you copy. See [AGENTS.md](AGENTS.md) for
the rules and [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow.

## Licence

MIT © Swarnil Singhai
