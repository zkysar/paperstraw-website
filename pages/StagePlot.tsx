import React from 'react';
import { useParams } from 'react-router-dom';
import { stagePlots } from '../data/stagePlots';

function formatDate(iso: string) {
    const d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

const StagePlotPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const plot = stagePlots.find(p => p.slug === slug);

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
                        <div className="relative w-full border border-gray-300 rounded-lg bg-gray-50"
                             style={{ aspectRatio: '2 / 1' }}>

                            <p className="absolute top-2 left-0 right-0 text-center text-[10px] uppercase tracking-widest text-gray-500 font-medium">
                                Audience
                            </p>

                            {plot.members.map((m, i) => (
                                <div
                                    key={i}
                                    className="absolute flex flex-col items-center"
                                    style={{
                                        left: `${m.x}%`,
                                        top: `${10 + m.y * 0.78}%`,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center">
                                        <span className="text-gray-800 font-display text-sm md:text-base font-bold">
                                            {m.name.charAt(0)}
                                        </span>
                                    </div>
                                    <span className="mt-1 text-xs font-bold text-gray-900 whitespace-nowrap">{m.name}</span>
                                    <span className="text-[10px] text-gray-600 whitespace-nowrap font-medium">{m.role}</span>
                                </div>
                            ))}

                            <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] uppercase tracking-widest text-gray-400 font-medium">
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
                            <span>Vocal Mics: <strong>{plot.members.filter(m => m.role.toLowerCase().includes('vocal')).length}</strong></span>
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
