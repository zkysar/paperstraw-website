import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SUBSTACK_FEED_URL, parseFeed } from '../lib/newsletter';

// Server-side proxy for the Substack RSS feed (the feed has no CORS header, so
// the browser cannot fetch it directly). Cached at the edge for an hour.
export default async function handler(_req: VercelRequest, res: VercelResponse) {
    try {
        const upstream = await fetch(SUBSTACK_FEED_URL, {
            headers: { 'User-Agent': 'paperstraw.band/newsletter' },
        });
        if (!upstream.ok) {
            res.status(502).json({ posts: [], error: `feed responded ${upstream.status}` });
            return;
        }
        const xml = await upstream.text();
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
        res.status(200).json({ posts: parseFeed(xml) });
    } catch {
        res.status(502).json({ posts: [], error: 'failed to fetch feed' });
    }
}
