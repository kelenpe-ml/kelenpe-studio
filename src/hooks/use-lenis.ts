import type Lenis from "lenis";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./use-reduced-motion";
import { useSlowConnection } from "./use-connection";
import { loadGsap } from "@/lib/gsap";

let lenisInstance: Lenis | null = null;

export function scrollToSection(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, { duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function useLenisScroll() {
  const reduced = usePrefersReducedMotion();
  const slow = useSlowConnection();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Native scroll on reduced-motion or slow/data-saver connections.
    if (reduced || slow) {
      lenisInstance = null;
      return;
    }

    let cancelled = false;
    let lenis: Lenis | null = null;
    let detach: (() => void) | null = null;

    (async () => {
      const [{ default: LenisCtor }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        loadGsap(),
      ]);
      if (cancelled) return;

      lenis = new LenisCtor({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenisInstance = lenis;

      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);
      detach = () => lenis?.off("scroll", onScroll);

      const raf = (time: number) => {
        lenis?.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      };
      rafRef.current = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      detach?.();
      lenis?.destroy();
      lenisInstance = null;
    };
  }, [reduced, slow]);
}
