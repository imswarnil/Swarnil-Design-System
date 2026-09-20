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

Swarnil Design System — a token-first design system built on **Tailwind CSS 4**
and **daisyUI**. Tailwind is the floor, daisyUI is the component set, and this
repo is the design that sits on top of both. Almost monochrome, so one colour
can mean something. Set in **Geist**, **Geist Mono** and **Geist Pixel** since
2026-09-19. Published to `design.imswarnil.com` and to npm as
`@imswarnil/swarnil-design`.

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

`main` serves `design.imswarnil.com`, and the Tailwind + daisyUI work is on it —
the old `bulma-experiment` branch was merged in `546b064`. Work happens on `main`.

### The stack

| | |
| --- | --- |
| Floor | `tailwindcss@4.3.3` — peer dependency, the consumer's own |
| Components | `daisyui@5.7.32` — a real dependency, 30 of its 61 components excluded |
| Entry (library) | `src/index.css` — no Tailwind import, for a consumer who has it |
| Entry (prebuilt) | `src/bundle.css` → `dist/swarnil-design.css`, link-and-go |
| Broadcast | `src/broadcast.css` → `dist/swarnil-broadcast.css` |
| Docs | `docs/assets/site.css` → `site/assets/site.min.css` |

Sizes, gzipped: web bundle **82.4 KB**, broadcast **86.7 KB**, docs site
**73.8 KB**. A consumer compiling from source against their own markup gets
roughly **58 KB** — smaller, because their utilities come from their own class
names rather than a safelist.

### Layers

| Layer | State |
| --- | --- |
| `0-config` | settled — the `@layer` contract, the `@theme` token bridge, the safelist, typed properties |
| `0-daisy` | settled — daisyUI's radii, border and depth from our tokens |
| `1-foundation` … `5-sections` | unchanged by the conversion; every file re-layered into `utilities.sds.*` |
| `6-utilities` | rewritten — 151 lines of `u-*` became six `@utility` definitions Tailwind lacks |
| `8-framework` | rewritten — 1,833 lines of hand-rolled grid became `page` and `row`; Tailwind owns the rest |
| `7-broadcast` | unchanged — canvas, scene, lowerthird, stream, thumb, all in `cqi` |
| Docs | 72 pages + home. `framework`, `grid`, `utilities` and `templates` deleted with the things they documented |

Gates that must stay green: `npm run lint`, `npm run audit` (mono-voice + class
audits, both strict), `npm run build`.

## Next up

Nothing is queued — ask. Open threads worth remembering:

- **The numeric spacing ladder is still the old one.** The 2026-09-19 rebuild
  retuned type, radius and layout but left `--space-*` at `0.25rem × n`, so the
  four new `--gap-*` names and the ladder are two rhythms living side by side.
  That is honest and documented, but it is a decision that should be revisited
  deliberately, not drifted into.
- **`--font-pixel` has no audit.** `audit-mono.py` fails the build when mono
  escapes code; nothing yet fails it when the Pixel face escapes a mark. The
  rule is written down in `02-typography.css` and enforced by nobody.
- **THE RE-CUT IS IN PROGRESS.** Every component is being brought to the eight
  rules in `docs/content/house-style.md`, one at a time, and the progress table
  at the bottom of that page is the record. Done: navbar + dropdown,
  navigation, shell, card, button, input, field/form. **Next: panel/alert,
  badge/chip, table.** Surfaces first — they are what make the difference visible — then
  controls, then the sections.
- **No audit stops the docs chrome taking a system class name.** `.rail` cost a
  session's debugging. `audit-classes.py` already knows every class the system
  defines; failing when `docs/assets/*.css` redefines one would be a few lines.

- **`@utility` classes must be safelisted for the prebuilt bundles.** They are
  compiled like any Tailwind utility, so nothing *uses* them in a library build
  and they ship as nothing unless named in `src/0-config/safelist.css`.
