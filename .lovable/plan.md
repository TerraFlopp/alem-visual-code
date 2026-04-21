
# Portfolio Premium Hybrid — Alem Djibril

Une landing page one-page sombre et premium, inspirée de terra-prod.shop, mêlant l'identité de Video Editor et de Developer.

## Direction artistique

- **Fond (60%)** : noir abyssal `#0d0d0d` avec deux blobs lumineux flous animés (respiration lente) — un violet `#9560f0` et un doré `#e4c942` en arrière-plan fixe.
- **Secondaire (30%)** : violet `#9560f0` pour overlays de cartes, bordures, lignes de timeline.
- **Accent (10%)** : or `#e4c942` réservé aux CTA et points critiques de la timeline.
- **Typographie** : Plus Jakarta Sans (chargée via Google Fonts dans `__root.tsx`).
- **Hover** : glow violet interne + externe sur toutes les cartes/éléments cliquables, transitions fluides.

## Structure (one-page, route `/`)

Tout est rendu dans `src/routes/index.tsx`, qui assemble des composants modulaires éditables individuellement. Le contenu (textes, logos, vidéos, expériences) vit dans `src/content/portfolio.ts` pour faciliter les éditions futures.

### 1. `BackgroundBlobs` — fond vivant
Deux sphères floues animées (Framer Motion) en `position: fixed`, opacité et translation qui "respirent" sur 12–18s.

### 2. `Hero`
- Titre : *"Alem Djibril — L'ingénierie technique au service de l'impact visuel."*
- Sous-titre court bilingue technique/créatif.
- CTA or : "Voir le portfolio" (scroll vers Portfolio) + CTA secondaire ghost violet : "Me contacter".
- Animation d'entrée : fade-in + reveal lettre par lettre du nom.

### 3. `Skills` — 4 cartes avec icônes Lucide
- Post-production (Adobe Suite) — `Film`
- Stratégie de contenu & Community Management — `Megaphone`
- Développement (JS, Python, C++) — `Code2`
- Éloquence & Storytelling — `Mic`

Cartes en grille responsive (1/2/4 colonnes), bordure violette subtile, glow au hover.

### 4. `TrustCarousel` — "Ils m'ont fait confiance"
Marquee horizontal infini (CSS keyframes + duplication de la liste pour boucle fluide). Mix de :
- **Logos d'agences** (rectangles stylisés avec nom typographié, placeholders SVG/CSS — pas d'images lourdes).
- **Photos de profil créateurs** dans cercles avec bordure violette + glow.

Liste éditable dans `portfolio.ts` (type discriminé `logo` | `creator`).

### 5. `Portfolio` à onglets
Composant Tabs (shadcn `tabs`) avec 2 onglets :
- **Serious & Business** : grille d'embeds YouTube 16:9 (placeholders `<iframe>` éditables).
- **Divertissement & Créa** : grille d'embeds verticaux 9:16 (Instagram/TikTok placeholders).

Chaque vignette : titre, plateforme, hover glow violet.

### 6. `Timeline` — frise verticale animée
- Ligne centrale violette dont le `scaleY` s'illumine progressivement au scroll (Framer Motion `useScroll` + `useTransform`).
- Points critiques en or `#e4c942` (entrées clés), autres en violet.
- Entrées : **Orange (Data Center)**, **CCF (Secteur Bancaire)**, **Veolia (Stratégie)** + ajout libre éditable.
- Cards alternées gauche/droite sur desktop, empilées sur mobile.

### 7. `Contact` — minimaliste
- Email + téléphone uniquement, gros, centrés.
- CTA or "Envoyer un email" (mailto).
- Aucun réseau social personnel.

### 8. `Footer`
Mention discrète, copyright, retour en haut.

## Architecture fichiers

```
src/
├── content/
│   └── portfolio.ts            # Toutes les données éditables
├── components/portfolio/
│   ├── BackgroundBlobs.tsx
│   ├── Hero.tsx
│   ├── Skills.tsx
│   ├── TrustCarousel.tsx
│   ├── Portfolio.tsx
│   ├── Timeline.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── routes/
    ├── __root.tsx              # Ajout font Plus Jakarta Sans + meta SEO
    └── index.tsx               # Assemblage one-page
```

## Détails techniques

- **Framer Motion** installé pour : entrées au scroll (`whileInView` + `viewport={{ once: true }}`), respiration des blobs, progression de la timeline (`useScroll`).
- **Tailwind v4** : tokens custom `--color-bg-abyss`, `--color-violet`, `--color-gold` ajoutés dans `styles.css` + utilitaires `.glow-violet`, `.glow-gold`, `.marquee` (keyframes CSS pour le carousel infini).
- **Responsive** : mobile-first, breakpoints `md`/`lg`, timeline empilée mobile, grilles fluides.
- **Performance** : pas d'images externes lourdes ; logos et avatars en SVG/CSS placeholders. Embeds vidéo en `loading="lazy"`.
- **SEO** : `head()` du root mis à jour (titre, description, og en français centrés sur Alem Djibril).
- **Accessibilité** : contrastes vérifiés sur fond noir, focus visibles or, `prefers-reduced-motion` respecté pour blobs et marquee.

## Hors scope (à demander si souhaité plus tard)
- Formulaire de contact backend (actuellement mailto direct).
- Page projet détaillée par vidéo.
- Internationalisation FR/EN.
