
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Philosophy from './components/Philosophy';
import AIVision from './components/AIVision';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ContactPopup from './components/ContactPopup';
import ClickSpark from './components/ClickSpark';
import FloatingLines from './components/FloatingLines';

import LegalOverlay from './components/LegalOverlay';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [legalPage, setLegalPage] = useState<'privacy' | 'terms' | 'cookies' | null>(null);

  useEffect(() => {
    // Intersection Observer to detect current section
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is in the upper portion of viewport
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const sections = ['hero', 'philosophy', 'services', 'ai-vision'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Smooth scroll behavior for internal links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = anchor.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('click', handleAnchorClick);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">

      <Navbar activeSection={activeSection} onConnectClick={() => setIsContactOpen(true)} />

      <main>
        <Hero />
        <Philosophy />
        <Services />
        <AIVision />
      </main>

      <ScrollToTop />
      <Footer
        onConnectClick={() => setIsContactOpen(true)}
        onPrivacyClick={() => setLegalPage('privacy')}
        onTermsClick={() => setLegalPage('terms')}
        onCookiesClick={() => setLegalPage('cookies')}
      />
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <LegalOverlay type={legalPage} onClose={() => setLegalPage(null)} />

      {/* Floating Lines Background */}
      <FloatingLines
        linesGradient={["#3B82F6", "#F4C300", "#E23D28"]}
        topWavePosition={{ x: 10.0, y: 0.5, rotate: -0.4 }}
        middleWavePosition={{ x: 5.0, y: 0.0, rotate: 0.2 }}
        bottomWavePosition={{ x: 2.0, y: -0.7, rotate: 0.4 }}
        animationSpeed={1}
        interactive={false}
        bendRadius={5}
        bendStrength={-0.5}
        mouseDamping={0.05}
        parallax
        parallaxStrength={0.2}
      />

      {/* Background Ambience Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[150px] rounded-full" />
      </div>
    </div>
  );
};

export default App;
