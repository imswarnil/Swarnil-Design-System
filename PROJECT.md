# State of play

**Read this first, before `AGENTS.md` or `approach.md`.** It is deliberately
short: what this repo is, what shape it is in today, and what is next. Update
the log at the bottom at the end of every session — one line per session, newest
first. If this file is accurate, a session starts with ~200 tokens of reading
instead of a survey of the tree.

- `PROJECT.md` (this file) — **state**: what is done, what is next.
- `AGENTS.md` — **rules**: how to work here. Stable, rarely changes.
- `approach.md` — **spec**: what the system is. Authoritative, long.

---

## What this is

Swarnil Design System — a token-first, dependency-free CSS design system.
Plain custom properties and classes, nine cascade layers, no framework, no
runtime, no build step required to *use* it. Almost monochrome, so one colour
can mean something. Published to `design.imswarnil.com`.

The concept, in Swarnil's words: **consistency across everything he makes.**
Content-creator-centric, responsive, and its own thing rather than a restyle of
someone else's system.

## This repo is independent — strict

It **exports**, it never **imports**.

- Other repos in `~/Swarnil/` consume this package. That is the only direction
  the relationship runs.
- **Do not** copy code, patterns, markup or prose *into* this repo from
  `imswarnil.com/`, `theme.imswarnil.com/`, `imswarnil.github.io/`, or any
  other sibling. Not as reference, not as "inspiration", not as a starting
  point.
- Naming, structure and decisions here are decided here. When a sibling repo
  needs something, this repo grows it on its own terms and the sibling reads it.
- The one inbound exception already in place: `docs/icons/sprite.svg` is
  vendored from `icons.imswarnil.com` on build. It is an asset, not a design.

The `~/Swarnil/CLAUDE.md` umbrella file describes how the folders relate. Read
it for *paths*, never for design decisions about this repo.

## Where things stand

`main` serves `design.imswarnil.com` (promoted 2026-09-08, merge `24e4252`).
`rebuild` and `main` hold identical trees; decide whether `rebuild` keeps going
as the working branch now that it has landed.

**The previous system is not in this repo and is not referenced by it.** It is
gone from the tree, gone from the docs and gone from the build — the only trace
is the git tag below, which exists so the history is not lost, and past entries
in the session log, which are a record rather than a dependency.

| | |
| --- | --- |
| What it was | Creator Design System · "Frame & Signal", published here until 2026-09-08 |
| Complete tree | tag **`v0-frame-and-signal`** (commit `f84ccf7`, 630 files) |
| Restorable branch | `main-before-rebuild` |
| Where it is worked on now | `creator.imswarnil.com` — see its `old-design.md` |

Nothing here imports it, and its history is not carried forward. Do not treat
it as a parts bin: if a component from it is worth having, it gets rebuilt on
this system's own terms. The one thing that came out of it before it left is
the eight-second clip in `docs/assets/media/`, credited in the CREDITS file
beside it.

| Layer | State |
| --- | --- |
| `0-config`, `1-foundation` | settled — layers, typed properties, colour, type, space, motion, frame, **background** |
| `2-elements` | badge, table, code (+ the **syntax palette**), indicator, text, effect (tr-/fx-), interaction (ix-), veil, linkcard + refs |
| `3-components` | button, card, field, nav, alert, navbar, menu, overlay, disclosure, media, codeplayer, shelf, filter, masthead, ad, **toc**, **timestamps** |
| `4-patterns` | deck, prose, timeline, curriculum, thread, log, share, chat, **kit**, **results** |
| `5-sections` | hero, stats, pricing, cta, footer |
| `8-framework` | **the opt-in 12-column grid** — container, row, col-*, offsets, order, `row-cols-*`, six breakpoints, responsive `d-/f-/j-/a-/text-*` and `p-/m-/gap-*`. Own bundle `dist/swarnil-framework.css` |
| `7-broadcast` | **canvas, scene, lowerthird, stream, thumb** — own bundle `dist/swarnil-broadcast.css`, layer `sections`, all sizes in `cqi` |
| `templates/` | **twelve pages** — homepage, about, video (channel / 16:9 / 9:16), blog (home / post), courses (catalogue / course / lesson player), projects (portfolio / case study). One navigation, one footer, one page column |
| Docs | 73 pages + home. A **Collections** group (the anatomy + video/writing/courses/projects); Media split into **Image** and **Video**. Groups re-cut: **Tokens, Effects and Overlays moved to Foundation; Badge and Indicators to Components; Field and Form to a new Forms group**, and every reference group now sorts alphabetically |

Gates that must stay green: `npm run lint`, `npm run audit` (mono-voice + class
audits, both strict), `npm run build`.

## Next up

Components and sections, one at a time, on request. Nothing is queued — ask.

Open threads worth remembering:
- **Zero entirely-unused families.** 662 unused classes remain (the framework
  grid alone defines ~450 of them, by design) (utilities are
  meant to be optional), but every *family* now ships at least one class —
  `codeblock`, `codeline`, `loading`, `buffer`, `term`, `cert`, `dl`, `steps`,
  `collapse` and `pop` all got a real demo. This thread is closed; keep it
  closed by demoing a family in the same session you write it.
- The home page's "KB gzipped" stat is **measured by the build** (`{size}` in
  `home.md`, `bundle_size()` in `build.py`). The web bundle is now 47.1 KB
  gzipped, broadcast 51.2 KB.
- **`docs/assets/media/` now holds real photographs and an eight-second clip**
  (1.6 MB). They are docs-only — `dist/` ships no images — and every licence is
  in `CREDITS.md` beside them.
- The docs `src/` folders and the docs *groups* deliberately no longer match:
  `.badge` is CSS in `2-elements` and documented under Components, because that
  is where a reader looks for it. Each page states its own layer.
- **The two code components are now one doc and both earn their place.**
  `/code.html` covers `.code` (inline), `.codeblock` (quiet, in an article) and
  `.codeplayer` (the screen, four dresses). All three read the same `.tok-*`
  classes, which is the argument for keeping them.
- The hero video id is still kold's clip, not Swarnil's own (see the log).
- `docs/assets/fonts/spacegrotesk-*.woff2` are unreferenced and untracked
  (44K; untracked means deleting is not git-recoverable).
