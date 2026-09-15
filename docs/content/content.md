---
title: Article
group: Elements
order: 50
lead: Everything that goes inside a piece of writing — headings, lists, quotes, pictures, video, a carousel, a stepper, an ad, a product, a link out, and the sources at the bottom.
---

A design system is usually good at the chrome and vague about the middle. This
page is the middle: the twenty-odd things that actually appear inside an
article, in the order you meet them, each with the markup to copy.

Everything here sits inside `.prose`, which styles the **bare tag** — so a
heading is an `<h2>`, a list is a `<ul>`, and a component dropped into the
column keeps its own dress. See [Page structure](/structure.html) for why the
column exists and how wide it is.

## Headings and body

Hierarchy is weight, size and tracking — one typeface doing all of it. There is
no second face to introduce, so an `<h3>` never looks like a different
document's `<h2>`.

:::demo
<article class="prose">
  <h2>Colour, in one block of tokens</h2>
  <p>Eight ramps, ninety-seven tones, and why dark mode is not an inversion. I
  rebuilt the whole colour layer from an empty file and ended up deleting more
  than I added.</p>
  <h3>The two tiers</h3>
  <p>A ramp step is <code class="code">--ink-500</code>. What a step is <em>for</em>
  is <code class="code">--fg-muted</code>. A component may only read the second,
  and that one rule is the entire customisation API.</p>
  <h4>A fourth level, for a long reference page</h4>
  <p>Below this, use a paragraph in <strong>bold</strong>. A fifth heading level
  is a sign the page is two pages.</p>
</article>
:::

## Lists

:::demo Unordered, ordered, and a definition list for facts
<div class="switcher">
  <article class="prose">
    <ul>
      <li>Build the thing first — no script until it works</li>
      <li>Write the one sentence it is about
        <ul><li>If it needs two, it is two videos</li></ul>
      </li>
      <li>Shoot the ending before the middle</li>
    </ul>
  </article>
  <article class="prose">
    <ol>
      <li>Model the data</li>
      <li>Write the recipe</li>
      <li>Build the dashboard</li>
    </ol>
  </article>
</div>
:::

:::demo A definition list — the spec sheet, not a paragraph pretending to be one
<dl class="dl dl-lined">
  <dt>Shot on</dt><dd>Sony FX3, 4K 50p, S-Log3</dd>
  <dt>Lens</dt><dd>Sigma 24-70 f/2.8, the whole channel</dd>
  <dt>Light</dt><dd>One key, bounced off a wall</dd>
  <dt>Cut in</dt><dd>DaVinci Resolve 19</dd>
</dl>
:::

## How they load

An article arrives in pieces, and the pieces have a shape before they have
content. The skeleton is that shape: **it is not a spinner**. A spinner says
"something is happening somewhere"; a skeleton says "a heading will be here,
this wide, and the page will not jump when it arrives".

Every skeleton below reserves the exact box its content will fill, which is why
using them removes layout shift rather than merely disguising it.

:::demo The same article, before it arrives
<div class="stack" style="--stack-gap: var(--space-6)">
  <div class="stack stack-sm">
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text skeleton-text-short"></div>
  </div>
  <div class="skeleton skeleton-media"></div>
  <div class="cluster">
    <div class="skeleton skeleton-avatar"></div>
    <div class="stack stack-sm" style="flex: 1">
      <div class="skeleton skeleton-text skeleton-text-short"></div>
      <div class="skeleton skeleton-text"></div>
    </div>
  </div>
  <div class="cluster"><div class="skeleton skeleton-btn"></div><div class="skeleton skeleton-btn"></div></div>
</div>
:::

`.skeleton-breathe` adds the slow pulse; without it the skeleton is a still
grey box, which is the correct fallback under reduced motion and is what the
class becomes there.

:::demo A whole card, breathing
<div class="grid-2 cq-card">
  <div class="skeleton-card">
    <div class="skeleton skeleton-media skeleton-breathe"></div>
    <div class="stack stack-sm p-4">
      <div class="skeleton skeleton-text skeleton-text-short skeleton-breathe"></div>
      <div class="skeleton skeleton-title skeleton-breathe"></div>
      <div class="skeleton skeleton-text skeleton-breathe"></div>
    </div>
  </div>
  <div class="stack">
    <div class="cluster cluster-sm"><div class="skeleton skeleton-circle"></div><div class="skeleton skeleton-text skeleton-text-short" style="flex:1"></div></div>
    <div class="cluster cluster-sm"><div class="skeleton skeleton-circle"></div><div class="skeleton skeleton-text" style="flex:1"></div></div>
    <div class="cluster cluster-sm"><div class="skeleton skeleton-circle"></div><div class="skeleton skeleton-text skeleton-text-short" style="flex:1"></div></div>
    <div class="loading loading-scan"><span class="loading-dim">Fetching the next twelve…</span></div>
    <div class="buffer"><span></span></div>
    <div class="buffer buffer-sm buffer-neutral"><span></span></div>
  </div>
