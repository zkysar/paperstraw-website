import { describe, it, expect } from 'vitest';
import { parseSetlist, parseCue, buildSheet } from './setlist';

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
  it('reads "straight into" as a segue and drops the named target', () => {
    expect(parseCue('straight into Bikes - Zach starts')).toEqual({
      segue: true,
      starter: 'Z',
      text: '',
    });
  });

  it('reads a segue with no named target', () => {
    expect(parseCue('straight into - Zach starts')).toEqual({
      segue: true,
      starter: 'Z',
      text: '',
    });
  });

  it('takes the starter initial and keeps the rest of the cue', () => {
    expect(parseCue('Matt starts when it feels right')).toEqual({
      segue: false,
      starter: 'M',
      text: 'when it feels right',
    });
  });

  it('takes the first name followed by "starts", not a later one', () => {
    expect(parseCue('Evan starts when Zach queues')).toEqual({
      segue: false,
      starter: 'E',
      text: 'when Zach queues',
    });
  });

  it('leaves a cue with no recognised pattern untouched', () => {
    expect(parseCue('tune to drop D')).toEqual({
      segue: false,
      starter: undefined,
      text: 'tune to drop D',
    });
  });
});

describe('buildSheet', () => {
  it('attaches a preceding talk line to the song that follows it', () => {
    const { songs } = buildSheet(['~ thank the room', 'Summer']);
    expect(songs[0].talk).toEqual(['thank the room']);
  });

  it('attaches a preceding warning to the song that follows it', () => {
    const { songs } = buildSheet(['! No Swearing', 'Summer']);
    expect(songs[0].warnings).toEqual(['No Swearing']);
  });

  it('keeps lyrics on their own song', () => {
    const { songs } = buildSheet(['Summer', '" first line']);
    expect(songs[0].lyrics).toEqual(['first line']);
  });

  it('sets segueIn on the song a segue cue precedes', () => {
    const { songs } = buildSheet(['Summer', '> straight into - Zach starts', 'Bikes']);
    expect(songs.map(s => s.segueIn)).toEqual([false, true]);
  });

  it('sets segueOut on the song a segue leads away from', () => {
    const { songs } = buildSheet(['Summer', '> straight into - Zach starts', 'Bikes']);
    expect(songs.map(s => s.segueOut)).toEqual([true, false]);
  });

  it('does not chain across a song that is not segued into', () => {
    const { songs } = buildSheet([
      'Summer',
      '> straight into - Zach starts',
      'Bikes',
      'Tommy',
    ]);
    expect(songs.map(s => [s.segueIn, s.segueOut])).toEqual([
      [false, true],
      [true, false],
      [false, false],
    ]);
  });

  it('puts the starter initial on the song the cue precedes', () => {
    const { songs } = buildSheet(['> Matt starts when it feels right', 'Summer']);
    expect(songs[0].starter).toBe('M');
    expect(songs[0].cues).toEqual(['when it feels right']);
  });

  it('drops a cue that is fully encoded by the segue and starter marks', () => {
    const { songs } = buildSheet(['Summer', '> straight into - Zach starts', 'Bikes']);
    expect(songs[1].cues).toEqual([]);
  });

  it('collects talk after the last song as outro', () => {
    const { songs, outro } = buildSheet(['Summer', '~ plug the EP']);
    expect(songs).toHaveLength(1);
    expect(songs[0].talk).toEqual([]);
    expect(outro).toEqual(['plug the EP']);
  });
});