- **The exclude list is a standing obligation.** Build a component whose name
  daisyUI also uses and add it to `@plugin "daisyui" { exclude: … }` the same
  day, or its descendant rules (`.hero > *`, `.card figure`, `.footer > :not(…)`)
  leak into ours.
- The home page's "KB gzipped" stat is measured by the build (`{size}` in
  `home.md`, `bundle_size()` in `build.py`).
- `docs/assets/media/` holds real photographs and an eight-second clip (1.6 MB),
  docs-only; licences in `CREDITS.md` beside them.
- The hero video id is still kold's clip, not Swarnil's own.

---

## Session log

Newest first. What changed, and anything that would surprise the next session.
Trimmed on 2026-09-14 to the last three sessions — everything before that is in
git history, which is where a log of finished work belongs.

### 2026-09-20 (later) — The docs catch up to the rebuild, and CI goes green

The token rebuild, the button/input rebuild and the field rebuild all landed in
one push, and **CI failed on it** — `npm run check` had been reported green from
a grep that hid the class audit. Run `35487215709` is the red one; this session
is the repair, and nothing new was designed.

**Four breakages, all from the rebuilds:**

1. **The token layer took Tailwind's own namespaces with it.** Clearing
   `--spacing-*` removed `m-0` and `inset-0` from the build; clearing
   `--radius-*` removed `rounded-md` and `rounded-lg`; and the surface names
   the docs use as utilities (`bg-sunken`, `text-fg`) never had `--color-*`
   entries to generate from. `--spacing: 0.25rem` is back as the scale's root,
   the t-shirt radii sit beside Aspect's numbered ones, and the surface
   utilities are **aliases of the tokens**, not a second set of values.
2. **The field rebuild dropped eight class families the docs still used.** The
   docs now document what ships: a radio is `.check` with `type="radio"`,
   `.choice__desc` is `.choice__hint`, `.choice-top` is gone because `.choice`
   already aligns to the top, and sizes go on the control (`.input-sm`) rather
   than on a `.field-sm` wrapper. **Deleted with the things they documented:**
   the choice card, `.input-icon-end`, `.form-row-3`, `.form__divider`,
   `.form__actions-end`, and the `.field__pop` burst section.
3. **Both properties tables were fiction.** Of fifteen variables `field.md`
   listed, four exist. The form carries none of its own any more, so that table
   now names where each measurement actually comes from.
4. **The camera motif left markup behind.** `.vf` in `hero.md` and
   `landing.html` (now a plain filled well), `.win`/`.win-term` in
   `principles.md`, and `.tpl-body` on the template shell's `<body>`, which
   styled nothing anywhere.

**Principle 0 was still the camera.** It described a visual language deleted in
`e14863a` — viewfinders, record lights, tape. It is now *a fill, not a frame*,
and points at the house style for the look. Principle 7 (Frames) went with the
components it demonstrated; 8–12 renumbered to 7–11.

`npm run check` exits **0** as a whole chain, not per-gate with a filter.

### 2026-09-20 — Navbar dropdowns, real template pages, and the house style the re-cut is measured against

**The navbar has dropdowns, and the panel IS the sidebar.** Not styled to
match it — `.navbar__panel` holds a real `.navlist`, the same component the
side navigation is built from, so the rows, icons, counts, hover and active
dot have one definition and two positions. Built on `<details>` like the
sidebar groups, so click and keyboard come from the platform; `src/js/nav.js`
adds only outside-click and Escape, and the component works without it.

**Templates are real pages now.** `site/t/{landing,article,collection,app}.html`,
each linking the same `site.min.css` the docs run on and containing **no CSS of
its own**. `/templates.html` is a generated gallery; `docs/pages/` holds the
bodies and `docs/pages/_shell.html` wraps them. Thumbnails are drawn wireframes
in system tokens — the previous version embedded twelve iframes at 380px and
produced twelve pictures in which nothing was legible.

**`.shell` is a real component** (`src/4-patterns/59-shell.css`). Last session
added `--bar-h`, `--side-w` and `--rail-w` with nothing reading them, which was
a gap. Bar, nav column, content, rail; the nav's top offset and its max-height
are both derived from `--bar-h`. The rail drops at 64rem and the nav survives
to 48rem, in that order, because a contents list is an aid and the navigation
is the way out of the page.

