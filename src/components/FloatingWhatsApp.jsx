import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="mb-2 max-w-xs glass-dropdown rounded-2xl p-3 shadow-2xl border border-white/20 text-xs text-slate-200 animate-in fade-in slide-in-from-bottom-2 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center space-x-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-white">
                <img src="/logo.webp" alt="Conseiller" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-black" />
            </div>
            <div>
              <div className="font-bold text-white text-[11px]">Équipe SENINFLUENCEURS</div>
              <div className="text-[10px] text-slate-400">En ligne pour vos briefs et castings</div>
            </div>
          </div>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <a
        href="https://api.whatsapp.com/send?phone=+221772619754&text=Bonjour%20SENINFLUENCEURS,%20je%20souhaite%20des%20informations%20sur%20vos%20prestations."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 transition-all duration-300 transform hover:scale-110 focus:outline-none"
        aria-label="Contacter sur WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping opacity-75 pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white/20 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
}
