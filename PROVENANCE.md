# Provenance

An engineering record of what is in this repository and where it came from. It is **not legal
advice** — before selling a product built on this, have someone qualified review it.

## Written here

Everything under `src/`, `partials/components/`, `partials/shell/`, `partials/navigation.hbs`,
`sections/`, `site/` and `scripts/` — including class names, token names, markup structure, file
layout and scripts, and the docs home page illustration (`site/partials/home-art.hbs`, original
SVG artwork). That includes the syntax highlighter (`src/js/im-code.js`) and its colour theme
(`src/foundation/tokens/code.css`): a regex tokeniser written for this system, not a port of Prism,
highlight.js or Shiki, and no theme colours taken from an editor theme. The carousel and marquee
(`src/components/carousel.css`, `marquee.css`, and their part of `im.js`) are likewise written here
on native scroll-snap and a CSS animation — no Swiper, Splide, Flickity or similar. A numbered
"top ten" row and a hover-preview tile are common streaming-UI conventions; no streaming service's
code, artwork, fonts or name is used. The motion system, micro-interactions, text / image / border
effects and background patterns (`src/motion/`, `src/effects/`, `src/utilities/patterns.css`,
`src/js/im-motion.js`) are written here from CSS and DOM primitives — no animation library (no GSAP,
Framer Motion, AOS, Animate.css) and no pattern pack. The techniques involved (gradient text,
conic-gradient borders, scroll-driven animation, FLIP-less reveals) are widely documented CSS.
The 25 entrances (`src/motion/entrance.css`) and the page transitions (`src/motion/transition.css`,
the browser's cross-document View Transitions) are written here in the same way. The lightbox,
video chapters, charts, forms, widgets, hover cards, course curriculum and phone menu panel
(`src/components/*`, `src/js/im-media.js`, `im-charts.js`) use native `<dialog>`, `<details>`,
Popover and form controls — no lightbox, chart, form or player library. The YouTube player is
YouTube's own public iframe embed on the `youtube-nocookie.com` host, driven by its documented
`postMessage` commands; none of YouTube's script is bundled.

**The logo.** Original to this repository, and — unusually — almost none of it is artwork. The
lockup is the site's own name set in Geist with a dot at the top right of the last letter
(`src/components/logo.css`, `partials/components/logo.hbs`): live text, laid out in CSS, so there is
no drawing to license. The one drawn file is `assets/brand/mark.svg`, the favicon, which is a
rounded rectangle, a rounded rectangle and a circle — geometry written by hand here, because a
browser tab cannot run CSS or wait for a webfont. Setting a name in a licensed typeface is ordinary
use of that typeface, and Geist ships under the SIL Open Font License (see the table above), which
places no restriction on what is set in it, logos included. No logo, mark, icon or favicon from any
other product is in this repository.

**The ad formats.** `src/components/ad.css` names the standard advertising sizes — leaderboard,
billboard, rectangle, skyscraper and the rest. Those names and their proportions are an industry
convention published by the IAB and used by every ad network; a ratio is a fact, not an expression,
and nothing here is copied from any network's stylesheet, SDK or template. No ad network's script,
pixel or endpoint is referenced anywhere in this repository: what fills a slot is a decision the
theme makes with its own eyes open.

**The window mockups.** `src/components/mockup.css` draws a desktop window, a browser, a terminal
and a phone out of this system's own tokens — a hairline, a radius from the scale, one shadow. They
are shapes, not renderings of anybody's hardware or operating system: no brand, no buttons, no
camera, and the three window dots are the system's own greys unless a caller explicitly asks for
the coloured ones.

**The GitHub star count.** `[data-im-stars="owner/repo"]` makes one request to GitHub's public REST
API (`api.github.com`) at runtime and writes the number into the button. It is opt-in — without the
attribute nothing is fetched — needs no key, sends no reader data, bundles no GitHub script or
iframe, and fails silently. GitHub's own "star" button widget is not used.

**Ghost's editor cards.** `src/components/koenig.css` and `src/js/im-content.js` style and drive the
markup Ghost's editor prints inside a post (`kg-card`, `kg-bookmark-card`, `kg-callout-card` …).
Those class names and that markup are Ghost's public theme interface (Ghost is MIT-licensed) and
every Ghost theme must target them; they are not any theme's property. The rules and the script
here were written for this system against that markup. Ghost's own default card stylesheet and
script are not copied — a theme built on this turns them off (`"card_assets": false`). The sample
posts in the docs (`site/pages/content/`) are original text written for these pages.

`sections/home-hero-full/` was first written by the repository owner for their personal site
(commits of 16–17 Sep 2026) and ported here on 20 Sep 2026. In the port, every dependency on the
site's then-theme was removed: its CSS variable names were remapped to this system's tokens, and its
form, button, image and icon partials and its tooltip library were replaced with this system's own.

## From somewhere else

| What | Source | Licence | Where |
| --- | --- | --- | --- |
| CSS engine, reset (Preflight), utilities, default spacing + breakpoints | Tailwind CSS | MIT | compiled into `dist/assets/im.css` |
| The grey ramp's values | Tailwind CSS `neutral` scale | MIT | `src/foundation/tokens/primitives.css` |
| Geist, Geist Mono, Geist Pixel | `geist` npm package (Vercel) | SIL OFL 1.1 | `assets/fonts/` + `OFL.txt` |
| Line icons | Lucide (`lucide-static`) | ISC | `partials/icons/*.hbs` |
| Brand marks | Simple Icons | CC0 1.0 | `partials/icons/brand-*.hbs` |
| Brand colours on `im-btn-brand` | each service's published brand colour (a fact, not a work) | — | `src/components/button.css` |
| Template rendering for the docs | Handlebars | MIT | build only — not shipped |
| Sample photographs in the docs | Unsplash | Unsplash License | hot-linked by the preview — not shipped |
| `@modelcontextprotocol/sdk`, `zod` | npm | MIT | `mcp/server.mjs` — the MCP server. Not shipped in a theme. |

Fonts and icons are copied in by `scripts/vendor.mjs` from the official npm packages, so each file's
origin is reproducible. Brand marks remain trademarks of their owners; use them only to link to that
service. `site/lib/ghost.mjs` re-implements Ghost's *public, documented* theme helpers for the docs
preview; it contains no Ghost source code.

## Deliberately not here

No file, stylesheet, script, template, class name, variable name, settings schema or documentation
text from any commercial theme. The build reads no theme folder.

Background: this project began (v0.1, 20 Sep 2026) as a set of overrides layered on a purchased
theme, for the owner's own site — a use that theme's licence permits. Because that licence forbids
redistribution and modification for resale, v0.2 discarded that approach entirely and rebuilt the
system from a blank slate on Tailwind CSS. v0.3 namespaced everything `im-` / `--im-`. The purchased
theme was never part of this repository, and the local copy that sat beside it was removed on
21 Sep 2026 — after a final check that not one source file here was byte-identical to any file in it.

An audit to re-run before any release (expects no output):

```bash
grep -rniE "priority.?vision|\bpvs\b" src partials sections site scripts
```

## Ideas versus expression

Broadly, copyright protects how something is *expressed* — code, markup, text, artwork — not the
idea behind it. A top bar with a collapsible side nav, pill buttons, a neutral palette and a popular
open-source typeface are conventions many products share. What would be a problem is reproducing
another product's code, or imitating a distinctive overall look so closely that buyers could take
one product for the other.

## Working rules

1. Nothing is copied into this repo from a commercial theme — not a snippet, a class-name list, or a
   settings schema. Take ideas; write the code from a blank file, without the other source open.
2. Anything from outside is openly licensed (MIT, ISC, BSD, Apache-2.0, OFL, CC0), arrives through
   `scripts/vendor.mjs` or `package.json`, and gets a row in the table above.
3. Licence files stay with what they cover (`assets/fonts/OFL.txt`, `partials/icons/README.md`).
4. Commit as you go: history is evidence of independent work.
5. The product gets its own name, accent, details, demo content and screenshots — and never uses
   another product's name in its title, marketing or docs.
