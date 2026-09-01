# Kelenpe Studio

Crée un site vitrine one-page en React + Vite + TypeScript + Tailwind CSS pour "Kelenpe", un studio logiciel basé à Bamako, Mali, qui conçoit des solutions numériques sur mesure. Ne rattache la marque à aucun secteur particulier dans les textes — reste au niveau des principes (rigueur, sur mesure, conçu pour durer).

DESIGN SYSTEM

- Couleurs (à ajouter dans tailwind.config) : dark #262625 (charbon sombre, couleur de marque), off-white #F3F0EA (blanc cassé, jamais blanc pur — utilisé comme fond principal et comme texte sur fond sombre), accent #C9A669 (ocre discret, à utiliser uniquement en petite touche : soulignement animé, état actif d'un lien — jamais en grand aplat).

- Typographie : titres en "General Sans" (via le CDN Fontshare, graisses 500/600/700), texte courant en "Inter" (Google Fonts), petits labels/numéros de section en "JetBrains Mono" (Google Fonts) pour une touche technique.

- Ambiance générale : minimaliste, sombre et élégant, beaucoup d'espace blanc cassé, grandes typographies, pas de dégradé criard type SaaS générique.

INSTALLATION

Installe et configure : framer-motion, lenis (smooth scroll), react-i18next (ou un contexte React custom léger si plus simple) pour le bilingue FR/EN, lucide-react pour les icônes.

1) SCROLL GLOBAL

Active un smooth scroll fluide via Lenis sur toute la page, désactivé automatiquement si l'utilisateur a activé "prefers-reduced-motion" dans son système (dans ce cas, scroll natif classique).

2) STRUCTURE DE PAGE

Une page unique en sections plein écran. Pour l'instant construis uniquement le Hero. Laisse déjà les ancres vides #vision, #produits et #contact dans le DOM (sections vides, elles seront remplies dans un prochain prompt) pour que le menu puisse déjà pointer dessus.

3) MENU FLOTTANT (élément le plus important de ce prompt)

- Desktop (>1024px) : bouton rond fixe en haut, centré horizontalement (top-6, centré), ~56px de diamètre, fond charbon sombre, icône hamburger blanche (3 traits) qui se transforme en croix quand ouvert, légère ombre flottante douce.

- Mobile/petit écran (<1024px) : le même bouton, mais fixé en bas et centré horizontalement.

- Comportement : au survol du curseur sur desktop (et au tap sur mobile), le bouton se transforme avec une animation fluide (layout animation Framer Motion) en une pilule horizontale flottante — PAS en pleine largeur, arrondie aux extrémités (rounded-full), avec un fond charbon sombre légèrement transparent + backdrop-blur, contenant : les liens de navigation (Accueil/Home, Vision, Réalisations/Recent work, Contact), puis un séparateur discret, puis un petit bouton de langue "FR / EN".

- Chaque lien a un effet de soulignement animé qui se dessine au survol (pas juste un changement de couleur).

- Le menu se referme au clic en dehors, ou après avoir cliqué sur un lien (scroll fluide vers la section grâce à Lenis).

- Sur mobile, le menu reste horizontal comme sur desktop (pas de liste verticale), juste plus compact, en dessous de 90% de la largeur d'écran.

4) SÉLECTEUR DE LANGUE

Un contexte i18n FR/EN simple, avec persistance du choix dans le localStorage, langue par défaut détectée via le navigateur si possible sinon FR. Intègre déjà les clés de traduction pour le menu et le Hero (contenu fourni ci-dessous).

5) SECTION HERO (100vh)

Structure : un très gros titre, un sous-titre, et un indicateur de scroll discret en bas (petit trait ou flèche qui pulse doucement en boucle).

Le titre s'anime à l'arrivée sur la page : reveal mot par mot (ou lettre par lettre) via Framer Motion, avec un léger décalage (stagger) et un easing doux — pas un simple fade instantané.

Ajoute un léger élément graphique qui réagit au tout début du scroll (par exemple une forme abstraite inspirée du "K" du logo, ou juste une typographie en fond, qui bouge légèrement en parallax) : ça doit être un avant-goût discret de l'expérience de scroll immersive qui sera développée dans les sections suivantes — reste sobre ici.

CONTENU DU HERO (à utiliser tel quel, pas de Lorem Ipsum) :

FR :

Titre : "Des logiciels pensés pour durer, pas pour impressionner."

Sous-titre : "Kelenpe conçoit des solutions numériques sur mesure, pensées pour des besoins réels et construites pour fonctionner ici, dans nos réalités."

EN :

Title: "Software built to last, not to impress."

Subtitle: "Kelenpe designs custom digital solutions, built for real needs and made to work here, in our own realities."

Labels du menu :

FR : Accueil / Vision / Réalisations / Contact

EN : Home / Vision / Recent work / Contact

PERFORMANCE DE BASE

Toutes les animations doivent respecter prefers-reduced-motion (fallback : simple apparition, sans mouvement). N'installe pas GSAP dans ce prompt, Framer Motion + Lenis suffisent pour cette étape — GSAP arrivera au prompt suivant.

Ne construis que ce qui est demandé ici. Vision, Réalisations et Contact seront ajoutés dans les prochains prompts.

Je t'ai joins les logo, avec le nom, sans non, avec un background et sans background

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f381be22-063b-44c7-9abd-ea74894132c3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
