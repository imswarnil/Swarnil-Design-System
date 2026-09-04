#!/usr/bin/env python3
"""audit-mono.py — keep the mono voice rare.

PRINCIPLES #9: the mono voice is DATA only. Timecodes, counts, dimensions,
coordinates, versions, code. The moment mono carries a sentence it stops
meaning "this is data" and starts meaning "this is a terminal" — and a signal
used everywhere is not a signal.

The system has two small-uppercase voices and they are easy to confuse:

    var(--font-label)   Inter    a LABEL  — eyebrow, kicker, section header
    var(--font-slate)   mono     DATA     — 00:12:47, 1280×720, v2.1.0

This script fails the build when a new `font-family: var(--font-slate)` shows
up outside the allowlist below. Adding to the allowlist is deliberate: you are
asserting the thing being styled is data, not prose.

It also catches the subtler bug — a rule that sets the mono TRACKING
(--tracking-slate, 0.14em) while rendering in Inter. That value is tuned for
monospace glyphs, which are already far apart; on a proportional face it
spaces the text to shreds.

    python3 scripts/audit-mono.py            report only
    python3 scripts/audit-mono.py --strict   exit 1 on any violation (CI)

Scope: everything in src/, plus the docs site's own chrome — the docs are the
system's loudest example, so they are held to the same rule.
"""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent

# Selectors whose content is genuinely data. Each one is an assertion that what
# renders here could not be read aloud as a sentence.
ALLOW = {
    # Every entry is an assertion: what renders here is DATA, and could not be
    # read aloud as a sentence.
    'src/1-foundation/02-typography.css': {
        '.t-slate, .t-slate-sm',   # the data voice itself
    },
    'src/1-foundation/10-frame.css': {
        # Window and viewfinder chrome. Mono here means "this is a machine",
        # which is the whole argument of the frame layer.
        '.vf__tc, .vf__rec',                     # timecode + record readout
        '.vf__dims',                             # 1280 x 720
        '.win-term .win__body, .win-term__body', # literal terminal output
        '.win-browser__url',                     # a URL
    },
    'src/2-elements/20-badge.css': {
        '.chip__count',   # a number
        '.timecode',      # 00:14:22
        '.kbd',           # a key
    },
    'src/2-elements/21-table.css': {
        '.table__num',    # a numeric column, tabular figures
    },
    'src/2-elements/22-code.css': {
        '.code',              # inline code
        '.codeblock__lang',   # the language name
        '.codeblock__pre',    # code
    },
    # ── docs site chrome ───────────────────────────────────────────────────
    'docs/assets/docs.css': {
        '.code',         # inline code in prose
        '.cb__lang',     # the language name on a code block
        '.cb__pre',      # code
        '.search__key',  # the "/" shortcut hint
    },
    'docs/assets/home.css': {
        '.hero__tc',    # TAKE 47 . 00:12:47
        '.hero__rec',   # REC
        '.hero__dims',  # 1280 x 720
    },
}

BLOCK_COMMENT = re.compile(r'/\*.*?\*/', re.S)

# A DECLARATION starts with a property name: lowercase, dashes, then a colon.
# A SELECTOR may also contain a colon (.btn:hover) but never in that shape, so
# this is what tells `background: a,` apart from `.btn:hover,`.
DECL = re.compile(r'^[a-z-]+\s*:')


def targets():
    yield from sorted(ROOT.joinpath('src').rglob('*.css'))
    yield ROOT / 'docs' / 'assets' / 'docs.css'
    yield ROOT / 'docs' / 'assets' / 'home.css'


def scan(path):
    """Yield (line_no, selector, kind) for every mono application and every
    orphaned mono tracking in one file.

    Comments are stripped first so a file's own documentation never trips its
    own rule. Selector GROUPS are joined across lines — `.t-slate,\n.t-slate-sm {`
    is one rule with one declaration, and reporting only the last line of it
    would make the allowlist a list of half-truths.
    """
    raw = path.read_text()
    text = BLOCK_COMMENT.sub(lambda m: re.sub(r'[^\n]', ' ', m.group()), raw)
    lines = text.split('\n')

    sel, pending, in_decl = '', [], False
    for i, line in enumerate(lines):
        s = line.strip()

        # A multi-line VALUE (background: a,\n b;) also ends lines with a
        # comma, and mistaking one for a selector is how this script reported
        # a gradient as a font declaration. Track whether a declaration is
        # still open and never collect selectors while it is.
        if in_decl:
            if s.endswith(';') or s.endswith('}'):
                in_decl = False
        elif DECL.match(s) and '{' not in s and not s.endswith(';'):
            in_decl = True

        if (not in_decl and s and not s.startswith('@')
                and '{' not in s and s.endswith(',')):
            pending.append(s.rstrip(','))          # mid-group selector line
            continue

        if '{' in s and not s.startswith('@'):
            head = s.split('{')[0].strip().rstrip(',')
            if head or pending:
                sel = ', '.join([*pending, head]) if head else ', '.join(pending)
            pending = []

        if 'font-family' in s and 'var(--font-slate)' in s:
            yield i + 1, sel or '(unknown)', 'mono'
        elif 'var(--tracking-slate)' in s:
            depth, mono = 0, False
            for j in range(i, -1, -1):
                depth += lines[j].count('}') - lines[j].count('{')
                if 'font-family' in lines[j]:
                    mono = 'var(--font-slate)' in lines[j]
                    break
                if depth > 0:
                    break
            if not mono:
                yield i + 1, sel or '(unknown)', 'tracking'


def main():
    strict = '--strict' in sys.argv
    bad = []
    allowed = 0
    for path in targets():
        if not path.exists():
            continue
        rel = str(path.relative_to(ROOT))
        ok = ALLOW.get(rel, set())
        for line, sel, kind in scan(path):
            if kind == 'mono' and sel in ok:
                allowed += 1
                continue
            bad.append((rel, line, sel, kind))

    if not bad:
        print(f'mono audit: clean — {allowed} data uses, all on the allowlist')
        return 0

    print(f'mono audit: {len(bad)} violation(s)\n')
    for rel, line, sel, kind in bad:
        if kind == 'mono':
            print(f'  {rel}:{line}\n    {sel}  sets the mono face but is not on the allowlist.')
            print( '    If this is data, add it to ALLOW in scripts/audit-mono.py.')
            print( '    If it is a label, use var(--font-label).\n')
        else:
            print(f'  {rel}:{line}\n    {sel}  uses --tracking-slate (0.14em) but does not render in mono.')
            print( '    That value is tuned for monospace. Use --tracking-label (0.08em).\n')
    return 1 if strict else 0


if __name__ == '__main__':
    sys.exit(main())
