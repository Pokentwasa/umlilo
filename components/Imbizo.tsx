"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MQ } from "@/lib/gsap";
import { galleryImages } from "@/data/gallery";
import { site } from "@/data/site";
import ImagePlaceholder from "./ImagePlaceholder";

// Every beat below is backed by a real photo already in the repo —
// picked so each one still lands close to its own caption (g3 "The
// pass" for "The pass", g9's settled-in customer for "Stay longer"),
// rather than leaving a placeholder mid-sequence.
const beats = [
  {
    photo: galleryImages[0],
    from: { xPercent: -140, yPercent: -10, rotate: -6 },
    pos: "left-[6%] top-[18%] w-[30vw] max-w-sm",
    restRotate: -2,
    caption: "Come hungry",
  },
  {
    photo: galleryImages[4],
    from: { xPercent: 140, yPercent: 10, rotate: 5 },
    pos: "right-[6%] top-[10%] w-[26vw] max-w-sm",
    restRotate: 3,
    caption: "Your people",
  },
  {
    photo: galleryImages[2],
    from: { yPercent: -140, rotate: 4 },
    pos: "left-[32%] top-[6%] w-[22vw] max-w-xs",
    restRotate: -3,
    caption: "The pass",
  },
  {
    photo: galleryImages[8],
    from: { yPercent: 140, rotate: -4 },
    pos: "right-[16%] bottom-[8%] w-[28vw] max-w-sm",
    restRotate: 2.5,
    caption: "Stay longer",
  },
  {
    photo: galleryImages[10],
    from: { scale: 0.4, opacity: 0 },
    pos: "left-[14%] bottom-[10%] w-[20vw] max-w-xs",
    restRotate: -1.5,
    caption: "Not alone",
  },
] as const;

// A plain white polaroid mount — photo on top, a short caption
// scrawled in the white border underneath, like someone wrote on the
// photo with a marker — so the scattered shots in Imbizo read as real
// keepsakes instead of plain cropped images with text floating over them.
function Polaroid({
  brief,
  tag,
  src,
  caption,
  className = "",
}: {
  brief: string;
  tag: string;
  src?: string;
  caption: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center bg-bone p-3 shadow-2xl shadow-black/50 ${className}`}>
      <div className="aspect-[4/5] w-full overflow-hidden">
        <ImagePlaceholder brief={brief} tag={tag} className="h-full w-full" src={src} />
      </div>
      <p className="mt-3 mb-1 w-full truncate text-center font-marker text-lg leading-none text-charcoal sm:text-xl">
        {caption}
      </p>
    </div>
  );
}

export default function Imbizo() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(`${MQ.desktop} and ${MQ.motionOk}`, () => {
        beats.forEach((beat, i) => {
          gsap.set(`.imbizo-photo-${i}`, { ...beat.from });
        });
        gsap.set(".imbizo-final-caption", { opacity: 0, y: 24, scale: 0.95 });
        gsap.set(".imbizo-mark", { opacity: 0.06 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "+=350%",
            pin: true,
            scrub: 0.7,
          },
        });

        beats.forEach((beat, i) => {
          tl.to(
            `.imbizo-photo-${i}`,
            {
              xPercent: 0,
              yPercent: 0,
              rotate: beat.restRotate,
              scale: 1,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
            },
            `beat${i}`
          );
        });

        tl.to(".imbizo-mark", { opacity: 0.22, duration: 0.6 }, "resolve")
          .to(
            ".imbizo-photo",
            { opacity: 0, scale: 0.7, duration: 0.7, ease: "power2.in" },
            "resolve"
          )
          .to(
            ".imbizo-final-caption",
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
            "resolve+=0.3"
          );
      });

      // Reduced-motion / smaller screens: static stacked reveal, no pin.
      mm.add(`not all and (${MQ.desktop} and ${MQ.motionOk})`, () => {
        const items = gsap.utils.toArray<HTMLElement>(".imbizo-stack-item");
        items.forEach((item) => {
          gsap.from(item, {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          });
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="imbizo" className="relative bg-charcoal" aria-label="Imbizo — gathering">
      <div className="container-edit pt-24 lg:absolute lg:left-0 lg:top-10 lg:z-20 lg:pt-0">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember">Gathering</p>
        <h2 className="mt-3 font-display text-5xl font-medium text-bone sm:text-6xl">Imbizo</h2>
        <p className="mt-3 max-w-sm text-balance font-display text-xl italic text-bone/85">
          Food tastes better together.
        </p>
        <p className="mt-2 text-sm text-bone/50">
          {site.motto.isiXhosa} — {site.motto.translation}
        </p>
      </div>

      {/* Desktop: pinned collage sequence */}
      <div ref={pinRef} className="relative hidden h-screen overflow-hidden lg:block">
        <span
          aria-hidden="true"
          className="imbizo-mark pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[26vw] font-bold text-bone select-none"
        >
          IMBIZO
        </span>

        {beats.map((beat, i) => (
          <div
            key={beat.photo.id}
            className={`imbizo-photo imbizo-photo-${i} absolute ${beat.pos}`}
          >
            <Polaroid
              brief={beat.photo.placeholder}
              tag={beat.photo.category.toUpperCase()}
              src={beat.photo.image}
              caption={beat.caption}
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          <p className="imbizo-final-caption max-w-2xl text-balance text-center font-display text-4xl italic text-bone opacity-0 sm:text-6xl">
            One fire. One table. Everyone.
          </p>
        </div>
      </div>

      {/* Mobile / reduced motion: stacked sequence, fully accessible */}
      <div className="flex flex-col gap-12 px-6 py-16 lg:hidden">
        {beats.map((beat) => (
          <Polaroid
            key={beat.photo.id}
            brief={beat.photo.placeholder}
            tag={beat.photo.category.toUpperCase()}
            src={beat.photo.image}
            caption={beat.caption}
            className="imbizo-stack-item w-full max-w-sm"
          />
        ))}
        <div className="imbizo-stack-item py-6 text-center">
          <p className="font-display text-3xl italic text-bone/90">
            One fire. One table. Everyone.
          </p>
        </div>
      </div>
    </section>
  );
}
