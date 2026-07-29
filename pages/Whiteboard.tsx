import React, { useEffect } from 'react';
import { incomingParams, withParams } from '../lib/shortLink';

// Destination for the "whiteboard" QR code (/wb). Swap this to change where /wb sends people.
const WHITEBOARD_DESTINATION = 'https://distrokid.com/hyperfollow/paperstraw/summer';

const Whiteboard: React.FC = () => {
    useEffect(() => {
        window.location.replace(withParams(WHITEBOARD_DESTINATION, incomingParams(window.location)));
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

export default Whiteboard;
