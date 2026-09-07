---
title: Typography
group: Foundation
order: 50
lead: One face. Monospace is not a second voice — it is a tool, and it comes out only for code.
---

## The four voices

| Token | Face | Job |
| --- | --- | --- |
| `--font-display` | Inter | Headlines, numbers, the mark |
| `--font-body` | Inter | Everything read in sentences |
| `--font-label` | Inter | Worn small, uppercase, tracked, **semibold** |
| `--font-data` | Inter | Worn small, tracked, **light**, tabular figures |
| `--font-mono` | IBM Plex Mono | **Code only** |

`--font-display`, `--font-label` and `--font-data` are all *aliases* of the body
face on purpose. A headline, a label and a timecode are not different faces from
body copy; they are the same face worn differently — by weight, size and
tracking. Change `--font-body` and all four follow, which a second family name
would quietly prevent.

The token still exists, so a display face is one line away:

```css
:root { --font-display: "Your Display Face", sans-serif; }
```

Nothing else has to change — every heading and `.t-*` role already reads that
token.

:::demo The same face, four ways
<div class="stack stack-sm">
  <p class="spec-display spec-2xl u-m-0">Inter sets the headlines</p>
  <p class="u-m-0">Inter sets everything you actually read, in sentences like this one.</p>
  <p class="t-label u-m-0">A label · Inter, semibold, uppercase</p>
  <p class="t-data u-m-0">00:12:47 · 1280 × 720 · v2.1.0</p>
  <p class="t-mono u-m-0">const accent = "oklch(63% 0.19 34)";</p>
</div>
:::

## Why one face and not a pairing

A display face earns its keep only if it says something the body face cannot.
Set Inter at 600, close the tracking to `-0.02em` and take the size to
`2.5rem`, and it already reads as a headline. The **size** and the **tracking**
are doing that work — not the family. A second family layered on top changes the
*flavour* of the headline without changing what it communicates.

What it does cost is concrete:

| | |
| --- | --- |
| **a file** | another download on the critical path |
| **a FOUT** | another swap to sequence and pay for |
| **a decision** | display or body? — at every new call site |
| **a mismatch** | headline metrics that no longer match the paragraph below |

Hierarchy here comes from weight, size and tracking, which is why the scale and
the tracking table below carry the weight they do.

## Why the data voice is not monospace

This is the change worth explaining, because the received wisdom says the
opposite.

The usual argument for setting timecodes and counts in mono is **alignment** —
fixed-width glyphs make a column of numbers line up. That argument is true about
the 1970s and false about Inter, which ships proper **tabular figures**:

```css
font-variant-numeric: tabular-nums;
```

That gives every digit the same advance width *in a proportional face*.
`00:12:47` lines up in Inter exactly as well as it does in Plex Mono.

So alignment was never the real reason. The real reason was that mono **looks**
technical — and once everything technical is mono, mono stops meaning anything
and the page just reads like a build log.

What actually makes a number read as data is four properties, none of which is a
typeface:

| | |
| --- | --- |
| **light** | it recedes — data supports the thing, it is not the thing |
| **tracked** | at 11–12px the counters close up without it |
| **small** | data is subordinate by definition |
| **tabular** | every digit the same width, so columns align |

:::demo Both columns are Inter. Only the right one has tabular figures.
<div class="grid-2">
  <div class="stack stack-sm">
    <p class="t-label u-m-0">Proportional</p>
    <p class="u-m-0">00:11:07</p>
    <p class="u-m-0">01:48:32</p>
    <p class="u-m-0">11:09:14</p>
  </div>
  <div class="stack stack-sm">
    <p class="t-label u-m-0">Tabular</p>
    <p class="t-data t-data-strong u-m-0">00:11:07</p>
    <p class="t-data t-data-strong u-m-0">01:48:32</p>
    <p class="t-data t-data-strong u-m-0">11:09:14</p>
  </div>
</div>
:::

Monospace survives in exactly one place — **code** — where it does real work:
`l` `1` `I` and `O` `0` must be distinguishable, indentation must align, and a
character count must mean something. Nothing else qualifies, and
`scripts/audit-mono.py` fails the build on any mono use outside that allowlist.

The audit also enforces the other half: a rule that sets the data voice **must**
declare tabular figures. Without them you have given up the one property that
justified leaving monospace, and a column of numbers goes ragged.

## The scale

