---
title: Components
group: Start
order: 30
lead: Every component in the system on one page, filterable by name and orderable A–Z.
---

The sidebar is for when you already know what the thing is called. This is for
when you do not.

Every card below is generated from the same front matter the sidebar is built
from, so it cannot fall out of step: add a page to the **Components** group and
its card appears here on the next build. Filter by name, or switch the order
between a flat alphabet and the groups the sidebar uses.

{{index:Components,Forms,Elements}}

## What counts as a component

A component is a thing you put in a page and give content to — a card, a
navbar, a dialog. It has a name, a class, and states.

Three things on this list are deliberately *not* components and are here
anyway, because a reader looking for "the form field" does not care which
folder it lives in:

| Group | What it holds | Why it is separate |
| --- | --- | --- |
| Elements | Article, Code | Styled HTML, not a class you apply |
| Forms | Field, Form | A control is an element with state and a label |
| Components | Everything else | A named thing with a class and variants |

Everything larger than a component — a hero, a pricing table, a whole page —
lives under [Sections](/hero.html) and [Templates](/templates.html) instead.

## The rules every one of them follows

- **Tier 2 only.** A component reads `--fg-muted`, never `--ink-700`. That
  one rule is what makes the whole system re-theme in a single edit. See
  [Tokens](/tokens.html).
- **The active state is a dot.** Not a fill, not a pill — a 6px dot in the
  accent, which is the smallest mark that can carry a colour this system
  rations. See [Interactions](/interactions.html).
- **One name, one home.** A class is defined in exactly one file, and the
  file is named for the component. See [Structure](/structure.html).
