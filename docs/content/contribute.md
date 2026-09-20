---
title: Contribute
group: Start
order: 90
lead: What the system will take, what it will not, and the four gates a change has to pass before it ships.
---

This is a one-person system with the door open. Fixes are welcome without
asking; anything that adds a name to the system is worth a conversation first,
because a name is the expensive part.

## The fastest useful contribution

Every page on this site has an **Edit this page** link in the sidebar footer
that opens that page's markdown on GitHub. A typo, a wrong value in a table, a
sentence that made you re-read it twice — send it. Documentation fixes need no
issue and no discussion.

## The four gates

A change ships when all four are green. They run locally in one command:

```bash
npm run check
```

| Gate | Command | What it is protecting |
| --- | --- | --- |
| Lint | `npm run lint` | Stylelint, on `src/**/*.css` |
| Build | `npm run build` | The bundles and this site both compile |
| Audit | `npm run audit` | The mono rule and the class rules, both strict |
| Size | `npm run size` | The gzipped bundle has not quietly grown |

The audit is the one that surprises people. `scripts/audit-mono.py` fails the
build if a monospace face appears anywhere that is not code, and
`scripts/audit-classes.py` fails it if a class is defined twice or documented
nowhere. Both are house rules the prose states, enforced so they stay true.

## What the system will take

- **A fix.** Wrong value, broken state, a component that breaks under
  `prefers-reduced-motion` or at 320px.
- **A missing state.** A component that has hover and focus but no disabled,
  or no `aria-current`.
- **A token the system is missing.** If a component needs a number that tier 2
  has no name for, that is a gap in the system and not a licence to hard-code.
  Open an issue with the case.

## What it will not take

- **A second way to do a thing that already has one.** Two card variants that
  differ by 2px of padding are one variant and a bug.
- **A component that borrows from a sibling repo.** This repo exports and
  never imports — see [Principles](/principles.html).
- **A hex.** There is a class of change that is only ever a token edit, and a
  literal colour in a component file is always the wrong fix.

## Adding a component

1. `src/3-components/NN-name.css` — one file, named for the component.
2. Tier-2 tokens only, and a custom property for anything a variant changes.
3. `docs/content/name.md` with `group: Components` — the card on the
   [Components](/components.html) index generates itself from the front
   matter.
4. `npm run check`.

The naming convention is not negotiable and it is short: a block is the
component (`.card`), an element is the block plus two underscores
(`.card__title`), a variant is the block plus a single dash (`.card-wide`).
Nothing else. See [Structure](/structure.html).
