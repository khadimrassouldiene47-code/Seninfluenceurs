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
              <span className="text-[11px] font-bold uppercase tracking-widest block mb-1" style={{color:'#8d1864'}}>Newsletter</span>
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
                  <button type="submit" className="p-2.5 rounded-xl bg-[#8d1864] hover:bg-[#751352] text-white transition-colors shadow-md cursor-pointer">
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
                <span className="font-display font-black text-xl tracking-tight" style={{color:'#8d1864'}}>SEN<span style={{color:'#8d1864'}}>INFLUENCEURS</span></span>
                <span className="text-[9px] uppercase tracking-wider text-gray-400">Première Agence • Dakar</span>
              </div>
            </button>

            <p className="text-xs text-gray-300 font-light leading-relaxed max-w-sm">
              Fondée par Pape Momar Ndiaye, SENINFLUENCEURS est la référence du marketing d'influence, du management de talents et de la production audiovisuelle en Afrique francophone.
            </p>

            {/* Social icons */}
            <div className="flex items-center flex-wrap gap-2 pt-1">
              {[
                {
                  label: 'TikTok', href: 'http://tiktok.com/@seninfluenceurs?_t=8ebJVP1K2h3&_r=1',
                  svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.78 1.52V6.85a4.85 4.85 0 01-1.01-.16z"/></svg>
                },
                {
                  label: 'Instagram', href: 'https://www.instagram.com/invites/contact/?i=1puzpkvg2oaqk&utm_content=nv3e3k1',
                  svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                },
                {
                  label: 'LinkedIn', href: 'https://www.linkedin.com/company/sen-influeunceurs/',
                  svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                },
                {
                  label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100084953302570',
                  svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                },
                {
                  label: 'YouTube', href: 'https://youtube.com/watch?v=mNXB7m8dOBE&feature=share',
                  svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                },
              ].map(({ label, href, svg }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                  className="w-8 h-8 rounded-lg bg-white/[0.05] text-gray-300 hover:text-white border border-white/10 flex items-center justify-center transition-all"
                  style={{transition:'all .2s'}}
                  onMouseEnter={e=>{e.currentTarget.style.background='#8d1864';e.currentTarget.style.borderColor='#8d1864'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='';e.currentTarget.style.borderColor=''}}>
                  {svg}
                </a>
              ))}
              <a href="https://api.whatsapp.com/send?phone=+221772619754" target="_blank" rel="noopener noreferrer" title="WhatsApp"
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
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{color:'#8d1864'}} />
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
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-[#8d1864] border border-white/8 hover:border-[#8d1864]/40 transition-all text-[11px] cursor-pointer"
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