**Two bugs worth the write-up:**

- ⚠️ **`.rail` was a NAME COLLISION.** The docs chrome used `.rail`, which is
  also a system component — the sticky share rail in `55-share.css` — and above
  64rem that sets `position: sticky`. The chrome never set `position`, so it
  inherited it: two nested sticky boxes, the outer pinned, the inner with
  nothing left to travel through. The contents list sat 216px down the viewport
  and never moved, which looks exactly like sticky being broken rather than
  like a name collision. Renamed to `.docrail`. **The chrome may not use a name
  the system owns** — worth an audit rule.
- **The contents scroll-spy never existed.** Now in `docs.js`, and deliberately
  built on none of the three obvious things: no `IntersectionObserver` (answers
  "did a heading cross a line", which gets the top and bottom of a page wrong),
  no `requestAnimationFrame` (suspended in a background tab, so it stops
  silently and works the instant you look at it), and no cached offsets (a demo
  reflow or a font swap moves every heading and fires no `resize`).

**Page actions moved to the rail.** Edit this page and Contribute now sit under
the contents list rather than in the sidebar footer: they are actions on THIS
page, and the rail is where this page's own controls live. The sidebar is now
purely the way to other pages.

**The house style is written down** — `docs/content/house-style.md`, eight
rules. The system had tokens and components before it had a LOOK, and tokens do
not say whether a card has a border or a fill. Two systems with identical
tokens can look nothing alike, and that gap is why the Aspect-inspired theme in
`~/Swarnil/theme/` read as resolved while this site did not.

**The card is re-cut against it** — the first component of a full pass:

- `--bg-surface` + a hairline → `--bg-sunken`, **no border**. A card filled
  with `--bg-surface` on `--bg-canvas` is the same colour as the page in light
  mode, which is why it needed a line to exist at all. A tone edge reads as a
  surface; a line reads as a box drawn on top of one.
- `--card-border: 0` rather than `border: none`, so a variant turns the border
  back on with one number. Six rules depend on that.
- **Hover changes colour and nothing else.** `.card-hover` is the house answer.
  `.card-hover-lift` is kept because it is public, marked off-style, and used
  by nothing in this repo.

### 2026-09-19 — Geist, an Aspect-shaped foundation, and a way into the docs that is not the sidebar

**The face changed.** Inter and IBM Plex Mono are gone; the system is set in
**Geist**, **Geist Mono** and **Geist Pixel**, all three from Vercel's official
package under the SIL OFL, self-hosted in `docs/assets/fonts/` with `OFL.txt`
beside them. Three variable/static files, 300 KB total.

The argument for the swap is one line of CSS: `.t-mono` now carries **no size
correction at all**. Plex needed `0.9375em` to sit level with Inter because
they came from two different hands; Geist Mono is drawn against Geist and
shares its x-height, so inline code inside a sentence stops announcing a seam.
On a site where a third of every page is code set in prose, that is the whole
case. `--font-pixel` is new and is a MARK, not a voice — the lockup, a take, an
error number, the index letters — forbidden in running text and below 24px.
Three of the five Pixel cuts ship (Square, Circle, Line), each a separate
FAMILY so nothing can ask for "Pixel bold" and get a synthesised smear.

**The type scale is flat now, and that is deliberate.** `--text-2xl/3xl/4xl`
were fluid clamps topping out at 52px; they are fixed at 22 / 25 / 28. A docs
site and an editorial theme are both UI before they are posters, and a scale
whose h1 reaches 52px spends its top three steps on moments that happen once a
page if ever. Only `5xl` and `6xl` stay fluid, and they are display-only. A
heading now reads as a heading by WEIGHT and TRACKING, which is what the
typography page always claimed and the scale did not support.

**New token families**, all canonical in `src/0-config/theme.css`:

