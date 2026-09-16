"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MQ } from "@/lib/gsap";
import ImagePlaceholder from "./ImagePlaceholder";
import { site } from "@/data/site";

const SHUTTER_BARS = 8;

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motionOk, () => {
        gsap.set(".hero-bar", { xPercent: 0 });
        const tl = gsap.timeline({ delay: 0.2 });
        tl.to(".hero-bar", {
          xPercent: (i) => (i % 2 === 0 ? -100 : 100),
          duration: 1,
          stagger: 0.04,
          ease: "power3.inOut",
        })
          .from(
            ".hero-eyebrow",
            { yPercent: 120, opacity: 0, duration: 0.7, ease: "power3.out" },
            "-=0.6"
          )
          .from(
            ".hero-line",
            {
              yPercent: 110,
              duration: 1,
              ease: "power4.out",
              stagger: 0.12,
            },
            "-=0.4"
          )
          .from(".hero-sub", { opacity: 0, y: 16, duration: 0.8, ease: "power2.out" }, "-=0.4")
          .from(".hero-scroll", { opacity: 0, duration: 0.8 }, "-=0.3");
        return () => tl.kill();
      });

      // Reduced-motion fallback: everything simply present, no animation.
      mm.add(`not all and (${MQ.motionOk})`, () => {
        gsap.set(".hero-bar", { xPercent: (i) => (i % 2 === 0 ? -100 : 100) });
        gsap.set([".hero-eyebrow", ".hero-line", ".hero-sub", ".hero-scroll"], {
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
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,16,12,0.3) 0%, rgba(20,16,12,0.5) 45%, rgba(20,16,12,0.94) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Grill-bar shutter: the hero image is revealed by bars parting,
          like the grid on a braai, rather than a digital fade. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] flex flex-col">
        {Array.from({ length: SHUTTER_BARS }).map((_, i) => (
          <span key={i} className="hero-bar block flex-1 bg-charcoal" />
        ))}
      </div>

      <div className="container-edit relative z-10 w-full pb-16 sm:pb-20">
        <div className="hero-eyebrow overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember">
            Um-Lilo Private School
          </p>
        </div>

        <h1 className="mt-4 font-display text-[15vw] font-medium leading-[0.85] tracking-tight text-bone sm:text-[12vw] lg:text-[8.5rem]">
          <span className="block overflow-hidden">
            <span className="hero-line block">Around</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block">The Fire</span>
          </span>
        </h1>

        <p className="hero-sub mt-6 max-w-md text-sm font-semibold uppercase tracking-[0.2em] text-bone/70 sm:mt-8">
          Tshisa Nyama. Food. People. Imbizo.
        </p>
      </div>

      <div className="hero-scroll absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-bone/60">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-bone/60 to-transparent" />
      </div>
    </section>
  );
}
