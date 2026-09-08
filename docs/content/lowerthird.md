---
title: Lower third
group: Broadcast
order: 50
lead: Who is talking and why you should listen — a name and a role in the lower third of the frame, for eight seconds. One anatomy, five dresses.
---

The plate is positioned by its `.canvas` parent: bottom-left, `--lt-inset`
from the edges. It enters from the start edge and leaves the same way. State
is an attribute — `data-state="in"` plays the entrance, `data-state="out"`
the exit — and no attribute is the resting, visible plate, so a still export
never depends on an animation having run.

## The plate

The rule of accent, then the words. It is the plate's only colour.

:::demo Reload to see it enter
<div class="canvas canvas-wide bg-spot">
  <div class="lowerthird" data-state="in">
    <span class="lowerthird__mark"></span>
    <div class="lowerthird__body">
      <p class="lowerthird__name">Swarnil Singhai</p>
      <p class="lowerthird__role">Engineer · Creator</p>
    </div>
  </div>
</div>
:::

## Dresses

:::demo The bar — full width along the bottom edge
<div class="canvas canvas-wide bg-spot">
  <div class="lowerthird lowerthird-bar">
    <span class="lowerthird__mark"></span>
    <div class="lowerthird__body">
      <p class="lowerthird__name">Swarnil Singhai</p>
      <p class="lowerthird__role">Engineer · Creator <span class="lowerthird__handle">· @imswarnil</span></p>
    </div>
  </div>
</div>
:::

:::demo The box, and the glass — for a busy background
<div class="grid-2">
  <div class="canvas canvas-wide bg-mesh pattern pattern-grid">
    <div class="lowerthird lowerthird-box">
      <span class="lowerthird__mark"></span>
      <div class="lowerthird__body"><p class="lowerthird__name">Swarnil Singhai</p><p class="lowerthird__role">Guest</p></div>
    </div>
  </div>
  <div class="canvas canvas-wide bg-mesh pattern pattern-grid">
    <div class="lowerthird lowerthird-glass">
      <span class="lowerthird__mark"></span>
      <div class="lowerthird__body"><p class="lowerthird__name">Swarnil Singhai</p><p class="lowerthird__role">Guest</p></div>
    </div>
  </div>
</div>
:::

:::demo With a face, on the end edge, and the light plate
<div class="grid-2">
  <div class="canvas canvas-wide bg-spot">
    <div class="lowerthird lowerthird-end">
      <div class="lowerthird__body"><p class="lowerthird__name">Anu Mehta</p><p class="lowerthird__role">Moderator</p></div>
      <span class="lowerthird__mark"></span>
    </div>
  </div>
  <div class="canvas canvas-wide bg-muted">
    <div class="lowerthird lowerthird-box lowerthird-light">
      <span class="lowerthird__face avatar" style="display: grid; place-items: center">S</span>
      <div class="lowerthird__body"><p class="lowerthird__name">Swarnil Singhai</p><p class="lowerthird__role">Host</p></div>
    </div>
  </div>
</div>
:::

## The ticker

A label on the left, a running line beside it. The line is a `.marquee`, so
it pauses on hover and stops under reduced motion.

:::demo
<div class="canvas canvas-wide bg-spot">
  <div class="lowerthird lowerthird-ticker">
    <span class="lowerthird__label">Breaking</span>
    <div class="marquee">
      <div class="marquee__run"><span>The system ships next Thursday</span><span>·</span><span>Thumbnail templates are live</span><span>·</span><span>Q&amp;A at the top of the hour</span></div>
      <div class="marquee__run" aria-hidden="true"><span>The system ships next Thursday</span><span>·</span><span>Thumbnail templates are live</span><span>·</span><span>Q&amp;A at the top of the hour</span></div>
    </div>
  </div>
</div>
:::

## Leaving

`data-state="out"` plays the entrance in reverse. In OBS, flip the attribute
from a hotkey script; on a static export, leave it off.

:::demo
<div class="canvas canvas-wide bg-spot">
  <div class="lowerthird" data-state="out">
    <span class="lowerthird__mark"></span>
    <div class="lowerthird__body"><p class="lowerthird__name">Gone in half a second</p><p class="lowerthird__role">data-state="out"</p></div>
  </div>
</div>
:::

## Properties

| Variable | Does |
| --- | --- |
| `--lt-inset` | distance from the stage's edges |
| `--lt-enter` | how long the entrance takes |
| `--lt-fg`, `--lt-muted` | the two text colours; `lowerthird-light` swaps them |
