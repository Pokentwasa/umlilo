"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, MQ } from "@/lib/gsap";
import { upcomingMatches } from "@/data/events";
import ImagePlaceholder from "./ImagePlaceholder";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function MatchDay() {
  const rootRef = useRef<HTMLElement>(null);
  const [featured, ...rest] = upcomingMatches;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOk, () => {
        gsap.from(".matchday-heading", {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".matchday-heading", start: "top 80%" },
        });
        gsap.from(".matchday-clock span", {
          opacity: 0,
          yPercent: 100,
          duration: 0.7,
          stagger: 0.04,
          ease: "power4.out",
          scrollTrigger: { trigger: ".matchday-clock", start: "top 75%" },
        });
        gsap.from(".matchday-photo", {
          opacity: 0,
          scale: 0.96,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: ".matchday-photo", start: "top 80%" },
        });
        gsap.from(".matchday-row", {
          opacity: 0,
          x: -24,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".matchday-list", start: "top 85%" },
        });
      });
    },
    { scope: rootRef }
  );

  const clockDigits = featured.time.split("");

  return (
    <section
      ref={rootRef}
      id="whats-on"
      className="relative bg-bone py-24 text-charcoal sm:py-32"
      aria-label="Match day at Um-Lilo"
    >
      <div className="container-edit">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-burnt">What&rsquo;s On</p>
        <h2 className="matchday-heading mt-3 max-w-3xl text-balance font-display text-4xl font-medium leading-[0.95] text-charcoal sm:text-5xl lg:text-6xl">
          Match Day at Um-Lilo.
        </h2>
        <p className="mt-5 max-w-xl text-charcoal/70">
          Big screens, bigger plates. Football and rugby side by side, sound up for
          the main event — no gambling, no gimmicks, just the game and good company.
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/50">
              Next up &mdash; {featured.competition}
            </p>
            <h3 className="mt-3 text-balance font-display text-3xl font-medium text-charcoal sm:text-4xl">
              {featured.fixture}
            </h3>
            <div className="matchday-clock mt-6 flex items-end gap-1 overflow-hidden font-condensed text-[5rem] leading-none text-burnt sm:text-[7rem]">
              {clockDigits.map((ch, i) => (
                <span key={i} className="inline-block">
                  {ch}
                </span>
              ))}
            </div>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-charcoal/50">
              {formatDate(featured.date)}
              {featured.note ? ` — ${featured.note}` : ""}
            </p>
          </div>

          <div className="matchday-photo relative aspect-[4/3] w-full overflow-hidden">
            <ImagePlaceholder
              brief="Supporters watching a match on the big screen, jerseys, edge-lit by the glow of the screen"
              tag="MATCH DAY"
              className="h-full w-full"
            />
          </div>
        </div>

        <div className="matchday-list mt-16 flex flex-col divide-y divide-charcoal/15 border-t border-charcoal/15">
          {rest.map((m) => (
            <div
              key={m.id}
              className="matchday-row flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-burnt">
                  {m.competition}
                </p>
                <p className="font-display text-lg text-charcoal">{m.fixture}</p>
              </div>
              <p className="font-condensed text-xl text-charcoal/60">
                {formatDate(m.date)} &middot; {m.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