</div>
:::

## Quotes

Two of them, and they are not interchangeable. A `<blockquote>` is **somebody
else talking**. A `.pullquote` is *you*, louder — a sentence lifted out of your
own paragraph because it is the one people should leave with.

:::demo
<div class="stack stack-lg">
  <article class="prose">
    <blockquote>
      <p>The joins lesson alone was worth it. I had been building on the wrong
      grain for two years and nobody told me.</p>
      <cite>Priya R., analytics lead</cite>
    </blockquote>
  </article>
  <figure class="pullquote">
    <p class="pullquote__text">A palette is a set of nice colours. A system is a set of promises about which colour is allowed where.</p>
    <figcaption class="pullquote__cite">Episode 48</figcaption>
  </figure>
  <figure class="pullquote pullquote-craft pullquote-center">
    <p class="pullquote__text">The thing you cannot explain in twenty minutes is the thing you have not finished learning.</p>
  </figure>
</div>
:::

## Pictures

A figure is an image **and its caption**, together, because a photograph in an
article almost always needs a sentence saying what you are looking at. The
caption is part of the element, not a paragraph underneath it that a rewrite
can separate from its picture.

:::demo
<figure class="figure">
  <img src="/assets/media/peak.jpg" alt="A ridge line at altitude, shot into the light" />
  <figcaption class="figure__caption">Ladakh, 4,200m. One lens, no tripod, and the shot I did not think would come out.</figcaption>
</figure>
:::

:::demo Centred and narrower than the column, for a portrait or a diagram
<figure class="figure figure-center" style="max-inline-size: 22rem">
  <img src="/assets/media/camera.jpg" alt="The camera on the desk" />
  <figcaption class="figure__caption">The whole rig. It has not changed in four years.</figcaption>
</figure>
:::

## Video

The same idea, with a poster that is the resting state. The clip is muted,
looping and eight seconds long, so it can autoplay without being rude — a
video that needs sound to make sense needs a control, not an autoplay.

:::demo
<figure class="figure">
  <div class="ratio ratio-wide rounded-lg overflow-hidden">
    <video src="/assets/media/loop.mp4" poster="/assets/media/loop.jpg" muted loop playsinline autoplay></video>
  </div>
  <figcaption class="figure__caption">Eight seconds, muted, on a loop. The poster is what it is before the file arrives.</figcaption>
</figure>
:::

For a clip that is the subject rather than an illustration — with a scrubber,
chapters and a timecode — that is the [player](/video.html), not a figure.

## A carousel in the column

When there are six photographs and the article only has room for one, the
carousel is a `.reel`: a scroll-snap strip with no JavaScript at all.

:::demo Drag it, or use the arrow keys
<div class="reel" style="--reel-item: 15rem">
  <figure class="figure m-0"><img src="/assets/media/coast.jpg" alt="Coast" /><figcaption class="figure__caption">Day 1 — the coast road</figcaption></figure>
  <figure class="figure m-0"><img src="/assets/media/road.jpg" alt="Road" /><figcaption class="figure__caption">Day 3 — inland</figcaption></figure>
  <figure class="figure m-0"><img src="/assets/media/city.jpg" alt="City" /><figcaption class="figure__caption">Day 6 — the city at dusk</figcaption></figure>
  <figure class="figure m-0"><img src="/assets/media/night.jpg" alt="Night" /><figcaption class="figure__caption">Day 6 — and after dark</figcaption></figure>
</div>
:::

## A stepper in the column

An article that describes a process should show the process. The
[stepper](/timeline.html) is the sequence as a control; inside prose, use the
vertical one, because a horizontal stepper in a 66-character column has nowhere
to go.

