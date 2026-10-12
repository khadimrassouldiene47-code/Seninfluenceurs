import React from 'react';
import { BadgeCheck, MessageCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import { getWhatsAppInfluencerLink } from '../data/influencers';

// Helper to sanitize / build valid social URLs for each creator
function getCreatorSocials(influencer) {
  const socials = influencer.socials || {};
  const cleanName = (influencer.name || '')
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, '');

  const list = [];

  // TikTok
  const tiktokUrl = socials.tiktok && socials.tiktok.trim() !== '' && socials.tiktok !== 'https://tiktok.com'
    ? socials.tiktok
    : cleanName ? `https://www.tiktok.com/@${cleanName}` : null;
  if (tiktokUrl) {
    list.push({
      platform: 'TikTok',
      url: tiktokUrl,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.78 1.52V6.85a4.85 4.85 0 01-1.01-.16z"/>
        </svg>
      ),
      hoverCls: 'hover:bg-black hover:text-white hover:border-black/50 dark:hover:bg-white dark:hover:text-black'
    });
  }

  // Instagram
  const instaUrl = socials.instagram && socials.instagram.trim() !== '' && socials.instagram !== 'https://instagram.com'
    ? socials.instagram
    : cleanName ? `https://www.instagram.com/${cleanName}` : null;
  if (instaUrl) {
    list.push({
      platform: 'Instagram',
      url: instaUrl,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      hoverCls: 'hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent'
    });
  }

  // YouTube
  if (socials.youtube && socials.youtube.includes('youtube.com')) {
    list.push({
      platform: 'YouTube',
      url: socials.youtube,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
        </svg>
      ),
      hoverCls: 'hover:bg-red-600 hover:text-white hover:border-red-600'
    });
  }

  // Facebook
  if (socials.facebook && socials.facebook.includes('facebook.com') && socials.facebook !== 'https://facebook.com') {
    list.push({
      platform: 'Facebook',
      url: socials.facebook,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      hoverCls: 'hover:bg-blue-600 hover:text-white hover:border-blue-600'
    });
  }

  return list;
}

export default function InfluencerCard({ influencer, onSelect, darkMode }) {
  const whaUrl = getWhatsAppInfluencerLink(influencer.name, influencer.category);
  const socialLinks = getCreatorSocials(influencer);

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

      {/* Bottom Area: Social Icons + Actions */}
      <div className="mt-3 pt-2.5 border-t border-white/10 dark:border-white/10 border-gray-100 flex flex-col gap-2">
        
        {/* Direct Social Media Links on Card */}
        {socialLinks.length > 0 && (
          <div className="flex items-center gap-1.5 justify-start">
            {socialLinks.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`p-1.5 rounded-lg text-slate-400 dark:text-slate-400 border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 transition-all duration-200 cursor-pointer ${s.hoverCls}`}
                title={`Ouvrir le compte ${s.platform} de ${influencer.name}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        )}

        {/* Details & WhatsApp Actions */}
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
