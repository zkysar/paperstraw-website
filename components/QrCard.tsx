import React, { useRef } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { QrCode, shortUrl } from '../data/qrCodes';

// High-contrast black-on-white regardless of theme so the codes always scan.
const FG = '#000000';
const BG = '#ffffff';
const QUIET_ZONE = 4; // modules of white border (standard quiet zone)

const triggerDownload = (href: string, filename: string) => {
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
};

const QrCard: React.FC<{ code: QrCode }> = ({ code }) => {
    const url = shortUrl(code.slug);
    const svgWrapRef = useRef<HTMLDivElement>(null);
    const canvasWrapRef = useRef<HTMLDivElement>(null);

    const downloadPng = () => {
        const canvas = canvasWrapRef.current?.querySelector('canvas');
        if (!canvas) return;
        triggerDownload(canvas.toDataURL('image/png'), `paperstraw-qr-${code.slug}.png`);
    };

    const downloadSvg = () => {
        const svg = svgWrapRef.current?.querySelector('svg');
        if (!svg) return;
        const source = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
        const objectUrl = URL.createObjectURL(blob);
        triggerDownload(objectUrl, `paperstraw-qr-${code.slug}.svg`);
        URL.revokeObjectURL(objectUrl);
    };

    return (
        <div className="flex flex-col gap-5 p-6 bg-surface-light dark:bg-surface-dark rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
            <div className="self-center rounded-xl bg-white p-4 border border-black/5">
                <div ref={svgWrapRef}>
                    <QRCodeSVG value={url} size={200} level="M" marginSize={QUIET_ZONE} fgColor={FG} bgColor={BG} />
                </div>
                {/* Hidden hi-res canvas used only as the PNG export source. */}
                <div ref={canvasWrapRef} className="hidden">
                    <QRCodeCanvas value={url} size={1024} level="M" marginSize={QUIET_ZONE} fgColor={FG} bgColor={BG} />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-text-main dark:text-white">{code.label}</h2>
                <p className="text-sm text-text-muted dark:text-gray-400 leading-relaxed">{code.blurb}</p>
            </div>

            <div className="flex flex-col gap-3 text-sm">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Link</span>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="font-mono text-primary hover:underline break-all">{url}</a>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Points to</span>
                    <a href={code.destination} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-text-main/80 dark:text-gray-300 hover:text-primary transition-colors break-all">
                        {code.destination}
                        <span className="material-symbols-outlined text-base flex-shrink-0">open_in_new</span>
                    </a>
                </div>
            </div>

            <div className="flex gap-3 pt-1">
                <button onClick={downloadPng} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-primary text-text-main text-xs font-bold rounded-lg hover:bg-primary-dark transition-all hover:-translate-y-0.5">
                    PNG <span className="material-symbols-outlined text-base">download</span>
                </button>
                <button onClick={downloadSvg} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-background-light dark:bg-background-dark border border-black/10 dark:border-white/10 text-text-main dark:text-white text-xs font-bold rounded-lg hover:border-primary/40 transition-all hover:-translate-y-0.5">
                    SVG <span className="material-symbols-outlined text-base">download</span>
                </button>
            </div>
        </div>
    );
};

export default QrCard;
