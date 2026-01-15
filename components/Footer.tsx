
import React from 'react';

const BauhausLogoSmall = () => (
  <div className="flex items-end gap-1.5">
    {/* A: Blue Equilateral Triangle (Scaled down) */}
    <div 
      className="w-5 h-[17px] bauhaus-blue" 
      style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
    ></div>
    
    {/* i: Yellow Circle on Red Square (Scaled down) */}
    <div className="flex flex-col items-center gap-[1px]">
      <div className="w-[10px] h-[10px] rounded-full bauhaus-yellow"></div>
      <div className="w-[10px] h-[10px] bauhaus-red"></div>
    </div>
  </div>
);

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'X', url: '#' },
    { name: 'LinkedIn', url: '#' },
    { name: 'GitHub', url: 'https://github.com/kasratv/paraglobe' }
  ];

  return (
    <footer className="py-20 px-6 bg-black border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-6">
             <div className="flex items-center gap-3 mb-8">
              <span className="outline-text font-['Baumans'] font-medium text-4xl lowercase tracking-[0.029em] ml-[5mm]">paraglobe</span>
              <BauhausLogoSmall />
            </div>
            <p className="text-white/40 text-sm max-w-sm mb-8">
              Paraglobe Media Inc. // The next generation of web and AI orchestration. Built for those who demand precision and visionary engineering.
            </p>
            <div className="flex gap-6">
              {socialLinks.map(platform => (
                <a 
                  key={platform.name} 
                  href={platform.url}
                  target={platform.url.startsWith('http') ? "_blank" : undefined}
                  rel={platform.url.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="text-[10px] uppercase font-bold tracking-widest text-white/60 hover:text-white transition-colors"
                >
                  {platform.name}
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h5 className="text-[10px] uppercase tracking-widest text-blue-600 font-bold">Studio</h5>
              <ul className="space-y-2 text-sm text-white/40">
                <li><a href="#hero" className="hover:text-white">Home</a></li>
                <li><a href="#services" className="hover:text-white">Services</a></li>
                <li><a href="#philosophy" className="hover:text-white">Philosophy</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] uppercase tracking-widest text-blue-600 font-bold">Inquiries</h5>
              <ul className="space-y-2 text-sm text-white/40">
                <li>info@paraglobe.com</li>
                <li>604-685-4726</li>
              </ul>
            </div>
            <div className="hidden md:block space-y-4">
              <h5 className="text-[10px] uppercase tracking-widest text-blue-600 font-bold">Network</h5>
              <ul className="space-y-2 text-sm text-white/40">
                <li>paraglobe.com</li>
                <li>Vancouver, BC</li>
                <li>Remote First</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/5 text-[10px] uppercase font-medium tracking-widest text-white/20">
          <p>© 2025 PARAGLOBE MEDIA INC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
