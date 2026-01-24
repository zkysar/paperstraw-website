import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
    variant: 'home' | 'booking';
}

const Navbar: React.FC<NavbarProps> = ({ variant }) => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollTo = (id: string) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const isHome = variant === 'home';
    const bgClass = isHome 
        ? (scrolled ? 'bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md shadow-sm' : 'bg-transparent') 
        : 'bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-surface-light dark:border-surface-dark';

    const textClass = isHome && !scrolled ? 'text-white' : 'text-text-main dark:text-white';
    
    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${bgClass}`}>
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <span className={`material-symbols-outlined text-3xl ${isHome && !scrolled ? 'text-primary' : 'text-primary'}`}>graphic_eq</span>
                        <span className={`text-xl md:text-2xl font-extrabold tracking-tight hover:text-primary transition-colors ${textClass}`}>
                            Paper Straw
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className={`text-sm font-semibold hover:text-primary transition-colors ${textClass}`}>Home</Link>
                        <button onClick={() => handleScrollTo('music')} className={`text-sm font-semibold hover:text-primary transition-colors ${textClass}`}>Music</button>
                        <button onClick={() => handleScrollTo('venues')} className={`text-sm font-semibold hover:text-primary transition-colors ${textClass}`}>Venues</button>
                        
                        {isHome ? (
                            <Link to="/booking" className={`text-sm font-semibold hover:text-primary transition-colors ${textClass}`}>Booking</Link>
                        ) : (
                            <Link to="/booking" className={`text-sm font-bold text-primary`}>Contact</Link>
                        )}

                        {isHome ? (
                            <button className="bg-primary hover:bg-primary-dark text-text-main font-bold py-2 px-5 rounded-full text-sm transition-transform hover:scale-105">
                                Follow
                            </button>
                        ) : (
                            <button className="flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold text-text-main shadow-sm hover:bg-primary/90 transition-colors">
                                Book Us
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button (Visual Only for this demo) */}
                    <div className="md:hidden flex items-center">
                        <button className={`p-2 rounded-md hover:bg-white/10 ${textClass}`}>
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;