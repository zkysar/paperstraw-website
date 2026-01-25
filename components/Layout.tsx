import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';
import AudioPlayer from './AudioPlayer';
import { useAudio } from '../context/AudioContext';
import { releases } from '../data/content';

interface LayoutProps {
    children: ReactNode;
    variant?: 'home' | 'for-venues'; // Pass to Navbar
}

const Layout: React.FC<LayoutProps> = ({ children, variant = 'home' }) => {
    // We can access audio context here if we need to adjust padding based on player visibility
    const { currentTrack, playTrack } = useAudio();

    // Logic for latest release FAB
    const latestRelease = releases.find(r => r.id === 'lets-ride-bikes');

    const handlePlayLatest = () => {
        if (latestRelease && latestRelease.audioUrl) {
            playTrack({
                title: latestRelease.title,
                artist: 'Paper Straw',
                audioUrl: latestRelease.audioUrl,
                coverImage: latestRelease.coverImage
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <Navbar variant={variant} />
            <main className="flex-1">
                {children}
            </main>
            {/* 
                Add padding at the bottom equal to player height if player is visible 
                Player height approx (progress 4px + padding 24px + content 40px) ~ 70-80px + safe area
                We can add a spacer div or padding to body.
            */}
            {currentTrack && <div className="h-24 md:h-20 w-full flex-shrink-0" />}

            {/* Persisting Floating Play Button */}
            {!currentTrack && latestRelease && latestRelease.audioUrl && (
                <div className="fixed bottom-6 right-6 z-40 animate-fade-in-up">
                    <button
                        onClick={handlePlayLatest}
                        className="group flex items-center justify-center w-14 h-14 md:w-auto md:h-auto md:px-6 md:py-3 bg-primary text-text-main rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                        <span className="material-symbols-outlined text-3xl md:mr-2">play_arrow</span>
                        <span className="hidden md:inline font-bold whitespace-nowrap">
                            Latest Single
                        </span>
                    </button>
                </div>
            )}

            <AudioPlayer />
        </div>
    );
};

export default Layout;
