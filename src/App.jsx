import React, { useState, useEffect } from 'react';
import Navbar            from './components/Navbar';
import Hero              from './components/Hero';
import PartnersMarquee   from './components/PartnersMarquee';
import InfluencersCatalog from './components/InfluencersCatalog';
import ServicesSection   from './components/ServicesSection';
import AboutSection      from './components/AboutSection';
import NewsSection       from './components/NewsSection';
import ContactSection    from './components/ContactSection';
import FAQSection        from './components/FAQSection';
import Footer            from './components/Footer';
import InfluencerModal   from './components/InfluencerModal';
import AdminDashboard    from './components/AdminDashboard';
import GlobalSearchModal from './components/GlobalSearchModal';
import FloatingWhatsApp  from './components/FloatingWhatsApp';
import CookieBanner      from './components/CookieBanner';
import LegalModal        from './components/LegalModal';
import { fetchInfluencers } from './lib/supabase';
import { defaultInfluencers } from './data/influencers';

export default function App() {
  const [activePage,          setActivePage]         = useState('home');
  const [influencers,         setInfluencers]        = useState(defaultInfluencers);
  const [selectedInfluencer,  setSelectedInfluencer] = useState(null);
  const [isAdminOpen,         setIsAdminOpen]        = useState(false);
  const [isSearchOpen,        setIsSearchOpen]       = useState(false);
  const [legalModalType,      setLegalModalType]     = useState(null);
  const [scrollProgress,      setScrollProgress]     = useState(0);

  // ── Dark / Light Mode ──
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('seninfluenceurs_dark_mode');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('seninfluenceurs_dark_mode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Load influencers
  useEffect(() => {
    fetchInfluencers()
      .then(data => { if (data?.length) setInfluencers(data); })
      .catch(() => {});
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const fn = () => {
      const total  = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = document.documentElement.scrollTop;
      setScrollProgress(total > 0 ? (scroll / total) * 100 : 0);
    };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Keyboard shortcut: Ctrl+K → search
  useEffect(() => {
    const fn = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(p => !p);
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const go = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Body background
  const bodyBg = darkMode ? 'bg-[#090A0D] text-slate-100' : 'bg-gray-50 text-gray-900';

  return (
    <div className={`min-h-screen flex flex-col relative overflow-x-hidden transition-colors duration-300 ${bodyBg}`}>

      {/* ── Scroll Progress Bar ── */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-brand-600 via-brand-400 to-emerald-400 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── Navbar ── */}
      <Navbar
        activePage={activePage}
        setActivePage={go}
        onOpenSearch={() => setIsSearchOpen(true)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* ── Page Content ── */}
      <main className="flex-grow">

        {activePage === 'home' && (
          <>
            <Hero
              darkMode={darkMode}
              onExploreInfluencers={() => go('influencers')}
              onStartCampaign={() => go('contact')}
            />
            <PartnersMarquee darkMode={darkMode} />
            <InfluencersCatalog
              influencers={influencers}
              onSelectInfluencer={setSelectedInfluencer}
              darkMode={darkMode}
            />
            <ServicesSection onStartBrief={() => go('contact')} darkMode={darkMode} />
            <AboutSection darkMode={darkMode} />
            <NewsSection darkMode={darkMode} />
            <FAQSection darkMode={darkMode} />
            <ContactSection darkMode={darkMode} />
          </>
        )}

        {activePage === 'influencers' && (
          <div className="pt-20">
            <InfluencersCatalog
              influencers={influencers}
              onSelectInfluencer={setSelectedInfluencer}
              darkMode={darkMode}
            />
          </div>
        )}

        {activePage === 'services' && (
          <div className="pt-20">
            <ServicesSection onStartBrief={() => go('contact')} darkMode={darkMode} />
          </div>
        )}

        {activePage === 'about' && (
          <div className="pt-20">
            <AboutSection darkMode={darkMode} />
            <PartnersMarquee darkMode={darkMode} />
          </div>
        )}

        {activePage === 'news' && (
          <div className="pt-20">
            <NewsSection darkMode={darkMode} />
          </div>
        )}

        {activePage === 'contact' && (
          <div className="pt-20">
            <ContactSection darkMode={darkMode} />
            <FAQSection darkMode={darkMode} />
          </div>
        )}

      </main>

      {/* ── Footer ── */}
      <Footer
        onNavigate={go}
        onOpenLegal={setLegalModalType}
        onOpenAdmin={() => setIsAdminOpen(true)}
        darkMode={darkMode}
      />

      {/* ── Modals ── */}
      <InfluencerModal
        influencer={selectedInfluencer}
        onClose={() => setSelectedInfluencer(null)}
        darkMode={darkMode}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onRefreshCatalog={() =>
          fetchInfluencers()
            .then(data => { if (data?.length) setInfluencers(data); })
            .catch(() => {})
        }
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectInfluencer={setSelectedInfluencer}
        onNavigate={go}
        darkMode={darkMode}
      />

      <LegalModal
        isOpen={!!legalModalType}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      <CookieBanner onOpenPrivacy={() => setLegalModalType('privacy')} darkMode={darkMode} />
      <FloatingWhatsApp />

    </div>
  );
}
