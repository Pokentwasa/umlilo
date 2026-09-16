"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MQ } from "@/lib/gsap";
import { galleryImages, imbizoPhrases } from "@/data/gallery";
import { site } from "@/data/site";
import ImagePlaceholder from "./ImagePlaceholder";

// Every beat below is backed by a real photo already in the repo —
// picked so each one still lands close to its paired phrase (g3 "The
// pass" for "PASS THE PLATE.", g9's settled-in customer for "STAY A
// LITTLE LONGER."), rather than leaving a placeholder mid-sequence.
const beats = [
  { photo: galleryImages[0], from: { xPercent: -140, yPercent: -10, rotate: -6 }, pos: "left-[6%] top-[18%] w-[30vw] max-w-sm" },
  { photo: galleryImages[4], from: { xPercent: 140, yPercent: 10, rotate: 5 }, pos: "right-[6%] top-[10%] w-[26vw] max-w-sm" },
  { photo: galleryImages[2], from: { yPercent: -140, rotate: 4 }, pos: "left-[32%] top-[6%] w-[22vw] max-w-xs" },
  { photo: galleryImages[8], from: { yPercent: 140, rotate: -4 }, pos: "right-[16%] bottom-[8%] w-[28vw] max-w-sm" },
  { photo: galleryImages[10], from: { scale: 0.4, opacity: 0 }, pos: "left-[14%] bottom-[10%] w-[20vw] max-w-xs" },
] as const;

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
        gsap.set(".imbizo-phrase", { opacity: 0, y: 24 });
        gsap.set(".imbizo-phrase-0", { opacity: 1, y: 0 });
        gsap.set(".imbizo-final", { opacity: 0, scale: 0.9 });
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

        beats.forEach((_, i) => {
          if (i > 0) {
            tl.to(`.imbizo-phrase-${i - 1}`, { opacity: 0, y: -24, duration: 0.4 }, `beat${i}`);
          }
          tl.to(
            `.imbizo-photo-${i}`,
            { xPercent: 0, yPercent: 0, rotate: 0, scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
            `beat${i}`
          ).to(
            `.imbizo-phrase-${i}`,
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            `beat${i}+=0.15`
          );
        });

        tl.to(".imbizo-phrase-4", { opacity: 0, y: -24, duration: 0.4 }, "resolve")
          .to(".imbizo-mark", { opacity: 0.16, duration: 0.6 }, "resolve")
          .to(
            ".imbizo-photo",
            { opacity: 0, scale: 0.7, duration: 0.7, ease: "power2.in" },
            "resolve"
          )
          .to(
            ".imbizo-final",
            { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
            "resolve+=0.2"
          )
          .to(".imbizo-final-caption", { opacity: 1, y: 0, duration: 0.6 }, "resolve+=0.6");
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
            className={`imbizo-photo imbizo-photo-${i} absolute aspect-[4/5] ${beat.pos}`}
          >
            <ImagePlaceholder
              brief={beat.photo.placeholder}
              tag={beat.photo.category.toUpperCase()}
              className="h-full w-full shadow-2xl shadow-black/50"
              src={beat.photo.image}
            />
          </div>
        ))}

        <div className="imbizo-final absolute inset-0">
          <ImagePlaceholder
            brief="The scattered moments resolved into one: the whole table together, plates passed, mid-laugh"
            tag="IMBIZO"
            className="h-full w-full"
          />
          <div
            className="imbizo-final-caption absolute inset-x-0 bottom-16 translate-y-4 text-center opacity-0"
          >
            <p className="font-display text-3xl italic text-bone sm:text-4xl">
              One fire. One table. Everyone.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          {imbizoPhrases.map((phrase, i) => (
            <p
              key={phrase}
              className={`imbizo-phrase imbizo-phrase-${i} absolute text-balance text-center font-display text-4xl font-medium text-bone sm:text-6xl`}
            >
              {phrase}
            </p>
          ))}
        </div>
      </div>

      {/* Mobile / reduced motion: stacked sequence, fully accessible */}
      <div className="flex flex-col gap-16 px-6 py-16 lg:hidden">
        {beats.map((beat, i) => (
          <div key={beat.photo.id} className="imbizo-stack-item">
            <p className="font-display text-3xl font-medium text-balance text-bone">
              {imbizoPhrases[i]}
            </p>
            <div className="mt-5 aspect-[4/5] w-full max-w-sm">
              <ImagePlaceholder brief={beat.photo.placeholder} tag={beat.photo.category.toUpperCase()} className="h-full w-full" src={beat.photo.image} />
            </div>
          </div>
        ))}
        <div className="imbizo-stack-item">
          <p className="font-display text-3xl font-medium text-balance text-bone">
            {imbizoPhrases[4]}
          </p>
          <div className="mt-5 aspect-video w-full">
            <ImagePlaceholder
              brief="The scattered moments resolved into one: the whole table together, plates passed, mid-laugh"
              tag="IMBIZO"
              className="h-full w-full"
            />
          </div>
          <p className="mt-4 font-display text-2xl italic text-bone/90">
            One fire. One table. Everyone.
          </p>
        </div>
      </div>
    </section>
  );
}
