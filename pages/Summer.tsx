import React, { useEffect } from 'react';
import { incomingParams, withParams } from '../lib/shortLink';

// Destination for the "Summer" single QR code. Swap this to change where /summer sends people.
const SUMMER_DESTINATION = 'https://distrokid.com/hyperfollow/paperstraw/summer';

const Summer: React.FC = () => {
    useEffect(() => {
        window.location.replace(withParams(SUMMER_DESTINATION, incomingParams(window.location)));
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
            color: '#fff',
            background: '#000',
        }}>
            <p>Redirecting…</p>
        </div>
    );
};

export default Summer;
