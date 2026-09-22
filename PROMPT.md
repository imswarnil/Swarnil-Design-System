# Prompting an image model for this site

Prompts for thumbnails, covers and posters that belong to **Im Design System** and the theme
built on it. Paste the **context block** first, every time, then one **shape block**. Fill the
`[brackets]`.

The site's look, so the model does not invent one: near-monochrome, warm off-white ground
(`#fafafa`) or near-black (`#0a0a0a`), one accent — orange-red `#ff5a1f` — used for **one**
element, never behind text. Hairlines, not boxes. Geometric sans (Geist), tight tracking, left
aligned. Line patterns — grid, blueprint, hatch, rings, isometric — as marks, faded to one edge,
never as wallpaper. Photographs are natural light, muted, one subject off-centre. No gradients,
glows, glass, 3D, bokeh, lens flare, stock people.

---

## The context block

> **Visual system.** Editorial, Swiss-influenced, near-monochrome. Ground: warm off-white `#fafafa`
> (or near-black `#0a0a0a` when asked). Ink: `#0a0a0a`. One accent: orange-red `#ff5a1f`, on exactly
> one element, never as a fill behind text. Hairline rules (1px, light grey) instead of boxes or
> shadows. If type appears: geometric sans-serif, tight tracking, left aligned, short real words,
> one weight. Composition on a grid with a clear margin; the subject sits in a third, never
> centred. No gradients, glows, glass, bevels, drop shadows, lens flare, bokeh. Flat, printed, calm.

---

## Shapes, by collection

### Blog post cover — 16:10
> [CONTEXT] Subject: [one concrete noun phrase — "a cliff road above the sea at dusk", not
> "travel"]. Photographic, natural light, muted, slightly desaturated. One clear subject in the
> left or right third; quiet sky or ground on the other side. 16:10. No text, logos, watermarks.

### Blog post, no photograph — 16:10 (a mark instead)
> [CONTEXT] An abstract mark for [the topic]: one filled shape in the accent, two or three
> hairlines, and one solid near-black shape, on the off-white ground, all in the left third.
> Flat vector, no perspective, no shading. Large empty area on the right. 16:10.

### Course cover — 16:9
> [CONTEXT] A course about [subject]. Left two-thirds: an abstract diagram of the idea — [e.g. two
> stacked layers with a line between them] — drawn in hairlines with ONE element in the accent.
> Right third empty, for the title. Off-white ground. Flat, no perspective. 16:9. No text.