Fluid via `clamp()` **from 2xl up**, fixed below. `lg` and `xl` are what UI copy
is set in, and UI copy has to fit inside a *component*, not inside a page. A size
that drifts with the viewport is being decided by something with no relationship
to the box it lives in.

:::demo
<div class="stack stack-sm">
  <p class="t-h1 u-m-0">Heading 1 · 4xl</p>
  <p class="t-h2 u-m-0">Heading 2 · 3xl</p>
  <p class="t-h3 u-m-0">Heading 3 · 2xl</p>
  <p class="t-h4 u-m-0">Heading 4 · xl</p>
  <p class="t-lead u-m-0">Lead · lg — the sentence that sells the page.</p>
  <p class="u-m-0">Body · base. The size everything else is measured against.</p>
  <p class="t-small u-m-0">Small · sm — captions and secondary detail.</p>
  <p class="t-fine u-m-0">Fine · xs — legal, footnotes, the small print.</p>
</div>
:::

## Tracking

Display tightens as it grows, because the gaps between letters grow with the size
while the eye's tolerance for them does not. **Small text goes the other way** —
at 11px the counters close up, so opening the tracking is what keeps it legible.
That is the entire trick behind the label and data voices.

| Token | Value | For |
| --- | --- | --- |
| `--tracking-tighter` | −0.035em | display sizes |
| `--tracking-tight` | −0.02em | headings |
| `--tracking-normal` | 0 | body |
| `--tracking-wide` | 0.02em | small caps |
| `--tracking-data` | 0.05em | the data voice |
| `--tracking-label` | 0.08em | the label voice, uppercase |
| `--tracking-widest` | 0.16em | display eyebrows |

## Helper classes

Everything below is a class. None of it needs an inline style.

### Roles

`.t-display` `.t-h1` `.t-h2` `.t-h3` `.t-h4` `.t-h5` `.t-lead` `.t-body`
`.t-small` `.t-fine` `.t-label` `.t-label-sm` `.t-data` `.t-data-sm`
`.t-data-caps` `.t-data-strong` `.t-mono` `.t-stat`

### Numerals

:::demo
<div class="stack stack-sm">
  <p class="t-tabular u-m-0">Tabular — 0123456789 · columns align</p>
  <p class="t-oldstyle u-m-0">Old-style — 0123456789 · numbers inside prose</p>
  <p class="t-lining u-m-0">Lining — 0123456789 · all cap height</p>
  <p class="t-stat u-m-0">1,284</p>
</div>
:::

`.t-tabular` `.t-lining` `.t-oldstyle` `.t-fraction` `.t-stat`

Old-style figures sit on the baseline with ascenders and descenders, so they
belong *inside a sentence*. Lining figures are all cap-height and belong in
tables and stats. Most systems only ship one and get this wrong in one direction
or the other.

### Wrapping and overflow

:::demo
<div class="stack">
  <p class="t-balance u-m-0 w-md"><b>.t-balance</b> — evens out the line lengths of a heading so the last line is never one orphaned word</p>
  <p class="t-truncate u-m-0 w-md"><b>.t-truncate</b> — one line, then an ellipsis, however long the text actually runs on</p>
  <p class="t-clamp-2 u-m-0 w-md"><b>.t-clamp-2</b> — clamps to exactly two lines and then stops, which is what a card excerpt wants, because a card in a grid has to be the same height as the card beside it</p>
</div>
:::

`.t-balance` `.t-pretty` `.t-nowrap` `.t-break` `.t-truncate` `.t-clamp-2`
`.t-clamp-3` `.t-clamp-4`

### Case and decoration

`.t-upper` `.t-lower` `.t-title` `.t-normal-case` `.t-smallcaps`
`.t-underline` `.t-strike` `.t-no-underline`

`.t-smallcaps` uses `font-variant-caps`, so it draws **real** small capitals when
the face has them. Faking small caps by shrinking the font size gives you capital
letters at the wrong stroke weight, which is visible even when you cannot name it.

### Measure, leading, tracking

`.t-measure` `.t-measure-lead` `.t-measure-ui` `.t-measure-narrow`

`.t-leading-flat` … `.t-leading-loose` · `.t-track-tighter` … `.t-track-widest`

66ch is roughly ten words a line, which is where reading speed peaks. Much wider
and the eye loses the start of the next line; much narrower and it jumps too often.

## Long-form: `.prose`

Everything an article needs, from **one** rhythm variable.

