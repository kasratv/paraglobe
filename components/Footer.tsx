
import React from 'react';

const BauhausLogo = () => (
  <div className="flex items-end gap-2 -ml-[3mm] translate-y-[1mm]">
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

interface FooterProps {
  onConnectClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onConnectClick }) => {
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
              <span className="outline-text font-['Baumans'] font-medium text-[26.4px] md:text-[44px] lowercase tracking-[0.029em] leading-none pt-1">paraglobe</span>
              <div className="scale-[0.6] md:scale-100 origin-left">
                <BauhausLogo />
              </div>
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
                <li><a href="#philosophy" className="hover:text-white">Philosophy</a></li>
                <li><a href="#ai-vision" className="hover:text-white">AI Vision</a></li>
                <li><a href="#services" className="hover:text-white">Services</a></li>
                <li><button onClick={onConnectClick} className="hover:text-white text-left uppercase">Contact</button></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] uppercase tracking-widest text-blue-600 font-bold">Inquiries</h5>
              <ul className="space-y-2 text-sm text-white/40">
                <li><a href="mailto:info@paraglobe.com" className="hover:text-white transition-colors">info@paraglobe.com</a></li>
                <li><a href="tel:+16046854726" className="hover:text-white transition-colors">604-685-4726</a></li>
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
