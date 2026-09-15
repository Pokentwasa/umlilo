"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MQ } from "@/lib/gsap";
import { site } from "@/data/site";

const EMBERS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: 8 + ((i * 53) % 84),
  delay: (i * 0.9) % 7,
  duration: 5 + (i % 4),
}));

export default function FinalMoment() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOk, () => {
        gsap.from(".final-line", {
          opacity: 0,
          y: 30,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".final-headline", start: "top 75%" },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <footer ref={rootRef} className="relative overflow-hidden bg-charcoal pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {EMBERS.map((e) => (
          <span
            key={e.id}
            className="absolute bottom-0 block h-1 w-1 rounded-full bg-ember/70 ember-glow motion-reduce:hidden"
            style={{
              left: `${e.left}%`,
              animation: `spark-rise ${e.duration}s ease-in ${e.delay}s infinite`,
            }}
          />
        ))}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background: "radial-gradient(ellipse at bottom, rgba(255,90,43,0.12), transparent 70%)",
          }}
        />
      </div>

      <div className="container-edit relative pb-20 text-center">
        <div className="final-headline">
          <h2 className="final-line font-display text-4xl font-medium leading-[0.95] text-balance text-bone sm:text-6xl lg:text-7xl">
            See you around the fire.
          </h2>
          <p className="final-line mt-6 text-balance text-bone/60">
            Um-Lilo Private School Tshisa Nyama &mdash; {site.address.streetAddress},{" "}
            {site.address.addressLocality}, Cape Town.
          </p>
        </div>

        <div className="final-line mx-auto mt-16 flex max-w-3xl flex-col items-center gap-10 border-t border-bone/10 pt-10 sm:flex-row sm:justify-between sm:text-left">
          <span className="font-display text-2xl font-semibold text-bone">UM-LILO</span>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footer">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-bone/60 hover:text-ember"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-bone/60 hover:text-ember"
            >
              Instagram
            </a>
            <a
              href={site.social.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-bone/60 hover:text-ember"
            >
              All Links
            </a>
          </div>
        </div>

        <p className="mt-10 text-[0.65rem] uppercase tracking-[0.2em] text-bone/30">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
