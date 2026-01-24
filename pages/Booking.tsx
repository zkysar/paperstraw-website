import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { PressPhoto } from '../types';

const pressPhotos: PressPhoto[] = [
    {
        id: '1',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf3NUd92P3l5hM22KrbqXwpG50Ity98cNQC7oYkBqa10itJhMtK9RODU5YPEnxQMDq_kaLCtrLmd39cakYCPNYKINVB3QAG7GZAnVii4HU088IQeaB7lXaVgKD0PAtQXmwvk3rLqCpbL6L_4fPVkVwgG4TO5O4pZUwBgs55fEC0bjfbZ9PsbR9PRPOyQBNZjprYjxgdqoqsXNcCsGz_xT7lIGH1ipBUSBoSZZZCRw5UfsPxbOm3K-qWIk6LHh4ocDYiAr_Qa9DcZs',
        alt: 'Band standing on a beach during golden hour',
        description: 'Golden Hour Beach Shot'
    },
    {
        id: '2',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDckEhIlb60JcFnRMIFmcB1SZDM7mHsWYjkzlvUYKf491f9lXSCPrZyzTuGDJ_rwL34THTmfMrIKQPjvkcRIpMz5MAHs9P_rz4EiYccbuXnFV5a5wohPdlNwFsMXN1nc0PKFOSm5kvJqQ3rEcTgx-s9EHp5wGcYMM9gLNeo76XOXn6s3wSP4RTqkEwzWXxHcN_Z32Yo_zThNYNUpM0LZ0-6YqG-b4sqGkMQrS71h8oKSO22l5KxF1SWCHG0OdOKJIwd1x5ygwzYMDs',
        alt: 'Live performance shot with warm stage lighting',
        description: 'Live Performance'
    },
    {
        id: '3',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuButieQ32eZWdzPhAgj3ku8it7ekWovoDZ0BCHGoqypXDXQIgcQ6PD5ZN7BhfTno8agUxVB2Bw7Rmt4C00m9iCsTj7tqZ5lw01FHTU8BQ6NxLO7uVTb3LDD4H-DFw1MoBFnuNpd7TA1vuLy4TvJH2d-SF7ZfKCiy5ZzKOAY0u24bfb7CSYdGVH-_s4gV1o35syFMC6HjmM8SLQTIqGJIHDG_bkpnb0O7AI__VmAPqrUtX5ixZ9o-UTCDEj_hSF9_3RKehv-vaoGaZo',
        alt: 'Band members sitting in a studio with instruments',
        description: 'Studio Portrait'
    }
];

