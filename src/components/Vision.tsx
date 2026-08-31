import { useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { useSlowConnection } from "@/hooks/use-connection";
import { loadGsap } from "@/lib/gsap";

export function Vision() {
  const { t, lang } = useI18n();
  const root = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const slow = useSlowConnection();
  const lite = reduced || slow;

  const lines = [t("vision.p1a"), t("vision.p1b"), t("vision.p2a"), t("vision.p2b")];

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-vision-line]"));
    if (!items.length) return;

    // Reduced motion: everything visible, no animation at all.
    if (reduced) {
      items.forEach((i) => {
        i.style.opacity = "1";
        i.style.transform = "none";
      });
      return;
    }

    // Slow connection: simple CSS fade-in on view, no GSAP, no scrub.
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

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.set(items, { opacity: 0.12, y: 20 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        items.forEach((item, i) => {
          tl.to(item, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, i * 1.15);
          const prev = items[i - 1];
          if (prev) tl.to(prev, { opacity: 0.16, duration: 1, ease: "none" }, i * 1.15);
        });

        ScrollTrigger.refresh();
      }, el);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [lang, reduced, slow]);

  return (
    <section
      id="vision"
      ref={root}
      className={lite ? "relative w-full py-24 md:py-32" : "relative h-[320vh] w-full"}
    >
      <div
        className={
          lite
            ? "flex w-full items-center px-6 md:px-12 lg:px-20 xl:px-28"
            : "sticky top-0 flex h-screen w-full items-center px-6 md:px-12 lg:px-20 xl:px-28"
        }
      >
        <div className="mx-auto w-full max-w-5xl">
          <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
            <span className="text-ocre">02</span> — {t("vision.title")}
          </p>

          <div className="mt-8 space-y-5 md:mt-12 md:space-y-7">
            {lines.map((line, i) => (
              <p
                key={`${lang}-${i}`}
                data-vision-line
                className="max-w-3xl text-[clamp(1.05rem,2.6vw,2rem)] leading-[1.3] font-medium tracking-[-0.02em] text-foreground"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
