import { describe, it, expect } from 'vitest';
import { incomingParams, withParams } from './shortLink';

describe('incomingParams', () => {
  it('reads the query off a clean URL', () => {
    const p = incomingParams({ search: '?utm_source=card', hash: '' });
    expect(p.get('utm_source')).toBe('card');
  });

  it('falls back to the query inside a legacy hash URL', () => {
    const p = incomingParams({ search: '', hash: '#/card?utm_source=card' });
    expect(p.get('utm_source')).toBe('card');
  });

  it('prefers the real query string when both are present', () => {
    const p = incomingParams({ search: '?utm_source=clean', hash: '#/card?utm_source=legacy' });
    expect(p.get('utm_source')).toBe('clean');
  });

  it('returns nothing when neither carries a query', () => {
    expect([...incomingParams({ search: '', hash: '#/card' })]).toEqual([]);
  });
});

describe('withParams', () => {
  it('forwards params onto the destination', () => {
    const out = withParams('https://example.com/x', new URLSearchParams('utm_source=card'));
    expect(out).toBe('https://example.com/x?utm_source=card');
  });

  it('does not clobber a param the destination already sets', () => {
    const out = withParams('https://example.com/x?utm_source=kept', new URLSearchParams('utm_source=incoming'));
    expect(out).toBe('https://example.com/x?utm_source=kept');
  });

  it('leaves the destination alone when there is nothing to forward', () => {
    expect(withParams('https://example.com/x', new URLSearchParams())).toBe('https://example.com/x');
  });
});
