import React, { useRef, useEffect, useState } from 'react';
import { useAudio } from '../context/AudioContext';

const AudioPlayer: React.FC = () => {
    const { currentTrack, isPlaying, isMuted, togglePlay, toggleMute, playTrack } = useAudio();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                // Determine if we can auto-play (browsers often block unmuted autoplay, but we start muted)
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Autoplay prevented:", error);
                        // If autoplay is prevented and we wanted to play, we might need to update state
                        // But since we start muted, it should work in most cases.
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrack]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            if (duration > 0) {
                setProgress((current / duration) * 100);
            }
        }
    };

    const handleEnded = () => {
        // Optional: clear track or stop playing
        // togglePlay(); // sets isPlaying to false
    };

    if (!currentTrack) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-surface-light dark:border-surface-dark shadow-lg transition-transform duration-300 translate-y-0 pb-[env(safe-area-inset-bottom)]">
            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 cursor-pointer" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = x / rect.width;
                if (audioRef.current) {
                    audioRef.current.currentTime = percent * audioRef.current.duration;
                }
            }}>
                <div
                    className="h-full bg-primary transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">

                {/* Track Info */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    {currentTrack.coverImage ? (
                        <img src={currentTrack.coverImage} alt={currentTrack.title} className="w-10 h-10 rounded-md object-cover shadow-sm flex-shrink-0" />
                    ) : (
                        <div className="w-10 h-10 rounded-md bg-surface-light dark:bg-surface-dark flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-gray-400 text-xl">music_note</span>
                        </div>
                    )}
                    <div className="flex flex-col min-w-0">
                        <span className="font-bold text-sm text-text-main dark:text-white truncate block">{currentTrack.title}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate block">{currentTrack.artist}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-text-main hover:bg-primary-dark transition-colors touch-manipulation"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {isPlaying ? 'pause' : 'play_arrow'}
                        </span>
                    </button>

                    <button
                        onClick={toggleMute}
                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-light dark:hover:bg-surface-dark transition-colors touch-manipulation text-gray-600 dark:text-gray-300"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        <span className="material-symbols-outlined text-xl">
                            {isMuted ? 'volume_off' : 'volume_up'}
                        </span>
                    </button>

                    {/* Close / Stop (Optional, maybe just clear track?) */}
                    {/* For now, just minimal controls */}
                </div>
            </div>

            <audio
                ref={audioRef}
                src={currentTrack.audioUrl}
                autoPlay={isPlaying}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                loop={false}
            />
        </div>
    );
};

export default AudioPlayer;
