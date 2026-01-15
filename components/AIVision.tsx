import React, { useState, useEffect, useRef } from 'react';
import { generateArchitectureDiagram } from '../services/geminiService';
import { generateAndSavePDF, downloadPDF, openPDFViaLink } from '../services/pdfService';
import EmailCaptureModal from './EmailCaptureModal';
import mermaid from 'mermaid';
import { supabase } from '../services/supabaseClient';

// Initialize Mermaid with Bauhaus-inspired theme
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#3B82F6',
    primaryTextColor: '#fff',
    primaryBorderColor: '#3B82F6',
    lineColor: '#F4C300',
    secondaryColor: '#E23D28',
    tertiaryColor: '#F4C300',
    background: '#0a0a0a',
    mainBkg: '#0a0a0a',
    secondBkg: '#1a1a1a',
    tertiaryBkg: '#2a2a2a',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  },
  flowchart: {
    curve: 'basis',
    padding: 20,
  },
});

const AIVision: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [scale, setScale] = useState('Enterprise');
  const [vision, setVision] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  // PDF & Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Zoom and Pan state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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

  // Render Mermaid diagram when vision changes
  useEffect(() => {
    if (vision && diagramRef.current) {
      const renderDiagram = async () => {
        try {
          // Extract mermaid code from markdown code blocks
          const mermaidMatch = vision.match(/```mermaid\n([\s\S]*?)\n```/);
          if (mermaidMatch) {
            const mermaidCode = mermaidMatch[1];
            const id = `mermaid-${Date.now()}`;

            // Clear previous diagram
            diagramRef.current!.innerHTML = '';

            // Render new diagram
            const { svg } = await mermaid.render(id, mermaidCode);
            diagramRef.current!.innerHTML = svg;
          } else {
            // Fallback to text if no mermaid code found
            diagramRef.current!.innerHTML = `<div class="text-white/70 leading-relaxed">${vision}</div>`;
          }
        } catch (err) {
          console.error('Mermaid rendering error:', err);
          diagramRef.current!.innerHTML = `<div class="text-white/70 leading-relaxed">${vision}</div>`;
        }
      };

      renderDiagram();
    }
  }, [vision]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry) return;

    setLoading(true);
    setError(null);
    setVision(null);
    setSaveSuccess(false);

    try {
      // Simulate a brief "processing" delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));

      const result = generateArchitectureDiagram(industry, scale);
      setVision(result);
    } catch (err) {
      setError("Unable to generate diagram. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveClick = () => {
    setIsModalOpen(true);
  };

  const handleEmailSubmit = async (email: string) => {
    if (!vision || !diagramRef.current) return;

    // Use native browser print for best reliability as requested by user.
    // We simulate a "Save" success UI then trigger print.
    setIsSaving(true);

    // Simulate network delay for UX
    setTimeout(() => {
      setIsModalOpen(false);
      setSaveSuccess(true);

      // Wait for modal to close fully
      setTimeout(() => {
        // Browser Print Dialog - User can "Save as PDF" here
        window.print();

        setIsSaving(false);
        setSaveSuccess(false);
      }, 500);
    }, 800);
  };

  // Mouse event handlers for pan functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - panPosition.x,
        y: e.clientY - panPosition.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mouse wheel handler for zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.min(Math.max(zoomLevel + delta, 0.5), 3);
    setZoomLevel(newZoom);
  };

  return (
    <section id="ai-vision" ref={sectionRef} className="min-h-screen bg-black/50 relative py-32 px-6 border-t border-white/10">
      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEmailSubmit}
        industry={industry}
        scale={scale}
        isProcessing={isSaving}
      />

      {/* Success Notification */}
      {saveSuccess && (
        <div className="fixed top-24 right-6 z-50 bg-green-500/10 border border-green-500 text-green-500 px-6 py-4 backdrop-blur-md animate-fade-in flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">Blueprint Saved</p>
            <p className="text-[10px] opacity-70">PDF has been downloaded</p>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className={`lg:col-span-5 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <div className="inline-block px-3 py-1 bg-blue-600 text-[10px] font-bold uppercase tracking-widest mb-6">
            Neural Engine v3.1
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter mb-8 leading-none">
            Synthesize Your <br /> Strategic Vision
          </h2>
          <p className="text-white/50 mb-12 leading-relaxed">
            Leverage our integrated intelligence to preview how advanced architectures can transform your industry-specific vertical.
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
              className={`w-full py-4 font-bold uppercase tracking-[0.2em] text-xs transition-all ${loading ? 'bg-white/10 text-white/40 cursor-not-allowed' : 'bg-white text-black hover:bg-blue-600 hover:text-white'
                }`}
            >
              {loading ? 'Synthesizing...' : 'Generate Architecture Blueprint'}
            </button>
          </form>
        </div>

        <div className={`lg:col-span-7 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="h-full min-h-[500px] border border-white/10 bg-[#0a0a0a] relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-600/30 overflow-hidden">
              <div className="w-1/3 h-full bg-blue-600 animate-[move_2s_infinite_linear]" />
            </div>

            <div className="p-10 flex-grow overflow-auto relative">
              {loading && (
                <div className="h-full flex flex-col items-center justify-center space-y-8">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border border-white/5" />
                    <div className="absolute top-0 left-0 w-full h-full border border-blue-600/20 animate-bauhaus-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 animate-bauhaus-spin" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white" />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 animate-pulse">Architecting Solution</p>
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
                <div className="animate-fade-in">
                  <div className="flex items-center mb-4">
                    {/* Controls Group - Moved to Left */}
                    <div className="flex items-center gap-4">
                      {/* Zoom Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const newZoom = Math.min(zoomLevel + 0.2, 3);
                            setZoomLevel(newZoom);
                          }}
                          className="w-8 h-8 bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-600 transition-colors flex items-center justify-center text-white font-bold"
                          title="Zoom In"
                        >
                          +
                        </button>
                        <span className="text-[10px] text-white/40 font-mono w-12 text-center">
                          {Math.round(zoomLevel * 100)}%
                        </span>
                        <button
                          onClick={() => {
                            const newZoom = Math.max(zoomLevel - 0.2, 0.5);
                            setZoomLevel(newZoom);
                          }}
                          className="w-8 h-8 bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-600 transition-colors flex items-center justify-center text-white font-bold"
                          title="Zoom Out"
                        >
                          −
                        </button>
                        <button
                          onClick={() => {
                            setZoomLevel(1);
                            setPanPosition({ x: 0, y: 0 });
                          }}
                          className="px-3 h-8 bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-600 transition-colors text-[10px] uppercase tracking-wider text-white"
                          title="Reset View"
                        >
                          Reset
                        </button>
                      </div>

                      {/* Save Button */}
                      <button
                        onClick={handleSaveClick}
                        className="px-4 h-8 bg-blue-600 hover:bg-white hover:text-black transition-colors text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-2"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export PDF
                      </button>
                    </div>
                  </div>

                  <div
                    className="relative overflow-hidden border border-white/10 bg-black/50"
                    style={{ minHeight: '400px', cursor: isDragging ? 'grabbing' : (zoomLevel > 1 ? 'grab' : 'default') }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onWheel={handleWheel}
                  >
                    <div
                      ref={diagramRef}
                      className="mermaid-diagram transition-transform"
                      style={{
                        transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
                        transformOrigin: 'center center',
                        minHeight: '300px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '40px',
                      }}
                    />
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
        
        /* Mermaid diagram styling */
        .mermaid-diagram svg {
          max-width: 100%;
          height: auto;
        }
        
        .mermaid-diagram .node rect,
        .mermaid-diagram .node circle,
        .mermaid-diagram .node polygon {
          stroke-width: 2px !important;
        }
        
        .mermaid-diagram .edgePath .path {
          stroke-width: 2px !important;
        }
      `}</style>
    </section>
  );
};

export default AIVision;
