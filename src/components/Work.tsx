import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { useSlowConnection } from "@/hooks/use-connection";
import { loadGsap } from "@/lib/gsap";
import type { TranslationKey } from "@/lib/i18n";

const cards: { key: string; title: TranslationKey; tagline: TranslationKey; desc: TranslationKey }[] =
  [
    {
      key: "boutik",
      title: "work.boutik.title",
      tagline: "work.boutik.tagline",
      desc: "work.boutik.desc",
    },
    {
      key: "prodora",
      title: "work.prodora.title",
      tagline: "work.prodora.tagline",
      desc: "work.prodora.desc",
    },
    { key: "soon", title: "work.soon.title", tagline: "work.soon.tagline", desc: "work.soon.desc" },
  ];

export function Work() {
  const { t, lang } = useI18n();
  const root = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const slow = useSlowConnection();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-work-card]"));
    if (!items.length) return;

    if (reduced) {
      items.forEach((i) => {
        i.style.opacity = "1";
        i.style.transform = "none";
      });
      return;
    }

    if (slow) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              (e.target as HTMLElement).style.opacity = "1";
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      items.forEach((i) => {
        i.style.opacity = "0";
        i.style.transition = "opacity 600ms ease";
        io.observe(i);
      });
      return () => io.disconnect();
    }

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          items,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.14,
            scrollTrigger: { trigger: el, start: "top 72%", once: true },
          },
        );
      }, el);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [lang, reduced, slow]);

  return (
    <section
      id="produits"
      ref={root}
      className="relative flex min-h-screen w-full items-center px-6 py-24 md:px-12 lg:px-20 xl:px-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduced ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase"
        >
          <span className="text-ocre">03</span> — {t("work.title")}
        </motion.p>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
          {cards.map((c) => {
            const tagline = t(c.tagline);
            return (
              <article
                key={c.key}
                data-work-card
                className="group border-border bg-card/40 hover:shadow-elegant flex flex-col rounded-2xl border p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2"
              >
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-foreground">
                  {t(c.title)}
                </h3>
                {tagline ? (
                  <p className="text-ocre mt-3 text-sm leading-relaxed">{tagline}</p>
                ) : null}
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t(c.desc)}</p>
                <span className="bg-ocre/60 mt-8 block h-px w-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
