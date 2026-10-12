import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, User, Mail, Phone, Globe, Instagram, AtSign, Award } from 'lucide-react';

export default function JoinSection({ darkMode = true }) {
  const [formData, setFormData] = useState({
    fullName: '',
    stageName: '',
    email: '',
    phone: '',
    primaryPlatform: 'TikTok',
    handle: '',
    niche: 'Humour & Comédie',
    followersRange: '50K - 200K',
    location: 'Dakar',
    portfolioUrl: '',
    motivation: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const message = encodeURIComponent(
      `🌟 *CANDIDATURE TALENT — REJOINDRE SENINFLUENCEURS*\n\n` +
      `👤 *Nom complet :* ${formData.fullName}\n` +
      `🎭 *Pseudo / Nom d'artiste :* ${formData.stageName || formData.fullName}\n` +
      `📱 *Téléphone :* ${formData.phone}\n` +
      `✉️ *Email :* ${formData.email}\n` +
      `🌐 *Plateforme principale :* ${formData.primaryPlatform}\n` +
      `🔗 *Lien / Handle :* ${formData.handle}\n` +
      `🎯 *Niche :* ${formData.niche}\n` +
      `👥 *Abonnés :* ${formData.followersRange}\n` +
      `📍 *Localisation :* ${formData.location}\n` +
      (formData.portfolioUrl ? `📁 *Portfolio :* ${formData.portfolioUrl}\n` : '') +
      (formData.motivation ? `💬 *Motivation :* ${formData.motivation}\n` : '') +
      `\n_Candidature transmise via seninfluenceurs.com_`
    );

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(`https://api.whatsapp.com/send?phone=+221772619754&text=${message}`, '_blank');
    }, 400);
  };

  const sectionBg  = darkMode ? 'bg-[#0B0C10] border-white/5' : 'bg-gray-50 border-gray-200';
  const cardBg     = darkMode ? 'bg-[#12141A] border-white/10 shadow-2xl' : 'bg-white border-gray-200 shadow-xl';
  const inputBg    = darkMode ? 'bg-white/[0.04] border-white/10 text-white placeholder-slate-500 focus:border-[#8d1864]' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#8d1864]';
  const titleColor = darkMode ? 'text-white' : 'text-gray-900';
  const descColor  = darkMode ? 'text-slate-300' : 'text-gray-600';
  const labelColor = darkMode ? 'text-slate-300' : 'text-gray-700';

  return (
    <section id="rejoindre-seninfluenceurs" className={`py-20 relative border-t ${sectionBg}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#8d1864]/10 border border-[#8d1864]/20 text-xs font-semibold text-[#8d1864] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Casting Créateurs &amp; Talents</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight ${titleColor}`}>
            Rejoignez l'Écurie SENINFLUENCEURS
          </h2>
          <p className={`text-sm sm:text-base mt-3 font-light ${descColor}`}>
            Vous êtes créateur de contenu, humoriste, artiste ou voix émergente au Sénégal ou dans la diaspora ? Intégrez notre catalogue officiel et accédez aux briefs des plus grandes marques.
          </p>
        </div>

        {/* Card Form */}
        <div className={`rounded-3xl p-6 sm:p-10 border ${cardBg}`}>
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className={`text-2xl font-bold font-display ${titleColor}`}>
                Candidature Transmise avec Succès !
              </h3>
              <p className={`text-sm max-w-md mx-auto ${descColor}`}>
                Votre profil a été transmis à notre équipe de détection de talents. Nous analysons vos métriques et nous vous contacterons sous 48h sur WhatsApp.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    fullName: '', stageName: '', email: '', phone: '',
                    primaryPlatform: 'TikTok', handle: '', niche: 'Humour & Comédie',
                    followersRange: '50K - 200K', location: 'Dakar', portfolioUrl: '', motivation: ''
                  });
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors"
              >
                Soumettre une autre candidature
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Nom et Prénom *</label>
                  <input
                    required
                    type="text"
                    placeholder="Ex: Pape Momar Ndiaye"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${inputBg}`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Nom de créateur / Pseudo *</label>
                  <input
                    required
                    type="text"
                    placeholder="Ex: The Cleanman, Diodio Glow..."
                    value={formData.stageName}
                    onChange={e => setFormData({ ...formData, stageName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${inputBg}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="contact@creatif.sn"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${inputBg}`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Téléphone / WhatsApp *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+221 77 000 00 00"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${inputBg}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Réseau Principal *</label>
                  <select
                    value={formData.primaryPlatform}
                    onChange={e => setFormData({ ...formData, primaryPlatform: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${inputBg} ${darkMode ? 'bg-[#14172A]' : ''}`}
                  >
                    <option value="TikTok">TikTok</option>
                    <option value="Instagram">Instagram</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Facebook">Facebook</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Snapchat">Snapchat</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Lien Profil / Handle *</label>
                  <input
                    required
                    type="text"
                    placeholder="@monprofil ou lien complet"
                    value={formData.handle}
                    onChange={e => setFormData({ ...formData, handle: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${inputBg}`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Volume d'abonnés *</label>
                  <select
                    value={formData.followersRange}
                    onChange={e => setFormData({ ...formData, followersRange: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${inputBg} ${darkMode ? 'bg-[#14172A]' : ''}`}
                  >
                    <option value="10K - 50K">10K - 50K (Micro-créateur)</option>
                    <option value="50K - 200K">50K - 200K (Créateur établi)</option>
                    <option value="200K - 1M">200K - 1M (Top créateur)</option>
                    <option value="+1M">+1M (Macro-influenceur)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Niche / Thématique *</label>
                  <select
                    value={formData.niche}
                    onChange={e => setFormData({ ...formData, niche: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${inputBg} ${darkMode ? 'bg-[#14172A]' : ''}`}
                  >
                    <option value="Humour & Comédie">Humour & Comédie</option>
                    <option value="Mode & Beauté">Mode & Beauté</option>
                    <option value="Lifestyle & Vlog">Lifestyle & Vlog</option>
                    <option value="Musique & Danse">Musique & Danse</option>
                    <option value="Cinéma & Audiovisuel">Cinéma & Audiovisuel</option>
                    <option value="Sport & Fitness">Sport & Fitness</option>
                    <option value="Cuisine & Gastronomie">Cuisine & Gastronomie</option>
                    <option value="Tech & Gaming">Tech & Gaming</option>
                    <option value="Éducation & Business">Éducation & Business</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Localisation *</label>
                  <select
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${inputBg} ${darkMode ? 'bg-[#14172A]' : ''}`}
                  >
                    <option value="Dakar">Dakar (Sénégal)</option>
                    <option value="Régions Sénégal">Régions (Thiès, Saint-Louis, Mbour...)</option>
                    <option value="Diaspora France">Diaspora — France</option>
                    <option value="Diaspora Europe">Diaspora — Reste Europe (Italie, Espagne...)</option>
                    <option value="Diaspora Amérique">Diaspora — USA / Canada</option>
                    <option value="Afrique de l'Ouest">Afrique de l'Ouest (Côte d'Ivoire, etc.)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Lien Portfolio, Drive ou Meilleure Vidéo (optionnel)</label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/... ou lien TikTok/Reel"
                  value={formData.portfolioUrl}
                  onChange={e => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${labelColor}`}>Vos motivations &amp; types de marques recherchées</label>
                <textarea
                  rows={3}
                  placeholder="Parlez-nous de vos projets, vos envies de partenariats ou vos besoins d'accompagnement studio..."
                  value={formData.motivation}
                  onChange={e => setFormData({ ...formData, motivation: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${inputBg}`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl bg-[#8d1864] hover:bg-[#751352] text-white font-semibold text-xs sm:text-sm shadow-xl shadow-[#8d1864]/25 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Transmission du profil...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Envoyer ma Candidature &amp; Valider sur WhatsApp</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-400 font-light">
                🔒 Vos informations sont confidentielles et protégées selon la Loi n° 2008-12 (CDP Sénégal) et le RGPD.
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
