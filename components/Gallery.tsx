"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, Draggable, MQ } from "@/lib/gsap";
import { galleryImages, type GalleryImage } from "@/data/gallery";
import ImagePlaceholder from "./ImagePlaceholder";

const SIZE: Record<GalleryImage["orientation"], string> = {
  portrait: "aspect-[3/4] w-[68vw] sm:w-[38vw] lg:w-[22vw]",
  landscape: "aspect-[4/3] w-[80vw] sm:w-[46vw] lg:w-[28vw]",
  square: "aspect-square w-[58vw] sm:w-[34vw] lg:w-[19vw]",
};

// A gentle alternating offset gives the strip a filmstrip rhythm
// instead of a flat grid, without needing separate parallax layers.
const OFFSET = ["mt-0", "mt-8", "mt-2", "mt-10", "mt-4"];

export default function Gallery() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<GalleryImage | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const mm = gsap.matchMedia();

      mm.add(`${MQ.desktop} and (hover: hover)`, () => {
        const [draggable] = Draggable.create(track, {
          type: "scrollLeft",
          inertia: true,
          cursor: "grab",
          activeCursor: "grabbing",
          edgeResistance: 0.6,
        });
        return () => draggable.kill();
      });

      mm.add(MQ.motionOk, () => {
        const figures = gsap.utils.toArray<HTMLElement>(".gallery-figure");
        figures.forEach((fig) => {
          const xTo = gsap.quickTo(fig, "rotationY", { duration: 0.4, ease: "power2.out" });
          const yTo = gsap.quickTo(fig, "rotationX", { duration: 0.4, ease: "power2.out" });
          const onMove = (e: MouseEvent) => {
            const r = fig.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            xTo(px * 8);
            yTo(-py * 8);
          };
          const onLeave = () => {
            xTo(0);
            yTo(0);
          };
          fig.addEventListener("mousemove", onMove);
          fig.addEventListener("mouseleave", onLeave);
        });
      });
    },
    { scope: rootRef }
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section ref={rootRef} className="relative bg-ink py-24 sm:py-32" aria-label="Gallery">
      <div className="container-edit">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember">Gallery</p>
        <h2 className="mt-3 max-w-xl text-balance font-display text-4xl font-medium text-bone sm:text-5xl">
          People. Plates. Place.
        </h2>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Um-Lilo photo gallery, scroll horizontally"
        tabIndex={0}
        className="hide-scrollbar mt-12 flex items-end gap-4 overflow-x-auto px-6 pb-4 [perspective:1000px] sm:gap-6 sm:px-10"
        style={{ scrollbarWidth: "thin" }}
      >
        {galleryImages.map((img, i) => (
          <figure
            key={img.id}
            className={`gallery-figure group relative shrink-0 overflow-hidden ${SIZE[img.orientation]} ${OFFSET[i % OFFSET.length]}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <button
              type="button"
              onClick={() => setActive(img)}
              className="block h-full w-full text-left"
              aria-label={`Expand: ${img.caption}`}
            >
              <ImagePlaceholder
                brief={img.placeholder}
                tag={img.category.toUpperCase()}
                className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
                src={img.image}
              />
            </button>
            <figcaption className="mt-2 text-xs uppercase tracking-[0.15em] text-bone/50">
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/95 p-6"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute right-6 top-6 text-3xl text-bone"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="max-h-[80vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-[4/3] w-full">
              <ImagePlaceholder brief={active.placeholder} tag={active.category.toUpperCase()} className="h-full w-full" src={active.image} />
            </div>
            <p className="mt-4 text-center font-display text-xl italic text-bone">{active.caption}</p>
          </div>
        </div>
      )}

      <style>{`.hide-scrollbar::-webkit-scrollbar { height: 6px; } .hide-scrollbar::-webkit-scrollbar-thumb { background: rgba(239,231,216,0.2); border-radius: 999px; }`}</style>
    </section>
  );
}
