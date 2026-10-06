import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection({ darkMode = true }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Comment fonctionne une collaboration avec un influenceur chez SENINFLUENCEURS ?",
      a: "Nous commençons par analyser votre brief (objectifs, audience cible, budget). Ensuite, nous vous soumettons une sélection personnalisée de profils avec leurs statistiques vérifiées. Une fois le casting validé, nous gérons l'ensemble des aspects juridiques, contractuels, la logistique de tournage ou de création de contenus, ainsi que le reporting final."
    },
    {
      q: "Quelle est la différence entre un Top Influenceur et un Créateur de contenu ?",
      a: "Les Top Influenceurs (+500K abonnés) apportent une notoriété fulgurante, une visibilité massive et renforcent l'autorité de votre marque au niveau national ou régional. Les Créateurs de contenu possèdent quant à eux des taux d'engagement très élevés et une proximité intime avec des niches précises (beauté, tech, gastronomie, entrepreneuriat), parfaits pour la conversion directe et l'authenticité."
    },
    {
      q: "Quel est le délai moyen pour lancer une campagne d'influence à Dakar ?",
      a: "Pour une activation digitale standard (Reel / TikTok sponsorisé), la campagne peut être déployée en 4 à 7 jours ouvrés. Pour une production audiovisuelle complète en studio ou une campagne nationale multi-talents, comptez en moyenne 10 à 15 jours de préparation."
    },
    {
      q: "Est-il possible de louer uniquement votre studio de tournage à Dakar ?",
      a: "Absolument. SENINFLUENCEURS STUDIO (Immeuble Fahd, Boulevard Libération) propose des formules de location à la demi-journée ou journée complète, avec ou sans équipe technique (cadreurs, ingénieurs du son, éclairagistes) pour vos shootings, vidéos de marque et podcasts."
    },
    {
      q: "Comment garantissez-vous la rentabilité (ROI) des activations ?",
      a: "Nous fournissons un rapport post-campagne exhaustif : nombre d'impressions, portée unique, vues de vidéos, taux d'interaction, clics générés et retombées médiatiques. De plus, nos contrats encadrent strictement les livrables pour sécuriser votre investissement."
    }
  ];

  const sectionBg  = darkMode ? 'bg-[#0B0C10] border-white/5' : 'bg-gray-50 border-gray-200';
  const cardBg     = darkMode ? 'bg-[#12141A] border-white/10' : 'bg-white border-gray-200 shadow-sm';
  const titleColor = darkMode ? 'text-white' : 'text-gray-900';
  const descColor  = darkMode ? 'text-slate-300' : 'text-gray-600';

  return (
    <section className={`py-16 border-t ${sectionBg}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#8d1864]/10 border border-[#8d1864]/20 text-xs font-semibold text-[#8d1864] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Foire Aux Questions</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-display font-bold tracking-tight ${titleColor}`}>
            Tout ce que vous devez savoir avant de lancer votre campagne
          </h2>
          <p className={`text-xs sm:text-sm mt-2 font-light ${descColor}`}>
            Des réponses claires et précises à vos questions les plus fréquentes.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${cardBg} ${
                  isOpen ? 'border-[#8d1864]/40 shadow-lg' : ''
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <span className={`text-sm sm:text-base font-semibold leading-snug ${
                    isOpen ? 'text-[#8d1864]' : titleColor
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-full transition-transform duration-200 ${
                    isOpen ? 'bg-[#8d1864] text-white rotate-180' : darkMode ? 'bg-white/5 text-slate-400' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className={`px-5 pb-5 text-xs sm:text-sm font-light leading-relaxed border-t pt-3 ${
                    darkMode ? 'text-slate-300 border-white/5' : 'text-gray-600 border-gray-100'
                  }`}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
