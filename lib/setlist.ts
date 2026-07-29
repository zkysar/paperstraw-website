/**
 * Setlists are authored as plain lines in `data/setlists.ts`. A single leading
 * character marks what a line is; no prefix means the line is a song title.
 * This keeps the data file readable as a setlist rather than as code.
 *
 *   (none)  song      large numbered title
 *   >       cue       who starts, how the songs join
 *   ~       talk      banter / talking points
 *   !       warning   loud reminder, e.g. "No Swearing"
 *   "       lyric     opening line, attaches to the song above it
 */

export type SetlistEntry =
    | { type: 'song'; number: number; title: string; lyrics: string[] }
    | { type: 'cue'; text: string }
    | { type: 'talk'; text: string }
    | { type: 'warning'; text: string };

const PREFIXES = {
    '>': 'cue',
    '~': 'talk',
    '!': 'warning',
} as const;

export function parseSetlist(lines: string[]): SetlistEntry[] {
    const entries: SetlistEntry[] = [];
    let lastSong: Extract<SetlistEntry, { type: 'song' }> | null = null;
    let songCount = 0;

    for (const raw of lines) {
        const line = raw.trim();
        if (!line) continue;

        const marker = line[0];
        const rest = line.slice(1).trim();

        if (marker === '"') {
            // A lyric with no song above it has nothing to prompt; drop it.
            if (lastSong) lastSong.lyrics.push(rest);
            continue;
        }

        const noteType = PREFIXES[marker as keyof typeof PREFIXES];
        if (noteType) {
            entries.push({ type: noteType, text: rest });
            continue;
        }

        lastSong = { type: 'song', number: ++songCount, title: line, lyrics: [] };
        entries.push(lastSong);
    }

    return entries;
}
