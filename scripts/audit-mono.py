#!/usr/bin/env python3
"""audit-mono.py — keep monospace to code, and nothing else.

The system has FOUR small voices and only one of them is monospace:

    var(--font-label)   Inter, uppercase, tracked, semibold   GETTING STARTED
    var(--font-data)    Inter, light, tracked, tabular        00:12:47
    var(--font-mono)    IBM Plex Mono                         const x = 1
    var(--font-body)    Inter                                 a sentence

Data used to be monospace here, on the usual argument that fixed-width glyphs
make a column of numbers line up. That argument is true about the 1970s and
false about Inter, which ships real TABULAR FIGURES — so alignment was never
the reason. The reason was that mono LOOKS technical, and once everything
technical is mono, mono stops meaning anything.

So this script now enforces a much narrower rule than it used to: monospace is
for code. It fails the build on any `font-family: var(--font-mono)` outside the
allowlist below, and on any rule setting the DATA tracking while rendering in a
face that is not the data voice.

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
    # Monospace is allowed ONLY where it does real work: `l` `1` `I` and `O`
    # `0` must be distinguishable, indentation must align, and a character
    # count must mean something. That is code, and nothing else.
    #
    # Timecodes, counts and dimensions are NOT on this list any more. They are
    # set in Inter with tabular figures, which aligns just as well — see the
    # note at the top of 02-typography.css.
    'src/1-foundation/02-typography.css': {
        '.t-mono',   # the code helper itself
    },
    'src/2-elements/22-code.css': {
        '.code',            # inline code
        '.codeblock__lang', # a language name, e.g. "css"
        '.codeblock__file', # a filename, e.g. "src/index.css" — a path literal
        '.codeblock__pre',  # a code block
        '.codeline',        # a one-line command with its copy button
    },
    'src/3-components/40-codeplayer.css': {
        '.codeplayer__pre',  # a code block, worn as a screen
    },
    'src/7-broadcast/84-thumb.css': {
        '.thumb__win',       # the code thumbnail's subject is an editor window — code
    },
    'src/4-patterns/51-prose.css': {
        '.prose code:not(pre *)',   # inline code an editor emits
        '.prose pre:not([class])',    # a code block an editor emits
    },
    'src/4-patterns/56-chat.css': {
        '.chat__tool',   # a tool call — literally machine output, the one
                         # place mono carries more than a code literal
    },
    'src/1-foundation/10-frame.css': {
        '.win-term .win__body, .win-term__body',   # literal terminal output
    },
    'docs/assets/docs.css': {
        '.code',      # inline code in prose
        '.cb__lang',  # a language name
        '.cb__pre',   # a code block
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

        if 'font-family' in s and 'var(--font-mono)' in s:
            yield i + 1, sel or '(unknown)', 'mono'

        elif 'font-family' in s and 'var(--font-data)' in s:
            # TABULAR FIGURES ARE THE WHOLE ARGUMENT.
            # Dropping monospace for data is only defensible because Inter's
            # tabular numerals align just as well. A data-voice rule that
            # forgets font-variant-numeric gives up the one property that
            # justified the change, and a column of numbers goes ragged.
            depth, tabular = 1, False
            for j in range(i + 1, len(lines)):
                depth += lines[j].count('{') - lines[j].count('}')
                if depth <= 0:
                    break
                if 'tabular-nums' in lines[j]:
                    tabular = True
            # look backwards inside the same block too
            if not tabular:
                depth = 0
                for j in range(i - 1, -1, -1):
                    depth += lines[j].count('}') - lines[j].count('{')
                    if depth > 0:
                        break
                    if 'tabular-nums' in lines[j]:
                        tabular = True
                        break
            if not tabular:
                yield i + 1, sel or '(unknown)', 'tabular'


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
            print(f'  {rel}:{line}\n    {sel}  sets the data voice but not tabular figures.')
            print( '    Tabular numerals are the whole reason data can leave monospace —')
            print( '    without them a column of numbers goes ragged. Add:')
            print( '        font-variant-numeric: tabular-nums;\n')
    return 1 if strict else 0


if __name__ == '__main__':
    sys.exit(main())
