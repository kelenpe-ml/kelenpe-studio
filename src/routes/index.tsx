import { createFileRoute } from "@tanstack/react-router";
import { FloatingMenu } from "@/components/FloatingMenu";
import { Hero } from "@/components/Hero";
import { I18nProvider } from "@/lib/i18n";
import { useLenisScroll } from "@/hooks/use-lenis";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kelenpe — Studio logiciel à Bamako, Mali" },
      {
        name: "description",
        content:
          "Kelenpe conçoit des solutions numériques sur mesure, pensées pour des besoins réels et construites pour durer.",
      },
      { property: "og:title", content: "Kelenpe — Studio logiciel à Bamako" },
      {
        property: "og:description",
        content:
          "Des logiciels pensés pour durer, pas pour impressionner. Solutions numériques sur mesure.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useLenisScroll();

  return (
    <I18nProvider>
      <main className="bg-background text-foreground">
        <FloatingMenu />
        <Hero />
        <section id="vision" className="min-h-screen" />
        <section id="produits" className="min-h-screen" />
        <section id="contact" className="min-h-screen" />
      </main>
    </I18nProvider>
  );
}
