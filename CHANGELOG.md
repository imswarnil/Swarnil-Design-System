# Changelog

## Unreleased

### Added

**`im-player`** — a full-width shell for a lesson (or an episode, or a
playlist): the top bar across, the lessons fixed down the left, the lesson
taking the rest. `[data-im-player-toggle]` collapses the side on a desktop
(remembered, applied before first paint as `data-player-side`) and opens it
as a drawer under 64rem. The lesson page is rebuilt on it; see
`/demos/lesson/`.

**`components/coursenav`** — the lesson list as one partial, with
`im-coursenav-flush` for the player's side and `im-coursenav-next` for the
"next up" foot.

**Helpers that always ship** — `src/utilities/helpers.css` guarantees a
fixed set of token-backed Tailwind utilities (spacing, display, flex, grid,
sizing, type, semantic colour, edges) is in `im.css`, so a theme that only
vendors the bundle can still compose and nudge pages. `/guides/helpers/`
now also lists every component knob with its default, read from the CSS at
build time.

**`im-solo`** — a page that stands on its own: a bar with the way back
home, one thing in the middle, a line at the foot (`shell/solo-bar`,
`shell/solo-foot`). `im-solo-split` pins a panel with a pattern beside it.
Sign in, reset, the guestbook and the résumé are built on it.

**`components/author`** — a new author card: a face on a patterned band, the
name, a line, three facts, the ways to follow. `row=true` lies it down for
the foot of a post.

**`im-collhero`** — a full-width hero for a listing, with the topics and a
Card / Grid / List / Simple switch along its foot (`.im-feed[data-view]`).

**`im-sitetree`** — the sitemap as a tree that branches, always open; it grows
downward on a phone.

**Site layouts** — two whole sites, one with a top navbar and one with a
sidebar, at `/layout/sites/`.

**Tokens, three layers made explicit** — the semantic layer gains what
components were each inventing for themselves: interaction
(`--im-accent-hover`, `--im-accent-active`, the focus ring `--im-ring` /
`-width` / `-offset`, `--im-opacity-disabled`), words over a picture
(`--im-on-media` in three strengths, `--im-glass`, `--im-media-scrim`,
`--im-media-ink`), layers (`--im-z-raised` … `--im-z-modal`), a hairline
shadow (`--im-shadow-sm`) and a long duration (`--im-duration-long`). Some
130 literal transition durations, 80-odd literal whites and blacks over
pictures and every high `z-index` now read them. `h1` and `h2` are fluid.

**Patterns that move** — `im-bg-drift-x`, `im-bg-drift-y`, `im-bg-breathe`,
`im-bg-sweep` beside `im-bg-drift`; all stop under reduced motion.

**Content creation and Live stream** — two new sections and fifteen frames in
`src/components/studio.css`, built around one personal portrait and very
little text: thumbnails in six styles (film, live, travel, tutorial, series,
and a 1080 × 1920 short — each changes one thing), channel art that is the
portrait and the name on a cream or near-black ground with a faint grid,
shown in the docs as YouTube crops it with the channel row under it, profile art that is the portrait in a ring with the
brand's dot, four live scenes and three overlays (1920 × 1080), each a page under `/frames/` at its
real size, previewed scaled in the docs, usable as a screenshot, a browser
source or a layer in an edit. Motion tokens are published as
`assets/im-motion.json` so a cut can share the site's curves.

**The twelve columns** — the page measure is ten columns of the wide one and
the prose measure six, so a centred `im-wrap`, an `im-wrap-wide` and a reading
column sit on the same lines; layouts are measured in the grid rather than in
rems: `--im-col` and `--im-span-2…9` in the tokens; a widget rail is four
columns, a contents rail two, the player's side three, a hero's words seven,
the clip's room five. `im-cols` is the grid for placing things; `im-guides`
draws it on the page, Swiss style — cream hairlines at both edges of every
column behind everything, on unless `data-im-guides="off"`; running text
carries a canvas ground so the lines live in the gutters.

**A skill** — `skills/im-design-system/SKILL.md` teaches an agent the rules
and the shapes; with the MCP server it reads the real components. Documented at
`/guides/ai/`.

