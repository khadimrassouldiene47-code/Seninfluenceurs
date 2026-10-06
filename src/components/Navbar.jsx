import React, { useState, useEffect } from 'react';
import {
  Menu, X, MessageCircle, ChevronRight, Search, Sun, Moon
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenSearch, darkMode, toggleDarkMode }) {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileMenuOpen, setMobile] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navItems = [
    { id: 'home',        label: 'Accueil' },
    { id: 'influencers', label: 'Influenceurs', badge: '+300' },
    { id: 'services',    label: 'Expertises & Studio' },
    { id: 'about',       label: "L'Agence" },
    { id: 'news',        label: 'Actualités' },
    { id: 'contact',     label: 'Lancer un Brief' },
  ];

  const go = (id) => {
    setActivePage(id);
    setMobile(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ---------- color tokens per mode ---------- */
  const headerBg = scrolled
    ? darkMode
      ? 'bg-dark-bg/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40'
      : 'bg-white/95 backdrop-blur-xl border-b border-black/8 shadow-lg shadow-black/8'
    : 'bg-transparent';

  const textColor   = darkMode ? 'text-slate-200' : 'text-gray-700';
  const activeColor = darkMode
    ? 'bg-white/15 text-white font-semibold'
    : 'bg-[#8d1864]/10 text-[#8d1864] font-semibold';
  const hoverColor  = darkMode ? 'hover:text-white hover:bg-white/5' : 'hover:text-[#8d1864] hover:bg-[#8d1864]/10';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg} py-3 sm:py-4`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* ——— LOGO ——— */}
          <button onClick={() => go('home')} className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 dark:border-white/20 bg-white shadow-sm group-hover:scale-105 transition-transform">
              <img
                src="/logo.png"
                alt="SENINFLUENCEURS Logo"
                className="w-full h-full object-contain"
                onError={e => { e.currentTarget.src = '/logo.webp'; }}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-black text-xl tracking-tight" style={{color: darkMode ? '#fff' : '#8d1864'}}>
                SEN<span style={{color: '#8d1864'}}>INFLUENCEURS</span>
              </span>
              <span className={`text-[9px] uppercase tracking-widest font-medium ${darkMode ? 'text-slate-400' : 'text-gray-400'}`}>
                Première Agence • Sénégal
              </span>
            </div>
          </button>

          {/* ——— DESKTOP NAV ——— */}
          <nav className={`hidden lg:flex items-center space-x-0.5 px-3 py-1.5 rounded-full border ${
            darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-gray-100/80 border-gray-200'
          }`}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center space-x-1.5 transition-all duration-200 ${
                  activePage === item.id ? activeColor : `${textColor} ${hoverColor}`
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold border" style={{background:'#8d186420', color:'#8d1864', borderColor:'#8d186440'}}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* ——— RIGHT ACTIONS ——— */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className={`p-2 rounded-full transition-colors border border-transparent hover:border-gray-200 ${
                darkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-brand-600 hover:bg-brand-50'
              }`}
              title="Rechercher (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                darkMode
                  ? 'text-pink-300 hover:bg-pink-300/10'
                  : 'text-gray-500 hover:text-[#8d1864] hover:bg-[#8d1864]/10'
              }`}
              title={darkMode ? 'Mode clair' : 'Mode sombre'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* WhatsApp CTA */}
            <a
              href="https://api.whatsapp.com/send?phone=+221772619754&text=Bonjour%20SENINFLUENCEURS,%20je%20souhaite%20des%20renseignements."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#8d1864] hover:bg-[#751352] text-white text-xs font-semibold shadow-lg shadow-[#8d1864]/25 transition-all hover:-translate-y-0.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          {/* ——— MOBILE: Theme + Search + Hamburger ——— */}
          <div className="flex md:hidden items-center space-x-1">
            <button onClick={toggleDarkMode} className={`p-2 rounded-full ${darkMode ? 'text-pink-300' : 'text-gray-500'}`}>
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={onOpenSearch} className={`p-2 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobile(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${darkMode ? 'text-slate-300 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'}`}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ——— MOBILE DRAWER ——— */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t px-4 pt-3 pb-6 mt-2 ${
          darkMode ? 'bg-[#0A0B0E] border-white/10 shadow-2xl' : 'bg-white border-gray-200 shadow-xl'
        }`}>
          <div className="flex flex-col space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-left ${
                  activePage === item.id
                    ? (darkMode ? 'bg-white/15 text-white' : 'text-[#8d1864] bg-[#8d1864]/10')
                    : (darkMode ? 'text-slate-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50')
                }`}
              >
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold border" style={{background:'#8d186420', color:'#8d1864', borderColor:'#8d186440'}}>
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 opacity-40" />
                )}
              </button>
            ))}

            <div className="pt-3 border-t border-white/10">
              <a
                href="https://api.whatsapp.com/send?phone=+221772619754"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
