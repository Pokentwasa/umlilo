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
    </section>
  );
}
