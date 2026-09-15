#!/usr/bin/env python3
"""Audit the gap between the CSS and the markup, in both directions.

    python3 scripts/audit-classes.py          # report
    python3 scripts/audit-classes.py --strict # exit 1 on a phantom class

Two questions, both cheap, both easy to get wrong by hand:

  1. Which classes does the markup USE that the CSS never DEFINES?
     A phantom class is worse than a missing style: the markup looks right and
     renders as unstyled HTML, so nothing fails and nobody notices. This list
     should always be empty, which is why --strict can gate CI on it.

  2. Which classes does the CSS DEFINE that no page ever USES?
     This one will never be empty — utilities exist to be optional — but a
     whole *family* sitting at zero is a component nobody knows about, and the
     next person to need it will write a second copy under a different name.

Both checks are grep, not magic. The value is in running them at all.
"""
import argparse
import collections
import glob
import pathlib
import re
import sys

REPO = pathlib.Path(__file__).resolve().parent.parent

# Nothing is skipped: the broadcast layer (thumbnails, scenes, stream widgets)
# is demoed in the docs like every other layer, so it is audited like one.
SKIP_LAYERS = ()

# Classes that appear in CSS as part of a selector we generate dynamically, or
# that only ever come from JS. Kept explicit so the report stays honest rather
# than quietly filtered.
EXPECT_UNUSED_PREFIX = ('kg-',)      # Ghost editor output classes


def css_sources():
    """Every stylesheet that can legitimately define a class the markup uses.

    THE BUILT SITE STYLESHEET IS THE IMPORTANT ONE. Since this system moved to
    Tailwind, most classes on a docs page — `flex`, `bg-sunken`, `md:col-span-6`,
    `font-semibold` — exist only in Tailwind's OUTPUT. They are generated from
    the markup at build time and appear in no file under src/. Reading src/
    alone reported 52 of them as phantoms, which is the audit being wrong rather
    than the pages.

    So the compiled site/assets/site.min.css is read as a source of TRUTH about
    what is defined. It is never a source of style: nothing in src/ may depend
    on a class that only Tailwind or daisyUI defines.
    """
    for f in sorted(glob.glob(str(REPO / 'src/**/*.css'), recursive=True)):
        if not any(s in f for s in SKIP_LAYERS):
            yield f
    yield from sorted(glob.glob(str(REPO / 'docs/assets/*.css'), recursive=True))

    built = REPO / 'site' / 'assets' / 'site.min.css'
    if built.exists():
        yield str(built)


def defined_classes():
    """class -> the file that defines it (first one wins)."""
    out = {}
    for f in css_sources():
        # Comments are stripped FIRST. Without this, a class named in prose —
        # ".frame-4 needs markup and .frame does not" — counts as defined, and
        # the audit cheerfully passes a page using a class that has no rule
        # anywhere. .frame-4 was exactly that: used in markup, described in two
        # file headers, never once written as a selector.
        text = re.sub(r'/\*.*?\*/', '', pathlib.Path(f).read_text(), flags=re.S)
        # A class name in CSS may be ESCAPED, and Tailwind's mostly are:
        # `md:col-span-6` is written `.md\:col-span-6`, `p-(--space-8)` is
        # `.p-\(--space-8\)`. Matching only [\w-] stops at the backslash and
        # reports every variant and every arbitrary value as a phantom.
        for c in re.findall(r'\.((?:[\w-]|\\.)+)', text):
            out.setdefault(re.sub(r'\\(.)', r'\1', c),
                           str(pathlib.Path(f).relative_to(REPO)))
    return out


def used_classes():
    """class -> set of pages it appears in.

    Reads the BUILT site, because that is the only place the markup actually
    exists — the content is markdown and the chrome is a template, so neither
    alone is the truth.

    This used to scan collection/**/*.html, which stopped existing when the
    theme was split out. It therefore found zero used classes and the --strict
    gate passed trivially: every class was 'unused' and none was 'undefined'.
    A gate that cannot fail is not a gate. Run `npm run docs` first.
    """
    out = collections.defaultdict(set)
    pages = sorted(glob.glob(str(REPO / 'site/**/*.html'), recursive=True))
    if not pages:
        print('audit-classes: site/ is empty — run `npm run docs` first.')
        raise SystemExit(1)
    for f in pages:
        rel = pathlib.Path(f).relative_to(REPO)
        where = rel.name
        for attr in re.findall(r'class="([^"]*)"', pathlib.Path(f).read_text()):
            for c in attr.split():
                # `{...}` survives in a template that was never formatted — a
                # real bug, but a different one than a phantom class.
                if c and not c.startswith('{'):
                    out[c].add(where)
    return out


def family(name):
    """`col-post-row__title` -> `col`. Crude on purpose: it groups by the first
    hyphen segment, which is exactly how this system names things."""
    return re.split(r'__|-', name)[0]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--strict', action='store_true',
                    help='exit 1 if any class is used but never defined')
    args = ap.parse_args()

    defined, used = defined_classes(), used_classes()

    phantom = {c: sorted(w) for c, w in used.items() if c not in defined}
    unused = {c: f for c, f in defined.items()
              if c not in used and not c.startswith(EXPECT_UNUSED_PREFIX)}

    live = set(used) & set(defined)
    pct = 100 * len(live) // len(defined)
    print(f'defined {len(defined)} classes · {len(live)} of them ship ({pct}%)')

    print('\n── 1 · used but never defined ' + '─' * 40)
    if phantom:
        for c, where in sorted(phantom.items()):
            print(f'  .{c:26} in {", ".join(where)}')
    else:
        print('  none — every class in the markup resolves to a rule')

    print('\n── 2 · defined but never used, by family ' + '─' * 29)
    fams = collections.defaultdict(list)
    for c in unused:
        fams[family(c)].append(c)
    live_fams = {family(c) for c in defined if c in used}
    dead = {f: cs for f, cs in fams.items() if f not in live_fams and len(cs) > 1}
    for f, cs in sorted(dead.items(), key=lambda kv: -len(kv[1]))[:20]:
        print(f'  {f + "-*":22} ({len(cs):3}) nothing in this family ships')
    print(f'\n  {len(unused)} unused classes · {len(dead)} entirely-unused families')
    print('  (a family at zero is a component nobody knows about — check before '
          'writing a new one)')

    if args.strict and phantom:
        print(f'\nFAIL: {len(phantom)} phantom class(es)', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
