# Prompting an image model for this site

Everything here is for generating **thumbnails, covers and og-images that look
like they belong to Im Design System** — not generic stock art. Copy a block,
fill the `[brackets]`, paste it into whatever model you are using.

The first section is the part that matters. An image model has never seen this
site, so every prompt has to carry the whole look with it; a prompt that says
"in my brand style" produces somebody else's brand.

---

## The context block — paste this first, every time

> **Visual system.** Swiss-influenced editorial design. Near-monochrome: a
> warm off-white ground (`#fafafa`), near-black ink (`#0a0a0a`), and exactly
> one accent — a warm orange-red (`#ff5a1f`) used for **one** element per
> image and never as a fill behind text. Generous flat white space. Hairline rules
> (1px, light grey) rather than boxes or shadows. Geometric sans-serif type,
> tight tracking, left-aligned. No gradients, no glows, no glass, no 3D
> bevels, no drop shadows, no lens flare, no bokeh. Flat, printed, calm.
> Composition sits on a grid with a clear margin. If type appears it is short,
> real words, correctly spelled, in a single weight.

Then add **one** of the shape blocks below.

---

## Shapes

### Post cover — 16:10

> [CONTEXT BLOCK]
>
> Subject: [what the post is about, in one concrete noun phrase — "a cliff
> road above the sea at dusk", not "travel"].
> Treatment: photographic, natural light, muted colour, slightly
> desaturated. One clear subject, lots of sky or ground for the headline to
> sit on. Nothing centred; the subject sits in the left or right third.
> Aspect ratio 16:10. No text, no logos, no watermarks.

### Project shot — 16:9

> [CONTEXT BLOCK]
>
> Subject: an abstract representation of [what the project does], built only
> from: hairline grid lines, one filled quarter-circle in the accent, small
> registration crosses, and one solid near-black square. Flat vector, no
> perspective, no shading. Large empty areas. Aspect ratio 16:9.

### Video / series still — 16:9

> [CONTEXT BLOCK]
>
> Subject: [the scene]. Photographic, cinematic but not graded — no teal and
> orange, no crushed blacks. Room in the lower third for a title bar.
> Aspect ratio 16:9. No text.

### Short / vertical — 9:16

> [CONTEXT BLOCK]
>
> Subject: [the scene], framed vertically with the subject in the upper
> two-thirds. The **bottom third must be quiet** — flat colour, water,
> sky or shadow — because a caption and a row of controls sit over it.
> Aspect ratio 9:16. No text.

### Product / shop — 16:10

> [CONTEXT BLOCK]
>
> Subject: [the product] presented as a flat editorial still life on the
> off-white ground, lit softly from the upper left, one soft contact shadow
> only. No reflections, no studio sweep, no gradient backdrop.
> Aspect ratio 16:10.

### Tag / topic panel — 3:2

> [CONTEXT BLOCK]
>
> Subject: an abstract line pattern only — [isometric grid / concentric rings
> / vertical rules / diagonal hatch] — drawn in thin lines in [the tag's
> colour] on the off-white ground, fading out towards the edges. No objects,
> no symbols, no type. Aspect ratio 3:2.

### Open-graph image — 1200×630

> [CONTEXT BLOCK]
>
> A 1200×630 social card. Left two-thirds: the headline "[headline]" in two
> lines of geometric sans, near-black, tight tracking, left-aligned, large.
> Right third: [a small abstract mark / the subject photograph]. A single
> orange-red dot at the top right of the last word of the headline. One
> hairline rule under the headline. Nothing else.

---

## The dot

The brand mark is a word with a small accent dot at the **top right of its
last letter**. Image models get this wrong more often than they get it right,
so:

- Ask for it explicitly: *"a small solid orange-red circle, about the size of
  a full stop, positioned at the top right of the final letter, not touching
  it"*.
- Never ask a model to render the logo **and** other type in one image —
  generate the art without type and set the wordmark in HTML over it. The
  system's logo is live text for exactly this reason.

## Checking the result

Reject and regenerate if any of these are true:

1. **There is more than one accent colour**, or the accent is a gradient.
2. **There is a drop shadow, a glow or a glass panel.** The system has one
   shadow and it is only for things that float.
3. **Type is misspelled, or is fake-language filler.** Better to have none.
4. **The subject is centred with even margins.** Nothing here is centred.
5. **It could be any SaaS company's blog header.** That is the failure mode
   the context block exists to prevent — if it looks like a stock illustration
   of people pointing at a laptop, start again with a more concrete subject.

## Where the images go

| Collection | Ratio | Component |
| --- | --- | --- |
| Post | 16:10 | `im-post-card-media` |
| Project | 16:9 | `im-repo-media` · `im-shot` |
| Video, series | 16:9 | `im-vidcard-thumb` |
| Short | 9:16 | `im-vidcard-tall` · `im-short-player` |
| Course lesson | 16:10 | `im-lesson-shot` |
| Shop | 16:10 | `im-product-media` |
| Experience | 4:3 | `im-exp-media` |
| Uses | 1:1 | `im-affiliate-media` |
| Travel | 3:2 | `im-exp-media` on `im-trip` |
| Newsletter | — | none: the date is the thumbnail |
| Tag | 3:2 | `im-taghero-art`, or the built-in pattern |
| Journal | — | none, usually |

**Two of those rows have no image on purpose.** A newsletter issue uses its
date as the thumbnail and a journal entry has nothing; generating art to fill
those is the beginning of a site made of stock photographs. If a collection
has no natural picture, use a pattern (`im-bg-*`) or use nothing.

## Alt text

Whatever generated the image, the `alt` describes **what is in it**, for a
reader who cannot see it — never "AI-generated image" and never the prompt.
A decorative pattern gets `alt=""`.
