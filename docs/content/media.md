---
title: Media
group: Components
order: 60
lead: Player chrome, the play disc, the poster and the episode row — the rectangle of footage the rest of the system is furniture around.
---

:::demo The player, with its bar held open for the demo
<div class="player player-bar-open">
  <div class="player__bar">
    <button class="player__btn" type="button" aria-label="Play"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-play"/></svg></button>
    <span class="player__time">00:04:12</span>
    <div class="player__rail" role="slider" aria-label="Seek" aria-valuemin="0" aria-valuemax="1447" aria-valuenow="252" tabindex="0">
      <div class="player__buffered" style="--value: 61%"></div>
      <div class="player__played" style="--value: 17%"></div>
    </div>
    <span class="player__time">00:24:07</span>
    <button class="player__btn" type="button" aria-label="Volume"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-volume"/></svg></button>
    <button class="player__btn" type="button" aria-label="Fullscreen"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-maximise"/></svg></button>
  </div>
</div>
:::

The player is always dark — a window onto a darker room, whatever the page
theme — and the one accent on the screen belongs to playback: the played rail
and the play disc. A page with a player on it should carry no other
accent-filled surface. It is **chrome, not a video implementation**: put a
`<video>`, `<iframe>` or `<img>` inside it and it dresses whatever is there.
Progress is the `--value` custom property the host sets; nothing here polls a
media element.

## The bar

On a fine pointer the bar is invisible until the player is hovered or focused;
on touch it is always present, because there is nothing to hover.
`.player-bar-open` pins it, for a demo or a player paused on a still. The
timecodes are data — light, tracked, tabular — so they line up without a
monospace face.

:::demo Hover the player; tab into it and the bar stays for the keyboard
<div class="player">
  <div class="player__title">Episode 12 · Lighting a two-camera interview</div>
  <div class="player__bar">
    <button class="player__btn" type="button" aria-label="Pause"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-pause"/></svg></button>
    <span class="player__time">00:12:47</span>
    <div class="player__rail" role="slider" aria-label="Seek" aria-valuemin="0" aria-valuemax="1447" aria-valuenow="767" tabindex="0">
      <div class="player__buffered" style="--value: 80%"></div>
      <div class="player__played" style="--value: 53%"></div>
    </div>
    <span class="player__time">00:24:07</span>
  </div>
</div>
:::

## Cuts

The ratio is a property. Square and story cuts are the two that ship to
platforms.

:::demo
<div class="grid-3">
  <div class="player player-square player-bar-open"><div class="player__bar"><span class="player__time">1:1</span></div></div>
  <div class="player player-story player-bar-open"><div class="player__bar"><span class="player__time">9:16</span></div></div>
  <div class="player player-bar-open" style="--player-ratio: 4 / 3"><div class="player__bar"><span class="player__time">4:3</span></div></div>
</div>
:::

## The play disc

`.play` fills its positioned parent so the whole still is the hit target; the
disc is only the visible part. The triangle is drawn with borders and takes
`currentcolor`, so every variant is a colour change.

:::demo Solid, ghost over busy artwork, inverse on an accent still
<div class="grid-3">
  <div class="poster"><button class="play" type="button" aria-label="Play episode 12"><span class="play__disc"></span></button></div>
  <div class="poster" style="background: linear-gradient(135deg, var(--bg-media), var(--accent-soft-fg))"><button class="play play-ghost" type="button" aria-label="Play episode 12"><span class="play__disc"></span></button></div>
  <div class="poster" style="background: var(--accent)"><button class="play play-inverse" type="button" aria-label="Play episode 12"><span class="play__disc"></span></button></div>
</div>
:::

:::demo Sizes
<div class="grid-3">
  <div class="poster"><button class="play play-sm" type="button" aria-label="Play"><span class="play__disc"></span></button></div>
  <div class="poster"><button class="play" type="button" aria-label="Play"><span class="play__disc"></span></button></div>
  <div class="poster"><button class="play play-lg" type="button" aria-label="Play"><span class="play__disc"></span></button></div>
</div>
:::

## The poster

A still with the slate baked in — the thumbnail as it ships. Image, gradient,
label; the eyebrow is a label, the title is display type, the corner holds the
duration or a live badge.

:::demo
<div class="grid-2">
  <div class="poster">
    <div class="poster__corner"><span class="timecode" style="color: var(--pure-white)">24:07</span></div>
    <div class="poster__label">
      <span class="poster__eyebrow">Episode 12</span>
      <span class="poster__title">Lighting a two-camera interview</span>
    </div>
  </div>
  <div class="poster">
    <div class="poster__corner"><span class="badge badge-live">Live</span></div>
    <button class="play play-sm" type="button" aria-label="Watch live"><span class="play__disc"></span></button>
    <div class="poster__label">
      <span class="poster__eyebrow">Now</span>
      <span class="poster__title">Studio Q&amp;A</span>
    </div>
  </div>
