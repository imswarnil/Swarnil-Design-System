# Templates

Whole pages built out of the system and nothing else. Each is a static HTML
file that loads the design system and a short glue stylesheet
(`templates.css`) for page composition — the one thing a design system
deliberately does not own.

All twelve share one navigation, one footer and one page column
(`center-2xl`), so opening two of them in a row reads as one site rather than
two demos.

| Page | What it is |
| --- | --- |
| `personal/index.html` | the homepage — wide hero, textured tiles, two video shelves, writing, a wall of repo cards, courses, travel, a small newsletter |
| `personal/about.html` | the about page — portrait hero, facts as a `dl`, the long version in prose, an illustrated timeline, the process as steps, credentials as seals, the gear list |
| `video/index.html` | the channel — a featured episode, three shelves (latest, ranked, shorts), series posters, everything filtered with a grid/list switch and pagination, the shorts wall, the kit |
| `video/post.html` | the 16:9 episode — stage with chapter markers, description, timed chapters, transcript, gear used, the code, the thread |
| `video/short.html` | the 9:16 short — a sticky portrait stage, the words beside it, timestamps, and the long version it was cut from |
| `blog/index.html` | the two-level blog home — the front, then the feed with a facet column, search, sort and the view switch |
| `blog/post.html` | the reading page — prose at 66ch with the share rail, pull quote, code player, figure, footnotes, pager, thread |
| `courses/index.html` | the catalogue — the path as a stepper, the track, six course cards, how it works, the FAQ, two plans |
| `courses/course.html` | one course — trailer, sticky enrol card, outcomes, the full curriculum, "four weeks in this order", reviews, instructor |
| `courses/lesson.html` | the lesson player — the classroom: player, lesson tabs, notes, resources, prev/next under the stage, syllabus beside it |
| `projects/index.html` | the portfolio — three case studies, then all thirty-one filtered by skill with a sticky facet column |
| `projects/project.html` | the case study — a masthead that pins and condenses, the numbers, the argument, the build log, the releases |

They are copied into `site/templates/` by the docs build, framed on the docs'
**Templates** page, and audited like every docs page: a class a template uses
must be defined by the system or by `templates.css`.

## Taking one

1. Copy the page and `templates.css`.
2. Replace `<link rel="stylesheet" href="/src/index.css">` with the CDN link
   (`https://cdn.jsdelivr.net/npm/@imswarnil/swarnil-design/dist/swarnil-design.min.css`)
   or the npm import, and point `/assets/fonts.css`, `/icons/sprite.svg` and
   `/src/js/nav.js` at your own copies.
3. Replace the inline gradient placeholders (`data:image/svg+xml,…`) with real
   images. They exist only so the templates carry no binary assets.

## The rule

A template may use any class on the docs site, set a token on an instance
(`style="--stack-gap: var(--space-8)"`), and add a `tpl-*` glue class for
page composition. It may **not** style a component. If a template needs a card
to look different, the card is missing a variant, and the variant is written
in `src/`.
