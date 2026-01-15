
import React, { useEffect, useRef, useState } from 'react';

const services = [
  {
    title: "AI Integration",
    cat: "Intelligence",
    desc: "Seamlessly embedding neural capabilities into existing business workflows using Gemini and custom model orchestration."
  },
  {
    title: "Web Architecture",
    cat: "Performance",
    desc: "Vite-powered React applications optimized for extreme speed, scalability, and atomic design precision."
  },
  {
    title: "Data Systems",
    cat: "Infrastructure",
    desc: "Robust backend foundations leveraging Supabase for real-time synchronization and secure, distributed storage."
  },
  {
    title: "Dynamic Motion",
    cat: "Experience",
    desc: "GPU-accelerated animations and interactive interfaces that guide attention and define brand identity."
  }
];

const Services: React.FC = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="min-h-screen bg-black/50 relative py-32 px-6 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-12 mb-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="md:col-span-6">
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter">Capabilities</h2>
          </div>
          <div className="md:col-span-6 flex items-end">
            <p className="text-white/40 uppercase tracking-widest text-[10px]">Solutions designed for technical authority.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10 border border-white/10">
          {services.map((service, idx) => (
            <div
              key={idx}
              style={{ transitionDelay: `${idx * 150}ms` }}
              className={`bg-[#080808] p-10 hover:bg-[#111] transition-all duration-700 group flex flex-col h-full transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              <div className="text-blue-600 text-xs font-mono mb-8 uppercase tracking-widest">0{idx + 1} // {service.cat}</div>
              <h3 className="text-2xl font-display font-bold mb-6 uppercase group-hover:text-blue-500 transition-colors">{service.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-12 flex-grow">
                {service.desc}
              </p>
              <div className="w-10 h-1 bg-white/10 group-hover:w-full group-hover:bg-blue-600 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
