/**
 * Setlist sheets, printed for the stage floor and read off a phone on it.
 *
 * To make a new one: copy the most recent entry, change the header, edit
 * `lines`. Line prefixes (see lib/setlist.ts):
 *
 *   (none)  song title
 *   >       cue    - who kicks the song off
 *   >>      cue    - same, and it runs straight in from the previous song
 *   ~       talk   - must declare its backing before a pipe
 *   !       flag   - loud reminder, e.g. "No Swearing"
 *   "       lyric  - opening line, attaches to the song above it
 *
 * Cue bodies are marks, not prose, because the sheet draws them:
 *
 *   > Zach          Zach kicks it off
 *   > Zach>Evan     Zach queues, Evan starts
 *   > Matt~         Matt kicks it off on feel, not a hard cue
 *   > Zach - note   trailing note, printed under the title
 *
 * Talk bodies name what is playing behind them:
 *
 *   ~ no music | intro the band, thanks KZSU
 *   ~ over music | what the band does
 *
 * A talk cue with no backing renders a visible BACKING? flag rather than
 * quietly assuming silence.
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
            '~ no music | intro the band, thanks KZSU',
            '> Matt~',
            'Summer',
            '>> Zach',
            'Bikes',
            '~ no music | both of those songs are available for streaming',
            '! No Swearing',
            '> Zach>Evan',
            'Tommy',
            '>> Zach',
            'Transit Line',
            '>> Zach',
            'Driftwood',
            '! No Swearing',
            '>> Zach',
            'Lazy River',
            "~ no music | playing a solo song - how the band's sound has changed over time",
            '> Zach',
            'Mothers',
            '>> Matt',
            'High and Dry',
            '" Drying up in conversation',
            "\" They're the ones who'll hate you",
            '~ no music | what the band does - EP, video skits, mailing list at paperstraw.band/news',
            '> Zach',
            'Sun and Soil',
            '>> Matt',
            'Drug of Choice',
            '~ no music | both songs are on the upcoming EP "Mile 1", out later this year - mailing list at paperstraw.band/news or Instagram at instagram.com/paperstrawtheband',
        ],
    },
];
