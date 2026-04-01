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
        id: 'lets-ride-bikes',
        title: "Let's Ride Bikes!",
        date: 'December 2025',
        description: 'A song about the simple joy of cycling through San Francisco. It\'s an upbeat track about freedom, friendship, and the feeling of being outside.',
        coverImage: '/cover-art.jpg',
        streamingLinks: {
            spotify: 'https://open.spotify.com/track/6uMAIVI0Ioz6qxeJlfO1hG?si=455a2a0e20834cca',
            appleMusic: 'https://music.apple.com/us/album/lets-ride-bikes-single/1863180341',
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

export const faceCoordinates: Record<string, { x: number, y: number }[]> = {
    "/assets/press/band-photo-6.jpg": [
        { "x": 59.74, "y": 50.87 },
        { "x": 82.49, "y": 56.66 },
        { "x": 21.55, "y": 46.53 }
    ],
    "/assets/press/band-photo-5.jpg": [
        { "x": 23.48, "y": 49.63 },
        { "x": 60.16, "y": 52.11 },
        { "x": 75.74, "y": 19.65 },
        { "x": 50.64, "y": 32.68 }
    ],
    "/assets/press/band-photo-2.jpg": [
        { "x": 80.56, "y": 55.22 },
        { "x": 50.64, "y": 32.47 },
        { "x": 89.11, "y": 14.89 }
    ],
    "/assets/press/band-photo-9.jpg": [
        { "x": 40.58, "y": 52.53 },
        { "x": 60.57, "y": 50.67 },
        { "x": 90.21, "y": 14.68 }
    ],
    "/assets/press/band-photo-7.jpg": [
        { "x": 39.34, "y": 50.87 },
        { "x": 82.63, "y": 56.04 }
    ],
    "/assets/press/band-photo-4.jpg": [
        { "x": 89.8, "y": 15.1 },
        { "x": 41.82, "y": 51.7 },
        { "x": 19.9, "y": 46.32 }
    ],
    "/assets/press/band-photo-8.jpg": [
        { "x": 83.46, "y": 56.87 },
        { "x": 59.47, "y": 51.7 },
        { "x": 90.35, "y": 15.1 }
    ],
    "/assets/press/band-photo-1.jpg": [
        { "x": 23.48, "y": 45.5 },
        { "x": 64.71, "y": 50.87 },
        { "x": 80.15, "y": 55.63 },
        { "x": 84.42, "y": 16.34 },
        { "x": 51.33, "y": 33.71 },
        { "x": 41.68, "y": 51.29 }
    ]
};

const MONTH_MAP: Record<string, number> = {
    JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
    JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
};

function showDate(show: Show): Date {
    return new Date(
        parseInt(show.date.year),
        MONTH_MAP[show.date.month] ?? 0,
        parseInt(show.date.day) + 1, // count the show as "upcoming" through the end of its day
    );
}

const allShows: Show[] = [
    {
        id: 'apr-08-2026',
        venue: 'Bottom of the Hill',
        location: 'San Francisco, CA',
        date: { month: 'APR', day: '08', year: '2026' },
        status: 'available',
        image: '/assets/past-gigs/bottom-of-the-hill-apr-2026.png',
        link: 'https://partiful.com/e/PCh2CgogZPqsdgEKmgDv'
    },
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
        image: '/assets/past-gigs/oreillys-may-2025.jpg',
        link: 'https://partiful.com/e/aWPUcnwTFtTnWwU5eb1X'
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

const now = new Date();
export const upcomingShows: Show[] = allShows
    .filter(s => showDate(s) > now)
    .sort((a, b) => showDate(a).getTime() - showDate(b).getTime());
export const previousShows: Show[] = allShows
    .filter(s => showDate(s) <= now)
    .sort((a, b) => showDate(b).getTime() - showDate(a).getTime());
