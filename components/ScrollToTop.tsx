
import React, { useState, useEffect } from 'react';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-10 right-10 z-50 flex flex-col items-center gap-3 group transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
            aria-label="Scroll to top"
        >
            <div className="relative">
                {/* Blue Triangle Pointing Up */}
                <div
                    className="w-6 h-5 bg-[#0050A1] shadow-[0_0_20px_rgba(0,80,161,0.3)] transition-transform duration-300 group-hover:-translate-y-1.5"
                    style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                />

                {/* Subtle hover background highlight */}
                <div className="absolute -inset-4 bg-blue-600/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10" />
            </div>

            <div className="flex flex-col items-center gap-[2px]">
                {/* Yellow Circle and Red Square from Logo motif */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#F4C300] opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-2.5 h-2.5 bg-[#E23D28] opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <span className="text-[7px] uppercase font-bold tracking-[0.6em] text-white/20 group-hover:text-white/80 transition-all duration-300 translate-x-[2px]">
                Top
            </span>
        </button>
    );
};

export default ScrollToTop;
