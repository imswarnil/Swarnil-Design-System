# Working in this repository

Instructions for AI coding agents. Humans: this is the condensed version of
[CONTRIBUTING.md](CONTRIBUTING.md), `approach.md` (the spec) and the file
headers in `src/`.

**Start with [PROJECT.md](PROJECT.md)** — it is the short one, and it carries
the current state and the session log. This file is the rules, which rarely
change; `approach.md` is the full spec. Update `PROJECT.md`'s log before you
finish a session.

Swarnil Design System is a token-first, dependency-free CSS design system.
Plain CSS custom properties and classes, nine cascade layers, no framework, no
runtime, no build step required to *use* it. Almost monochrome, so one colour
can mean something.

## Commands

```bash
npm install
npm run watch   # THE DEV LOOP — serve site/ at :8080 and rebuild on save
npm run build   # dist/*.{css,min.css} + site/ + site/assets/site.min.css
npm run check   # lint → build → audit → size. What CI runs.

npm run dev     # one dev build, then serve. `watch` is the same plus a watcher
npm run docs    # regenerate site/ only
npm run css     # the four package bundles only
npm run css:bulma # just the Bulma base + the bundle standing on it
npm run css:site # the site's one compiled sheet only (needs site/ to exist)
npm run lint    # stylelint over src/**/*.css — must stay at zero errors
npm run audit   # mono-voice audit + class audit, both strict (needs a built site/)
npm run size    # gzipped size of every bundle
npm run clean   # rm -rf dist site
```

Both `dist/` and `site/` are generated and gitignored. CI builds them on every
push; Pages deploys `site/`.

### Two modes, and the difference is which CSS the page links

`SDS_DEV=1` (which `dev` and `watch` set) copies `src/` into `site/` and links
it, so a saved file is visible on reload with no PostCSS run at all. Production
links **one** file — `assets/site.min.css`, compiled from `docs/assets/site.css`
by `npm run css:site` — and ships no `src/` at all.

Do not undo that. Linking `/src/index.css` in production means the browser walks
a three-deep `@import` chain across ~78 unminified, render-blocking files, which
is exactly what this repo did until 2026-09-09 while the minified bundles it had
already built sat in `site/dist/` with nothing pointing at them.

## Layout

| Path | What it is |
| --- | --- |
| `approach.md` | the spec — what the system is. Authoritative. |
| `src/0-config` | the `@layer` declaration. Must be read first. |
| `src/bulma-base.scss` | the Bulma base — utilities, themes, reset and layout primitives only, compiled to `dist/bulma-base.css` |
| `src/0-bulma/bridge.css` | points Bulma's `--bulma-*` at this system's tokens. One-way |
| `src/bulma.css` | the bundle entry: Bulma base + bridge + the system |
| `src/1-foundation` … `src/6-utilities` | the system, hand-authored CSS |
| `src/7-broadcast` | the creator layer — canvases, scenes, lower thirds, stream widgets, thumbnails. Layer `sections`; sized in `cqi`; built into its own bundle by `src/broadcast.css` |
| `templates/` | whole pages built out of the system, plus `templates.css` glue. Copied into `site/templates/` on build and audited like the docs |
| `src/js/nav.js` | optional, additive; only sets attributes CSS already reads |
| `docs/content/*.md` | **the source of the docs** — one markdown file per page |
| `docs/templates/` | the page shells (`page.html`, `home.html`) |
| `docs/assets/` | docs chrome (`docs.css`, `docs.js`, `home.css`), fonts, favicon |
| `docs/icons/sprite.svg` | vendored from `../icons.imswarnil.com`; refreshed on build when that repo is beside this one |
| `docs/build.py` | the generator: markdown + `:::demo` blocks → `site/` |
| `scripts/audit-mono.py` | fails CI if monospace is used outside the code allowlist |
| `scripts/audit-classes.py` | fails CI on a class the markup uses that no CSS defines |
| `learn/` | the curriculum, one file per phase, written as each phase ships |

## Rules that will bite you

1. **Never edit `site/` or `dist/`.** Both are generated. Edit
   `docs/content/*.md`, then `npm run docs`.
1b. **Bulma is the FIRST layer, and it is a floor, not a peer.** `src/bulma.css`
   puts Bulma under the whole system. Because `bulma` is declared first, it
   loses every collision to us — `.card`, `.navbar`, `.table`, `.input`,
   `.hero`, `.footer`, `.breadcrumb` and about twenty more. Never reorder it,
   never add a `--bulma-*` read to `src/` (the bridge is one-way, so the base
   can be dropped without changing anything above it), and keep
   `src/index.css` free of it — the plain bundle is the default and stays
   dependency-free.
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
   `docs/assets/*.css` lives in `@layer docs` — an unlayered docs rule outranks
   every system layer, so the page documenting a component would be showing you
   an overridden one. That is not hypothetical: this file's own chrome shipped
   25 such collisions (`.pager`, `.toc`, `.table`, `.code`, `.hero`, `.lead`,
   `.tok-*`, …) until 2026-09-09.


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
