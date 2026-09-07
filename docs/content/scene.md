---
title: Scenes
group: Broadcast
order: 50
lead: Starting soon, be right back, the title card, the chapter card, the end card, the live layout — the full-frame cards of a stream, for OBS as a browser source.
---

A scene is a `.canvas-wide` filled by one `.scene`. It drops into OBS as a
1920 × 1080 browser source and into this column at whatever width it has, and
looks the same in both, because every size is in `cqi`. A scene is dark by
default — it is a screen, and the player's rule holds: a window onto a darker
room whatever the page theme.

## Anatomy

Head, body, foot. The brand and the bug live in the head; the words in the
body; the meta and the handle in the foot.

:::demo The title card — the default
<div class="canvas canvas-wide">
  <div class="scene">
    <div class="scene__head">
      <span class="scene__brand"><span class="dot dot-accent"></span> Swarnil</span>
      <span class="scene__bug"><span class="dot"></span> Live</span>
    </div>
    <div class="scene__body">
      <p class="scene__kicker"><span class="dot dot-accent"></span> Episode 48</p>
      <h3 class="scene__title">Colour, in one block of <em>tokens</em></h3>
      <p class="scene__sub">Eight ramps, ninety-seven tones, and why dark mode is not an inversion.</p>
    </div>
    <div class="scene__foot">
      <span class="scene__meta">@imswarnil</span>
      <span class="scene__meta">2026-09-07 · 20:00 IST</span>
    </div>
  </div>
</div>
:::

## Starting soon

The clock takes the middle. Pair it with a [countdown](/stream.html) for
real digits.

:::demo
<div class="canvas canvas-wide">
  <div class="scene scene-starting">
    <div class="scene__head"><span class="scene__brand"><span class="dot dot-accent"></span> Swarnil</span><span class="scene__meta">Starting soon</span></div>
    <div class="scene__body">
      <p class="scene__time">04:59</p>
      <h3 class="scene__title">Building a thumbnail system, live</h3>
    </div>
    <div class="scene__foot"><span class="scene__meta">@imswarnil</span><span class="scene__meta">Say hi in chat</span></div>
  </div>
</div>
:::

## Be right back, and ending

Short line, quiet weight.

:::demo
<div class="grid-2">
  <div class="canvas canvas-wide">
    <div class="scene scene-brb">
      <div class="scene__head"><span class="scene__brand"><span class="dot dot-accent"></span> Swarnil</span></div>
      <div class="scene__body"><h3 class="scene__title">Be right back.</h3><p class="scene__sub">Coffee. Two minutes.</p></div>
      <div class="scene__foot"><span class="scene__meta">@imswarnil</span></div>
    </div>
  </div>
  <div class="canvas canvas-wide">
    <div class="scene scene-ending">
      <div class="scene__head"><span class="scene__brand"><span class="dot dot-accent"></span> Swarnil</span></div>
      <div class="scene__body"><h3 class="scene__title">That's the stream.</h3><p class="scene__sub">The VOD is up in an hour. Thank you.</p></div>
      <div class="scene__foot"><span class="scene__meta">@imswarnil</span><span class="scene__meta">02:14:07</span></div>
    </div>
  </div>
</div>
:::

## Chapter, and quote

:::demo
<div class="grid-2">
  <div class="canvas canvas-wide">
    <div class="scene scene-section">
      <div class="scene__head"><span class="scene__brand"><span class="dot dot-accent"></span> Swarnil</span></div>
      <div class="scene__body"><span class="scene__num">03</span><h3 class="scene__title">The safe area</h3></div>
      <div class="scene__foot"><span class="scene__meta">Chapter 3 of 6</span></div>
    </div>
  </div>
  <div class="canvas canvas-wide">
    <div class="scene scene-quote">
      <div class="scene__head"><span class="scene__brand"><span class="dot dot-accent"></span> Swarnil</span></div>
      <div class="scene__body"><h3 class="scene__title">A rule that is not executable is a wish.</h3><p class="scene__sub">— approach.md</p></div>
      <div class="scene__foot"></div>
    </div>
  </div>
</div>
:::

## The end card

YouTube's end-screen elements need a 16:9 hole for the next video and a round
one for subscribe, at positions you set in the studio. The slots draw the
holes so you can see where they land — and stay out of them.

