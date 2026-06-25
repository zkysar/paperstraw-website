import type { Instrument } from '../components/InstrumentIcon';

export interface StageMember {
    name: string;
    role: string;
    /** Primary instrument, drives which icon renders on the diagram. */
    instrument: Instrument;
    equipment: string[];
    outputs: string;
    /** How the instrument's output reaches the board: one DI (mono), two DIs / L+R (stereo), or mic'd by house (mics). Drives the cable count + output badge. Defaults to 'mono'. */
    channels?: 'mono' | 'stereo' | 'mics';
    /** True when this person also sings into a vocal mic (in addition to their instrument). Shows a mic indicator on the diagram. */
    vocals?: boolean;
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
        slug: 'bottom-of-the-hill-2026-04-08',
        venue: 'Bottom of the Hill',
        location: 'San Francisco, CA',
        date: '2026-04-08',
        members: [
            {
                name: 'Zach',
                role: 'Lead Vocals / Acoustic Guitar',
                instrument: 'acoustic',
                equipment: ['Acoustic Guitar (pickup)'],
                outputs: '1x 1/4" out → DI',
                channels: 'mono',
                vocals: true,
                x: 50,
                y: 20,
            },
            {
                name: 'Matt',
                role: 'Keys / Backup Vocals',
                instrument: 'keys',
                equipment: ['Nord Stage 61-key', 'Controller keyboard (stacked, MIDI only)'],
                outputs: '1x 1/4" out → DI (Nord only)',
                channels: 'mono',
                vocals: true,
                x: 82,
                y: 45,
            },
            {
                name: 'Wei',
                role: 'Bass',
                instrument: 'bass',
                equipment: ['Bass Guitar', 'Multi-effects pedal'],
                outputs: '1x 1/4" out → DI',
                channels: 'mono',
                x: 12,
                y: 55,
            },
            {
                name: 'Kyle',
                role: 'Guitar / Backup Vocals',
                instrument: 'electric',
                equipment: ['Electric Guitar', 'Multi-effects pedal'],
                outputs: '1x 1/4" out → DI',
                channels: 'mono',
                vocals: true,
                x: 25,
                y: 45,
            },
            {
                name: 'Adit',
                role: 'Drums',
                instrument: 'drums',
                equipment: ['Hollow Mind\'s kit', 'Own cymbals', 'Own snare'],
                outputs: 'Mic\'d by house',
                channels: 'mics',
                x: 55,
                y: 75,
            },
        ],
    },
    {
        slug: 'rickshaw-stop-2026-07-02',
        venue: 'Rickshaw Stop',
        location: 'San Francisco, CA',
        date: '2026-07-02',
        members: [
            {
                name: 'Zach',
                role: 'Lead Vocals / Acoustic Guitar',
                instrument: 'acoustic',
                equipment: ['Acoustic Guitar (pickup)'],
                outputs: '1x 1/4" out → DI',
                channels: 'mono',
                vocals: true,
                x: 50,
                y: 20,
            },
            {
                name: 'Matt',
                role: 'Keys / Backup Vocals',
                instrument: 'keys',
                equipment: ['Nord Stage 61-key', 'Controller keyboard (stacked, MIDI only)'],
                outputs: '1x 1/4" out → DI (Nord only)',
                channels: 'mono',
                vocals: true,
                x: 82,
                y: 45,
            },
            {
                name: 'Wei',
                role: 'Bass',
                instrument: 'bass',
                equipment: ['Bass Guitar', 'Multi-effects pedal'],
                outputs: '1x 1/4" out → DI',
                channels: 'mono',
                vocals: true,
                x: 12,
                y: 55,
            },
            {
                name: 'Kyle',
                role: 'Guitar / Backup Vocals',
                instrument: 'electric',
                equipment: ['Electric Guitar', 'Multi-effects pedal'],
                outputs: '1x 1/4" out → DI',
                channels: 'mono',
                vocals: true,
                x: 25,
                y: 45,
            },
            {
                name: 'Evan',
                role: 'Drums',
                instrument: 'drums',
                equipment: ['Kit: TBD', 'Own cymbals', 'Own snare'],
                outputs: 'Mic\'d by house',
                channels: 'mics',
                vocals: true,
                x: 55,
                y: 75,
            },
        ],
    },
    {
        slug: 'kzsu-wnl-2026-07-29',
        venue: 'KZSU Wednesday Night Live',
        location: 'Stanford, CA',
        date: '2026-07-29',
        soundCheckTime: '7:00 PM PST',
        showTime: '9:00–10:00 PM PST',
        members: [
            {
                name: 'Zach',
                role: 'Lead Vocals / Acoustic Guitar',
                instrument: 'acoustic',
                equipment: ['Acoustic Guitar (pickup)'],
                outputs: '1x 1/4" out → DI',
                channels: 'mono',
                vocals: true,
                x: 50,
                y: 20,
            },
            {
                name: 'Matt',
                role: 'Keys / Backup Vocals',
                instrument: 'keys',
                equipment: ['Nord Stage 61-key', 'Controller keyboard (stacked, MIDI only)'],
                outputs: '1x 1/4" out → DI (Nord only)',
                channels: 'mono',
                vocals: true,
                x: 82,
                y: 45,
            },
            {
                name: 'Wei',
                role: 'Bass',
                instrument: 'bass',
                equipment: ['Bass Guitar', 'Multi-effects pedal'],
                outputs: '1x 1/4" out → DI',
                channels: 'mono',
                vocals: true,
                x: 12,
                y: 55,
            },
            {
                name: 'Kyle',
                role: 'Guitar / Backup Vocals',
                instrument: 'electric',
                equipment: ['Electric Guitar', 'Multi-effects pedal'],
                outputs: '1x 1/4" out → DI',
                channels: 'mono',
                vocals: true,
                x: 25,
                y: 45,
            },
            {
                name: 'Evan',
                role: 'Drums',
                instrument: 'drums',
                equipment: ['Own full kit (no house backline)'],
                outputs: 'Mic\'d by house',
                channels: 'mics',
                vocals: true,
                x: 55,
                y: 75,
            },
        ],
    },
];
