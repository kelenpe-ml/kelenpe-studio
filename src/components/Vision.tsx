import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Vision() {
  const { t, lang } = useI18n();
  const root = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  const lines = [
    t("vision.p1a"),
    t("vision.p1b"),
    t("vision.p2a"),
    t("vision.p2b"),
  ];

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-vision-line]");
      if (!items.length) return;

      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0.12, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${items.length * 60}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      items.forEach((item, i) => {
        tl.to(item, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, i * 1.1);
        const prev = items[i - 1];
        if (prev) {
          tl.to(prev, { opacity: 0.18, duration: 1, ease: "none" }, i * 1.1);
        }
      });

      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [lang, reduced] },
  );

  return (
    <section
      id="vision"
      ref={root}
      className="relative flex min-h-screen w-full items-center px-6 md:px-12 lg:px-20 xl:px-28"
    >
      <div className="mx-auto w-full max-w-5xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
          <span className="text-ocre">02</span> — {t("vision.title")}
        </p>

        <div className="mt-10 space-y-6 md:mt-14 md:space-y-8">
          {lines.map((line, i) => (
            <p
              key={`${lang}-${i}`}
              data-vision-line
              className="max-w-3xl text-[clamp(1.25rem,3.2vw,2.35rem)] leading-[1.28] font-medium tracking-[-0.02em] text-foreground"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
