# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning follows [SemVer](https://semver.org/spec/v2.0.0.html).

## [Unreleased] — the rebuild

The system was rebuilt from scratch on the `rebuild` branch against
`approach.md`. The previous system (Creator Design System, "Frame & Signal") is
archived locally, is not imported, and its history is not carried forward.

### Added
- **Backgrounds** (`1-foundation/12-background.css`): `bg-*` grounds — solid
  surfaces, glow (with drift), aurora, mesh, spot, vignette, fades, ink, and an
  inline-SVG grain. Every one from tier-2 tokens; all paint on the element so
  they compose with patterns and frames.
- **Effects & interactions** (`2-elements/25-effect.css`): `tr-*` transition
  bundles, `ix-*` hover answers (underline, zoom, raise, glow, arrow, tilt,
  dim, reveal, colour, shine), `fx-*` entrances, delays, a typed title, scroll-
  driven reveals and parallax on `animation-timeline`, a page progress bar,
  ambient float / shimmer / Ken Burns / scan / glitch / beacon, and a CSS
  counter count-up on a registered `@property`.
- **Overlays** (`2-elements/26-veil.css`): `.veil` layers — scrims in six
  directions, vignette, letterbox, spot, scan, grain, and the colour grade
  (tint, craft, ink, duotone via `veil-mono` + `veil-grade`) — plus `.glass`,
  the translucent panel for footage.
- **The broadcast layer** (`7-broadcast/`, its own bundle
  `dist/swarnil-broadcast.css`): export canvases with safe-area guides, stream
  scenes (title, starting soon, BRB, ending, chapter, quote, end card, live,
  stinger), lower thirds in five dresses, stream widgets (cam, LIVE bug,
  alert, chat, goal, now playing, countdown, ticker), thumbnails in seven
  compositions and the OG image. Everything sized in `cqi`, so one design
  renders at export size and in a 320px docs preview alike.
- **Templates** (`templates/`): a personal homepage, a blog with a two-level
  home, and a post — whole responsive pages built out of the system, copied
  into the site and audited like the docs. Nine new docs pages; a **Broadcast**
  and a **Templates** group in the sidebar.
- **Variants pass**: the `.stepper` (horizontal, vertical, buttons as steps,
  avatars in nodes), timeline avatars and cards; stats values, units, deltas,
  cards, centred, divided and inverse dresses; avatar groups, status dots, the
  live ring, seeking timecodes; marquee logos, bands and display sizes;
  buttons in xs/xl, inverse, glow, arrow, play, social, floating, underline,
  with counts and shortcuts; ghost, glass, glow and gradient cards with icon,
  facts, level and progress parts; curriculum outline, cards, the `.track` and
  the `.classroom` layout; numbered, progress, boxed, horizontal and timed
  chapters; the player's viewfinder frame, chapter markers, captions, theatre
  and mini cuts, and the `.filmstrip`.
- `0-config/properties.css` registers the animated custom properties.
- `.tabs` scroll sideways on a narrow screen instead of pushing the page wide.
- `.card-tile` reads `--card-ratio`; its excerpt is legible on the scrim.

### Changed
- Package renamed to `@imswarnil/swarnil-design`; bundle is `dist/swarnil-design.css`.
- Nine cascade layers declared up front in `src/0-config/layers.css`; every rule
  in `src/` lives inside one.
- Colour in `oklch()`, one lightness ladder shared by eight ramps, one theme
  block via `light-dark()`.
- Typography is a single face: Inter sets display, body, labels and data alike.
  `--font-display`, `--font-label` and `--font-data` are aliases of
  `--font-body`, so headings separate by weight (semibold), size and tracking
  rather than by a second family; labels are Inter worn small and uppercase at
  0.14em tracking; monospace is code only. Space Grotesk is no longer used or
  shipped — one fewer file on the critical path. The old `--font-slate` /
  `--tracking-slate` names survive as aliases for the theme.
- Docs are markdown + `:::demo` blocks in `docs/content/`, built by
  `docs/build.py` into `site/`. Every demo has a preview/code toggle, copy, and
  a 320px view. Fonts are self-hosted.
- Sidebar groups carry an icon from Swarnil Icons and a hairline under the
  open group.

### Removed
- The Python-string docs generator, the committed `docs/*.html`, the README
  specimen SVGs and their script, the `showcase/` and `templates/` JSON
  manifests, the root `CNAME` (generated into `site/` now), and the
  `4-broadcast` layer (returns as `creator/` in a later phase).
