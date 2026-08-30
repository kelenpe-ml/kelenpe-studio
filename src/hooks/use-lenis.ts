import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./use-reduced-motion";

let lenisInstance: Lenis | null = null;

export function scrollToSection(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, { duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "auto", block: "start" });
  }
}

export function useLenisScroll() {
  const reduced = usePrefersReducedMotion();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      lenisInstance = null;
      return;
    }
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisInstance = lenis;

    gsap.registerPlugin(ScrollTrigger);
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reduced]);
}
