import { site } from "@/data/site";
import ImagePlaceholder from "./ImagePlaceholder";

function directionsUrl() {
  const q = encodeURIComponent(
    `${site.address.streetAddress}, ${site.address.addressLocality}, Cape Town`
  );
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export default function Visit() {
  return (
    <section id="visit" className="relative bg-bone py-24 text-charcoal sm:py-32" aria-label="Visit us">
      <div className="container-edit grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-burnt">Visit</p>
          <h2 className="mt-3 font-display text-5xl font-medium leading-[0.95] text-balance sm:text-7xl">
            Pull through.
          </h2>

          <address className="mt-10 not-italic">
            <p className="font-display text-2xl">{site.shortName}</p>
            <p className="mt-1 text-lg text-charcoal/70">Private School Tshisa Nyama</p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/80">
              {site.address.streetAddress}
              <br />
              {site.address.addressLocality}, Cape Town
            </p>
            <p className="mt-3 text-sm text-charcoal/60">
              Every day at Albert Road. Weekends, also find us at{" "}
              {site.secondaryLocation.name} — {site.secondaryLocation.note}.
            </p>
          </address>

          <a
            href={directionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 border border-charcoal/25 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:border-burnt hover:text-burnt"
          >
            Get Directions &rarr;
          </a>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-charcoal/15 pt-8 sm:max-w-md">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
                Contact
              </p>
              <a href={`tel:${site.phone}`} className="mt-2 block text-charcoal/85 hover:text-burnt">
                {site.phone.replace("+27-", "0").replace(/-/g, " ")}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 block break-all text-charcoal/85 hover:text-burnt"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
                Follow
              </p>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-charcoal/85 hover:text-burnt"
              >
                Instagram
              </a>
              <a
                href={site.social.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-charcoal/85 hover:text-burnt"
              >
                All Links
              </a>
            </div>
          </div>

          <a
            href={site.order.href}
            className="mt-10 inline-flex items-center gap-2 bg-burnt px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-bone transition-colors hover:bg-charcoal"
          >
            Order Online
          </a>
        </div>

        <div className="flex flex-col gap-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <ImagePlaceholder
              brief="The Um-Lilo storefront on Albert Road, regulars out front giving a thumbs up"
              className="h-full w-full"
              src={site.media.storefront}
            />
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
            <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Stylised map showing Um-Lilo's location in Woodstock, Cape Town">
              <rect width="400" height="300" fill="var(--color-ink)" />
              {[40, 100, 160, 220, 280, 340].map((x) => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" stroke="rgba(236,227,211,0.12)" strokeWidth="1" />
              ))}
              {[30, 90, 150, 210, 270].map((y) => (
                <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="rgba(236,227,211,0.12)" strokeWidth="1" />
              ))}
              <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(236,227,211,0.3)" strokeWidth="2" />
              <line x1="200" y1="0" x2="200" y2="300" stroke="rgba(236,227,211,0.3)" strokeWidth="2" />
              <circle cx="200" cy="150" r="10" fill="var(--color-ember)" className="ember-glow" />
              <circle cx="200" cy="150" r="20" fill="none" stroke="var(--color-ember)" strokeWidth="1.5" opacity="0.5" />
              <text x="212" y="145" fill="var(--color-bone)" fontSize="11" fontFamily="var(--font-sans)" letterSpacing="1">
                UM-LILO
              </text>
              <text x="14" y="145" fill="rgba(236,227,211,0.4)" fontSize="9" fontFamily="var(--font-sans)" letterSpacing="2">
                ALBERT RD
              </text>
              <text x="206" y="20" fill="rgba(236,227,211,0.4)" fontSize="9" fontFamily="var(--font-sans)" letterSpacing="2">
                WOODSTOCK
              </text>
            </svg>
          </div>

          <div className="border-t border-charcoal/15 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
              Hours
            </p>
            <dl className="mt-3 divide-y divide-charcoal/10">
              {site.hours.map((h) => (
                <div key={h.day} className="flex items-center justify-between py-2 text-sm">
                  <dt className="text-charcoal/70">{h.day}</dt>
                  <dd className="text-right font-medium">
                    {h.open && h.close ? `${h.open} – ${h.close}` : (h.note ?? "Closed")}
                    {h.open && h.close && h.note && (
                      <span className="block text-xs font-normal text-charcoal/50">{h.note}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
