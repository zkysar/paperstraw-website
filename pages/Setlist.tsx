import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { setlists } from '../data/setlists';
import { buildSheet } from '../lib/setlist';

function formatDate(iso: string) {
    const d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

/** Bounds for the auto-fit multiplier. Below MIN the sheet stops being readable. */
const FIT_MIN = 0.55;
const FIT_MAX = 1.6;

type Theme = 'auto' | 'light' | 'dark';

const SetlistPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const set = setlists.find(s => s.slug === slug);

    const sheet = useMemo(() => (set ? buildSheet(set.lines) : { songs: [], outro: [] }), [set]);

    const paperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [overflows, setOverflows] = useState(false);
    const [copied, setCopied] = useState(false);
    const [theme, setTheme] = useState<Theme>('auto');

    useEffect(() => {
        if (!set) return;
        const prev = document.title;
        document.title = `Paper Straw – Setlist – ${set.venue} – ${set.date}`;
        return () => { document.title = prev; };
    }, [set]);

    // Binary-search the largest --fit whose content still fits the page. Every
    // size on the sheet is in cqw, so the ratio of content height to paper
    // height is width-invariant -- the multiplier resolved on screen is equally
    // correct at print dimensions. Re-run once webfonts land, since the lyric
    // serif changes the measured height.
    useLayoutEffect(() => {
        let cancelled = false;

        const fit = () => {
            const paper = paperRef.current;
            const content = contentRef.current;
            if (cancelled || !paper || !content) return;

            // Below 640px the sheet is not a page, so there is nothing to fit --
            // the stylesheet sets a fixed readable scale. Drop the inline value
            // so it cannot win over that.
            if (window.matchMedia('(max-width: 640px)').matches) {
                paper.style.removeProperty('--fit');
                setOverflows(false);
                return;
            }

            const fitsAt = (v: number) => {
                paper.style.setProperty('--fit', String(v));
                return content.scrollHeight <= paper.clientHeight;
            };

            if (!fitsAt(FIT_MIN)) {
                setOverflows(true);
                return;
            }
            setOverflows(false);

            let lo = FIT_MIN;
            let hi = FIT_MAX;
            for (let i = 0; i < 10; i++) {
                const mid = (lo + hi) / 2;
                if (fitsAt(mid)) lo = mid; else hi = mid;
            }
            paper.style.setProperty('--fit', String(lo));
        };

        fit();
        document.fonts?.ready.then(fit);
        window.addEventListener('resize', fit);
        return () => {
            cancelled = true;
            window.removeEventListener('resize', fit);
        };
    }, [sheet]);

    async function copyAsText() {
        if (!set) return;
        await navigator.clipboard.writeText(set.lines.join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    if (!set) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-display text-gray-900 mb-4">Setlist Not Found</h1>
                    <p className="text-gray-600">No setlist matches this URL.</p>
                </div>
            </div>
        );
    }

    const rows = [
        ...sheet.songs.map(song => ({ song, talk: song.talk })),
        ...(sheet.outro.length ? [{ song: null, talk: sheet.outro }] : []),
    ];

    return (
        <>
            <style>{`
                /* The sheet is a letter page minus its print margins. Sizes are in
                   cqw (% of the paper's own width) times --fit, so the on-screen
                   preview is a true preview of the print output at any width. */
                .setlist-page {
                    --paper: #ffffff;
                    --ink: #0b0d10;
                    --muted: #767d88;
                    --hair: #e3e6ea;
                    --talk: #0369a1;
                    --flag: #b45309;
                    background: #eceef1;
                }
                .setlist-page[data-theme="dark"] {
                    --paper: #0c0e12;
                    --ink: #f2f4f7;
                    --muted: #7e8794;
                    --hair: #23272f;
                    --talk: #7dd3fc;
                    --flag: #fbbf24;
                    background: #050608;
                }
                @media (prefers-color-scheme: dark) {
                    .setlist-page[data-theme="auto"] {
                        --paper: #0c0e12;
                        --ink: #f2f4f7;
                        --muted: #7e8794;
                        --hair: #23272f;
                        --talk: #7dd3fc;
                        --flag: #fbbf24;
                        background: #050608;
                    }
                }

                .sl-chrome { color: var(--muted); }
                .sl-chrome a:hover, .sl-chrome button:hover { color: var(--ink); }
                .sl-chrome button { border: 1px solid var(--hair); padding: 0.35rem 0.75rem; }

                .sl-paper {
                    --fit: 1;
                    /* Letter minus the 0.45in print margins is 7.6 x 10.1in. The
                       height is held a hair under that so sub-pixel rounding can
                       never spill a blank second page. */
                    aspect-ratio: 7.6 / 9.95;
                    container-type: inline-size;
                    overflow: hidden;
                    background: var(--paper);
                    color: var(--ink);
                    font-family: ui-sans-serif, system-ui, "Helvetica Neue", Arial, sans-serif;
                }
                /* index.html sets an explicit font-family on every heading level,
                   which beats inheritance from .sl-paper -- override it here.
                   The lyric serif opts back in deliberately. */
                .sl-paper h1, .sl-paper h2, .sl-paper p, .sl-paper span, .sl-paper div { font-family: inherit; }
                .sl-content { box-sizing: border-box; padding: 3.4cqw 4cqw; }

                /* Header is reference material: small, quiet, out of the way. */
                .sl-venue { font-size: calc(2.4cqw * var(--fit)); font-weight: 700; letter-spacing: 0.01em; line-height: 1.2; }
                .sl-meta { font-size: calc(1.55cqw * var(--fit)); color: var(--muted); margin-top: calc(0.3cqw * var(--fit)); }
                .sl-rule { border-top: 1px solid var(--hair); margin: calc(1.6cqw * var(--fit)) 0 0; }

                /* Two columns: the song spine on the left, talk cues parked on
                   the right so the titles run down uninterrupted. Each song is
                   its own grid so the talk cell can sit visually right of its
                   song while coming first in reading order -- talk happens
                   before the song it precedes, and that is the order it has to
                   collapse into on a phone. */
                .sl-row { display: grid; grid-template-columns: 1fr 24%; --gap: calc(2.2cqw * var(--fit)); }
                /* A talk cue taller than its song stretches the row. That extra
                   height has to land BEFORE the song -- talk is what happens on
                   the way in -- so the song sits at the bottom of its row.
                   Otherwise the gap opens up after the song and shoves the next
                   one away, which reads as a break where there isn't one. Talk
                   means the music stopped, so a song with talk never also
                   segues in, and a segued song's row is never stretched. */
                .sl-left { grid-column: 1; grid-row: 1; display: flex; flex-direction: column; }
                .sl-song { position: relative; margin-top: auto; --pad: var(--gap); padding-left: calc(9cqw * var(--fit)); padding-top: var(--pad); }
                .sl-right { grid-column: 2; grid-row: 1; border-left: 1px solid var(--hair); padding-left: calc(2.2cqw * var(--fit)); padding-top: var(--gap); }

                /* Segue rule: one continuous line in the gutter through songs
                   that run together. Stops level with the number at each end of
                   a chain. */
                .sl-seg { position: absolute; left: calc(8.1cqw * var(--fit)); width: calc(0.32cqw * var(--fit)); background: var(--ink); }
                .sl-song { --anchor: calc(var(--pad) + 2.6cqw * var(--fit)); }
                .sl-seg.in.out { top: 0; bottom: 0; }
                .sl-seg.in:not(.out) { top: 0; height: var(--anchor); }
                .sl-seg.out:not(.in) { top: var(--anchor); bottom: 0; }

                /* Fixed right-aligned gutter, so every title starts at the same x. */
                .sl-gutter { position: absolute; left: 0; top: var(--pad); width: calc(7.2cqw * var(--fit)); text-align: right; }
                .sl-num { font-size: calc(2.5cqw * var(--fit)); font-weight: 600; color: var(--muted); font-variant-numeric: tabular-nums; line-height: 1.1; }
                .sl-who { font-size: calc(1.9cqw * var(--fit)); font-weight: 700; color: var(--ink); line-height: 1.2; white-space: nowrap; }
                .sl-who .q { color: var(--muted); font-weight: 600; }
                .sl-who .feel { color: var(--muted); }

                .sl-title { font-size: calc(5.4cqw * var(--fit)); font-weight: 800; text-transform: uppercase; letter-spacing: -0.02em; line-height: 1; }

                /* Annotations sit tight under the title they belong to. */
                .sl-flag { margin-top: calc(0.45cqw * var(--fit)); font-size: calc(1.7cqw * var(--fit)); font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: var(--flag); }
                .sl-cue { margin-top: calc(0.45cqw * var(--fit)); font-size: calc(1.75cqw * var(--fit)); color: var(--muted); line-height: 1.25; }
                .sl-lyric { margin-top: calc(0.45cqw * var(--fit)); font-size: calc(1.85cqw * var(--fit)); font-family: "Libre Baskerville", Georgia, serif; font-style: italic; color: var(--muted); line-height: 1.3; }

                .sl-talk { font-size: calc(1.7cqw * var(--fit)); color: var(--talk); line-height: 1.3; }
                .sl-talk + .sl-backing { margin-top: calc(0.9cqw * var(--fit)); }
                .sl-backing { font-size: calc(1.35cqw * var(--fit)); font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--talk); opacity: 0.72; }
                /* An undeclared backing is a hole in the sheet, not a default. */
                .sl-backing.missing { color: var(--flag); opacity: 1; }

                .sl-legend { margin-top: calc(1.6cqw * var(--fit)); padding-top: calc(0.9cqw * var(--fit)); border-top: 1px solid var(--hair); font-size: calc(1.4cqw * var(--fit)); color: var(--muted); }
                .sl-legend b { font-weight: 700; color: var(--ink); }
                .sl-legend .k { color: var(--talk); }
                .sl-legend .f { color: var(--flag); }

                /* On a phone the page metaphor stops paying rent: a letter sheet
                   squeezed to 358px puts talk cues at 6px. Below 640px the sheet
                   stops being a page -- it flows and scrolls at a fixed scale
                   sized for reading at arm's length, and the talk column folds
                   above the song it precedes. Print is unaffected. */
                @media screen and (max-width: 640px) {
                    .sl-paper { aspect-ratio: auto; height: auto; overflow: visible; --fit: 2.2 !important; }
                    .sl-row { display: block; }
                    .sl-right { border-left: none; padding-left: calc(9cqw * var(--fit)); }
                    /* An empty talk cell would otherwise sit between two songs
                       and break the segue rule running between them. */
                    .sl-right:empty { display: none; }
                    .sl-song { --pad: calc(1.1cqw * var(--fit)); }
                }

                @media print {
                    @page { size: letter portrait; margin: 0.45in; }
                    /* Ink on paper: print is always the light theme. */
                    .setlist-page, .setlist-page[data-theme="dark"] {
                        --paper: #ffffff; --ink: #0b0d10; --muted: #5c636d;
                        --hair: #d7dbe0; --talk: #01527f; --flag: #93450a;
                        background: #fff !important;
                        padding: 0 !important; min-height: 0 !important;
                    }
                    body { background: #fff !important; }
                    .setlist-wrap { max-width: none !important; margin: 0 !important; padding: 0 !important; }
                    .sl-paper { border: none !important; }
                    .sl-screen-only { display: none !important; }
                    .sl-paper, .sl-paper * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            `}</style>
            <div className="setlist-page min-h-screen" data-theme={theme}>
                <div className="setlist-wrap max-w-3xl mx-auto px-4 py-8">

                    <div className="sl-screen-only sl-chrome mb-4 flex items-center justify-between gap-4 text-sm">
                        <Link to="/setlists">← All setlists</Link>
                        <div className="flex items-center gap-2">
                            <button type="button" onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}>
                                {theme === 'dark' ? 'Light' : 'Dark'}
                            </button>
                            <button type="button" onClick={copyAsText}>
                                {copied ? 'Copied' : 'Copy as text'}
                            </button>
                        </div>
                    </div>

                    {overflows && (
                        <p className="sl-screen-only mb-4 text-sm border border-amber-500/50 text-amber-700 px-3 py-2">
                            This set is too long to fit one page at a readable size. Trim a few lines.
                        </p>
                    )}

                    <div ref={paperRef} className="sl-paper">
                        <div ref={contentRef} className="sl-content">

                            <header>
                                <h1 className="sl-venue">{set.venue}</h1>
                                <p className="sl-meta">
                                    {set.location} — {formatDate(set.date)}
                                    {set.showTime && <> · {set.showTime}</>}
                                </p>
                                <div className="sl-rule" />
                            </header>

                            <div>
                                {rows.map((row, i) => (
                                    <div className="sl-row" key={i}>
                                        <div className="sl-right">
                                            {row.talk.map((t, j) => (
                                                <React.Fragment key={j}>
                                                    <p className={`sl-backing ${t.backing ? '' : 'missing'}`}>
                                                        {t.backing ?? 'backing?'}
                                                    </p>
                                                    <p className="sl-talk">{t.text}</p>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <div className="sl-left">
                                            {row.song && (
                                                <div className="sl-song">
                                                    {(row.song.segueIn || row.song.segueOut) && (
                                                        <span className={`sl-seg ${row.song.segueIn ? 'in' : ''} ${row.song.segueOut ? 'out' : ''}`} />
                                                    )}
                                                    <div className="sl-gutter">
                                                        <div className="sl-num">{row.song.number}</div>
                                                        {row.song.starter && (
                                                            <div className="sl-who">
                                                                {row.song.queuer && <><span className="q">{row.song.queuer}</span><span className="q">›</span></>}
                                                                {row.song.starter}
                                                                {row.song.onFeel && <span className="feel">~</span>}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <h2 className="sl-title">{row.song.title}</h2>
                                                    {row.song.warnings.map((w, j) => (
                                                        <p key={j} className="sl-flag">{w}</p>
                                                    ))}
                                                    {row.song.cues.map((c, j) => (
                                                        <p key={j} className="sl-cue">{c}</p>
                                                    ))}
                                                    {row.song.lyrics.map((l, j) => (
                                                        <p key={j} className="sl-lyric">“{l}”</p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="sl-legend">
                                <b>│</b> no gap · <b>A</b> kicks it off · <b>A›B</b> A queues, B starts ·{' '}
                                <b>A~</b> on feel, no hard cue · <span className="k">talk</span> ·{' '}
                                <span className="f">flag</span>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SetlistPage;
