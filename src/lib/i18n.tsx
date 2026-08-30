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
