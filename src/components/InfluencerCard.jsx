import React from 'react';
import { BadgeCheck, MessageCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import { getWhatsAppInfluencerLink } from '../data/influencers';

export default function InfluencerCard({ influencer, onSelect, darkMode }) {
  const whaUrl = getWhatsAppInfluencerLink(influencer.name, influencer.category);

  const cardBg = darkMode
    ? 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 hover:border-brand-500/40'
    : 'bg-white hover:bg-gray-50 border-gray-100 hover:border-brand-300 shadow-sm hover:shadow-xl';

  // Category badge styling
  const cat = (influencer.category || '').toLowerCase();
  let catBadgeCls = 'bg-emerald-500/70 text-white border-emerald-400/40';
  if (cat.includes('top')) {
    catBadgeCls = 'bg-[#8d1864]/80 text-white border-[#8d1864]/50';
  } else if (cat.includes('artiste')) {
    catBadgeCls = 'bg-purple-600/80 text-white border-purple-400/50';
  } else if (cat.includes('diaspora')) {
    catBadgeCls = 'bg-sky-600/80 text-white border-sky-400/50';
  }

  return (
    <div className={`group relative rounded-2xl border p-2.5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${cardBg}`}>

      <div>
        {/* Photo Container */}
        <div
          onClick={() => onSelect(influencer)}
          className="relative aspect-[3/4] w-full rounded-xl overflow-hidden cursor-pointer bg-slate-900"
        >
          <img
            src={influencer.photo}
            alt={influencer.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={e => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          {/* Top badges: Real Category + Featured */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold backdrop-blur-md border shadow-sm ${catBadgeCls}`}>
              {influencer.category || 'Influenceur'}
            </span>
            {influencer.featured && (
              <span className="p-1 rounded-full bg-brand-600/90 text-white shadow-sm" title="En Vedette">
                <Sparkles className="w-2.5 h-2.5" />
              </span>
            )}
          </div>


        </div>

        {/* Info */}
        <div className="mt-2.5 px-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-brand-600 uppercase tracking-wide truncate">
              {influencer.niche}
            </span>
            {influencer.verified && (
              <BadgeCheck className="w-4 h-4 text-sky-400 shrink-0" title="Profil Officiel Vérifié" />
            )}
          </div>

          <h3
            onClick={() => onSelect(influencer)}
            className={`font-display font-bold text-sm cursor-pointer truncate mt-0.5 ${
              darkMode ? 'text-white hover:text-brand-300' : 'text-gray-900 hover:text-brand-600'
            }`}
          >
            {influencer.name}
          </h3>

          <p className={`text-[11px] line-clamp-2 mt-1 font-light leading-relaxed ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            {influencer.bio || "Créateur de contenu partenaire officiel SENINFLUENCEURS."}
          </p>
        </div>
      </div>

      {/* Bottom Area: Details & WhatsApp Actions */}
      <div className="mt-3 pt-2.5 border-t border-white/10 dark:border-white/10 border-gray-100">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSelect(influencer)}
            className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-semibold border transition-colors flex items-center justify-center space-x-1 cursor-pointer ${
              darkMode
                ? 'bg-white/5 hover:bg-white/12 text-slate-200 border-white/10'
                : 'bg-gray-50 hover:bg-brand-50 text-gray-700 hover:text-brand-700 border-gray-200'
            }`}
          >
            <span>Détails</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
          <a
            href={whaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 transition-all cursor-pointer"
            title="Contacter l'agence pour ce talent"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </div>
  );
}
