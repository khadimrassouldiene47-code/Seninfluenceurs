import React, { useState, useEffect } from 'react';
import { Search, X, Users, Newspaper, ArrowRight, Video, Sparkles } from 'lucide-react';
import { defaultInfluencers } from '../data/influencers';
import { defaultArticles } from '../data/news';

export default function GlobalSearchModal({ isOpen, onClose, onSelectInfluencer, onNavigate }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredInfluencers = query.trim()
    ? defaultInfluencers.filter(
        (i) =>
          i.name.toLowerCase().includes(query.toLowerCase()) ||
          i.niche.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : defaultInfluencers.slice(0, 4);

  const filteredArticles = query.trim()
    ? defaultArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.category.toLowerCase().includes(query.toLowerCase())
      )
    : defaultArticles.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl glass-dropdown rounded-3xl border border-white/20 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 bg-[#101218]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-white/10 p-4 flex items-center">
          <Search className="w-5 h-5 text-brand-400 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Rechercher un influenceur, un service, un article..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          
          {/* Section: Influencers */}
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5 text-brand-400" />
              <span>Influenceurs &amp; Créateurs</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredInfluencers.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onClose();
                    onSelectInfluencer(item);
                  }}
                  className="flex items-center space-x-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-brand-500/30 cursor-pointer transition-all"
                >
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-9 h-9 rounded-lg object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100";
                    }}
                  />
                  <div className="flex-1 truncate">
                    <div className="text-xs font-bold text-white truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-400">{item.niche} • {item.followers}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Section: Articles */}
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <Newspaper className="w-3.5 h-3.5 text-amber-400" />
              <span>Articles &amp; Médias</span>
            </div>
            <div className="space-y-2">
              {filteredArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onClose();
                    onNavigate('news');
                  }}
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-semibold text-white line-clamp-1">{art.title}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{art.category} • {art.date}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-2" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <span>Tapez Échap pour quitter</span>
          <span className="text-brand-400 font-medium">www.seninfluenceurs.com</span>
        </div>
      </div>
    </div>
  );
}
