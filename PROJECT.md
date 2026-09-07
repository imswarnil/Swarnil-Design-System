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

Branch `rebuild` — the system was rebuilt from scratch against `approach.md`.
The previous system ("Frame & Signal" / Creator Design System) is archived in
`old-design/`, is not imported, and its history is not carried forward.

| Layer | State |
| --- | --- |
| `0-config`, `1-foundation` | settled — layers, typed properties, colour, type, space, motion, frame, **background** |
| `2-elements` | badge, table, code, indicator, text, **effect** (tr-/ix-/fx-), **veil** (+ glass) |
| `3-components` | button, card, field, nav, alert, navbar, menu, overlay, disclosure, media, codeplayer |
| `4-patterns` | deck, prose, timeline, curriculum, thread, log, share, chat |
| `5-sections` | hero, stats, pricing, cta, footer |
| `7-broadcast` | **canvas, scene, lowerthird, stream, thumb** — own bundle `dist/swarnil-broadcast.css`, layer `sections`, all sizes in `cqi` |
| `templates/` | **personal homepage, blog home (two levels), post** — copied into `site/templates/`, audited like the docs |
| Docs | 58 pages + home, built from `docs/content/*.md` by `docs/build.py`; groups Broadcast and Templates added |

Gates that must stay green: `npm run lint`, `npm run audit` (mono-voice + class
audits, both strict), `npm run build`.

## Next up

Components and sections, one at a time, on request. Nothing is queued — ask.

Open threads worth remembering:
- **10 class families are defined but demoed nowhere** — 337 unused classes
  (was 17 / 361; the templates now exercise callout, note, pullquote, eyebrow,
  figure, mark and fn). Still at zero: `pop-*` (15), `codeblock-*` (12),
  `cert-*` (9), `loading-*`, `collapse-*` (5 each), `steps-*`, `buffer-*` (4),
  `dl-*` (3), `codeline-*`, `term-*` (2). `npm run audit` lists them.
- The home page's "KB gzipped" stat is now **measured by the build** (`{size}`
  in `home.md`, `bundle_size()` in `build.py`) — it read 14.7 while the bundle
  was 37. The web bundle is 37.0 KB gzipped, broadcast 41.2 KB.
- **Two code-block components now coexist**: `.codeblock` (elements, quiet,
  demoed nowhere) and `.codeplayer` (components, the screen). Decide whether
  both earn their place before writing more of either.
- The hero video id is still kold's clip, not Swarnil's own (see the log).
- `docs/assets/fonts/spacegrotesk-*.woff2` are unreferenced and untracked
  (44K; untracked means deleting is not git-recoverable).
- Outside this repo: `imswarnil.com/content/themes/Imswarnil.com/package.json`
  still points its `file:` dep at `../../../../Projects/Creator-Design-System`,
  which no longer exists. The `node_modules` symlink happens to resolve, so it
  works today and breaks on the next `npm install`.

---

## Session log

Newest first. One line each: what changed, and anything that would surprise the
next session.

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
  token-driven on purpose: `old-design/media/hero.svg` hard-coded two palettes
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
