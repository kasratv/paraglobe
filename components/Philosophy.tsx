
import React, { useEffect, useRef, useState } from 'react';

const Philosophy: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="min-h-screen bg-black/50 relative py-40 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className={`md:col-span-7 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-6xl md:text-8xl font-display font-black uppercase leading-[0.9] tracking-tighter mb-12">
              <span className="outline-text block transition-all hover:translate-x-2 duration-500">Form</span>
              <span className="outline-text-blue block py-2 transition-all hover:translate-x-4 duration-500">Follows</span>
              <span className="outline-text block transition-all hover:translate-x-2 duration-500">Function.</span>
            </h2>
            <div className="max-w-xl">
              <p className="text-xl text-white/60 font-light leading-relaxed mb-8">
                We adhere to the Bauhaus discipline: removing the superfluous until only the essential remains.
                In a world of digital noise, we build silence that speaks.
              </p>
              <div className="grid grid-cols-2 gap-12">
                <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-blue-600 mb-4">Precision</h4>
                  <p className="text-sm text-white/40">Every pixel serves a purpose. Every line of code is intentional.</p>
                </div>
                <div className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-blue-600 mb-4">Innovation</h4>
                  <p className="text-sm text-white/40">Technological complexity delivered with invisible elegance.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`md:col-span-5 relative flex justify-center transition-all duration-1000 delay-700 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="relative">
              <div className="w-[300px] h-[300px] border border-white/10 relative overflow-hidden bg-white/[0.02]">
                {/* Simplified Architecture Visuals */}
                <div className={`absolute top-0 right-0 w-32 h-32 border border-white/20 transition-all duration-1000 delay-1000 transform ${isVisible ? 'translate-x-0 translate-y-0' : 'translate-x-full -translate-y-full'}`} />
                <div className={`absolute bottom-10 left-10 w-20 h-20 rounded-full border border-blue-600/30 transition-all duration-1000 delay-1200 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white/5 rotate-45" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white/5 -rotate-45" />
                <div className={`absolute top-1/2 right-1/4 w-[1px] h-32 bg-blue-600/40 transition-all duration-1000 delay-1400 transform ${isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`} />

                <div className="absolute top-4 left-4 text-[8px] font-mono text-white/20 uppercase tracking-widest">Architectural_Primitive</div>
              </div>
              <div className="absolute -bottom-8 -right-8 p-6 bg-black border border-white/10 text-[10px] font-mono tracking-widest uppercase text-white/50">
                Structure // 01
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
