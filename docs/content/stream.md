---
title: Stream widgets
group: Broadcast
order: 50
lead: The camera frame, the LIVE bug, the alert, the chat, the goal, now playing, the countdown and the ticker — each its own browser source, or a piece of the live scene.
---

All of it dark, all of it `cqi`. The one accent is spent on what is live: the
bug's dot, the alert's kicker, the goal's fill, the playing bars. Each widget
sits in a `.canvas` so it scales with the stage; on its own as a browser
source, give it a `canvas-flush` of the size you want.

## The camera frame

A hole with a name tag. `cam-ring` is the on-air frame in the accent.

:::demo
<div class="canvas canvas-wide bg-ink" style="display: grid; place-items: center">
  <div class="grid-4" style="width: 90%; align-items: center">
    <div class="cam pattern pattern-dot"><span class="cam__tag"><span class="dot dot-live"></span> Swarnil</span></div>
    <div class="cam cam-square cam-ring pattern pattern-dot"><span class="cam__tag">Guest</span></div>
    <div class="cam cam-circle pattern pattern-dot"></div>
    <div class="cam cam-portrait pattern pattern-dot"><span class="cam__tag">Cam 2</span></div>
  </div>
</div>
:::

## The bug

LIVE, then the numbers — viewers, running time — in the data voice.

:::demo
<div class="canvas canvas-wide bg-ink" style="display: grid; place-items: center">
  <span class="streambug">
    <span class="streambug__live"><span class="dot"></span> Live</span>
    <span class="streambug__stat"><svg class="icon" aria-hidden="true"><use href="/icons/sprite.svg#i-users"/></svg> 1,204</span>
    <span class="streambug__stat">01:12:47</span>
  </span>
</div>
:::

## The alert

Follow, sub, raid. It pops in with the one overshoot the system allows,
because a gift deserves one.

:::demo Reload to see them arrive
<div class="canvas canvas-sq bg-ink" style="display: grid; place-content: center; gap: 3cqi">
  <div class="alertbox alertbox-follow" data-state="in">
    <span class="alertbox__face">R</span>
    <div><p class="alertbox__kicker">New follower</p><p class="alertbox__who">ravi_k</p></div>
  </div>
  <div class="alertbox alertbox-sub" data-state="in">
    <span class="alertbox__face">D</span>
    <div><p class="alertbox__kicker">Subscribed · 6 months</p><p class="alertbox__who">devi</p><p class="alertbox__what">"the frame thing is so good"</p></div>
  </div>
  <div class="alertbox alertbox-raid" data-state="in">
    <span class="alertbox__face">A</span>
    <div><p class="alertbox__kicker">Raid</p><p class="alertbox__who">anu_builds</p><p class="alertbox__what">brought 340 people</p></div>
  </div>
</div>
:::

## Chat

The replay, in the palette. Names take the accent, a moderator takes craft,
and the top fades so the newest line reads first. `chatbox-flat` is the
opaque version for a busy scene.

:::demo
<div class="grid-2">
  <div class="canvas canvas-sq bg-ink" style="display: grid; align-content: end; padding: 4cqi">
    <div class="chatbox">
      <p class="chatbox__msg m-0"><span class="chatbox__who">ravi_k</span><span class="chatbox__text">what font is that?</span></p>
      <p class="chatbox__msg m-0"><span class="chatbox__badge"></span><span class="chatbox__who chatbox__who-mod">mod_anu</span><span class="chatbox__text">Inter, everywhere. Labels are the same face, small and tracked.</span></p>
      <p class="chatbox__msg m-0"><span class="chatbox__who">devi</span><span class="chatbox__text">the frame thing is so good</span></p>
      <p class="chatbox__msg m-0"><span class="chatbox__who">kabir</span><span class="chatbox__text">is the theme on github?</span></p>
    </div>
  </div>
  <div class="canvas canvas-sq bg-ink" style="display: grid; align-content: end; padding: 4cqi">
    <div class="chatbox chatbox-flat">
      <p class="chatbox__msg m-0"><span class="chatbox__who">ravi_k</span><span class="chatbox__text">flat version</span></p>
      <p class="chatbox__msg m-0"><span class="chatbox__who">devi</span><span class="chatbox__text">for a busy background</span></p>
    </div>
  </div>
</div>
:::

## The goal

Progress toward a number. `--goal-value` is the fill.

:::demo
<div class="canvas canvas-wide bg-ink" style="display: grid; place-items: center">
  <div class="goal" style="--goal-value: 62%; width: 60%">
    <div class="goal__head"><span class="goal__label">Sub goal</span><span class="goal__value">620 / 1,000</span></div>
    <div class="goal__bar"><div class="goal__fill"></div></div>
  </div>
</div>
:::

## Now playing

The art turns, the bars breathe.

:::demo
<div class="canvas canvas-wide bg-ink" style="display: grid; place-items: center">
  <div class="nowplaying">
    <span class="nowplaying__art"></span>
    <div class="nowplaying__body"><span class="nowplaying__title">Night Drive (Instrumental)</span><span class="nowplaying__artist">Lofi Room</span></div>
    <span class="nowplaying__bars" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
  </div>
</div>
:::

## The countdown

Four units, colon-separated by a pseudo, so the markup is just the digits.
Update the numbers from a script; the layout does not care.

:::demo
<div class="canvas canvas-wide bg-ink" style="display: grid; place-items: center; color: var(--ink-50)">
  <div class="countdown">
    <div class="countdown__unit"><span class="countdown__n">02</span><span class="countdown__l">Days</span></div>
    <div class="countdown__unit"><span class="countdown__n">14</span><span class="countdown__l">Hours</span></div>
    <div class="countdown__unit"><span class="countdown__n">07</span><span class="countdown__l">Min</span></div>
    <div class="countdown__unit"><span class="countdown__n">59</span><span class="countdown__l">Sec</span></div>
  </div>
</div>
:::

## The ticker

A strip of running text along an edge. The run is a `.marquee` — duplicated
once with `aria-hidden` so the loop is seamless — and it pauses on hover.

:::demo
<div class="canvas canvas-wide bg-ink" style="display: grid; align-content: end; padding: 3cqi">
  <div class="ticker">
    <span class="ticker__label">Today</span>
    <div class="marquee">
      <div class="marquee__run"><span>Building the thumbnail system</span><span class="ticker__sep">·</span><span>Q&amp;A at the hour</span><span class="ticker__sep">·</span><span>VOD up tonight</span></div>
      <div class="marquee__run" aria-hidden="true"><span>Building the thumbnail system</span><span class="ticker__sep">·</span><span>Q&amp;A at the hour</span><span class="ticker__sep">·</span><span>VOD up tonight</span></div>
    </div>
  </div>
</div>
:::

## Wiring it up

None of these widgets fetch anything. The chat, the alert, the goal and the
countdown are markup; whatever you already use to talk to the platform —
Streamer.bot, a small Node script, the OBS websocket — writes into them. A
`data-state="in"` on a new `.alertbox` plays the entrance; a new
`--goal-value` slides the fill.

## Properties

| Variable | Does |
| --- | --- |
| `--cam-ratio`, `--cam-radius` | the camera hole's shape |
| `--goal-value` | the fill, as a percentage |
| `--marquee-dur` | on the ticker's marquee: one full loop |
