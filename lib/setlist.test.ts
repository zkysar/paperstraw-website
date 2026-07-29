import { describe, it, expect } from 'vitest';
import { parseSetlist } from './setlist';

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
