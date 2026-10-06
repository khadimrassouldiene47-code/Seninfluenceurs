import React, { useState, useMemo, useEffect } from 'react';
import InfluencerCard from './InfluencerCard';
import { influencerCategories } from '../data/influencers';
import { Search, SlidersHorizontal, Users, Sparkles, ChevronDown } from 'lucide-react';

export default function InfluencersCatalog({ influencers, onSelectInfluencer, darkMode }) {
  const [category,     setCategory]     = useState("Tous");
  const [searchQuery,  setSearchQuery]  = useState("");
  const [sortBy,       setSortBy]       = useState("followers");
  const [visibleCount, setVisibleCount] = useState(30);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(30);
  }, [category, searchQuery, sortBy]);

  const filtered = useMemo(() => {
    return influencers
      .filter(item => {
        let matchCat = true;
        if (category === "Top Influenceurs") {
          matchCat = item.category === "Top Influenceurs" || item.category === "Macro-influenceur" || item.featured;
        } else if (category === "Créateurs de contenu") {
          matchCat = item.category === "Créateurs de contenu" || item.category === "Micro-influenceur";
        } else if (category !== "Tous") {
          matchCat = item.niche.toLowerCase().includes(category.toLowerCase());
        }

        let matchQ = true;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          matchQ = item.name.toLowerCase().includes(q)
               || item.niche.toLowerCase().includes(q)
               || (item.bio && item.bio.toLowerCase().includes(q));
        }
        return matchCat && matchQ;
      })
      .sort((a, b) => {
        if (sortBy === "followers")   return (b.followersCount || 0) - (a.followersCount || 0);
        if (sortBy === "name")        return a.name.localeCompare(b.name);
        if (sortBy === "engagement")  return (parseFloat(b.engagementRate) || 0) - (parseFloat(a.engagementRate) || 0);
        return 0;
      });
  }, [influencers, category, searchQuery, sortBy]);

  /* ── Style tokens ── */
  const sectionBg  = darkMode ? 'bg-[#090A0D]' : 'bg-white';
  const pillBg     = (active) => active
    ? 'bg-brand-600 text-white shadow-sm'
    : darkMode
      ? 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10 hover:border-white/20'
      : 'bg-gray-100 hover:bg-brand-50 text-gray-600 hover:text-brand-700 border border-gray-200';
  const panelCls   = darkMode
    ? 'bg-white/[0.03] border-white/10'
    : 'bg-white border-gray-200 shadow-sm';
  const inputCls   = darkMode
    ? 'bg-white/[0.04] border-white/10 text-white placeholder-slate-400 focus:border-brand-500'
    : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-brand-500';
  const labelColor = darkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = darkMode ? 'text-slate-400' : 'text-gray-500';

  return (
    <section id="influencers-catalog" className={`py-20 relative ${sectionBg}`}>
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border text-xs font-semibold mb-4 ${
            darkMode ? 'bg-brand-600/10 border-brand-600/20 text-brand-400' : 'bg-brand-50 border-brand-200 text-brand-700'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catalogue Officiel des Talents</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight ${labelColor}`}>
            Les Meilleurs Créateurs du Sénégal
          </h2>
          <p className={`text-sm sm:text-base mt-3 font-light ${mutedColor}`}>
            Sélectionnés pour leur authenticité, leur taux d'engagement et leur affinité avec les grandes marques.
          </p>
        </div>

        {/* Filter bar */}
        <div className={`rounded-2xl p-4 sm:p-5 border mb-8 space-y-4 ${panelCls}`}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-full sm:max-w-sm">
              <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${mutedColor}`} />
              <input
                type="text"
                placeholder="Rechercher : nom, thématique..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${inputCls}`}
              />
            </div>

            <div className="flex items-center gap-3 justify-between sm:justify-end">
              <span className={`text-xs whitespace-nowrap ${mutedColor}`}>
                <strong className={labelColor}>{filtered.length}</strong> profil(s)
              </span>
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className={`w-3.5 h-3.5 ${mutedColor}`} />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className={`border text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-brand-500 ${
                    darkMode ? 'bg-[#12141A] border-white/10 text-slate-200' : 'bg-gray-50 border-gray-200 text-gray-700'
                  }`}
                >
                  <option value="followers">Plus suivis</option>
                  <option value="engagement">Taux d'engagement</option>
                  <option value="name">Alphabétique</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 -mb-1">
            {influencerCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${pillBg(category === cat)}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.slice(0, visibleCount).map(inf => (
                <InfluencerCard key={inf.id} influencer={inf} onSelect={onSelectInfluencer} darkMode={darkMode} />
              ))}
            </div>

            {/* Load More Button */}
            {filtered.length > visibleCount && (
              <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setVisibleCount(prev => prev + 30)}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 transition-all hover:scale-105"
                >
                  <ChevronDown className="w-4 h-4" />
                  <span>Charger plus de créateurs ({filtered.length - visibleCount} restants)</span>
                </button>
                <button
                  onClick={() => setVisibleCount(filtered.length)}
                  className={`px-4 py-3 rounded-xl text-xs font-medium border transition-colors ${
                    darkMode
                      ? 'border-white/10 hover:border-white/20 text-slate-300 hover:text-white bg-white/[0.04]'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50'
                  }`}
                >
                  Tout afficher ({filtered.length})
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={`text-center py-16 rounded-2xl border ${darkMode ? 'border-white/10 bg-white/[0.02]' : 'border-gray-200 bg-gray-50'}`}>
            <Users className={`w-12 h-12 mx-auto mb-3 ${mutedColor}`} />
            <h3 className={`text-lg font-bold ${labelColor}`}>Aucun résultat</h3>
            <p className={`text-xs max-w-md mx-auto mt-1 mb-5 ${mutedColor}`}>Essayez un autre mot-clé ou réinitialisez les filtres.</p>
            <button
              onClick={() => { setCategory("Tous"); setSearchQuery(""); }}
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Custom request CTA */}
        <div className={`mt-14 rounded-2xl p-6 sm:p-8 border flex flex-col md:flex-row items-center justify-between gap-6 ${
          darkMode ? 'border-brand-600/20 bg-brand-950/30' : 'border-brand-200 bg-brand-50'
        }`}>
          <div>
            <span className="text-xs font-semibold text-brand-600 uppercase tracking-widest block mb-1">Casting sur-mesure</span>
            <h3 className={`text-xl sm:text-2xl font-display font-bold ${labelColor}`}>
              Besoin d'un profil spécifique pour votre campagne ?
            </h3>
            <p className={`text-xs sm:text-sm mt-1 max-w-xl ${mutedColor}`}>
              Au-delà de ce catalogue, nous activons notre réseau exclusif pour sourcer le profil parfait.
            </p>
          </div>
          <a
            href="https://api.whatsapp.com/send?phone=+221772619754&text=Bonjour%20SENINFLUENCEURS,%20je%20recherche%20un%20profil%20d%27influenceur%20spécifique."
            target="_blank" rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm whitespace-nowrap shadow-lg shadow-brand-600/20 transition-all"
          >
            Demander un Casting Privé
          </a>
        </div>

      </div>
    </section>
  );
}
