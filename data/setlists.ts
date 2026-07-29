/**
 * Setlist sheets, printed for the stage floor.
 *
 * To make a new one: copy the most recent entry, change the header, edit
 * `lines`. Line prefixes (see lib/setlist.ts):
 *
 *   (none)  song title
 *   >       cue      - who starts, how songs join
 *   ~       talk     - banter / talking points
 *   !       warning  - loud reminder, e.g. "No Swearing"
 *   "       lyric    - opening line, attaches to the song above it
 */

export interface Setlist {
    slug: string;
    venue: string;
    location: string;
    /** ISO YYYY-MM-DD */
    date: string;
    showTime?: string;
    lines: string[];
}

export const setlists: Setlist[] = [
    {
        slug: 'kzsu-wnl-2026-07-29',
        venue: 'KZSU Wednesday Night Live',
        location: 'Stanford, CA',
        date: '2026-07-29',
        showTime: '9:00–10:00 PM PST',
        lines: [
            '~ no music - intro the band, thanks KZSU',
            '> Matt starts when it feels right',
            'Summer',
            '> straight into Bikes - Zach starts',
            'Bikes',
            '~ no music - both of those songs are available for streaming',
            '! No Swearing',
            '> Evan starts when Zach queues',
            'Tommy',
            '> straight into - Zach starts',
            'Transit Line',
            '> straight into - Zach starts',
            'Driftwood',
            '! No Swearing',
            '> straight into - Zach starts',
            'Lazy River',
            "~ playing a solo song - how the band's sound has changed over time",
            'Mothers',
            'High and Dry',
            '" Drying up in conversation',
            "\" They're the ones who'll hate you",
            '~ what the band does - EP, video skits, mailing list (short links ready)',
            'Sun and Soil',
            'Drug of Choice',
            '~ both songs are on the upcoming EP "Mile 1", out later this year - mailing list or Instagram',
        ],
    },
];
