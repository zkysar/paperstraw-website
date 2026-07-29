/**
 * QR short links (/card, /summer, /wb) forward any tracking params they were
 * opened with on to their destination.
 *
 * The site used to run on a hash router, so a printed code could land as
 * /#/card?utm_source=x. Those URLs still arrive, get rewritten to /card?... by
 * the shim in index.html, and are read here from either place.
 */

/** The parts of `window.location` a short link needs. Passed in so this stays pure. */
export interface LocationParts {
    search: string;
    hash: string;
}

export function incomingParams(loc: LocationParts): URLSearchParams {
    const fromSearch = loc.search.replace(/^\?/, '');
    const fromHash = loc.hash.split('?')[1] ?? '';
    return new URLSearchParams(fromSearch || fromHash);
}

/** Copies params onto the destination without overwriting any it already sets. */
export function withParams(destination: string, params: URLSearchParams): string {
    const dest = new URL(destination);
    params.forEach((value, key) => {
        if (!dest.searchParams.has(key)) dest.searchParams.set(key, value);
    });
    return dest.toString();
}
