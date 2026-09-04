# 1 · Why design systems exist

*Written at the end of Phase 0 — ground clearing. Every claim here is about code that
now exists in this repo.*

---

## The problem, stated once

You have a button. You need it on a blog post, a course page, a thumbnail overlay and a
contact form. Four places.

Without a system, you write it four times. That is not the expensive part. The expensive
part is six months later, when you decide the corner radius should be 8px instead of 6px,
and you now have to *find* all four. You will find three. The fourth will sit there
looking slightly wrong forever, and every visitor will feel it without being able to name
it.

A design system exists to make "decide once" physically true rather than aspirational.

That is the whole idea. Everything else — tokens, layers, components, the docs site — is
machinery in service of that one sentence.

### The three failures it prevents

1. **Drift.** Four buttons that were identical in January and are not in July.
2. **Re-litigation.** Standing at 2am asking "should this be 16px or 20px?" — a question
   you already answered, but the answer lived in your head instead of in a file.
3. **Coupling.** Changing a colour means editing 40 files, so you stop changing the
   colour, so the design stops improving.

You can feel which of these is biting you. Drift shows up as *"the site looks a bit
scruffy and I can't say why."* Re-litigation shows up as *slowness.* Coupling shows up as
the thing you said in the brief that started this rebuild: **"if I want to use the same
looking design style using CSS variables it's very, very hard."**

That sentence is a coupling complaint, and it has a specific cause. We'll get to it.

---

## A short history

Design systems are much older than the web, and knowing the lineage tells you which
problems are actually solved and which are still open.

### 1975 — the NASA Graphics Standards Manual

Not software. A physical book. It specified the logo, the typefaces, the spacing, the
colours, and — critically — *how they combine*: what you do when the logo sits on a dark
launch vehicle versus a white letterhead.

The important idea it established: **a system is not a collection of assets, it is a
collection of decisions.** A logo file is an asset. "The logo's clear space equals the
height of the worm's stroke" is a decision. Assets get copied wrong; decisions can be
checked.

This is why our `10-frame.css` will carry a header comment explaining *what the component
argues*, not just what it does. That comment is the NASA manual page.

### 1990s–2000s — brand guidelines and the PDF era

Companies had "brand books". They were PDFs. Engineers did not read them, because a PDF
cannot be imported. The gap between the guideline and the code was where all the drift
lived.

**Lesson: a rule that isn't executable is a rule that will be broken.** This is why, in
this system, `scripts/audit-contrast.py` and `scripts/audit-layers.py` will *fail CI*
rather than living in a document. A rule with a test is a rule. A rule in a markdown file
is a wish.

### 2011 — Bootstrap, and the pattern library

Twitter open-sourced Bootstrap and the world changed, mostly for the better and partly for
the worse.

- **Better:** it proved a shared vocabulary works. `btn btn-primary` meant the same thing
  in ten thousand codebases.
- **Worse:** for about five years, every website on earth looked like Bootstrap. The
  system was so complete and so opinionated that using it *was* your design decision.

**Lesson: a system that makes every choice for you removes your voice.** Ours is
deliberately almost-monochrome with one rationed accent, so the *system* handles rhythm,
spacing and contrast, and *you* still choose what the site is about.

### 2014 — Google's Material Design, and the birth of the modern design system

Material was the first to ship *design language + code + documentation + rationale* as one
product. It also introduced the thing we care most about: **design tokens.**

The token idea, in one line: *don't name a value for what it looks like, name it for what
it does.*

```css
/* Not a token — the name describes appearance */
--orange-red: #e8543a;

/* A token — the name describes the job */
--accent: var(--signal-500);
```

When you rebrand, the first version forces you to rename `--orange-red` to `--blue`
everywhere (or, worse, leave a variable called `--orange-red` holding a blue). The second
version needs one line changed. That distinction is the entire reason design systems have
a *token layer* at all, and it is the thing that makes your "I want to restyle with CSS
variables" wish achievable.

### 2015–2020 — the systems worth studying

