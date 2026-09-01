import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

const dict = {
  fr: {
    "nav.home": "Accueil",
    "nav.vision": "Vision",
    "nav.work": "Réalisations",
    "nav.contact": "Contact",
    "nav.menu": "Menu",
    "hero.title": "Des logiciels pensés pour durer",
    "hero.subtitle":
      "Kelenpe conçoit des solutions numériques sur mesure, pensées pour des besoins réels et construites pour fonctionner ici, dans nos réalités.",
    "hero.scroll": "Défiler",
    "hero.label": "Studio logiciel — Bamako, Mali",
    "vision.title": "Notre vision",
    "vision.p1a":
      "La plupart des logiciels sont pensés ailleurs, puis adaptés tant bien que mal à nos réalités.",
    "vision.p1b":
      "Kelenpe part du problème concret, quel qu'il soit, pour construire des produits qui fonctionnent vraiment, ici, maintenant.",
    "vision.p2a": "On ne code pas avant d'avoir compris.",
    "vision.p2b":
      "Chaque produit Kelenpe naît d'une architecture pensée, discutée et validée — avant la moindre ligne de code. La solidité avant la vitesse.",
    "work.title": "Réalisations récentes",
    "work.boutik.title": "Boutik",
    "work.boutik.tagline":
      "Une application simple pour gérer les ventes et le stock au quotidien.",
    "work.boutik.desc":
      "Boutik aide à suivre les ventes, le stock et les paiements, avec toutes les données conservées en sécurité, même sans connexion internet.",
    "work.prodora.title": "Prodora",
    "work.prodora.tagline": "Une plateforme pour acheter et vendre en ligne, simplement.",
    "work.prodora.desc":
      "Prodora met en relation vendeurs et acheteurs, avec une recherche rapide et des recommandations adaptées à chacun.",
    "work.soon.title": "Prochainement",
    "work.soon.tagline": "",
    "work.soon.desc":
      "D'autres outils sont en préparation, pensés pour s'intégrer au même écosystème.",
    "contact.label": "Contact",
    "contact.title": "Parlons de votre projet",
    "contact.text":
      "Une idée, un besoin, un projet à chiffrer ? Kelenpe conçoit aussi des solutions sur mesure.",
    "contact.cta": "Nous écrire",
    "footer.tagline": "Kelenpe — Bamako, Mali.",
  },

  en: {
    "nav.home": "Home",
    "nav.vision": "Vision",
    "nav.work": "Recent work",
    "nav.contact": "Contact",
    "nav.menu": "Menu",
    "hero.title": "Software built to last",
    "hero.subtitle":
      "Kelenpe designs custom digital solutions, built for real needs and made to work here, in our own realities.",
    "hero.scroll": "Scroll",
    "hero.label": "Software studio — Bamako, Mali",
    "vision.title": "Our vision",
    "vision.p1a": "Most software is designed elsewhere, then loosely adapted to local realities.",
    "vision.p1b":
      "Kelenpe starts from the concrete problem at hand to build products that actually work, here, now.",
    "vision.p2a": "We don't write code before we understand.",
    "vision.p2b":
      "Every Kelenpe product starts with an architecture that's thought through, discussed, and validated — before a single line of code. Solidity before speed.",
    "work.title": "Recent work",
    "work.boutik.title": "Boutik",
    "work.boutik.tagline": "A simple app to manage daily sales and stock.",
    "work.boutik.desc":
      "Boutik helps track sales, stock, and payments, with all data kept secure — even without an internet connection.",
    "work.prodora.title": "Prodora",
    "work.prodora.tagline": "A platform to buy and sell online, simply.",
    "work.prodora.desc":
      "Prodora connects sellers and buyers, with fast search and recommendations tailored to each person.",
    "work.soon.title": "Coming soon",
    "work.soon.tagline": "",
    "work.soon.desc":
      "More tools are in the works, designed to plug into the same ecosystem.",
    "contact.label": "Contact",
    "contact.title": "Let's talk about your project",
    "contact.text":
      "Have an idea or a need to scope out? Kelenpe also builds custom solutions.",
    "contact.cta": "Get in touch",
    "footer.tagline": "Kelenpe — Bamako, Mali.",
  },

} as const;

export type TranslationKey = keyof (typeof dict)["fr"];

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

const STORAGE_KEY = "kelenpe-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") {
      setLangState(stored);
      return;
    }
    const nav = navigator.language?.toLowerCase() ?? "fr";
    setLangState(nav.startsWith("en") ? "en" : "fr");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === "fr"
        ? "Kelenpe — Studio logiciel basé à Bamako"
        : "Kelenpe — Software studio based in Bamako";
    const desc =
      lang === "fr"
        ? "Kelenpe conçoit des solutions numériques sur mesure, pensées pour des besoins réels et construites pour durer."
        : "Kelenpe designs custom digital solutions, built for real needs and made to work here, in our own realities.";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", desc);
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const value: I18nValue = {
    lang,
    setLang,
    toggle: () => setLang(lang === "fr" ? "en" : "fr"),
    t: (key) => dict[lang][key],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
