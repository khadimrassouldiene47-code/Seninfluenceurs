import React, { useState } from 'react';
import { ArrowUp, Mail, MapPin, Phone, MessageCircle, Send, Lock } from 'lucide-react';

export default function Footer({ onNavigate, onOpenLegal, onOpenAdmin, darkMode }) {
  const [email, setEmail]       = useState('');
  const [done, setDone]         = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (email) { setDone(true); setEmail(''); setTimeout(() => setDone(false), 5000); }
  };

  const bg          = darkMode ? 'bg-[#060709] border-white/10 text-slate-400' : 'bg-gray-900 border-gray-800 text-gray-400';
  const textPrimary = 'text-white';
  const divider     = darkMode ? 'border-white/10' : 'border-gray-700';
  const hover       = 'hover:text-white transition-colors';

  return (
    <footer className={`${bg} border-t text-xs relative`}>

      {/* Newsletter */}
      <div className={`border-b ${divider} py-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-bold text-brand-500 uppercase tracking-widest block mb-1">Newsletter</span>
              <h3 className={`text-xl font-display font-bold ${textPrimary}`}>Restez au cœur de l'influence africaine</h3>
              <p className="text-gray-400 text-xs mt-1">Analyses, tendances et opportunités chaque mois.</p>
            </div>
            <div className="w-full md:w-auto">
              {done ? (
                <div className="px-5 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                  Merci ! Vous êtes inscrit.
                </div>
              ) : (
                <form onSubmit={submit} className="flex items-center gap-2 w-full md:w-80">
                  <input
                    type="email" required placeholder="Votre email..." value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-500"
                  />
                  <button type="submit" className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-colors shadow-md">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 space-y-4">
            <button onClick={() => onNavigate('home')} className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 bg-white">
                <img src="/logo.png" alt="Logo"
                  className="w-full h-full object-contain" onError={e => { e.currentTarget.src = '/logo.webp'; }} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-black text-xl text-white tracking-tight">SEN<span className="text-brand-500">INFLUENCEURS</span></span>
                <span className="text-[9px] uppercase tracking-wider text-gray-400">Première Agence • Dakar</span>
              </div>
            </button>

            <p className="text-xs text-gray-300 font-light leading-relaxed max-w-sm">
              Fondée par Pape Momar Ndiaye, SENINFLUENCEURS est la référence du marketing d'influence, du management de talents et de la production audiovisuelle en Afrique francophone.
            </p>

            {/* Social icons */}
            <div className="flex items-center flex-wrap gap-2 pt-1">
              {[
                { label: 'TK', href: 'http://tiktok.com/@seninfluenceurs?_t=8ebJVP1K2h3&_r=1' },
                { label: 'IG', href: 'https://www.instagram.com/invites/contact/?i=1puzpkvg2oaqk&utm_content=nv3e3k1' },
                { label: 'IN', href: 'https://www.linkedin.com/company/sen-influeunceurs/' },
                { label: 'FB', href: 'https://www.facebook.com/profile.php?id=100084953302570' },
                { label: 'YT', href: 'https://youtube.com/watch?v=mNXB7m8dOBE&feature=share' },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-brand-600/80 text-gray-300 hover:text-white border border-white/10 hover:border-brand-600/50 flex items-center justify-center transition-all text-[10px] font-bold">
                  {label}
                </a>
              ))}
              <a href="https://api.whatsapp.com/send?phone=+221772619754" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-500/30 flex items-center justify-center transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                ['home',        'Accueil'],
                ['influencers', 'Influenceurs (+300)'],
                ['services',    'Expertises & Studio'],
                ['about',       'L\'Agence'],
                ['news',        'Actualités'],
                ['contact',     'Lancer un Brief'],
              ].map(([id, label]) => (
                <li key={id}>
                  <button onClick={() => onNavigate(id)} className={hover}>{label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Pôles */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">Nos Pôles</h4>
            <ul className="space-y-2.5">
              {['Marketing d\'Influence', 'SENINFLUENCEURS STUDIO', 'SN MAGAZINE', 'SENINFLUENCEURS TV', 'Relations Presse', 'Production Podcasts'].map(p => (
                <li key={p} className="text-gray-400">{p}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">Bureaux Dakar</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                <span>29 Bvd Libération, Imm. Fahd, Dakar</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="https://api.whatsapp.com/send?phone=+221772619754" target="_blank" rel="noopener noreferrer" className={hover}>+221 77 261 97 54</a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="tel:+221772619754" className={hover}>77 261 97 54</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href="mailto:info@seninfluenceurs.com" className={hover + ' truncate'}>info@seninfluenceurs.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className={`mt-14 pt-6 border-t ${divider} flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <div className="text-[11px] text-gray-500">
            © 2026 SENINFLUENCEURS. Tous droits réservés • Membre FOBAF.
          </div>

          <div className="flex items-center flex-wrap gap-3 text-[11px]">
            <button onClick={() => onOpenLegal('cgu')} className={hover}>CGU</button>
            <span className="text-gray-600">•</span>
            <button onClick={() => onOpenLegal('privacy')} className={hover}>RGPD / Confidentialité</button>
            <span className="text-gray-600">•</span>

            {/* Admin button in footer — discret */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-amber-300 border border-white/8 hover:border-amber-500/30 transition-all text-[11px]"
              title="Espace Administrateur"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
              title="Retour en haut"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Haut</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
