import React from 'react';
import { Link } from 'react-router-dom';
import { setlists } from '../data/setlists';

function formatDate(iso: string) {
    const d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

const SetlistsPage: React.FC = () => {
    const sorted = [...setlists].sort((a, b) => b.date.localeCompare(a.date));

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
                <header className="mb-8">
                    <p className="text-xs uppercase tracking-wider mb-1 text-gray-500 font-medium">Paper Straw</p>
                    <h1 className="text-2xl md:text-3xl font-display">Setlists</h1>
                </header>

                {sorted.length === 0 ? (
                    <p className="text-gray-500">No setlists yet.</p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {sorted.map(set => (
                            <li key={set.slug}>
                                <Link
                                    to={`/setlists/${set.slug}`}
                                    className="block py-4 hover:bg-gray-50 -mx-4 px-4 rounded-lg transition-colors"
                                >
                                    <p className="font-bold">{set.venue}</p>
                                    <p className="text-sm text-gray-600">
                                        {set.location} — {formatDate(set.date)}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                <footer className="border-t border-gray-200 pt-6 mt-12 text-xs text-gray-400">
                    Paper Straw · San Francisco, CA
                </footer>
            </div>
        </div>
    );
};

export default SetlistsPage;
