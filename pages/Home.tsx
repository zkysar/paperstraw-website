import React from 'react';
import Navbar from '../components/Navbar';
import { Show } from '../types';

const upcomingShows: Show[] = [
    {
        id: '1',
        date: { month: 'OCT 14', day: '14', year: '2023' },
        venue: 'The Chapel',
        location: 'San Francisco, CA',
        status: 'available'
    },
    {
        id: '2',
        date: { month: 'NOV 02', day: '02', year: '2023' },
        venue: 'Rickshaw Stop',
        location: 'San Francisco, CA',
        status: 'sold-out'
    },
    {
        id: '3',
        date: { month: 'NOV 18', day: '18', year: '2023' },
        venue: 'The Independent',
        location: 'San Francisco, CA',
        status: 'available'
    }
];

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <Navbar variant="home" />
            
            {/* Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background-light dark:to-background-dark z-10"></div>
                    <div 
                        className="w-full h-full bg-cover bg-center bg-no-repeat transform scale-105 animate-[zoom_20s_infinite_alternate]" 
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwFdl9MQTQ3Wf5gsWf2jXomGb4xZokT4vqkFcMn1_YTsOE_NWp4v9qfCCYoDyyfocEWJ2IRsSfilNB2IKcT3XM5EvMhx_3oNCxukpUhGrxoP-dG3523aoe7onydi1xAST8sOaioIdXePtJkH8_YW-LVu262_MsGllGS_GhW1TK9Pn9ss6wqgKIrsb3yOYmyymq7EG1HaqFNvvgTh8mhh_jfpjjbCLJ5dfbN_O10xDSbsf5Vs14BHFc3G1BG6fQ_REtjR2R_Yu2FqI')" }}
                    ></div>
                </div>

                <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-16 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-none mb-4 drop-shadow-lg">
                        PAPER STRAW
                    </h1>
                    <p className="text-lg md:text-2xl text-white/90 font-medium max-w-xl mx-auto mb-10 drop-shadow-md">
                        Indie Rock from the foggy hills of SF.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <button className="w-full sm:w-auto min-w-[160px] h-14 bg-primary hover:bg-primary-dark text-text-main text-lg font-bold rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[24px]">play_circle</span>
                            Listen Now
                        </button>
                        <a href="#venues" className="w-full sm:w-auto min-w-[160px] h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white text-white text-lg font-bold rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2 group">
                            Venues
                            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 text-[20px]">arrow_forward</span>
                        </a>
                    </div>
                </div>

                <div className="absolute bottom-10 z-20 animate-bounce">
                    <span className="material-symbols-outlined text-white/80 text-4xl">keyboard_arrow_down</span>
                </div>
            </section>

            {/* Music Section */}
            <section id="music" className="py-20 md:py-32 bg-background-light dark:bg-background-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center mb-12">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2">New Release</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-text-main dark:text-white tracking-tight mb-6">
                            Stream the new EP
                        </h2>
                        <div className="h-1 w-20 bg-primary rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {/* Spotify */}
                        <a href="#" className="group flex flex-col items-center p-8 bg-surface-light dark:bg-surface-dark rounded-2xl transition-all hover:shadow-xl hover:-translate-y-1">
                            <div className="size-16 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center mb-4 group-hover:bg-[#1DB954] transition-colors">
                                <span className="material-symbols-outlined text-4xl text-text-main dark:text-white group-hover:text-white">play_circle</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main dark:text-white mb-1">Spotify</h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">Listen now →</span>
                        </a>

                        {/* Apple Music */}
                        <a href="#" className="group flex flex-col items-center p-8 bg-surface-light dark:bg-surface-dark rounded-2xl transition-all hover:shadow-xl hover:-translate-y-1">
                            <div className="size-16 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center mb-4 group-hover:bg-[#FA243C] transition-colors">
                                <span className="material-symbols-outlined text-4xl text-text-main dark:text-white group-hover:text-white">music_note</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main dark:text-white mb-1">Apple Music</h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">Listen now →</span>
                        </a>

                        {/* Bandcamp */}
                        <a href="#" className="group flex flex-col items-center p-8 bg-surface-light dark:bg-surface-dark rounded-2xl transition-all hover:shadow-xl hover:-translate-y-1">
                            <div className="size-16 rounded-full bg-background-light dark:bg-background-dark flex items-center justify-center mb-4 group-hover:bg-[#629aa9] transition-colors">
                                <span className="material-symbols-outlined text-4xl text-text-main dark:text-white group-hover:text-white">album</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main dark:text-white mb-1">Bandcamp</h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">Buy Album →</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Venues Section */}
            <section id="venues" className="py-20 bg-surface-light dark:bg-surface-dark border-y border-gray-200 dark:border-gray-800">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-sm">Tour Dates</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-text-main dark:text-white tracking-tight mt-2">
                                Upcoming Shows
                            </h2>
                        </div>
                        <button className="text-sm font-bold text-text-main dark:text-white border-b-2 border-primary hover:text-primary transition-colors pb-1">
                            View Archive
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        {upcomingShows.map((show) => (
                            <div key={show.id} className="group bg-background-light dark:bg-background-dark p-6 md:p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition-shadow border border-transparent hover:border-primary/20">
                                <div className="flex flex-col md:flex-row items-center md:gap-8 w-full md:w-auto">
                                    <div className="text-center md:text-left min-w-[80px]">
                                        <div className={`text-sm font-bold uppercase tracking-wider ${show.status === 'sold-out' ? 'text-gray-400' : 'text-primary'}`}>{show.date.month}</div>
                                        <div className={`text-2xl font-black ${show.status === 'sold-out' ? 'text-gray-400 line-through decoration-primary' : 'text-text-main dark:text-white'}`}>{show.date.year}</div>
                                    </div>
                                    <div className={`text-center md:text-left mt-4 md:mt-0 ${show.status === 'sold-out' ? 'opacity-60' : ''}`}>
                                        <h3 className="text-xl md:text-2xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">{show.venue}</h3>
                                        <div className="flex items-center justify-center md:justify-start gap-1 text-gray-500 dark:text-gray-400 mt-1">
                                            <span className="material-symbols-outlined text-sm">location_on</span>
                                            <span className="text-sm font-medium">{show.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    className={`w-full md:w-auto px-8 py-3 font-bold rounded-lg transition-colors ${
                                        show.status === 'sold-out' 
                                            ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 cursor-not-allowed' 
                                            : 'bg-text-main dark:bg-white text-white dark:text-text-main hover:bg-primary dark:hover:bg-primary hover:text-text-main'
                                    }`}
                                    disabled={show.status === 'sold-out'}
                                >
                                    {show.status === 'sold-out' ? 'Sold Out' : 'Get Tickets'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Footer */}
            <footer className="bg-text-main text-white pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
                        <div className="flex-1 max-w-md">
                            <h3 className="text-3xl font-bold mb-4">Stay in the loop</h3>
                            <p className="text-gray-400 mb-6">Join the mailing list for pre-sale access, new music alerts, and tales from the road.</p>
                            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                                <input 
                                    className="flex-1 bg-white/10 border-none rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary outline-none" 
                                    placeholder="Your email address" 
                                    type="email" 
                                />
                                <button className="bg-primary hover:bg-primary-dark text-text-main font-bold px-6 py-3 rounded-lg transition-colors" type="submit">
                                    Join
                                </button>
                            </form>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-lg text-primary">Connect</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-text-main transition-all">
                                    <span className="material-symbols-outlined">photo_camera</span>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-text-main transition-all">
                                    <span className="material-symbols-outlined">smart_display</span>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-text-main transition-all">
                                    <span className="material-symbols-outlined">alternate_email</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                        <p>© 2023 Paper Straw. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;