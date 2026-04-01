import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Show } from '../types';
import { useAudio } from '../context/AudioContext';

import { releases, bandPhotos, faceCoordinates, upcomingShows, previousShows, Release } from '../data/content';

// Helper for scheduling text
const getSchedulingText = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const isLateYear = now.getMonth() >= 10; // Nov or Dec
    const targetYear = isLateYear ? currentYear + 1 : currentYear;
    return `No shows yet, now scheduling for ${targetYear}`;
};

const Home: React.FC = () => {
    // Desktop State
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [previousImageIndex, setPreviousImageIndex] = useState(0);

    // Mobile State
    const [mobileImage, setMobileImage] = useState<string | null>(null);
    const [mobileFaceIndex, setMobileFaceIndex] = useState(0);
    const [previousMobileFaceIndex, setPreviousMobileFaceIndex] = useState(0);

    const [selectedRelease, setSelectedRelease] = useState<string | null>(null);
    const { playTrack, currentTrack, isPlaying, togglePlay } = useAudio();

    // Initialize Mobile Image (One time on mount)
    useEffect(() => {
        if (bandPhotos.length > 0) {
            // Pick a random image from the full collection
            const randomImage = bandPhotos[Math.floor(Math.random() * bandPhotos.length)];
            setMobileImage(randomImage);
        }
    }, []);

    const handleReleaseClick = (releaseId: string) => {
        setSelectedRelease(selectedRelease === releaseId ? null : releaseId);
    };

    const handlePlayRelease = (release: Release) => {
        if (release.audioUrl) {
            playTrack({
                title: release.title,
                artist: 'Paper Straw',
                audioUrl: release.audioUrl,
                coverImage: release.coverImage
            });
        }
    };

    const selectedReleaseData = releases.find(r => r.id === selectedRelease);

    // Desktop Slideshow Effect
    useEffect(() => {
        const interval = setInterval(() => {
            setPreviousImageIndex(currentImageIndex);
            setCurrentImageIndex((prev) => (prev + 1) % bandPhotos.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [currentImageIndex]);

    // Mobile Face Cycling Effect (Cross-Fade style)
    useEffect(() => {
        if (!mobileImage) return;

        // Use the full bandPhotos collection
        const faces = faceCoordinates[mobileImage] || [{ x: 50, y: 50 }]; // Fallback to center

        const interval = setInterval(() => {
            if (mobileFaceIndex < faces.length - 1) {
                // Just move to next face in current image
                setPreviousMobileFaceIndex(mobileFaceIndex);
                setMobileFaceIndex(prev => prev + 1);
            } else {
                // Move to next image in the full bandPhotos collection
                const currentImgIndex = bandPhotos.indexOf(mobileImage);
                const nextImgIndex = (currentImgIndex + 1) % bandPhotos.length;
                const nextImage = bandPhotos[nextImgIndex];

                setPreviousMobileFaceIndex(mobileFaceIndex);
                setMobileImage(nextImage);
                setMobileFaceIndex(0);
            }
        }, 4000); // 4 seconds per face

        return () => clearInterval(interval);
    }, [mobileImage, mobileFaceIndex]);



    // Helper to get mobile background styles
    const getMobileFaceStyle = (faceIndex: number) => {
        if (!mobileImage) return {};
        const faces = faceCoordinates[mobileImage] || [{ x: 50, y: 50 }];
        const face = faces[faceIndex] || faces[0];

        const zoom = 3; // Corresponds to backgroundSize: '300%'

        // CSS percentage background-position math to CENTER a coordinate:
        // p = (target_coordinate_percent * zoom - 50) / (zoom - 1)
        let posX = (face.x * zoom - 50) / (zoom - 1);
        let posY = (face.y * zoom - 50) / (zoom - 1);

        // CLAMP to 0-100 to prevent edge gaps
        posX = Math.max(0, Math.min(100, posX));
        posY = Math.max(0, Math.min(100, posY));

        return {
            backgroundImage: `url('${mobileImage}')`,
            backgroundPosition: `${posX}% ${posY}%`,
            backgroundSize: `${zoom * 100}%`,
        };
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            {/* Navbar is now in Layout */}

            {/* Hero Section */}
            <section className="relative h-screen w-full flex items-start justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/30 z-10"></div>

                    {/* DESKTOP View (> md) */}
                    <div className="hidden md:block w-full h-full relative">
                        {/* Previous image */}
                        <div
                            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transform-gpu will-change-transform"
                            style={{ backgroundImage: `url('${bandPhotos[previousImageIndex]}')` }}
                        ></div>
                        {/* Current image */}
                        <div
                            key={currentImageIndex}
                            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat animate-fade-in transform-gpu will-change-transform"
                            style={{ backgroundImage: `url('${bandPhotos[currentImageIndex]}')` }}
                        ></div>
                    </div>

                    {/* MOBILE View (< md) */}
                    <div className="block md:hidden w-full h-full relative overflow-hidden">
                        {/* Previous Face */}
                        <div
                            className="absolute inset-0 w-full h-full bg-no-repeat transition-none will-change-transform"
                            style={getMobileFaceStyle(previousMobileFaceIndex)}
                        ></div>
                        {/* Current Face (Fades In) */}
                        <div
                            key={mobileFaceIndex}
                            className="absolute inset-0 w-full h-full bg-no-repeat animate-fade-in will-change-transform"
                            style={getMobileFaceStyle(mobileFaceIndex)}
                        ></div>
                    </div>

                </div>

                <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl mx-auto pt-28 md:pt-32 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-none mb-4 drop-shadow-lg">
                        PAPER STRAW
                    </h1>
                    <p className="text-lg md:text-2xl text-white/90 font-medium max-w-xl mx-auto mb-6 drop-shadow-md">
                        We're Not Like Other Straws
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <a href="https://open.spotify.com/track/6uMAIVI0Ioz6qxeJlfO1hG?si=455a2a0e20834cca" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto min-w-[160px] h-14 bg-primary hover:bg-primary-dark text-text-main text-lg font-bold rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[24px]">play_circle</span>
                            Listen Now
                        </a>
                        <Link to="/for-venues" className="w-full sm:w-auto min-w-[160px] h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white text-white text-lg font-bold rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2 group">
                            For Venues
                            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 text-[20px]">arrow_forward</span>
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-10 z-20 animate-bounce">
                    <span className="material-symbols-outlined text-white/80 text-4xl">keyboard_arrow_down</span>
                </div>
            </section>

            {/* Music Section */}
            <section id="music" className="py-20 md:py-32 bg-background-light dark:bg-background-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center mb-12">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Discography</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-text-main dark:text-white tracking-tight mb-6">
                            Our Music
                        </h2>
                        <div className="h-1 w-20 bg-primary rounded-full"></div>

                    </div>

                    {/* Horizontal Scrolling Panel */}
                    <div className="relative group/scroll">
                        {/* Scroll hint - left fade */}
                        <div className="hidden md:block absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none opacity-0 group-hover/scroll:opacity-100 transition-opacity"></div>

                        {/* Scroll hint - right fade with arrow */}
                        <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none flex items-center justify-end pr-2">
                            <span className="material-symbols-outlined text-gray-400 dark:text-gray-500 animate-pulse">chevron_right</span>
                        </div>

                        {/* Swipe hint text on mobile */}
                        <div className="md:hidden flex items-center justify-center gap-1 text-xs text-gray-400 dark:text-gray-500 mb-3">
                            <span className="material-symbols-outlined text-sm">swipe</span>
                            <span>Swipe to see more</span>
                        </div>

                        <div
                            className="flex gap-6 overflow-x-auto pt-4 pb-4 snap-x snap-mandatory scrollbar-hide px-1"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {releases.map((release) => (
                                <button
                                    key={release.id}
                                    onClick={() => handleReleaseClick(release.id)}
                                    className={`flex-shrink-0 w-40 md:w-48 text-left snap-start transition-all duration-300 group ${selectedRelease === release.id
                                        ? 'scale-105'
                                        : 'hover:scale-102'
                                        }`}
                                >
                                    <div className={`aspect-square rounded-xl mb-3 flex items-center justify-center overflow-hidden transition-all duration-300 ${selectedRelease === release.id
                                        ? 'ring-4 ring-primary shadow-xl'
                                        : 'group-hover:shadow-lg'
                                        } ${release.coverImage ? '' : `bg-gradient-to-br ${release.gradientColors}`}`}>
                                        {release.coverImage ? (
                                            <img
                                                src={release.coverImage}
                                                alt={release.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="material-symbols-outlined text-5xl text-current opacity-40">album</span>
                                        )}
                                    </div>
                                    <h4 className={`font-bold text-sm transition-colors ${selectedRelease === release.id
                                        ? 'text-primary'
                                        : 'text-text-main dark:text-white group-hover:text-primary'
                                        }`}>
                                        {release.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{release.date}</p>
                                </button>
                            ))}
                            {/* Spacer for right fade */}
                            <div className="flex-shrink-0 w-8"></div>
                        </div>
                    </div>

                    {/* Expanded Details Panel */}
                    <div
                        className={`transition-all duration-500 ease-in-out ${selectedReleaseData ? 'opacity-100 mt-8' : 'opacity-0 mt-0 h-0 overflow-hidden'
                            }`}
                    >
                        {selectedReleaseData && (
                            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 md:p-8 animate-fade-in">
                                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                                    {/* Artwork */}
                                    <div className="flex-shrink-0 self-center md:self-start">
                                        <div className={`w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-xl overflow-hidden shadow-2xl ${selectedReleaseData.coverImage ? '' : `bg-gradient-to-br ${selectedReleaseData.gradientColors} flex items-center justify-center`
                                            }`}>
                                            {selectedReleaseData.coverImage ? (
                                                <img
                                                    src={selectedReleaseData.coverImage}
                                                    alt={selectedReleaseData.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="material-symbols-outlined text-7xl text-current opacity-40">album</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 flex flex-col min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div className="min-w-0">
                                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-main dark:text-white mb-1">
                                                    {selectedReleaseData.title}
                                                </h3>
                                                <p className="text-primary font-medium text-sm sm:text-base">{selectedReleaseData.date}</p>
                                            </div>
                                            <button
                                                onClick={() => setSelectedRelease(null)}
                                                className="flex-shrink-0 p-2 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-gray-500 hover:text-text-main dark:hover:text-white">close</span>
                                            </button>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                                            {selectedReleaseData.description}
                                        </p>



                                        {/* Streaming Links */}
                                        <div className="flex flex-wrap gap-2 sm:gap-3">
                                            {selectedReleaseData.streamingLinks.spotify && (
                                                <a
                                                    href={selectedReleaseData.streamingLinks.spotify}
                                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1DB954] hover:bg-[#1ed760] text-white text-sm sm:text-base font-medium rounded-full transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-lg sm:text-xl">play_circle</span>
                                                    Spotify
                                                </a>
                                            )}
                                            {selectedReleaseData.streamingLinks.appleMusic && (
                                                <a
                                                    href={selectedReleaseData.streamingLinks.appleMusic}
                                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FA243C] hover:bg-[#ff3b50] text-white text-sm sm:text-base font-medium rounded-full transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-lg sm:text-xl">music_note</span>
                                                    Apple Music
                                                </a>
                                            )}
                                            {selectedReleaseData.streamingLinks.bandcamp && (
                                                <a
                                                    href={selectedReleaseData.streamingLinks.bandcamp}
                                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#629aa9] hover:bg-[#73aab9] text-white text-sm sm:text-base font-medium rounded-full transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-lg sm:text-xl">album</span>
                                                    Bandcamp
                                                </a>
                                            )}
                                            {selectedReleaseData.streamingLinks.youtube && (
                                                <a
                                                    href={selectedReleaseData.streamingLinks.youtube}
                                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FF0000] hover:bg-[#ff1a1a] text-white text-sm sm:text-base font-medium rounded-full transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-lg sm:text-xl">smart_display</span>
                                                    YouTube
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Live Section (Merged) */}
            <section id="shows" className="py-20 bg-surface-light dark:bg-surface-dark border-y border-gray-200 dark:border-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section Header */}
                    <div className="flex flex-col items-center text-center mb-16">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Shows</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-text-main dark:text-white tracking-tight mb-6">
                            Live
                        </h2>
                        <div className="h-1 w-20 bg-primary rounded-full"></div>
                    </div>

                    {/* Upcoming Shows */}
                    <div className="mb-16">
                        <h3 className="text-xl font-bold text-text-main dark:text-white mb-6 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            Upcoming
                        </h3>

                        <div className="flex flex-col gap-4">
                            {upcomingShows.length > 0 ? (
                                upcomingShows.map((show) => (
                                    <div key={show.id} className="group bg-background-light dark:bg-background-dark p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-lg transition-shadow border border-transparent hover:border-primary/20">
                                        <div className="flex items-center gap-6 w-full sm:w-auto">
                                            {show.image && (
                                                <div className="hidden sm:block w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img src={show.image} alt={show.venue} className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <div className="text-center sm:text-left min-w-[80px]">
                                                <div className={`text-sm font-bold uppercase tracking-wider ${show.status === 'sold-out' ? 'text-gray-400' : 'text-primary'}`}>{show.date.month} {show.date.day}</div>
                                                <div className={`text-2xl font-black ${show.status === 'sold-out' ? 'text-gray-400 line-through decoration-primary' : 'text-text-main dark:text-white'}`}>{show.date.year}</div>
                                            </div>
                                            <div className="text-center sm:text-left">
                                                <h3 className="text-xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">{show.venue}</h3>
                                                <div className="flex items-center justify-center sm:justify-start gap-1 text-gray-500 dark:text-gray-400 mt-1">
                                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                                    <span className="text-sm font-medium">{show.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className={`w-full sm:w-auto px-6 py-2.5 font-bold rounded-lg transition-colors ${show.status === 'sold-out'
                                                ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 cursor-not-allowed'
                                                : 'bg-text-main dark:bg-white text-white dark:text-text-main hover:bg-primary dark:hover:bg-primary hover:text-text-main'
                                                }`}
                                            disabled={show.status === 'sold-out'}
                                        >
                                            {show.status === 'sold-out' ? 'Sold Out' : 'Tickets'}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-background-light dark:bg-background-dark rounded-xl p-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-800">
                                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                                        {getSchedulingText()}
                                    </p>
                                    <Link to="/for-venues" className="inline-block mt-4 text-primary font-bold hover:underline">
                                        Get in touch
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Delineator */}
                    <div className="flex items-center gap-4 mb-10 opacity-60">
                        <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>
                        <span className="material-symbols-outlined text-gray-400">history</span>
                        <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>
                    </div>

                    {/* Past Shows */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-400 mb-6 uppercase tracking-widest pl-2 border-l-4 border-gray-300 dark:border-gray-700">
                            Past Gigs
                        </h3>

                        <div className="flex flex-col gap-3">
                            {previousShows.map((show, index) => {
                                const displayImage = show.image || bandPhotos[index % bandPhotos.length];
                                const Content = () => (
                                    <>
                                        <div className="w-full sm:w-24 h-32 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                                            <img src={displayImage} alt={show.venue} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all" />
                                        </div>

                                        <div className="flex-1 text-center sm:text-left min-w-0 w-full">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                                                <h4 className="font-bold text-text-main dark:text-white truncate group-hover:text-primary transition-colors">{show.venue}</h4>
                                                <span className="hidden sm:inline text-gray-300">•</span>
                                                <span className="text-sm text-gray-500">{show.location}</span>
                                            </div>
                                            <div className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded w-fit mx-auto sm:mx-0">
                                                {show.date.month} {show.date.day}, {show.date.year}
                                            </div>
                                        </div>
                                        {show.link && (
                                            <div className="hidden sm:block text-gray-400 group-hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined">open_in_new</span>
                                            </div>
                                        )}
                                    </>
                                );

                                return show.link ? (
                                    <a
                                        key={show.id}
                                        href={show.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group bg-background-light/50 dark:bg-background-dark/50 p-4 rounded-lg flex flex-col sm:flex-row items-center gap-4 hover:bg-background-light dark:hover:bg-background-dark transition-colors border border-transparent hover:border-primary/20 cursor-pointer"
                                    >
                                        <Content />
                                    </a>
                                ) : (
                                    <div
                                        key={show.id}
                                        className="group bg-background-light/50 dark:bg-background-dark/50 p-4 rounded-lg flex flex-col sm:flex-row items-center gap-4 hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                                    >
                                        <Content />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </section>

            {/* Newsletter Footer */}
            <footer className="bg-text-main text-white pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
                        <div className="flex-1 max-w-md">
                            <h3 className="text-3xl font-bold mb-4">Stay in the loop</h3>
                            <p className="text-gray-400 mb-6">Join the mailing list for pre-sale access, new music alerts, and band updates.</p>
                            <form
                                className="flex gap-2 relative z-10"
                                action="https://formspree.io/f/xlgjyzln"
                                method="POST"
                            >
                                <input
                                    className="flex-1 bg-white/10 border-none rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="Your email address"
                                    type="email"
                                    name="email"
                                    required
                                />
                                <button className="bg-primary hover:bg-primary-dark text-text-main font-bold px-6 py-3 rounded-lg transition-colors" type="submit">
                                    Join
                                </button>
                            </form>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-lg text-primary">Connect</h4>
                            <div className="flex gap-4">
                                <a href="https://www.instagram.com/paperstrawtheband/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-text-main transition-all">
                                    <span className="material-symbols-outlined">photo_camera</span>
                                </a>
                                <a href="https://www.youtube.com/@paperstrawtheband" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-text-main transition-all">
                                    <span className="material-symbols-outlined">smart_display</span>
                                </a>

                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 pr-48">
                        <p>© 2026 Paper Straw. All rights reserved.</p>
                        <div className="flex gap-4">
                            <Link to="/for-venues" className="hover:text-white transition-colors">For Venues</Link>
                            <Link to="/stage-plots" className="hover:text-white transition-colors">Stage Plots</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;