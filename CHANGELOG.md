# Changelog

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
