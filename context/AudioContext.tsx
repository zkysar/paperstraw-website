import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

export interface Track {
    title: string;
    artist: string;
    audioUrl: string;
    coverImage?: string;
}

interface AudioContextType {
    currentTrack: Track | null;
    isPlaying: boolean;
    isMuted: boolean;
    playTrack: (track: Track) => void;
    togglePlay: () => void;
    toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const playTrack = (track: Track) => {
        if (currentTrack?.audioUrl === track.audioUrl) {
            togglePlay();
        } else {
            setCurrentTrack(track);
            setIsPlaying(true);
        }
    };

    const togglePlay = () => {
        setIsPlaying(prev => !prev);
    };

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    return (
        <AudioContext.Provider value={{ currentTrack, isPlaying, isMuted, playTrack, togglePlay, toggleMute }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
