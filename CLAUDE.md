# Im Design System — lives in `design.imswarnil.com/`, deployed to https://design.imswarnil.com

An ORIGINAL Tailwind 4 design system for Ghost themes, which the owner intends to **sell**.
Read `README.md` and `PROVENANCE.md` first.

## The rule that outranks everything else

**Never copy from a commercial theme.** The owner's personal site runs a purchased theme whose
licence forbids redistribution and modification for resale, and claims its "appearance, structure,
and organization". No copy of it belongs in this repository. So, in anything under
`src/ partials/ sections/ site/ scripts/`:

- no code, markup, class names, CSS variable names, settings schema, file structure or doc text
  taken from it — not even "just to match";
- do not open its files to see "how it does X" while writing a component here. Decide what the
  component should do, then write it from the platform docs (Ghost, MDN, Tailwind);
- nothing in the build may read a theme folder;
- do not use its name anywhere in this repository.

Sharing a *sensibility* is fine and intended: neutral palette, Geist, pill buttons, top bar + side
nav. Anything from outside must be openly licensed (MIT/ISC/BSD/Apache/OFL/CC0), arrive through
`scripts/vendor.mjs` or `package.json`, and get a row in `PROVENANCE.md`. Re-run the audit block in
`PROVENANCE.md` after any sizeable change; it must come back empty / `0`.

**There is ONE look.** The Swiss style scope (`data-im-style`), the ruled `im-frame` layout and the
Soft/Swiss switch were removed on 2026-09-22. Do not reintroduce a second skin: a component is
styled once, and a variant is a modifier class on that component, never a page-wide scope that
re-tunes everything.

Fonts: **Geist, Geist Mono, Geist Pixel only.** The logo is set in Geist as live text — see
`src/components/logo.css`; the only drawn brand file is the favicon.

## Naming

Everything the system defines is namespaced **`im-`**: classes (`im-btn`, `im-card-media`), CSS
variables (`--im-surface`, `--im-btn-bg`), keyframes (`im-menu-in`), custom utilities
(`im-grid-auto`, `im-stack`), section blocks (`im-hero__title`), data hooks added by this system
(`data-im-copy`). Tailwind's own utilities stay unprefixed (`flex`, `bg-surface`, `md:hidden`) — they
reach the tokens through `src/foundation/tokens/tailwind.css`. Docs-only chrome in `site/site.css`
(`example`, `swatch`, `mini-shell`) is deliberately NOT prefixed: it is not part of the product.
Add a token → `--im-*` in primitives/semantic, plus one bridge line if it should be a utility.

## Gotchas already hit

- Compare paths with `fileURLToPath` (the project once lived in a folder with spaces in its name).
- Tailwind 4 `@apply` takes **utilities only**. Layout helpers (`grid-auto`, `stack`, `cluster`,
  `wrap`) are therefore `@utility` rules, and read their knobs with a `var()` fallback rather than
  declaring a default — a utility's declaration would outrank a component setting that knob.
- **Layer order bites:** `.btn` sets `display` in `components`, which beats a `layout`-layer rule
  trying to hide it. Show/hide a component with a utility on the element (`md:hidden`).
- Tokens are `@theme static` so plain stylesheets (sections) can rely on every variable existing.
- In a docs page, a context variable must not share a name with a Ghost helper — the helper wins
  (`content`, `url`, `date`, `excerpt`, `tags`…). The page body is `doc_body` for this reason.
- Doc-page previews are emitted **between** `.prose` blocks, never inside one, so prose rules (list
  markers, measure) cannot reach a component preview. `{{#example}}` handles this.
- A **column** flex container with wrapping and `flex-basis: 100%` children spills into new columns
  on narrow screens.
- `site/dev.mjs` runs each rebuild in a child process on purpose — importing `build.mjs` would cache
  it and edits to the build would never load.
- WAAPI `finish` never fires in a tab that is not being painted. Clean-up that matters (tearing down
  a playing video) needs a timer fallback — see `sections/home-hero-full/hero.js`.
