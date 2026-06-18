// Single source of truth for the band's QR short-links, surfaced on the
// unlisted /qr-codes utility page. Add a new entry here to publish a new code.
//
// The QR encodes the SHORT LINK (https://paperstraw.band/<slug>), never the
// destination directly, so a printed code can be repointed by editing the
// matching redirect in vercel.json without reprinting anything.

export interface QrCode {
    slug: string;        // matches the /<slug> redirect in vercel.json
    label: string;       // human title for the card
    blurb: string;       // where/why this code gets used
    destination: string; // current redirect target, shown for reference only
}

export const SHORT_LINK_BASE = 'https://paperstraw.band';

export const shortUrl = (slug: string): string => `${SHORT_LINK_BASE}/${slug}`;

export const qrCodes: QrCode[] = [
    {
        slug: 'card',
        label: 'Business Card',
        blurb: 'On the printed business cards.',
        destination: 'https://partiful.com/e/TKcXWyCSOEqQVeTLp8D8',
    },
    {
        slug: 'summer',
        label: '“Summer” single',
        blurb: 'Promo for the new single.',
        destination: 'https://distrokid.com/hyperfollow/paperstraw/summer',
    },
];
