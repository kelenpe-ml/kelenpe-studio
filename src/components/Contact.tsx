import { ArrowUpRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Magnetic } from "@/components/Magnetic";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

export const EMAIL = "eniac5project@gmail.com";
export const PHONE_DISPLAY = "+223 72 19 66 36";
export const PHONE_HREF = "tel:+22372196636";

export function Contact() {
  const reduced = usePrefersReducedMotion();
  const { t } = useI18n();

  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full items-center px-6 py-24 md:px-12 lg:px-20 xl:px-28"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduced ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase"
        >
          <span className="text-ocre">04</span> — {t("contact.label")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduced ? 0.2 : 0.7, delay: reduced ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-3xl text-[clamp(2rem,5.4vw,4rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-foreground"
        >
          {t("contact.title")}
        </motion.h2>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("contact.text")}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
          <Magnetic>
            <a
              href={`mailto:${EMAIL}`}
              className="group bg-ink text-cream hover:shadow-elegant inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 active:translate-y-0"
            >
              {t("contact.cta")}
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </Magnetic>

          <a
            href={PHONE_HREF}
            className="link-underline inline-flex items-center gap-2 font-mono text-sm text-foreground/80 transition-colors hover:text-foreground"
          >
            <Phone className="text-ocre size-4" />
            {PHONE_DISPLAY}
          </a>
        </div>

        <a
          href={`mailto:${EMAIL}`}
          className="link-underline mt-6 inline-block font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {EMAIL}
        </a>
      </div>
    </section>
  );
}
