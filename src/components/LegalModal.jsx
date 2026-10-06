import React from 'react';
import { X, ShieldCheck, Scale, FileText } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, type = 'cgu' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl glass-panel rounded-3xl border border-white/20 overflow-hidden shadow-2xl bg-[#101218] my-8 animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center space-x-2.5">
            {type === 'cgu' ? (
              <Scale className="w-5 h-5 text-brand-400" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            )}
            <h3 className="text-base sm:text-lg font-bold text-white font-display">
              {type === 'cgu' ? 'Conditions Générales d’Utilisation (CGU)' : 'Politique de Confidentialité & RGPD'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto text-xs sm:text-sm text-slate-300 font-light space-y-4 leading-relaxed">
          {type === 'cgu' ? (
            <>
              <h4 className="font-bold text-white text-sm">1. Présentation de la Plateforme</h4>
              <p>
                Le site web www.seninfluenceurs.com est édité par la société SENINFLUENCEURS SARL, immatriculée à Dakar, Sénégal, ayant son siège social au 29 Boulevard Libération, Immeuble Fahd. Fondateur et directeur de publication : Pape Momar Ndiaye.
              </p>

              <h4 className="font-bold text-white text-sm">2. Objet des Services</h4>
              <p>
                SENINFLUENCEURS propose des prestations d'intermédiation en marketing d'influence, de gestion de talents, de production audiovisuelle studio, de relations presse et de conseil en stratégie digitale.
              </p>

              <h4 className="font-bold text-white text-sm">3. Propriété Intellectuelle</h4>
              <p>
                L'ensemble des contenus, marques, logos, vidéos et visuels présents sur le site sont protégés par les lois internationales et le droit de l'OAPI sur la propriété intellectuelle. Toute reproduction non autorisée est formellement interdite.
              </p>

              <h4 className="font-bold text-white text-sm">4. Engagements Déontologiques</h4>
              <p>
                En tant que membre de la FOBAF, SENINFLUENCEURS s'engage à respecter les principes de loyauté commerciale, d'indication claire des partenariats sponsorisés et de non-discrimination.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-white text-sm">1. Collecte des Données Personnelles</h4>
              <p>
                Les informations recueillies via les formulaires de brief et de contact (nom, entreprise, email, téléphone) sont destinées exclusivement au traitement des demandes de devis et au suivi relationnel commercial de l'agence.
              </p>

              <h4 className="font-bold text-white text-sm">2. Sécurité et Hébergement</h4>
              <p>
                Vos données sont stockées de façon sécurisée sur une infrastructure Supabase (hébergée en Union Européenne, région eu-west-1) répondant aux normes strictes de conformité RGPD et ISO 27001. Aucune donnée n'est vendue ni cédée à des tiers.
              </p>

              <h4 className="font-bold text-white text-sm">3. Vos Droits d'Accès et de Rectification</h4>
              <p>
                Conformément à la législation sénégalaise sur la protection des données personnelles (CDP) et au RGPD, vous disposez d'un droit d'accès, de rectification et d'effacement de vos données personnelles par simple email adressé à : info@seninfluenceurs.com.
              </p>
            </>
          )}
        </div>

        <div className="px-6 py-3 bg-white/[0.02] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
