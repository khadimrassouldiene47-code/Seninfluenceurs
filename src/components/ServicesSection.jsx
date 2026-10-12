import React from 'react';
import { 
  Smartphone, Camera, Radio, Sparkles, CheckCircle, ArrowRight,
  Users, Video, Target, GraduationCap
} from 'lucide-react';

export default function ServicesSection({ onStartBrief, darkMode = true }) {
  const services = [
    {
      icon: Smartphone,
      title: "Marketing d'Influence",
      desc: "Conception de campagnes d'influence sur-mesure. Nous sélectionnons les créateurs parfaits selon leur crédibilité, leur communauté et leur taux d'engagement réel.",
      features: [
        "Casting de talents qualifiés & certifiés",
        "Négociation & encadrement contractuel",
        "Suivi opérationnel et modération",
        "Reporting d'impact et calcul du ROI"
      ]
    },
    {
      icon: Users,
      title: "Management de Talents",
      desc: "Représentation exclusive et développement de carrière pour les créateurs de contenu, artistes et figures publiques au Sénégal et à l'international.",
      features: [
        "Gestion d'agenda & partenariats marques",
        "Protection juridique & droits d'image",
        "Stratégie de monétisation & diversification",
        "Accompagnement médiatique personnalisé"
      ]
    },
    {
      icon: Sparkles,
      title: "Création de Contenu & Brand Content",
      desc: "Storytelling de marque engageant et formats percutants conçus pour maximiser la rétention et la viralité sur TikTok, Instagram, YouTube et LinkedIn.",
      features: [
        "Stratégie éditoriale & calendriers de posts",
        "Conception de Reels, TikToks & Shorts viraux",
        "Copywriting créatif & scénarisation",
        "Direction artistique sur-mesure"
      ]
    },
    {
      icon: Video,
      title: "Production Vidéo & Audiovisuelle",
      desc: "Tournage haute définition, réalisation publicitaire, spots corporate et capsules d'émissions de niveau broadcast professionnel.",
      features: [
        "Prises de vue 4K cinématographiques",
        "Montage dynamique & étalonnage couleur",
        "Motion design, effets 2D/3D & sous-titrage",
        "Formats optimisés mobile & affichage LED"
      ]
    },
    {
      icon: Target,
      title: "Campagnes Digitales 360°",
      desc: "Déploiement omnicanal de vos lancements de produits et activations événementielles avec amplification média et reciblage publicitaire.",
      features: [
        "Stratégie multicanale & médiatisation",
        "Sponsoring de publications & Ads meta/tiktok",
        "Activation influenceurs en temps réel",
        "Tableaux de bord analytiques en direct"
      ]
    },
    {
      icon: Radio,
      title: "Couverture Média & Relations Presse",
      desc: "Visibilité stratégique amplifiée par notre média SN MAGAZINE et nos partenaires audiovisuels de premier plan (Canal+ Afrique, 2sTV, TFM, RFM).",
      features: [
        "Relations presse et communiqués institutionnels",
        "Organisation d'interviews et tribunes média",
        "Couverture médiatique d'inaugurations et galas",
        "Diffusion multicanale & revues de presse"
      ]
    },
    {
      icon: Camera,
      title: "SENINFLUENCEURS STUDIO",
      desc: "Plateau de tournage professionnel équipé à Dakar (Immeuble Fahd) pour vos shootings, tournages vidéo, podcasts et lives streams.",
      features: [
        "Plateau insonorisé avec régie technique",
        "Caméras Sony cinéma & éclairage Aputure",
        "Microphones podcast Shure SM7B",
        "Location à l'heure ou à la journée"
      ]
    },
    {
      icon: GraduationCap,
      title: "Formation & Coaching Influence",
      desc: "Programmes intensifs et masterclasses pour former les talents de demain, professionnaliser les community managers et acculturer les marques.",
      features: [
        "Masterclasses création de contenu & algorithmes",
        "Coaching prise de parole face caméra",
        "Ateliers monétisation & relations marques",
        "Certifications et accompagnement individuel"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
