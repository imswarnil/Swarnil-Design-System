---
title: Thumbnail
group: Broadcast
order: 50
lead: The thumbnail is the product — seen ten thousand times for every click, at 168px, beside eleven others, for three seconds. Seven compositions on one anatomy.
---

The rules are strict and few: **four words or fewer**, type never below 44px
on a 1280 canvas, one subject, one accent, a scrim wherever type meets a
photograph. A series is a locked composition with the episode number in the
same corner every time — recognition is the whole point.

Every thumbnail is a `.thumb` inside a [`canvas-yt`](/canvas.html). Put an
`img` before it and the thumb becomes a scrim over the picture.

## Anatomy

:::demo Every part at once
<div class="canvas canvas-yt w-lg">
  <div class="thumb">
    <span class="thumb__frame"></span>
    <span class="thumb__badge">EP 12</span>
    <p class="thumb__kicker"><span class="dot dot-accent"></span> Lighting</p>
    <h3 class="thumb__title">Two cameras, <em>one</em> light</h3>
  </div>
</div>
:::

| Part | Job |
| --- | --- |
| `thumb__kicker` | the series or the category — label voice, in the accent |
| `thumb__title` | the four words — bold, tight, balanced, with a shadow for the photo case |
| `thumb__num` | the big number of a list thumbnail |
| `thumb__badge` | the corner mark — episode number, in the data voice |
| `thumb__subject` | the cut-out face or object, standing on the right |
| `thumb__frame` | the house brackets, scaled to the stage |
| `thumb__win` | the editor window that is a code thumbnail's subject |

## The seven

:::demo Talking — face right, words left
<div class="canvas canvas-yt w-lg">
  <div class="thumb thumb-talking">
    <div>
      <p class="thumb__kicker">Craft</p>
      <h3 class="thumb__title">Why your audio <em>sounds</em> cheap</h3>
    </div>
    <img class="thumb__subject" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 4'%3E%3Ccircle cx='1.5' cy='1.3' r='0.7' fill='%23777'/%3E%3Cpath d='M0.2 4 Q1.5 2 2.8 4Z' fill='%23666'/%3E%3C/svg%3E" alt="" />
  </div>
</div>
:::

:::demo Code — the window is the subject
<div class="canvas canvas-yt w-lg">
  <div class="thumb thumb-code">
    <p class="thumb__kicker">CSS</p>
    <h3 class="thumb__title">Stop writing <em>media</em> queries</h3>
    <div class="thumb__win" aria-hidden="true">.card {<br />&nbsp;&nbsp;container: card;<br />}<br />@container card (max-width: 26rem) {<br />&nbsp;&nbsp;…<br />}</div>
  </div>
</div>
:::

:::demo Split — before and after, on the diagonal
<div class="canvas canvas-yt w-lg">
  <div class="thumb thumb-split">
    <div class="thumb__half"><p class="thumb__kicker">Before</p><h3 class="thumb__title">Flat</h3></div>
    <div class="thumb__half"><p class="thumb__kicker">After</p><h3 class="thumb__title"><em>Graded</em></h3></div>
  </div>
</div>
:::

:::demo List — a number and a noun
<div class="canvas canvas-yt w-lg">
  <div class="thumb thumb-list">
    <p class="thumb__num">7</p>
    <h3 class="thumb__title">mistakes every new creator makes</h3>
  </div>
</div>
:::

:::demo Quote — the words are the picture
<div class="canvas canvas-yt w-lg">
  <div class="thumb thumb-quote">
    <h3 class="thumb__title">Consistency is a <em>feature</em></h3>
  </div>
</div>
:::

:::demo Face — the subject full-bleed, two words
<div class="canvas canvas-yt w-lg">
  <div class="thumb thumb-face">
    <img class="thumb__subject" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23383838'/%3E%3Ccircle cx='10' cy='3.6' r='1.8' fill='%23777'/%3E%3Cpath d='M6.5 9 Q10 5.5 13.5 9Z' fill='%23666'/%3E%3C/svg%3E" alt="" />
    <h3 class="thumb__title">I <em>quit</em></h3>
  </div>
