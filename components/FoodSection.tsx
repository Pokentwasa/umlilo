"use client";

import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, MQ } from "@/lib/gsap";
import { dishes, sharingPlatters, type Dish } from "@/data/menu";
import ImagePlaceholder from "./ImagePlaceholder";

const GRILL_BARS = 6;

function DishPanel({ dish, index }: { dish: Dish; index: number }) {
  return (
    <article className="dish-panel relative h-[64vh] w-[86vw] shrink-0 snap-center overflow-hidden lg:h-[78vh] lg:w-[58vw] xl:w-[50vw]">
      <ImagePlaceholder
        brief={dish.placeholder}
        tag={String(index + 1).padStart(2, "0")}
        className="absolute inset-0 h-full w-full"
        src={dish.image}
        hideCaption
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.15) 55%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Grill-bar mask: opens as the dish scrolls to centre, closes as
          it moves away — the reveal is tied to the braai grid, not a
          digital wipe. Only meaningful over a real photo; skipped on
          placeholder dishes so it doesn't read as stray dark blocks. */}
      {dish.image && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] flex flex-col">
          {Array.from({ length: GRILL_BARS }).map((_, i) => (
            <span key={i} className="dish-bar block flex-1 bg-bone" />
          ))}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 z-[3] p-6 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember">
          {dish.category}
        </p>
        <h3 className="mt-2 text-balance font-display text-5xl font-medium leading-[0.9] text-bone sm:text-7xl">
          {dish.name}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-bone/75">{dish.description}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
          {dish.price ? `R${dish.price}` : "Market price"}
        </p>
      </div>
    </article>
  );
}

export default function FoodSection() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const allDishes = useMemo(() => [...dishes, ...sharingPlatters], []);

  useGSAP(
    () => {
      const track = trackRef.current;
      const pinTarget = pinRef.current;
      if (!track || !pinTarget) return;

      const mm = gsap.matchMedia();

      mm.add(`${MQ.desktop} and ${MQ.motionOk}`, () => {
        const distance = track.scrollWidth - window.innerWidth;
        if (distance <= 0) return;

        const panels = gsap.utils.toArray<HTMLElement>(".dish-panel");
        gsap.set(".dish-bar", { xPercent: (i) => (i % 2 === 0 ? -100 : 100) });

        const syncPanels = (progress: number) => {
          gsap.set(track, { x: -distance * progress });
          const centerX = window.innerWidth / 2;
          panels.forEach((panel) => {
            const rect = panel.getBoundingClientRect();
            const panelCenter = rect.left + rect.width / 2;
            const dist = Math.abs(panelCenter - centerX);
            const t = gsap.utils.clamp(0, 1, dist / (window.innerWidth * 0.55));
            gsap.set(panel, {
              scale: gsap.utils.interpolate(1, 0.9, t),
              opacity: gsap.utils.interpolate(1, 0.55, t),
            });
            // Cubic-eased so the grill bars commit fully open across most
            // of the "centred" range, rather than needing t===0 exactly —
            // scrubbed scroll (no snap) can rest anywhere near centre.
            const barT = t * t * t;
            gsap.set(panel.querySelectorAll(".dish-bar"), {
              xPercent: (i: number) => gsap.utils.interpolate(i % 2 === 0 ? -100 : 100, 0, barT),
            });
          });
        };

        const st = ScrollTrigger.create({
          trigger: pinTarget,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => syncPanels(self.progress),
        });

        syncPanels(st.progress);

        return () => st.kill();
      });

      // Reduced motion / mobile: bars stay fully open, images always visible.
      mm.add(`not all and (${MQ.desktop} and ${MQ.motionOk})`, () => {
        gsap.set(".dish-bar", { xPercent: (i) => (i % 2 === 0 ? -100 : 100) });
      });
    },
    { scope: rootRef, dependencies: [allDishes.length] }
  );

  return (
    <section ref={rootRef} id="food" className="relative bg-ink" aria-label="Food">
      <div className="container-edit pt-28 sm:pt-36 lg:pt-0">
        <div className="lg:absolute lg:left-0 lg:top-16 lg:z-10 lg:w-full lg:px-[6vw]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember">
            Tshisa Nyama
          </p>
          <h2 className="mt-3 max-w-2xl text-balance font-display text-4xl font-medium leading-[0.95] text-bone sm:text-5xl lg:text-6xl">
            Food that fills the whole table, not a plate.
          </h2>
        </div>
      </div>

      <div ref={pinRef} className="relative lg:h-screen lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-16 pt-10 [-webkit-overflow-scrolling:touch] sm:gap-8 sm:px-10 lg:h-screen lg:snap-none lg:items-center lg:overflow-visible lg:px-[6vw] lg:pb-0 lg:pt-0"
        >
          {allDishes.map((dish, i) => (
            <DishPanel key={dish.slug} dish={dish} index={i} />
          ))}
          <div className="hidden w-[6vw] shrink-0 lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