- `--heading-1` … `--heading-6` — six names for six jobs, so a component asks
  for a heading LEVEL and never for a number of pixels. Not a Tailwind
  namespace on purpose: there should be no `text-heading-3` utility inviting
  an h2 to wear an h3's size.
- `--bar-h`, `--side-w`, `--rail-w`, `--side-pad` — the system ships an
  application SHELL now, not just a page. The sidebar is sticky below the bar,
  so its offset and its max-height are both derived from `--bar-h`; hard-code
  either and a taller bar pushes the last nav item under the fold.
- `--width-read` / `--width-wide` / `--width-media` (700 / 1100 / 1300px) — an
  article uses all three, and 1300 is the ceiling because past it a 16:9 image
  stops being a picture and becomes a wall.
- `--gap-hair` / `--gap-tight` / `--gap-snug` / `--gap-block` in `03-space.css`
  — the four gaps a 4px ladder cannot express. **Named, not numbered**: a
  `--space-1.5` would invite a `--space-2.5` next week and the ladder would
  stop being a ladder. The list is closed.
- `--radius-card` is 14px (was 10px) and `--radius-control` is 10px. A control
  inside a card with the same radius as the card looks stuck to it.

⚠️ **The numeric `--space-*` ladder was NOT renumbered.** It is still
`0.25rem × n`, and every one of the ~70 component files still reads it. That
was the one change with no way to verify it short of eyeballing 74 pages.

**The docs site got a second way in.** The sidebar only helps a reader who
already knows the name of the thing:

- **`/components.html`** — every component as a card, with a name filter,
  group chips and an A–Z ⇄ by-group order switch. The grid is generated in
  `build.py` from the SAME front matter the sidebar reads, so it cannot go
  stale: add a page with `group: Components` and its card appears on the next
  build with no edit anywhere. The token is `{{index:Group,Group}}`, expanded
  in `build_page` because only that function can see `pages`.
- **`/templates.html`** — whole pages, named by the sections they are made of.
  No new CSS in any of them; if a template needs something the system lacks,
  that is a missing component.
- **`/contribute.html`** — the four gates, what the system will take, and what
  it will not. The sidebar footer's Contribute link now points here instead of
  at CONTRIBUTING.md on GitHub.

**The top bar is generated, not hard-coded.** Principles, Install and Icons are
out of it; Docs, Components, Templates and Contribute are in. `bar_nav_html()`
computes the active item — Docs is the fallback, so the bar always has exactly
one item lit. A bar with none reads as broken and a bar with two reads as a
bug. Both shells (`page.html`, `home.html`) now take `{barnav}`, so the two
cannot drift.

**The dot is the only active mark.** It already was in the sidebar; the top bar
already had it too. Verified rather than added — the two rules now agree, and
nothing on the site says "you are here" in a second language.

All four gates green: lint clean, build clean, mono audit clean (14 data uses,
all allowlisted), web bundle **82.0 KB** gzipped.

### 2026-09-15 — `npm run stop`

`scripts/serve.mjs` could reclaim its own port on the way up; there was no way
down except Ctrl-C in the terminal that owned it. `scripts/stop.mjs` is that
way: it SIGTERMs the pid in `.dev-server.pid`, escalates to SIGKILL after a
second, clears the lock, and then *proves* the port is free by binding it.

It keeps serve.mjs's rule — kill our own, never a stranger's. A port held by a
process we did not start is named (`lsof` + `ps`) and left alone with exit 1;
`--force` is you overriding that. Exit 0 whenever the port ends up free, so
stopping something already stopped is not an error.

- ⚠️ **Probe the port the way the server binds it.** The first version bound
  `127.0.0.1` and reported `:8124` free while a wildcard-IPv6 listener still
  held it — the exact lie the script exists to prevent. `listen(port)` with no
  host, same as serve.mjs.

### 2026-09-14 — Bulma out, Tailwind and daisyUI in, and the repo cut back to what matters

