// Central, CMS-ready site data. Nothing content-shaped should be
// hard-coded in components — it all resolves from here so a future
// CMS integration only has to swap this module out.

type HourEntry = {
  day: string;
  open: string | null;
  close: string | null;
  note?: string;
};

// Typed separately so a future closed day (open/close both null) stays
// valid without the whole `site` object's `as const` narrowing every
// entry down to today's literal shape.
const hours: HourEntry[] = [
  { day: "Monday", open: "11:00", close: "21:00" },
  { day: "Tuesday", open: "11:00", close: "21:00" },
  { day: "Wednesday", open: "11:00", close: "21:00" },
  { day: "Thursday", open: "11:00", close: "22:00" },
  { day: "Friday", open: "11:00", close: "00:00" },
  { day: "Saturday", open: "10:00", close: "00:00" },
  { day: "Sunday", open: "10:00", close: "20:00", note: "Sunday plates from midday" },
];

export const site = {
  name: "Um-Lilo Private School Tshisa Nyama",
  shortName: "Um-Lilo",
  tagline: "The fire brings us together.",
  // Their own isiXhosa name for the place, confirmed from staff t-shirts
  // and Instagram bio: "the place of the gathering."
  motto: { isiXhosa: "Indawo yeMbizo", translation: "The place of the gathering" },
  description:
    "Um-Lilo Private School Tshisa Nyama — a fire-fed gathering place in Woodstock, Cape Town, for tshisa nyama, Sunday plates, match days and the people who show up for all of it.",
  url: "https://www.umlilotshisanyama.co.za",
  themeColor: "#15110d",
  address: {
    streetAddress: "355 Albert Road",
    addressLocality: "Woodstock",
    addressRegion: "Western Cape",
    postalCode: "7925",
    addressCountry: "ZA",
  },
  geo: {
    latitude: -33.9275,
    longitude: 18.4477,
  },
  phone: "+27-21-000-0000",
  email: "imbizo@umlilotshisanyama.co.za",
  // Confirmed from their real Instagram bio (@umlilo.cpt).
  social: {
    instagram: "https://www.instagram.com/umlilo.cpt/",
    linktree: "https://linktr.ee/umlilo.cpt",
  },
  // Also confirmed from the Instagram bio: they trade at Albert Road
  // every day, plus a weekend stall at Neighbourgoods Market.
  secondaryLocation: {
    name: "Neighbourgoods Market",
    note: "at the Woodstock Exchange",
  },
  order: {
    label: "Order",
    href: "#visit",
  },
  media: {
    hero: "/images/pexels-pamanjoe-13672086.jpg",
    storyPhoto: "/images/Screenshot%202026-09-15%20at%2022.39.59.png",
    storefront: "/images/Screenshot%202026-09-15%20at%2022.38.41.png",
  },
  hours,
  nav: [
    { label: "Food", href: "#food" },
    { label: "Imbizo", href: "#imbizo" },
    { label: "What's On", href: "#whats-on" },
    { label: "Our Story", href: "#story" },
    { label: "Visit", href: "#visit" },
  ],
} as const;
