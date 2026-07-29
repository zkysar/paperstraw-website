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

/**
 * Cues repeat themselves across a set -- "straight into, Zach starts" four
 * times over. The sheet draws those two facts instead of spelling them (a rule
 * in the gutter for the segue, an initial for who starts), so they come out of
 * the cue text here and only the remainder is printed.
 */
export interface ParsedCue {
    segue: boolean;
    /** Initial of whoever starts the song, e.g. "Z" for Zach. */
    starter?: string;
    /** What is left once the segue and starter have been taken out. */
    text: string;
}

/** "straight into" plus any named target, up to a separator. */
const SEGUE = /^straight into\b[^-–·]*/i;
/** The first "<Name> starts" in the cue. */
const STARTER = /\b([A-Z][a-z]+) starts\b/;
const EDGE_SEPARATORS = /^[\s-–·]+|[\s-–·]+$/g;

export function parseCue(raw: string): ParsedCue {
    let text = raw.trim();

    const segue = SEGUE.test(text);
    if (segue) text = text.replace(SEGUE, '');

    let starter: string | undefined;
    const match = text.match(STARTER);
    if (match) {
        starter = match[1][0];
        text = text.replace(match[0], ' ');
    }

    text = text.replace(/\s+/g, ' ').replace(EDGE_SEPARATORS, '');

    return { segue, starter, text };
}

/**
 * A song and everything that belongs to it. Cues, talk, and warnings are
 * written before the song they apply to, so they collect onto the song that
 * follows them.
 */
export interface SongBlock {
    number: number;
    title: string;
    lyrics: string[];
    /** Cue text left over after the segue and starter were encoded visually. */
    cues: string[];
    warnings: string[];
    talk: string[];
    /** This song follows straight on from the previous one. */
    segueIn: boolean;
    /** The next song follows straight on from this one. */
    segueOut: boolean;
    starter?: string;
}

export interface SetlistSheet {
    songs: SongBlock[];
    /** Talk cues written after the last song. */
    outro: string[];
}

export function buildSheet(lines: string[]): SetlistSheet {
    const songs: SongBlock[] = [];
    const outro: string[] = [];

    let cues: string[] = [];
    let warnings: string[] = [];
    let talk: string[] = [];
    let segueIn = false;
    let starter: string | undefined;

    for (const entry of parseSetlist(lines)) {
        if (entry.type === 'cue') {
            const cue = parseCue(entry.text);
            if (cue.segue) segueIn = true;
            if (cue.starter) starter = cue.starter;
            if (cue.text) cues.push(cue.text);
            continue;
        }
        if (entry.type === 'warning') { warnings.push(entry.text); continue; }
        if (entry.type === 'talk') { talk.push(entry.text); continue; }

        if (segueIn && songs.length > 0) songs[songs.length - 1].segueOut = true;

        songs.push({
            number: entry.number,
            title: entry.title,
            lyrics: entry.lyrics,
            cues,
            warnings,
            talk,
            segueIn,
            segueOut: false,
            starter,
        });

        cues = [];
        warnings = [];
        talk = [];
        segueIn = false;
        starter = undefined;
    }

    // Anything still pending came after the last song. Only talk survives there;
    // a cue or warning with no song to attach to has nothing to say.
    outro.push(...talk);

    return { songs, outro };
}