const Booking: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const email = "booking@paperstrawband.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
            <Navbar variant="booking" />

            <main className="flex-1 w-full max-w-[960px] mx-auto px-4 py-8 lg:px-0 flex flex-col gap-10 mt-16">
                
                {/* Hero: Booking & Inquiries */}
                <section className="flex flex-col gap-2 pt-8">
                    <div className="flex flex-col gap-3 px-4">
                        <p className="text-4xl lg:text-5xl font-black leading-tight tracking-tight text-text-main dark:text-white">
                            Booking & Inquiries
                        </p>
                        <p className="text-text-muted dark:text-gray-400 text-lg">
                            For booking inquiries, availability, and hold requests, please contact us directly.
                        </p>
                    </div>

                    {/* Headline Email */}
                    <div className="px-4 py-6">
                        <div className="relative group w-fit">
                            <h1 
                                onClick={handleCopy}
                                className="text-text-main dark:text-primary text-[28px] md:text-[40px] font-bold leading-tight tracking-tight break-all decoration-primary/30 hover:underline cursor-pointer transition-all"
                            >
                                {email}
                            </h1>
                            <div className={`absolute -right-4 top-1/2 -translate-y-1/2 transition-opacity bg-text-main text-white text-xs px-2 py-1 rounded ${copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                {copied ? 'Copied!' : 'Copy'}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tech Rider Action Panel */}
                <section className="px-4">
                    <div className="@container">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-xl border border-[#e7e1d0] dark:border-[#3a3525] bg-white dark:bg-[#2a2518] p-6 shadow-sm">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">description</span>
                                    <p className="text-lg font-bold leading-tight text-text-main dark:text-white">Tech Rider & Stage Plot</p>
                                </div>
                                <p className="text-text-muted dark:text-gray-400 text-base">Detailed technical requirements, input list, and hospitality rider (PDF).</p>
                            </div>
                            <a href="#" className="group flex items-center justify-center gap-2 rounded-lg bg-background-light dark:bg-background-dark border border-[#e7e1d0] dark:border-[#4a4535] px-5 py-3 text-sm font-bold text-text-main dark:text-white transition-all hover:border-primary hover:text-primary">
                                Download PDF
                                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </section>

                <div className="w-full h-px bg-[#f3f0e7] dark:bg-[#3a3525] mx-4"></div>

                {/* Bio Section */}
                <section className="flex flex-col gap-4 px-4">
                    <h2 className="text-2xl font-bold tracking-tight text-text-main dark:text-white">About the Band</h2>
                    <div className="prose prose-stone dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed text-text-main/80 dark:text-gray-300">
                            Paper Straw is a San Francisco-based indie rock outfit known for their sun-drenched melodies and introspective lyricism. Formed in 2018, the band blends the nostalgic warmth of 70s folk-rock with modern shoegaze textures, creating a sound that feels both familiar and refreshingly new.
                        </p>
                        <p className="text-lg leading-relaxed text-text-main/80 dark:text-gray-300 mt-4">
                            With a reputation for tight, high-energy live performances, Paper Straw has become a staple in the Bay Area music scene, selling out venues like The Chapel and Bottom of the Hill. Their latest EP, "Golden Hour," has garnered critical acclaim for its polished production and raw emotional delivery.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-8 mt-4">
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider font-bold text-text-muted">Genre</span>
                            <span className="font-medium dark:text-gray-200">Indie Rock / Dream Pop</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider font-bold text-text-muted">Location</span>
                            <span className="font-medium dark:text-gray-200">San Francisco, CA</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase tracking-wider font-bold text-text-muted">Direct Support</span>
                            <span className="font-medium dark:text-gray-200">Available</span>
                        </div>
                    </div>
                </section>

                <div className="w-full h-px bg-[#f3f0e7] dark:bg-[#3a3525] mx-4"></div>

                {/* Press Photos Grid */}
                <section className="flex flex-col gap-6 px-4 pb-12">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h2 className="text-2xl font-bold tracking-tight text-text-main dark:text-white">Press Photos</h2>
                        <a href="#" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                            Download All Assets (.zip)
                            <span className="material-symbols-outlined text-sm">download</span>
                        </a>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pressPhotos.map((photo, index) => (
                            <div key={photo.id} className={`group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                                <img 
                                    src={photo.url} 
                                    alt={photo.alt} 
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"></div>
                                <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <button className="flex w-full items-center justify-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-text-main shadow-lg backdrop-blur-sm hover:bg-primary hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-lg">download</span>
                                        Download Hi-Res
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Simple Footer */}
            <footer className="mt-auto border-t border-[#f3f0e7] dark:border-[#3a3525] bg-background-light dark:bg-background-dark py-12">
                <div className="flex flex-col items-center justify-center gap-6">
                    <div className="flex gap-6 text-text-main dark:text-white">
                        <a href="#" className="hover:text-primary transition-colors p-2">
                             {/* Instagram SVG */}
                             <svg aria-hidden="true" className="size-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468.99c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fillRule="evenodd"></path></svg>
                        </a>
                        <a href="#" className="hover:text-primary transition-colors p-2">
                            {/* Spotify SVG */}
                            <svg aria-hidden="true" className="size-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"></path></svg>
                        </a>
                        <a href="#" className="hover:text-primary transition-colors p-2">
                            {/* YouTube SVG */}
                            <svg aria-hidden="true" className="size-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.254.418-4.813a2.503 2.503 0 0 1 1.768-1.768C5.745 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" fillRule="evenodd"></path></svg>
                        </a>
                    </div>
                    <p className="text-sm text-text-muted dark:text-gray-500">© 2024 Paper Straw. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Booking;