:::demo
<div class="canvas canvas-wide">
  <div class="scene scene-outro">
    <div class="scene__head"><span class="scene__brand"><span class="dot dot-accent"></span> Swarnil</span></div>
    <div class="scene__body">
      <div><p class="scene__kicker">Thanks for watching</p><h3 class="scene__title">Next: the frame layer</h3><p class="scene__sub">Every Thursday.</p></div>
      <div class="scene__slots">
        <div class="scene__slot">Next video</div>
        <div class="scene__slot scene__slot-round">Sub</div>
      </div>
    </div>
    <div class="scene__foot"><span class="scene__meta">@imswarnil</span><span class="scene__meta">imswarnil.com</span></div>
  </div>
</div>
:::

## Live

The streaming layout: the screen on the left, the camera and the chat stacked
on the right, a ticker along the bottom. The widgets inside are the
[stream](/stream.html) components.

:::demo
<div class="canvas canvas-wide canvas-flush">
  <div class="scene scene-live">
    <div class="scene__head">
      <span class="scene__brand"><span class="dot dot-accent"></span> Swarnil</span>
      <span class="streambug"><span class="streambug__live"><span class="dot"></span> Live</span><span class="streambug__stat"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-users"/></svg> 1,204</span><span class="streambug__stat">01:12:47</span></span>
    </div>
    <div class="scene__body">
      <div class="scene__screen pattern pattern-grid"></div>
      <div class="scene__side">
        <div class="scene__cam pattern pattern-dot"></div>
        <div class="chatbox">
          <p class="chatbox__msg u-m-0"><span class="chatbox__badge"></span><span class="chatbox__who">ravi_k</span><span class="chatbox__text">what font is that?</span></p>
          <p class="chatbox__msg u-m-0"><span class="chatbox__who chatbox__who-mod">mod_anu</span><span class="chatbox__text">Inter, everywhere</span></p>
          <p class="chatbox__msg u-m-0"><span class="chatbox__who">devi</span><span class="chatbox__text">the frame thing is so good</span></p>
        </div>
      </div>
    </div>
    <div class="scene__foot">
      <div class="ticker u-w-full"><span class="ticker__label">Now</span><div class="marquee"><div class="marquee__run"><span>Building the thumbnail system</span><span class="ticker__sep">·</span><span>Q&amp;A at the hour</span><span class="ticker__sep">·</span><span>VOD up tonight</span></div><div class="marquee__run" aria-hidden="true"><span>Building the thumbnail system</span><span class="ticker__sep">·</span><span>Q&amp;A at the hour</span><span class="ticker__sep">·</span><span>VOD up tonight</span></div></div></div>
    </div>
  </div>
</div>
:::

## The stinger

The transition between scenes: a block of the accent wipes across, then ink
follows and clears. It loops here so you can see it; in OBS you fire it once.

:::demo
<div class="canvas canvas-wide w-lg bg-aurora">
  <div class="scene scene-stinger"><span class="scene__wipe"></span><span class="scene__wipe"></span></div>
</div>
:::

## Light

A channel whose brand is a white room.

:::demo
<div class="canvas canvas-wide w-lg">
  <div class="scene scene-light">
    <div class="scene__head"><span class="scene__brand"><span class="dot dot-accent"></span> Swarnil</span><span class="scene__bug"><span class="dot"></span> Live</span></div>
    <div class="scene__body"><p class="scene__kicker">Episode 48</p><h3 class="scene__title">Same scene, <em>light</em> room</h3></div>
    <div class="scene__foot"><span class="scene__meta">@imswarnil</span></div>
  </div>
</div>
:::

## In OBS

1. Add a **Browser** source, 1920 × 1080, pointing at an HTML file that loads
   `swarnil-broadcast.min.css` and one `<div class="canvas canvas-wide canvas-flush">` with the scene inside.
2. Tick *Shutdown source when not visible* and *Refresh browser when scene
   becomes active*, so the entrance animation plays every time the scene comes up.
3. Change the accent in one `:root` rule and every scene, bug and lower third
   follows.

## Properties

| Variable | Does |
| --- | --- |
| `--scene-pad` | inset from the stage's edge |
| `--scene-bg` | the background; an image underneath turns it into a scrim |
| `--scene-fg`, `--scene-muted` | the two text colours |
