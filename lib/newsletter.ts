import { XMLParser } from 'fast-xml-parser';

// Substack is the source of truth for newsletter posts; the site mirrors this
// feed read-only. The feed sends no CORS header, so it is fetched server-side
// by api/newsletter.ts, never from the browser.
export const SUBSTACK_URL = 'https://paperstrawtheband.substack.com';
export const SUBSTACK_FEED_URL = `${SUBSTACK_URL}/feed`;

export interface NewsletterPost {
    title: string;
    url: string;
    date: string;    // ISO 8601, or '' if the item had no pubDate
    excerpt: string; // plain text, HTML stripped, truncated
    image?: string;
}

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function truncate(text: string, max = 200): string {
    if (text.length <= max) return text;
    return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

function firstImage(html: string): string | undefined {
    const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    return m ? m[1] : undefined;
}

export function parseFeed(xml: string): NewsletterPost[] {
    const doc = parser.parse(xml);
    const channel = doc?.rss?.channel;
    if (!channel) return [];
    const raw = channel.item;
    const items: any[] = Array.isArray(raw) ? raw : raw ? [raw] : [];
    return items.map((item) => {
        const content = String(item['content:encoded'] ?? item.description ?? '');
        const enclosure = item.enclosure;
        const enclosureImage =
            enclosure && String(enclosure['@_type'] ?? '').startsWith('image')
                ? String(enclosure['@_url'])
                : undefined;
        const pubDate = item.pubDate ? String(item.pubDate) : '';
        return {
            title: String(item.title ?? '').trim(),
            url: String(item.link ?? '').trim(),
            date: pubDate ? new Date(pubDate).toISOString() : '',
            excerpt: truncate(stripHtml(String(item.description ?? content))),
            image: enclosureImage ?? firstImage(content),
        };
    });
}