</div>
:::

:::demo Square and story posters
<div class="grid-3">
  <div class="poster poster-square"><div class="poster__label"><span class="poster__eyebrow">Short</span><span class="poster__title">The 30-second colour fix</span></div></div>
  <div class="poster poster-story"><div class="poster__label"><span class="poster__eyebrow">Story</span><span class="poster__title">Behind take 47</span></div></div>
</div>
:::

## The episode row

The list beside a player. The current row carries a 2px rule on its inline
edge — the house active state — and a soft wash, never a fill. A watched row
says so in its meta and steps back.

:::demo Wrap rows in <code>.episodes</code> and the thumbnail shrinks when the box is narrow, not the viewport
<div class="episodes stack stack-sm w-lg">
  <a class="episode" href="#i" aria-current="true">
    <span class="episode__thumb"><span class="episode__dur">24:07</span></span>
    <span class="episode__body">
      <span class="episode__title">Lighting a two-camera interview without a second key light</span>
      <span class="episode__meta">Episode 12 · Craft</span>
    </span>
  </a>
  <a class="episode" href="#i" data-done>
    <span class="episode__thumb"><span class="episode__dur">18:30</span></span>
    <span class="episode__body">
      <span class="episode__title">The audio chain from mic to upload</span>
      <span class="episode__meta">Episode 11 · Craft</span>
    </span>
  </a>
  <a class="episode" href="#i">
    <span class="episode__thumb"><span class="episode__dur">31:12</span></span>
    <span class="episode__body">
      <span class="episode__title">Why the thumbnail is the product</span>
      <span class="episode__meta">Episode 10 · Business</span>
    </span>
  </a>
</div>
:::

:::demo Numbered, and the compact row for a rail
<div class="grid-2">
  <div class="episodes stack stack-sm">
    <a class="episode episode-numbered" href="#i"><span class="episode__num">01</span><span class="episode__thumb"></span><span class="episode__body"><span class="episode__title">Setting up the room</span><span class="episode__meta">4 min</span></span></a>
    <a class="episode episode-numbered" href="#i" aria-current="true"><span class="episode__num">02</span><span class="episode__thumb"></span><span class="episode__body"><span class="episode__title">Key, fill, and the window</span><span class="episode__meta">9 min</span></span></a>
    <a class="episode episode-numbered" href="#i"><span class="episode__num">03</span><span class="episode__thumb"></span><span class="episode__body"><span class="episode__title">Grading the two cameras to match</span><span class="episode__meta">12 min</span></span></a>
  </div>
  <div class="episodes stack stack-sm">
    <a class="episode episode-sm" href="#i"><span class="episode__thumb"><span class="episode__dur">0:42</span></span><span class="episode__body"><span class="episode__title">The 30-second colour fix that actually works every time</span><span class="episode__meta">Short</span></span></a>
    <a class="episode episode-sm" href="#i"><span class="episode__thumb"><span class="episode__dur">0:58</span></span><span class="episode__body"><span class="episode__title">One mic, two people</span><span class="episode__meta">Short</span></span></a>
    <a class="episode episode-sm" href="#i"><span class="episode__thumb"><span class="episode__dur">1:04</span></span><span class="episode__body"><span class="episode__title">Export settings for every platform</span><span class="episode__meta">Short</span></span></a>
  </div>
</div>
:::

## The frame

The player wearing the viewfinder: brackets in the corners, REC top-right,
the timecode top-left. All decorative, all one child element, so nothing
fights the bar for a pseudo.

:::demo
<div class="player player-bar-open">
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%235b6b7a'/%3E%3Cstop offset='1' stop-color='%231d232b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E" alt="" />
  <span class="player__frame" aria-hidden="true"></span>
  <span class="player__tc" aria-hidden="true">TAKE 48 · 00:12:47</span>
  <span class="player__rec" aria-hidden="true">Rec</span>
  <div class="player__bar"><button class="player__btn" type="button" aria-label="Pause"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-pause"/></svg></button><span class="player__time">12:47</span><div class="player__rail" role="slider" aria-label="Seek" aria-valuemin="0" aria-valuemax="1447" aria-valuenow="767" tabindex="0"><div class="player__buffered" style="--value: 80%"></div><div class="player__played" style="--value: 53%"></div></div><span class="player__time">24:07</span></div>
</div>
:::

## Chapter markers, captions, a corner

Markers are real elements in the rail at `--at` percent, so each can be a
button with a label. The caption is a subtitle line with a clone-broken
background so a wrapped line keeps its box. The corner holds a badge.

