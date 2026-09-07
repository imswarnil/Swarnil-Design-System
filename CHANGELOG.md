# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning follows [SemVer](https://semver.org/spec/v2.0.0.html).

## [Unreleased] — the rebuild

The system was rebuilt from scratch on the `rebuild` branch against
`approach.md`. The previous system (Creator Design System, "Frame & Signal") is
archived locally, is not imported, and its history is not carried forward.

### Added
- **A Showcase page** — every family at its real size in one scroll, and the
  page to open after any token change.
- **Responsive spacing helpers** in the framework bundle: `p`/`m` in logical
  properties plus `gap`, nine steps across six breakpoints, with the three
  largest steps fluid. Responsive `row-cols-*` too.
- **A framework bundle** (`src/8-framework/`, `dist/swarnil-framework.css`):
  `.container` with five steps, `.row` with named gutters, `.col-*` across six
  breakpoints with offsets and order, `.row-cols-*`, row and column alignment,
  and responsive `d-* f-* j-* a-* text-*` utilities. Opt-in, so the core stays
  intrinsic; ~2 KB gzipped over the base bundle.
- **A real syntax palette**: eight tier-2 tokens (`--syn-*`) assigned by token
  category, so a string and a function name are no longer the same colour.
  Every code dress remaps the eight rather than restating eleven selectors.
- **`.toc`** (`3-components/45-toc.css`) — the table of contents, with
  `-numbered`, `-boxed`, `-inline`, `-sticky` and a scroll-driven `-progress`
  rail. The docs' own contents is now this component.
- **`.timestamps`** (`3-components/46-timestamps.css`) — moments in a video,
  with `ch`-aligned timecodes; `-long`, `-numbered`, `-ruled`, `-boxed`, `-h`.
- **Carousel**: `-tall`, `-2`, `-3`, `-free`, `-bleed`, `__thumbs`, `__thumb`,
  `__count`.
- Docs: a **Collections** group (anatomy, Video, Writing, Courses, Projects);
  **Image** and **Video** split out of Media; an **Interactions** page split out
  of Effects; "The numbers" on the Layout page; menus-in-the-bar and the
  hamburger on Navbar.
- **Interactions split into their own module** (`2-elements/28-interaction.css`)
  and their own docs page, previewing all twelve hover answers side by side.
- **Patterns**: `pattern-triangle`, `-carbon`, `-topo`, `-moire`, `-diamond`.
- **Effects**: `fx-flip-in`, `fx-unfold`, `fx-settle`; ambient `fx-breathe`,
  `fx-swing`, `fx-drift`.
- **Ad, in full**: display formats `ad-leader`, `-billboard`, `-rect`,
  `-square`, `-sky`, `-responsive` (reserves from an aspect ratio) and
  `-float` (the anchor unit, with its three conditions attached); native
  formats `ad-multiplex`, `-sponsored`, `-affiliate` with `__grid`, `__unit`,
  `__thumb`, `__title`, `__brand`, `__price`, `__cta`, `__disclosure`. Every
  fixed format folds to the nearest shape that fits at 64/48/34rem.
- **Scan** (`.ix-scan`, `.ix-scan-light`): scanlines plus one sweeping band on
  hover and focus. Works on a button and on an image alike, because it only
  paints over the box — nothing inside moves.
- **Drawn marks** (`.fx-mark`, `.fx-circle`, `.fx-underline`): a highlighter, a
  ring and an underline, revealed along a registered `--draw` on a `view()`
  timeline, so they look drawn rather than faded in. Finished — not absent —
  under reduced motion.
- **Cutout** (`.cutout`, `__media`, `__text`, `-sm`, `-lg`): footage read
  through the letters. A knockout with a blend mode rather than
  `background-clip: text`, which cannot take a `<video>`; both theme branches
  ship.
- **Animated grounds**: `bg-scanlines`, `bg-beams`, `bg-graph` — slow, one
  property each, off under reduced motion.
- **Patterns and shapes**: `pattern-wave`, `pattern-brick`, `pattern-zigzag`,
  `rule-dotted`, `rule-fade`, and `.notch` (`-sm`, `-lg`, `-end`).