:::demo
<article class="prose prose-tight">
  <h2>A heading belongs to what follows it</h2>
  <p>So it sits closer to the next block than to the previous one. That single
  asymmetry is the biggest thing separating typeset text from stacked text, and
  almost nothing on the web does it.</p>
  <p>Spacing comes from <code class="code">--prose-rhythm</code> via the owl
  selector, so space lands <b>between</b> children and never at the top or bottom
  of the container.</p>
  <blockquote>A rule that is not executable is a wish.</blockquote>
  <ul><li>Lists inherit the rhythm</li><li>Markers take the faint colour</li></ul>
</article>
:::

```css
.prose > * + * { margin-block-start: var(--prose-rhythm); }
.prose > :is(h2, h3, h4) + * { margin-block-start: calc(var(--prose-rhythm) * 0.45); }
```

Variants: `.prose-narrow` `.prose-tight` `.prose-loose`.

`.prose` also sets `hanging-punctuation: first last`, which pulls opening quotes
and hyphens into the margin so the left edge of the text block reads straight.

## Drop cap

:::demo
<p class="t-dropcap prose u-m-0">Typography is the craft of making language visible, and most of it is invisible when it works. The drop cap is one of the few devices that announces itself, which is why it belongs at the start of a piece and nowhere else.</p>
:::

`float` plus `line-height: 0.8` is what seats it on the baseline of the third
line. It switches off below 40rem, where three lines is most of the screen.

## Marks a reader would make

Three annotations, and they are the same idea: a shape that is already the
right shape, revealed along `--draw` by a mask — so it looks **drawn** rather
than faded in. That is the whole difference between a highlight and an
animation of one.

They mark a phrase, so they go on an inline element inside a sentence. They
draw as the sentence scrolls into view, which is when a reader is actually
looking at it; without a view timeline they draw on load, which is the honest
fallback rather than a broken one.

:::demo Scroll them out of view and back to run them again
<article class="prose">
  <p class="t-lead">I make things. Then I make a
  <em class="fx-mark">video about it</em> — which is how I found out that
  <em class="fx-circle">explaining</em> is the work, not the by-product, and
  that the part worth keeping is almost always the
  <em class="fx-underline">second half</em>.</p>
</article>
:::

| Class | The mark |
| --- | --- |
| `.fx-mark` | the highlighter — a band on the baseline, not a full-height fill |
| `.fx-circle` | a ring round a word, with uneven radii so it reads as a hand |
| `.fx-underline` | a rule drawn left to right, thicker than a `text-decoration` |

`--mark-ink` sets the highlighter's colour on the instance; the ring and the
underline take the accent.

```html
<em class="fx-mark" style="--mark-ink: var(--craft-soft)">worth keeping</em>
```

Under `prefers-reduced-motion` all three stop being drawn and are simply
**there**. The finished state is the resting state, so nothing is lost.

## The footage, read through the letters

`background-clip: text` cannot take a `<video>`, and a poster frame is not the
effect anybody actually wants. So the cutout is a **knockout**: a solid plate
over the media with the type punched out of it by a blend mode, which works
with any media element underneath, moving or still.

:::demo The clip is playing behind the word
<div class="cutout">
  <video class="cutout__media" src="/assets/media/loop.mp4" poster="/assets/media/loop.jpg" muted loop playsinline autoplay></video>
  <p class="cutout__text">SWARNIL</p>
</div>
:::

The mechanics, once, because they are unobvious: the plate is the **page**
colour and the type is the **inverse** of it. On a light page `screen` keeps
white opaque and turns black clear; on a dark page the same job needs
`multiply`, with the two swapped. Both branches ship, keyed off the theme, so
the effect follows the page rather than assuming one — switch the theme at the
top of this page and watch it hold.

:::demo `.cutout-sm` over a still, and `.cutout-lg` for a band
<div class="stack">
  <div class="cutout cutout-sm">
    <img class="cutout__media" src="/assets/media/night.jpg" alt="" />
    <p class="cutout__text">ON THE ROAD</p>
  </div>
  <div class="cutout cutout-lg">
    <img class="cutout__media" src="/assets/media/coast.jpg" alt="" />
    <p class="cutout__text">S02</p>
  </div>
</div>
:::

`isolation: isolate` on `.cutout` is load-bearing — without it the blend mode
reaches past the box and knocks a hole in the page behind it.
