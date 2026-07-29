import { describe, it, expect } from 'vitest';
import { parseSetlist, parseCue, parseTalk, buildSheet } from './setlist';

describe('parseSetlist', () => {
  it('treats an unprefixed line as a song', () => {
    expect(parseSetlist(['Summer'])).toEqual([
      { type: 'song', number: 1, title: 'Summer', lyrics: [] },
    ]);
  });

  it('numbers songs sequentially starting at 1', () => {
    const songs = parseSetlist(['Summer', 'Bikes', 'Tommy']);
    expect(songs.map(e => e.type === 'song' && e.number)).toEqual([1, 2, 3]);
  });

  it('does not let non-song lines advance the song number', () => {
    const entries = parseSetlist(['Summer', '~ thank KZSU', '! No Swearing', 'Bikes']);
    const songs = entries.filter(e => e.type === 'song');
    expect(songs.map(e => e.type === 'song' && e.number)).toEqual([1, 2]);
  });

  it('maps ">" to a cue with the prefix stripped', () => {
    expect(parseSetlist(['> Zach starts'])).toEqual([
      { type: 'cue', text: 'Zach starts' },
    ]);
  });

  it('maps "~" to talk with the prefix stripped', () => {
    expect(parseSetlist(['~ intro the band'])).toEqual([
      { type: 'talk', text: 'intro the band' },
    ]);
  });

  it('maps "!" to a warning with the prefix stripped', () => {
    expect(parseSetlist(['! No Swearing'])).toEqual([
      { type: 'warning', text: 'No Swearing' },
    ]);
  });

  it('strips a prefix that has no following space', () => {
    expect(parseSetlist(['>Zach starts'])).toEqual([
      { type: 'cue', text: 'Zach starts' },
    ]);
  });

  it('attaches lyric lines to the preceding song', () => {
    expect(parseSetlist(['High and Dry', '" Drying up in conversation'])).toEqual([
      {
        type: 'song',
        number: 1,
        title: 'High and Dry',
        lyrics: ['Drying up in conversation'],
      },
    ]);
  });

  it('attaches lyric lines to the most recent song, not the first', () => {
    const entries = parseSetlist(['Mothers', 'High and Dry', '" Drying up in conversation']);
    expect(entries).toEqual([
      { type: 'song', number: 1, title: 'Mothers', lyrics: [] },
      {
        type: 'song',
        number: 2,
        title: 'High and Dry',
        lyrics: ['Drying up in conversation'],
      },
    ]);
  });

  it('drops a lyric line that appears before any song', () => {
    expect(parseSetlist(['" orphaned lyric', 'Summer'])).toEqual([
      { type: 'song', number: 1, title: 'Summer', lyrics: [] },
    ]);
  });

  it('skips blank and whitespace-only lines', () => {
    expect(parseSetlist(['', '   ', 'Summer'])).toEqual([
      { type: 'song', number: 1, title: 'Summer', lyrics: [] },
    ]);
  });

  it('keeps a line as a song title when a prefix character appears mid-string', () => {
    expect(parseSetlist(['Drying up in "conversation"'])).toEqual([
      { type: 'song', number: 1, title: 'Drying up in "conversation"', lyrics: [] },
    ]);
  });
});

describe('parseCue', () => {
  it('reads a bare name as who starts the song', () => {
    expect(parseCue('Zach')).toEqual({
      segue: false, starter: 'Z', queuer: undefined, onFeel: false, note: '',
    });
  });

  it('reads a leading ">" as a segue from the previous song', () => {
    expect(parseCue('> Zach')).toEqual({
      segue: true, starter: 'Z', queuer: undefined, onFeel: false, note: '',
    });
  });

  it('reads a trailing "~" as kicked off on feel', () => {
    expect(parseCue('Matt~')).toEqual({
      segue: false, starter: 'M', queuer: undefined, onFeel: true, note: '',
    });
  });

  it('reads "A>B" as A queues and B starts', () => {
    expect(parseCue('Zach>Evan')).toEqual({
      segue: false, starter: 'E', queuer: 'Z', onFeel: false, note: '',
    });
  });

  it('combines a segue, split roles, feel, and a note', () => {
    expect(parseCue('> Zach>Evan~ - hold the last chord')).toEqual({
      segue: true, starter: 'E', queuer: 'Z', onFeel: true, note: 'hold the last chord',
    });
  });

  it('keeps a note that follows a bare name', () => {
    expect(parseCue('Zach - count it in')).toEqual({
      segue: false, starter: 'Z', queuer: undefined, onFeel: false, note: 'count it in',
    });
  });

  it('records a segue with nobody named', () => {
    expect(parseCue('>')).toEqual({
      segue: true, starter: undefined, queuer: undefined, onFeel: false, note: '',
    });
  });
});

describe('parseTalk', () => {
  it('takes the backing from before the pipe', () => {
    expect(parseTalk('no music | intro the band')).toEqual({
      backing: 'no music', text: 'intro the band',
    });
  });

  it('accepts any backing the setlist names', () => {
    expect(parseTalk('over music | what the band does')).toEqual({
      backing: 'over music', text: 'what the band does',
    });
  });

  it('leaves the backing unset when no pipe is present, so the sheet can flag it', () => {
    expect(parseTalk('intro the band')).toEqual({
      backing: undefined, text: 'intro the band',
    });
  });

  it('splits on the first pipe only', () => {
    expect(parseTalk('no music | EP, video skits | mailing list')).toEqual({
      backing: 'no music', text: 'EP, video skits | mailing list',
    });
  });
});

describe('buildSheet', () => {
  it('attaches a preceding talk cue to the song that follows it', () => {
    const { songs } = buildSheet(['~ no music | thank the room', 'Summer']);
    expect(songs[0].talk).toEqual([{ backing: 'no music', text: 'thank the room' }]);
  });

  it('attaches a preceding warning to the song that follows it', () => {
    const { songs } = buildSheet(['! No Swearing', 'Summer']);
    expect(songs[0].warnings).toEqual(['No Swearing']);
  });

  it('keeps lyrics on their own song', () => {
    const { songs } = buildSheet(['Summer', '" first line']);
    expect(songs[0].lyrics).toEqual(['first line']);
  });

  it('sets segueIn on the song a ">>" cue precedes', () => {
    const { songs } = buildSheet(['Summer', '>> Zach', 'Bikes']);
    expect(songs.map(s => s.segueIn)).toEqual([false, true]);
  });

  it('sets segueOut on the song a segue leads away from', () => {
    const { songs } = buildSheet(['Summer', '>> Zach', 'Bikes']);
    expect(songs.map(s => s.segueOut)).toEqual([true, false]);
  });

  it('does not chain across a song that is not segued into', () => {
    const { songs } = buildSheet(['Summer', '>> Zach', 'Bikes', 'Tommy']);
    expect(songs.map(s => [s.segueIn, s.segueOut])).toEqual([
      [false, true],
      [true, false],
      [false, false],
    ]);
  });

  it('puts the starter, queuer, and feel mark on the song the cue precedes', () => {
    const { songs } = buildSheet(['> Zach>Evan~', 'Tommy']);
    expect(songs[0].starter).toBe('E');
    expect(songs[0].queuer).toBe('Z');
    expect(songs[0].onFeel).toBe(true);
  });

  it('collects talk after the last song as outro', () => {
    const { songs, outro } = buildSheet(['Summer', '~ no music | plug the EP']);
    expect(songs).toHaveLength(1);
    expect(songs[0].talk).toEqual([]);
    expect(outro).toEqual([{ backing: 'no music', text: 'plug the EP' }]);
  });
});
