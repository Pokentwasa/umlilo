"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, MQ } from "@/lib/gsap";

/**
 * The site's connective visual motif: a thin glowing ember line that
 * draws itself down a fixed rail as the visitor scrolls the whole
 * page, then fades out at the final section. It sits at a modest
 * z-index so full-bleed imagery in Hero/Gallery/Imbizo can pass in
 * front of it — the line "disappears behind imagery and reappears."
 * Desktop-only; on touch/small screens the motif reads through
 * section-level ember accents instead, so nothing is lost.
 */
export default function EmberThread() {
  const railRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useGSAP(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const mm = gsap.matchMedia();

    mm.add(MQ.desktop, () => {
      const trigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => {
          gsap.set(path, { strokeDashoffset: length * (1 - self.progress) });
          const point = path.getPointAtLength(length * self.progress);
          gsap.set(dot, { attr: { cx: point.x, cy: point.y } });
        },
      });
      return () => trigger.kill();
    });
  }, []);

  return (
    <div
      ref={railRef}
      aria-hidden="true"
      className="pointer-events-none fixed right-6 top-0 z-30 hidden h-screen w-10 lg:block xl:right-10"
    >
      <svg
        viewBox="0 0 40 1000"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <path
          d="M20 0 C 32 80, 8 160, 20 240 C 32 320, 8 400, 20 480 C 32 560, 8 640, 20 720 C 32 800, 8 880, 20 960 L 20 1000"
          fill="none"
          stroke="var(--color-steel)"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <path
          ref={pathRef}
          d="M20 0 C 32 80, 8 160, 20 240 C 32 320, 8 400, 20 480 C 32 560, 8 640, 20 720 C 32 800, 8 880, 20 960 L 20 1000"
          fill="none"
          stroke="var(--color-ember)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="ember-glow"
        />
        <circle ref={dotRef} r="3.5" fill="var(--color-ember)" className="ember-glow" />
      </svg>
    </div>
  );
}
