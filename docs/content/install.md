---
title: Installation
group: Start
order: 20
lead: Two ways in — a link tag with nothing to install, or the source entry inside your own Tailwind build.
---

## Which one are you?

This package ships the same system twice, and which you want depends on one
question: **do you already run Tailwind?**

| | you get | you need |
| --- | --- | --- |
| **A link tag** | `dist/swarnil-design.css` — Tailwind, daisyUI and this system already compiled | nothing |
| **The source entry** | `@imswarnil/swarnil-design` — compiled with *your* markup | Tailwind 4 |

The difference is not the design, which is identical. It is which utilities you
get. The prebuilt file has to guess, so it ships a stated set
([the safelist](https://github.com/imswarnil/Swarnil-Design-System/blob/main/src/0-config/safelist.css));
the source entry generates utilities from your own class names, so it is both
smaller and unlimited.

## A link tag, nothing to install

```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@imswarnil/swarnil-design/dist/swarnil-design.min.css">
```

That is the whole integration. Tailwind and daisyUI are inside the file; there
is no config, no build step and no npm install.

## Inside your own Tailwind build

```bash
npm install @imswarnil/swarnil-design
```

```css
@import "tailwindcss";
@import "@imswarnil/swarnil-design";
```

Note the order, and note that the second line does **not** import Tailwind
itself — that is deliberate, so you do not get it twice. daisyUI comes with the
package as a dependency, already configured: its light and dark themes are off,
its colours are pointed at this system's tokens, and the thirty components this
system builds itself are excluded from its output.

## Take less than all of it

Each layer is its own entry point. Import the theme alone if you only want the
tokens and intend to write your own components.

```css
@import "tailwindcss";
@import "@imswarnil/swarnil-design/theme";       /* the tokens, as @theme */
```

## The broadcast bundle

Thumbnails, scenes, lower thirds and stream widgets live in a second bundle,
so a website never pays for them. It contains everything the web bundle does
plus the [creator layer](/canvas.html). Load it in OBS as a browser source, or
in the page that renders your thumbnails.

```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@imswarnil/swarnil-design/dist/swarnil-broadcast.min.css">
```

```css
@import "@imswarnil/swarnil-design/broadcast";
```

## The fonts

The fonts are the only external dependency, and even they are a choice. Two
families, not three — Geist does display and body alike. Point the family tokens
anywhere you like and drop the `<link>`.

```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
      rel="stylesheet">
```

```css
:root {
  --font-display: "Your Display Face", sans-serif;
  --font-body:    "Your Body Face", sans-serif;
  --font-mono:    "Your Mono", monospace;
}
```

## Overriding anything

Every rule in the system lives inside a cascade layer. Your own stylesheet declares no
layer, and **unlayered CSS beats every layer** — so your overrides win with zero
specificity fights and no `!important`.

```css
/* This wins. It is one class deep and it is not in a layer. */
.card { --card-pad: 2rem; }
```

That is the entire customisation API. There is no configuration file.