- **Button motion**: `.btn-fill`, `-swap` (+ `__swap`), `-slide`, `-lift`,
  `-ring` — alternatives to the default press, never additions to it.
- **`.btn-video`** (+ `__video`, `__label`): the clip runs inside the button,
  poster at rest, scrim under the label.
- **`.btn-burst`** (+ `__pop`), **`.btn-toggle`**, **`.btn__count`**: the
  subscribe spray, fired by `[aria-pressed='true']`, authored per mark through
  `--a` and `--d`.
- **`.field__pop`**: marks that answer a keystroke, on
  `:not(:placeholder-shown)`.
- **Pager dresses**: `.pager-course`, `-media`, `-series`, with `__thumb`,
  `__no` and `__body`.
- **Code player**: `.codeplayer-crt` (curved glass, green phosphor, heavy
  bloom — faked at the edges, never a 3D transform) and `-flicker`.
- **`.linkcard`** and **`.refs`** / `.ref` / `.ref-mark`
  (`2-elements/27-linkcard.css`): the two ways an article points elsewhere.
- **`.ad`** (`3-components/44-ad.css`): the paid slot. Reserves its height
  before anything loads, labels itself, and can be dismissed — all from one
  `data-ad-state` attribute, correct with no JavaScript at all.
- **Product card**: `.card-product`, `__rating`, `__was`, `__buy`,
  `[data-sold]`.
- Docs: a new **Ad** page, a rebuilt **Article** page covering the whole middle
  of a page (including how it all loads), and **Code** — one page for the
  inline span, the quiet block and the screen. Real photographs and an
  eight-second clip in `docs/assets/media/`, credited in `CREDITS.md`.

### Changed
- **Control density.** The button scale was a landing-page scale; it is now an
  app scale — 34px default with 12px padding (was 40/16), and `btn-lg`/`btn-xl`
  pulled in to 40px/46px (were 48/56). Inputs and `--field-h` follow. The 44px
  touch minimum now covers width as well as height on icon buttons, which is
  what makes the smaller visual size safe.
- **Icon stroke width is corrected per size**, so a 14px icon no longer draws a
  sub-pixel line. Constant ~1.4px optical weight at every size.
- **Overlays rewritten over real photographs.** The demos were over gradients,
  where a veil is indistinguishable from a slightly different gradient; the
  page now opens with a no-veil / veil comparison and shows the grade doing the
  job it exists for.
- `Effects & interactions` is now two pages: **Effects** (what the page decides
  to do) and **Interactions** (what answers a person).
- **Docs information architecture re-cut.** Tokens, Effects & interactions and
  Overlays moved to Foundation; Badge and Indicators to Components; Field and
  Form to a new **Forms** group. Every reference group now sorts
  alphabetically. `codeplayer.html` is now `code.html`.
- The docs' right rail is one sticky block holding the contents and an ad slot,
  pinned at the top rather than two siblings drifting apart mid-page.
- **Shelf** (`3-components/41-shelf.css`): the catalogue row — a titled strip
  that bleeds past the page column, snap-scrolls, keeps a peek of the next
  item, and raises one item on hover without pushing the others.
  `-ranked` (counter numerals, outlined, behind the item), `-sm/-lg/-tall/
  -poster`, `-flat`, `-inset`.
- **Filter & facets** (`3-components/42-filter.css`): `.facets` (the filter
  column — groups as `<details>`, options as label rows with counts and
  language swatches, `-sticky/-boxed/-ruled/-inline`), `.filterbar` (count,
  search, sort) and `.viewtoggle` (grid or list, as two radios on one track).
  Every control is a real form control; `:checked` is the state.
- **Masthead** (`3-components/43-masthead.css`): one project held at the top of
  its page. Sticky, and it condenses on scroll through
  `animation-timeline: scroll()` — no listener, no observer, and off entirely
  under reduced motion. The mark never leaves. `-blur/-sunken/-line/-inverse/
  -lg`, plus `__rail` for reading progress on its own edge.