</div>
:::

:::demo Series — the locked strip
<div class="grid-2">
  <div class="canvas canvas-yt">
    <div class="thumb thumb-series">
      <div></div>
      <div class="thumb__strip">
        <div><p class="thumb__kicker">Build log</p><h3 class="thumb__title">The frame layer, explained</h3></div>
        <span class="thumb__badge">47</span>
      </div>
    </div>
  </div>
  <div class="canvas canvas-yt">
    <div class="thumb thumb-series">
      <div></div>
      <div class="thumb__strip">
        <div><p class="thumb__kicker">Build log</p><h3 class="thumb__title">Colour, in one block of tokens</h3></div>
        <span class="thumb__badge">48</span>
      </div>
    </div>
  </div>
</div>
:::

## Light

A white thumbnail is louder in a dark feed. Same anatomy, inverted.

:::demo
<div class="canvas canvas-yt w-lg">
  <div class="thumb thumb-light">
    <span class="thumb__badge">NEW</span>
    <p class="thumb__kicker">Travel</p>
    <h3 class="thumb__title">Ladakh, on <em>film</em></h3>
  </div>
</div>
:::

## The OG image

The same discipline at 1200 × 630, for a post. Eyebrow, title, meta, the
mark. Three tiers by length — `blogcard-short` for four words,
`blogcard-long` for fourteen — because the system cannot count words and the
title has to fill the frame either way.

:::demo
<div class="grid-2">
  <div class="canvas canvas-og">
    <div class="blogcard">
      <p class="blogcard__eyebrow"><span class="dot dot-accent"></span> Build log · Ep. 47</p>
      <h3 class="blogcard__title">The frame layer, explained</h3>
      <div class="blogcard__meta"><span class="blogcard__mark"><span class="dot dot-accent"></span> imswarnil.com</span><span>2026-09-07 · 8 min</span></div>
    </div>
  </div>
  <div class="canvas canvas-og">
    <div class="blogcard blogcard-dark blogcard-short">
      <p class="blogcard__eyebrow">Opinion</p>
      <span class="blogcard__rule"></span>
      <h3 class="blogcard__title">Decide once.</h3>
      <div class="blogcard__meta"><span class="blogcard__mark">Swarnil</span><span>2026-09-07</span></div>
    </div>
  </div>
  <div class="canvas canvas-og">
    <div class="blogcard blogcard-long">
      <p class="blogcard__eyebrow blogcard-series">Series · Design systems for creators</p>
      <h3 class="blogcard__title">Why a token-first design system is the only kind that survives a rebrand</h3>
      <div class="blogcard__meta"><span class="blogcard__mark">imswarnil.com</span><span>Part 3 of 6</span></div>
    </div>
  </div>
  <div class="canvas canvas-og">
    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%236a8caf'/%3E%3Cstop offset='1' stop-color='%23d9a066'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E" alt="" />
    <div class="blogcard blogcard-photo">
      <p class="blogcard__eyebrow">Travel</p>
      <h3 class="blogcard__title">Ladakh, on film</h3>
      <div class="blogcard__meta"><span class="blogcard__mark">imswarnil.com</span><span>14 photos</span></div>
    </div>
  </div>
</div>
:::

## The three-second test

- Cover the title with your thumb. Does the picture still say what it is about?
- Shrink it to 168px. Can you read every word?
- Put it beside eleven others. Is it the quietest thing in the row, or the
  only one with a single colour? Either can win; noise never does.

## Properties

| Variable | Does |
| --- | --- |
| `--thumb-title-size` | the title size, in `cqi` |
| `--thumb-pad` | inset from the stage's edge |
| `--thumb-scrim` | the scrim colour over a photo |
| `--blog-pad` | the OG card's inset |
