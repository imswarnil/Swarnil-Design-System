---
name: im-design-system
description: Build Ghost themes and pages with the Im Design System — its tokens (--im-*), components (im-*), partials, layouts and rules. Use when writing or changing any HTML, Handlebars or CSS for a site built on this system, when asked for a component, a page layout, a token, a pattern or a YouTube / live-stream frame in its look, or when checking that markup follows its rules.
license: All rights reserved — see LICENSE. The skill is usable by anyone who holds the system.
metadata:
  author: imswarnil
  version: "0.7.0"
---

# Im Design System

An original Tailwind 4 design system for Ghost themes: tokens, layout, forty-odd
components, page sections, fourteen content collections, and frames for the
creator's own channel. Everything it defines is namespaced `im-` / `--im-*`.

## Before writing anything

1. **Ask the system, do not guess.** If the `im-design-system` MCP server is
   connected, call `list_components`, `get_component <name>`, `list_tokens`,
   `search <query>` or `get_page <path>` — they read the repository at call time.
   Without MCP, read `src/components/<name>.css` (the comment at the top shows
   the markup) and `partials/components/<name>.hbs`.
2. **Read `rules`** (MCP) or `README.md` once per session.

## The rules that matter

- **Three layers of tokens.** Primitives (`--im-gray-500`, `--im-space`) are never
  used by a component. Semantic tokens (`--im-canvas`, `--im-ink`, `--im-accent`,
  `--im-line`, `--im-hover-bg`, `--im-on-media`, `--im-ring`, `--im-z-bar`,
  `--im-duration-fast`…) are what components read and the only tier that changes
  between light and dark. Component knobs (`--im-btn-height`, `--im-player-side`)
  are set on the component, a wrapper or `:root`. Never a raw colour, duration or
  z-index in a component.
- **Layers, low to high:** theme · tokens · base · layout · components · effects ·
  utilities. A layout-layer rule cannot override a component's `display`; a
  utility on the element can.
- **Two states, defined once.** `--im-current-*` (light fill + bolder label) is
  "you are here" on every kind of navigation. `--im-hover-bg` is "this answers":
  things fill, lift one pixel and cast `--im-shadow-sm`. Nothing scales or
  sharpens a border. The dot means new / live / unread — never active.
- **Words over a picture** read `--im-on-media` (three strengths), chips read
  `--im-glass`, the foot of a picture is darkened with `--im-media-scrim`.
- **A component never sets its own margin**; the container's `im-stack`,
  `im-section` or grid does.
- **Layout knobs are classes** (`im-stack-md`, `im-grid-lg`, `im-solo-lg`); a
  `style=` attribute carries only data (a rating, a bar width, a colour).
- **Ghost helper names are reserved.** A field a template reads must not be
  called `date`, `price`, `code`, `url`, `content`, `excerpt`, `tags`… (the
  comment's timestamp is `when`, a snippet's code is `snippet`).
- **Ghost's card CSS is unlayered:** set `"config": { "card_assets": false }` and
  ship `im-content.js`.
- **Provenance:** nothing from a commercial theme, ever; anything from outside
  is openly licensed and listed in `PROVENANCE.md`. Fonts: Geist, Geist Mono,
  Geist Pixel only.

## Page shapes

| Shape | Class | For |
| --- | --- | --- |
| Site with a sidebar | `.im-shell` + `shell/topbar` + `.im-sidenav` | many sections |
| Site with a top navbar | `shell/navbar` | full-width pages |
| A page on its own | `.im-solo` (+ `im-solo-split`) | sign in, guestbook, résumé |
| Watching a sequence | `.im-player` | a lesson, an episode |
| A 9:16 clip | `.im-shortwatch` | a short with its post |
| One post, rail on a switch | `.im-single[data-sidebar]` | posts, pages |
| Reading + contents + widgets | `.im-with-rails` | long posts |

Every container is measured in the 12-column grid (`--im-col`, `--im-span-N`,
`--im-grid-gap`); `.im-cols` is the grid itself and `.im-guides` (first child of
`.im-shell-main`) draws it on the page — on unless `<html data-im-guides="off">`;
any `[data-im-guides-toggle]` button flips and remembers it. Anything with
running text needs a canvas ground so the lines stay in the gutters.

## Helpers that always ship

`src/utilities/helpers.css` guarantees a token-backed set of Tailwind utilities
in `im.css` — spacing, display, flex, grid (`md:grid-cols-3`, `col-span-8`),
sizing, type (`text-h2`), semantic colour (`text-muted`, `bg-surface`), edges.
Use them to compose; to change a component everywhere, set its knob.

## Motion, on the site and in video

`--im-duration-instant | fast | base | slow | long` (120 · 200 · 360 · 640 ·
900 ms) and `--im-ease-out | in | in-out | spring | glide`. The same values are
published as `dist/assets/im-motion.json` for video tools, so a cut on the
channel and a hover on the site share one feel. Motion is felt, not watched:
about a rem of travel, and everything stands down under reduced motion.

## Frames for the channel

`src/components/studio.css` draws fixed-size frames in the system's look —
thumbnails (1280×720, and 1080×1920 for a short), channel art (2560×1440 with
the safe area), profile art, and live-stream scenes (1920×1080). Each is a page
under `/frames/…`; open it at its size to screenshot, or load it in a browser
source. `?bg=transparent` lifts the background off an overlay.

## Verify

`npm run build` must end with "every Ghost helper the partials use is modelled";
`npm run check` must end with "ready to ship" (no dead `im-*` class, no broken
link, provenance empty). Check a page at desktop width, at 390px and in dark mode.
