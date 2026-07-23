// Substack is the source of truth for newsletter posts; the site mirrors this
// feed read-only. The feed sends no CORS header, so it is fetched server-side
// by api/newsletter.ts, never from the browser.
//
// The RSS is parsed with small regex helpers rather than a library, keeping the
// serverless function dependency-free (nothing for Vercel to trace/resolve).
export const SUBSTACK_URL = 'https://paperstrawtheband.substack.com';
export const SUBSTACK_FEED_URL = `${SUBSTACK_URL}/feed`;

export interface NewsletterPost {
    title: string;
    url: string;
    date: string;    // ISO 8601, or '' if the item had no pubDate
    excerpt: string; // plain text, HTML stripped, truncated
    image?: string;
}

function decodeXml(text: string): string {
    // Unwrap CDATA, then decode the handful of entities RSS actually uses.
    return text
        .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#0?39;|&apos;/g, "'")
        .replace(/&amp;/g, '&'); // must come last so &amp;lt; -> &lt;, not <
}

// Inner text of the first <tag>…</tag> (tag name may contain ':', e.g. content:encoded).
function tagText(itemXml: string, name: string): string {
    const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i');
    const m = itemXml.match(re);
    return m ? m[1] : '';
}

function attr(tag: string, name: string): string | undefined {
    const m = tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, 'i'));
    return m ? m[1] : undefined;
}

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
    const items = xml.match(/<item\b[^>]*>[\s\S]*?<\/item>/gi) ?? [];
    return items.map((item) => {
        const encoded = tagText(item, 'content:encoded');
        const description = tagText(item, 'description');
        const content = decodeXml(encoded || description);
        const excerptSource = decodeXml(description || encoded);

        const enclosure = item.match(/<enclosure\b[^>]*>/i)?.[0] ?? '';
        const enclosureImage = (attr(enclosure, 'type') ?? '').startsWith('image')
            ? attr(enclosure, 'url')
            : undefined;

        const pubDate = decodeXml(tagText(item, 'pubDate')).trim();
        return {
            title: decodeXml(tagText(item, 'title')).trim(),
            url: decodeXml(tagText(item, 'link')).trim(),
            date: pubDate ? new Date(pubDate).toISOString() : '',
            excerpt: truncate(stripHtml(excerptSource)),
            image: enclosureImage ?? firstImage(content),
        };
    });
}