| System | Who | The idea worth stealing |
| --- | --- | --- |
| **Lightning** | Salesforce | Tokens as a *published, versioned artifact* other teams consume. You'll know this one. |
| **Carbon** | IBM | A public, rigorous grid + strict accessibility gates in CI. |
| **Polaris** | Shopify | Content guidelines treated as part of the system — error text and empty states are *designed*, not written last. |
| **Primer** | GitHub | Ships as CSS, not as a framework. You can adopt it without adopting React. |
| **Spectrum** | Adobe | One design, many platforms — proves tokens must be platform-neutral (hence `tokens.json`). |
| **Atlassian** | Atlassian | Best-in-class *documentation* of when NOT to use a component. |

Polaris is the one most people underrate. Its rule — *errors say what happened, then what
to do* — is in our `PRINCIPLES.md` as #12, because copy really is design. "Something went
wrong" is a design failure, not a writing failure.

### 2020–now — the unbundling

Two things happened at once, and they pull in opposite directions.

- **Headless / unstyled libraries** (Radix, Headless UI, Ark): "we'll do the hard
  accessibility behaviour, you do all the looks." Great, but they're JavaScript, and they
  assume React.
- **Utility CSS** (Tailwind): "no components at all, just tokens with class names."
  Extremely fast to build with, and it moves the drift problem rather than solving it —
  now your button is `px-4 py-2 rounded-md bg-…` copy-pasted in four places.

**Where this system sits:** we ship *CSS*, so any stack can use it; we lean on *the
platform* (`<dialog>`, `<details>`, the Popover API) instead of rebuilding keyboard
behaviour in JS; and we offer the Tailwind bridge so utility users get our tokens without
us maintaining two sources of truth. That's `approach.md` §15 — and it's why the answer to
"Tailwind or CSS variables?" here is *both, from one definition.*

---

## What Phase 0 actually taught

Phase 0 deleted things. It's worth being precise about *why*, because the reasoning
generalises.

### Lesson A — a design system is not a theme

The repo contained a folder called `collection/`: Ghost and Jekyll templates for blog
posts, courses, travel logs, résumés. 81 files. And `docs/_build/content_collection.py`
— 1,579 lines documenting them.

That is a **theme**. The distinction:

> A **design system** says what a card *is*. A **theme** decides that your blog uses cards
> in a three-column grid with the date above the title.

The system must not know your blog exists. The moment it does, nobody else can use it, and
*you* can't redesign your blog without editing the system.

The tell was concrete and mechanical. `content_collection.py` did this:

```python
sys.path.insert(0, str(REPO / 'collection'))
travel = _load('col_travel_build', REPO / 'collection' / 'travel' / 'build.py')
```

The design system's documentation **imported and executed the theme's build scripts.** The
docs literally could not build without the theme present — which we proved by deleting
the folder and watching the build die with `FileNotFoundError`.

That crash was the useful part. A dependency you can't see in a diagram becomes obvious
the moment you try to remove one side of it.

Four of those pages survived the split — timeline, itinerary, curriculum, build log —
because they describe *arrangements*, not content. They're now a `Patterns` group in the
nav, which is layer 4 of the new architecture. Same pages, correct home.

### Lesson B — nothing generated is committed

The repo tracked **630 files**. After Phase 0: **222**.

Almost all of the difference was output: 206 generated HTML pages at the top level of
`docs/`, 21 more in subfolders, plus `sitemap.xml`, `robots.txt`, `llms.txt`,
`search-index.json` and the whole `dist/` folder. Every one of those is rebuilt by
`npm run build` in a few seconds.

Committing generated files is actively harmful, not merely untidy:

- **Every diff is noise.** Change one token, and 206 HTML files change. Code review dies.
- **They go stale silently.** Someone edits CSS, forgets to rebuild, and the committed
  HTML now disagrees with the source. Which one is true?
- **Merge conflicts in files nobody wrote.** The worst kind, because there's no correct
  resolution — you just rebuild.

The old CI had actually noticed this and bolted on a workaround: a step that failed the
build if `docs/` was dirty after regenerating. That's a check that exists *only* because
the files were committed in the first place. Delete the cause, delete the check.

The principle — `PRINCIPLES.md` #10, *if CI can build it, git should not hold it* — is now
enforced by `.gitignore` instead of by a CI rule and everyone's discipline.

### Lesson C — the cascade contract

Here is the direct answer to *"restyling with CSS variables is very hard."*

