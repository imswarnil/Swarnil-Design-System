# Im Design System

A design system for Ghost themes. Everything it defines is namespaced: classes are `im-*`, CSS
variables are `--im-*`, keyframes are `im-*`. (The name lives in one place: `site/site.config.mjs`.)

Tokens, a page shell, components and reusable page sections, written from scratch on
**Tailwind CSS 4**. Fonts are Geist, Geist Mono and Geist Pixel only. Everything not written here is
openly licensed and listed in [`PROVENANCE.md`](PROVENANCE.md).

```bash
npm install
npm run dev        # http://localhost:4700 — builds, serves, rebuilds + reloads on save
npm run build      # one-off build into dist/        (NODE_ENV=production to minify)
npm run vendor     # re-copy fonts + icons from their npm packages
```

Node 22+. Port 4700 is pinned; `PORT=4701 npm run dev` to move it.

## What you ship

| | |
| --- | --- |
| `dist/assets/im.css` | tokens, reset, layout, components, the editor's cards, motion and effects, and only the utilities your templates use (run `npm run build` for the current size) |
| `dist/assets/im.js` | theme switch, collapsible nav, the phone menu panel and dialogs, menus, copy, native share, table of contents, tabs, carousel controls, video hover-preview, marquee, course-curriculum panel, range fill (no dependencies) |
| `dist/assets/im-code.js` | optional: the system's own syntax highlighter + copy button for code blocks (~3 KB) |
| `dist/assets/im-motion.js` | optional: scroll reveals and the 25 entrances (`data-im-in`), split text, count-up, scramble, hand-drawn scribbles, the image colour lens, the click point for the `iris` page transition |
| `dist/assets/im-media.js` | optional: lightbox for galleries, the YouTube facade with timestamps / chapters, lazy pictures, file drop |
| `dist/assets/im-content.js` | optional, but needed with `"card_assets": false`: the behaviour of Ghost's editor cards — gallery proportions, toggle, audio and video players — plus scrolling tables and click-to-zoom |
| `dist/assets/im-charts.js` | optional: sparklines (~1 KB). Bars, rings and donuts are pure CSS |
| `assets/fonts/` | the Geist family + `OFL.txt` |
| `partials/` | Ghost partials: `icons/`, `components/`, `shell/` |
| `sections/<name>/` | self-contained page sections — copy a folder to use one |

## How it is organised

```
theme → tokens → base → layout → components → effects → utilities     (CSS cascade layers, low → high)
```

- **`--im-*` variables are the public API.** *Primitives* (`--im-gray-200`, `--im-radius-lg`) have no
  meaning; *semantic* tokens (`--im-canvas`, `--im-surface`, `--im-ink`, `--im-line`, `--im-accent`)
  say what a value is for. Components use semantic tokens only, so dark mode and re-skinning are a
  change to one file. `tokens/tailwind.css` is a thin bridge (`@theme inline`) that hands them to
  Tailwind, so `bg-surface`, `text-ink`, `border-line`, `rounded-lg` exist and compile to the
  `--im-*` variable itself.
- **Tailwind, constrained.** Palette, type scale, radii, shadows and widths are replaced, so
  `bg-red-500` or `text-2xl` generate nothing. Spacing and breakpoints are Tailwind's own.
- **Components** (`im-btn`, `im-card`, `im-menu` …) expose knobs as variables (`--im-btn-bg`, `--im-card-pad`); variants are extra classes;
  state comes from real attributes (`aria-current`, `aria-busy`, `[popover]`, `<dialog>`).
- **Two looks from one set of components.** The default is *soft* (pills, filled rounded surfaces).
  `<html data-im-style="swiss">` re-tunes the same components into line work, and `src/layout/frame.css`
  adds the visible grid to set them in: rails, ruled rows, registration marks, shared-border cells,
  line-pattern backgrounds (`im-bg-grid`, `im-bg-lines`, `im-bg-rules` …). See **Layout → Swiss grid**.
- **Motion and effects are their own layer.** `src/motion/` (enter, reveal, scroll-driven, loops;
  `entrance.css` — 25 named entrances chosen per site through `--im-in-text` / `-image` / `-section`;
  `transition.css` — eight cross-document page transitions chosen with `<html data-im-transition>`;
  and the two signature interactions) and `src/effects/` (`im-fx-*` for text, images and borders)
  sit above components, built on motion tokens, and all stand down under `prefers-reduced-motion`.
- **A post's body is `im-content`.** `src/components/content.css` is the canvas (main / wide / full
  widths, lists, quotes, tables, footnotes) and `koenig.css` styles every card Ghost's editor prints.
  The theme must set `"card_assets": false` — Ghost's own card stylesheet is unlayered and would
  win — and load `im-content.js` in its place.
- **Interaction is deliberately small.** A button's trailing icon leans; a card's hairline sharpens
  to ink. Those two, repeated everywhere (post nav, menu tiles, bookmark and file cards), are the
  system's hover. Do not add a third.
- **Sections** are folders: markup, plain CSS on one block of class names, optional JS and media.
  Responsive by *container* query, content by parameter.
- **The docs render the real partials** through Handlebars with Ghost's public helpers shimmed
  (`site/lib/ghost.mjs`), so what you see is what Ghost would output.

## Where things go

| You want to… | Edit |
| --- | --- |
| Change a colour's value, light or dark | `src/foundation/tokens/semantic.css` |
| Change the syntax-highlighting colours | `src/foundation/tokens/code.css` |
| Expose a new token as a Tailwind utility | `src/foundation/tokens/tailwind.css` |
| Change the grey ramp, type scale, radii, widths | `src/foundation/tokens/primitives.css` |
| Restyle a bare element | `src/foundation/base/elements.css` |
| Change the page frame | `src/layout/` |
| Add / change a component | `src/components/<name>.css` (+ `partials/components/<name>.hbs`) |
| Add a layout helper | `src/utilities/index.css` (`@utility`) |
| Add a background pattern | `src/utilities/patterns.css` |
| Add an animation / micro-interaction | `src/motion/` (+ `src/js/im-motion.js` if it needs the pointer or scroll) |
| Add a text / image / border effect | `src/effects/` → `im-fx-<name>` |
| Add a page section | `sections/<name>/` |
| Add an icon | its Lucide name in `scripts/vendor.mjs` → `npm run vendor` |
| Document it | `site/pages/…` + a line in `site/site.config.mjs` |

Step-by-step guides are in the running site under **Guides**.

## Three rules

1. **Tokens before values.** A hex code or bare px in a component is a token not yet named.
2. **Everything in a layer** — except a section's own stylesheet, which styles only its own block.
3. **Write it, or license it.** Nothing enters this repo from another theme. See `PROVENANCE.md`.
