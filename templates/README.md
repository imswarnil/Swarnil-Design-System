# Templates

Whole pages built out of the system and nothing else. Each is a static HTML
file that loads the design system and a short glue stylesheet
(`templates.css`) for page composition — the one thing a design system
deliberately does not own.

| Page | What it is |
| --- | --- |
| `personal/index.html` | a personal homepage — hero, numbers, what-I-make, latest episodes, writing, build log, courses, travel strip, newsletter |
| `blog/index.html` | a blog home with two levels — the front (featured + latest) and the feed (everything, filterable, with a rail and pagination) |
| `blog/post.html` | the reading page — page head, prose at 66ch with a sticky chapters rail, pull quote, code player, figure, footnotes, author, pager, thread |

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
