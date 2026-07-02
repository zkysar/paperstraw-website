import { describe, it, expect } from 'vitest';
import { parseFeed, SUBSTACK_FEED_URL } from './newsletter';

const ITEM = (extra = '') => `
  <item>
    <title><![CDATA[Hello World]]></title>
    <link>https://paperstrawtheband.substack.com/p/hello-world</link>
    <pubDate>Wed, 01 Jul 2026 12:00:00 GMT</pubDate>
    <description><![CDATA[<p>Short <strong>intro</strong> text.</p>]]></description>
    <content:encoded><![CDATA[<p>Body</p><img src="https://img.example/a.png"/>]]></content:encoded>
    ${extra}
  </item>`;

const FEED = (items: string) => `<?xml version="1.0"?>
  <rss xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
    <channel><title>Paper Straw the Band</title>${items}</channel>
  </rss>`;

describe('parseFeed', () => {
  it('returns [] when the feed has no items', () => {
    expect(parseFeed(FEED(''))).toEqual([]);
  });

  it('parses a single item into a NewsletterPost', () => {
    const [post] = parseFeed(FEED(ITEM()));
    expect(post.title).toBe('Hello World');
    expect(post.url).toBe('https://paperstrawtheband.substack.com/p/hello-world');
    expect(post.date).toBe(new Date('Wed, 01 Jul 2026 12:00:00 GMT').toISOString());
    expect(post.excerpt).toBe('Short intro text.'); // HTML stripped
  });

  it('parses multiple items into an array', () => {
    expect(parseFeed(FEED(ITEM() + ITEM())).length).toBe(2);
  });

  it('prefers an image enclosure, else falls back to first <img> in content', () => {
    const withEnclosure = ITEM('<enclosure url="https://img.example/enc.jpg" type="image/jpeg"/>');
    expect(parseFeed(FEED(withEnclosure))[0].image).toBe('https://img.example/enc.jpg');
    expect(parseFeed(FEED(ITEM()))[0].image).toBe('https://img.example/a.png');
  });

  it('strips HTML and truncates long excerpts to ~200 chars with an ellipsis', () => {
    const long = '<p>' + 'word '.repeat(80) + '</p>';
    const item = `<item><title>x</title><link>x</link><pubDate>Wed, 01 Jul 2026 12:00:00 GMT</pubDate><description><![CDATA[${long}]]></description></item>`;
    const excerpt = parseFeed(FEED(item))[0].excerpt;
    expect(excerpt.length).toBeLessThanOrEqual(201);
    expect(excerpt.endsWith('…')).toBe(true);
    expect(excerpt).not.toContain('<');
  });

  it('exposes the feed URL constant', () => {
    expect(SUBSTACK_FEED_URL).toBe('https://paperstrawtheband.substack.com/feed');
  });
});
