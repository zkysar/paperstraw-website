import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { setlists } from '../data/setlists';
import { parseSetlist } from '../lib/setlist';

function formatDate(iso: string) {
    const d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

/** Bounds for the auto-fit multiplier. Below MIN the sheet stops being readable. */
const FIT_MIN = 0.55;
const FIT_MAX = 1.6;

const SetlistPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const set = setlists.find(s => s.slug === slug);

    const entries = useMemo(() => (set ? parseSetlist(set.lines) : []), [set]);

    const paperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [overflows, setOverflows] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!set) return;
        const prev = document.title;
        document.title = `Paper Straw – Setlist – ${set.venue} – ${set.date}`;
        return () => { document.title = prev; };
    }, [set]);

    // Binary-search the largest --fit whose content still fits the page. Every
    // size on the sheet is in cqw, so the ratio of content height to paper
    // height is width-invariant -- the multiplier resolved on screen is equally
    // correct at print dimensions.
    useLayoutEffect(() => {
        const paper = paperRef.current;
        const content = contentRef.current;
        if (!paper || !content) return;

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
    }, [entries]);

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

    return (
        <>
            <style>{`
                /* The sheet is a letter page minus its print margins. Sizes are in
                   cqw (% of the paper's own width) times --fit, so the on-screen
                   preview is a true preview of the print output at any width.
                   System sans throughout: no webfont load to shift the measured
                   height, and it stays legible on a dark floor. */
                .sl-paper {
                    --fit: 1;
                    /* Letter minus the 0.45in print margins is 7.6 x 10.1in. The
                       height is held a hair under that so sub-pixel rounding can
                       never spill a blank second page. */
                    aspect-ratio: 7.6 / 9.95;
                    container-type: inline-size;
                    overflow: hidden;
                    background: #fff;
                    font-family: ui-sans-serif, system-ui, "Helvetica Neue", Arial, sans-serif;
                    color: #111827;
                }
                .sl-content { box-sizing: border-box; padding: 4cqw 4.5cqw; }
                /* index.html sets an explicit font-family on h1, which beats
                   inheritance from .sl-paper -- override it here. */
                .sl-paper h1, .sl-paper p, .sl-paper span, .sl-paper div { font-family: inherit; }

                .sl-venue { font-size: calc(3.1cqw * var(--fit)); font-weight: 800; letter-spacing: -0.01em; line-height: 1.15; }
                .sl-meta { font-size: calc(1.85cqw * var(--fit)); color: #6b7280; margin-top: 0.4cqw; }
                .sl-rule { border-top: 2px solid #111827; margin: calc(2cqw * var(--fit)) 0 calc(1.6cqw * var(--fit)); }

                .sl-row { display: flex; align-items: baseline; gap: calc(1.6cqw * var(--fit)); margin-top: calc(1.5cqw * var(--fit)); }
                .sl-num { font-size: calc(3cqw * var(--fit)); font-weight: 700; color: #9ca3af; min-width: calc(4.6cqw * var(--fit)); text-align: right; font-variant-numeric: tabular-nums; }
                .sl-title { font-size: calc(5.1cqw * var(--fit)); font-weight: 800; text-transform: uppercase; letter-spacing: -0.015em; line-height: 1.05; }
                .sl-lyrics { margin: calc(0.5cqw * var(--fit)) 0 0 calc(6.2cqw * var(--fit)); }
                .sl-lyric { font-size: calc(2.4cqw * var(--fit)); font-style: italic; color: #4b5563; line-height: 1.3; }

                .sl-note { margin-top: calc(1.1cqw * var(--fit)); margin-left: calc(6.2cqw * var(--fit)); font-size: calc(2.3cqw * var(--fit)); line-height: 1.3; }
                .sl-cue { color: #374151; }
                .sl-cue::before { content: "\\25B8"; color: #9ca3af; margin-right: 0.7em; }
                .sl-talk { color: #374151; display: flex; gap: calc(1.2cqw * var(--fit)); align-items: baseline; }
                .sl-chip { flex: none; font-size: calc(1.7cqw * var(--fit)); font-weight: 800; letter-spacing: 0.12em; color: #fff; background: #6b7280; border-radius: 0.25em; padding: 0.15em 0.6em; }
                .sl-warning { margin-top: calc(1.3cqw * var(--fit)); margin-left: calc(6.2cqw * var(--fit)); background: #111827; color: #fff; font-size: calc(2.9cqw * var(--fit)); font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em; text-align: center; padding: calc(0.7cqw * var(--fit)) 1em; }

                @media print {
                    @page { size: letter portrait; margin: 0.45in; }
                    body { background: #fff !important; }
                    .setlist-page { background: #fff !important; padding: 0 !important; min-height: 0 !important; }
                    .setlist-wrap { max-width: none !important; margin: 0 !important; padding: 0 !important; }
                    .sl-paper { border: none !important; border-radius: 0 !important; box-shadow: none !important; }
                    .sl-screen-only { display: none !important; }
                    .sl-paper, .sl-paper * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            `}</style>
            <div className="setlist-page min-h-screen bg-gray-100 text-gray-900">
                <div className="setlist-wrap max-w-3xl mx-auto px-4 py-8">

                    <div className="sl-screen-only mb-4 flex items-center justify-between gap-4">
                        <Link to="/setlists" className="text-sm text-gray-600 hover:text-gray-900">← All setlists</Link>
                        <button
                            type="button"
                            onClick={copyAsText}
                            className="text-sm border border-gray-300 bg-white rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
                        >
                            {copied ? 'Copied' : 'Copy as text'}
                        </button>
                    </div>

                    {overflows && (
                        <p className="sl-screen-only mb-4 text-sm bg-amber-50 border border-amber-300 text-amber-900 rounded-lg px-3 py-2">
                            This set is too long to fit one page at a readable size. Trim a few lines.
                        </p>
                    )}

                    <div ref={paperRef} className="sl-paper border border-gray-300 rounded-lg shadow-sm">
                        <div ref={contentRef} className="sl-content">

                            <header>
                                <h1 className="sl-venue">{set.venue}</h1>
                                <p className="sl-meta">
                                    {set.location} — {formatDate(set.date)}
                                    {set.showTime && <> · {set.showTime}</>}
                                </p>
                            </header>
                            <div className="sl-rule" />

                            {entries.map((entry, i) => {
                                if (entry.type === 'song') {
                                    return (
                                        <div key={i}>
                                            <div className="sl-row">
                                                <span className="sl-num">{entry.number}</span>
                                                <span className="sl-title">{entry.title}</span>
                                            </div>
                                            {entry.lyrics.length > 0 && (
                                                <div className="sl-lyrics">
                                                    {entry.lyrics.map((l, j) => (
                                                        <p key={j} className="sl-lyric">“{l}”</p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }
                                if (entry.type === 'warning') {
                                    return <p key={i} className="sl-warning">{entry.text}</p>;
                                }
                                if (entry.type === 'talk') {
                                    return (
                                        <p key={i} className="sl-note sl-talk">
                                            <span className="sl-chip">TALK</span>
                                            <span>{entry.text}</span>
                                        </p>
                                    );
                                }
                                return <p key={i} className="sl-note sl-cue">{entry.text}</p>;
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SetlistPage;
