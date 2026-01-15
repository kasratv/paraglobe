
import React from 'react';

interface NavbarProps {
  activeSection: string;
}

const BauhausLogo = () => (
  <div className="flex items-end gap-2">
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
    <div className="flex flex-col items-center gap-[3px] mb-0">
      <div className="w-[17px] h-[17px] rounded-full bauhaus-yellow"></div>
      <div className="w-[17px] h-[17px] bauhaus-red"></div>
    </div>
  </div>
);

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const navItems = [
    { label: 'Services', id: 'services' },
    { label: 'AI Vision', id: 'ai-vision' },
    { label: 'Philosophy', id: 'philosophy' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 h-20">
        <div 
          className="flex items-center group cursor-pointer gap-3"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="outline-text font-['Baumans'] font-medium text-[44px] lowercase tracking-[0.029em] leading-none pt-1 ml-[5mm]">
            paraglobe
          </span>
          <BauhausLogo />
        </div>
        
        <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.3em] font-medium transition-all">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`} 
              className={`relative py-2 transition-colors duration-300 ${
                activeSection === item.id ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute -bottom-[26px] left-0 w-full h-[2px] bg-blue-600 animate-in fade-in slide-in-from-bottom-1 duration-500" />
              )}
            </a>
          ))}
        </div>

        <div>
          <a 
            href="https://github.com/kasratv/paraglobe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-white text-black text-[10px] uppercase font-bold tracking-widest hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
          >
            Connect
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
