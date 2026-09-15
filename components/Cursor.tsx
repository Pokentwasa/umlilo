"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Small, sophisticated custom cursor — desktop (fine pointer) only.
 * Reads a `data-cursor` attribute off the nearest ancestor to show a
 * short verb (VIEW / DRAG / OPEN). Never renders on touch devices,
 * and never blocks pointer events.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine)");

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const xTo = gsap.quickTo(dotRef.current, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(dotRef.current, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className={`flex items-center justify-center rounded-full border border-bone/40 bg-charcoal/40 backdrop-blur-sm transition-[width,height] duration-200 ease-out ${
          label ? "h-16 w-16" : "h-3 w-3"
        }`}
      >
        <span
          ref={labelRef}
          className={`font-sans text-[0.6rem] font-semibold tracking-[0.15em] text-bone transition-opacity duration-150 ${
            label ? "opacity-100" : "opacity-0"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