:::demo
<ol class="stepper stepper-vertical">
  <li class="stepper__step" data-done><span class="stepper__node"></span><span class="stepper__label">Build the thing</span><span class="stepper__hint">No script until it works</span></li>
  <li class="stepper__step" data-done><span class="stepper__node"></span><span class="stepper__label">Write the one sentence</span><span class="stepper__hint">If it needs two, it is two videos</span></li>
  <li class="stepper__step" aria-current="step"><span class="stepper__node"></span><span class="stepper__label">Cut the first ten minutes</span><span class="stepper__hint">The setup is never as interesting as it felt</span></li>
  <li class="stepper__step"><span class="stepper__node"></span><span class="stepper__label">Publish, then write it down</span></li>
</ol>
:::

## Info boxes

Three weights, and they are a scale rather than a palette. A `.note` is an
aside the reader may skip. A `.callout` is something they should not. An
`.alert` is a state the page is in — and an alert inside an article is almost
always a callout that has borrowed the wrong clothes.

:::demo
<div class="stack">
  <p class="note note-accent">Every class on this page is defined by the stylesheet you are already loading. There is nothing else to install.</p>
  <div class="callout callout-accent">
    <span class="callout__icon"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-info"/></svg></span>
    <div class="callout__body">
      <p class="callout__title">Before you start</p>
      <p>Open <code class="code">opportunity_lines.csv</code> from the project files. It is deliberately dirty.</p>
    </div>
  </div>
  <div class="callout callout-warning">
    <span class="callout__icon"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-alert"/></svg></span>
    <div class="callout__body">
      <p class="callout__title">Correction</p>
      <p>At 13:10 the narration says APCA 60. The target in the repo is 75 for body text — the code is right, the voice-over is not.</p>
    </div>
  </div>
  <p class="note note-craft">A <span class="term term-accent">dataflow</span> is the scheduled version of a recipe. The <span class="term">term</span> element marks a word the first time an article uses it.</p>
</div>
:::

## The ad

An article that pays for itself has one of these, and pretending otherwise is
how you end up with a hole in the design. Three things a design system can fix,
and this one does: the slot **reserves its height** before anything loads, it
**says what it is**, and it **can be closed**.

:::demo In-article, at rest and mid-load
<div class="stack">
  <aside class="ad ad-inline ad-leader" data-ad-state="idle">
    <p class="ad__label">Advertisement<button class="ad__close" type="button" aria-label="Hide this ad"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-x"/></svg></button></p>
    <div class="ad__slot"><p class="ad__note">728 × 90 · reserved before anything loads</p></div>
  </aside>
  <aside class="ad ad-rect" data-ad-state="loading">
    <p class="ad__label">Sponsored</p>
    <div class="ad__slot"><p class="ad__note">Loading</p></div>
  </aside>
</div>
:::

The state is one attribute — `data-ad-state` — so any script, or none, can set
it. With no JavaScript the slot renders at `idle`: a labelled, correctly-sized
empty box, which is the right fallback rather than a broken one. Full detail on
the [Ad page](/ad.html).

## A product

The gear an article mentions, buyable. The rating is a **number**, not five
glyphs: five stars is a picture of a number that a screen reader has to be told
about anyway, and the number with its count says more in less space.

:::demo
<div class="grid-3 cq-card">
  <article class="card card-product card-hover-lift">
    <div class="card__media" style="--card-ratio: 4 / 3"><img src="/assets/media/camera.jpg" alt="" /><span class="card__badge"><span class="badge badge-solid">Pick</span></span></div>
    <div class="card__body">
      <p class="card__kicker">Camera</p>
      <h3 class="card__title"><a class="card__link" href="#i">Sony FX3</a></h3>
      <p class="card__rating"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-star"/></svg><b>4.8</b> · 1,204</p>
      <p class="card__excerpt">Full frame, no fan noise, and it does not overheat halfway through a take.</p>
    </div>
    <div class="card__buy"><span class="card__price">₹2,40,000<span class="card__was">₹2,68,000</span></span><button class="btn btn-primary btn-sm card__above" type="button">Buy</button></div>
  </article>
  <article class="card card-product card-hover-lift">
    <div class="card__media" style="--card-ratio: 4 / 3"><img src="/assets/media/studio.jpg" alt="" /></div>
    <div class="card__body">
      <p class="card__kicker">Light</p>
      <h3 class="card__title"><a class="card__link" href="#i">Aputure 120d II</a></h3>
      <p class="card__rating"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-star"/></svg><b>4.6</b> · 812</p>
      <p class="card__excerpt">One key light, bounced. Everything else in frame is the room doing its job.</p>
    </div>
    <div class="card__buy"><span class="card__price">₹52,000</span><button class="btn btn-outline btn-sm card__above" type="button">Buy</button></div>
  </article>
  <article class="card card-product" data-sold>
    <div class="card__media" style="--card-ratio: 4 / 3"><img src="/assets/media/desk.jpg" alt="" /><span class="card__badge"><span class="badge badge-quiet">Sold out</span></span></div>
    <div class="card__body">
      <p class="card__kicker">Desk</p>
      <h3 class="card__title">Keychron Q1</h3>
      <p class="card__rating"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-star"/></svg><b>4.4</b> · 306</p>
      <p class="card__excerpt">Loud enough to hear in the early videos. I now mute the track.</p>
    </div>
    <div class="card__buy"><span class="card__price">₹16,500</span><button class="btn btn-outline btn-sm" type="button" disabled>Sold out</button></div>
  </article>
