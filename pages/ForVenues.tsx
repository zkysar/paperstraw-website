import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { previousShows } from '../data/content';

const highResPhotos = [
    {
        id: 'hr4',
        url: '/assets/press/press-photo-hr-4.jpg',
        previewUrl: '/assets/press/band-photo-1.jpg',
        alt: 'Paper Straw Press Photo'
    },
    {
        id: 'logo-full',
        url: '/assets/press/logo.png',
        previewUrl: '/assets/press/logo.png',
        alt: 'Paper Straw Logo'
    },
    {
        id: 'hr2',
        url: '/assets/press/press-photo-hr-2.jpg',
        previewUrl: '/assets/press/press-photo-lr-2.jpg',
        alt: 'Paper Straw Live 1'
    },
    {
        id: 'hr3',
        url: '/assets/press/press-photo-hr-3.jpg',
        previewUrl: '/assets/press/press-photo-lr-3.jpg',
        alt: 'Paper Straw Live 2'
    },
    {
        id: 'hr1',
        url: '/assets/press/press-photo-hr-1.jpg',
        previewUrl: '/assets/press/press-photo-lr-1.jpg',
        alt: 'Paper Straw Live 3'
    },
    {
        id: 'show1',
        url: '/assets/press/press-photo-show-1.jpg',
        previewUrl: '/assets/press/press-photo-show-1.jpg',
        alt: 'Paper Straw Live 4'
    },
    {
        id: 'show2',
        url: '/assets/press/press-photo-show-2.jpg',
        previewUrl: '/assets/press/press-photo-show-2.jpg',
        alt: 'Paper Straw Live 5'
    },
    {
        id: 'show3',
        url: '/assets/press/press-photo-show-3.jpg',
        previewUrl: '/assets/press/press-photo-show-3.jpg',
        alt: 'Paper Straw Live 6'
    },
    {
        id: 'show4',
        url: '/assets/press/press-photo-show-4.jpg',
        previewUrl: '/assets/press/press-photo-show-4.jpg',
        alt: 'Paper Straw Live 7'
    },
    {
        id: 'show5',
        url: '/assets/press/press-photo-show-5.jpg',
        previewUrl: '/assets/press/press-photo-show-5.jpg',
        alt: 'Paper Straw Live 8'
    },
];


const brandingAssets = [
    { id: 'logo1', url: '/assets/press/logo-primary.png', name: 'Primary Logo (PNG)', type: 'Transparent' },
    { id: 'logo2', url: '/assets/press/logo-secondary.png', name: 'Secondary Logo (PNG)', type: 'Transparent' },
    { id: 'logo3', url: '/assets/press/logo-tertiary.png', name: 'Tertiary Logo (PNG)', type: 'Transparent' },
    { id: 'logo-new', url: '/assets/press/logo.png', name: 'Main Logo (PNG)', type: 'Full' },
    { id: 'icon', url: '/assets/press/icon-primary.png', name: 'Icon (PNG)', type: 'Transparent' },
    { id: 'poster', url: '/assets/press/poster-web.png', name: 'Promo Poster (Web)', type: 'PNG' },
];

