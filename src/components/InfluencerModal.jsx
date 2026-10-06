import React, { useState } from 'react';
import { 
  X, BadgeCheck, MessageCircle, Send, Star, TrendingUp, 
  Users, Eye, Calendar, Sparkles, ExternalLink, ShieldCheck 
} from 'lucide-react';

export default function InfluencerModal({ influencer, onClose }) {
  if (!influencer) return null;

  const [selectedCampaignType, setSelectedCampaignType] = useState('placement');
  const [customNotes, setCustomNotes] = useState('');

  const campaignOptions = [
    {
      id: 'placement',
      label: 'Placement Produit & Vidéo Virale',
      desc: 'Création d’un Reel, TikTok ou Story sponsorisée pour promouvoir un produit ou service.'
    },
    {
      id: 'egerie',
      label: 'Égérie & Contrat de Marque',
      desc: 'Partenariat moyen/long terme, ambassadeur officiel et campagne d’affichage.'
    },
    {
      id: 'evenement',
      label: 'Présence VIP & Événementiel',
      desc: 'Couverture live, participation ou animation d’une inauguration à Dakar.'
    },
    {
      id: 'studio',
      label: 'Shooting Studio & Contenus Spécifiques',
      desc: 'Production audiovisuelle dédiée dans les locaux de SENINFLUENCEURS STUDIO.'
    }
  ];

  const handleSendWhatsApp = () => {
    const selectedOption = campaignOptions.find(o => o.id === selectedCampaignType)?.label;
    const phone = "221772619754";
    const text = encodeURIComponent(
      `Bonjour SENINFLUENCEURS,\n\nJe souhaite solliciter une collaboration avec votre talent :\n👤 *${influencer.name}* (${influencer.category} - ${influencer.niche})\n\n🎯 Type d'action souhaitée : *${selectedOption}*\n${customNotes ? `📝 Précisions : ${customNotes}\n` : ''}\nPourriez-vous me transmettre ses disponibilités actuelles et sa grille tarifaire ?\n\nMerci d'avance !`
    );
    window.open(`https://api.whatsapp.com/send?phone=+${phone}&text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-3xl glass-panel rounded-3xl border border-white/20 overflow-hidden shadow-2xl bg-[#101218] my-8 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Influencer Visual & Stats */}
          <div className="md:col-span-5 relative bg-gradient-to-b from-slate-900 to-black p-6 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-slate-950">
                <img
                  src={influencer.photo}
                  alt={influencer.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#8d1864]/80 backdrop-blur-md text-white font-semibold border border-white/20">
                    {influencer.category}
                  </span>
                  {influencer.verified && (
                    <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs backdrop-blur-md">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      <span>Certifié</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Stats Box */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <span className="text-[11px] text-slate-400 block font-medium">Communauté</span>
                  <span className="text-lg font-extrabold text-white">{influencer.followers}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <span className="text-[11px] text-slate-400 block font-medium">Engagement</span>
                  <span className="text-lg font-extrabold text-emerald-400">{influencer.engagementRate || '7.8%'}</span>
                </div>
              </div>
            </div>

            {/* Social channels bar */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                Plateformes actives
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                  TikTok
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                  Instagram
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                  Facebook
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & WhatsApp Brief Generator */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-brand-400 uppercase tracking-widest">
                <span>{influencer.niche}</span>
                <span>•</span>
                <span>Sénégal</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                {influencer.name}
              </h2>

              <p className="text-sm text-slate-300 font-light leading-relaxed mt-3">
                {influencer.bio || "Talent représenté par l'agence SENINFLUENCEURS. Disponible pour activations de marques, campagnes de notoriété et création de contenus sponsorisés sur-mesure."}
              </p>

              {/* Campaign Type Selector */}
              <div className="mt-6">
                <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider block mb-2.5">
                  Choisissez le type de collaboration :
                </label>
                
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                  {campaignOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedCampaignType(opt.id)}
                      className={`text-left p-3 rounded-xl border transition-all text-xs flex items-start space-x-2.5 ${
                        selectedCampaignType === opt.id
                          ? 'bg-brand-500/15 border-brand-500 text-white shadow-sm'
                          : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                        selectedCampaignType === opt.id ? 'border-brand-500 bg-brand-500' : 'border-slate-500'
                      }`}>
                        {selectedCampaignType === opt.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{opt.label}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{opt.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra note field */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Précisez votre marque ou date prévue (optionnel)..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Bottom Direct CTA */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="flex items-center space-x-2 mb-3 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Gestion directe par notre équipe de production à Dakar</span>
              </div>

              <button
                onClick={handleSendWhatsApp}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Réserver ce Profil via WhatsApp</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
