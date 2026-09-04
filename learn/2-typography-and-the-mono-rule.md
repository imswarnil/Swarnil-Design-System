# 2 · Typography, and the rule that mono is a signal

*Written at the end of Phase 2. Every number here is from this repo.*

---

## The complaint

> "use mono font as primary font regular or thin style not these just use Space Grotesk +
> Inter replace mono with inter in some cases you can use Mono like timestamp etc but very
> rare use"

Translated into a measurement: **171 places in `src/` set the monospace face.** The
sidebar, every section label, "ON THIS PAGE", the sponsor box, the pager, the footer
tagline, and — the worst one — a table whose left column held full sentences:

> `The site and the channel are one system`
> `The platform is the framework`

Set in IBM Plex Mono, inside `<code>` tags. Those are beliefs, not code.

The system's own `PRINCIPLES.md` #9 already said this:

> The mono voice is metadata only. Timecodes, labels, dimensions, code. The moment mono
> carries a sentence, it stops meaning "this is data".

So this was not a missing rule. It was **a stated rule the code did not follow** — which
is the most common way design systems rot, and the reason §"a rule that isn't executable
is a rule that will be broken" from lesson 1 keeps coming back.

---

## Why monospace reads as "machine"

Worth knowing *why* the instinct to use mono everywhere is wrong, not just that it is.

Monospace exists because of a mechanical constraint: a typewriter's carriage advanced by
a fixed distance, so every glyph had to occupy the same width. An `i` was stretched with
serifs; an `m` was squeezed. Nobody chose that as a look — it was the cost of the machine.

Then it became the convention for terminals, punch cards and code listings, because
fixed-width columns let you align things and count characters. So a century of context
attached one meaning to the face: **this text came from, or goes into, a machine.**

That meaning is useful. `00:12:47` in mono reads instantly as a timecode. `1280 × 720`
reads as dimensions. `v2.1.0` reads as a version. The reader does not have to be told.

But meaning works by contrast. If the nav is mono, the labels are mono, the footer is
mono and the tagline is mono, then mono means nothing at all — it is just the site's font,
and the timecode loses the very quality you wanted it for. **A signal used everywhere
stops being a signal.** Same argument as the one accent colour, applied to type.

There is a second, plainer cost. Monospace is measurably slower to read in long runs: the
distorted widths damage word-shape, which is what your eye actually uses to recognise
words without reading letters. Fine for a line of code you scan symbol by symbol. Bad for
a sentence.

---

## What we actually changed

The obvious move is "swap mono for Inter everywhere". That is wrong, because it throws
away the real timecodes with the fake ones.

Instead we **split the role in two**, which is the useful general technique: when one
token is doing two jobs, the fix is usually a second token, not a different value.

```css
--font-label: var(--font-body);    /* Inter — a LABEL */
--font-slate: 'IBM Plex Mono', …;  /* mono  — DATA */
```

Now a call site declares its own intent, and you can read the intent without rendering it:

```css
font-family: var(--font-label);   /* this is a label */
font-family: var(--font-slate);   /* this is data */
```

Note `--font-label` points at `--font-body` rather than naming Inter again. A label is not
a different *face* from body copy — it is the same face worn differently. Encoding that as
an alias means changing the body font changes labels too, which is what you want, and it
makes the relationship visible in the token file.

### The label voice is uppercase and tracked, not monospace

The thing that makes a label read as a label was never the monospace. It is:

- **small size** — it is subordinate to what it labels
- **uppercase** — no ascenders or descenders, so it reads as a block, not a sentence
- **letter-spacing** — uppercase letterforms sit too tight by default, because type
  designers space lowercase pairs and caps inherit those gaps
- **weight** — semibold, not medium. At 12px uppercase, Inter at 500 goes muddy against
  body copy, and the one job of a label is to not look like body copy.

One detail that matters and is easy to get wrong. The mono voice used `0.14em` tracking.
Reusing that for Inter looks broken, because **monospace glyphs are already far apart** —
that generous spacing is the fixed-width grid, not a design choice. Proportional letters
need roughly half of it:

```css
--tracking-label: 0.08em;   /* Inter uppercase */
--tracking-slate: 0.14em;   /* mono uppercase */
```

So the migration had to flip **two** properties per rule, in the same block. A script that
only changed `font-family` would have left ~15 rules rendering Inter at mono tracking —
which looks worse than what we started with.

### The result

| | Before | After |
| --- | --- | --- |
| Mono applications in `src/` | 171 | **61**, all genuine data |
| Flipped to the label voice | — | 65 rules |
| Docs chrome (`preview.css`) | 24 mono | 8, all data |
| Markup classes flipped | — | 55 |

