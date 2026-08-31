import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

/** Subtle magnetic hover for primary buttons — desktop pointers only. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const enabled =
    !reduced && typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: "inline-block" }}
      animate={pos}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.4 }}
      onMouseMove={(e) => {
        if (!enabled || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos({
          x: (e.clientX - (r.left + r.width / 2)) * 0.18,
          y: (e.clientY - (r.top + r.height / 2)) * 0.28,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
    >
      {children}
    </motion.span>
  );
}