const ForVenues: React.FC = () => {
    const handleScrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - navbarHeight,
                behavior: 'smooth'
            });
        }
    };

    return (
        <Layout variant="for-venues">
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col pt-16">

                {/* Hero Section */}
                <div className="relative h-[35vh] min-h-[250px] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <img
                        src="/booking-banner.jpg"
                        alt="Band Equipment"
                        className="w-full h-full object-cover object-[center_30%]"
                        loading="eager"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4">
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-xl text-center px-4">
                            FOR VENUES & MEDIA
                        </h1>
                    </div>
                </div>

                <main className="flex-1 w-full max-w-[1140px] mx-auto px-4 py-12 lg:px-8 flex flex-col gap-16 md:gap-24">

                    {/* Bio Section */}
                    <section id="bio" className="grid md:grid-cols-3 gap-8 md:gap-12 scroll-mt-24">
                        <div className="md:col-span-1">
                            <h2 className="text-2xl font-bold tracking-tight text-text-main dark:text-white mb-6 underline decoration-primary decoration-4 underline-offset-8">About</h2>
                            <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase tracking-wider font-bold text-text-muted">Genre</span>
                                    <span className="font-medium dark:text-gray-200">Indie Rock / Folk</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase tracking-wider font-bold text-text-muted">Location</span>
                                    <span className="font-medium dark:text-gray-200">San Francisco, CA</span>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-2 flex flex-col gap-6">
                            <div className="p-5 bg-surface-light dark:bg-surface-dark rounded-xl border border-black/5 dark:border-white/5">
                                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Short Bio</h3>
                                <p className="text-lg leading-relaxed text-text-main/90 dark:text-gray-300">
                                    Paper Straw is a San Francisco band formed in 2023. They make warm, unhurried music that sits somewhere between folk and indie rock.
                                </p>
                            </div>

                            <div className="p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-black/5 dark:border-white/5">
                                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Full Bio</h3>
                                <p className="text-base leading-relaxed text-text-main/90 dark:text-gray-300">
                                    Paper Straw is a San Francisco band that formed in 2023, writing songs that feel like therapy disguised as a bike ride. The sound lives somewhere between folk and rock, more interested in contentment than conflict. The lyrics explore friendship, growing up, and the quiet permission to not have it all figured out. It’s music for golden hour and lazy afternoons.
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="w-full h-px bg-black/5 dark:bg-white/5"></div>

                    {/* Venues Section */}
                    <section id="venues" className="scroll-mt-24">
                        <div className="flex items-baseline justify-between gap-4 mb-8">
                            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-text-main dark:text-white uppercase leading-none">Venues Played</h2>
                            <div className="h-px flex-1 bg-black/5 dark:bg-white/5 hidden sm:block mx-4"></div>
                            <p className="text-[10px] md:text-xs font-bold text-text-muted uppercase tracking-widest whitespace-nowrap">San Francisco & Bay Area</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from(new Set(previousShows.map(show => show.venue))).map(venueName => {
                                const venueShow = previousShows.find(s => s.venue === venueName);
                                return (
                                    <div key={venueName} className="flex items-center gap-4 p-4 bg-surface-light dark:bg-surface-dark rounded-xl border border-black/5 dark:border-white/5 shadow-sm group hover:border-primary/30 transition-all">
                                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-background-light dark:bg-background-dark rounded-full border border-black/5 dark:border-white/5 group-hover:bg-primary/10 transition-colors">
                                            <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">location_on</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="font-bold text-text-main dark:text-white leading-tight">{venueName}</h3>
                                            <p className="text-xs text-text-muted font-medium">{venueShow?.location}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <div className="w-full h-px bg-black/5 dark:bg-white/5"></div>

                    {/* Media Kit Section */}
                    <section id="media-kit" className="scroll-mt-24 flex flex-col gap-16">
                        {/* Press Photos */}
                        <div>
                            <div className="flex items-end justify-between gap-4 mb-6">
                                <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-text-main dark:text-white uppercase leading-none">Press Photos</h2>
                                <p className="text-[10px] md:text-xs font-bold text-text-muted uppercase tracking-widest hidden sm:block">Swipe to see more &bull; High Resolution Assets</p>
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x scrollbar-hide">
                                {highResPhotos.map((photo) => (
                                    <div key={photo.id} className="flex-shrink-0 w-[280px] md:w-[400px] snap-start group flex flex-col gap-4">
                                        <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/5 shadow-sm">
                                            <img
                                                src={photo.previewUrl}
                                                alt={photo.alt}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                                        </div>
                                        <div className="flex flex-col gap-3 px-1">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{photo.alt}</span>
                                            </div>
                                            <a href={photo.url} download className="flex items-center justify-center gap-2 py-2.5 px-4 bg-primary text-text-main text-xs font-bold rounded-lg hover:bg-primary-dark transition-all hover:-translate-y-0.5">
                                                Download High-Res <span className="material-symbols-outlined text-base">download</span>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Branding Assets */}
                        <div>
                            <div className="flex items-end justify-between gap-4 mb-6">
                                <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-text-main dark:text-white uppercase leading-none">Logos & Assets</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {brandingAssets.map((asset) => (
                                    <div key={asset.id} className="p-5 bg-surface-light dark:bg-surface-dark rounded-xl border border-black/5 dark:border-white/5 flex flex-col gap-4">
                                        <div className="h-32 flex items-center justify-center p-3 bg-background-light dark:bg-background-dark rounded-lg border border-dashed border-black/10 dark:border-white/10">
                                            <img src={asset.url} alt={asset.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h3 className="font-bold text-sm text-text-main dark:text-white">{asset.name}</h3>
                                            <p className="text-[10px] text-text-muted uppercase tracking-wider">{asset.type}</p>
                                        </div>
                                        <a href={asset.url} download className="mt-auto flex items-center justify-center gap-2 py-2 px-4 bg-primary text-text-main text-xs font-bold rounded-lg hover:bg-primary-dark transition-all">
                                            Download <span className="material-symbols-outlined text-base">download</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <div className="w-full h-px bg-black/5 dark:bg-white/5"></div>

                    {/* Contact Section */}
                    <section id="contact" className="grid md:grid-cols-2 gap-8 md:gap-12 items-start scroll-mt-24">
                        <div className="flex flex-col gap-4 text-center md:text-left md:sticky md:top-24">
                            <p className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-text-main dark:text-white">
                                Booking & Inquiries
                            </p>
                            <p className="text-text-muted dark:text-gray-400 text-lg md:text-xl leading-relaxed">
                                Get in touch for venue inquiries, availability, and hold requests.
                            </p>
                        </div>

                        <div className="w-full bg-surface-light dark:bg-surface-dark p-6 md:p-8 rounded-2xl shadow-sm border border-black/5 dark:border-white/5">
                            <form
                                className="flex flex-col gap-4"
                                action="https://formspree.io/f/maqegvbe"
                                method="POST"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="name" className="text-xs font-bold text-text-muted uppercase tracking-wider">Name</label>
                                        <input type="text" id="name" name="name" required className="w-full bg-background-light dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 text-text-main dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="email" className="text-xs font-bold text-text-muted uppercase tracking-wider">Email</label>
                                        <input type="email" id="email" name="email" required className="w-full bg-background-light dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 text-text-main dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="subject" className="text-xs font-bold text-text-muted uppercase tracking-wider">Subject</label>
                                    <select id="subject" name="subject" className="w-full bg-background-light dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 text-text-main dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all">
                                        <option>Venue Inquiry</option>
                                        <option>Press / Media</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="message" className="text-xs font-bold text-text-muted uppercase tracking-wider">Message</label>
                                    <textarea id="message" name="message" required rows={4} className="w-full bg-background-light dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 text-text-main dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all resize-none" />
                                </div>
                                <button type="submit" className="mt-2 w-full bg-primary hover:bg-primary-dark text-text-main font-bold py-3 rounded-lg transition-all hover:shadow-lg active:translate-y-0 active:shadow-none">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </section>
                </main>

                {/* Simple Footer */}
                <footer className="mt-auto border-t border-black/5 dark:border-white/5 bg-background-light dark:bg-background-dark py-12">
                    <div className="flex flex-col items-center justify-center gap-6">
                        <div className="flex gap-6 text-text-main dark:text-white">
                            <a href="https://www.instagram.com/paperstrawtheband/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2">
                                <svg aria-hidden="true" className="size-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468.99c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fillRule="evenodd"></path></svg>
                            </a>
                            <a href="https://open.spotify.com/track/6uMAIVI0Ioz6qxeJlfO1hG?si=455a2a0e20834cca" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2">
                                <svg aria-hidden="true" className="size-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"></path></svg>
                            </a>
                            <a href="https://www.youtube.com/@paperstrawtheband" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2">
                                <svg aria-hidden="true" className="size-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.254.418-4.813a2.503 2.503 0 0 1 1.768-1.768C5.745 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" fillRule="evenodd"></path></svg>
                            </a>
                        </div>
                        <p className="text-sm text-text-muted dark:text-gray-500">© 2026 Paper Straw. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </Layout>
    );
};

export default ForVenues;
