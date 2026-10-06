import React, { useState } from 'react';
import { 
  Send, MessageCircle, MapPin, Phone, Mail, Clock, 
  Upload, CheckCircle2, Sparkles, Building 
} from 'lucide-react';
import { submitContactBrief } from '../lib/supabase';

export default function ContactSection({ darkMode = true }) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    budget: '1M - 3M FCFA',
    objective: 'Notoriété & Image de Marque',
    talentType: 'Mixte (Top Influenceurs & Créateurs de contenu)',
    message: '',
    fileName: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileAttached, setFileAttached] = useState(null);

  const budgetOptions = [
    'Moins de 1.000.000 FCFA',
    '1.000.000 - 3.000.000 FCFA',
    '3.000.000 - 7.000.000 FCFA',
    '7.000.000 - 15.000.000 FCFA',
    'Plus de 15.000.000 FCFA'
  ];

  const objectiveOptions = [
    'Notoriété & Image de Marque',
    'Lancement de Nouveau Produit',
    'Génération de Ventes & Conversions',
    'Couverture d’Événement & Présence VIP',
    'Production Contenu Studio (Photos / Podcasts)'
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileAttached(file);
      setFormData(prev => ({ ...prev, fileName: file.name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Enregistrer dans Supabase / local
      await submitContactBrief(formData);

      // 2. Préparer le message WhatsApp
      const phoneAgency = "221772619754";
      const waText = encodeURIComponent(
        `🚀 *NOUVEAU BRIEF CAMPAGNE - SENINFLUENCEURS*\n\n` +
        `🏢 *Entreprise :* ${formData.companyName}\n` +
        `👤 *Contact :* ${formData.contactName}\n` +
        `📞 *Téléphone :* ${formData.phone}\n` +
        `✉️ *Email :* ${formData.email}\n` +
        `💰 *Budget :* ${formData.budget}\n` +
        `🎯 *Objectif :* ${formData.objective}\n` +
        `🌟 *Type de talents :* ${formData.talentType}\n\n` +
        `📝 *Détails du projet :*\n${formData.message}\n` +
        (formData.fileName ? `📎 *Fichier :* ${formData.fileName}\n` : '') +
        `\n_Message généré depuis seninfluenceurs.com_`
      );

      // 3. Ouvrir WhatsApp
      window.open(`https://api.whatsapp.com/send?phone=+${phoneAgency}&text=${waText}`, '_blank');
      setSubmitted(true);
    } catch (err) {
      console.error('Erreur soumission brief:', err);
    } finally {
      setLoading(false);
    }
  };

  const sectionBg  = darkMode ? 'bg-[#0B0C10] border-white/5' : 'bg-gray-50 border-gray-200';
  const cardBg     = darkMode ? 'bg-[#12141A] border-white/10' : 'bg-white border-gray-200 shadow-xl';
  const titleColor = darkMode ? 'text-white' : 'text-gray-900';
  const descColor  = darkMode ? 'text-slate-300' : 'text-gray-600';
  const mutedColor = darkMode ? 'text-slate-400' : 'text-gray-500';
  const inputCls   = darkMode
    ? 'w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#8d1864]'
    : 'w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8d1864]';
  const selectCls  = darkMode
    ? 'w-full px-3.5 py-2.5 rounded-xl bg-[#12141A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#8d1864]'
    : 'w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#8d1864]';
  const labelCls   = `text-xs font-medium block mb-1.5 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`;

  return (
    <section id="contact-agency" className={`py-20 relative border-t ${sectionBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#8d1864]/10 border border-[#8d1864]/20 text-xs font-semibold text-[#8d1864] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Parlons de Votre Prochaine Campagne</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight ${titleColor}`}>
            Activez la Force de Frappe SENINFLUENCEURS
          </h2>
          <p className={`text-sm sm:text-base mt-3 font-light ${descColor}`}>
            Déposez votre brief ou contactez nos directeurs de clientèle pour un devis gratuit et personnalisé sous 24h.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info & Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className={`rounded-3xl p-6 sm:p-8 border ${cardBg}`}>
              <h3 className={`text-xl font-display font-bold mb-6 ${titleColor}`}>
                Coordonnées de l'Agence
              </h3>

              <div className="space-y-5">
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#8d1864]/10 border border-[#8d1864]/20 flex items-center justify-center text-[#8d1864] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs block font-medium ${mutedColor}`}>Siège &amp; Studio</span>
                    <span className={`text-sm font-semibold leading-snug ${titleColor}`}>
                      Boulevard Libération, Immeuble Fahd 2e étage, Dakar, Sénégal
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs block font-medium ${mutedColor}`}>Ligne Directe / WhatsApp</span>
                    <a href="tel:+221772619754" className={`text-sm font-semibold hover:text-[#8d1864] transition-colors block ${titleColor}`}>
                      +221 77 261 97 54
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs block font-medium ${mutedColor}`}>Email Officiel</span>
                    <a href="mailto:seninfluenceurs@gmail.com" className={`text-sm font-semibold hover:text-[#8d1864] transition-colors block ${titleColor}`}>
                      seninfluenceurs@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#8d1864]/10 border border-[#8d1864]/20 flex items-center justify-center text-[#8d1864] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs block font-medium ${mutedColor}`}>Horaires d'Ouverture</span>
                    <span className={`text-xs leading-relaxed ${descColor}`}>
                      Lundi - Samedi : 08h30 - 19h00 (Permanence WhatsApp le week-end)
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct call button */}
              <div className={`mt-6 pt-5 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                <a
                  href="https://api.whatsapp.com/send?phone=+221772619754&text=Bonjour%20SENINFLUENCEURS,%20je%20souhaite%20un%20échange%20téléphonique."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Discuter directement sur WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Brief Submission Form */}
          <div className="lg:col-span-7">
            <div className={`rounded-3xl p-6 sm:p-9 border shadow-2xl relative ${cardBg}`}>
              
              {submitted ? (
                <div className="text-center py-12 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className={`text-2xl font-display font-bold ${titleColor}`}>
                    Brief Transmis avec Succès !
                  </h3>
                  <p className={`text-sm max-w-md mx-auto mt-2 mb-6 ${descColor}`}>
                    Votre demande a été enregistrée dans notre système et transmise sur notre ligne WhatsApp dédiée. Un chef de projet prendra contact avec vous immédiatement.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        companyName: '',
                        contactName: '',
                        email: '',
                        phone: '',
                        budget: '1M - 3M FCFA',
                        objective: 'Notoriété & Image de Marque',
                        talentType: 'Mixte (Top Influenceurs & Créateurs de contenu)',
                        message: '',
                        fileName: ''
                      });
                      setFileAttached(null);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#8d1864] hover:bg-[#751352] text-white text-xs font-semibold"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className={`text-xl font-display font-bold mb-2 ${titleColor}`}>
                    Formulaire de Brief Campagne
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Entreprise / Marque *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Orange, Wave, Sedima, Start-up..."
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Nom &amp; Prénom du Responsable *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Awa Diop"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Téléphone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+221 7X XXX XX XX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Email Professionnel *</label>
                      <input
                        type="email"
                        required
                        placeholder="contact@votreentreprise.sn"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Budget Estimé</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className={selectCls}
                      >
                        {budgetOptions.map((b, i) => (
                          <option key={i} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelCls}>Objectif Principal</label>
                      <select
                        value={formData.objective}
                        onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                        className={selectCls}
                      >
                        {objectiveOptions.map((o, i) => (
                          <option key={i} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Détails de votre projet &amp; Attentes</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Décrivez votre produit, vos dates cibles, vos canaux prioritaires (TikTok, Instagram, YouTube)..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={inputCls}
                    />
                  </div>

                  {/* File Upload Attachment */}
                  <div>
                    <label className={labelCls}>Pièce jointe / Cahier des charges (PDF, Image, Doc)</label>
                    <div className={`relative border border-dashed rounded-xl p-3 text-center transition-colors ${
                      darkMode ? 'border-white/20 hover:border-[#8d1864]/50 bg-white/[0.02]' : 'border-gray-300 hover:border-[#8d1864]/50 bg-gray-50'
                    }`}>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className={`flex items-center justify-center space-x-2 text-xs ${mutedColor}`}>
                        <Upload className="w-4 h-4 text-[#8d1864]" />
                        <span>{fileAttached ? fileAttached.name : "Cliquez ou déposez un fichier (max 15MB)"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit button with #8d1864 */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 rounded-xl bg-[#8d1864] hover:bg-[#751352] text-white font-semibold text-sm shadow-xl shadow-[#8d1864]/25 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Transmission en cours...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Envoyer le Brief &amp; Valider sur WhatsApp</span>
                        </>
                      )}
                    </button>
                    <p className={`text-[11px] text-center mt-2.5 ${mutedColor}`}>
                      🔒 Données strictement confidentielles, protégées conformément aux normes RGPD.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