- **Check for name collisions before adding a class.** `im-label` is the FORM field label; the Swiss
  mono caption had to become `im-caption`. `grep -rn '\.im-<name>\b' src` first.
- **Anything that starts hidden must not depend on one API.** Scroll reveals hide only when the head
  script has set `data-im-js` AND motion is allowed, and `im-motion.js` backs `IntersectionObserver`
  with a throttled geometry sweep — an observer never fires in a tab that is not being painted.
- A CSS gradient cannot be confined on both axes, so a repeating `+` (`im-bg-cross`) is an inline
  SVG tile; every other pattern is pure gradients and takes `--im-pattern-color`.
- The side nav's width feeds the content: `[data-nav="rail"]` widens `.im-with-aside`, `.im-wrap` and
  `.im-frame` by exactly `--im-nav-width − --im-nav-rail`.
- **A rail remembered from desktop must not reach a phone.** `[data-nav="rail"] .im-shell` sets two
  columns; below `md` the side nav is `display: none`, so the content fell into the 68px rail
  column. Every `[data-nav]` layout rule lives inside `@media (width >= 48rem)`.
- **Do not draw 1px ticks with `repeating-linear-gradient`** over a long run — Chrome drops stretches
  of them. Tile a one-tick `linear-gradient` with `background-size` + `repeat-x` (the divider's ruler).
- **`max-height: 100%` needs a definite track.** In the lightbox the stage's grid row is
  `minmax(0, 1fr)`; an auto row simply grows to the picture.
- **Ghost's card CSS is unlayered and beats every layer.** A theme built on this must set
  `"config": { "card_assets": false }` and ship `im-content.js`. The `kg-*` names are Ghost's
  (public, MIT) editor output; write the rules here from that markup, never from another theme.
- **Inline hover cards:** `.im-hovercard` is `display: inline` so a long link wraps; keep the link,
  the panel and the closing tag touching or the whitespace prints before the next comma. In the docs
  an example whose content opens outside its box needs `{{#example spill=true}}`.
- `@view-transition` and `@property` both work inside `@layer` (checked in Chrome: the rules parse
  as `CSSViewTransitionRule` / `CSSPropertyRule`).
- The phone menu is `im-navpanel` (a `<dialog>` sheet with `im-navtile`s), not a side drawer; the
  hooks are still called `data-drawer-open` / `-close`.
- **A `container-type: inline-size` element cannot be sized by its contents.** `.im-share` is one, so
  as a flex item with an `auto` basis it comes out **0 wide** and its buttons stack in a column.
  Give it a basis (`.im-postfoot-bar > .im-share { flex: 1 1 20rem }`).
- **The Ghost-helper name clash reaches PARTIALS too**, not only docs pages: a comment's timestamp
  field is `when`, because `{{date}}` is a helper and would win over the field.
- **A `:has()` rule outranks a class trying to set the same variable.** `.im-timeline:has(.im-timeline-marker:not(:empty))`
  is (0,3,0); `.im-widget-series` is (0,1,0), so it cannot change `--im-timeline-marker`. Set only
  what the more specific rule does not.
- **In the lightbox the picture is bounded in viewport units**, not `100%`: the figure shrink-wraps
  the image so the cross can sit on the PICTURE's corner, and a percentage against that auto height
  computes to `none`.
- **Closing an animated `<dialog>` needs a timer**, not `animationend` — an animation in a tab that
  is not being painted never ends, and the viewer would be stuck open. Esc is caught (`cancel`) for
  the same reason: the browser's own close skips the exit.
- **The docs nav has two levels.** A `navigation` item with `children` in `site/site.config.mjs`
  renders as an `im-navtree` inside an `im-navtree`; `site/build.mjs` flattens the leaves for
  prev/next and the search index.
- **`<b>` and `<strong>` are coloured INK by `base/elements.css`.** A component that puts text on a
  dark fill must set `color: inherit` on it, or the letter vanishes (this bit `.im-logo-type` on the
  logo's tile).
- **`align-self: flex-start` aligns to the CONTAINER, not to the neighbour.** In a flex row as tall
  as a tile, the logo's dot flew to the tile's top instead of the letter's. The square is therefore
  an `inline-grid` with `place-content: center`, where the row is only as tall as the letter.
- **`text-box-trim` / `text-box-edge: cap alphabetic` is how the logo lands its dot** on the cap
  line: the trimmed box IS the capital. Chrome has it; the fallback is two em nudges
  (`--im-logo-drop`, `--im-logo-lift`) that the `@supports` block zeroes out.
- **A custom property only animates if it is REGISTERED.** `im-fx-corners` moves its arms from
  `0.875rem` to `100%` through `--im-fx-arm`, declared with `@property … <length-percentage>`;
  without that the browser has nothing to interpolate and the frame snaps shut.
- **`animation-fill-mode: backwards`, not `both`, for anything that borrows a size.** The typewriter
  takes a width in `ch` for the length of the animation and gives it back: with `both` a character
  count one short clipped the last letters off for good, silently.
- **A `<video>` cannot be poured into letters** — `background-clip: text` needs a background image.
  Blend the SHEET instead: white with black words on `screen` turns the words into windows
  (`im-videobg-knockout`), and the clip behind it needs a brightness filter or the words have no
  shape.
- **`mix-blend-mode` needs an `isolation: isolate` ancestor**, or the blended child mixes with the
  whole page rather than with the thing behind it.
- **A screenshot does not capture an open popover.** Light-dismiss fires first. To look at a menu,
  clone it without the `popover` attribute and screenshot the clone.
- **`im.js` closes every popover on scroll**, so a smooth `scrollIntoView()` before a click will shut
  the menu the click just opened. Scroll, wait, then click.
- **A registered custom property read by a `::before` must `inherit: true`.** A pseudo-element
  inherits from the element it belongs to, so a property declared on the card and used in the
  pseudo's `clip-path` falls back to its initial value when registered as non-inheriting. This cost
  an hour on the post card's dot flood: the text inverted onto a surface that had not changed.
- **An inverting block must not redefine a token its own FILL is made of.** `im-post-card-dot-ink`
  fills with `var(--im-ink)` and inverts `--im-ink` to the canvas — on the same element that
  resolves to white on white. Put the inversion one combinator down (`> *`): the fill still sees the
  page's real ink, everything inside still inverts.
- **Two states are defined once, in tokens, and every component reads them.** `--im-current-*` (a
  light fill + a bolder label) is "you are here" — side nav, top bar, menu row, mega link, tile,
  contents entry, page number, topic chip. `--im-hover-bg` is "this answers" — everything fills, one
  surface deeper than it already sits. No border sharpens to ink and nothing scales any more; a
  component already on `--im-surface` overrides `--im-hover-bg` to the next step down.
- **A card with no box fills with a PANEL behind it.** `.im-post-card::before`, inset by a negative
  bleed, `z-index: -1` — so nothing in the layout moves and the card still lines up with its grid.
  It needs `isolation: isolate` on the card, or the panel slides behind the nearest ancestor with a
  background and is never seen.
- **The dot is a marker (new / live / unread), never an active state.**
- **A fixture field must not share a name with a HELPER.** `{{date}}`, `{{code}}`, `{{content}}`,
  `{{url}}`, `{{excerpt}}`, `{{tags}}` — an ambiguous mustache resolves to the helper and is called
  with no block, which is `options.fn is not a function` at build time. The snippet fixtures use
  `snippet`, the comments use `when`.
- **The fixture/helper clash is now caught at BUILD time.** `site/build.mjs` walks `demo` and
  names any field a registered helper shadows (`price`, `date`, `code`, `icon`, `match`…). The
  four helpers that legitimately read the field they are named for — `excerpt`, `reading_time`,
  `url`, `content` — are allowed. It printed `$[object Object]` across two collections before
  the guard existed.
- **A track drawn with a background image can only be dimmed with `opacity`, and `opacity`
  composites its children.** The star rating's filled overlay came out pale inside a 28%-opaque
  track. Draw the track as a `mask-image` with a `background-color` instead: then the track is a
  colour, the fill is a colour, and neither knows about the other.
- **A two-column grid with nothing in the first column squeezes the second.** `.im-widget-list a`
  was `auto minmax(0,1fr)` for the ranked numeral; without a `::before` the title got the `auto`
  column and the `<small>` got the whole 1fr, printing post titles one letter per line. Give the
  base one column and let the variant add the numeral's.
- **`{{lookup demo.six @index}}` hands back a POST, not a picture** — an object used as a `src`
  prints `[object Object]`. `demo.shots` is the array of plain image URLs for exactly this.
- **Verifying in the browser:** the user often browses in the same tab. Open your OWN tab
  (`tabs_create_mcp`). A background tab is not painted: rAF, IntersectionObserver and WAAPI
  `finish` all stall there, so test behaviour by calling/dispatching, not by waiting for frames.
- A horizontal scroll container (`overflow-x: auto`) also clips VERTICALLY. Anything meant to poke
  out of a carousel slide (a hover zoom, a big numeral) needs padding on the track, not a negative
  margin on the slide.
- The carousel is sized by CONTAINER queries (`--im-slides`, `-sm`, `-md`, `-lg`), so test it in a
  narrow column as well as a narrow window.
- A component that sets `margin` in the `components` layer overrides the rhythm `.im-prose` sets from
  `base` (this bit `.im-code`). Leave margins to the container.
- In a horizontal card the `<img>` must be out of flow, or its intrinsic height sets the card's.
- `site/build.mjs` wraps doc prose in `im-prose`; class names inside `.mjs` are not covered by any
  rename script — grep them by hand.
- Browser automation here often fails to deliver key events; dispatch them from JS to test.
- **`.im-icon` is `1em` wide in a border box**, so padding an icon eats the icon. Put the padding on
  the container (this bit `.im-star`, twice).
- **An inverted block must restate the SEMANTIC TOKENS, not set colours** (`.im-footer-ink`): a mark
  drawn in `currentColor`, a button, a form field all follow without knowing. And it needs two
  literal blocks, one per theme — `--a: var(--b); --b: var(--a)` is a reference cycle and CSS throws
  both away.
- **A button group cannot wrap**; its buttons are joined along one edge. On a narrow window scroll it
  sideways (`overflow-x: auto` + `flex: none` on the buttons), never `flex-wrap`.
- **A `<dialog>` is centred on both axes with `inset: 0; margin: auto`** — not a translate, which
  fights the open animation. `.im-navpanel` is centred and *grows* with the window rather than being
  a phone drawer stretched wide.
- **A grid of nav columns leaves holes** when one group has two links and the next eighteen: a row is
  as tall as its tallest cell. `im-navcols-flow` swaps the grid for multi-column layout, where there
  are no rows, with `break-inside: avoid` to keep a group whole.
- **Cap a feature image.** `--im-posthero-frame`: a picture allowed to fill a 90rem window is a wall,
  not a header. The copy has its own cap, `--im-posthero-measure`.
- **A bar that floats over the page must be `fixed`, not `sticky`** — `top` on a sticky element does
  not animate. `im-topbar-float` transitions `top`/`left`/`right`, and `[data-im-stick]` is set by a
  throttled scroll listener, not an observer (which never fires in an unpainted tab).
- **A percentage width inside a container sized BY its contents resolves to zero.** The short
  player is `width: min(100%, …)` in a stage whose parent centres its items — so the stage was
  max-content wide, the percentage was a cycle, and only the action rail rendered. Give the
  intermediate box a definite width.
- **A snapping feed needs `scroll-snap-stop: always`.** Without it a hard flick skips three items,
  and a viewer who cannot land on the one they aimed at stops aiming.
- **A docs page can drop the docs chrome**: `shell: frame` in its frontmatter picks
  `site/layouts/frame.hbs`. That is the only way to show a floating bar over a page that scrolls —
  `/demos/navbar/`, loaded in an iframe by the Navbar page.

## Verify a change

`npm run build` must end with "every Ghost helper the partials use is modelled". For anything
visual, `npm run dev` and check desktop, ~390px (load the page in a 390px iframe and compare
`scrollWidth`), and dark mode (gear, top right).
