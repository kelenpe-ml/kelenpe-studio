import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

/** Discreet dot cursor on fine-pointer devices; grows over interactive elements. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    let x = 0,
      y = 0,
      cx = 0,
      cy = 0,
      raf = 0;
    let scale = 1;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement | null;
      scale = target?.closest("a,button,[role='button']") ? 2.4 : 1;
    };

    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="bg-ocre pointer-events-none fixed top-0 left-0 z-[100] hidden size-2 rounded-full opacity-70 transition-[width,height] duration-200 lg:block"
      style={{ willChange: "transform" }}
    />
  );
}
