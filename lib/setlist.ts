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
 * A cue says who kicks the song off and how. The sheet draws those facts rather
 * than spelling them, so they are written as marks, not prose:
 *
 *   Zach          Zach kicks it off
 *   Zach>Evan     Zach queues, Evan starts
 *   Matt~         Matt kicks it off on feel, not a hard cue
 *   > Zach        ...and the song runs straight in from the previous one
 *   Zach - note   trailing note, printed under the title
 *
 * The leading ">" arrives here because the setlist line was written ">>", and
 * parseSetlist strips only the first prefix character.
 */
export interface ParsedCue {
    /** This song runs straight in from the previous one. */
    segue: boolean;
    /** Initial of whoever plays first. */
    starter?: string;
    /** Initial of whoever gives the cue, set only when it is not the starter. */
    queuer?: string;
    /** Kicked off on feel rather than a hard cue. */
    onFeel: boolean;
    /** Trailing note, printed as-is. */
    note: string;
}

export function parseCue(raw: string): ParsedCue {
    let body = raw.trim();

    const segue = body.startsWith('>');
    if (segue) body = body.slice(1).trim();

    let note = '';
    const split = body.search(/\s[-–]\s/);
    if (split !== -1) {
        note = body.slice(split).replace(/^\s[-–]\s/, '').trim();
        body = body.slice(0, split).trim();
    }

    const onFeel = body.endsWith('~');
    if (onFeel) body = body.slice(0, -1).trim();

    const names = body.split('>').map(n => n.trim()).filter(Boolean);
    const initial = (n: string) => n[0].toUpperCase();

    // "A>B" is A queues, B starts. A lone name does both, so there is nothing
    // to distinguish and only the starter is set.
    const queuer = names.length > 1 ? initial(names[0]) : undefined;
    const starter = names.length > 1 ? initial(names[1]) : names[0] ? initial(names[0]) : undefined;

    return { segue, starter, queuer, onFeel, note };
}

/**
 * A talk cue declares what is playing behind it, written before a pipe:
 *
 *   no music | intro the band, thanks KZSU
 *   over music | what the band does
 *
 * The vocabulary is whatever the setlist uses -- anything before the pipe is
 * taken as the backing. A cue with no pipe leaves it unset, and the sheet flags
 * that rather than assuming silence.
 */
export interface ParsedTalk {
    backing?: string;
    text: string;
}

export function parseTalk(raw: string): ParsedTalk {
    const pipe = raw.indexOf('|');
    if (pipe === -1) return { backing: undefined, text: raw.trim() };
    return {
        backing: raw.slice(0, pipe).trim(),
        text: raw.slice(pipe + 1).trim(),
    };
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
    /** Trailing cue notes, printed under the title. */
    cues: string[];
    warnings: string[];
    talk: ParsedTalk[];
    /** This song follows straight on from the previous one. */
    segueIn: boolean;
    /** The next song follows straight on from this one. */
    segueOut: boolean;
    starter?: string;
    queuer?: string;
    onFeel: boolean;
}

export interface SetlistSheet {
    songs: SongBlock[];
    /** Talk cues written after the last song. */
    outro: ParsedTalk[];
}

export function buildSheet(lines: string[]): SetlistSheet {
    const songs: SongBlock[] = [];
    const outro: ParsedTalk[] = [];

    let cues: string[] = [];
    let warnings: string[] = [];
    let talk: ParsedTalk[] = [];
    let segueIn = false;
    let onFeel = false;
    let starter: string | undefined;
    let queuer: string | undefined;

    for (const entry of parseSetlist(lines)) {
        if (entry.type === 'cue') {
            const cue = parseCue(entry.text);
            if (cue.segue) segueIn = true;
            if (cue.onFeel) onFeel = true;
            if (cue.starter) starter = cue.starter;
            if (cue.queuer) queuer = cue.queuer;
            if (cue.note) cues.push(cue.note);
            continue;
        }
        if (entry.type === 'warning') { warnings.push(entry.text); continue; }
        if (entry.type === 'talk') { talk.push(parseTalk(entry.text)); continue; }

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
            queuer,
            onFeel,
        });

        cues = [];
        warnings = [];
        talk = [];
        segueIn = false;
        onFeel = false;
        starter = undefined;
        queuer = undefined;
    }

    // Anything still pending came after the last song. Only talk survives there;
    // a cue or warning with no song to attach to has nothing to say.
    outro.push(...talk);

    return { songs, outro };
}
