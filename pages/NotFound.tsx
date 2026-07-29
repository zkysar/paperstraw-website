import React from 'react';
import { Link } from 'react-router-dom';

// Reachable now that clean URLs are served by an SPA rewrite: an unknown path
// hits the app instead of Vercel's own 404, so it needs somewhere to land.
const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-text-main dark:text-white uppercase leading-none">
                    Page Not Found
                </h1>
                <p className="text-text-muted dark:text-gray-400 mt-3">
                    That link doesn't go anywhere.
                </p>
                <Link to="/" className="inline-block mt-6 text-primary font-bold hover:underline">
                    Back home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
