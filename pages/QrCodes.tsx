import React from 'react';
import { Link } from 'react-router-dom';
import QrCard from '../components/QrCard';
import { qrCodes } from '../data/qrCodes';

// Unlisted utility page (not in the navbar). Lets the band find, view, and
// download every QR short-link the site hosts.
const QrCodes: React.FC = () => {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <div className="w-full max-w-[1140px] mx-auto px-4 py-12 lg:px-8 flex flex-col gap-10">
                <header className="flex flex-col gap-3">
                    <Link to="/" className="text-sm font-bold text-text-muted hover:text-primary transition-colors w-fit">
                        ← Home
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-text-main dark:text-white uppercase leading-none">
                        QR Codes
                    </h1>
                    <p className="text-text-muted dark:text-gray-400 max-w-2xl leading-relaxed">
                        The band's QR codes. Download each as a PNG or SVG.
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {qrCodes.map((code) => (
                        <QrCard key={code.slug} code={code} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QrCodes;
