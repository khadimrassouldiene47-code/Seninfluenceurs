import React from 'react';
import { brandPartners } from '../data/partners';
import { Shield } from 'lucide-react';

export default function PartnersMarquee({ darkMode }) {
  // Split into two rows
  const row1 = brandPartners.slice(0, 16);
  const row2 = brandPartners.slice(16);

  const sectionBg = darkMode
    ? 'bg-[#0C0E14] border-white/5'
    : 'bg-gray-50 border-gray-100';

  const cardBg = darkMode
    ? 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10'
    : 'bg-white hover:bg-gray-50 border-gray-100 shadow-sm hover:shadow-md';

  return (
    <section className={`py-16 border-y ${sectionBg} relative overflow-hidden`}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-brand-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-medium mb-3 ${
          darkMode ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-brand-50 border-brand-100 text-brand-600'
        }`}>
          <Shield className="w-3.5 h-3.5" />
          <span>Ils nous font confiance</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-display font-bold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Partenaires Institutionnels &amp; Grandes Marques
        </h2>
        <p className={`text-sm mt-1.5 max-w-xl mx-auto ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          Des multinationales aux fleurons de l'économie sénégalaise.
        </p>
      </div>

      {/* Track 1 — gauche */}
      <div className="relative w-full overflow-hidden mb-4">
        <div className={`absolute left-0 inset-y-0 w-20 z-10 pointer-events-none ${
          darkMode ? 'bg-gradient-to-r from-[#0C0E14]' : 'bg-gradient-to-r from-gray-50'
        } to-transparent`} />
        <div className={`absolute right-0 inset-y-0 w-20 z-10 pointer-events-none ${
          darkMode ? 'bg-gradient-to-l from-[#0C0E14]' : 'bg-gradient-to-l from-gray-50'
        } to-transparent`} />

        <div className="flex w-max space-x-4 animate-marquee pause-marquee py-2">
          {[...row1, ...row1].map((p, i) => (
            <div key={i} className={`flex items-center justify-center p-3 rounded-2xl border transition-all duration-300 group cursor-default min-w-[100px] h-[72px] ${cardBg}`}>
              <img
                src={p.logo}
                alt={p.name}
                title={p.name}
                className="max-h-[48px] max-w-[80px] w-auto h-auto object-contain group-hover:scale-110 transition-transform duration-300 filter"
                loading="lazy"
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Track 2 — droite */}
      <div className="relative w-full overflow-hidden">
        <div className={`absolute left-0 inset-y-0 w-20 z-10 pointer-events-none ${
          darkMode ? 'bg-gradient-to-r from-[#0C0E14]' : 'bg-gradient-to-r from-gray-50'
        } to-transparent`} />
        <div className={`absolute right-0 inset-y-0 w-20 z-10 pointer-events-none ${
          darkMode ? 'bg-gradient-to-l from-[#0C0E14]' : 'bg-gradient-to-l from-gray-50'
        } to-transparent`} />

        <div className="flex w-max space-x-4 animate-marquee-reverse pause-marquee py-2">
          {[...row2, ...row2].map((p, i) => (
            <div key={i} className={`flex items-center justify-center p-3 rounded-2xl border transition-all duration-300 group cursor-default min-w-[100px] h-[72px] ${cardBg}`}>
              <img
                src={p.logo}
                alt={p.name}
                title={p.name}
                className="max-h-[48px] max-w-[80px] w-auto h-auto object-contain group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
