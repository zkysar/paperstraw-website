import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
    variant: 'home' | 'for-venues';
}

const Navbar: React.FC<NavbarProps> = ({ variant }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when location changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const handleScrollTo = (id: string) => {
        setIsOpen(false);
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
        ? (scrolled || isOpen ? 'bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md shadow-sm' : 'bg-transparent')
        : 'bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-surface-light dark:border-surface-dark';

    const textClass = isHome && !scrolled && !isOpen ? 'text-white' : 'text-text-main dark:text-white';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${bgClass}`}>
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo - hidden on home when not scrolled or menu open matches scrolled behavior */}
                    <div
                        className={`flex items-center cursor-pointer transition-all duration-300 ${isHome && !scrolled && !isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
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

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-md hover:bg-white/10 ${textClass}`}
                        >
                            <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`md:hidden absolute top-16 left-0 w-full bg-background-light dark:bg-background-dark border-b border-surface-light dark:border-surface-dark shadow-lg transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                <div className="flex flex-col px-4 py-4 space-y-4">
                    <Link to="/" className="text-lg font-semibold text-text-main dark:text-white hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
                    <button onClick={() => handleScrollTo('music')} className="text-lg font-semibold text-left text-text-main dark:text-white hover:text-primary transition-colors">Music</button>
                    <button onClick={() => handleScrollTo('shows')} className="text-lg font-semibold text-left text-text-main dark:text-white hover:text-primary transition-colors">Shows</button>
                    <Link to="/for-venues" className="text-lg font-semibold text-text-main dark:text-white hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>For Venues</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;