- ~~Outside this repo: the `Imswarnil.com` theme's `file:` dep pointed at
  `../../../../Projects/Creator-Design-System`, which no longer exists.~~
  **Resolved 2026-09-07.** That theme moved to
  `creator.imswarnil.com/ghost/content/themes/creator` and now depends on
  `creator.imswarnil.com/_legacy` — the system it was actually written against.
  Nothing under `imswarnil.com/` depends on this repo's old system any more.

---

## Session log

Newest first. One line each: what changed, and anything that would surprise the
next session.

### 2026-09-09 (fifth) — the code block, the highlighter, and the templates
- **New `.codeblock-night` — dark in BOTH themes**, and it is not the same as
  `.codeblock-dark`. `-dark` is built on `--bg-inverse`, which is
  `light-dark(near-black, near-white)`, so on a dark page it renders LIGHT.
  `-night` reads `--ink-950`/`--ink-50` directly — absolute ramp steps, not
  `light-dark()` pairs — so it does not move. Every fenced block and every
  demo code pane on the site is now `-night`. Reaching past tier-2 to a ramp
  step breaks PRINCIPLES #3; it is stated in the file and on `/code.html`,
  because the requirement here IS "ignore the theme".
- ⚠️ **`.codeblock-dark` was broken in the dark theme and nobody had looked.**
  On a dark page it becomes a LIGHT slab, and it was still painting the light
  ramp steps for syntax — pale ink on a pale ground. Every `--syn-*` in it is
  now a `light-dark()` pair that inverts with the slab. Found by building the
  demo that shows the two variants side by side.
- ⚠️ **`.codeblock__pre` inherited its background and colour.** That held only
  while nothing else in the document had an opinion about a bare `pre` —
  and adding the Bulma base gave it one. Cascade layers arbitrate between
  DECLARATIONS; an explicit rule in the lowest layer still beats no rule at
  all. The component now states both. Same for `pre > code`.
- **The highlighter is a single-pass scanner.** It was a chain of `re.sub()`
  calls over already-escaped text, so a later pattern could match inside a span
  an earlier one had just written — `class="tok-com"` is a word before an `=`,
  which is exactly what the attribute rule looks for. Now one alternation per
  language, scanned once, nothing re-read. Languages: html/xml/svg, css,
  js/ts/json, bash/sh. Tested for escape-safety and lossless round-trip.
- **The templates page has no iframes.** It embedded all twelve template pages
  at once to produce twelve ~380px pictures in which nothing was legible. Now
  twelve window-framed cards with **drawn SVG wireframes** — every fill a
  system token, so they follow the theme — plus the description, the address
  bar, and "Open full page" into a new tab. A wireframe is the better picture
  as well as the cheaper one: at that size it says "hero left, media right,
  three tiles under", which is what a reader is comparing.
- Redundant CSS out: `.win__acts` (died when the actions moved into the card),
  `.spec-4xl` (never used by any page), and a dead `.rig__btn` declaration that
  was grouped with `.rig__card` and then had both its properties overridden on
  the next line. `.shell__hit`/`.shell__empty` look dead to the audit and are
  not — docs.js writes them; noted in the file.

### 2026-09-09 (fourth) — Bulma, as the floor
- ⚠️ **This repo now has a runtime dependency, on purpose and on request.**
  `bulma@1.0.4` + `sass` (dev). `src/index.css` is untouched and still
  dependency-free — that bundle remains the default and the one every sibling
  repo consumes. The new one is `dist/swarnil-design-bulma.css`.
- **`bulma` is the first name in the layer order**, so it is the LOWEST layer
  in the document and loses every collision to this system — `.card`,
  `.navbar`, `.table`, `.input`, `.hero`, `.footer`, `.breadcrumb`, `.content`,
  `.tabs`, `.tag`, `.menu`, `.modal`, `.pagination`, `.select`, `.icon` and
  more. Verified in the browser: `.card` paints our surface, `.input` is our
  34px, `.table` our 14px. Bulma is the floor, never an override.
- **What it adds**: `.container`, `.columns`/`.column`, `.grid`, `.section`,
  `.level`, `.media` — the layout API, which is what was asked for. Compiled
  from Bulma's Sass (utilities + themes + base + grid + layout), NOT its 691 KB
  prebuilt file: its elements/components/form are ~39 KB gzipped that would
  lose every cascade they took part in. One line in `src/bulma-base.scss`
  takes all of Bulma instead.
- **`src/0-bulma/bridge.css` themes it from our tokens** — surfaces, ink,
  rules, the accent, the type stack, the radii, and `--bulma-column-gap` →
  `--space-4` so a Bulma grid lines up with our spacing. It overrides Bulma's
  COMPOSED variables, not the HSL parts it builds them from: this palette is
  OKLCH and every token is already a `light-dark()` pair, so decomposing would
  cost a build step and colour accuracy for nothing. Bulma follows the theme
  toggle without knowing one exists. The bridge is one-way — nothing in `src/`
  reads a `--bulma-*`.
- Sizes gzipped: plain 49.4 KB, bulma 78.4 KB, docs site 65.2 → 94.2 KB.
- The docs site now runs on the Bulma bundle, so the base is dogfooded rather
  than merely shipped. It looks identical, which is the proof: the system wins
  everything it defines.
- Documented on `/install.html` ("The Bulma base"), and as rule 1b in AGENTS.md.

### 2026-09-09 (fourth) — two real bugs, found by trying Bulma and fixed here
- ⚠️ **The class audit counted a class named in a CSS COMMENT as defined.**
  `scripts/audit-classes.py` read each file raw, so ".frame-4 needs markup and
  .frame does not" made `.frame-4` look defined while no selector for it existed
  anywhere. The audit has been passing markup that renders unstyled. It now
  strips comments before looking for definitions.
- ⚠️ **`.frame-4` was never a rule.** Used on five pages, described in two file
  headers and recommended in two docs pages, defined nowhere — the four corners
  come from `.frame > .frame__tr` and `.frame__bl`, which need no marker class.
  Removed from the markup and from the prose that recommended it. Nothing
  changed visually, which is the proof it was doing nothing.
