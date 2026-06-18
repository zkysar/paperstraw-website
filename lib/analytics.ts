import posthog from 'posthog-js';

// Public client-side project token, injected at build time (Vercel env var).
// Leave VITE_POSTHOG_KEY unset locally to disable analytics entirely.
const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const host =
    (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ||
    'https://us.i.posthog.com';

let started = false;

export function initAnalytics(): void {
    if (started || !key) return;
    posthog.init(key, {
        api_host: host,
        // Pageviews are captured manually on hash-route changes (see usePageviews).
        capture_pageview: false,
        // Anonymous-only: don't create person profiles for visitors we never identify.
        person_profiles: 'identified_only',
        disable_session_recording: true,
    });
    started = true;
}

export function capturePageview(): void {
    if (!started) return;
    posthog.capture('$pageview');
}
