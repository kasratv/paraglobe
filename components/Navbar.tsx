import React, { useState } from 'react';

interface NavbarProps {
  activeSection: string;
  onConnectClick: () => void;
}

const BauhausLogo = () => (
  <div className="flex items-end gap-2 -ml-[2mm]">
    {/* A: Blue Equilateral Triangle 
        Base: 36px, Height: ~31px (36 * 0.866) for equilateral 60deg angles 
    */}
    <div
      className="w-9 h-[31px] bauhaus-blue"
      style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
    ></div>

    {/* i: Yellow Circle on Red Square 
        Size increased by ~40% (12px -> 17px)
    */}
    <div className="flex flex-col items-center gap-0 mb-0 -ml-[3mm]">
      <div className="w-[17px] h-[17px] rounded-full bauhaus-yellow"></div>
      <div className="w-[17px] h-[17px] bauhaus-red"></div>
    </div>
  </div>
);

const Navbar: React.FC<NavbarProps> = ({ activeSection, onConnectClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Philosophy', id: 'philosophy', hoverClass: 'hover:text-blue-600' },
    { label: 'AI Vision', id: 'ai-vision', hoverClass: 'hover:text-[#F4C300]' },
    { label: 'Services', id: 'services', hoverClass: 'hover:text-[#E23D28]' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 h-20">
          <div
            className="flex items-center group cursor-pointer gap-3"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="outline-text font-['Baumans'] font-medium text-[26.4px] md:text-[44px] lowercase tracking-[0.029em] leading-none pt-1">
              paraglobe
            </span>
            <div className="scale-[0.6] md:scale-100 origin-left">
              <BauhausLogo />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.3em] font-medium transition-all">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative py-2 transition-colors duration-300 ${activeSection === item.id ? 'text-white' : `text-white/60 ${item.hoverClass}`
                  }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute -bottom-[26px] left-0 w-full h-[2px] bg-blue-600 animate-in fade-in slide-in-from-bottom-1 duration-500" />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onConnectClick}
              className="hidden md:inline-block px-6 py-2 bg-white text-black text-[10px] uppercase font-bold tracking-widest hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
            >
              Connect
            </button>

            {/* Hamburger Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden flex flex-col gap-1.5 p-2 transition-all active:scale-95"
              aria-label="Toggle Menu"
            >
              <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 top-20 bg-black z-40 transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] gap-12 text-[14px] uppercase tracking-[0.4em] font-bold">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`transition-colors duration-300 ${activeSection === item.id ? 'text-blue-600' : `text-white ${item.hoverClass}`
                }`}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              onConnectClick();
              setIsMobileMenuOpen(false);
            }}
            className="mt-8 px-12 py-4 bg-white text-black text-[12px] uppercase font-black tracking-[0.5em] hover:bg-blue-600 hover:text-white transition-all active:scale-95"
          >
            Connect
          </button>

          {/* Bauhaus Decoration */}
          <div className="mt-12 flex gap-4 opacity-20">
            <div className="w-8 h-8 rounded-full bg-[#F4C300]" />
            <div className="w-8 h-8 bg-[#E23D28]" />
            <div className="w-8 h-8 bauhaus-blue" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
