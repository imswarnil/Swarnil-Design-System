---
title: Navbar
group: Components
order: 30
lead: The bar, the dropdown, the mega panel and the drawer — four things, split on purpose.
---

The navbar is three problems wearing one name, so it is three files:

| File | Owns |
| --- | --- |
| `35-navbar.css` | the bar — layout, links, variants, the burger |
| `36-menu.css` | everything that opens out of it |
| `js/nav.js` | scroll state only, and it is optional |

The previous version of this system had all of it in one 1,574-line file, which
is how a navbar becomes the file nobody wants to touch.

## The bar

:::demo
<header class="navbar navbar-bordered u-border u-rounded-lg">
  <a class="navbar__brand" href="#i"><span class="dot dot-accent"></span> Swarnil</a>
  <nav class="navbar__nav" aria-label="Main">
    <a class="navbar__link" href="#i" aria-current="page">Watch</a>
    <a class="navbar__link" href="#i">Learn</a>
    <a class="navbar__link" href="#i">Build</a>
    <a class="navbar__link" href="#i">Travel</a>
  </nav>
  <div class="navbar__actions">
    <button class="btn btn-quiet btn-sm" type="button">Sign in</button>
    <button class="btn btn-primary btn-sm" type="button">Subscribe</button>
  </div>
</header>
:::

The active link is marked with **a dot**, not a filled pill. A filled pill is
loud, and it competes with the accent for the one job the accent has.

## With icons

An icon is optional and inherits the link's colour and size, so a nav with icons
and a nav without are the same component — not two.

:::demo
<header class="navbar navbar-bordered u-border u-rounded-lg">
  <a class="navbar__brand" href="#i"><span class="dot dot-accent"></span> Swarnil</a>
  <nav class="navbar__nav" aria-label="Main">
    <a class="navbar__link" href="#i" aria-current="page"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M9 5v14l11-7z"/></svg>Watch</a>
    <a class="navbar__link" href="#i"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M6 4h8l5 5v11H6zM14 4v5h5"/></svg>Docs</a>
    <a class="navbar__link" href="#i"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M9 8l-4 4 4 4M15 8l4 4-4 4M13 5l-2 14"/></svg>Build</a>
  </nav>
  <div class="navbar__actions">
    <button class="btn btn-outline btn-sm btn-icon" type="button" aria-label="Search"><svg class="icon icon-sm" viewBox="0 0 24 24"><circle cx="10" cy="10" r="6"/><path d="M17 17l3 3"/></svg></button>
    <span class="avatar avatar-sm">S</span>
  </div>
</header>
:::

