---
title: Canvas
group: Broadcast
order: 50
lead: The export stages — thumbnail, OG image, square, story, banner, scene — each a ratio, a name and a safe area, sized in container units so one design renders at any width.
---

The broadcast layer is the half of the system nobody else has: thumbnails,
scenes, lower thirds, stream widgets, channel art. None of it ships to a web
page. It is rendered into OBS as a browser source, or captured to a PNG. It is
its own bundle, so a website never pays for it:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@imswarnil/swarnil-design/dist/swarnil-broadcast.min.css">
```

```css
@import "@imswarnil/swarnil-design/broadcast";
```

**One rule makes all of it work.** Every stage is a container, and every size
inside is in `cqi` — a percentage of the stage's width. A title at `8cqi` is
102px on a 1280-wide thumbnail and 26px in this docs column, and the
composition is identical. There are no breakpoints in this layer and no pixel
values. Resize the browser and watch.

## The stages

| Class | Pixels | Use |
| --- | --- | --- |
| `canvas-yt` | 1280 × 720 | YouTube thumbnail |
| `canvas-og` | 1200 × 630 | blog OG / Twitter card |
| `canvas-sq` | 1080 × 1080 | Instagram post, podcast art |
| `canvas-portrait` | 1080 × 1350 | Instagram feed portrait |
| `canvas-story` | 1080 × 1920 | Story, Reel, Short |
| `canvas-banner` | 2560 × 1440 | YouTube channel banner |
| `canvas-wide` | 1920 × 1080 | scene, slide, end card, OBS browser source |

:::demo Every stage with its guides on
<div class="stages">
  <div><div class="canvas canvas-yt canvas-guides bg-ink"><span class="canvas__safe"></span><span class="canvas__thirds"></span><span class="canvas__dims">1280 × 720</span></div><span class="stages__label">canvas-yt</span></div>
  <div><div class="canvas canvas-og canvas-guides bg-ink"><span class="canvas__safe"></span><span class="canvas__dims">1200 × 630</span></div><span class="stages__label">canvas-og</span></div>
  <div><div class="canvas canvas-sq canvas-guides bg-ink"><span class="canvas__safe"></span><span class="canvas__dims">1080 × 1080</span></div><span class="stages__label">canvas-sq</span></div>
  <div><div class="canvas canvas-portrait canvas-guides bg-ink"><span class="canvas__safe"></span><span class="canvas__dims">1080 × 1350</span></div><span class="stages__label">canvas-portrait</span></div>
  <div><div class="canvas canvas-story canvas-guides bg-ink"><span class="canvas__safe"></span><span class="canvas__dims">1080 × 1920</span></div><span class="stages__label">canvas-story</span></div>
  <div><div class="canvas canvas-wide canvas-guides bg-ink"><span class="canvas__safe"></span><span class="canvas__thirds"></span><span class="canvas__dims">1920 × 1080</span></div><span class="stages__label">canvas-wide</span></div>
</div>
:::

## Guides

`canvas-guides` turns on the safe area (dashed, in the accent), the thirds and
the dimensions readout. They are real elements, so they never fight a scene's
own pseudo-elements, and they are hidden on print — which is what an export is.

The banner is the special case: YouTube shows the whole 2560 × 1440 on a TV,
the middle 2560 × 423 on desktop, and only the centre 1546 × 423 on a phone.
The guide draws the phone-safe zone in the accent and the desktop band in
craft. Everything that matters goes inside the inner box.

:::demo The banner and its three zones
<div class="canvas canvas-banner canvas-guides bg-aurora pattern pattern-grid"><span class="canvas__safe"></span><span class="canvas__dims">2560 × 1440</span></div>
:::

## A picture underneath

An `img` or `video` placed first fills the stage and sits under everything
else. `canvas-flush` squares the corners for a browser source, where the
corners are the screen.

:::demo
<div class="canvas canvas-wide canvas-flush canvas-guides">
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23333'/%3E%3Cstop offset='1' stop-color='%23111'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E" alt="" />
  <span class="canvas__safe"></span>
</div>
:::

## Exporting

- Render the stage at the platform's width — a 1280px-wide `canvas-yt` is the
  thumbnail at 1× — and capture the element. Every colour is kept exactly:
  the stage sets `print-color-adjust: exact`.
- No web fonts at export time. Subset and self-host Geist, or the render
  races the font and you ship a fallback face.
- Type never below `3.4cqi` (44px on 1280). It has to survive the 168px grid.
- Turn `canvas-guides` off, or print — guides are display: none on paper.

## Properties

| Variable | Does |
| --- | --- |
| `--canvas-ratio` | the stage's aspect ratio |
| `--canvas-safe` | the safe-area inset, as a percentage |
| `--canvas-radius` | corner radius; `canvas-flush` zeroes it |
