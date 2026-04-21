// Centralized editable content for the portfolio.
// Edit text, links, video URLs and client lists here.

export const personal = {
  name: "Alem Djibril",
  tagline: "L'ingénierie technique au service de l'impact visuel.",
  subtitle:
    "Video Editor & Developer — je conçois des contenus qui combinent rigueur technique, narration et stratégie de marque.",
  email: "contact@alemdjibril.com",
  phone: "+33 6 00 00 00 00",
};

export type TrustItem =
  | { kind: "logo"; name: string }
  | { kind: "creator"; name: string; initials: string };

export const trustItems: TrustItem[] = [
  { kind: "logo", name: "Orange" },
  { kind: "creator", name: "Léa Martin", initials: "LM" },
  { kind: "logo", name: "CCF" },
  { kind: "creator", name: "Karim B.", initials: "KB" },
  { kind: "logo", name: "Veolia" },
  { kind: "creator", name: "Sofia R.", initials: "SR" },
  { kind: "logo", name: "Studio Nova" },
  { kind: "creator", name: "Théo D.", initials: "TD" },
  { kind: "logo", name: "Maison Lumière" },
  { kind: "creator", name: "Inès K.", initials: "IK" },
  { kind: "logo", name: "Atelier 9" },
  { kind: "creator", name: "Marc V.", initials: "MV" },
];

export type VideoEmbed = {
  id: string;
  title: string;
  platform: "YouTube" | "Instagram" | "TikTok";
  // Use an embed URL (e.g. https://www.youtube.com/embed/VIDEO_ID)
  embedUrl: string;
};

export const seriousVideos: VideoEmbed[] = [
  {
    id: "s1",
    title: "Interview corporate — Direction stratégique",
    platform: "YouTube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "s2",
    title: "Documentaire interne — Transformation numérique",
    platform: "YouTube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "s3",
    title: "Capsule expert — Cybersécurité",
    platform: "YouTube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "s4",
    title: "Aftermovie événement professionnel",
    platform: "YouTube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export const creativeVideos: VideoEmbed[] = [
  {
    id: "c1",
    title: "Reel gaming — Highlight compétitif",
    platform: "Instagram",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "c2",
    title: "Short dynamique — Lifestyle créateur",
    platform: "TikTok",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "c3",
    title: "Teaser sortie produit",
    platform: "Instagram",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "c4",
    title: "Storytelling vertical — Behind the scenes",
    platform: "TikTok",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export type TimelineEntry = {
  year: string;
  company: string;
  role: string;
  description: string;
  critical?: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  // Optionnel : URL d'une photo de profil. Si vide, les initiales sont affichées.
  avatarUrl?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Alem combine une rigueur d'ingénieur avec un vrai sens narratif. Livrables nets, dans les délais, et toujours une longueur d'avance sur les détails techniques.",
    name: "Léa Martin",
    role: "Brand Manager",
    company: "Studio Nova",
    initials: "LM",
  },
  {
    quote:
      "Collaboration fluide du brief à la livraison. Il a structuré notre ligne éditoriale et produit des contenus qui ont sensiblement fait monter notre engagement.",
    name: "Karim Benali",
    role: "Créateur & Fondateur",
    company: "KB Studio",
    initials: "KB",
  },
];

export const timeline: TimelineEntry[] = [
  {
    year: "2021",
    company: "Orange",
    role: "Data Center — Ingénierie",
    description:
      "Exploitation et fiabilisation d'infrastructures critiques. Compréhension profonde des systèmes à haute disponibilité.",
    critical: true,
  },
  {
    year: "2022",
    company: "CCF",
    role: "Secteur Bancaire",
    description:
      "Mission au cœur d'un environnement financier exigeant : rigueur, conformité, communication transverse.",
  },
  {
    year: "2023",
    company: "Veolia",
    role: "Stratégie",
    description:
      "Pilotage stratégique sur des sujets d'innovation et transformation. Synthèse, narration, livrables exécutifs.",
    critical: true,
  },
  {
    year: "2024 — Aujourd'hui",
    company: "Indépendant",
    role: "Video Editor & Developer",
    description:
      "Production de contenus haut de gamme pour agences et créateurs : post-production, stratégie éditoriale, développement sur mesure.",
    critical: true,
  },
];