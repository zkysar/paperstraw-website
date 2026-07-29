import React, { useEffect } from 'react';
import { incomingParams, withParams } from '../lib/shortLink';

// Destination for the business-card QR code. Swap this to change where /card sends people.
const CARD_DESTINATION = 'https://partiful.com/e/TKcXWyCSOEqQVeTLp8D8';

const Card: React.FC = () => {
    useEffect(() => {
        window.location.replace(withParams(CARD_DESTINATION, incomingParams(window.location)));
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

export default Card;
