import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Users, ChevronLeft, ChevronRight, Award, ShieldCheck } from 'lucide-react';

const slides = [
  {
    url: "https://res.cloudinary.com/dwp4isflu/image/upload/v1784924505/slider-9_anqkcs.jpg",
    title: "Campagnes d'Influence d'Envergure",
    sub: "Des activations mémorables au Sénégal et dans toute la sous-région"
  },
  {
    url: "https://res.cloudinary.com/dwp4isflu/image/upload/v1780879416/happy-woman-relaxing-apartment-texting-friends-cellphone_p9ye7d.jpg",
    title: "Connexion Authentique avec les Communautés",
    sub: "Plus de 50 millions de portée cumulée sur TikTok, Instagram & YouTube"
  },
  {
    url: "https://res.cloudinary.com/dwp4isflu/image/upload/v1791240966/slider-21_uxhcy9.png",
    title: "SENINFLUENCEURS STUDIO",
    sub: "Plateau de tournage, podcasts et réalisation audiovisuelle premium"
  },
  {
    url: "https://res.cloudinary.com/dwp4isflu/image/upload/v1791240965/team-member-29_1_o47b4e.jpg",
    title: "Accompagnement & Management de Talents",
    sub: "Développement de carrière et valorisation des créateurs africains"
  }
];

export default function Hero({ darkMode, onExploreInfluencers, onStartCampaign }) {
  const [current, setCurrent] = useState(0);
  const [scrollY, setScrollY]  = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const textPrimary   = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-slate-300' : 'text-gray-600';
  const sectionBg     = darkMode ? '' : 'bg-white';
  const pillBg        = darkMode ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-brand-50 border-brand-200 text-brand-700';
  const pillDot       = darkMode ? 'bg-brand-400' : 'bg-brand-600';
  const dividerBorder = darkMode ? 'border-white/10' : 'border-gray-200';
  const counterLabel  = darkMode ? 'text-slate-400' : 'text-gray-500';

  return (
    <section className={`relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden ${sectionBg}`}>

      {/* BG image (dark mode only — in light mode, just a decorative right image) */}
      {darkMode && (
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-transform duration-700"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-35' : 'opacity-0'}`}>
              <img src={s.url} alt={s.title} className="w-full h-full object-cover brightness-75" onError={e => { e.currentTarget.src = ''; }} />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D] via-[#090A0D]/70 to-[#090A0D]/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(217,16,64,0.12),transparent)]" />
        </div>
      )}

      {/* Light mode right-side decorative image strip */}
      {!darkMode && (
        <div className="absolute right-0 top-0 bottom-0 w-2/5 z-0 pointer-events-none hidden lg:block overflow-hidden rounded-l-[3rem]">
          {slides.map((s, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
              <img src={s.url} alt={s.title} className="w-full h-full object-cover" onError={e => { e.currentTarget.src = ''; }} />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" style={{ background: 'linear-gradient(90deg, white 0%, rgba(255,255,255,0.3) 40%, transparent 100%)' }} />
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ——— LEFT COLUMN ——— */}
          <div className="lg:col-span-7">

            {/* Pill badge */}
            <div className={`inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border mb-6 ${pillBg}`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${pillDot}`} />
              <span className="text-xs uppercase tracking-widest font-semibold">Première Agence d'Influence au Sénégal</span>
              <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-400'}`}>| Dakar</span>
            </div>

            {/* Headline */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.08] mb-6 ${textPrimary}`}>
              Connectez votre marque aux{' '}
              <span className="text-brand-gradient">voix qui comptent</span>{' '}
              en Afrique.
            </h1>

            {/* Sub */}
            <p className={`text-base sm:text-lg font-light leading-relaxed mb-8 max-w-2xl ${textSecondary}`}>
              Pionniers du marketing d'influence à Dakar, nous concevons des campagnes créatives à fort impact avec plus de{' '}
              <strong className={darkMode ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}>300 créateurs de contenus</strong> d'élite.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onExploreInfluencers}
                className="px-7 py-3.5 rounded-xl bg-[#8d1864] hover:bg-[#751352] text-white font-semibold text-sm shadow-xl shadow-[#8d1864]/30 transition-all hover:-translate-y-0.5 flex items-center space-x-2 cursor-pointer"
              >
                <span>Catalogue Talents</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onStartCampaign}
                className={`px-7 py-3.5 rounded-xl font-semibold text-sm border transition-all hover:-translate-y-0.5 flex items-center space-x-2 cursor-pointer ${
                  darkMode
                    ? 'bg-white/10 hover:bg-white/15 text-white border-white/15'
                    : 'bg-[#8d1864]/10 hover:bg-[#8d1864]/20 text-[#8d1864] border-[#8d1864]/30'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#8d1864]" />
                <span>Lancer un Brief</span>
              </button>
            </div>

            {/* Counters */}
            <div className={`grid grid-cols-3 gap-6 pt-10 mt-10 border-t ${dividerBorder}`}>
              {[
                { val: '+300', label: 'Talents accompagnés' },
                { val: '+50M', label: "Portée d'audience" },
                { val: 'N°1',  label: 'Agence au Sénégal', highlight: true },
              ].map((c, i) => (
                <div key={i}>
                  <div className={`text-2xl sm:text-3xl font-display font-extrabold ${c.highlight ? 'text-[#8d1864]' : textPrimary}`}>{c.val}</div>
                  <div className={`text-xs uppercase tracking-wider font-medium mt-0.5 ${counterLabel}`}>{c.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ——— RIGHT CARD — visible on dark or hidden (light uses full right image) ——— */}
          {darkMode && (
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-brand-600/20 via-transparent to-white/5 blur-xl opacity-60" />
                <div className="relative glass-dark rounded-2xl p-3 shadow-2xl border border-white/15">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden group">
                    <img
                      src={slides[current].url}
                      alt={slides[current].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white flex items-center space-x-1.5">
                      <Award className="w-3.5 h-3.5 text-[#8d1864]" />
                      <span>Label d'Excellence Dakar</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8d1864] block">Expertise Phare</span>
                      <h3 className="text-lg font-bold text-white leading-snug mt-1">{slides[current].title}</h3>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">{slides[current].sub}</p>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/15">
                        <div className="flex space-x-1.5">
                          {slides.map((_, i) => (
                            <button key={i} onClick={() => setCurrent(i)}
                              className={`h-1.5 rounded-full transition-all ${i === current ? 'w-6 bg-[#8d1864]' : 'w-1.5 bg-white/30'}`}
                            />
                          ))}
                        </div>
                        <div className="flex space-x-1">
                          <button onClick={() => setCurrent((current - 1 + slides.length) % slides.length)} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white">
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => setCurrent((current + 1) % slides.length)} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white">
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Contrats sécurisés &amp; certifiés</span>
                    </div>
                    <span className="text-[#8d1864] font-semibold">Membre FOBAF</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Light mode: slide dots at bottom of left column */}
          {!darkMode && (
            <div className="lg:col-span-5 hidden lg:flex items-center justify-end">
              <div className="flex space-x-2">
                {slides.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-[#8d1864]' : 'w-2 bg-gray-200'}`}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
