export interface Show {
    id: string;
    date: {
        month: string;
        day: string;
        year: string;
    };
    venue: string;
    location: string;
    status: 'available' | 'sold-out';
    image?: string;
    link?: string;
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

export interface PressPhoto {
    id: string;
    url: string;
    alt: string;
    description: string;
}