---
title: Dropdown
group: Components
order: 35
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
