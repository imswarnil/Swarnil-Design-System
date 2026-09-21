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
| `dist/assets/im-media.js` | optional: the lightbox — one `<dialog>` on a plain sheet, the cross on the picture's own corner — the YouTube facade with timestamps / chapters, lazy pictures, file drop |
| `dist/assets/im-content.js` | optional, but needed with `"card_assets": false`: the behaviour of Ghost's editor cards — gallery proportions, toggle, audio and video players — plus scrolling tables and the frame mark that opens each picture (`data-im-zoom`) |
| `dist/assets/im-charts.js` | optional: sparklines (~1 KB). Bars, rings and donuts are pure CSS |
| `dist/assets/im-ads.js` | optional: the ad blocks' close button (remembered for the session, in `sessionStorage` and nowhere else), the sticky and floating units' entrance, the interstitial's timing, and the member gate |
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
- **One look, and no second skin.** Pills, filled rounded surfaces, hairlines. A variant is a
  modifier on a component, never a page-wide scope that re-tunes everything — the alternate "Swiss"
  style and its switch were removed in v0.7. The line-pattern backgrounds it used
  (`im-bg-grid`, `im-bg-lines`, `im-bg-rules` …) stayed: they are **Foundation → Patterns**.
- **Motion and effects are their own layer.** `src/motion/` (enter, reveal, scroll-driven, loops;
  `entrance.css` — 25 named entrances chosen per site through `--im-in-text` / `-image` / `-section`;
  `transition.css` — eight cross-document page transitions chosen with `<html data-im-transition>`;
  and the two signature interactions) and `src/effects/` (`im-fx-*` for text, images and borders)
  sit above components, built on motion tokens, and all stand down under `prefers-reduced-motion`.
- **The logo is text, not a file.** `im-logo` sets the site's name in Geist with a dot at the top
  right of the last letter — the recording light — and `im-logo-mark` is the same lockup with one
  letter on a tile, for a favicon, an avatar or an island bar. One variable, `--im-logo-size`,
  scales all of it. The only drawn file is `assets/brand/mark.svg`, because a browser tab cannot
  run CSS. See **Foundation → Logo**.
- **A blog is two pages and one card, and all three are here whole.** **Collections → Post** in the
  docs is what every Ghost site is made of: the *collection* (`im-collhead`, `im-collbar`, `im-feed`
  — which is also a tag page and an author page), the *post* (`im-posthero`, the body, a column of
  `im-widget`s, and `im-postfoot` — author, support, related, newsletter, prev/next, comments), and
  the *card* they are both built out of. Neither page is a section folder to copy; both are
  compositions of components that already exist.
- **The post card is one markup, every shape.** Vertical, horizontal either way round, over the
  picture, or no picture — and what it *shows* is a separate, declarative decision:
  `data-im-hide="author excerpt"`, any of nine parts, in any combination, without a second template.
  Its hover is the brand's dot opening into the card.
- **Anything that opens carries the same mark.** A frame in the top-right corner of a gallery tile,
  a carousel slide, a feature image or a picture in a post body. One thing to learn, not four.
- **And the brand's dot is a state.** The same mark the logo carries, at the top right of a card, a
  button, an avatar, or the current link in the top bar: this is new, live, current, unread.
  `im-dotted` sits it inside the corner, `im-dotted-corner` on it. A dot says "look here"; a
  **badge** says how much.
- **Money is labelled.** `src/components/ad.css` is every ad format — leaderboard through
  interstitial — as a *ratio* rather than a pixel size, plus the sponsor card, the affiliate product
  card, and the member gate that "remove ads" opens. Every block ships with its disclosure attached,
  so removing it takes deliberate effort. See **Components → Ads & sponsors**.
- **A post's body is `im-content`.** `src/components/content.css` is the canvas (main / wide / full
  widths, lists, quotes, tables, footnotes) and `koenig.css` styles every card Ghost's editor prints.
  The theme must set `"card_assets": false` — Ghost's own card stylesheet is unlayered and would
  win — and load `im-content.js` in its place.
- **Light and dark, and nothing else.** There is no third "follow the system" state to store: a
  visitor who has never chosen is shown what their system prefers and goes on following it, and the
  first press of the switch settles it. `partials/shell/head-script.hbs` writes `<html data-theme>`
  before first paint; `theme-button.hbs` is the icon that flips it, `theme-switch.hbs` the
  two-option switcher.
- **The navigation is written once.** `im-navcols` — columns of plain `im-navitem` rows — fills the
  mega menu on a laptop and the menu panel on a phone, and the panel is the same sheet at every
  width: centred, 34rem and two columns on a phone, 60rem and four on a laptop. The top bar can
  also float: `im-topbar-island` is a centred pill over the page, and `im-topbar-float` is a full
  band that becomes that pill once the page scrolls.
- **Interaction is deliberately small.** A button's trailing icon leans; everything else **fills**.
  A card, a row in the side nav, a menu item, a tile, a topic chip — one step deeper than wherever
  it already is (`--im-hover-bg`). Being *current* is the same idea one step further
  (`--im-current-bg`, plus a bolder label), so "you could go here" and "you are here" are the same
  signal at two weights. Nothing sharpens a border; nothing grows 3%. Do not add a third idea.
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
| Change an ad format, or add one | `src/components/ad.css` — a `--im-ad-ratio` and a `--im-ad-max` |
| Change the logo or the favicon | `src/components/logo.css` · `partials/components/logo.hbs` · `assets/brand/mark.svg` |
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
