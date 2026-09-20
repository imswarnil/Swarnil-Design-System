---
title: Patterns & shapes
group: Foundation
order: 50
lead: CSS-only textures and the small geometry — zero images, zero requests, theme-proof by construction.
---

Every texture derives from `--pattern-ink`, a `light-dark()` token — so no
pattern knows which theme it is in, and there is no dark-mode variant of any of
them. Toggle the theme on this page and watch them re-ink themselves.

## The textures

:::demo
<div class="grid-auto grid-auto-sm">
  <div class="ratio ratio-photo rounded-lg hairline pattern pattern-grid"></div>
  <div class="ratio ratio-photo rounded-lg hairline pattern pattern-dot"></div>
  <div class="ratio ratio-photo rounded-lg hairline pattern pattern-line"></div>
  <div class="ratio ratio-photo rounded-lg hairline pattern pattern-scan"></div>
  <div class="ratio ratio-photo rounded-lg hairline pattern pattern-hatch"></div>
  <div class="ratio ratio-photo rounded-lg hairline pattern pattern-halftone"></div>
  <div class="ratio ratio-photo rounded-lg hairline pattern pattern-timecode"></div>
  <div class="ratio ratio-photo rounded-lg hairline pattern pattern-cross"></div>
  <div class="ratio ratio-photo rounded-lg hairline pattern pattern-checker pattern-faint"></div>
  <div class="ratio ratio-photo rounded-lg hairline pattern pattern-blueprint"></div>
  <div class="ratio ratio-photo rounded-lg hairline pattern pattern-grid pattern-fade"></div>
</div>
:::

## Controlling a pattern

Two knobs and four named steps make every variant, so a new look is a class or
a token — never a new pattern:

:::demo One texture, four controls
<div class="grid-auto grid-auto-sm">
  <div class="ratio ratio-photo rounded-lg hairline pattern pattern-grid pattern-fine"></div>
  <div class="ratio ratio-photo rounded-lg hairline pattern pattern-grid"></div>
  <div class="ratio ratio-photo rounded-lg hairline pattern pattern-grid pattern-coarse"></div>
  <div class="ratio ratio-photo rounded-lg hairline pattern pattern-grid pattern-strong"></div>
</div>
:::

```html
<div class="pattern pattern-line" style="--pattern-angle: 30deg; --pattern-size: 2rem">
```

| Control | Does |
| --- | --- |
| `--pattern-size` | cell / stripe pitch |
| `--pattern-angle` | stripe direction (line, hatch) |
| `pattern-fine` / `pattern-coarse` | named density steps |
| `pattern-strong` / `pattern-faint` | ink weight — strong swaps to the heavier ink token |

| Class | Reads as |
| --- | --- |
| `pattern-grid` | graph paper, the construction sheet |
| `pattern-dot` | the contact sheet |
| `pattern-line` | diagonal hatching, single |
| `pattern-scan` | the tape — scanlines |
| `pattern-hatch` | crosshatch, heavier |
| `pattern-halftone` | print dots |
| `pattern-timecode` | the film edge — a taller tick every fifth |
| `pattern-cross` | registration marks — the technical drawing |
| `pattern-checker` | transparency's own ground; export canvases |
| `pattern-blueprint` | fine grid, heavier line every fifth — graph paper with authority |
| `pattern-fade` | modifier: fades any texture out toward the centre |

Knobs: `--pattern-size`, `--pattern-angle`.

## The composition warning

Every pattern paints on `::before`, and an element has exactly one. A pattern
therefore **cannot share an element** with `.frame`, `.vf`, or anything else
that spends its pseudo-elements. Put the pattern on a child or a parent — the
same rule the frame page states from its side.

:::demo Pattern on a child, brackets on the parent — the legal composition
<div class="ratio ratio-photo w-md relative rounded-lg hairline">
  <div class="pattern pattern-timecode absolute inset-0"></div>
</div>
:::

## The small geometry

Dots and rules — the system's punctuation marks.

:::demo
<div class="stack">
  <div class="cluster">
    <span class="dot dot-sm"></span>
    <span class="dot"></span>
    <span class="dot dot-lg"></span>
    <span class="dot dot-accent"></span>
    <span class="dot dot-live"></span>
    <span class="dot dot-success"></span>
    <span class="dot dot-danger"></span>
  </div>
  <hr class="rule m-0" />
  <hr class="rule rule-accent m-0" />
  <div class="rule-label">Take two</div>
</div>
:::

The dot is the smallest mark that can carry the accent, which is why it is the
system's "you are here" everywhere — nav, tabs, TOC, drawer. `.rule-label` puts
a word on a rule without background hacks: the two line segments are flex
children.

## Where patterns belong

On **stages, media placeholders and export canvases** — places that represent
footage or construction. Not behind body text (the type page's contrast rules
still apply on top of a texture), and never on a demo stage in these docs: a
preview owes you nothing between you and the component.

