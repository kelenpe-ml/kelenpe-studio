import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { scrollToSection } from "@/hooks/use-lenis";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const links: { key: TranslationKey; hash: string }[] = [
  { key: "nav.home", hash: "#hero" },
  { key: "nav.vision", hash: "#vision" },
  { key: "nav.work", hash: "#produits" },
  { key: "nav.contact", hash: "#contact" },
];

export function FloatingMenu() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const spring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 320, damping: 32, mass: 0.8 };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="fixed left-1/2 z-50 -translate-x-1/2 bottom-6 lg:bottom-auto lg:top-6"
    >
      <motion.div
        layout
        transition={spring}
        className="flex items-center overflow-hidden rounded-full bg-ink/90 text-cream shadow-[0_12px_40px_-12px_rgba(38,38,37,0.55)] backdrop-blur-md"
        style={{ borderRadius: 9999 }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {!open ? (
            <motion.button
              key="toggle"
              layout
              type="button"
              aria-label={t("nav.menu")}
              aria-expanded={false}
              onClick={() => setOpen(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.18 }}
              className="flex size-14 items-center justify-center"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-px w-5 bg-cream" />
                <span className="block h-px w-5 bg-cream" />
                <span className="block h-px w-5 bg-cream" />
              </span>
            </motion.button>
          ) : (
            <motion.nav
              key="pill"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.22, delay: reduced ? 0 : 0.05 }}
              className="flex max-w-[90vw] items-center gap-4 px-5 py-3 sm:gap-6 sm:px-7 lg:py-4"
            >
              {links.map((l) => (
                <a
                  key={l.hash}
                  href={l.hash}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    scrollToSection(l.hash);
                  }}
                  className="link-underline shrink-0 text-[11px] tracking-wide whitespace-nowrap text-cream/85 transition-colors hover:text-cream sm:text-sm"
                >
                  {t(l.key)}
                </a>
              ))}

              <span className="h-4 w-px shrink-0 bg-cream/25" />

              <div className="flex shrink-0 items-center gap-1 font-mono text-[10px] sm:text-xs">
                {(["fr", "en"] as const).map((code, i) => (
                  <span key={code} className="flex items-center gap-1">
                    {i === 1 && <span className="text-cream/30">/</span>}
                    <button
                      type="button"
                      onClick={() => setLang(code)}
                      data-active={lang === code}
                      className="link-underline uppercase transition-colors data-[active=true]:text-ocre text-cream/60 hover:text-cream"
                    >
                      {code}
                    </button>
                  </span>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
