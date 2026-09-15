import { site } from "@/data/site";
import { dishes, sharingPlatters } from "@/data/menu";

function openingHours() {
  return site.hours
    .filter((h) => h.open && h.close)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.open,
      closes: h.close,
    }));
}

export function restaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${site.url}/#restaurant`,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    servesCuisine: ["South African", "Tshisa Nyama", "Braai"],
    priceRange: "$$",
    image: `${site.url}/images/og-cover.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.streetAddress,
      addressLocality: site.address.addressLocality,
      addressRegion: site.address.addressRegion,
      postalCode: site.address.postalCode,
      addressCountry: site.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: openingHours(),
    sameAs: [site.social.instagram, site.social.linktree],
    hasMenu: {
      "@type": "Menu",
      name: `${site.shortName} Menu`,
      hasMenuSection: [
        {
          "@type": "MenuSection",
          name: "Tshisa Nyama & Traditional",
          hasMenuItem: [...dishes, ...sharingPlatters].map((d) => ({
            "@type": "MenuItem",
            name: d.name,
            description: d.description,
            ...(d.price ? { offers: { "@type": "Offer", price: d.price, priceCurrency: "ZAR" } } : {}),
          })),
        },
      ],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#restaurant` },
  };
}