- **Kit** (`4-patterns/57-kit.css`): the gear list — role, thing, one sentence,
  a way to look at it. `-sm/-lg/-ruled/-grid/-cards/-numbered`.
- **Results** (`4-patterns/58-results.css`): a collection body in two views
  from one attribute. `data-view="list"` turns each card into a row; a
  `.browse` wrapper plus `:has()` switches it with no JavaScript at all.
- **Card**: `.card__pattern` (the texture slot — a child, so a pattern and a
  frame can share a card), `.card-story` (9:16 with no width cap, for a wall
  of shorts), and `.card-repo` with `.card__lang` and `.card__langs` — the
  repository card, the only place in the system a hue is set per item, because
  there the hue is data.
- **Footer**: `__social`, `__form`, `__meta`, `__legal` and the oversized
  `__mark` (`-solid`); `-compact`, `-loose`, `-center`, `-inverse`; a `bg-*`
  ground now wins over the band's own background; two responsive steps instead
  of one.
- **Hero**: `-wide` (the media takes the larger half), `-media-start`, `-xl`,
  and `__facts` — the strip of numbers under the actions.
- **CTA**: `-sm`, `-row` and `__form`, which is what stops a newsletter field
  stretching to the width of the band.
- **Timeline**: `__media`, `__strip`, `-media` and `-icons` — the illustrated
  sequence, with a picture and a glyph per entry.
- **Curriculum**: `__shot` (a still per module), `.classroom__tabs`,
  `__foot`, `__meta`, `-side-start` and `-wide` — the lesson player, finished.
- **Layout**: `.center-2xl` (90rem) for a page of collections.
- **Templates**: nine new pages — an about page, a video channel with a 16:9
  episode and a 9:16 short, a course catalogue with a course and a lesson
  player, and a project portfolio with a case study. All twelve now share one
  navigation, one footer and one page column.
- Docs: five new pages (Shelf, Filter & facets, Masthead, Kit, Results), and
  the Templates page frames all twelve.

### Fixed
- **The curriculum's hierarchy was invisible**: module and lesson titles were
  the same size, and a lesson sat at `--fg-subtle`, so unwatched lessons looked
  disabled. Three visible steps now, legible at rest, with state doing the
  quieting.
- **The docs chrome painted every link inside a list item** in prose-link
  colour, so component demos whose rows are links — `.lesson`, `.ts`,
  `.chapters__link`, `.navlist__link` — rendered in the wrong colour and hid the
  "current" state they were documenting. Scoped to `a:not([class])`.
- **The docs markdown renderer took one line per list item**, so any bullet long
  enough to wrap split the list in two and left the remainder as a stray
  paragraph outside it. Six pages were shipping broken lists. Continuation lines
  now join the item they belong to.
- **The docs bar overflowed a 390px phone on every page** — brand, search, theme
  and star came to roughly 540px of min-content. The bar's search (which is also
  in the sidebar) and the theme button's label now go below 40rem.
- `.linkcard__meta` and `.ad__note` set the data voice without tabular figures;
  caught by `npm run audit` and fixed rather than allowlisted.
- **`.card-tile`'s words were painted under its picture.** Both children sit in
  grid cell 1/1, and only the media was positioned — so the media painted in
  the positioned step and the title's text in the inline step, which comes
  first. The body is now raised explicitly.
- **`bg-noise` silently erased `bg-ink` and `bg-spot`.** `background-image` on
  the noise replaced the ground's gradient rather than adding to it, leaving
  the band the colour of the page. Both now have their pair rule, and the file
  says which grounds need one.
- **`bg-ink` and `bg-spot` now declare `color-scheme: dark`,** so `light-dark()`
  resolves to its dark branch inside them and a muted paragraph on a dark slab
  is legible rather than 2:1.
- **`.player__title` sat on top of `.player__tc` and `.player__rec`.** A player
  wearing the viewfinder dress now starts its title bar below that row.
- **The docs bar overflowed a 390px phone on every page.** Brand, search, theme
  and star came to about 540px of min-content; the search (which is also in the
  sidebar) and the theme button's label now go below 40rem.
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