### Course lesson still — 16:10
> [CONTEXT] A still that stands for one lesson: [the single thing this lesson shows — "a
> colour swatch flipping from light to dark"]. Same diagram language as the course cover, so all
> seven read as a set: hairlines, one accent element, off-white ground. 16:10. No text.

### Series / episode poster — 16:9 (and 2:3 for a poster)
> [CONTEXT] A film still from [the scene]. Cinematic framing, natural light, not graded — no
> teal-and-orange, no crushed blacks. Room in the lower third for a title bar. 16:9. No text.
> For the poster: the same scene, 2:3, subject in the upper two-thirds.

### Video thumbnail — 16:9
> [CONTEXT] [The scene], photographic, with one strong shape the eye lands on. Space on one
> side for a two-word title set in the theme. Nothing centred. 16:9. No text, no arrows, no
> circled faces.

### Short / reel — 9:16
> [CONTEXT] [The scene], vertical, subject in the upper two-thirds. The bottom third must be
> quiet — flat colour, water, sky, shadow — for the caption. 9:16. No text.

### Playlist cover — 16:9
> [CONTEXT] Four stills from [the series] as a strict 2×2 grid with 8px white gutters, each
> one muted and matched in exposure. No frame, no title. 16:9.

### Project shot — 16:9
> [CONTEXT] An abstract representation of [what the project does], built only from hairline grid
> lines, one filled quarter-circle in the accent, small registration crosses, one solid
> near-black square. Flat vector. Large empty areas. 16:9.

### Product / shop — 16:10
> [CONTEXT] [The product] as a flat editorial still life on the off-white ground, soft light from
> the upper left, one soft contact shadow only. No reflections, no sweep, no gradient. 16:10.

### Thing I use — 1:1
> [CONTEXT] [The object] alone, three-quarter view, on the off-white ground, soft top-left light,
> a single soft contact shadow. Nothing else in frame. 1:1.

### Experience — 4:3
> [CONTEXT] [The moment — "a diver at the lip of a blue sinkhole"], photographic, natural light,
> the person small in a large environment. Muted. 4:3. No text.

### Trip — 3:2 (card) and 21:9 (hero)
> [CONTEXT] [The place], a landscape with a road, a path or a coastline leading into it from one
> corner. Natural light, early or late in the day. Muted. 3:2. For the hero: the same place,
> 21:9, subject in the lower third so the title sits over sky.

### Tag / topic panel — 3:2
> [CONTEXT] An abstract line pattern only — [isometric grid / concentric rings / vertical rules /
> diagonal hatch] — thin lines in [the tag's colour] on the off-white ground, fading out to the
> left. No objects, no symbols, no type. 3:2.

### Newsletter — none
A letter uses its date as the thumbnail. Only generate art for a letter that genuinely has a
picture; a placeholder standing in for one that was never taken is the one thing that does not
work.

### Membership / offer — 16:9
> [CONTEXT] A near-black ground `#0a0a0a`. One accent shape — a filled circle, top right. Three
> hairlines in grey. Nothing else. 16:9. (The price is set in HTML over it.)

### Open-graph card — 1200×630
> [CONTEXT] Left two-thirds: the headline "[headline]" in two lines of geometric sans, near-black,
> tight tracking, left aligned, large. Right third: [a small abstract mark / the subject
> photograph]. One orange-red dot at the top right of the headline's last word. One hairline under
> the headline. Nothing else.

### Avatar — 1:1
> [CONTEXT] A head-and-shoulders portrait, natural window light from one side, plain mid-grey
> background, direct gaze, no smile required. Muted. 1:1.

### Site banner — 1200×360
> [CONTEXT] Off-white ground. Right half: a hairline grid fading to the left. Left: empty, for
> the wordmark. One orange-red dot anywhere in the right half. Nothing else.

---

## The dot

The brand mark is a word with a small accent dot at the **top right of its last letter**. Ask for
it explicitly — *"a small solid orange-red circle, the size of a full stop, at the top right of the
final letter, not touching it"* — and never ask a model to set the wordmark **and** other type in
one image. Generate the art without type; the theme sets the words.

## Dark ground

Add to the context block: *"Ground: near-black `#0a0a0a`; ink: off-white `#fafafa`; hairlines
mid-grey."* Everything else stays. Use it for the membership offer, the course rail, the
footer — the parts of the site that are already inverted.

## Reject and regenerate if

1. More than one accent colour, or the accent is a gradient.
2. A drop shadow, glow or glass panel.
3. Type that is misspelled or fake-language filler — better none.
4. The subject is centred with even margins.
5. It could be any SaaS company's blog header.

## Where each goes

| Collection | Ratio | Component |
| --- | --- | --- |
| Post | 16:10 | `im-post-card-media`, `im-posthero-media` |
| Course cover | 16:9 | `im-mediabg` on the course page |
| Lesson | 16:10 | `im-lesson-shot`, `im-lessonnav-item img` |
| Series, episode | 16:9 | `im-seriescard-media`, `im-vidcard-thumb` |
| Video | 16:9 | `im-vidcard-thumb`, `im-video-poster` |
| Short / reel | 9:16 | `im-vidcard-tall`, `im-shortwatch-player` |
| Playlist | 16:9 | `im-playlist .im-vidcard-thumb` |
| Project | 16:9 | `im-repo-media`, `im-projectcover` |
| Shop | 16:10 | `im-product-media` |
| Uses | 1:1 | `im-affiliate-media` |
| Experience | 4:3 | `im-exp-media` |
| Trip | 3:2 · 21:9 | `im-tripcard`, `im-cinehero` |
| Tag | 3:2 | `im-collhead-art` (or a pattern class) |
| Timeline milestone | 16:9 | `im-timeline-shot` |
| Newsletter | — | the date tile |

## Alt text

`alt` describes **what is in the picture**, for someone who cannot see it — never "AI-generated"
and never the prompt. Decoration gets `alt=""`.