Those are [Swarnil Icons](https://icons.imswarnil.com) — the same 24 grid and
1.5 stroke, so they sit at the same weight as the text beside them.

## Dropdown

Built on the **Popover API**, which is not a stylistic preference. It buys four
behaviours that are hard to rebuild and easy to get wrong: Escape closes it,
clicking outside closes it, it renders in the top layer so no ancestor's
`overflow: hidden` can clip it, and focus returns to the trigger.

Every one of those is a bug in most hand-rolled dropdowns. **No JavaScript.**

:::demo Open it, then press Escape
<header class="navbar navbar-bordered u-border u-rounded-lg">
  <a class="navbar__brand" href="#i"><span class="dot dot-accent"></span> Swarnil</a>
  <div class="navbar__actions">
    <button class="btn btn-outline btn-sm" type="button" popovertarget="demo-menu">Account</button>
    <div class="menu" id="demo-menu" popover>
      <p class="menu__label">Signed in as swarnil</p>
      <a class="menu__item" href="#i"><svg class="icon icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>Profile</a>
      <a class="menu__item" href="#i"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M4 8h8M16 8h4M4 16h4M12 16h8"/><circle cx="14" cy="8" r="2"/><circle cx="8" cy="16" r="2"/></svg>Settings<span class="menu__kbd">⌘,</span></a>
      <hr class="menu__sep" />
      <a class="menu__item" href="#i">Sign out</a>
    </div>
  </div>
</header>
:::

## Mega panel

Use it when a flat list would be twenty items long. Twenty items is not a menu,
it is a directory nobody reads.

:::demo
<header class="navbar navbar-bordered u-border u-rounded-lg">
  <a class="navbar__brand" href="#i"><span class="dot dot-accent"></span> Swarnil</a>
  <nav class="navbar__nav" aria-label="Main">
    <button class="navbar__link" type="button" popovertarget="demo-mega">Explore</button>
    <a class="navbar__link" href="#i">Pricing</a>
  </nav>
  <div class="menu menu-mega" id="demo-mega" popover>
    <div class="menu-mega__grid">
      <div class="menu-mega__col">
        <p class="menu__label">Watch</p>
        <a class="menu-mega__item" href="#i">
          <span class="menu-mega__ico"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M9 5v14l11-7z"/></svg></span>
          <span><span class="menu-mega__title">Episodes</span><span class="menu-mega__desc">Every build log, newest first.</span></span>
        </a>
        <a class="menu-mega__item" href="#i">
          <span class="menu-mega__ico"><svg class="icon icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/></svg></span>
          <span><span class="menu-mega__title">Live</span><span class="menu-mega__desc">What is on air right now.</span></span>
        </a>
      </div>
      <div class="menu-mega__col">
        <p class="menu__label">Learn</p>
        <a class="menu-mega__item" href="#i">
          <span class="menu-mega__ico"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M6 4h8l5 5v11H6zM14 4v5h5"/></svg></span>
          <span><span class="menu-mega__title">Courses</span><span class="menu-mega__desc">Long-form, start to finish.</span></span>
        </a>
        <a class="menu-mega__item" href="#i">
          <span class="menu-mega__ico"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M9 8l-4 4 4 4M15 8l4 4-4 4M13 5l-2 14"/></svg></span>
          <span><span class="menu-mega__title">Snippets</span><span class="menu-mega__desc">Small things worth stealing.</span></span>
        </a>
      </div>
      <div class="menu-mega__col">
        <p class="menu__label">Make</p>
        <a class="menu-mega__item" href="#i">
          <span class="menu-mega__ico"><svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M4 9V6a2 2 0 0 1 2-2h3M15 4h3a2 2 0 0 1 2 2v3M20 15v3a2 2 0 0 1-2 2h-3M9 20H6a2 2 0 0 1-2-2v-3"/><circle cx="12" cy="12" r="3"/></svg></span>
          <span><span class="menu-mega__title">Thumbnails</span><span class="menu-mega__desc">Export at every safe size.</span></span>
        </a>
      </div>
    </div>
    <div class="menu-mega__foot">
      <span class="t-small t-muted">Everything is MIT and open in the repo.</span>
      <a class="btn btn-outline btn-sm" href="#i">Browse all</a>
    </div>
  </div>
</header>
:::

## The drawer

The hamburger's panel: full height, sections separated by rules, 44px rows, and
the active row marked with a dot. It is a popover too, so Escape and
click-outside are free, and it slides using `@starting-style` rather than a
class the JavaScript has to add and remove.

:::demo Open it, then press Escape or click outside
<header class="navbar navbar-bordered u-border u-rounded-lg">
  <button class="navbar__burger" type="button" popovertarget="demo-sheet" aria-expanded="false" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
  <a class="navbar__brand" href="#i"><span class="dot dot-accent"></span> Swarnil</a>

  <div class="sheet" id="demo-sheet" popover>
    <div class="sheet__head">
      <button class="btn btn-quiet btn-sm btn-icon" type="button" popovertarget="demo-sheet" popovertargetaction="hide" aria-label="Close">
        <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <span class="navbar__brand"><span class="dot dot-accent"></span> Swarnil</span>
    </div>
    <div class="sheet__body">
      <div class="sheet__group">
        <a class="sheet__link" href="#i" aria-current="page"><svg class="icon" viewBox="0 0 24 24"><path d="M9 5v14l11-7z"/></svg>Watch<span class="sheet__count">128</span></a>
        <a class="sheet__link" href="#i"><svg class="icon" viewBox="0 0 24 24"><path d="M6 4h8l5 5v11H6zM14 4v5h5"/></svg>Learn<span class="sheet__count">14</span></a>
        <a class="sheet__link" href="#i"><svg class="icon" viewBox="0 0 24 24"><path d="M9 8l-4 4 4 4M15 8l4 4-4 4M13 5l-2 14"/></svg>Build<span class="sheet__count">31</span></a>
      </div>
      <div class="sheet__group">
        <p class="sheet__label">Library</p>
        <a class="sheet__link" href="#i"><svg class="icon" viewBox="0 0 24 24"><path d="M6 4h12v16l-6-4-6 4z"/></svg>Saved</a>
        <a class="sheet__link" href="#i"><svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>History</a>
      </div>
    </div>
    <p class="sheet__foot">MIT &middot; built in the open</p>
  </div>

  <div class="navbar__actions">
    <span class="avatar avatar-sm">S</span>
  </div>
</header>
:::

Hit the **320px** toggle above and the burger appears while the inline nav
hides. That is the one media query in the navbar, and it is correct there: a
navbar collapsing is a *page* decision, not a component one. Everything else in
this system uses container queries.

## Variants

| Class | Does |
| --- | --- |
| `navbar-sticky` | pins to the top of the viewport |
| `navbar-bordered` | a hairline under the bar |
| `navbar-blur` | translucent, but only once `[data-scrolled]` is set |
| `navbar-transparent` | no background at the top, solid once scrolled |
| `navbar-centered` | brand left, nav centred, actions right |
| `navbar-tall` | 4.5rem instead of 3.5rem |
| `navbar-inverse` | ink and paper flipped |
| `navbar-hide-on-scroll` | hides going down, returns going up |

:::demo Inverse and tall
<header class="navbar navbar-inverse navbar-tall u-rounded-lg">
  <a class="navbar__brand" href="#i"><span class="dot dot-accent"></span> Swarnil</a>
  <nav class="navbar__nav" aria-label="Main">
    <a class="navbar__link" href="#i" aria-current="page">Watch</a>
    <a class="navbar__link" href="#i">Learn</a>
  </nav>
  <div class="navbar__actions">
    <button class="btn btn-primary btn-sm" type="button">Subscribe</button>
  </div>
</header>
:::

## State

Nothing here is a class you have to keep in sync:

| Attribute | Set by | Means |
| --- | --- | --- |
| `aria-current="page"` | you | which link you are on |
| `aria-expanded` | `nav.js` | the burger is open |
| `data-scrolled` | `nav.js` | the bar has left the top |
| `data-dir` | `nav.js` | last meaningful scroll direction |
| `:popover-open` | the browser | the panel is open |

`nav.js` uses a 6px direction threshold and an 80px floor. Without the
threshold, trackpad jitter flips the direction constantly and a hide-on-scroll
bar flickers; without the floor, the bar can vanish while you are still looking
at the top of the page.

## Properties

| Variable | Does |
| --- | --- |
| `--navbar-h` | bar height |
| `--navbar-bg` | background |
| `--navbar-pad` | inline padding |
| `--menu-w` | dropdown width |
| `--mega-col` | minimum mega-panel column width |
| `--sheet-w` | drawer width |

## Accessibility

- The burger is a real `<button>` with `aria-expanded` and an `aria-label`.
- The drawer and dropdowns are popovers, so focus returns to the trigger on
  close and Escape works without a keydown listener.
- Drawer rows are 44px — a drawer is a touch target by definition.
- Under reduced motion the panels still open; they just stop travelling.