**The stack changed.** Bulma was reverted in full (`src/` restored from
`92871e3`) and rebuilt on Tailwind 4 + daisyUI 5. The conversion is described in
`approach.md`; what is worth carrying forward is the four things that cost real
time:

- ⚠️ **Tailwind does not follow `@import url('...')`.** Every index in `src/`
  used that form, so the compiler inlined none of it and emitted a bundle with
  the imports left in as text. Bare strings only: `@import "./x.css"`.
- ⚠️ **`var()` is not legal in a media query.** `--breakpoint-md: var(--bp-md)`
  compiled happily into `@media (width >= var(--bp-md))`, which every browser
  drops — so every `md:`, `lg:` and `xl:` rule in the bundle silently did
  nothing. The breakpoints are literals in `@theme` now and `--bp-*` reads back
  from them.
- ⚠️ **The cascade does not settle a collision on a DESCENDANT.** Layer order
  gave us `.hero`; daisyUI's `.hero > *` still stacked every child into one grid
  cell and put the landing page's illustration on top of its headline. Twenty
  more were waiting (`.stack > *`, `.footer > :not(…)`, `.card figure`,
  `.timeline > li`). Fixed at the source: the 30 components this repo builds are
  `exclude`d from daisyUI's output. Bundles dropped ~10 KB gzipped as a result.
- ⚠️ **`.bg-canvas` and friends are Tailwind's now**, generated from
  `--color-canvas`, and a hand-written `.bg-*` cannot win because Tailwind's
  sits directly in `utilities`. The versions that paired a ground with its ink
  are `surface-*` instead.

**The repo was cut back.** Deleted: `templates/` (12 pages written against the
old grid API), `docs/content/{framework,grid,utilities,templates}.md`,
`re-work.md`, `postcss.config.js`, `scripts/watch.mjs`, the Bulma leftovers, two
unreferenced Space Grotesk fonts, and `.frame-4` — a variant documented in two
file headers and five docs pages that had no rule, no markup and no
implementation. `approach.md` went 49 KB → 9.8 KB; this file went 54 KB → 8 KB.

**PostCSS is gone.** Tailwind's CLI does the compiling and the minifying, so
`postcss`, `postcss-cli`, `postcss-import` and `cssnano` came out of the tree.
`package.json` went from 18 scripts to 10.

**Both audits were wrong and are fixed.** `audit-classes.py` read only `src/`,
so it called every Tailwind-generated class a phantom (52 of them); it reads the
built stylesheet now. Its class regex also stopped at the backslash in
`.md\:col-span-6`. Stylelint had to be taught `@theme`, `@plugin`, `@utility`
and `@source`, and told that `import-notation` is the opposite of what Tailwind
needs.

### 2026-09-09 (sixth) — Bulma was linked, themed, shipped, and could not lay out a paragraph
- ⚠️ **`bulma` sat BELOW `reset` in the layer order, and that broke everything
  Bulma does.** Layer order beats specificity absolutely, so the reset's
  `* { margin: 0 }` won over `.content p { margin-bottom: 1em }` no matter how
  much more specific the second one was. `.content` had no rhythm, `.columns`
  had no gutters, `.buttons` had no gaps, lists had no indent. The whole
  conversion was in place and none of it could paint. Order is now
  `reset, bulma, tokens, …` — everything of ours still sits above `bulma`, so a
  collision on a name we kept still resolves to ours.
- ⚠️ **Second consequence of the same swap: `box-sizing`.** Bulma's minireset
  does `html { border-box }` + `* { inherit }`, which is equivalent to ours for
  every element `*` can reach — and different for every one it cannot.
  `::details-content` is a UA box no author rule matches, so it kept
  `content-box` and every `.menu-list a` under it came out 21px wider than its
  own list. Restated as `border-box` outright in `bridge.css`.