## Three more textures

:::demo `pattern-wave`, `pattern-brick`, `pattern-zigzag`
<div class="grid-3">
  <div class="pattern pattern-wave p-(--space-8) rounded-lg hairline"><span class="t-data">wave</span></div>
  <div class="pattern pattern-brick p-(--space-8) rounded-lg hairline"><span class="t-data">brick</span></div>
  <div class="pattern pattern-zigzag pattern-fine p-(--space-8) rounded-lg hairline"><span class="t-data">zigzag</span></div>
</div>
:::

The wave is the only curve in the set — two offset radial gradients read as a
scallop, which is the texture for anything about sound or water. Brick offsets
every other row, and that offset is what stops a grid reading as graph paper.
Zigzag reads as motion, so it belongs on a band that is going somewhere.

## Five more, for when the first eleven are wrong

:::demo
<div class="grid-auto grid-auto-sm">
  <div class="pattern pattern-triangle pattern-faint p-(--space-8) rounded-lg hairline"><span class="t-data">triangle</span></div>
  <div class="pattern pattern-carbon p-(--space-8) rounded-lg hairline"><span class="t-data">carbon</span></div>
  <div class="pattern pattern-topo pattern-coarse p-(--space-8) rounded-lg hairline"><span class="t-data">topo</span></div>
  <div class="pattern pattern-moire p-(--space-8) rounded-lg hairline"><span class="t-data">moiré</span></div>
  <div class="pattern pattern-diamond pattern-faint p-(--space-8) rounded-lg hairline"><span class="t-data">diamond</span></div>
</div>
:::

- **triangle** — diagonals that close into shapes. The densest texture in the
  set, so it wants `pattern-faint` under anything you expect to be read.
- **carbon** — the weave. Four gradients at opposing angles on a half-offset
  grid; the offset is the whole trick, and without it this is a checker.
- **topo** — concentric rings on two offset centres, so they interfere instead
  of reading as a target. For anything about a place.
- **moiré** — two grids a few degrees apart. The interference is the point, and
  it is the one texture here that is genuinely unstable at some zoom levels.
  That instability is the effect — and also why it never goes behind body copy.
- **diamond** — the argyle. A checker rotated, which is a different thing from
  a checker: the eye reads diagonals as movement and squares as grid.

:::demo Two of them doing real work — a band and a card
<div class="stack">
  <section class="section section-tight bg-sunken pattern pattern-topo pattern-coarse pattern-fade rounded-lg">
    <div class="center center-md text-center">
      <p class="eyebrow">Travel</p>
      <h3 class="t-h2 m-0">Twenty-three countries, one lens</h3>
    </div>
  </section>
  <div class="grid-2 cq-card">
    <article class="card card-quiet"><span class="card__pattern pattern pattern-carbon" aria-hidden="true"></span><div class="card__body"><h4 class="card__title">Carbon</h4><p class="card__excerpt">Under a card, at full strength, masked back from the words by the slot.</p></div></article>
    <article class="card card-quiet"><span class="card__pattern pattern pattern-diamond pattern-fine" aria-hidden="true"></span><div class="card__body"><h4 class="card__title">Diamond, fine</h4><p class="card__excerpt">The density modifiers work on every texture, including these.</p></div></article>
  </div>
</div>
:::

## Rules

A divider is punctuation, and a page needs more than one full stop.

:::demo
<div class="stack stack-lg">
  <div><hr class="rule" /><span class="t-fine t-muted">rule</span></div>
  <div><hr class="rule rule-dashed" /><span class="t-fine t-muted">rule-dashed</span></div>
  <div><hr class="rule rule-dotted" /><span class="t-fine t-muted">rule-dotted</span></div>
  <div><hr class="rule rule-fade" /><span class="t-fine t-muted">rule-fade — stops without a hard edge, for under a centred heading</span></div>
  <div><hr class="rule rule-accent" /><span class="t-fine t-muted">rule-accent</span></div>
  <div class="rule rule-label"><span>Take 48</span></div>
</div>
:::

## The notch

A clipped corner reads as a ticket, a badge, a slate. One class, and the size
is a variable, so a small chip and a large card can both wear it without either
looking wrong.

:::demo `.notch`, `.notch-sm`, `.notch-lg`, and one corner only
<div class="cluster cluster-lg">
  <div class="notch p-5 bg-sunken hairline"><span class="t-data">notch</span></div>
  <div class="notch notch-sm p-5 bg-sunken hairline"><span class="t-data">notch-sm</span></div>
  <div class="notch notch-lg p-6 bg-sunken hairline"><span class="t-data">notch-lg</span></div>
  <div class="notch notch-end p-5 surface-inverse"><span class="t-data">notch-end</span></div>
</div>
:::

`clip-path` clips the border with everything else, so a notched box wants a
background rather than an outline — which is why the examples above are filled.