CSS has one built-in conflict-resolution mechanism: **specificity**. When two rules both
apply, the more specific selector wins. `.card .title` beats `.title`. This is fine until
you want to override something, at which point you discover you must write a selector even
*more* specific than the one you're fighting — and your override becomes something absurd
like `body .page .card .title`, or you reach for `!important` and lose the war permanently.

That is why theming felt hard. Not a missing variable. A **structural** problem: there was
no stated override order, so precedence was an accident of which file happened to be
imported last.

CSS solved this properly in 2022 with **cascade layers**. One line, now the first thing
in this system:

```css
@layer reset, tokens, elements, components, patterns, sections, theme, tailwind, utilities;
```

Read it as a ranking, lowest priority first. Then the rule that changes everything:

> **A rule in a later layer beats a rule in an earlier layer — no matter how specific the
> earlier one is.**

A single-class `.u-hidden` in `utilities` defeats a `body .page .card .title` monster in
`components`, because layers outrank specificity entirely. Precedence stops being an
emergent property of your import order and becomes a line you can read.

Three consequences we get for free:

- `theme` sits above `sections`, so a drop-in theme file retints anything without one
  `!important`.
- `tailwind` sits above `theme` — a utility that loses to a component isn't a utility.
- **Unlayered CSS beats every layer.** That sounds like a bug; it's the best part. It
  means *your* stylesheet, which declares no layers, automatically wins over all of ours.
  That is the entire customisation API, and it's why the answer to "how do I override
  this?" is now "just write CSS" instead of "good luck".

One honest caveat: declaring the layer *names* is what fixes the order, and that's what
Phase 0 shipped. The 50-odd existing CSS files aren't yet *inside* those layers — they're
still unlayered, so today they all sit at the top of the cascade together, exactly as
before. Nothing broke, nothing improved yet. Moving each file into its layer happens in
Phase 1, where every file is being rewritten for `oklch` tokens anyway. Doing that pass
twice would be waste.

The `@layer` line is a promise the next phase keeps.

---

## The decision that produced this phase

Worth recording, since the ask was to learn the process and not just the result.

The brief was, roughly: *the homepage doesn't look professional, theming is hard, mono is
everywhere, there are too many files, and Claude is on a commit — delete it all and start
over.*

That contains one real diagnosis and one proposed cure, and they needed separating.

The diagnosis was right, and got sharpened into four specific faults with evidence: 171
uses of the mono font in `src/`, a card whose hover state does literally nothing (checked
by hovering it), three theme blocks that had already drifted out of sync, and 6,583 lines
of HTML embedded inside Python string literals.

The cure — *delete everything* — was mostly right and partly expensive. Three things got
pushed back on:

1. **Deleting the GitHub repo** destroys the redirect, so every existing link 404s
   forever. Renaming achieves the same fresh start and keeps the links. *Deferred to
   Phase 11 — no other phase depends on it, so the decision doesn't need making yet.*
2. **"Tailwind is the token source" vs the spec's "Tailwind never owns a token"** looked
   like a contradiction but wasn't: `@theme inline` means Tailwind *reads* CSS variables
   you author. Both requests were satisfiable at once.
3. **Retyping 684 KB of working CSS from memory** would lose work and add bugs. Files move
   across and get rewritten to the new contract as they move — a rebuild in substance,
   incremental in execution.

The generalisable bit: **when a brief contains a diagnosis and a cure, the diagnosis is
usually more reliable than the cure.** You know exactly what's wrong with your work. The
fix is where a second opinion earns its keep — and where "delete everything" often turns
out to mean "delete the four specific things that are actually causing this."

---

## Where we are

| | Before | After Phase 0 |
| --- | --- | --- |
| Tracked files | 630 | 222 |
| Checked-out content | ~17 MB | 2.0 MB |
| Generated files in git | 227 | 0 |
| Cascade order | implicit, by import order | one declared line |
| Bundle (gzipped) | — | 40.0 KB (budget: 55 KB) |
| Docs pages building | 206 | 123 |

Nothing about the design changed. The homepage renders pixel-for-pixel as it did — mono
sidebar and inert cards included. That was the goal: **Phase 0 changes the repository,
not the design.**

Phase 1 rewrites the colour tokens in `oklch` and collapses three theme blocks into one.
Phase 2 is the first one you'll *see*.

---

**Next:** `2-...` — tokens, `oklch`, and why perceptual colour space matters.
