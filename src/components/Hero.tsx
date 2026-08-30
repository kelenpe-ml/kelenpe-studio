import { motion, useScroll, useTransform } from "framer-motion";
import kLogo from "@/assets/kelenpe-k.png.asset.json";
import { useI18n } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

export function Hero() {
  const { t, lang } = useI18n();
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 120]);
  const opacity = useTransform(scrollY, [0, 500], [0.055, reduced ? 0.055 : 0.02]);
  const rotate = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -6]);

  const words = t("hero.title").split(" ");

  return (
    <section
      id="hero"
      className="relative grid min-h-screen w-full grid-rows-[1fr_auto] overflow-hidden px-6 md:px-12 lg:px-20 xl:px-28"
    >
      {/* Abstract mark, subtle parallax */}
      <motion.img
        src={kLogo.url}
        alt=""
        aria-hidden="true"
        style={{ y, rotate, opacity }}
        className="pointer-events-none absolute -right-24 top-1/2 w-[70vw] max-w-[820px] -translate-y-1/2 select-none sm:-right-16"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.1 }}
          className="mb-6 font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase sm:mb-8"
        >
          <span className="text-ocre">01</span> — {t("hero.label")}
        </motion.p>

        <h1
          key={lang}
          className="max-w-5xl text-[clamp(2.4rem,7.2vw,5.6rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-foreground"
        >
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: "0.5em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0.2 : 0.9,
                delay: reduced ? 0 : 0.25 + i * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mr-[0.24em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0.2 : 0.9,
            delay: reduced ? 0 : 0.5 + words.length * 0.02,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg"
        >
          {t("hero.subtitle")}
        </motion.p>
      </div>

      {/* Scroll indicator — aligned to the content column */}
      <div className="relative mx-auto flex w-full max-w-6xl items-end pb-8">
        <div className="flex flex-col items-start gap-2" aria-hidden="true">
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            {t("hero.scroll")}
          </span>
          <div className="relative h-12 w-px overflow-hidden bg-foreground/20">
            <div className="h-full w-full origin-top scale-y-100 bg-ocre motion-safe:animate-scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
