---
title: Overlays
group: Elements
order: 65
lead: Veils and glass — scrims, vignette, grain, the colour grade, and the translucent panel that sits on footage.
---

A veil is a layer laid over a picture: the scrim that makes a caption
legible, the vignette that says *lens*, the grain that says *film*, the tint
that pulls a stranger's photo into the palette. It is the creator's colour
grade, in CSS, applied to any image without touching the file.

`.veil` is an absolutely-positioned child that fills its positioned parent
and lets pointer events through; a variant sets what that layer paints.
Because a veil is an element, not a pseudo, it never fights `.frame` or
`.pattern`, and any number stack in source order.

## Scrims

The gradient that lets type sit on a photograph. Hard-edged gradients, never
blurs — a blur costs a compositor layer per image and a grid has twenty.

:::demo
<div class="grid-3">
  <div class="poster bg-aurora"><span class="veil veil-scrim"></span><span class="veil-caption t-label">scrim</span></div>
  <div class="poster bg-aurora"><span class="veil veil-scrim-top"></span><span class="veil-caption veil-caption-top t-label">scrim-top</span></div>
  <div class="poster bg-aurora"><span class="veil veil-scrim-start"></span><span class="veil-caption t-label">scrim-start</span></div>
  <div class="poster bg-aurora"><span class="veil veil-scrim-end"></span><span class="veil-caption t-label" style="text-align: end">scrim-end</span></div>
  <div class="poster bg-aurora"><span class="veil veil-scrim-full"></span><span class="veil-caption veil-caption-centre t-label">scrim-full</span></div>
  <div class="poster bg-aurora"><span class="veil veil-scrim-both"></span><span class="veil-caption veil-caption-centre t-label">scrim-both</span></div>
</div>
:::

`veil-heavy` darkens the heavy end further; `veil-light` halves the whole
layer. `veil-caption`, `-top` and `-centre` place the words.

:::demo
<div class="grid-2">
  <div class="poster bg-aurora"><span class="veil veil-scrim veil-heavy"></span><span class="veil-caption t-label">veil-heavy</span></div>
  <div class="poster bg-aurora"><span class="veil veil-scrim veil-light"></span><span class="veil-caption t-label">veil-light</span></div>
</div>
:::

## The lens

:::demo Vignette, letterbox, spot, scan
<div class="grid-auto grid-auto-sm">
  <div class="poster bg-mesh"><span class="veil veil-vignette"></span></div>
  <div class="poster bg-mesh"><span class="veil veil-letterbox"></span></div>
  <div class="poster bg-mesh"><span class="veil veil-spot"></span></div>
  <div class="poster bg-mesh"><span class="veil veil-scan"></span></div>
</div>
:::

## The grade

Blend modes, so the veil recolours instead of covering. `veil-tint` is a soft
wash of the accent; `veil-craft` the warm one; `veil-ink` pulls the colour
out; `veil-grade` on a `veil-mono` parent is the full duotone — the image goes
to ink and the accent fills the lights. Change the accent preset and every
graded image on the site follows.

