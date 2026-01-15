
import React, { useState, useEffect, useRef } from 'react';
import { generateStrategicVision } from '../services/geminiService';

const AIVision: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [scale, setScale] = useState('Enterprise');
  const [vision, setVision] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry) return;

    setLoading(true);
    setError(null);
    setVision(null);

    try {
      const result = await generateStrategicVision(industry, scale);
      setVision(result);
    } catch (err) {
      setError("Analysis interrupted. Please verify your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-vision" ref={sectionRef} className="py-32 px-6 border-y border-white/10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className={`lg:col-span-5 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <div className="inline-block px-3 py-1 bg-blue-600 text-[10px] font-bold uppercase tracking-widest mb-6">
            Neural Engine v3.1
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter mb-8 leading-none">
            Synthesize Your <br /> Strategic Vision
          </h2>
          <p className="text-white/50 mb-12 leading-relaxed">
            Leverage our integrated Gemini intelligence to preview how Paraglobe architectures can transform your industry specific vertical.
          </p>

          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40">Target Industry</label>
              <input 
                type="text" 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. BioTech, Quantum Computing, FinTech"
                className="w-full bg-white/5 border border-white/10 p-4 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40">Operational Scale</label>
              <select 
                value={scale}
                onChange={(e) => setScale(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-4 focus:outline-none focus:border-blue-600 transition-colors"
              >
                <option value="Startup">Early Stage Startup</option>
                <option value="Growth">Growth Phase</option>
                <option value="Enterprise">Global Enterprise</option>
              </select>
            </div>

            <button 
              disabled={loading || !industry}
              className={`w-full py-4 font-bold uppercase tracking-[0.2em] text-xs transition-all ${
                loading ? 'bg-white/10 text-white/40 cursor-not-allowed' : 'bg-white text-black hover:bg-blue-600 hover:text-white'
              }`}
            >
              {loading ? 'Synthesizing...' : 'Generate Neural Insights'}
            </button>
          </form>
        </div>

        <div className={`lg:col-span-7 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="h-full min-h-[400px] border border-white/10 bg-[#0a0a0a] relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-600/30 overflow-hidden">
              <div className="w-1/3 h-full bg-blue-600 animate-[move_2s_infinite_linear]" />
            </div>
            
            <div className="p-10 flex-grow">
              {loading && (
                <div className="h-full flex flex-col items-center justify-center space-y-8">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border border-white/5" />
                    <div className="absolute top-0 left-0 w-full h-full border border-blue-600/20 animate-bauhaus-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 animate-bauhaus-spin" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white" />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 animate-pulse">Quantizing Parameters</p>
                </div>
              )}

              {error && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 border border-red-500/50 flex items-center justify-center text-red-500 font-mono text-xl">!</div>
                  <p className="text-sm text-red-500 uppercase font-bold tracking-widest">{error}</p>
                </div>
              )}

              {!loading && !vision && !error && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                   <div className="relative w-32 h-32 mb-10 opacity-40">
                      <div className="absolute top-0 left-0 w-16 h-16 bg-blue-600/10 border border-blue-600/30 animate-bauhaus-float" />
                      <div className="absolute bottom-0 right-0 w-20 h-20 rounded-full border border-white/10 animate-bauhaus-pulse" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[30px] border-b-white/10 animate-bauhaus-rotate" />
                   </div>
                   <p className="text-[10px] uppercase tracking-[0.6em] text-white/30">System Idle // Awaiting Input</p>
                </div>
              )}

              {vision && (
                <div className="prose prose-invert max-w-none prose-sm animate-fade-in">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[10px] text-blue-500 font-mono">VISION_REPORT_088</span>
                    <div className="h-[1px] flex-grow bg-white/10" />
                  </div>
                  <div className="whitespace-pre-wrap text-white/70 leading-relaxed font-light text-base">
                    {vision}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/5 bg-black/50 text-[9px] font-mono text-white/30 flex justify-between uppercase">
              <span>Status: {loading ? 'Processing' : 'Standby'}</span>
              <span>Enc: AES-GCM</span>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes move {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bauhaus-spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          25% { transform: translate(-50%, -50%) rotate(90deg); }
          50% { transform: translate(-50%, -50%) rotate(180deg); }
          75% { transform: translate(-50%, -50%) rotate(270deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes bauhaus-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes bauhaus-pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }
        @keyframes bauhaus-rotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-bauhaus-spin {
          animation: bauhaus-spin 2s steps(4) infinite;
        }
        .animate-bauhaus-float {
          animation: bauhaus-float 6s ease-in-out infinite;
        }
        .animate-bauhaus-pulse {
          animation: bauhaus-pulse 4s ease-in-out infinite;
        }
        .animate-bauhaus-rotate {
          animation: bauhaus-rotate 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default AIVision;
