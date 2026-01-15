
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-32 px-6">
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10 mb-[120px] md:mb-[50px]">
        <div className="md:col-span-10">
          <div className="mt-[1cm] mb-10 flex items-center gap-4">
            <div className="h-[1px] w-20 bg-blue-600" />
            <span className="text-white/40 text-[9px] font-bold tracking-[0.5em] uppercase">Advanced Application Design</span>
          </div>

          <h1 className="text-7xl md:text-[clamp(5.2rem,13vw,12.35rem)] font-display font-black leading-[0.85] tracking-[0.02em] mb-12 uppercase">
            Engineering <br />
            <span className="outline-text block py-4">The Future</span>
            Of Intelligent <br />
            Application
          </h1>

          <div className="grid grid-cols-1 gap-12 items-start">
            <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light max-w-md">
              A design-driven AI collective specializing in modular web ecosystems and advanced neural architectures.
              We make the complex effortless.
            </p>
          </div>
        </div>

        <div className="hidden md:flex md:col-span-2 justify-end items-end pb-12">
          <div className="relative w-48 h-48 border border-white/20 group">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 animate-pulse group-hover:scale-110 transition-transform" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] uppercase tracking-tighter opacity-30 rotate-90 whitespace-nowrap font-mono">
              Geometric Perfection
            </div>
            <div className="absolute inset-0 border border-blue-600/20 translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-[calc(2rem-5mm)] md:bottom-10 inset-x-0 mx-auto w-fit flex flex-col items-center gap-4 animate-bounce opacity-40 z-20">
        <span className="text-[9px] uppercase tracking-[0.4em]">Explore</span>
        <div className="w-[1px] h-12 bg-white" />
      </div>
    </section>
  );
};

export default Hero;