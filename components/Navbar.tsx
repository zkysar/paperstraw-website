import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
    variant: 'home' | 'for-venues';
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
                    {/* Logo - hidden on home when not scrolled */}
                    <div
                        className={`flex items-center cursor-pointer transition-all duration-300 ${isHome && !scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        onClick={() => navigate('/')}
                    >
                        <span className={`text-2xl md:text-3xl font-display font-bold tracking-tight hover:text-primary transition-colors ${textClass}`}>
                            PAPER STRAW
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className={`text-base font-semibold hover:text-primary transition-colors ${textClass}`}>Home</Link>
                        <button onClick={() => handleScrollTo('music')} className={`text-base font-semibold hover:text-primary transition-colors ${textClass}`}>Music</button>
                        <button onClick={() => handleScrollTo('shows')} className={`text-base font-semibold hover:text-primary transition-colors ${textClass}`}>Shows</button>
                        <Link to="/for-venues" className={`text-base font-semibold hover:text-primary transition-colors ${textClass}`}>For Venues</Link>
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