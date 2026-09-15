# Working in this repository

Instructions for AI coding agents. Humans: this is the condensed version of
[CONTRIBUTING.md](CONTRIBUTING.md), `approach.md` (the spec) and the file
headers in `src/`.

**Start with [PROJECT.md](PROJECT.md)** — it is the short one, and it carries
the current state and the session log. This file is the rules, which rarely
change; `approach.md` is the full spec. Update `PROJECT.md`'s log before you
finish a session.

Swarnil Design System is a token-first design system built on **Tailwind CSS 4**
and **daisyUI**. Tailwind is the floor, daisyUI is the component set, and this
repo is the design that sits on top of both. Almost monochrome, so one colour
can mean something.

## Commands

```bash
npm install
npm run dev     # build, then serve site/ at :8080
npm run stop    # stop that server and free :8080 — safe to run when nothing is up
npm run build   # dist/ (the package) + site/ (the docs). What you want 90% of the time.
npm run check   # lint → build → audit → size. What CI runs.

npm run css     # dist/ only — the two prebuilt bundles, plain and minified
npm run docs    # site/ only — build.py, then Tailwind over docs/assets/site.css
npm run lint    # stylelint over src/**/*.css — must stay at zero errors
npm run audit   # mono-voice audit + class audit, both strict (needs a built site/)
npm run size    # gzipped size of every shipped stylesheet
npm run clean   # rm -rf dist site
```

Both `dist/` and `site/` are generated and gitignored. CI builds them on every
push; Pages deploys `site/`.

### There is one mode, and every page links one file

`assets/site.min.css`, compiled from `docs/assets/site.css` by `npm run docs`.

There used to be a dev mode that copied `src/` into `site/` and linked
`/src/index.css` so a saved file showed up without a build. That stopped being
possible the moment the system needed a compiler: `@plugin`, `@theme` and
`@utility` are Tailwind directives, not CSS, and a browser handed them renders
an unstyled page. Do not try to bring it back — run `npm run docs`, which takes
about a second.

## Layout

| Path | What it is |
| --- | --- |
| `approach.md` | the spec — what the system is. Authoritative. |
| `src/0-config` | the `@layer` declaration. Must be read first. |
| `src/0-config/theme.css` | **the token bridge** — every token as a Tailwind `@theme` entry, so `--bg-surface` is also `bg-surface` |
| `src/0-config/safelist.css` | which utilities the PREBUILT bundles ship. Not used by the source entry |
| `src/0-daisy/bridge.css` | daisyUI's own knobs (radii, border, depth), pointed at this system's tokens. One-way |
| `src/index.css` | **the library entry** — daisyUI, the config, then everything this repo writes. Does NOT import Tailwind |
| `src/bundle.css` | the prebuilt entry — Tailwind + `index.css` + the safelist → `dist/swarnil-design.css` |
| `src/1-foundation` … `src/6-utilities` | the system, hand-authored CSS |
| `src/7-broadcast` | the creator layer — canvases, scenes, lower thirds, stream widgets, thumbnails. Layer `sections`; sized in `cqi`; built into its own bundle by `src/broadcast.css` |
| `src/js/nav.js` | optional, additive; only sets attributes CSS already reads |
| `docs/content/*.md` | **the source of the docs** — one markdown file per page |
| `docs/templates/` | the page shells (`page.html`, `home.html`) |
| `docs/assets/site.css` | the docs' Tailwind entry → `site/assets/site.min.css`. A build entry; nothing links it |
| `docs/assets/` | docs chrome (`docs.css`, `docs.js`, `home.css`), fonts, favicon |
| `docs/icons/sprite.svg` | vendored from `../icons.imswarnil.com`; refreshed on build when that repo is beside this one |
| `docs/build.py` | the generator: markdown + `:::demo` blocks → `site/` |
| `scripts/audit-mono.py` | fails CI if monospace is used outside the code allowlist |
| `scripts/audit-classes.py` | fails CI on a class the markup uses that no CSS defines |
| `learn/` | the curriculum, one file per phase, written as each phase ships |

## Rules that will bite you

1. **Never edit `site/` or `dist/`.** Both are generated. Edit
   `docs/content/*.md`, then `npm run docs`.
1b. **Three tiers: Tailwind, then daisyUI, then this repo.** `src/index.css`
   is the library entry and it deliberately does NOT import Tailwind — that is
   what lets a consumer who already runs Tailwind avoid getting it twice.
   `src/bundle.css` is the prebuilt entry and does import it.

   **The layer order is not a flat list, and it cannot be.** Tailwind declares
   `theme, base, components, utilities` and we do not get to change it. daisyUI
   does not use `components` — it nests its components *inside* `utilities`,
   which is what makes `class="btn bg-red-500"` work, because a rule written
   directly in a layer beats every sub-layer nested in it. So this system goes
   in the same place, one step later:

       @layer utilities { @layer sds { @layer elements, components, patterns,
                                       sections, theme; } }

   `.btn` → ours. `.btn.bg-red-500` → the utility. `.drawer` → daisyUI's.
   Never write `@layer utilities { … }` directly; use `@utility` for a real
   utility, or `utilities.sds.<layer>` for a component. Our reset and tokens go
   in `base`, unlayered, so they land after preflight.

