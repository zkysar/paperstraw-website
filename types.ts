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
    /** Label for the link button on upcoming-show cards. Defaults to 'RSVP'. */
    linkLabel?: string;
    /** When true, the show is kept as a record but never shown in public upcoming/previous lists. */
    unlisted?: boolean;
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