`src/4-broadcast/` was left alone on purpose: it exports to YouTube and Instagram, not to
a website, and mono-as-camera-language is deliberate there. It becomes `creator/` in
Phase 7 and gets its own rules.

---

## The part that generalises: make the rule executable

Fixing 171 call sites is a one-day job. Keeping them fixed is the actual problem — in six
months someone adds a component, reaches for the mono voice because it "looks technical",
and the rot restarts. Lesson 1 said it: a rule without a test is a wish.

So Phase 2 shipped `scripts/audit-mono.py`, which fails CI on:

1. any `font-family: var(--font-slate)` outside an explicit allowlist, and
2. any rule setting `--tracking-slate` while rendering in a proportional face —
   the subtle bug the migration itself could have introduced.

The allowlist is the interesting design decision. It is not a config file of patterns; it
is 61 named selectors, each an assertion that what renders there is data:

```python
'src/3-components/35-timeline.css': {'.tl__node', '.tl__time'},
'src/2-elements/11-badge.css': {'.chip__count', '.kbd', '.timecode'},
```

Adding to it is deliberate and reviewable. You cannot widen the rule by accident — you
have to write down the claim "this is data" next to a selector, where someone can disagree
with you in code review. That is the whole trick to making a taste rule survive contact
with a team, or with yourself in a year.

The script was verified by **breaking it on purpose** — injecting a mono declaration into
`.cta__kicker` and confirming exit code 1 with a useful message — because an audit that
has never failed is an audit you have not tested.

---

## The scale, and one honest deviation

`approach.md` §6 specifies `sm .875 / lg 1.125 / xl 1.25`, fluid via `clamp()` **from 2xl
up**. Two corrections landed:

- `--text-sm` was `0.8125rem` (13px), now `0.875rem` (14px)
- `--text-lg` and `--text-xl` were fluid `clamp()`; now fixed

The second is worth explaining, because "more fluid" sounds strictly better. It is not.
`lg` and `xl` are what **UI copy** is set in, and UI copy has to fit inside a component —
a card, a button, a table cell. A size that drifts with the *viewport* is being decided by
something that has nothing to do with the box it lives in. Fluid type earns its keep on
headlines, where the text spans the page. Below that it just makes layouts unpredictable.
(This is the same argument as container queries beating media queries, which is Phase 10.)

**The deviation:** §6's scale tops out at `5xl 3.5rem`, while this system's display sizes
run to `6xl 7rem`, which is what the homepage headline uses. Truncating the top of the
scale would have shrunk the hero by half. §6 reads as the *core* scale with display sizes
sitting above it, so the display ceilings were left alone. Flagged here rather than
silently done, because "I followed the spec" and "I followed the spec except for the part
I disagreed with" are very different claims.

---

## What it looks like

Same page, before and after — no layout change, no colour change, only the voice:

- Sidebar groups, `ON THIS PAGE`, `SUPPORT`, the pager, the footer → Inter
- `TAKE 47 · 00:12:47`, `04:12 / 11:38`, `VIDEO · 16:9` → still mono
- The beliefs table → bold Inter sentences instead of `<code>`

That last one needed a markup fix, not a CSS fix. The table was built by a helper called
`ct()` — *a class-reference table* — whose first column is wrapped in `<code>`, which is
exactly right when that column holds class names. It was being reused for a table of
beliefs. The fix was a `code=False` parameter, not a change to the helper's default,
because the default was never wrong for its actual job.

**When a component is misused, fix the call site. Changing the component to suit the
misuse breaks it for everyone using it correctly.**

---

## Two bugs this phase surfaced by accident

**1. The docs had a frozen cache-buster.** Every asset URL carried `?v=cds25` — a literal
that never changed. So a rebuild changed the CSS but not its URL, and the browser served
the old copy. I spent a round convinced the migration had failed when it had actually
worked; the served file was correct and the browser was lying. Now:

```python
def _stamp():   # newest mtime across src/, preview.css, preview.js
    return f'?v={int(newest):x}'
```

It changes exactly when the CSS changes, and not otherwise. **A cache-buster that never
busts is worse than none**, because it converts "you forgot to reload" into "the code
doesn't work", and you debug the wrong thing.

**2. `.t-slate` on the docs footer was uppercasing a sentence.** Flipping the face to
Inter made this visible rather than fixing it: `FRAME & SIGNAL · FOR CREATORS BUILDING
THEIR SITE.` is a tagline, not a label, and no font choice rescues a shouted sentence. It
became `.t-small` in sentence case.

The lesson is that **the mono was hiding a second mistake.** When everything looks
uniformly technical, you cannot see that a sentence has been miscategorised as a label.
Cleaning one layer of a design usually exposes the layer underneath — which is normal, and
a reason to fix things in an order where you can see each result.

---

**Next:** `3-…` — the frame layer, and what moving one file taught about the cascade.