1c. **A name can only belong to one system, and the cascade does not settle it.**
   Layer order decides `.hero` vs `.hero`. It decides nothing about
   `.hero > *`, which is daisyUI stacking every child of a hero into one grid
   cell — and we have no competing rule, so it applied and the landing page
   rendered with the illustration on top of the headline. Twenty other
   components had the same shape waiting.

   The fix is not a reset per descendant. It is `exclude` in the `@plugin`
   block: the thirty components this repo builds are not compiled into daisyUI
   at all. **Build a component whose name daisyUI also uses, and add it to that
   list the same day.**

   Watch the *utility* namespaces too. `.bg-canvas` was ours and is now
   Tailwind's, generated from `--color-canvas`; a hand-written `.bg-*` cannot
   win, because Tailwind's sits directly in `utilities`. Anything that pairs a
   ground with its ink is `surface-*` instead.

2. **Every rule in `src/` lives inside a `@layer`.** An unlayered rule beats
   every layer and is therefore a bug. A file may only reference tokens and
   classes from a lower layer.
3. **Components read tier-2 tokens only** (`--fg-muted`, `--bg-surface`,
   `--accent`), never a ramp step (`--ink-500`) and never a raw value. Overriding
   a token after the import is the entire customisation API.
4. **Monospace is for code.** Four small voices: `--font-label` (Inter, upper,
   tracked, semibold), `--font-data` (Inter, light, tracked, tabular),
   `--font-mono` (code only), `--font-body`. `scripts/audit-mono.py` enforces it.
5. **A docs page must demo every class its CSS file defines.** The demo is the
   markup; the code pane is the same string escaped, so they cannot drift.
6. **No AI attribution in commits.** No `Co-Authored-By`, no "Generated with"
   line. This is published as the owner's own work.
7. **This repo is independent — it exports, it never imports.** Do not copy
   code, patterns, markup or prose into `src/` or `docs/` from a sibling repo
   (`imswarnil.com/`, `theme.imswarnil.com/`, `imswarnil.github.io/`, …), and
   do not treat one as a reference for how something here should look. Other
   repos consume this package; the relationship runs one way only. Decisions
   here are made here. The single inbound exception is
   `docs/icons/sprite.svg`, vendored from `icons.imswarnil.com` on build —
   an asset, not a design.
8. **Composition has slots.** A `bg-*` paints on the element, a `pattern-*`
   on `::before`, `.frame` on both pseudos, a `.veil` is a child. Keep new
   decoration in one of those slots so a band can carry all of them.
9. **Broadcast sizes are `cqi`, never px.** Every stage is a container; a
   title at `8cqi` is 102px on a 1280 thumbnail and 26px in a docs column.
10. **Every component is its own module** — one concern, one file, in the layer
   folder it belongs to, with a header comment carrying the argument.
11. **The docs site is built out of the system, and its own CSS is layered.**
   The bar is `.navbar`, the side nav is `.navlist` inside `.acc`, the contents
   is `.toc`, the prev/next is `.pager`, the footer is `.footer`, the body copy
   is `.prose`, the code blocks are `.codeblock`. If the chrome needs something
   the system has, use it; if the system does not have it, that is a finding
   about the system, not a licence to write a private copy. Everything in
   `docs/assets/*.css` lives in `@layer utilities.sds.docs` — one step above
   the system, so the chrome can position a component, and still below
   Tailwind's utilities, so `md:grid-cols-3` on a docs page wins. Unlayered
   docs CSS outranks *everything*, including utilities; this file's own chrome
   was unlayered for most of the repo's life and shipped 25 collisions
   (`.pager`, `.toc`, `.table`, `.code`, `.hero`, `.lead`, `.tok-*`, …).


## House rules of the CSS

- **Active state is a dot or a 2px rule — never a filled pill.**
- **State lives in ARIA**: style `[aria-current]`, `[aria-expanded]`,
  `[aria-pressed]`, `[data-*]`. Never an `.active` class that can disagree with
  the accessibility tree.
- **The platform first**: `<details>`, `<dialog>`, the Popover API, native
  inputs. Keyboard and Escape come free rather than being rebuilt.
- **Motion is honest**: under 200ms for feedback, one property at a time, and
  everything off under `prefers-reduced-motion`. The finished state is the
  resting state.
- **One accent, rationed.** Adding a second hue changes the argument of the
  system, not a setting.
- Match the surrounding density: a one-declaration rule stays on one line.
  Tabs. Comment *why*, not what; the file header carries the argument.

## The theme contract

`theme.imswarnil.com` (the Ghost theme) consumes this package through a `file:`
dependency and reads a fixed set of token names — including the older
`--font-slate`, `--tracking-slate`, `--radius-pill`, `--shadow-1..4`,
`--ring-focus`, `--tap-min`, `--pure-black/white`. They are kept as aliases in
`src/1-foundation`. Do not remove or rename them without changing the theme.
