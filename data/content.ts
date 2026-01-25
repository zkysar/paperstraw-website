import { Show } from '../types';

export interface Release {
    id: string;
    title: string;
    date: string;
    description: string;
    coverImage?: string;
    gradientColors?: string;
    streamingLinks: {
        spotify?: string;
        appleMusic?: string;
        bandcamp?: string;
        youtube?: string;
        deezer?: string;
    };
    audioUrl?: string;
}

export const releases: Release[] = [
    {
        id: 'untitled-ep',
        title: 'Untitled EP',
        date: 'Late 2026 (Anticipated)',
        description: 'Our upcoming EP is currently in the works. Stay tuned for more details.',
        gradientColors: 'from-pink-500/20 to-pink-500/5 dark:from-pink-500/30 dark:to-pink-500/10',
        streamingLinks: {},
    },
    {
        id: 'summer',
        title: 'Summer',
        date: 'March 2026 (Anticipated)',
        description: 'An upcoming single capturing the warmth and energy of California summers.',
        gradientColors: 'from-yellow-500/20 to-yellow-500/5 dark:from-yellow-500/30 dark:to-yellow-500/10',
        streamingLinks: {},
    },
    {
        id: 'lets-ride-bikes',
        title: "Let's Ride Bikes!",
        date: 'December 2025',
        description: 'A song about the simple joy of cycling through San Francisco. It\'s an upbeat track about freedom, friendship, and the feeling of being outside.',
        coverImage: '/cover-art.jpg',
        streamingLinks: {
            spotify: 'https://open.spotify.com/track/6uMAIVI0Ioz6qxeJlfO1hG?si=455a2a0e20834cca',
            appleMusic: 'https://music.apple.com/us/album/lets-ride-bikes-single/1863180341',
            bandcamp: '#',
            youtube: '#',
            deezer: 'https://www.deezer.com/album/881922682',
        },
        audioUrl: '/audio/bikes.mp3',
    },
    {
        id: 'father-christmas',
        title: 'Father Christmas',
        date: 'December 2024',
        description: 'A cover of the classic holiday song, recorded for the Christmas In The City Vol. 5 compilation on 11th Avenue Records.',
        coverImage: '/father-christmas.jpg',
        streamingLinks: {
            bandcamp: 'https://11thaverecords.bandcamp.com/track/father-christmas',
        },
    },
    {
        id: 'driftwood-live',
        title: 'Driftwood (Live)',
        date: 'April 2024',
        description: 'Recorded live at Art Boutiki.',
        coverImage: '/driftwood-live.jpg',
        streamingLinks: {
            youtube: 'https://www.youtube.com/watch?v=I9AtV-xuTGg',
        },
    },
    {
        id: 'across-the-sea-live',
        title: 'Across the Sea (Live)',
        date: 'April 2024',
        description: 'Recorded live at Art Boutiki.',
        coverImage: '/across-the-sea-live.jpg',
        streamingLinks: {
            youtube: 'https://www.youtube.com/watch?v=y4HvC7RuSgs',
        },
    },
    {
        id: 'proximity-single',
        title: 'Proximity',
        date: '2023',
        description: 'A solo release by Zach.',
        coverImage: '/proximity-cover.jpg',
        streamingLinks: {
            spotify: 'https://open.spotify.com/album/7MCvbk7wIGqZJ7Ot3DpgsH',
        },
    },
    {
        id: 'driftwood-acoustic',
        title: 'Driftwood (Acoustic)',
        date: '2023',
        description: 'An acoustic solo version of Driftwood by Zach.',
        coverImage: '/driftwood-acoustic-cover.jpg',
        streamingLinks: {
            spotify: 'https://open.spotify.com/album/0RchdKgFdPfqjfkw4hpGBI',
        },
    },

];

export const bandPhotos = [
    '/assets/press/band-photo-6.jpg',
    '/assets/press/band-photo-5.jpg',
    '/assets/press/band-photo-2.jpg',
    '/assets/press/band-photo-9.jpg',
    '/assets/press/band-photo-7.jpg',
    '/assets/press/band-photo-4.jpg',
    '/assets/press/band-photo-8.jpg',
    '/assets/press/band-photo-1.jpg',
    '/assets/press/band-photo-3.jpg',
];

export const upcomingShows: Show[] = [];

export const previousShows: Show[] = [
    {
        id: 'dec-19-2025',
        venue: "O'Reilly's Pub",
        location: 'San Francisco, CA',
        date: { month: 'DEC', day: '19', year: '2025' },
        status: 'available',
        image: '/assets/past-gigs/oreillys-dec-2025.jpg',
        link: 'https://partiful.com/e/XspLTvwr6cF9EKxjGCeU'
    },
    {
        id: 'nov-02-2025',
        venue: 'SOMArts (SF Bike Coalition Winterfest)',
        location: 'San Francisco, CA',
        date: { month: 'NOV', day: '02', year: '2025' },
        status: 'available',
        link: 'https://sfbike.org/winterfest/'
    },
    {
        id: 'may-23-2025',
        venue: "O'Reilly's Pub",
        location: 'San Francisco, CA',
        date: { month: 'MAY', day: '23', year: '2025' },
        status: 'available',
        link: 'https://www.instagram.com/p/DLOzO6Autt4/'
    },
    {
        id: 'jan-31-2025',
        venue: "O'Reilly's Pub",
        location: 'San Francisco, CA',
        date: { month: 'JAN', day: '31', year: '2025' },
        status: 'available',
        image: '/assets/past-gigs/oreillys-jan-2025.jpg',
        link: 'https://partiful.com/e/anaeSjBn07zW5Kvf0Klr'
    },
    {
        id: 'dec-16-2024',
        venue: 'Kilowatt',
        location: 'San Francisco, CA',
        date: { month: 'DEC', day: '16', year: '2024' },
        status: 'available',
        image: '/assets/past-gigs/kilowatt-dec-2024.jpg',
        link: 'https://partiful.com/e/pYdnOoNFUCUGuCDzkgJi'
    },
    {
        id: 'jun-30-2024',
        venue: "Mama Kin's",
        location: 'San Jose, CA',
        date: { month: 'JUN', day: '30', year: '2024' },
        status: 'available',
        link: 'https://www.instagram.com/p/C7rWhlgRmF6/'
    },
    {
        id: 'mar-30-2024',
        venue: 'Art Boutiki',
        location: 'San Jose, CA',
        date: { month: 'MAR', day: '30', year: '2024' },
        status: 'available',
        link: 'https://www.instagram.com/p/C47NvqzOvyk/'
    }
];
