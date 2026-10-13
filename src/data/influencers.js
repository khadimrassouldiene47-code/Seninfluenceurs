// Base initial influencers catalog with 3 clean curated talents (Adja, Omar Africa, Modou)
// The admin can add, update and delete talents directly from the Admin space.
export const defaultInfluencers = [
  {
    "id": "1",
    "name": "Adja",
    "category": "Top influenceurs",
    "niche": "Cinéma & Séries",
    "followers": "1.8M",
    "followersCount": 1800000,
    "photo": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    "verified": true,
    "featured": true,
    "showFollowers": false,
    "engagementRate": "8.5%",
    "bio": "Actrice et créatrice incontournable du cinéma et du divertissement sénégalais. Ambassadrice de marques et icône d'élégance.",
    "socials": {},
    "statsVerified": true
  },
  {
    "id": "2",
    "name": "Omar Africa",
    "category": "Top influenceurs",
    "niche": "Lifestyle & Culture",
    "followers": "1.4M",
    "followersCount": 1400000,
    "photo": "https://res.cloudinary.com/dwp4isflu/image/upload/v1791242604/portfolio-168_me9mc5.webp",
    "verified": true,
    "featured": true,
    "showFollowers": false,
    "engagementRate": "8.1%",
    "bio": "Ambassadeur de la street culture et du voyage africain. Créateur digital spécialiste des immersions urbaines et des vibes panafricaines.",
    "socials": {},
    "statsVerified": true
  },
  {
    "id": "3",
    "name": "Modou",
    "category": "Influenceurs",
    "niche": "Humour & Comédie",
    "followers": "950K",
    "followersCount": 950000,
    "photo": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    "verified": true,
    "featured": true,
    "showFollowers": false,
    "engagementRate": "9.2%",
    "bio": "Comédien et créateur de capsules vidéo humoristiques du quotidien. Forte communauté et proximité avec la jeunesse sénégalaise.",
    "socials": {},
    "statsVerified": true
  }
];

export const influencerCategories = [
  "Tous",
  "Top influenceurs",
  "Influenceurs",
  "Artistes",
  "Diaspora"
];

// Helper to generate customized WhatsApp pre-filled link
export function getWhatsAppInfluencerLink(influencerName, category = "") {
  const phone = "221772619754";
  const message = encodeURIComponent(
    `Bonjour SENINFLUENCEURS,\n\nJe souhaite collaborer avec l'influenceur(se) *${influencerName}* (${category}) pour une campagne de marque.\n\nPourriez-vous me communiquer sa disponibilité, ses tarifs et son kit média ?\n\nMerci !`
  );
  return `https://api.whatsapp.com/send?phone=+${phone}&text=${message}`;
}