:::demo
<div class="player player-bar-open">
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%237a5b4e'/%3E%3Cstop offset='1' stop-color='%232a1d17'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E" alt="" />
  <span class="player__corner"><span class="badge badge-live">Live</span></span>
  <p class="player__caption"><span>Bounce the key off a wall if the softbox is too big for the room.</span></p>
  <div class="player__bar">
    <button class="player__btn" type="button" aria-label="Pause"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-pause"/></svg></button>
    <span class="player__time">09:47</span>
    <div class="player__rail" role="slider" aria-label="Seek" aria-valuemin="0" aria-valuemax="1447" aria-valuenow="587" tabindex="0">
      <div class="player__buffered" style="--value: 70%"></div>
      <div class="player__played" style="--value: 40%"></div>
      <button class="player__marker" type="button" style="--at: 9%" aria-label="The key light, 02:14"></button>
      <button class="player__marker" type="button" style="--at: 40%" aria-label="Fill and rim, 09:47"></button>
      <button class="player__marker" type="button" style="--at: 62%" aria-label="Bouncing off a wall, 15:01"></button>
      <button class="player__marker" type="button" style="--at: 83%" aria-label="Grading, 20:08"></button>
    </div>
    <span class="player__time">24:07</span>
  </div>
</div>
:::

## Theatre, and mini

`player-theatre` is the 21:9 letterbox for a page-wide band. `player-mini`
is picture-in-picture: fixed to the corner, above the page (shown static
here).

:::demo
<div class="stack">
  <div class="player player-theatre player-bar-open"><div class="player__bar"><span class="player__time">21:9</span></div></div>
  <div class="player player-mini player-bar-open" style="position: static; width: 16rem"><div class="player__bar"><span class="player__time">mini</span></div></div>
</div>
:::

## The filmstrip

Frames on a strip with sprocket holes — a gallery that says footage. The
frames scroll and snap; the current one takes the accent ring; a timecode
sits in each corner.

:::demo
<div class="filmstrip">
  <a class="filmstrip__frame" href="#i"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%235b6b7a'/%3E%3Cstop offset='1' stop-color='%231d232b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E" alt="" /><span class="filmstrip__tc">00:00</span></a>
  <a class="filmstrip__frame" href="#i" aria-current="true"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%237a5b4e'/%3E%3Cstop offset='1' stop-color='%232a1d17'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E" alt="" /><span class="filmstrip__tc">02:14</span></a>
  <a class="filmstrip__frame" href="#i"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%234e6f5c'/%3E%3Cstop offset='1' stop-color='%23172a20'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E" alt="" /><span class="filmstrip__tc">09:47</span></a>
  <a class="filmstrip__frame" href="#i"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%236a5a7e'/%3E%3Cstop offset='1' stop-color='%23221a2e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E" alt="" /><span class="filmstrip__tc">15:01</span></a>
  <a class="filmstrip__frame" href="#i"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%237c6f3f'/%3E%3Cstop offset='1' stop-color='%232a2412'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E" alt="" /><span class="filmstrip__tc">20:08</span></a>
  <a class="filmstrip__frame" href="#i"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%233f5f7c'/%3E%3Cstop offset='1' stop-color='%2312202a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E" alt="" /><span class="filmstrip__tc">23:10</span></a>
</div>
:::

:::demo Small — a contact sheet in a sidebar
<div class="filmstrip filmstrip-sm w-lg">
  <a class="filmstrip__frame" href="#i"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%236b4a4a'/%3E%3Cstop offset='1' stop-color='%232a1717'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E" alt="" /></a>
  <a class="filmstrip__frame" href="#i"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%234a6b6b'/%3E%3Cstop offset='1' stop-color='%23172a2a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E" alt="" /></a>
  <a class="filmstrip__frame" href="#i"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%235b6b7a'/%3E%3Cstop offset='1' stop-color='%231d232b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E" alt="" /></a>
  <a class="filmstrip__frame" href="#i"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%237a5b4e'/%3E%3Cstop offset='1' stop-color='%232a1d17'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3C/svg%3E" alt="" /></a>
</div>
:::

## Properties

| Variable | Does |
| --- | --- |
| `--player-ratio` | aspect ratio of the player box |
| `--player-radius` | corner radius |
| `--player-rail` | thickness of the seek rail |
| `--value` | on `.player__played` and `.player__buffered`: the progress, as a percentage |
| `--play-size` | diameter of the play disc |
| `--poster-ratio` | aspect ratio of the poster |
| `--poster-pad` | inset of the label from the poster's edges |
| `--episode-thumb` | width of the thumbnail column |

## Accessibility

- Every `.player__btn` is icon-only, so it needs `aria-label`.
- The rail is a `role="slider"` with `aria-valuemin`, `aria-valuemax` and
  `aria-valuenow` in seconds, and `tabindex="0"` so the keyboard can reach it.
- `.play` is a `<button>` with a label naming what it plays, not "play".
- The current episode is `aria-current="true"`; a watched one is `data-done`.
  Neither is a class.
- `.player` sets `color-scheme: dark`, so native controls inside it render for
  a dark surface in both themes.
