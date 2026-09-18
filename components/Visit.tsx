import { site } from "@/data/site";
import ImagePlaceholder from "./ImagePlaceholder";

function directionsUrl() {
  const q = encodeURIComponent(
    `${site.address.streetAddress}, ${site.address.addressLocality}, Cape Town`
  );
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function mapEmbedUrl() {
  return `https://www.google.com/maps?q=${site.geo.latitude},${site.geo.longitude}&z=16&output=embed`;
}

export default function Visit() {
  return (
    <section id="visit" className="relative bg-charcoal py-24 text-bone sm:py-32" aria-label="Visit us">
      <div className="container-edit grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember">Visit</p>
          <h2 className="mt-3 font-display text-5xl font-medium leading-[0.95] text-balance sm:text-7xl">
            Pull through.
          </h2>

          <address className="mt-10 not-italic">
            <p className="font-display text-2xl">{site.shortName}</p>
            <p className="mt-1 text-lg text-bone/70">Private School Tshisa Nyama</p>
            <p className="mt-4 text-lg leading-relaxed text-bone/80">
              {site.address.streetAddress}
              <br />
              {site.address.addressLocality}, Cape Town
            </p>
            <p className="mt-3 text-sm text-bone/50">
              Every day at Albert Road. Weekends, also find us at{" "}
              {site.secondaryLocation.name} — {site.secondaryLocation.note}.
            </p>
          </address>

          <a
            href={directionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 border border-bone/25 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:border-ember hover:text-ember"
          >
            Get Directions &rarr;
          </a>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-bone/15 pt-8 sm:max-w-md">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
                Contact
              </p>
              <a href={`tel:${site.phone}`} className="mt-2 block text-bone/85 hover:text-ember">
                {site.phone.replace("+27-", "0").replace(/-/g, " ")}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 block break-all text-bone/85 hover:text-ember"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
                Follow
              </p>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-bone/85 hover:text-ember"
              >
                Instagram
              </a>
              <a
                href={site.social.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-bone/85 hover:text-ember"
              >
                All Links
              </a>
            </div>
          </div>

          <a
            href={site.order.href}
            className="mt-10 inline-flex items-center gap-2 bg-burnt px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-bone transition-colors hover:bg-ember"
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
            <iframe
              src={mapEmbedUrl()}
              title={`Google Maps location for ${site.shortName}`}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="border-t border-bone/15 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
              Hours
            </p>
            <dl className="mt-3 divide-y divide-bone/10">
              {site.hours.map((h) => (
                <div key={h.day} className="flex items-center justify-between py-2 text-sm">
                  <dt className="text-bone/70">{h.day}</dt>
                  <dd className="text-right font-medium">
                    {h.open && h.close ? `${h.open} – ${h.close}` : (h.note ?? "Closed")}
                    {h.open && h.close && h.note && (
                      <span className="block text-xs font-normal text-bone/50">{h.note}</span>
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
