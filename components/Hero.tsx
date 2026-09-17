"use client";

import { useRef } from "react";
import Image from "next/image";
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
            ".hero-logo",
            { opacity: 0, scale: 0.92, duration: 1.7, ease: "power2.out" },
            "-=0.6"
          )
          .from(".hero-sub", { opacity: 0, y: 16, duration: 0.8, ease: "power2.out" }, "-=0.5")
          .from(".hero-scroll", { opacity: 0, duration: 0.8 }, "-=0.3");
        return () => tl.kill();
      });

      // Reduced-motion fallback: everything simply present, no animation.
      mm.add(`not all and (${MQ.motionOk})`, () => {
        gsap.set(".hero-bar", { xPercent: (i) => (i % 2 === 0 ? -100 : 100) });
        gsap.set([".hero-logo", ".hero-sub", ".hero-scroll"], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-charcoal"
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
            "linear-gradient(180deg, rgba(20,16,12,0.4) 0%, rgba(20,16,12,0.55) 55%, rgba(20,16,12,0.85) 100%)",
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

      <div className="container-edit relative z-10 flex flex-col items-center text-center">
        <h1 className="hero-logo w-full max-w-[340px] sm:max-w-md lg:max-w-xl">
          <Image
            src={site.media.logo}
            alt="Um-Lilo — Indawo yeMbizo"
            width={1254}
            height={1254}
            priority
            className="h-auto w-full"
          />
        </h1>

        <p className="hero-sub mt-2 max-w-md text-sm font-semibold uppercase tracking-[0.2em] text-bone/70">
          Private School Tshisa Nyama
        </p>
      </div>

      <div className="hero-scroll absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-bone/60">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-bone/60 to-transparent" />
      </div>
    </section>
  );
}
