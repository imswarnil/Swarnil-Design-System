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
npm run dev     # build the docs, serve site/ at http://localhost:8080
npm run build   # dist/swarnil-design{,.min}.css + dist/swarnil-broadcast{,.min}.css + site/
npm run docs    # regenerate site/ only
npm run lint    # stylelint over src/**/*.css — must stay at zero errors
npm run audit   # mono-voice audit + class audit, both strict (needs a built site/)
npm run size    # gzipped size of the minified bundle
```

Both `dist/` and `site/` are generated and gitignored. CI builds them on every
push; Pages deploys `site/`.

## Layout

| Path | What it is |
| --- | --- |
| `approach.md` | the spec — what the system is. Authoritative. |
| `src/0-config` | the `@layer` declaration. Must be read first. |
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
