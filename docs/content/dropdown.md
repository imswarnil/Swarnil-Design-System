---
title: Dropdown
group: Components
order: 50
lead: Click menus, hover menus, the account menu and the mega panel — and when each is honest.
---

Two opening behaviours, one rule: **hover is for browsing, click is for
consequences.** A menu that appears under a passing cursor is fine to look at
and wrong to act from.

## Click — the popover menu

Escape, click-outside, top layer and focus return, all from the platform, no
JavaScript:

:::demo
<button class="btn btn-outline" type="button" popovertarget="dd-1">Options</button>
<div class="menu" id="dd-1" popover>
  <a class="menu__item" href="#i"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-edit"/></svg>Rename</a>
  <a class="menu__item" href="#i"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-download"/></svg>Export<span class="menu__kbd">⌘E</span></a>
  <hr class="menu__sep" />
  <a class="menu__item" href="#i"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-trash"/></svg>Delete</a>
</div>
:::

## Hover — the browsing menu

`.menu-hover` opens on hover **or keyboard focus**, CSS only. It forfeits the
top layer (it is not a popover), so keep it out of `overflow: hidden`
ancestors.

:::demo Hover "Watch", or tab into it
<nav class="cluster" aria-label="Demo">
  <span class="menu-hover">
    <a class="navbar__link" href="#i">Watch</a>
    <span class="menu">
      <a class="menu__item" href="#i">Episodes</a>
      <a class="menu__item" href="#i">Live</a>
      <a class="menu__item" href="#i">Shorts</a>
    </span>
  </span>
  <a class="navbar__link" href="#i">Learn</a>
</nav>
:::

## The account menu

The avatar is the trigger; the panel leads with identity, and the destructive
action sits last, after a separator, unaccented:

:::demo
<div class="u-flex u-justify-end">
  <button class="avatar avatar-sm" type="button" popovertarget="dd-acct" aria-label="Account">S</button>
  <div class="menu menu-end" id="dd-acct" popover>
    <p class="menu__label">swarnil@studio</p>
    <a class="menu__item" href="#i"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-user"/></svg>Profile</a>
    <a class="menu__item" href="#i"><svg class="icon icon-sm"><use href="/icons/sprite.svg#i-settings"/></svg>Settings<span class="menu__kbd">⌘,</span></a>
    <hr class="menu__sep" />
    <a class="menu__item" href="#i">Sign out</a>
  </div>
</div>
:::

## The mega panel

For when a flat list would be twenty items — twenty items is not a menu, it is
a directory nobody reads. Grouped columns, an icon and a description per
destination, a footer strip. Full demo on the [navbar page](/navbar.html).

## Choosing

| Situation | Use |
| --- | --- |
| actions on a thing | click popover menu |
| a nav section to explore | hover menu |
| identity + session | account menu, click |
| a whole sitemap | mega panel |
| more than ~7 ungrouped items | stop — group them or rethink |

## The popover — a panel, not a list

A `.menu` is a list of actions. A `.pop` is a **panel**: a filter box, a share
sheet, a confirm-in-place, a hint on touch where a tooltip cannot reach. If the
contents would be a `<ul>` of verbs, it is a menu; if it would be a paragraph
and a control, it is this.

The wiring is the platform's, in full: the trigger is
`<button popovertarget="id">`, the panel is `<div class="pop" id="id" popover>`.
Escape, click-outside, focus return and top-layer rendering all come free, and
there is no JavaScript on this page making any of it work.

:::demo Four placements. Open one, then press Escape.
<div class="cluster">
  <button class="btn btn-outline" type="button" popovertarget="pop-b">Below <svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-chevron-down"/></svg></button>
  <div class="pop pop-arrow" id="pop-b" popover>
    <div class="pop__head"><p class="pop__title">Share this take</p><button class="pop__close" type="button" popovertarget="pop-b" popovertargetaction="hide" aria-label="Close"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-x"/></svg></button></div>
    <div class="pop__body"><p class="t-small u-m-0">Anyone with the link can watch it before it is public.</p></div>
    <div class="pop__foot"><button class="btn btn-ghost btn-sm" type="button" popovertarget="pop-b" popovertargetaction="hide">Cancel</button><button class="btn btn-primary btn-sm" type="button">Copy link</button></div>
  </div>

  <button class="btn btn-outline" type="button" popovertarget="pop-a">Above</button>
  <div class="pop pop-above pop-sm" id="pop-a" popover>
    <div class="pop__body"><p class="t-small u-m-0">A small one, above the trigger.</p></div>
  </div>

  <button class="btn btn-outline" type="button" popovertarget="pop-e">End</button>
  <div class="pop pop-end pop-align-start" id="pop-e" popover>
    <div class="pop__head"><p class="pop__title">Aligned to the start edge</p></div>
    <div class="pop__body"><p class="t-small u-m-0"><code class="code">pop-start</code>, <code class="code">pop-end</code>, <code class="code">pop-above</code> pick the side; <code class="code">pop-align-start</code> and <code class="code">pop-align-end</code> pick which edge lines up.</p></div>
  </div>

  <button class="btn btn-outline" type="button" popovertarget="pop-l">Large</button>
  <div class="pop pop-lg" id="pop-l" popover>
    <div class="pop__head"><p class="pop__title">Filter episodes</p><button class="pop__close" type="button" popovertarget="pop-l" popovertargetaction="hide" aria-label="Close"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-x"/></svg></button></div>
    <div class="pop__body">
      <div class="facets">
        <div class="facets__group">
          <p class="facets__label">Category</p>
          <ul class="facets__list">
            <li><label class="facets__opt"><input type="checkbox" checked /><span>Craft</span><span class="facets__count">41</span></label></li>
            <li><label class="facets__opt"><input type="checkbox" /><span>Code</span><span class="facets__count">33</span></label></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="pop__foot"><button class="btn btn-ghost btn-sm" type="button">Clear</button><button class="btn btn-primary btn-sm" type="button" popovertarget="pop-l" popovertargetaction="hide">Apply</button></div>
  </div>

  <button class="btn btn-ghost btn-sm btn-icon" type="button" popovertarget="pop-t" aria-label="What is a take?"><svg class="icon icon-sm" aria-hidden="true"><use href="/icons/sprite.svg#i-circle-info"/></svg></button>
  <div class="pop pop-tip pop-sm" id="pop-t" popover>A take is one recorded attempt. The number in the corner of a frame is which one you are watching.</div>
</div>
:::

`.pop-tip` is the hint dress: no head, no foot, one paragraph. It exists
because a tooltip cannot be opened by touch, and a touch user asking "what is
this?" deserves an answer rather than a hover they cannot perform.

Where the browser supports `position-area`, the panel anchors itself to its
invoker and flips when the chosen side would clip. Where it does not, it
centres — which is a correct panel, just a less clever one.