- Both found while converting the site to Bulma on a branch. That work is NOT
  merged and should not be: measured, Bulma replaces about six of this system's
  components and has no equivalent for the rest. The conversion doubled the
  bundle (49.6 -> 102.3 KB gzipped), deleted 17 docs pages and all twelve page
  templates, flattened the landing page, and required restoring 281 classes
  Bulma had never had. Branches `trying-bulma` (Bulma as a floor under the
  system) and `bulma-experiment` (Bulma as the system) hold the evidence.
  The rule worth keeping from it: delete a file when something REPLACES it,
  never merely because one name collides.

### 2026-09-09 (third) — the docs shell is an app layout now
- **Full width, no page cap.** The shell no longer caps at all; the measure
  moved onto the article and is CENTRED in its column. Leftover width split
  evenly reads as air; the same width all on one side read as the bug it was.
  Symmetric padding measured at 320 / 390 / 480 / 640 / 900 / 961 / 1024 / 1216
  / 1280 / 1400 / 1600 / 1920, no overflow at any of them.
- **The side is a fixed grey strip that collapses to icons.** `--bg-sunken`,
  flush to the window edge, sticky at full remaining height. `[data-nav=
  'collapsed']` on `<html>` takes it to 3.5rem: twelve group glyphs, no labels,
  no chevrons, no search, and **no scroll at all** at that width. The state is
  written by the inline head script beside the theme, or the sidebar renders
  wide and snaps narrow on every navigation. Clicking a glyph while collapsed
  re-opens the side rather than toggling a group nobody can read. Below 60rem
  the collapsed state is ignored outright — a drawer of unlabelled icons is not
  navigation.
- **No visible scrollbar in the side.** Seventy-six pages cannot fit a
  viewport, so it does scroll; a permanent second scrollbar a centimetre from
  the window edge was what made the page feel like two pages. Hidden bar,
  contained scroll, fade while there is more below.
- ⚠️ **The "you are here" dot was being sliced in half on every page.**
  `.navlist__link` puts it at `inset-inline-start: -space-3`, outside its own
  box — right in a nav with a gutter. This column has `overflow-y: auto`, which
  establishes a scroll container that clips the INLINE axis too, so a negative
  offset is cut at x=0. The component keeps its geometry; the column now gives
  it `space-4` of inline padding, leaving 9px of clearance on a 6px mark.
- Bulma was asked for and not used: this repo's README, AGENTS.md and
  PROJECT.md all say dependency-free, and a design system whose own docs run on
  someone else's framework has stopped being the argument it is making. The
  layout above is the same brief built on the system.

### 2026-09-09 (second) — the shell, the scroll, and the window
- ⚠️ **The shell wasted 60–200px down the right of every page at every width.**
  `max-width: 96rem` with a `1fr` middle column and the article capped at 46rem
  inside it: the slack went to a column that could not use it. The shell now
  caps at the SUM of its columns (`side + measure + rail + two gaps`), the cap
  comes down with the column count, and the article no longer caps itself.
  Measured 0px dead at 320 / 390 / 640 / 900 / 961 / 1024 / 1216 / 1280 / 1400 /
  1600 / 1920, no overflow anywhere. Rail breakpoint 80rem → 76rem.
- **Scroll chaining was most of what felt broken.** `overscroll-behavior:
  contain` on the sidebar and the contents, so hitting the end of the nav no
  longer hands the wheel to the article underneath. Desktop nav rows tightened
  (touch padding kept under `pointer: coarse`), and a `[data-more]` fade marks
  a column that is cut off instead of slicing a word in half.
- **Scrollspy.** `docs.js` marks the contents entry for the section you are in,
  using `[aria-current='true']` — the attribute 45-toc.css already dresses and
  its header already said would be "set by whatever is watching the scroll". It
  picks the last heading scrolled PAST, not the first intersecting one, or the
  mark flickers on short sections and vanishes inside long ones. The active
  contents entry and the current sidebar page are both scrolled into view
  inside their own column, never by moving the page.
- **Edit this page / Contribute moved to the rail, under the contents** — same
  side as the thing they are about.
- **The homepage scan plates were invisible and are now screens.** Pale
  hairlines on a pale ground at 72px wide: every value a real token, and
  unreadable. They take the inverse ground, `--pattern-ink` at half
  `--fg-on-inverse`, 7rem at 16:9 — light-on-dark, which is the only way the
  eye has ever seen a scanline.
- **The twelve templates sit in browser windows now**, each with its own
  address bar, and the address IS the link. A page shown inside a page needs a
  frame that says "this is somewhere else".
- **Breadcrumb is its own page** (`/breadcrumb.html`, Components) with anatomy
  and accessibility notes; `navigation.md` keeps a pointer. 76 pages.

### 2026-09-09 — the site compiles, the site dogfoods, and the icons come off the homepage
- ⚠️ **The site never linked the compiled CSS.** Every page linked
  `/src/index.css` — a three-deep `@import` chain across ~78 unminified,
  render-blocking files — plus four more stylesheets, while `dist/*.min.css`
  was built, copied into `site/` (2.8 MB) and linked by nothing. Production now
  links **one** file, `assets/site.min.css`, compiled from the new entry
  `docs/assets/site.css` by `npm run css:site`: **405 KB, 64.5 KB gzipped, 2
  stylesheets per page** (it and fonts.css). `SDS_DEV=1` still serves the
  source, and that is what `npm run dev` / `npm run watch` set.
- **New: `npm run watch`** — `scripts/watch.mjs`, dependency-free (node's own
  `fs.watch` + `http`), serves :8080 and rebuilds on save in ~250ms. Also new:
  `npm run check` (what CI runs), `npm run clean`, and `css:web` / `css:broadcast`
  / `css:framework` split out of the old one-liner.
- ⚠️ **`docs/assets/docs.css` was entirely unlayered and collided with 25
  system classes** — `.pager`, `.toc`, `.table`, `.code`, `.hero`, `.lead`,
  `.rail`, `.sec__title`, `.navlist__link`, `.tok-*`. Unlayered beats every
  `@layer`, so the docs were documenting overridden copies of their own
  components. Everything in `docs/assets/` is now in `@layer docs`, which the
  layer order appends above the system.
