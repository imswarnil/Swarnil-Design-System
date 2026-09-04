---
title: Elevation
group: Foundation
order: 27
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

## The rule

No component names a shadow, ever. If a component wrote `box-shadow: 0 8px…`
it would be right in light and invisible in dark — the exact class of bug the
token exists to make unwritable. The only other depth token is
`--shadow-media`, the letterbox glow under video — different idea: light coming
*out* of the media, not falling on it.