</div>
:::

`data-sold` is an attribute, not a class, and it does the greying. The control
is disabled by the markup, because a disabled-looking button that still submits
is worse than no state at all.

## A link out

There are two ways an article points elsewhere, and they are different acts.
This is the one the writer **wants taken now**: paragraph-sized, carrying the
destination's own title, description, host and thumbnail, and interrupting the
column on purpose.

:::demo
<div class="stack cq">
  <a class="linkcard" href="#i">
    <div class="linkcard__body">
      <p class="linkcard__title">Swarnil Design System — the documentation</p>
      <p class="linkcard__desc">Token-first CSS on Tailwind 4 and daisyUI. One link, no runtime, and no build step required to use it.</p>
      <p class="linkcard__meta"><span class="dot dot-accent linkcard__icon"></span> design.imswarnil.com</p>
    </div>
    <div class="linkcard__media"><img src="/assets/media/code.jpg" alt="" /></div>
  </a>
  <a class="linkcard linkcard-sm linkcard-quiet" href="#i">
    <div class="linkcard__body">
      <p class="linkcard__title">OKLCH in CSS: why we moved</p>
      <p class="linkcard__desc">The perceptual argument, with the gamut maths left in.</p>
      <p class="linkcard__meta"><span class="dot linkcard__icon"></span> evilmartians.com</p>
    </div>
  </a>
</div>
:::

The **host** gets its own line, in the data voice. A reader deciding whether to
follow a link is deciding whether to trust a domain, not a headline.

## The sources

And this is the other one: the list at the bottom. Numbered, quiet, and read
only by the reader who wants to check. It is deliberately the least interesting
thing on the page — a reference that competes with the argument is a footnote
in a pull quote's clothes.

:::demo
<article class="prose">
  <p>Dark mode is not an inversion<a class="ref-mark" href="#r1">1</a>, and the
  contrast target for body text is 75, not 60<a class="ref-mark" href="#r2">2</a>.</p>
</article>
<div>
  <p class="refs__title">References</p>
  <ol class="refs">
    <li class="ref" id="r1">Somers, A. <a href="#i">APCA and the perception of contrast</a>. <span class="ref__where">W3C Silver Task Force, 2024.</span></li>
    <li class="ref" id="r2">Verou, L. <a href="#i">LCH colours in CSS: what, why, and how</a>. <span class="ref__where">lea.verou.me, 2020.</span></li>
    <li class="ref">Singhai, S. <a href="#i">Colour, in one block of tokens</a>. <span class="ref__where">Episode 48, 2026.</span></li>
  </ol>
</div>
:::

Footnotes are the third thing and they are not references: a footnote is an
aside *you* wrote, so it lives with the [text elements](/typography.html) as
`.fn`, next to the mark that points at it.

## When to leave `.prose`

`.prose` styles the bare tag on purpose — `pre`, `code`, `figure`,
`blockquote` are matched with `:not([class])`. So the moment an element carries
a class, it keeps its own dress and the column stops interfering.

That is what makes the page above possible: a `.codeplayer`, a `.linkcard` and
a `.card-product` can all sit in the same column as an `<h2>` and a `<ul>`,
and none of them has to fight the rhythm rule to do it.

## About the pictures on this page

They are real photographs and real footage on purpose: a grey rectangle proves
that a box is the right size and nothing else, and half the decisions on this
page — the scrim under a caption, the grade on a tile, the brightness of a
button's own video — are only checkable against an actual image.

None of it is part of the system. `dist/` ships no images at all, and a project
consuming the package downloads none of this. Credits and licences are in
[`docs/assets/media/CREDITS.md`](https://github.com/imswarnil/Swarnil-Design-System/blob/main/docs/assets/media/CREDITS.md);
swap the lot for your own work when you take the site.
