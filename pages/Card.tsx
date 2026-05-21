import React, { useEffect } from 'react';

// Destination for the business-card QR code. Swap this to change where /card sends people.
const CARD_DESTINATION = 'https://partiful.com/e/TKcXWyCSOEqQVeTLp8D8';

const Card: React.FC = () => {
    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
        const dest = new URL(CARD_DESTINATION);
        params.forEach((value, key) => {
            if (!dest.searchParams.has(key)) dest.searchParams.set(key, value);
        });
        window.location.replace(dest.toString());
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
