import React, { useState } from 'react';
import { defaultArticles } from '../data/news';
import { Newspaper, Calendar, Clock, ArrowRight, X, ExternalLink, Sparkles } from 'lucide-react';

// Show only top 6 on homepage, full list on news page
const INITIAL_SHOW = 6;

export default function NewsSection({ darkMode = true, fullPage = false }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showAll, setShowAll] = useState(fullPage);

  // Auto-open article if URL matches /news/view/:id
  React.useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/\/news\/view\/(\d+)/);
    if (match && match[1]) {
      const art = defaultArticles.find(a => a.id === match[1]);
      if (art) {
        setSelectedArticle(art);
      }
    }
  }, []);

  const openArticle = (art) => {
    setSelectedArticle(art);
    if (window.history && window.history.pushState) {
      window.history.pushState({ articleId: art.id }, '', `/news/view/${art.id}`);
    }
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', window.location.pathname.startsWith('/news') ? '/news' : '/');
    }
  };

  const visibleArticles = showAll ? defaultArticles : defaultArticles.slice(0, INITIAL_SHOW);

  const sectionBg  = darkMode ? 'bg-[#0B0C10] border-white/5' : 'bg-white border-gray-200';
  const cardBg     = darkMode ? 'bg-[#12141A] border-white/10 hover:border-[#8d1864]/50' : 'bg-gray-50 border-gray-200 hover:border-[#8d1864]/50 shadow-sm';
  const titleColor = darkMode ? 'text-white' : 'text-gray-900';
  const descColor  = darkMode ? 'text-slate-300' : 'text-gray-600';
  const mutedColor = darkMode ? 'text-slate-400' : 'text-gray-500';

  return (
    <section id="news-press" className={`py-20 relative border-t ${sectionBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#8d1864]/10 border border-[#8d1864]/20 text-xs font-semibold text-[#8d1864] mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Actualités &amp; Médias</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight ${titleColor}`}>
              Dernières Publications &amp; Événements
            </h2>
            <p className={`text-xs sm:text-sm mt-2 font-light max-w-xl ${descColor}`}>
              Les tendances du marketing d'influence, nos passages télévisés (Canal+ Afrique) et nos analyses de l'écosystème digital.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <span className={`text-xs ${mutedColor}`}>
              Édité par <strong className={titleColor}>SN MAGAZINE</strong> • {defaultArticles.length} articles
            </span>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => openArticle(article)}
              className={`rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:shadow-xl transform hover:-translate-y-1 ${cardBg}`}
            >
              <div>
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={e => { e.currentTarget.src = 'https://res.cloudinary.com/dwp4isflu/image/upload/v1791240966/slider-21_uxhcy9.png'; }}
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className={`flex items-center space-x-3 text-[11px] mb-2 ${mutedColor}`}>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{article.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </span>
                    <span className={`ml-auto text-[10px] font-mono ${mutedColor}`}>#{article.id}</span>
                  </div>

                  <h3 className={`font-display font-bold text-base group-hover:text-[#8d1864] transition-colors line-clamp-2 leading-snug ${titleColor}`}>
                    {article.title}
                  </h3>

                  <p className={`text-xs mt-2 line-clamp-3 font-light leading-relaxed ${descColor}`}>
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom link */}
              <div className="p-5 pt-0">
                <div className={`pt-3 border-t flex items-center justify-between text-xs font-semibold text-[#8d1864] ${
                  darkMode ? 'border-white/10' : 'border-gray-200'
                }`}>
                  <span>Lire l'article complet</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Show More */}
        {!showAll && defaultArticles.length > INITIAL_SHOW && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#8d1864] hover:bg-[#751352] text-white text-xs font-bold shadow-md shadow-[#8d1864]/25 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>Voir tous les articles ({defaultArticles.length})</span>
            </button>
          </div>
        )}

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
          onClick={closeArticle}
        >
          <div 
            className="relative w-full max-w-2xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl bg-[#101218] my-8 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeArticle}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                onError={e => { e.currentTarget.src = 'https://res.cloudinary.com/dwp4isflu/image/upload/v1791240966/slider-21_uxhcy9.png'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101218] via-transparent to-transparent" />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center flex-wrap gap-2 text-xs text-[#8d1864] font-semibold mb-3">
                <span>{selectedArticle.category}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{selectedArticle.date}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{selectedArticle.readTime}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white mb-4 leading-snug">
                {selectedArticle.title}
              </h2>

              <p className="text-sm text-slate-300 font-light leading-relaxed mb-6 whitespace-pre-line">
                {selectedArticle.content}
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs text-slate-400">SENINFLUENCEURS • SN MAGAZINE</span>
                <div className="flex items-center space-x-3">
                  {selectedArticle.canonicalUrl && (
                    <a
                      href={selectedArticle.canonicalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 flex items-center space-x-1.5 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Voir sur seninfluenceurs.com</span>
                    </a>
                  )}
                  <button
                    onClick={closeArticle}
                    className="px-4 py-2 rounded-xl bg-[#8d1864] hover:bg-[#751352] text-white text-xs font-semibold"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
