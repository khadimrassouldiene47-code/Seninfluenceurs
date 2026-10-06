import React from 'react';
import { 
  Award, Globe2, ShieldCheck, Target, HeartHandshake, 
  Lightbulb, Compass 
} from 'lucide-react';

export default function AboutSection({ darkMode = true }) {
  const values = [
    {
      icon: ShieldCheck,
      title: "Intégrité & Transparence",
      desc: "Contrats équitables, respect des audiences, mentions publicitaires claires et transparence totale sur les métriques et les retombées."
    },
    {
      icon: Target,
      title: "Excellence Opérationnelle",
      desc: "Chaque brief fait l'objet d'un cadrage minutieux, d'un contrôle qualité et d'un accompagnement personnalisé du premier contact au reporting final."
    },
    {
      icon: HeartHandshake,
      title: "Partenariats Pérennes",
      desc: "Nous ne cherchons pas le buzz éphémère, mais la construction de relations durables entre les marques, les créateurs et leurs communautés."
    },
    {
      icon: Lightbulb,
      title: "Créativité Ancrée",
      desc: "Un storytelling adapté à la culture sénégalaise et africaine pour toucher les cœurs avec authenticité et résonance émotionnelle."
    }
  ];

  const sectionBg  = darkMode ? 'bg-[#090A0D]' : 'bg-white';
  const titleColor = darkMode ? 'text-white' : 'text-gray-900';
  const descColor  = darkMode ? 'text-slate-300' : 'text-gray-600';
  const mutedColor = darkMode ? 'text-slate-400' : 'text-gray-500';
  const cardBg     = darkMode ? 'bg-[#12141A] border-white/10' : 'bg-gray-50 border-gray-200 shadow-sm';

  return (
    <section id="about-agency" className={`py-20 relative ${sectionBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Founder & Vision Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Image with prestige frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900 relative group">
                <img
                  src="https://res.cloudinary.com/dwp4isflu/image/upload/v1791240965/team-member-29_1_o47b4e.jpg"
                  alt="Pape Momar Ndiaye - Fondateur SENINFLUENCEURS"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs uppercase tracking-widest text-[#8d1864] font-bold block mb-1">
                    Fondateur &amp; Directeur Général
                  </span>
                  <h3 className="text-2xl font-display font-extrabold text-white">
                    Pape Momar Ndiaye
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 font-light">
                    Pionnier du marketing d'influence au Sénégal &amp; Membre actif de la FOBAF.
                  </p>
                </div>
              </div>

              {/* Decorative floating badge */}
              <div className={`absolute -bottom-5 -right-4 px-4 py-2.5 rounded-2xl border shadow-xl flex items-center space-x-2.5 ${
                darkMode ? 'bg-[#12141A] border-white/20' : 'bg-white border-gray-200'
              }`}>
                <Globe2 className="w-5 h-5 text-[#8d1864]" />
                <div className="text-left">
                  <div className={`text-xs font-bold ${titleColor}`}>Membre FOBAF</div>
                  <div className={`text-[10px] ${mutedColor}`}>Afrique Francophone</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial story */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#8d1864]/10 border border-[#8d1864]/20 text-xs font-semibold text-[#8d1864] mb-4 w-fit">
              <Compass className="w-3.5 h-3.5" />
              <span>Notre Histoire &amp; Vision</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-tight ${titleColor}`}>
              Structurer et Faire Rayonner l’Écosystème Digital Africain.
            </h2>

            <p className={`text-base mt-5 font-light leading-relaxed ${descColor}`}>
              Fondée par <strong className={titleColor}>Pape Momar Ndiaye</strong>, SENINFLUENCEURS s'est imposée dès sa création comme la première agence dédiée à la professionnalisation du marketing d'influence au Sénégal.
            </p>

            <p className={`text-sm mt-3 font-light leading-relaxed ${descColor}`}>
              Face à l'explosion des usages numériques et à l'avènement des réseaux sociaux en Afrique de l'Ouest, notre ambition a été claire : bâtir une passerelle de confiance entre les annonceurs institutionnels, les grandes marques et les créateurs de contenu les plus influents.
            </p>

            {/* Ecosystem Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-4 rounded-2xl border ${cardBg}`}>
                <span className="text-[#8d1864] font-bold text-xs uppercase tracking-wider block">Pôle Media</span>
                <div className={`font-bold text-base mt-1 ${titleColor}`}>SN MAGAZINE</div>
                <p className={`text-[11px] mt-1 ${mutedColor}`}>Presse digitale &amp; actualités de l'influence</p>
              </div>

              <div className={`p-4 rounded-2xl border ${cardBg}`}>
                <span className="text-[#8d1864] font-bold text-xs uppercase tracking-wider block">Pôle Créatif</span>
                <div className={`font-bold text-base mt-1 ${titleColor}`}>STUDIO DAKAR</div>
                <p className={`text-[11px] mt-1 ${mutedColor}`}>Plateau de tournage &amp; studio podcast</p>
              </div>

              <div className={`p-4 rounded-2xl border ${cardBg}`}>
                <span className="text-[#8d1864] font-bold text-xs uppercase tracking-wider block">Pôle Broadcast</span>
                <div className={`font-bold text-base mt-1 ${titleColor}`}>SENINFLUENCEURS TV</div>
                <p className={`text-[11px] mt-1 ${mutedColor}`}>Émissions &amp; formats audiovisuels exclusifs</p>
              </div>
            </div>

            {/* International commitment */}
            <div className={`mt-8 p-4 rounded-2xl border flex items-start space-x-3 ${
              darkMode ? 'bg-[#8d1864]/10 border-[#8d1864]/20' : 'bg-pink-50 border-pink-200'
            }`}>
              <Award className="w-5 h-5 text-[#8d1864] shrink-0 mt-0.5" />
              <div className={`text-xs leading-relaxed ${descColor}`}>
                <strong className={titleColor}>Engagement International :</strong> SENINFLUENCEURS participe activement aux rencontres internationales et est membre de la <strong className="text-[#8d1864]">Fédération des Organisations de Blogueurs d'Afrique Francophone (FOBAF)</strong>, qui œuvre pour la valorisation du numérique sur l'ensemble du continent.
              </div>
            </div>

          </div>

        </div>

        {/* 4 Pillars of Values */}
        <div className={`pt-12 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className={`text-2xl font-display font-bold ${titleColor}`}>
              Les Valeurs qui Guident Notre Action
            </h3>
            <p className={`text-xs sm:text-sm mt-1 ${mutedColor}`}>
              Une charte d'engagement intransigeante pour protéger les marques et valoriser les créateurs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className={`rounded-2xl p-5 border flex flex-col justify-between ${cardBg}`}>
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#8d1864]/10 border border-[#8d1864]/20 text-[#8d1864] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className={`text-base font-bold font-display mb-1.5 ${titleColor}`}>{v.title}</h4>
                    <p className={`text-xs font-light leading-relaxed ${descColor}`}>{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
