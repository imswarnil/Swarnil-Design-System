---
title: Elevation
group: Foundation
order: 50
lead: Components ask for depth, never for a shadow — because dark has no light to cast one.
---

**Dark lifts, light drops.** In light, depth is a shadow: light falls from
above and the raised thing casts. In dark there is nothing to cast onto — a
darker shadow on near-black is invisible — so depth becomes a *lighter
surface* plus a translucent hairline, which is how depth actually reads on a
dark screen.

A component writes one line and gets the right idea in both themes:

```css
box-shadow: var(--elevation-2);
```

## The ladder

:::demo Toggle the theme — shadows become lifts
<div class="cluster cluster-lg">
  <div class="elev-tile" style="--e: var(--elevation-0)"><span class="t-data">0</span></div>
  <div class="elev-tile" style="--e: var(--elevation-1)"><span class="t-data">1</span></div>
  <div class="elev-tile" style="--e: var(--elevation-2)"><span class="t-data">2</span></div>
  <div class="elev-tile" style="--e: var(--elevation-3)"><span class="t-data">3</span></div>
  <div class="elev-tile" style="--e: var(--elevation-4)"><span class="t-data">4</span></div>
</div>
:::

| Step | Light | Dark | For |
| --- | --- | --- | --- |
| `0` | none | none | flush content |
| `1` | a breath | faint hairline | resting cards |
| `2` | soft drop | hairline lift | hover, raised cards |
| `3` | present | brighter hairline | menus, popovers |
| `4` | commanding | strongest lift | dialogs |

## Where each step actually goes

The ladder above is abstract, which is why it is easy to pick the wrong rung.
Here is the same five steps as the things they are for, at the size they are
used, so the choice is a comparison rather than a guess.

:::demo Every one of these is a real use, not a swatch
<div class="stack stack-lg">

  <div class="stack stack-sm">
    <p class="t-label">0 — flush content</p>
    <div class="grid-2 cq-card">
      <article class="card"><div class="card__body"><h4 class="card__title">In a list</h4><p class="card__excerpt">A card in a feed sits on the page. It has a hairline; it does not float.</p></div></article>
      <div class="p-5 bg-sunken rounded-lg"><span class="t-small t-muted">A sunken panel is a hole, not a lift. Depth downward needs no shadow at all.</span></div>
    </div>
  </div>

  <div class="stack stack-sm">
    <p class="t-label">1 — a resting card that must separate from a busy ground</p>
    <div class="bg-sunken bg-graph p-6 rounded-lg">
      <div class="grid-2 cq-card">
        <article class="card card-raised"><div class="card__body"><h4 class="card__title">On a texture</h4><p class="card__excerpt">Against a patterned band the hairline disappears, so the card borrows one step.</p></div></article>
        <article class="card"><div class="card__body"><h4 class="card__title">Without it</h4><p class="card__excerpt">The same card with no elevation — legible, but it reads as part of the band.</p></div></article>
      </div>
    </div>
  </div>

  <div class="stack stack-sm">
    <p class="t-label">2 — hover, and the segmented control's chosen segment</p>
    <div class="cluster cluster-lg">
      <article class="card card-hover-lift w-sm"><div class="card__body"><h4 class="card__title">Point at me</h4><p class="card__excerpt">Rest is a hairline; hover is step 2. The change is the affordance.</p></div></article>
      <div class="viewtoggle" role="group" aria-label="View">
        <label class="viewtoggle__opt"><input type="radio" name="e-view" value="grid" checked /><span class="sr-only">Grid</span><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-grid"/></svg></label>
        <label class="viewtoggle__opt"><input type="radio" name="e-view" value="list" /><span class="sr-only">List</span><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-menu"/></svg></label>
      </div>
    </div>
  </div>

  <div class="stack stack-sm">
    <p class="t-label">3 — menus, popovers, tooltips: things that sit over the page but do not own it</p>
    <div class="cluster">
      <button class="btn btn-outline" type="button" popovertarget="elev-pop">Open a popover</button>
      <div class="pop pop-sm" id="elev-pop" popover><div class="pop__body"><p class="t-small m-0">Step 3. Above the page, but the page is still yours — nothing dims.</p></div></div>
      <span class="tipcard tipcard-below" style="position: static; opacity: 1; translate: none">A tooltip, at the same step</span>
    </div>
  </div>

  <div class="stack stack-sm">
    <p class="t-label">4 — the dialog, which does own the page</p>
    <div class="p-6 bg-sunken rounded-lg">
      <div class="card card-raised mx-auto" style="max-inline-size: 26rem; box-shadow: var(--elevation-4)">
        <div class="card__body"><h4 class="card__title">Delete take 48?</h4><p class="card__excerpt">Step 4 is the top of the ladder, and the only thing that earns it is a modal — because a modal has taken the page away and has to look like it.</p></div>
        <div class="card__actions"><button class="btn btn-ghost btn-sm" type="button">Cancel</button><button class="btn btn-danger btn-sm" type="button">Delete</button></div>
      </div>
    </div>
  </div>

</div>
:::

## Two steps is the whole story of an interaction

A component that changes elevation should change it by **one** rung. Resting to
hover is 1 → 2. A dialog opening is not an elevation change at all: it arrives
at 4 and stays there.

Jumping two rungs reads as a different object appearing rather than the same
object moving, which is precisely the confusion depth exists to prevent.

## The rule

No component names a shadow, ever. If a component wrote `box-shadow: 0 8px…`
it would be right in light and invisible in dark — the exact class of bug the
token exists to make unwritable. The only other depth token is
`--shadow-media`, the letterbox glow under video — different idea: light coming
*out* of the media, not falling on it.