:::demo
<div class="grid-auto grid-auto-sm">
  <div class="poster"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1'%3E%3Cstop offset='0' stop-color='%236a8caf'/%3E%3Cstop offset='1' stop-color='%23d9a066'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3Ccircle cx='11' cy='4' r='2.5' fill='%23fff' opacity='.8'/%3E%3C/svg%3E" alt="" /><span class="veil-caption t-label">original</span></div>
  <div class="poster"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1'%3E%3Cstop offset='0' stop-color='%236a8caf'/%3E%3Cstop offset='1' stop-color='%23d9a066'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3Ccircle cx='11' cy='4' r='2.5' fill='%23fff' opacity='.8'/%3E%3C/svg%3E" alt="" /><span class="veil veil-tint"></span><span class="veil-caption t-label">tint</span></div>
  <div class="poster"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1'%3E%3Cstop offset='0' stop-color='%236a8caf'/%3E%3Cstop offset='1' stop-color='%23d9a066'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3Ccircle cx='11' cy='4' r='2.5' fill='%23fff' opacity='.8'/%3E%3C/svg%3E" alt="" /><span class="veil veil-craft"></span><span class="veil-caption t-label">craft</span></div>
  <div class="poster"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1'%3E%3Cstop offset='0' stop-color='%236a8caf'/%3E%3Cstop offset='1' stop-color='%23d9a066'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3Ccircle cx='11' cy='4' r='2.5' fill='%23fff' opacity='.8'/%3E%3C/svg%3E" alt="" /><span class="veil veil-ink"></span><span class="veil-caption t-label">ink</span></div>
  <div class="poster veil-mono"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1'%3E%3Cstop offset='0' stop-color='%236a8caf'/%3E%3Cstop offset='1' stop-color='%23d9a066'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3Ccircle cx='11' cy='4' r='2.5' fill='%23fff' opacity='.8'/%3E%3C/svg%3E" alt="" /><span class="veil veil-grade"></span><span class="veil-caption t-label">mono + grade</span></div>
  <div class="poster"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1'%3E%3Cstop offset='0' stop-color='%236a8caf'/%3E%3Cstop offset='1' stop-color='%23d9a066'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3Ccircle cx='11' cy='4' r='2.5' fill='%23fff' opacity='.8'/%3E%3C/svg%3E" alt="" /><span class="veil veil-grain"></span><span class="veil-caption t-label">grain</span></div>
</div>
:::

## Stacked

Grade, then scrim, then grain — the order is the source order.

:::demo
<div class="poster veil-mono w-lg">
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%236a8caf'/%3E%3Cstop offset='1' stop-color='%23d9a066'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='9' fill='url(%23g)'/%3E%3Ccircle cx='5' cy='4' r='2.5' fill='%23fff' opacity='.8'/%3E%3C/svg%3E" alt="" />
  <span class="veil veil-grade"></span>
  <span class="veil veil-scrim"></span>
  <span class="veil veil-grain"></span>
  <div class="poster__label"><span class="poster__eyebrow">Episode 48</span><span class="poster__title">Every photo, one palette</span></div>
</div>
:::

## Glass

The panel that sits on footage — a caption box, a floating toolbar, a lower
third — and blurs what is behind it. The hairline of light along its top edge
is what makes glass read as glass rather than as a grey box. On footage it is
always dark glass, by the player's rule. Under `prefers-reduced-transparency`
the blur is dropped and the panel becomes an opaque overlay surface.

:::demo
<div class="poster bg-aurora pattern pattern-grid w-lg" style="min-height: 16rem">
  <div class="glass u-p-4" style="position: absolute; inset: var(--space-4) auto auto var(--space-4); max-width: 16rem">
    <p class="t-label u-m-0 u-mb-2">glass</p>
    <p class="t-small u-m-0">Follows the theme.</p>
  </div>
  <div class="glass glass-dark u-p-4" style="position: absolute; inset: var(--space-4) var(--space-4) auto auto; max-width: 14rem">
    <p class="t-label u-m-0 u-mb-2" style="color: inherit">glass-dark</p>
    <p class="t-small u-m-0" style="color: inherit">Always dark.</p>
  </div>
  <div class="glass glass-light glass-flat glass-sm u-p-3" style="position: absolute; inset: auto auto var(--space-4) var(--space-4)">
    <span class="t-label" style="color: inherit">glass-light · flat · sm</span>
  </div>
  <div class="glass glass-dark glass-pill cluster cluster-sm" style="position: absolute; inset: auto var(--space-4) var(--space-4) auto; padding: var(--space-2) var(--space-3)">
    <button class="btn btn-icon btn-ghost btn-sm" type="button" aria-label="Play"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-play"/></svg></button>
    <button class="btn btn-icon btn-ghost btn-sm" type="button" aria-label="Volume"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-volume"/></svg></button>
  </div>
</div>
:::

## Properties

| Variable | Does |
| --- | --- |
| `--veil-scrim` | the colour at a scrim's heavy end |
| `--letterbox` | the height of each letterbox bar |
| `--glass-bg` | the panel's tint |
| `--glass-blur` | how much the panel blurs what is behind it |
