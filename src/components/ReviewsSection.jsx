import React from 'react';
import { Star, MessageSquare, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

const GOOGLE_REVIEW_URL = "https://www.google.com/search?q=seninfluenseurs#lrd=0xec10d7f7febb331:0x34099f41a43eb92,3,,,,";

const REVIEWS = [
  {
    author: "Mamadou Diop",
    role: "Directeur Marketing Digital • Marque FMCG",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    date: "Il y a 3 semaines",
    comment: "Collaboration exceptionnelle avec SENINFLUENCEURS sur notre campagne nationale. Le casting des créateurs était parfait, les statistiques fournies transparentes et le ROI au rendez-vous. La référence à Dakar !"
  },
  {
    author: "Fatou Bintou Ndiaye",
    role: "Responsable Communication • FinTech Dakar",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    date: "Il y a 1 mois",
    comment: "Une agence professionnelle qui comprend les codes des réseaux sociaux en Afrique de l'Ouest. Le tournage dans leur studio à l'immeuble Fahd s'est déroulé dans des conditions techniques impeccables."
  },
  {
    author: "Cheikh Tidiane Sy",
    role: "Créateur de Contenu & Humoriste (1.2M abonnés)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    date: "Il y a 2 mois",
    comment: "Faire partie de l'écurie SENINFLUENCEURS a propulsé ma carrière. Ils gèrent les contrats avec les grandes marques de manière rigoureuse et nous protègent juridiquement. Merci à toute l'équipe !"
  },
  {
    author: "Aïcha Diallo",
    role: "Chef de Marque • Télécoms & Tech",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    date: "Il y a 3 mois",
    comment: "Campagne 360 menée avec brio. Brief respecté, suivi en temps réel et couverture média assurée sur SN Magazine et les chaînes télé partenaires. Je recommande les yeux fermés."
  }
];

export default function ReviewsSection({ darkMode = true }) {
  const sectionBg  = darkMode ? 'bg-[#090A0D] border-white/5' : 'bg-white border-gray-200';
  const cardBg     = darkMode ? 'bg-[#12141A] border-white/10 hover:border-white/20' : 'bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm';
  const titleColor = darkMode ? 'text-white' : 'text-gray-900';
  const descColor  = darkMode ? 'text-slate-300' : 'text-gray-600';
  const mutedColor = darkMode ? 'text-slate-400' : 'text-gray-500';

  return (
    <section id="google-reviews" className={`py-20 relative border-t ${sectionBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#8d1864]/10 border border-[#8d1864]/20 text-xs font-semibold text-[#8d1864] mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Avis &amp; Témoignages Vérifiés</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight ${titleColor}`}>
              Ce que nos clients et talents disent de nous
            </h2>
            <p className={`text-sm sm:text-base mt-3 font-light ${descColor}`}>
              Découvrez les retours d'expérience d'entreprises partenaires, annonceurs et créateurs accompagnés par SENINFLUENCEURS à Dakar et à l'international.
            </p>
          </div>

          {/* Google rating badge card */}
          <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center gap-4 shrink-0 ${cardBg}`}>
            <div className="flex items-center space-x-3">
              {/* Google G icon */}
              <div className="w-12 h-12 rounded-xl bg-white p-2.5 flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </div>

              <div>
                <div className="flex items-center space-x-1.5">
                  <span className={`text-2xl font-display font-extrabold ${titleColor}`}>5.0</span>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div className={`text-xs ${mutedColor}`}>
                  Avis vérifiés sur Google Business
                </div>
              </div>
            </div>

            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#8d1864] hover:bg-[#751352] text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-md shadow-[#8d1864]/25 transition-all hover:scale-105"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Laisser un avis</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between hover:shadow-lg ${cardBg}`}
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center space-x-1 mb-3 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className={`text-[11px] ml-auto ${mutedColor}`}>{rev.date}</span>
                </div>

                {/* Comment */}
                <p className={`text-xs sm:text-sm font-light leading-relaxed mb-6 italic ${descColor}`}>
                  "{rev.comment}"
                </p>
              </div>

              {/* Author info */}
              <div className={`pt-4 border-t flex items-center space-x-3 ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className={`font-bold text-xs truncate flex items-center space-x-1 ${titleColor}`}>
                    <span>{rev.author}</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  </div>
                  <div className={`text-[10px] truncate ${mutedColor}`}>
                    {rev.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 text-center">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-[#8d1864] hover:underline"
          >
            <span>Consulter notre fiche Google Maps et tous les avis clients</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
