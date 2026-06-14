import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { stagePlots } from '../data/stagePlots';
import { InstrumentIcon } from '../components/InstrumentIcon';

function formatDate(iso: string) {
    const d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

/** Maps a member's stage coords to a screen position (% of the diagram box). */
function nodePos(x: number, y: number) {
    return { left: x, top: 10 + y * 0.78 };
}

const MicIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="2.5" width="6" height="11" rx="3" fill="currentColor" stroke="none" />
        <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
        <path d="M12 17.5V21M8.5 21h7" />
    </svg>
);

const StagePlotPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const plot = stagePlots.find(p => p.slug === slug);

    useEffect(() => {
        if (!plot) return;
        const prev = document.title;
        document.title = `Paper Straw – Stage Plot – ${plot.venue} – ${plot.date}`;
        return () => { document.title = prev; };
    }, [plot]);

    if (!plot) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-display text-gray-900 mb-4">Stage Plot Not Found</h1>
                    <p className="text-gray-600">No stage plot matches this URL.</p>
                </div>
            </div>
        );
    }

    const sorted = [...plot.members].sort((a, b) => a.y - b.y);

    return (
        <>
            <style>{`
                /* Sizes are in cqw (% of the diagram's own width) so the whole plot
                   scales proportionally with its container -- full size on desktop,
                   shrinks to fit on mobile with no scrollbar. Reference width ~736px. */
                .sp-stage { position: relative; aspect-ratio: 2 / 1; container-type: inline-size; }
                .sp-edge { font-size: 1.3cqw; }
                .sp-node { position: absolute; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; z-index: 2; }
                .sp-art { position: relative; width: 6.3cqw; height: 6.3cqw; border-radius: 9999px; border: 2px solid #9ca3af; background: #fff; display: flex; align-items: center; justify-content: center; color: #111827; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
                .sp-art svg { width: 3.8cqw; height: 3.8cqw; }
                .sp-name { margin-top: 0.5cqw; font-size: 1.5cqw; font-weight: 800; white-space: nowrap; color: #111827; }
                .sp-role { font-size: 1.22cqw; color: #6b7280; white-space: nowrap; }
                .sp-badges { display: flex; align-items: center; gap: 0.55cqw; margin-top: 0.4cqw; }
                .sp-badge { display: flex; align-items: center; gap: 0.4cqw; background: #fff; border: 1px solid #d1d5db; border-radius: 9999px; padding: 0.14cqw 0.95cqw; color: #374151; }
                .sp-badge svg { width: 1.5cqw; height: 1.5cqw; }
                .sp-badge .mt { font-size: 1.1cqw; font-weight: 800; letter-spacing: 0.03em; white-space: nowrap; }
                .sp-badge.stereo, .sp-badge.stereo svg { color: #4f46e5; }
                @media print {
                    body { background: white !important; }
                    .stage-plot-page { padding: 0 !important; }
                    .stage-plot-page * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .stage-diagram { break-inside: avoid; }
                    .input-table { break-inside: avoid; }
                    footer { display: none; }
                }
            `}</style>
            <div className="stage-plot-page min-h-screen bg-white text-gray-900">
                <div className="max-w-3xl mx-auto px-4 py-10 md:py-14 print:py-6">

                    {/* Header */}
                    <header className="mb-6">
                        <p className="text-xs uppercase tracking-wider mb-1 text-gray-500 font-medium">Paper Straw · Stage Plot</p>
                        <h1 className="text-2xl md:text-3xl font-display">{plot.venue}</h1>
                        <p className="text-gray-600 text-sm mt-0.5">
                            {plot.location} — {formatDate(plot.date)}
                        </p>
                        {(plot.soundCheckTime || plot.showTime) && (
                            <p className="text-gray-500 text-sm mt-1">
                                {plot.soundCheckTime && <>Soundcheck: {plot.soundCheckTime}</>}
                                {plot.soundCheckTime && plot.showTime && <> · </>}
                                {plot.showTime && <>Show: {plot.showTime}</>}
                            </p>
                        )}
                    </header>

                    {/* Stage Diagram */}
                    <section className="stage-diagram mb-6">
                        <h2 className="text-base font-display mb-2">Stage Layout</h2>
                        <div className="sp-stage w-full border border-gray-300 rounded-lg bg-gray-50">

                            <p className="sp-edge absolute top-2 left-0 right-0 text-center uppercase tracking-widest text-gray-500 font-medium">
                                Audience
                            </p>

                            {plot.members.map((m, i) => {
                                const pos = nodePos(m.x, m.y);
                                const chan = m.channels ?? 'mono';
                                const badgeLabel = chan === 'mics' ? 'MICS' : chan === 'stereo' ? '1/4" STEREO' : '1/4" MONO';
                                return (
                                    <div key={i} className="sp-node" style={{ left: `${pos.left}%`, top: `${pos.top}%` }}>
                                        <div className="sp-art">
                                            <InstrumentIcon instrument={m.instrument} />
                                        </div>
                                        <div className="sp-name">{m.name}</div>
                                        <div className="sp-role">{m.role}</div>
                                        <div className="sp-badges">
                                            <span className={`sp-badge ${chan === 'stereo' ? 'stereo' : ''}`}>
                                                <span className="mt">{badgeLabel}</span>
                                            </span>
                                            {m.vocals && (
                                                <span className="sp-badge">
                                                    <MicIcon />
                                                    <span className="mt">MIC</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            <p className="sp-edge absolute bottom-2 left-0 right-0 text-center uppercase tracking-widest text-gray-400 font-medium">
                                Back Wall
                            </p>
                        </div>
                    </section>

                    {/* Input List */}
                    <section className="input-table mb-6">
                        <h2 className="text-base font-display mb-2">Input List</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs border-collapse">
                                <thead>
                                    <tr className="text-left text-gray-500 text-[10px] uppercase tracking-wider">
                                        <th className="pb-1 pr-3 border-b-2 border-gray-300 font-semibold">Name</th>
                                        <th className="pb-1 pr-3 border-b-2 border-gray-300 font-semibold">Role</th>
                                        <th className="pb-1 pr-3 border-b-2 border-gray-300 font-semibold">Equipment</th>
                                        <th className="pb-1 border-b-2 border-gray-300 font-semibold">Output</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sorted.map((m, i) => (
                                        <tr key={i} className="border-b border-gray-200">
                                            <td className="py-1.5 pr-3 font-bold whitespace-nowrap">{m.name}</td>
                                            <td className="py-1.5 pr-3 text-gray-700 whitespace-nowrap">{m.role}</td>
                                            <td className="py-1.5 pr-3 text-gray-700">{m.equipment.join(', ')}</td>
                                            <td className="py-1.5 text-gray-700 font-mono whitespace-nowrap">{m.outputs}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-xs font-medium text-gray-700 flex gap-6">
                            <span>DI Channels: <strong>{plot.members.reduce((acc, m) => {
                                const match = m.outputs.match(/(\d+)x/);
                                return acc + (match ? parseInt(match[1]) : 0);
                            }, 0)}</strong></span>
                            <span>Vocal Mics: <strong>{plot.members.filter(m => m.vocals).length}</strong></span>
                            <span>Drums: <strong>mic'd by house</strong></span>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="border-t border-gray-200 pt-3 text-xs text-gray-400">
                        Paper Straw · San Francisco, CA
                    </footer>
                </div>
            </div>
        </>
    );
};

export default StagePlotPage;
