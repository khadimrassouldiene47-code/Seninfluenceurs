import React from 'react';
import { 
  Smartphone, Camera, Mic, Radio, Palette, Globe, 
  Sparkles, CheckCircle, ArrowRight 
} from 'lucide-react';

export default function ServicesSection({ onStartBrief, darkMode = true }) {
  const services = [
    {
      icon: Smartphone,
      title: "Marketing d'Influence & Campagnes Digitales",
      desc: "Conception de campagnes d'influence sur-mesure. Nous sélectionnons les créateurs parfaits selon leur crédibilité, leur communauté et leur taux d'engagement réel.",
      features: [
        "Casting de talents qualifiés",
        "Négociation et encadrement contractuel",
        "Suivi opérationnel et modération",
        "Reporting d'impact et calcul du ROI"
      ]
    },
    {
      icon: Camera,
      title: "SENINFLUENCEURS STUDIO & Production",
      desc: "Studio créatif à Dakar dédié aux marques et créateurs : production audiovisuelle de niveau broadcast pour TikTok, Instagram Reels, YouTube et la télévision.",
      features: [
        "Tournage photo & vidéo 4K professionnelle",
        "Réalisation de Reels & Shorts viraux",
        "Motion design, animations 2D/3D & graphisme",
        "Location de studio équipé à Dakar"
      ]
    },
    {
      icon: Mic,
      title: "Création de Podcasts & SENINFLUENCEURS TV",
      desc: "Développement de formats talk-shows, capsules audio et émissions vidéo exclusives avec des personnalités, entrepreneurs et figures d'Afrique de l'Ouest.",
      features: [
        "Enregistrement audio multi-pistes haute fidélité",
        "Captation vidéo multi-caméras studio",
        "Diffusion omnicanale (Spotify, Apple, YouTube)",
        "Sponsoring et intégration de marque premium"
      ]
    },
    {
      icon: Radio,
      title: "Couverture Médiatique & Relations Presse",
      desc: "Visibilité stratégique amplifiée par notre média SN MAGAZINE et nos partenaires audiovisuels de premier plan (2sTV, TFM, RFM, Record, L'Observateur).",
      features: [
        "Relations presse et communiqués institutionnels",
        "Organisation d'interviews et d'articles de presse",
        "Couverture médiatique d'inaugurations et galas",
        "Campagnes sur panneaux publicitaires à Dakar"
      ]
    },
    {
      icon: Palette,
      title: "Identité Visuelle & Stratégie de Marque",
      desc: "Création de chartes graphiques percutantes, direction artistique et déclinaison de supports de communication modernes pour asseoir votre leadership.",
      features: [
        "Logotype et design system digital",
        "Conception de sites web & plateformes de marque",
        "Supports print, packaging & merchandising",
        "Stratégie de positionnement de marque"
      ]
    },
    {
      icon: Globe,
      title: "Réseau International & Label FOBAF",
      desc: "Membre actif de la Fédération des Organisations de Blogueurs d'Afrique Francophone (FOBAF) pour le développement et la structuration du digital africain.",
      features: [
        "Rayonnement panafricain (Sénégal, Côte d'Ivoire, etc.)",
        "Adhésion aux standards éthiques internationaux",
        "Participation aux sommets du digital africain",
        "Connexion avec les délégations de la diaspora"
      ]
    }
  ];

  const sectionBg  = darkMode ? 'bg-[#0B0C10] border-white/5' : 'bg-gray-50 border-gray-200';
  const cardBg     = darkMode ? 'bg-[#12141A] border-white/10 hover:border-[#8d1864]/50' : 'bg-white border-gray-200 hover:border-[#8d1864]/50 shadow-sm';
  const titleColor = darkMode ? 'text-white' : 'text-gray-900';
  const descColor  = darkMode ? 'text-slate-300' : 'text-gray-600';
  const featColor  = darkMode ? 'text-slate-400' : 'text-gray-600';
  const btnCls     = darkMode
    ? 'bg-white/[0.04] hover:bg-white/[0.1] text-slate-200 hover:text-white border-white/10'
    : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200';

  return (
    <section id="services-studio" className={`py-20 relative border-t ${sectionBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#8d1864]/10 border border-[#8d1864]/20 text-xs font-semibold text-[#8d1864] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nos Expertises 360°</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight ${titleColor}`}>
            Un Écosystème Complet Dédié à la Puissance de Votre Marque
          </h2>
          <p className={`text-sm sm:text-base mt-3 font-light ${descColor}`}>
            De la stratégie d'influence à la réalisation audiovisuelle en studio, nous couvrons chaque maillon pour garantir un impact mesurable.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className={`rounded-2xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between group hover:shadow-xl ${cardBg}`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#8d1864]/10 border border-[#8d1864]/20 flex items-center justify-center text-[#8d1864] transition-colors mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className={`text-lg font-display font-bold group-hover:text-[#8d1864] transition-colors ${titleColor}`}>
                    {srv.title}
                  </h3>

                  <p className={`text-xs sm:text-sm mt-2.5 font-light leading-relaxed ${descColor}`}>
                    {srv.desc}
                  </p>

                  <div className={`mt-5 pt-4 border-t ${darkMode ? 'border-white/10' : 'border-gray-100'} space-y-2`}>
                    {srv.features.map((feat, fIdx) => (
                      <div key={fIdx} className={`flex items-center space-x-2 text-xs ${featColor}`}>
                        <CheckCircle className="w-3.5 h-3.5 text-[#8d1864] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4">
                  <button
                    onClick={onStartBrief}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all border flex items-center justify-center space-x-2 ${btnCls}`}
                  >
                    <span>Demander un Devis</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8d1864]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Spotlight Box */}
        <div className={`mt-16 rounded-3xl p-8 sm:p-10 border overflow-hidden relative ${
          darkMode ? 'bg-gradient-to-br from-[#161822] to-[#0E1017] border-white/15' : 'bg-white border-gray-200 shadow-xl'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold text-[#8d1864] uppercase tracking-widest block mb-2">
                Espace Physique &amp; Tournage à Dakar
              </span>
              <h3 className={`text-2xl sm:text-3xl font-display font-extrabold ${titleColor}`}>
                SENINFLUENCEURS STUDIO : Louez notre plateau tout équipé
              </h3>
              <p className={`text-sm mt-3 font-light leading-relaxed ${descColor}`}>
                Situé sur le Boulevard Libération à Dakar (Immeuble Fahd), notre studio professionnel est mis à la disposition des agences, entreprises et créateurs. Éclairage cinématographique Aputure, caméras Sony FX 4K, microphones Shure podcast, régie vidéo et décors modulables.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                <div className={`p-3 rounded-xl border ${darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                  <div className={`font-bold text-sm ${titleColor}`}>Matériel 4K</div>
                  <div className={`text-[11px] mt-0.5 ${featColor}`}>Sony FX6 &amp; FX3</div>
                </div>
                <div className={`p-3 rounded-xl border ${darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                  <div className={`font-bold text-sm ${titleColor}`}>Son Broadcast</div>
                  <div className={`text-[11px] mt-0.5 ${featColor}`}>Shure SM7B &amp; Rode</div>
                </div>
                <div className={`p-3 rounded-xl border col-span-2 sm:col-span-1 ${darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                  <div className={`font-bold text-sm ${titleColor}`}>Équipe Dédiée</div>
                  <div className={`text-[11px] mt-0.5 ${featColor}`}>Réalisateur &amp; Cadreur</div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://api.whatsapp.com/send?phone=+221772619754&text=Bonjour%20SENINFLUENCEURS,%20je%20souhaite%20réserver%20le%20studio%20de%20tournage."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#8d1864] hover:bg-[#751352] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-[#8d1864]/25 transition-all"
                >
                  Réserver le Studio par WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className={`rounded-2xl overflow-hidden border aspect-video lg:aspect-square shadow-2xl ${
                darkMode ? 'border-white/20' : 'border-gray-200'
              }`}>
                <img
                  src="https://res.cloudinary.com/dwp4isflu/image/upload/v1791240966/slider-21_uxhcy9.png"
                  alt="SENINFLUENCEURS Studio Tournage"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