**`components/syllabus`** — the curriculum rebuilt: a head that sums the
course and shows progress, units with a line and meta, lesson rows with the
state mark, a still wearing its length, a line about the lesson, what comes
with it and a preview button when free. The same marks as the player's list.

**Widgets** — one docs page per widget under Components › Widgets.

**Author** — `cover`, `badge`, `mini=true`. **Buttons and cards** lift a pixel
and cast `--im-shadow-sm` under the pointer. **Brand** — the top bar shows a
small square (the site icon, or the logo's mark) and the name.

### Changed

The lesson player's lessons fold under the video on a phone (a handle that
opens and closes them) instead of a drawer. The 9:16 watch page is 40 / 60:
the clip centred on the left with nothing over it, the post left-aligned on
the right. The lightbox is a dark theatre with a counter, zoom, the original,
a caption and a strip of every picture. The résumé is a page of its own.

### Removed

`im-lessonmenu`, `im-content-wide`, `components/author-widget` and every
`im-widget-person` / `im-widget-author` / `im-author-card` rule, `im-feed-list`,
the old `im-sitemap`, `im-guestbook`, `im-cv-head` / `im-cv` / `im-cv-side`,
`im-skills`, `im-auth-wide`, `im-bg-surface`.

## 0.7.0 — 23 September 2026

The collections release. Fourteen content collections, the pages a personal
site needs, and one look across all of them.

### Added

**Collections** — every one has a listing, a card and a single page:
post, project, series, course, video (with playlists, shorts and a reel
page), shop, newsletter, uses, snippets, prompts, travel, experience,
tags, timeline and archive.

**Pages** — about, now, contact, membership, sign in / sign up (one card
with a switch), forgot password, guestbook, résumé, sitemap, and a
personal home that lists every collection.

**Components** — `im-syllabus` and `im-coursenav` (the curriculum and the
lesson rail), `im-editor` (a code window, dark for a single page and plain
for a card), `im-chat` (a prompt as the conversation it is), `im-stream`
(one column every collection writes into), `im-letter`, `im-tripfeature`,
`im-region`, `im-country`, `im-legs` (an itinerary of days, not dates),
`im-bento`, `im-schedule`, `im-deck`, `im-serieshero`, `im-mediabg`
(picture or clip behind words, with a scrim, a blend or a knockout),
`im-tiers`, `im-auth`, `im-sitemap`, `im-rating` and `im-review`,
`im-offer`, `im-cv`, `im-guestbook`, `im-story`, `im-featured`.

**Colour** — the primary is `#f22f46`, and one colour per collection is
derived from it with relative colour syntax (`oklch(from var(--im-accent)
l c calc(h - 140))`), so changing the primary moves the whole set. The
kind chip, the stream mark, the timeline kind, the topic face and the
collection head all read the same variable.

**Marks** — one play mark and one lock mark for every still in the system
(`im-thumb-play`, `im-thumb-lock`); members-only cards blur the picture and
write the gate on it; featured is a dot on the picture that opens into a
word on hover.

**Tooling** — an MCP server (`npm run mcp`) so an assistant can build with
the system; `scripts/unused-css.mjs`; a build-time guard that names any
fixture field a Ghost helper shadows; a helpers and utilities reference.

### Changed

- Phone rules live in one file (`src/layout/responsive.css`): gutters,
  wrapping control rows, stacking heads, rails going static.
- Layout knobs are classes (`im-stack-md`, `im-grid-lg`, `im-max-sm`,
  `im-art-travel`…). A `style=` on a template is now only ever data.
- The phone menu is an accordion of sections, not ninety links in columns.
- Sticky rails never clip and never scroll inside themselves.
- Active states are a light fill and a heavier label, everywhere.
- One grid gap, one hover, one card typography across every collection.
- The docs' top bar and footer read the full name.

### Removed

- The journal collection, replaced by the timeline.
- The bucket list collection, folded into Experience — a done bucket item
  is an experience.
- The separate post article page; there is one post layout.
- The Swiss style scope (0.6), the reaction rail on short pages, and 117
  rules of CSS orphaned by these moves. The unused-CSS audit returns zero.

## 0.6.0

One look: the style scope removed, the logo set in live text, collections
begun.
