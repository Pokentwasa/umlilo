"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MQ } from "@/lib/gsap";
import ImagePlaceholder from "./ImagePlaceholder";
import { site } from "@/data/site";

const SPARKS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: 4 + ((i * 61) % 92),
  delay: (i * 0.7) % 8,
  duration: 6 + (i % 5),
  size: 2 + (i % 3),
}));

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motionOk, () => {
        const tl = gsap.timeline({ delay: 0.2 });
        tl.to(".hero-scrim", { opacity: 1, duration: 1.1, ease: "power2.out" })
          .from(
            ".hero-eyebrow",
            { yPercent: 120, opacity: 0, duration: 0.7, ease: "power3.out" },
            "-=0.5"
          )
          .from(
            ".hero-line",
            {
              yPercent: 110,
              duration: 1,
              ease: "power4.out",
              stagger: 0.12,
            },
            "-=0.35"
          )
          .from(
            ".hero-sub",
            { opacity: 0, y: 16, duration: 0.8, ease: "power2.out" },
            "-=0.4"
          )
          .from(
            ".hero-scroll",
            { opacity: 0, duration: 0.8 },
            "-=0.3"
          );
        return () => tl.kill();
      });

      // Reduced-motion fallback: everything simply present, no animation.
      mm.add(`not all and (${MQ.motionOk})`, () => {
        gsap.set([".hero-scrim", ".hero-eyebrow", ".hero-line", ".hero-sub", ".hero-scroll"], {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-charcoal"
      aria-label="Um-Lilo — introduction"
    >
      <ImagePlaceholder
        brief="Fire in the brazier at night, sparks rising into the dark"
        tag="HERO"
        className="absolute inset-0 h-full w-full"
        src={site.media.hero}
        priority
        decorative
      />
      <div
        className="hero-scrim absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(21,17,13,0.35) 0%, rgba(21,17,13,0.55) 45%, rgba(21,17,13,0.96) 100%)",
        }}
        aria-hidden="true"
      />

      <div aria-hidden="true" className="absolute inset-0">
        {SPARKS.map((s) => (
          <span
            key={s.id}
            className="absolute bottom-0 block rounded-full bg-ember/80 ember-glow motion-reduce:hidden"
            style={{
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animation: `spark-rise ${s.duration}s ease-in ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container-edit relative z-10 w-full pb-16 sm:pb-20">
        <div className="hero-eyebrow overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember">
            Private School Tshisa Nyama &middot; Woodstock, Cape Town
          </p>
        </div>

        <h1 className="mt-4 font-display text-[16vw] font-medium leading-[0.85] tracking-tight text-bone sm:text-[13vw] lg:text-[10rem]">
          <span className="block overflow-hidden">
            <span className="hero-line block">UM-</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block">LILO</span>
          </span>
        </h1>

        <div className="mt-6 flex flex-col gap-6 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="hero-sub max-w-md text-balance font-display text-2xl italic text-bone/90 sm:text-3xl">
            The fire brings us together.
          </p>
          <p className="hero-sub max-w-sm text-sm leading-relaxed text-bone/60">
            Come for the food. Stay for the people. One flame, one table, a whole lot
            of Cape Town on a Sunday afternoon.
          </p>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-bone/60">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-bone/60 to-transparent" />
      </div>

      <style>{`
        @keyframes spark-rise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-70vh) translateX(12px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
