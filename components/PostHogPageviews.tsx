import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { capturePageview } from '../lib/analytics';

// Captures a $pageview on first render and on every hash-route change.
// No-ops when analytics is disabled (VITE_POSTHOG_KEY unset).
const PostHogPageviews = () => {
    const location = useLocation();

    useEffect(() => {
        capturePageview();
    }, [location.pathname, location.search]);

    return null;
};

export default PostHogPageviews;
