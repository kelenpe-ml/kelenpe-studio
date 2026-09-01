# Résumé projet — Site vitrine Kelenpe

## Contexte
Kelenpe n'a pas encore de site vitrine (juste le nom de domaine `kelenpe.com`). Construction en cours sur **Lovable** (plan gratuit, ~4 prompts/jour), en 4 prompts séquentiels donnés un par un, avec validation du rendu entre chaque envoi.

## Décisions de positionnement (importantes, plusieurs allers-retours)
- Kelenpe est un studio de solutions numériques **généraliste**, pas un studio spécialisé "commerce", même si les deux réalisations montrées (Boutik, Prodora) sont des projets de commerce.
- Le site ne doit **associer la marque à aucun secteur**, ni en positif ni en creux (pas de formulations type "pas seulement le commerce, mais aussi..." qui finissent par nommer un domaine). Le texte reste au niveau des principes : rigueur, sur mesure, conçu pour durer.
- Malgré ça, **montrer des réalisations concrètes reste nécessaire** pour la crédibilité (studio solo, sans preuve de travail = pas crédible). Solution retenue : section renommée **"Réalisations récentes" / "Recent work"** (au lieu de "Produits" / "Ce qu'on construit") — la nuance temporelle ("récentes") signale un instantané, pas une spécialité figée.
- Descriptions des produits (Boutik, Prodora) : **simples et non-techniques**, destinées à un public à 95% non-développeur. Pas de jargon d'architecture (offline-first, chiffrement, etc.) — ce niveau de détail a été essayé puis retiré sur demande explicite.
- Aucune fausse statistique, aucun faux témoignage, aucun chiffre d'utilisateurs inventé (Prodora est jeune, sans traction à afficher).

## Design system validé
- **Couleurs** : `dark #262625` (charbon sombre, couleur de marque), `off-white #F3F0EA` (blanc cassé, jamais blanc pur), `accent #C9A669` (ocre discret, usage minimal : soulignements, curseur personnalisé, états actifs).
- **Typographie** : titres en **General Sans** (Fontshare), texte courant en **Inter** (Google Fonts), labels/numéros en **JetBrains Mono**.
- **Ambiance** : minimaliste, sombre et élégant, grands espaces, pas de dégradé "SaaS générique".
- Contenu rédigé en dur (pas de Lorem Ipsum), bilingue FR/EN dès le départ.

## Architecture technique
- **Stack** : React + Vite + TypeScript + Tailwind CSS (générée par Lovable).
- **Animation/scroll** :
  - `Lenis` pour le smooth scroll global, désactivé si `prefers-reduced-motion` ou connexion lente détectée.
  - `Framer Motion` pour les micro-interactions et les reveals au scroll (`whileInView`, fade + translateY).
  - `GSAP` + `ScrollTrigger` réservé à **un seul effet de pin** sur toute la page (section Vision), pour garder l'immersion "site automobile premium" sans surcharger — décision explicite de ne pas multiplier les pins.
- **i18n** : contexte FR/EN (`I18nProvider`) avec persistance `localStorage`, détection langue navigateur par défaut.
- **Performance / connexions faibles** :
  - Détection `navigator.connection.effectiveType` / `saveData` → désactive scrub GSAP et Lenis si connexion lente.
  - Import dynamique (code splitting) de GSAP/ScrollTrigger pour ne pas bloquer le premier rendu du Hero.
  - Images en webp, lazy loading sauf élément above-the-fold.
  - Pas de preloader bloquant.
- **Composants notables créés** :
  - `src/components/Magnetic.tsx` — effet magnétique léger sur boutons (spring, faible amplitude, désactivé au tactile et en reduced-motion).
  - `src/components/Cursor.tsx` — curseur personnalisé (point ocre, grossit au survol des liens), desktop uniquement.
  - `src/routes/index.tsx` — route principale, doit monter `<Cursor />`.
  - `I18nProvider` — gère aussi le `document.title` et la meta description selon la langue.

## Menu flottant (spécification validée et livrée conforme)
- Desktop : bouton rond fixe en haut centré (~56px), icône hamburger → croix.
- Mobile : même bouton, fixé en bas centré.
- Au hover (desktop) / tap (mobile) : se transforme en pilule horizontale flottante (rounded-full, fond charbon translucide + backdrop-blur), largeur non pleine, contenant les liens + séparateur + sélecteur de langue FR/EN.
- Fermeture au clic extérieur.
- **Résultat confirmé satisfaisant par l'utilisateur** — pas de retouche nécessaire à ce jour.

