const EQ_HEIGHTS = [40, 70, 30, 90, 55, 80, 35, 65, 45, 75, 25, 60];

function MarqueeRow({
  text,
  reverse = false,
  outline = false,
}: {
  text: string;
  reverse?: boolean;
  outline?: boolean;
}) {
  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} gap-10`}>
        {[0, 1].map((copy) => (
          <span
            key={copy}
            className={`shrink-0 whitespace-nowrap font-display text-[10vw] font-bold leading-none sm:text-[7vw] ${
              outline ? "text-stroke" : "text-bone"
            }`}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SoundEnergy() {
  return (
    <section
      className="relative overflow-hidden border-y border-bone/10 bg-charcoal py-16 sm:py-20"
      aria-label="The sound and energy of Um-Lilo"
    >
      <h2 className="sr-only">Braai. Bass. Banter. Ball.</h2>

      <div className="flex flex-col gap-3">
        <MarqueeRow text="BRAAI • BASS • BANTER • BALL •" />
        <MarqueeRow text="FIRE • FRIENDS • FOOTBALL • FLAVOUR •" reverse outline />
      </div>

      <div
        className="mx-auto mt-12 flex h-16 max-w-xs items-end justify-center gap-1.5 px-6"
        aria-hidden="true"
      >
        {EQ_HEIGHTS.map((h, i) => (
          <span
            key={i}
            className="eq-bar w-1.5 rounded-full bg-ember"
            style={{ height: `${h}%`, animationDelay: `${i * 0.07}s` }}
          />
        ))}
      </div>
      <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.3em] text-bone/40">
        The energy is always on
      </p>
    </section>
  );
}
