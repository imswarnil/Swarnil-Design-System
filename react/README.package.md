# Im Design System

One package for every kind of project. The system is **CSS classes and data attributes** (`im-btn`,
`im-card`, `data-im-reveal`…) plus a few small scripts, so any stack that can put a class on an
element can use it. Nothing is generated per framework.

| Path | What it is |
| --- | --- |
| `css/im.css` · `css/im.min.css` | The whole system. Fonts load from `../fonts/`. |
| `css/tokens.css` · `tokens.json` | Only the `--im-*` tokens, as CSS or as data. |
| `js/*.js` | The behaviour: `im.js` (core), `im-motion.js`, `im-charts.js`, `im-media.js`, `im-code.js`, `im-view.js`, `im-content.js`, `im-ads.js`. |
| `js/head.js` | The before-first-paint snippet (saved theme, `data-im-js`). |
| `client` | `start(features)`: loads the scripts in a browser, does nothing on a server. |
| `react` | `<ImHead>`, `<ImScripts>`, `Button`, `Badge`, `Card…`, `Wrap`, `Cols`/`Col`, `Logo`, `ThemeToggle`, `cx`. |
| `react/icon` | `<Icon name="arrow-right" />`, every icon the system draws. |
| `icons/*.svg` | The same icons, as files. |
| `ghost/` | The Handlebars partials and sections, for a Ghost theme. |

## Plain HTML

From the CDN (the docs site serves the current package), or from `node_modules/im-design-system/`
after `npm install` — the paths below the root are the same.

```html
<html lang="en">
<head>
  <script src="https://design.imswarnil.com/package/js/head.js"></script>
  <link rel="stylesheet" href="https://design.imswarnil.com/package/css/im.min.css">
  <script src="https://design.imswarnil.com/package/js/im.js" defer></script>
  <script src="https://design.imswarnil.com/package/js/im-motion.js" defer></script>
</head>
<body>
  <a class="im-btn im-btn-primary" href="/start">Start</a>
</body>
</html>
```

## React (Vite)

```jsx
import 'im-design-system/css';
import { ImScripts, Button, Card, CardBody, CardTitle } from 'im-design-system/react';

export default function App() {
  return (
    <>
      <ImScripts />
      <Card><CardBody><CardTitle>Hello</CardTitle></CardBody></Card>
      <Button variant="primary">Start</Button>
    </>
  );
}
```

## Next.js (App Router)

```jsx
// app/layout.jsx
import 'im-design-system/css';
import { ImHead, ImScripts } from 'im-design-system/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><ImHead /></head>
      <body>
        {children}
        <ImScripts features={['core', 'motion']} />
      </body>
    </html>
  );
}
```

`suppressHydrationWarning` is needed because the head snippet sets `data-theme` before React
hydrates. Every component is server-safe; only `<ImScripts>` is a client component.

## Ghost

Copy `ghost/partials` and `ghost/sections` into the theme, `css/`, `js/` and `fonts/` into its
`assets/`, and set `"card_assets": false` in the theme's `package.json`.

## Licence

All rights reserved. See `LICENSE`.