- **The chrome is the system now.** The bar is `.navbar`, the side nav is
  `.navlist` inside `.acc acc-quiet` (whose own file already called it "the docs
  sidebar shape"), the breadcrumb is `.breadcrumb`, the contents is `.toc`, the
  prev/next is `.pager`, the footer is `.footer`, the demo tab bar is
  `.tabs`/`.tab`, the tool buttons are `.btn`, the search field is `.input`, the
  body copy is `.prose`, the fenced code is `.codeblock`. `docs.css` went
  1,377 → 703 lines and `home.css` 478 → 345; what is left is layout, the demo
  frame and the specimens. The private `.bar`, `.barlink`, `.brand`, `.side`,
  `.nav__*`, `.crumbs`, `.foot`, `.home-foot`, `.foot-col`, `.cb`, `.search__*`,
  `.themebtn`, `.ghbtn`, `.demo__tab` families are gone.
- **The homepage's six "Opinions" cards lost their icons.** Six glyphs standing
  in for six sentences, doing no work the heading was not already doing. In
  their place, a 16:9 plate of the system's own `.bg-scanlines` with `.fx-scan`
  falling through it, staggered by `.fx-delay-*` — house texture instead of a
  borrowed glyph, and two real classes doing their real job. Both stop under
  `prefers-reduced-motion` on their own.
- Fixed along the way: `home.css` had a **corrupt rule** (a duplicated
  `.sec__take` block pasted into `.close-band .sec__kicker`, leaving a bare
  `.sec__kicker` leaking to the whole page) and a duplicated footer header;
  `.close-band .btn-ghost` hard-coded `oklch(100% 0 0)` against `--bg-inverse`,
  so it was white-on-near-white in the dark theme — it now mixes off
  `--fg-on-inverse`; the docs footer had no inline gutter (`.footer` is a
  full-bleed band and deliberately carries none).
- Production ships no `site/src/` and only the three `*.min.css` from `dist/`;
  the twelve `templates/` pages get their `/src/index.css` rewritten to the
  minified bundle on copy. `site/` 10 MB → 7.7 MB.
- Gates green: `npm run lint`, `npm run audit` (0 phantom classes), `npm run
  build`. Verified in the browser at 1566px and 390px, light and dark.

### 2026-09-08 (fourth) — the density pass, the showcase, spacing helpers, icon strokes
- ⚠️ **Every control got smaller, and this is a systemic change.** The button
  scale was a landing-page scale: 40px default with 16px padding, 48px lg,
  56px xl. It now reads as an app — **34px default with 12px padding**, and the
  two large sizes were pulled in hardest (40px / 46px). `.input` and
  `--field-h` moved with it so a button beside a field still lines up. Every
  page and all twelve templates are affected; the docs' Button page carries the
  table and the reasoning.
  - The 44px touch floor is what makes the compact scale safe, and it now
    covers **width** as well as height on `.btn-icon` — a 44×34 target was only
    half a fix.
- **Icon strokes are corrected per size.** Every symbol is a 24-unit viewBox, so
  one stroke-width means a 14px icon draws a 0.9px line and a 32px icon draws
  2px. On a phone almost every icon here is 14–16px, and that sub-pixel line is
  exactly what makes an icon set look washed out beside its own text. Stroke is
  now scaled per size to land at ~1.4px, and an icon sized by its host (a
  button's `1.15em`) takes the small weight.
- **Showcase page** (`/showcase.html`, Start): every family at its real size on
  one page — controls, fields, cards, data, navigation, feedback, media,
  patterns, sections, broadcast. It ends with the three things to check after a
  token change. This is the page to open when something feels off.
- **Responsive spacing helpers** in the framework bundle
  (`93-spacing.css`): `p`/`m` in logical properties (`ps`/`pe`, not `pl`/`pr`)
  plus `gap`, nine steps, six tiers. Steps 6–8 are the **clamped** tokens, so a
  helper that sets big spacing shrinks on a phone with no breakpoint written.
  `row-cols-*` gained its responsive tiers at the same time.
- Bundle: web 49.4 KB, broadcast 53.5, framework 56.7 gzipped.
- The class audit's unused count is now 1595 with **0 unused families** — the
  framework's ~1700 generated classes are the whole of that number, and the
  family check is still the gate that matters.

### 2026-09-08 (third) — the framework bundle: a 12-column grid, opt-in
- **`src/8-framework/`, a third bundle.** `.container` (+ five steps, fluid,
  flush, tight), `.row` with `--gutter-x/y` and the six `g-`/`gx-`/`gy-` steps,
  `.col` / `.col-auto` / `.col-1…12`, `.offset-0…11`, `.order-first/last/0…5`,
  all repeated across six breakpoints, plus `.row-cols-1…6`, row/col alignment
  and `.col-break`. `92-responsive.css` adds `d-* f-* j-* a-* text-*` per tier.
  Entry `src/framework.css` → `dist/swarnil-framework{,.min}.css`, export
  `@imswarnil/swarnil-design/framework`.
- **It is a second opinion, not a replacement, and the file headers say so.**
  The intrinsic primitives stay the default — a `.cluster` wraps at any width
  without being told where, and a fixed grid cannot. The framework exists so
  porting a Bootstrap page is a rename rather than a redesign, and it is opt-in
  so the core stays small.
- ⚠️ **The breakpoints are literal numbers.** A media query cannot read a
  custom property, so `30/48/64/80/96rem` appear as literals in two files and
  must stay in step with `--bp-*` in `03-space.css` by hand. That is the entire
  maintenance cost of having a fixed-step grid, and it is written in both file
  headers.
- Text-align utilities are **`text-*`, not `t-*`** — `02-typography.css`
  already owns `t-*` for the type scale, and two families on one prefix is a
  collision waiting for whoever adds `.t-center` in a year.
- Verified in the browser rather than by reading: `col-4` measures 0.333 of its
  row, `col-6` 0.5, and `col-12 col-md-6 col-lg-4` is a third at 1100px.
- ⚠️ The class audit's **unused count jumped 247 → 662**, and that is correct,
  not a regression: the grid defines ~450 classes and a docs page uses a
  handful. The gate that matters is *entirely-unused families*, still zero.
- Bundle: web 49.3 KB, broadcast 53.5 KB, **framework 51.7 KB** gzipped — only
  2.4 KB over the base, because a repetitive grid compresses almost to nothing.

### 2026-09-08 (later) — the syntax palette, two new components, and a Collections section
- **Syntax highlighting rebuilt.** The old scheme collapsed everything into
  accent / default / muted, so a string and a function name were the same
  colour — restraint that had stopped distinguishing. Eight tier-2 tokens
  (`--syn-structure/-key/-str/-num/-fn/-var/-com/-punc`) now carry it, assigned
  by CATEGORY so the same idea keeps the same colour in every language. Every
  dress is a **remap of eight variables** instead of eleven restated selectors,
  which is how the CRT goes monochrome-green in four lines. Hue is allowed here
  for the same reason the repo card colours its language dot: the colour is
  data, not emphasis.
- **Curriculum typography pass.** The module title and the lesson title were the
  same size, so the hierarchy was invisible; and a lesson sat at `--fg-subtle`
  by default, which made an unwatched lesson look disabled and the syllabus read
  as a list of things you could not have. Now three visible steps, the lesson is
  legible at rest and the STATES do the quieting, module numbers align in a
  `ch` column, and lesson lengths right-align.
- ⚠️ **A docs-chrome bug was half of why the curriculum looked wrong.**
  `.doc :is(p, li, td, th, blockquote) a` painted every link inside a list item
  — so `.lesson`, `.chapters__link`, `.ts` and `.navlist__link` all rendered in
  link colour inside demos, and the "current" state a page was documenting was
  invisible. Now `a:not([class])`, the same rule `.prose` already uses. This had
  been wrong on every component demo whose rows are links.
- **Two new components**: `.toc` (the contents — the rule the list is built from
  IS the current-item marker; `-numbered`, `-boxed`, `-inline`, `-sticky`,
  `-progress` on a scroll timeline) and `.timestamps` (moments in a video —
  `ch`-aligned timecodes, `-long`, `-numbered`, `-ruled`, `-boxed`, `-h`, with
  stills). The docs rail now **uses the system `.toc`** instead of its own copy.
- **Carousel styles**: `-tall`, `-2`, `-3`, `-free`, `-bleed`, plus
  `__thumbs`/`__thumb` navigation and a `__count` readout — because twelve dots
  is a texture, and to a screen reader it is twelve links called "1".
- **Media split into Image and Video**, as two docs pages. Image covers
  reserving the box, the figure, the poster, treatments and loading; Video keeps
  the player, chapters, theatre, filmstrip and episode row.
- **Navbar** now demos the dropdown and the mega panel **in a bar**, and the
  hamburger animating off `aria-expanded` — they existed and were documented
  elsewhere, which is the same as missing.
- **Layout** gained "The numbers": the eleven variables that actually define a
  site, in one table, plus why `.switcher` and `.sidebar` have no middle state.
- **New Collections group** (`docs/build.py` GROUPS): the anatomy — five parts,
  four decisions — then Video, Writing, Courses and Projects. Travel is
  deliberately absent until the page exists.
- Foundation additions: five patterns (`triangle`, `carbon`, `topo`, `moire`,
  `diamond`), three entrances, three ambient loops, and an **Interactions** page
  split out of Effects.
- Bundle 48.1 → **49.3 KB** gzipped. Gates green; no overflow at 390 or 1440.

### 2026-09-08 — effects vs interactions, overlays made legible, and the whole ad family
- **`.ix-*` moved to its own file**, `2-elements/28-interaction.css`, and its own
  docs page. The split is not tidiness: an *effect* happens because the page
  decided it should, an *interaction* happens because a person pointed at
  something. Different rule under reduced motion, too — an effect is switched
  off entirely, an interaction keeps the part that answers and loses the part
  that moves.
- **More of everything in Foundation**: five patterns (`triangle`, `carbon`,
  `topo`, `moire`, `diamond`), three entrances (`fx-flip-in`, `fx-unfold`,
  `fx-settle`) and three ambient loops (`fx-breathe`, `fx-swing`, `fx-drift`).
  The new **Interactions** page previews all twelve hover answers side by side
  over real photographs.
- **Overlays rewritten and now actually legible.** Every demo was over a
  gradient, which is why a veil looked like nothing: a scrim over a gradient is
  a slightly different gradient. All of them are over real photographs now,
  opening with a no-veil / veil pair on the same caption, and the grade set
  finally shows what it is for — four strangers' photographs made to look like
  one trip.
- **The ad component is now the whole family.** Display: `leader`, `billboard`,
  `rect`, `square`, `sky`, `responsive` (aspect-reserved), `float` (the anchor
  unit). Native: `multiplex`, `sponsored`, `affiliate`, with `__grid`,
  `__unit`, `__thumb`, `__title`, `__brand`, `__price`, `__cta`,
  `__disclosure`. Every fixed format folds to the nearest shape that fits at
  64/48/34rem rather than overflowing or vanishing.
  - The rule that governs the native ones: a sponsored unit that looks exactly
    like a card is **a card that lies**, so each carries the label, a dashed
    edge and the brand in the data voice, and is drawn a half-step from the
    editorial card beside it. The docs demo the two side by side on purpose.
  - `.ad-float` is the one format that could be a dark pattern, so it ships
    with its three conditions attached (dismissible, ≤20vh, page reserves
    room) rather than being left out — a format you refuse to provide gets
    built badly by somebody in a hurry.
- Two fixes found by looking: a `.dot` inside `.ad__brand` was being squared off
  by the favicon radius, and `.ad-sponsored`'s body had no `flex: 1`, so the
  headline clamped to three short lines in a half-width column.
- Bundle 47.1 → **48.1 KB** gzipped. Gates green; no overflow at 390 or 1440.

### 2026-09-07 (fourth) — motion, the article layer, and the docs re-cut
- **Docs IA re-cut.** Tokens, Effects and Overlays → Foundation; Badge and
  Indicators → Components; Field and Form → a new **Forms** group. Every
  reference group sorts alphabetically (same `order:`, title breaks the tie);
  only Start keeps a reading order. `codeplayer.md` became **`code.md`** in
  Elements and now covers all three code dresses in one page.
- **New in `src/`**: `.ix-scan` (scanlines + one sweeping band on hover, works
  on a button and an image alike); the **drawn marks** `.fx-mark` /
  `.fx-circle` / `.fx-underline`, revealed along a registered `--draw` on a
  `view()` timeline; **`.cutout`** (footage read through the letters — a
  knockout with a blend mode, because `background-clip: text` cannot take a
  video); three **animated grounds** (`bg-scanlines`, `bg-beams`, `bg-graph`);
  three patterns (`wave`, `brick`, `zigzag`), `rule-dotted`, `rule-fade` and
  `.notch`; five **button motions** (`fill`, `swap`, `slide`, `lift`, `ring`),
  **`.btn-video`** (the clip runs inside the button), **`.btn-burst`** +
  `.btn-toggle` + `.btn__count` (the subscribe spray, on `aria-pressed`);
  `.field__pop` (marks that answer a keystroke, on `:not(:placeholder-shown)`);
  three **pager dresses** (`course`, `media`, `series`); `.codeplayer-crt` and
  `-flicker`; **`.linkcard`** and **`.refs`** (elements 27); **`.ad`**
  (components 44 — reserves its height, says what it is, can be closed);
  and the product card (`card-product`, `__rating`, `__was`, `__buy`,
  `[data-sold]`).
- **Article page rebuilt** (`content.md`): headings, lists, *how they load*
  (skeletons), quotes, pictures, video, a carousel, a stepper, info boxes, the
  ad, the product, the link out and the sources — the middle of a page, which
  a design system is usually vague about.
- **Real media.** `docs/assets/media/` — ten Unsplash photographs and an
  eight-second Big Buck Bunny excerpt, both credited in `CREDITS.md`. A grey
  rectangle proves a box is the right size and nothing else; the scrim under a
  caption and the brightness of a video button are only checkable against a
  real image.
- **Docs chrome**: the right rail is now ONE sticky block (`.rail__pin`)
  holding the contents and an ad slot, pinned at the top. Two sticky siblings
  drift apart as you scroll, which is exactly what "half floating in the
  middle" looked like.
- **Two bugs in the docs build and the docs shell, both pre-existing:**
  - ⚠️ **The markdown list renderer took one LINE per item**, so any bullet
    long enough to wrap split the list in two and left the remainder as a stray
    `<p>` outside it. Six pages were shipping broken lists — `card`, `field`,
    `timeline`, `curriculum`, `templates`, `code` — and it looked fine in the
    markdown, which is why nobody saw it. Continuation lines now join the item.
  - The docs bar's min-content was ~540px, so **every docs page scrolled
    sideways on a 390px phone**. The bar's search (also in the sidebar) and the
    theme button's label now go below 40rem.
- `npm run audit` flagged two real omissions in the new files (data voice
  without tabular figures) — fixed rather than allowlisted.
- Bundle 44.0 → **47.1 KB** gzipped (broadcast 51.2). Zero phantom classes,
  zero entirely-unused families, no horizontal overflow at 390 or 1440 on any
  page checked.
- ⚠️ `old-design/` **left this repo** during this session (workspace
  reorganisation moved it to `creator.imswarnil.com/_legacy/`). The only thing
  taken from it first was the video clip now vendored in `docs/assets/media/`.
  Its complete tree is the tag `v0-frame-and-signal`; `_legacy/` is only the
  part CreatorKit's migration did not consume.

### 2026-09-07 (third) — the collection layer: shelf, filters, masthead, kit, and nine more templates
- **Five new modules.** `.shelf` (the catalogue row — bleeds past the page
  column, snaps, keeps a peek, `-ranked` counter numerals drawn outlined
  behind the item); `.facets` / `.filterbar` / `.viewtoggle` (every control a
  real form control, `:checked` is the state); `.masthead` (one project held
  at the top of its page, condensing on `animation-timeline: scroll()`, the
  mark never leaving); `.kit` (the gear list); `.results` (a collection body
  in grid or list from one attribute — and switchable with `:has()` and no
  JavaScript at all).
- **Variants**: card gains `__pattern` (a texture SLOT, as a child, so a
  pattern and a frame can share a card), `card-story`, `card-repo` +
  `__lang` / `__langs`. Footer gains `__social`, `__form`, `__meta`,
  `__legal`, `__mark` and five variants. Hero gains `-wide`,
  `-media-start`, `-xl`, `__facts`. CTA gains `-sm`, `-row`, `__form`.
  Timeline gains `__media`, `__strip`, `-media`, `-icons`. Curriculum gains
  `__shot` and the classroom's `__tabs` / `__foot` / `__meta` /
  `-side-start` / `-wide`. Layout gains `.center-2xl`.
- **Templates: 3 → 12.** about; video channel + 16:9 episode + 9:16 short;
  blog home rebuilt with a facet column, search, sort and the view switch;
  course catalogue + course + lesson player; project portfolio filtered by
  skill + a case study on the masthead. All twelve share one navigation
  (centred), one footer and `center-2xl`.
- **Five bugs found by looking at the pages rather than at the files:**
  - `.card-tile`'s title painted *under* its own picture — both children in
    grid cell 1/1, media positioned, body not, so the media won. The body is
    raised explicitly now. This had been shipping.
  - `bg-noise` **erased** `bg-ink` and `bg-spot`: its `background-image`
    replaces the ground's gradient instead of adding to it, so the band came
    out the colour of the page. Pair rules added; the file now names which
    grounds need one and says the only way to find out is to look.
  - `bg-ink` / `bg-spot` now set `color-scheme: dark`, so `--fg-muted` inside
    a dark slab resolves to its dark branch instead of landing at 2:1.
  - `.player__title` sat on `.player__tc` / `__rec`; a player wearing the
    viewfinder dress now starts its title below that row.
  - **The docs bar overflowed a 390px phone on every page** — brand + search +
    theme + star ≈ 540px of min-content. The bar's search (also in the
    sidebar) and the theme label go below 40rem. Every docs page and all
    twelve templates now measure 390 = 390 at 390, 768 and 1440.
- Docs: five new pages (Shelf, Filter & facets, Masthead, Kit, Results) and
  updates to Card, Footer, Hero, CTA, Timeline, Curriculum, Page structure and
  Templates. `npm run lint`, `npm run build` and `npm run audit` all green;
  no phantom classes.
- Bundle 37.0 → **44.0 KB** gzipped (broadcast 41.2 → 48.2).

### 2026-09-07 (later) — variants pass: stepper, avatars, stats, buttons, cards, curriculum, chapters, media
- **Timeline** gains `-avatar` (faces as nodes), `-cards` (bodies as surfaces)
  and the **`.stepper`** — the sequence as a control: counter-numbered nodes,
  ink/accent connectors, `-vertical`, `-sm`, `-lg`, buttons as steps,
  labels hidden under 34rem.
- **Stats**: `__value` / `__unit` / `__delta[data-trend]` / `__icon` /
  `__note`; dresses `-cards`, `-center`, `-divided`, `-inverse`, `-lg`, `-sm`.
  The count-up is `fx-count` inside `__value`.
- **Avatar**: `-2xl`, `-ring-craft`, `-live` (beacon), `-status[data-status]`
  (one `::after`, so not with -live), `.avatar-group` (+`-tight`, `__more`).
  **Timecode**: `-sm`, `-link` (a seeking control, `aria-current` when playing).
- **Marquee**: `-logos`, `-band` (+`__sep`), `-inverse`, `-flush`, `-lg`.
- **Button**: `-xs`, `-xl`, `-inverse`, `-glow`, `-arrow`, `-play` (+`__disc`),
  `-social`, `-fab`, `-underline`, `__count`, `__kbd`.
- **Card**: `-ghost` (+`-accent`), `-glass` (+`-dark`), `-glow`, `-gradient`,
  `-hover-glow`, `-hover-zoom`; parts `__icon`, `__facts`, `__level`,
  `__progress` (`--value`). The course card is a recipe of these.
- **Curriculum**: `lesson__kind` / `__no` / `__desc` / `lesson-tall`;
  `-outline`, `-cards`; the **`.track`** (course as a path) and the
  **`.classroom`** layout (player + syllabus, stacks under 60rem).
- **Chapters**: `-numbered`, `-progress` (`--progress`), `-boxed`, `-h`
  (scrolling pills), `-timed` (+`__time`, `__count`) — the video chapter list.
- **Media**: `player__frame` / `__rec` / `__tc` (the viewfinder dress),
  `__marker` (`--at`), `__caption`, `__corner`, `-theatre`, `-mini`; the
  **`.filmstrip`** (+`__frame`, `__tc`, `-sm`) — sprocket holes are two
  repeating gradients on the strip's own background.
- `bg-noise` now composes with `bg-aurora` and `bg-mesh`, not only `bg-glow`.
- Personal template hero rebuilt on these: avatar-live byline, glow play
  button, social row, subscriber avatar group, the player in its frame with
  chapter markers, and a marquee band under the band. Course section gets the
  track; the post's chapters are numbered with a progress rail.
- Unused families down to 8 (`pop`, `codeblock`, `cert`, `loading`,
  `collapse`, `steps`, `buffer`, `dl`, `codeline`, `term` minus the ones now
  demoed). `cert-*` and `collapse-*` still ship nowhere — next easy wins.

### 2026-09-07 — backgrounds, effects, veils, the broadcast layer, templates
- **Four new modules in the web bundle**: `12-background.css` (`bg-*` grounds:
  solids, glow + drift, aurora, mesh, spot, vignette, fades, ink, SVG grain —
  all paint on the element, never a pseudo, so they compose with `.pattern`
  and `.frame`), `25-effect.css` (three registers, kept apart: `tr-*`
  transitions, `ix-*` hover answers guarded by `(hover: hover)`, `fx-*`
  entrances / scroll-driven reveals on `animation-timeline` / ambient loops /
  a `@property` count-up), `26-veil.css` (`.veil` is a *child* layer — scrims,
  vignette, letterbox, grain, the duotone grade — plus `.glass`).
  `0-config/properties.css` registers the animated custom properties.
- **The broadcast layer** `src/7-broadcast/` (approach §12), layer `sections`,
  separate entry `src/broadcast.css` → `dist/swarnil-broadcast{,.min}.css`,
  export `@imswarnil/swarnil-design/broadcast`. Canvas stages with safe-area
  guides, scenes (title, starting, BRB, ending, chapter, quote, outro, live,
  stinger), lower thirds (plate, bar, box, glass, ticker; `[data-state]`),
  stream widgets (cam, bug, alertbox, chatbox, goal, nowplaying, countdown,
  ticker), thumbs in seven compositions + `.blogcard`. **Everything is `cqi`**;
  a title at 8cqi is 102px at 1280 and 26px in the docs column. The docs shell
  loads `/src/7-broadcast/index.css` after `/src/index.css`.
  - ⚠️ `.canvas` sets its own `background` in the sections layer, so a `bg-*`
    ground (elements layer) would lose. `.canvas[class*='bg-']
    { background: revert-layer }` hands it back. Same trick if this happens
    elsewhere.
- **Templates** (`templates/`): personal homepage, blog home with two levels
  (front + feed), post. Copied to `site/templates/` by `build.py`, framed on
  `templates.html`, and `audit-classes` now also reads `templates/**/*.css`
  (the `tpl-*` glue). They use only system classes + `templates.css`; no
  docs-chrome class (`.search`, `.w-sm`) may appear in them.
- **System fixes found by building the templates**: `.tabs` scroll sideways
  on a phone (they pushed the blog page to 744px wide); `.card-tile` reads
  `--card-ratio` and its excerpt is legible on the scrim; **prose vs
  components** — `.prose pre/code/figure/figcaption/blockquote` now dress only
  the *bare* tag (`:not([class])`, `code:not(pre *)`), so a `.codeplayer` or
  `.pullquote` inside an article keeps its own dress, and the rhythm rule is
  restated in the patterns layer so a component's `margin: 0` cannot collapse
  the column. `audit-mono` allowlist entries follow the renamed selectors.
- Repo URLs corrected everywhere to `imswarnil/Swarnil-Design-System` (the
  real remote; `swarnil-design` was a stale name). Package name unchanged.
- Nine new docs pages (Backgrounds, Effects & interactions, Overlays; Canvas,
  Thumbnail, Scenes, Lower third, Stream widgets; Templates), a Broadcast TAKE
  on the home page, README / CHANGELOG / AGENTS / install updated.

> ⚠️ **Headless-Chrome verification trap.** `--window-size=390,…` silently
> lays the page out at **500px** (Chrome's minimum window width) and crops the
> screenshot to 390, so everything looks cut off on the right and reads as a
> layout overflow. It is not. To test a phone width, load the page in a 390px
> `<iframe>` inside a wrapper page served from `site/`, and read
> `contentDocument.documentElement.scrollWidth` — 390 means no overflow. The
> Chrome extension was not connected this session; `"/Applications/Google
> Chrome.app/Contents/MacOS/Google Chrome" --headless=new --screenshot` works.

### 2026-09-05 (third pass — simplification)
- **TOC is plain again.** The video-timeline scrubber (track, progress fill,
  playhead, read-time counter, ~120 lines of scroll listener) is gone from
  `docs.js`, `docs.css` and `build.py`. It is now a heading and a list of
  links with **no JavaScript at all**. Swarnil is building his own later.
- **Code player simplified**: no power lamp, no `[data-power]`, no CRT strike,
  no toggle JS, no filename. The bar is a language name and a copy button, and
  the screen is simply on. Scanlines, bloom and the three dresses
  (`.codeplayer` / `-flat` / `-light`) stay.
- **The bar is a `1fr auto 1fr` grid on every page, not just home.** `.bar__nav`
  and `.barlink` moved from `home.css` (home-only) into `docs.css`, so docs
  pages get the centred nav too, with **Docs** carrying `aria-current="page"`
  and the accent dot. Verified nav centre 720px = page centre 720px on both.
- **Icons links are local** — `/icons.html`, not `icons.imswarnil.com`, in both
  navs and both footers. The prose references inside `icons.md` / `navbar.md`
  still point at the real project site, which is correct.
- `.is-home` was removed from `<body>`: nothing styled it any more once the bar
  rules moved, and `audit-classes` correctly flagged it as a phantom.
- **Fixed `.codeblock-dark`'s `color-scheme` bug** (the one flagged last pass).
- Checked `39-media.css`, which also declares `color-scheme: dark`: that one is
  **correct and deliberate**. `--bg-media` is `light-dark(ink-100, ink-900)`, a
  page-following token, so forcing the dark branch is how the letterbox stays
  dark on a light page. Verified `.player` and `.poster` render `oklch(0.23…)`
  in light theme. Do not "fix" it.

### 2026-09-05 (later)
- **Hero rebuilt**: the footage is now a full-bleed background behind the whole
  band (`.hero__bg`, 100vw pinned to the viewport centre, escaping the 74rem
  band) with a scrim graded heavier on the left where the copy sits. The right
  column is `.hero__art` — a new inline SVG, **the rig**. Inline and
  token-driven on purpose: the old system's `media/hero.svg` hard-coded two palettes
  and guessed with `prefers-color-scheme`, so it was simply wrong for anyone who
  had picked a theme by hand. Verified 1512px bg over an 1184px band, no
  horizontal overflow.
- **Introduction rewritten in first person** — the "I kept rebuilding the same
  buttons" opening, plus six cards (Mission, Ideology, Who it's for, Constraint,
  Character, Discipline) and a second inline SVG, the cascade-layer staircase.
- **New component: `src/3-components/40-codeplayer.css`** — code as a screen.
  `40-` because 30–39 are all taken and `4-patterns` starts at 50, so it sorts
  correctly with no collision. Three dresses off four local variables
  (`.codeplayer`, `-flat`, `-light`), `[data-power='on'|'off']` with a CRT
  strike, scanlines, phosphor bloom, bevelled copy button, `-ln` line numbers
  from a CSS counter, `-sm`, `-scroll`. Reuses the existing `.tok-*` classes
  rather than inventing a second highlighting vocabulary. Docs at
  `docs/content/codeplayer.md`; `.codeplayer__pre` added to the `audit-mono`
  allowlist; copy + power wired in `docs.js`.
- **Two real bugs found and fixed by measuring, not reading:**
  - `color-scheme: dark` on `.codeplayer` **inverted `light-dark()`**, so
    `--bg-inverse` resolved to its light branch and the "dark slab" rendered
    light on a light page. Removed. `.codeblock-dark` still has it.
  - `var(--ease-in-out)` — the token is **`--ease-inout`**. The typo invalidated
    the whole `animation` shorthand, so the rig's scan line never ran.

> ⚠️ **Browser-verification trap, cost an hour.** The automation tab runs with
> `document.visibilityState === "hidden"`, so Chrome never ticks CSS
> transitions or animations: `getComputedStyle` returns the *pre-transition*
> value and `getAnimations()` shows `playState: "running"` stuck at
> `currentTime: 0`. This looks exactly like a broken selector. To read a
> transitioned property, set `el.style.transition = 'none'` first, or compare
> against a freshly-cloned node. Same root cause as the CDP screenshot timeouts.

### 2026-09-05
- **Typography went single-face.** `--font-display` is now an alias of
  `--font-body`; Inter sets headlines and sentences alike, hierarchy comes from
  weight + size + tracking. Space Grotesk is gone from `src/`, the docs, the
  self-hosted fonts and the preloads. Verified in-browser: h1 paints Inter 600
  at 52px / −1.82px tracking, three font faces load instead of five. The two
  `docs/assets/fonts/spacegrotesk-*.woff2` files are now unreferenced and still
  on disk (untracked in git — deleting them is not recoverable).
- **Home navbar**: hairline restored (`.is-home .bar` no longer zeroes it), bar
  is a `1fr auto 1fr` grid so `.bar__nav` centres against the page, active state
  is a dot on `.barlink[aria-current='page']`, Star button shrunk to `.ghbtn-sm`.
- **Search is in two places**: the bar keeps its copy, and `.search-side` sits at
  the top of the docs sidebar. `docs.js` now wires *every* `[data-search]` widget
  against one lazily-fetched index instead of a single hard-coded input.
- **Hero background video**: `<span class="hero__video" data-hero-video="ID">`
  inside the viewfinder. `docs.js` builds the `youtube-nocookie.com` iframe at
  runtime, so it stays off the critical path and **never loads at all under
  `prefers-reduced-motion`**. The id lives in exactly one place, that attribute.
  - ⚠️ The current id `7OoSX3KbXOw` is **"How I've Grown as a Creator / Human"
    by kold (@koldstudios) — not Swarnil's own footage.** Flagged to him; swap
    the attribute when his own clip is ready.
  - Chrome's CDP screenshot capture times out on this page while the iframe
    plays. The page is fine — verify it with JS queries, not screenshots.