## Contenu final validé (extraits clés)
- **Hero** :
  - FR : "Des logiciels pensés pour durer, pas pour impressionner." / "Kelenpe conçoit des solutions numériques sur mesure, pensées pour des besoins réels et construites pour fonctionner ici, dans nos réalités."
  - EN : "Software built to last, not to impress." / "Kelenpe designs custom digital solutions, built for real needs and made to work here, in our own realities."
- **Vision** : centrée sur le fait de partir du problème concret plutôt que d'adapter une solution pensée ailleurs — sans jamais nommer de domaine.
- **Réalisations récentes** : Boutik (gestion ventes/stock, fonctionne hors ligne) et Prodora (plateforme achat/vente en ligne), descriptions courtes et non-techniques.
- **Contact** : bouton mailto (`eniac5project@gmail.com`) + tel (`+223 72 19 66 36`).

## Bugs rencontrés et corrigés en cours de route
1. **"DÉFILER" chevauchait le sous-titre du Hero** → repositionné en absolu, indépendant du flux de texte, avec padding-bottom réservé. *(prompt correctif envoyé, résultat pas encore revalidé par l'utilisateur après le 2e retour)*
2. **Espacement vertical incohérent du label "01 — STUDIO LOGICIEL..."** entre petit et grand écran (collé en haut sur grand écran, grand vide sur petit écran) → correctif demandé : centrage vertical du bloc + padding horizontal proportionnel (clamp / breakpoints Tailwind), au lieu d'un padding-top fixe.
3. **"DÉFILER" centré sur toute la largeur de page** alors que le texte est aligné à gauche → correctif demandé : aligner l'indicateur sur la même colonne que le titre, ajouter un élément visuel (trait animé ou flèche pulsante) pour le rattacher visuellement au geste de scroll.

## État d'avancement par prompt
Les 4 prompts ont été exécutés (le Prompt 4/4 en deux passes : une partielle, puis le prompt de reprise sur les points manquants).

- **Prompt 1/4 (Fondations + Hero + Menu)** : livré. Menu jugé conforme. Hero avec 3 bugs de mise en page identifiés (voir ci-dessus), correctifs envoyés — statut de revalidation visuelle à confirmer.
- **Prompt 2/4 (Vision + Réalisations)** : livré.
- **Prompt 3/4 (Contact + Footer + i18n + perf connexions faibles)** : livré.
- **Prompt 4/4 (Polish)** : livré en 2 passes.
  - 1ère passe : `Magnetic.tsx`, `Cursor.tsx` créés ; reveals `whileInView` étendus aux eyebrows de Vision et Réalisations ; crédit épuisé avant la fin.
  - 2e passe (prompt de reprise) : reveal sur le titre Contact, montage de `<Cursor />` dans `src/routes/index.tsx` + `<Magnetic>` sur le bouton principal + `cursor: none` sur le curseur natif, meta title/description dynamiques FR/EN, QA responsive.

## Contraintes de process à respecter (rappel)
- Max 4 prompts Lovable par jour (plan gratuit) → ne jamais envoyer plusieurs prompts de la séquence d'un coup.
- Toujours valider visuellement le rendu d'un prompt avant d'envoyer le suivant.
- Si un prompt s'arrête en cours de route (crédit épuisé), ne pas le relancer en entier : rédiger un prompt de reprise ciblé sur les points manquants uniquement, en réutilisant les noms de fichiers exacts donnés par Lovable.
- Logo K (charbon sombre, fond transparent) à uploader dans le projet Lovable pour favicon — fait (favicon déjà en place via `public/favicon.png` selon le dernier retour de Lovable).

## Prochaine étape immédiate
Revalider visuellement l'ensemble du site (Hero avec ses correctifs, Vision, Réalisations, Contact, finitions du Prompt 4/4) maintenant que les 4 prompts sont exécutés, en particulier :
- Les 3 bugs de mise en page du Hero (DÉFILER chevauchant le texte, espacement vertical incohérent, DÉFILER mal aligné) — vérifier si les correctifs envoyés ont bien été appliqués.
- Le curseur personnalisé (`<Cursor />`) — vérifier qu'il s'affiche bien à la place de la flèche système.
- L'effet magnétique sur le bouton de contact.
- Les meta title/description en FR et EN.
