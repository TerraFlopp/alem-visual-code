# Retirer la frise et revoir les compétences

## 1. Supprimer la frise chronologique
- Retirer la section "Parcours" de la page d'accueil.

## 2. Compétences (3 cartes au lieu de 4)
- **Post-production**: inchangée.
- **Stratégie & Accompagnement** (remplace "Stratégie & Community"): texte centré sur les élèves accompagnés, par exemple: "J'accompagne des créateurs de A à Z: positionnement, ligne éditoriale et stratégie de publication. Une de mes élèves a dépassé 300 000 vues dès sa première vidéo."
- **Développement**: supprimée.
- **Éloquence & Storytelling** devient **Rédaction de shorts à haute rétention**: "Scripts courts pensés pour retenir l'attention: accroche dans les premières secondes, rythme serré, chute qui donne envie de revoir."
- Grille passée à 3 colonnes sur grand écran.

## Détails techniques
- `src/routes/index.tsx`: retirer l'import et le rendu de `Timeline` (le fichier du composant et les données restent, faciles à remettre).
- `src/components/portfolio/Skills.tsx`: mettre à jour le tableau `skills` (icônes Film, Users, PenLine), `lg:grid-cols-3`.
