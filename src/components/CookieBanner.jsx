import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieBanner({ onOpenPrivacy }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('seninfluenceurs_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('seninfluenceurs_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('seninfluenceurs_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-5 right-5 sm:left-auto sm:right-24 sm:max-w-md z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="glass-dropdown rounded-2xl p-4 sm:p-5 border border-white/20 shadow-2xl bg-[#12151D] text-xs text-slate-300">
        <div className="flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h5 className="font-bold text-white text-xs mb-1">
              Respect de votre vie privée
            </h5>
            <p className="font-light leading-relaxed text-[11px] text-slate-300">
              Nous utilisons des cookies essentiels pour mesurer l'audience et optimiser votre expérience de navigation sur www.seninfluenceurs.com.
            </p>
            <div className="mt-3 flex items-center space-x-2">
              <button
                onClick={handleAccept}
                className="px-3.5 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-[11px] shadow-sm"
              >
                Accepter
              </button>
              <button
                onClick={handleDecline}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[11px]"
              >
                Refuser
              </button>
              <button
                onClick={onOpenPrivacy}
                className="text-[11px] text-slate-400 hover:text-white underline ml-1"
              >
                En savoir plus
              </button>
            </div>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
