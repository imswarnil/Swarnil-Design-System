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
can mean something. Published to `design.imswarnil.com` and to npm as
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

`main` serves `design.imswarnil.com`. The working branch is `bulma-experiment`,
which is now badly named: the Bulma experiment was reverted in full and the
branch carries the Tailwind + daisyUI conversion instead. **Rename or merge it.**

### The stack

| | |
| --- | --- |
| Floor | `tailwindcss@4.3.3` — peer dependency, the consumer's own |
| Components | `daisyui@5.7.32` — a real dependency, 30 of its 61 components excluded |
| Entry (library) | `src/index.css` — no Tailwind import, for a consumer who has it |
| Entry (prebuilt) | `src/bundle.css` → `dist/swarnil-design.css`, link-and-go |
| Broadcast | `src/broadcast.css` → `dist/swarnil-broadcast.css` |
| Docs | `docs/assets/site.css` → `site/assets/site.min.css` |

Sizes, gzipped: web bundle **82.9 KB**, broadcast **87.2 KB**, docs site
**68.1 KB**. A consumer compiling from source against their own markup gets
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

- **The branch name lies.** `bulma-experiment` holds the Tailwind work.
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
