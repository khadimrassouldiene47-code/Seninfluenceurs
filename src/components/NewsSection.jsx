import React, { useState } from 'react';
import { defaultArticles } from '../data/news';
import { Newspaper, Calendar, Clock, ArrowRight, X, Sparkles, Share2 } from 'lucide-react';

export default function NewsSection({ darkMode = true }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

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
              <span>Actualités du Jour &amp; Médias</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight ${titleColor}`}>
              Dernières Publications &amp; Événements
            </h2>
            <p className={`text-xs sm:text-sm mt-2 font-light max-w-xl ${descColor}`}>
              Les tendances du marketing d'influence, nos passages télévisés (Canal+ Afrique) et nos analyses de l'écosystème.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <span className={`text-xs ${mutedColor}`}>
              Édité par <strong className={titleColor}>SN MAGAZINE</strong>
            </span>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {defaultArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className={`rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:shadow-xl transform hover:-translate-y-1 ${cardBg}`}
            >
              <div>
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                  <span>Lire l’article complet</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-2xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl bg-[#101218] my-8 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101218] via-transparent to-transparent" />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center space-x-3 text-xs text-[#8d1864] font-semibold mb-2">
                <span>{selectedArticle.category}</span>
                <span>•</span>
                <span className="text-slate-400">{selectedArticle.date}</span>
                <span>•</span>
                <span className="text-slate-400">{selectedArticle.readTime}</span>
              </div>

              <h2 className="text-2xl font-display font-extrabold text-white mb-4">
                {selectedArticle.title}
              </h2>

              <p className="text-sm text-slate-300 font-light leading-relaxed mb-6 whitespace-pre-line">
                {selectedArticle.content}
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">SENINFLUENCEURS • SN MAGAZINE</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 rounded-xl bg-[#8d1864] hover:bg-[#751352] text-white text-xs font-semibold"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
