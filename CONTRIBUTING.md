# Contributing

Thanks for being here. This system has strong opinions, and they exist so the
whole thing stays coherent — a contribution that respects them is much easier
to merge than a clever one that doesn't.

## The rules a change must keep

1. **Tokens before templates.** Every value is a `var()` off a ladder. No raw
   hex, no magic pixel numbers. If a component needs a value that isn't on a
   ladder, fix the ladder.
2. **State lives in ARIA.** Active, selected, pressed, current, done — use
   `aria-current`, `aria-selected`, `aria-pressed`, `[data-done]`. Never an
   `.active` class.
3. **The platform first.** `<details>`, `<dialog>`, the Popover API and native
   inputs before any JavaScript.
4. **Motion is honest.** Interaction feedback under 200ms, one property, and
   everything degrades under `prefers-reduced-motion`.
5. **Both themes.** Anything you add must be checked in light *and* dark.
6. **One accent, rationed.** One signal dot per surface, one primary button per
   screen, one live badge per page.
7. **Monospace is for code.** Labels are Inter worn small and uppercase; data is
   Inter with tabular figures. `npm run audit` fails on anything else.

## Setting up

```bash
git clone https://github.com/imswarnil/Swarnil-Design-System
cd swarnil-design
npm install
npm run dev        # http://localhost:8080
```

## Adding or changing a component

1. Write the CSS in the right layer under `src/`, inside its `@layer`, with a
   header comment that states the argument.
2. Register it with one `@import` line in that layer's `index.css`.
3. Write its page: `docs/content/<slug>.md`, front matter (`title`, `group`,
   `order`, `lead`), then a `:::demo` block for **every class the file
   defines**, a Properties table and an Accessibility list.
4. `npm run lint && npm run build && npm run audit` — all clean.
5. Screenshot in both themes if the change is visual.

## Pull requests

Small, one concern each. The PR template asks the questions that matter.
