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

Fonts: **Geist, Geist Mono, Geist Pixel only.**

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
- Style scopes (`src/components/swiss.css`) are token overrides plus rules inside
  `@scope ([data-im-style="swiss"]) to ([data-im-style="soft"])`, so a soft island inside a Swiss
  page is left alone. A scope rule must set a component's VARIABLES, not its properties, or it
  breaks states that rely on them (a pressed button in a group).
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
  of them. Tile a one-tick `linear-gradient` with `background-size` + `repeat-x` (divider, `im-fx-ticks`).
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

## Verify a change

`npm run build` must end with "every Ghost helper the partials use is modelled". For anything
visual, `npm run dev` and check desktop, ~390px (load the page in a 390px iframe and compare
`scrollWidth`), and dark mode (gear, top right).
