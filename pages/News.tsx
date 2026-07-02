import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SUBSTACK_URL, type NewsletterPost } from '../lib/newsletter';
import { captureEvent } from '../lib/analytics';

// Read-only mirror of the Substack feed, styled to match the site. Full posts
// live on Substack (where subscribe + comments + the reader network are).
const News: React.FC = () => {
    const [posts, setPosts] = useState<NewsletterPost[] | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        let active = true;
        fetch('/api/newsletter')
            .then((r) => (r.ok ? r.json() : Promise.reject()))
            .then((data) => { if (active) setPosts(data.posts ?? []); })
            .catch(() => { if (active) { setError(true); setPosts([]); } });
        return () => { active = false; };
    }, []);

    const formatDate = (iso: string) =>
        iso ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <div className="w-full max-w-[820px] mx-auto px-4 py-12 lg:px-8 flex flex-col gap-10">
                <header className="flex flex-col gap-3">
                    <Link to="/" className="text-sm font-bold text-text-muted hover:text-primary transition-colors w-fit">
                        ← Home
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-text-main dark:text-white uppercase leading-none">
                        News
                    </h1>
                    <p className="text-text-muted dark:text-gray-400 max-w-2xl leading-relaxed">
                        Notes from the band. Read the latest, or subscribe to get them in your inbox.
                    </p>
                    <a
                        href={`${SUBSTACK_URL}/subscribe`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => captureEvent('newsletter_subscribe_click', { source: 'news' })}
                        className="w-fit bg-primary hover:bg-primary-dark text-text-main font-bold px-6 py-3 rounded-lg transition-colors"
                    >
                        Subscribe
                    </a>
                </header>

                {posts === null && !error && (
                    <p className="text-text-muted dark:text-gray-400">Loading…</p>
                )}

                {posts !== null && posts.length === 0 && (
                    <p className="text-text-muted dark:text-gray-400">
                        No posts yet. Subscribe above to be the first to read.
                    </p>
                )}

                <div className="flex flex-col gap-6">
                    {(posts ?? []).map((post) => (
                        <a
                            key={post.url}
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => captureEvent('newsletter_open', { title: post.title, url: post.url })}
                            className="group flex flex-col gap-2 p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/5 hover:border-primary/50 transition-colors"
                        >
                            {post.date && (
                                <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                                    {formatDate(post.date)}
                                </span>
                            )}
                            <h2 className="text-xl md:text-2xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">
                                {post.title}
                            </h2>
                            {post.excerpt && (
                                <p className="text-text-muted dark:text-gray-400 leading-relaxed">{post.excerpt}</p>
                            )}
                            <span className="text-sm font-bold text-primary">Read on Substack →</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
