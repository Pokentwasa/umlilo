import { tickerItems } from "@/data/events";

export default function Ticker() {
  return (
    <div
      className="overflow-hidden border-y border-bone/15 bg-charcoal py-3"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-8">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-8">
            {tickerItems.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex items-center gap-8 font-condensed text-xl tracking-wide text-bone/70"
              >
                {item}
                <span className="text-ember">&bull;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
