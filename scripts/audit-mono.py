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

src/4-broadcast/ is exempt: it exports to YouTube and Instagram rather than to
a website, and mono-as-camera-language is deliberate there. It becomes
creator/ in Phase 7 and gets its own rules then.
"""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
EXEMPT_DIR = '4-broadcast'

# Selectors whose content is genuinely data. Each one is an assertion that what
# renders here could not be read aloud as a sentence.
ALLOW = {
    'docs/preview.css': {
        '.cds-gh__stars',      # a star count
        '.cds-mark__sub',      # the wordmark lockup, not a label
        '.np__out-val',        # a computed value readout
        '.pattern-tile code',  # code
        '.sec-num',            # a section number
        '.spec',               # a spec strip: CSS values under a demo
        '.sw__name',           # a token name, e.g. --accent
        '.sw__val',            # its value, e.g. oklch(63% .19 34)
    },
    'src/1-foundation/02-typography.css': {'.t-code', '.t-numeric', '.t-slate', '.t-slate-sm'},
    'src/1-foundation/08-a11y.css': {"a[href^='http']::after"},   # prints the URL
    'src/1-foundation/09-logo.css': {'.logo-stack .logo__tag'},   # brand mark
    'src/1-foundation/10-icon.css': {'.icon-badged__n'},
    'src/1-foundation/12-frame.css': {
        # Window/terminal chrome. Mono here means "this is a machine", which is
        # the whole argument of the frame layer.
        '.vf__rec', '.win-browser__url', '.win-code__body', '.win-code__tabs',
        '.win-term', '.win__bar',
    },
    'src/2-elements/10-text.css': {'.code-block > pre', '.code-block__head', '.fn-ref'},
    'src/2-elements/11-badge.css': {'.chip__count', '.kbd', '.timecode'},
    'src/2-elements/12-table.css': {'.steps > li::before', '.table .num'},
    'src/2-elements/15-syntax.css': {'.codebox__head', '.codebox__pre', '.copy-line'},
    'src/3-components/23-collection.css': {
        '.c-changelog__v', '.c-lesson__no', '.c-product .c__price', '.c-prompt .c__model',
        '.c-snippet .c__code', '.c-snippet .c__lang', '.c-tag .c__count',
        '.c-timeline__year', '.c-travel .c__day', '.c-trip .c__coords',
        '.c-video .c__media::after',
    },
    'src/3-components/26-media.css': {'.player__time'},
    'src/3-components/27-composite.css': {
        '.buildlog__date', '.buildlog__node', '.curriculum__count', '.curriculum__no',
        '.ep-panel__count', '.lesson-row__len',
    },
    'src/3-components/31-content.css': {'.content code', '.content pre'},
    'src/3-components/32-editorial.css': {'.release__date', '.release__ver'},
    'src/3-components/33-navbar.css': {'.nav-gh__stars'},
    'src/3-components/34-ad.css': {'.ad__dims'},
    'src/3-components/35-timeline.css': {'.tl__node', '.tl__time'},
    'src/3-components/36-comment.css': {'.comment__time', '.comments__count span'},
    'src/5-sections/30-header.css': {'.page-head__count'},
}

BLOCK_COMMENT = re.compile(r'/\*.*?\*/', re.S)


def targets():
    for p in sorted(ROOT.joinpath('src').rglob('*.css')):
        if EXEMPT_DIR not in p.parts[len(ROOT.parts):][0:3]:
            yield p
    yield ROOT / 'docs' / 'preview.css'


def scan(path):
    """Yield (line_no, selector, kind) for every mono application and every
    orphaned mono tracking in one file. Comments are stripped first so the
    documentation in a file header never trips its own rule."""
    raw = path.read_text()
    # Blank out comments but keep line numbering intact.
    text = BLOCK_COMMENT.sub(lambda m: re.sub(r'[^\n]', ' ', m.group()), raw)
    lines = text.split('\n')
    sel = ''
    for i, line in enumerate(lines):
        s = line.strip()
        if s.endswith('{') and not s.startswith('@'):
            sel = s[:-1].strip()
        own = (s.split('{')[0].strip()
               if '{' in s and not s.startswith(('font-family', 'letter-spacing'))
               else sel)
        if 'font-family' in s and 'var(--font-slate)' in s:
            yield i + 1, own or '(unknown)', 'mono'
        elif 'var(--tracking-slate)' in s:
            # Is the enclosing block actually mono?
            depth, mono = 0, False
            for j in range(i, -1, -1):
                depth += lines[j].count('}') - lines[j].count('{')
                if 'font-family' in lines[j]:
                    mono = 'var(--font-slate)' in lines[j]
                    break
                if depth > 0:
                    break
            if not mono:
                yield i + 1, own or '(unknown)', 'tracking'


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