- **THREE NAMES BELONGED TO TWO SYSTEMS.**
  - `.box` was a docs demo placeholder (11rem, 16:9) in `@layer docs` — the
    highest layer — and Bulma's card. Every Bulma `.box` on the site came out
    as a 176px letterbox with its text spilling into the row below. The
    placeholder is `.plate` now.
  - `.container` and every `m-*`/`p-*`/`gap-*` helper belong to Bulma **and**
    to `src/8-framework`, which holds `components` and `utilities` — the two
    highest layers. Loaded site-wide it replaced Bulma's helper API on all 59
    pages with a different scale under the same names. **The framework layer is
    off `site.css` now** and loads on `/framework.html` alone, via
    `docs/assets/framework.css` and `npm run css:site-framework`.
  - `.tab` — the demo tablist is `<button>`s and Bulma dresses `.tabs a`, so
    "PreviewHTML" ran together with no box. Dressed from Bulma's own
    `--bulma-tabs-*` in `docs.css`; the site's only `--bulma-*` read.
- **The homepage is laid out by Bulma now, end to end.** `.section` +
  `.container.is-max-widescreen`, `.hero`/`.hero-body`, `.columns.is-vcentered`,
  `.fixed-grid`/`.grid`/`.cell`, `.title`/`.subtitle` (`.is-spaced` where a lead
  follows), `.buttons.are-medium`, and the `mt-*`/`mb-*`/`is-hidden-touch`
  helpers. `.band`, `.feats`, `.install`, `.hero__actions` and `.sec` are gone —
  three of them had already broken when their base rules were deleted from
  `src/`, leaving `grid-template-columns` in a media query propping up a grid
  that no longer existed. `home.css` is paint only.
- ⚠️ **A bare `.button.is-outlined` is WHITE in Bulma** — it is meant to be used
  with a colour or on a dark hero. The hero's secondary button was invisible.
  Plain `.button` is the secondary here. And on the closing band,
  `is-white is-outlined` had to have its colours declared outright: `is-outlined`
  composes `hsl(var(--bulma-button-h) …)` and does not read
  `--bulma-button-color`, so pointing that variable at a token changed nothing.
- **The fixed navbar was three rows tall on a phone and sat on top of the page.**
  Both shells hard-code `is-active` on `.navbar-menu` (without it Bulma hides
  the theme toggle and the Star button below 1024px), and an active navbar-menu
  on touch is Bulma's stacked drawer. `<html>` carries `has-navbar-fixed-top`
  now, `--bar-h` is 3.25rem (it claimed 3.5 — the old system navbar's height),
  and below 60rem the bar is told to stay one row.
- **The phone drawer's burger had never worked on this branch.** `docs.js` looked
  for `.navbar__burger`; the template emits Bulma's `.navbar-burger`. Same for
  the CSS that shows it, and for the rule that hides the bar's search at 640px,
  which still used `.navbar > .shell__find` from before the field moved into
  `.navbar-end`.
- ⚠️ **`swarnil-broadcast.css` and `swarnil-framework.css` were shipping without
  Bulma.** Each restated the system directory by directory, and that list does
  not name Bulma — so both bundles promised "everything the web bundle has" and
  had no `.button`, `.input`, `.content`, `.table`, `.navbar` or `.columns`.
  Both now `@import './index.css'` and add their one directory. 106 KB and
  109 KB gzipped, against 102 KB for the web bundle.
- ⚠️ **A stray `:::` hung the build forever.** Every handler in `render()`
  advances the cursor; the paragraph fallback refuses to start on a line that
  begins a block, and `:::` is on that list. A `::: note` matched nothing,
  collected nothing, and looped at 100% CPU with no output and no error.
  `build.py` now raises on any `:::` that is not `:::demo`.
- `/install.html` documented four bundles including one that no longer exists,
  and stated the old layer order. Rewritten: the three bundles, "Bulma is the
  system", the layer order and why it is load-bearing, and the split between
  what `bulma-theme.scss` decides at compile time and what `bridge.css` decides
  at runtime.
- `src/bulma-base.scss` deleted — nothing compiled it (`css:theme` builds
  `src/bulma-theme.scss`), and its header described the earlier
  "Bulma as a floor" experiment.

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

---

Everything before 2026-09-09 is in git history.
