---
name: im-design-system
description: Build with the Im Design System in any stack — HTML, React, Next.js, Vue, Svelte, Astro or Ghost — using its tokens (--im-*), components (im-*), layouts and rules; and make anything else in its look (thumbnails, video edits, social posts, slides, posters, apps). Use when writing or changing markup, JSX, Handlebars or CSS for a project built on this system, when asked for a component, a page layout or a token, when asked for a thumbnail, a video, a deck or other work "in the Im look", or when checking that something follows its rules.
license: All rights reserved — see LICENSE. The skill is usable by anyone who holds the system.
metadata:
  author: imswarnil
  version: "0.8.0"
---

# Im Design System

An original design system — tokens, layout, forty-odd components, page sections
and fourteen content collections — for every kind of project. It is CSS classes,
data attributes and a few plain scripts, so HTML, React, Next.js, Vue, Svelte,
Astro and Ghost all use the same package. Everything it defines is namespaced
`im-` / `--im-*`.

## Before writing anything

1. **Ask the system, do not guess.** If the `im-design-system` MCP server is
   connected, call `list_components`, `get_component <name>`, `list_tokens`,
   `search <query>` or `get_page <path>` — they read the repository at call time.
   Without MCP, read `src/components/<name>.css` (the comment at the top shows
   the markup) and `partials/components/<name>.hbs`.
2. **Read `rules`** (MCP) or `README.md` once per session.
3. **In a project, call `setup <stack>`** (html · react · next · vue · ghost ·
   tokens) and copy markup with `get_example <page> <format>` — the docs show
   every example as HTML, React and Ghost. Never re-create a component that
   exists; never write a raw colour.
4. **For anything that is not a web page** — a thumbnail, a video edit, a
   carousel, a deck, a poster, an app — call `brand`, then `brief <kind>`, and
   `image_prompt <shape> <subject>` for art. They read the tokens, so their hex
   values, fonts and timings are the system's own.

## The rules that matter

- **Three layers of tokens.** Primitives (`--im-gray-500`, `--im-space`) are never
  used by a component. Semantic tokens (`--im-canvas`, `--im-ink`, `--im-accent`,
  `--im-line`, `--im-hover-bg`, `--im-on-media`, `--im-ring`, `--im-z-bar`,
  `--im-duration-fast`…) are what components read and the only tier that changes
  between light and dark. Component knobs (`--im-btn-height`, `--im-player-side`)
  are set on the component, a wrapper or `:root`. Never a raw colour, duration or
  z-index in a component.
- **Layers, low to high:** theme · tokens · base · layout · components · effects ·
  utilities. A layout-layer rule cannot override a component's `display`; a
  utility on the element can.
- **Two states, defined once.** `--im-current-*` (light fill + bolder label) is
  "you are here" on every kind of navigation. `--im-hover-bg` is "this answers":
  things fill, lift one pixel and cast `--im-shadow-sm`. Nothing scales or
  sharpens a border. The dot means new / live / unread — never active.
- **Words over a picture** read `--im-on-media` (three strengths), chips read
  `--im-glass`, the foot of a picture is darkened with `--im-media-scrim`.
- **A component never sets its own margin**; the container's `im-stack`,
  `im-section` or grid does.
- **Layout knobs are classes** (`im-stack-md`, `im-grid-lg`, `im-solo-lg`); a
  `style=` attribute carries only data (a rating, a bar width, a colour).
- **Ghost helper names are reserved.** A field a template reads must not be
  called `date`, `price`, `code`, `url`, `content`, `excerpt`, `tags`… (the
  comment's timestamp is `when`, a snippet's code is `snippet`).
- **Ghost's card CSS is unlayered:** set `"config": { "card_assets": false }` and
  ship `im-content.js`.
- **Provenance:** nothing from a commercial theme, ever; anything from outside
  is openly licensed and listed in `PROVENANCE.md`. Fonts: Geist, Geist Mono,
  Geist Pixel, and one hand, Caveat (one to three words, one per view).

## Page shapes

| Shape | Class | For |
| --- | --- | --- |
| Site with a sidebar | `.im-shell` + `shell/topbar` + `.im-sidenav` | many sections |
| Site with a top navbar | `shell/navbar` | full-width pages |
| A page on its own | `.im-solo` (+ `im-solo-split`) | sign in, guestbook, résumé |
| Watching a sequence | `.im-player` | a lesson, an episode |
| A 9:16 clip | `.im-shortwatch` | a short with its post |
| One post, rail on a switch | `.im-single[data-sidebar]` | posts, pages |
| Reading + contents + widgets | `.im-with-rails` | long posts |

Every container is measured in the 12-column grid (`--im-col`, `--im-span-N`,
`--im-grid-gap`); `.im-cols` is the grid itself and `.im-guides` (first child of
`.im-shell-main`) draws it on the page — on unless `<html data-im-guides="off">`;
any `[data-im-guides-toggle]` button flips and remembers it. Anything with
running text needs a canvas ground so the lines stay in the gutters.

## Helpers that always ship

`src/utilities/helpers.css` guarantees a token-backed set of Tailwind utilities
in `im.css` — spacing, display, flex, grid (`md:grid-cols-3`, `col-span-8`),
sizing, type (`text-h2`), semantic colour (`text-muted`, `bg-surface`), edges.
Use them to compose; to change a component everywhere, set its knob.

## Motion

`--im-duration-instant | fast | base | slow | long` (120 · 200 · 360 · 640 ·
900 ms) and `--im-ease-out | in | in-out | spring | glide`. Entrances
(`data-im-in`), exits (`im-out-*`), in-place cuts (`im-cut` + `data-cut`), page
transitions (`data-im-transition`) and loops all read them. Motion is felt, not
watched: about a rem of travel, and everything stands down under reduced motion.
In a video the same values hold — `brand` gives them in frames at 30 and 60 fps.

## Using it in a stack

- **HTML:** link `package/css/im.min.css`, put `js/head.js` first in `<head>`,
  load `js/im.js` (+ `im-motion.js`…) with `defer`.
- **React / Next.js:** `import 'im-design-system/css'`; `<ImHead />` in `<head>`
  (Next: `suppressHydrationWarning` on `<html>`), `<ImScripts />` once. Use
  `Button`, `Badge`, `Card…`, `Wrap`, `Cols`/`Col`, `Logo`, `Icon` where they
  help, `className="im-…"` everywhere else. Install a PACKED copy — a symlink
  loads React twice.
- **Ghost:** vendor `css/`, `js/`, `fonts/` and `ghost/partials`; set
  `"card_assets": false`.

The scripts set up markup that arrives later (a client route, a growing list)
on their own, and run once even if loaded twice.

## Verify

`npm run build` must end with "every Ghost helper the partials use is modelled";
`npm run check` must end with "ready to ship" (no dead `im-*` class, no broken
link, provenance empty). Check a page at desktop width, at 390px and in dark mode.
