"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MQ } from "@/lib/gsap";
import ImagePlaceholder from "./ImagePlaceholder";
import { site } from "@/data/site";

export default function Story() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOk, () => {
        gsap.from(".story-line", {
          yPercent: 105,
          duration: 0.9,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".story-headline", start: "top 78%" },
        });
        gsap.from(".story-copy", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: ".story-copy-wrap", start: "top 82%" },
        });
        gsap.from(".story-photo", {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".story-photo", start: "top 85%" },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="story" className="relative bg-charcoal text-bone" aria-label="Our story">
      <div className="grid lg:grid-cols-[1.3fr_1fr] lg:items-stretch">
        <div className="py-24 pl-[clamp(1.25rem,4vw,4rem)] pr-[clamp(1.25rem,4vw,4rem)] sm:py-32 lg:pr-16">
          <div className="flex items-start justify-between border-b border-bone/15 pb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember">
              Our Story &mdash; No. 01
            </p>
            <p className="hidden font-condensed text-sm tracking-widest text-bone/40 sm:block">
              WOODSTOCK, CAPE TOWN
            </p>
          </div>

          <div className="story-headline mt-10 overflow-hidden">
            <h2 className="story-line font-display text-4xl font-medium leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
              More than tshisa nyama.
            </h2>
          </div>

          <div className="story-copy-wrap mt-12 grid gap-6 text-lg leading-relaxed text-bone/75 sm:columns-2 sm:gap-10 sm:text-base [column-fill:balance]">
            <p className="story-copy break-inside-avoid first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-ember">
              Um-Lilo started with a fire, a grid, and people who refused to eat in a
              hurry. Everything else grew from that — the menu, the room, the way
              Sunday stretches into evening.
            </p>
            <p className="story-copy break-inside-avoid">
              We&rsquo;re a Woodstock tshisa nyama built on township food culture and
              Cape Town&rsquo;s appetite for gathering: fire-grilled meat, honest
              sides, a screen for the match, and a seat that&rsquo;s always easy to
              pull up another chair to. Regulars just call it{" "}
              <span className="italic">{site.motto.isiXhosa}</span> &mdash;{" "}
              {site.motto.translation.toLowerCase()}.
            </p>
            <p className="story-copy break-inside-avoid">
              &ldquo;Private School&rdquo; is the standard we hold the fire to, not a
              theme we lean on. What matters is what happens around it &mdash; food,
              people, noise, and no one rushing to leave.
            </p>
          </div>
        </div>

        {/* Bleeds to the viewport edge — no container padding on this side. */}
        <div className="story-photo relative min-h-[50vh] w-full overflow-hidden lg:min-h-full">
          <ImagePlaceholder
            brief="The Um-Lilo Private School Tshisa Nyama sign, lit up at night on Albert Road"
            tag="03"
            className="h-full w-full"
            src={site.media.storyPhoto}
          />
        </div>
      </div>
    </section>
  );
}
