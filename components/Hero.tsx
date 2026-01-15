
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        <div className="md:col-span-10">
          <div className="mt-[1cm] mb-10 flex items-center gap-4">
            <div className="h-[1px] w-20 bg-blue-600" />
            <span className="text-white/40 text-[9px] font-bold tracking-[0.5em] uppercase">Advanced Application Design & Architecture</span>
          </div>
          
          <h1 className="text-7xl md:text-[clamp(5.2rem,13vw,12.35rem)] font-display font-black leading-[0.85] tracking-[0.02em] mb-12 uppercase">
            Engineering <br />
            <span className="outline-text block py-4">The Future</span>
            Of Intelligence.
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light max-w-md">
              A design-driven AI collective specializing in modular web ecosystems and advanced neural architectures. 
              We make the complex effortless.
            </p>
            <div className="flex flex-col gap-4">
              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Technical Domains</div>
              <div className="flex flex-wrap gap-2">
                {['Large Language Models', 'Distributed Systems', 'Supabase Systems', 'React Arch', 'GPU Motion'].map((tag) => (
                  <span key={tag} className="px-3 py-1 border border-white/10 text-[9px] uppercase font-medium hover:border-blue-600 hover:text-blue-500 transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex md:col-span-2 justify-end items-end pb-20">
          <div className="relative w-48 h-48 border border-white/20 group">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 animate-pulse group-hover:scale-110 transition-transform" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] uppercase tracking-tighter opacity-30 rotate-90 whitespace-nowrap font-mono">
              Geometric Perfection
            </div>
            <div className="absolute inset-0 border border-blue-600/20 translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-40">
        <span className="text-[9px] uppercase tracking-[0.4em]">Explore</span>
        <div className="w-[1px] h-12 bg-white" />
      </div>
    </section>
  );
};

export default Hero;