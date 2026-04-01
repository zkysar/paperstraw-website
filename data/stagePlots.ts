export interface StageMember {
    name: string;
    role: string;
    equipment: string[];
    outputs: string;
    /** x: 0 (stage left) to 100 (stage right), y: 0 (front/audience) to 100 (back) */
    x: number;
    y: number;
}

export interface StagePlot {
    slug: string;
    venue: string;
    location: string;
    date: string;
    showTime?: string;
    soundCheckTime?: string;
    members: StageMember[];
}

export const stagePlots: StagePlot[] = [
    {
        slug: 'bottom-of-the-hill-2026-04-01',
        venue: 'Bottom of the Hill',
        location: 'San Francisco, CA',
        date: '2026-04-01',
        members: [
            {
                name: 'Zach',
                role: 'Lead Vocals / Acoustic Guitar',
                equipment: ['Acoustic Guitar (pickup)'],
                outputs: '1x 1/4" out → DI',
                x: 50,
                y: 20,
            },
            {
                name: 'Matt',
                role: 'Keys / Backup Vocals',
                equipment: ['Nord Stage 61-key', 'Controller keyboard (stacked, MIDI only)'],
                outputs: '1x 1/4" out → DI (Nord only)',
                x: 82,
                y: 45,
            },
            {
                name: 'Wei',
                role: 'Bass',
                equipment: ['Bass Guitar', 'Multi-effects pedal'],
                outputs: '1x 1/4" out → DI',
                x: 12,
                y: 55,
            },
            {
                name: 'Kyle',
                role: 'Guitar / Backup Vocals',
                equipment: ['Electric Guitar', 'Multi-effects pedal'],
                outputs: '1x 1/4" out → DI',
                x: 25,
                y: 45,
            },
            {
                name: 'Adit',
                role: 'Drums',
                equipment: ['Hollow Mind\'s kit', 'Own cymbals', 'Own snare'],
                outputs: 'Mic\'d by house',
                x: 55,
                y: 75,
            },
        ],
    },
];
