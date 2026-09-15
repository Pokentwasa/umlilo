// Central, CMS-ready site data. Nothing content-shaped should be
// hard-coded in components — it all resolves from here so a future
// CMS integration only has to swap this module out.

export const site = {
  name: "Um-Lilo Private School Tshisa Nyama",
  shortName: "Um-Lilo",
  tagline: "The fire brings us together.",
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
  social: {
    instagram: "https://www.instagram.com/umlilotshisanyama",
    facebook: "https://www.facebook.com/umlilotshisanyama",
    tiktok: "https://www.tiktok.com/@umlilotshisanyama",
  },
  order: {
    label: "Order",
    href: "#visit",
  },
  media: {
    hero: "/images/pexels-pamanjoe-13672086.jpg",
    storyPhoto: "/images/Screenshot%202026-09-15%20at%2022.39.59.png",
  },
  hours: [
    { day: "Monday", open: null, close: null, note: "Closed" },
    { day: "Tuesday", open: "11:00", close: "21:00" },
    { day: "Wednesday", open: "11:00", close: "21:00" },
    { day: "Thursday", open: "11:00", close: "22:00" },
    { day: "Friday", open: "11:00", close: "00:00" },
    { day: "Saturday", open: "10:00", close: "00:00" },
    { day: "Sunday", open: "10:00", close: "20:00", note: "Sunday plates from midday" },
  ],
  nav: [
    { label: "Food", href: "#food" },
    { label: "Imbizo", href: "#imbizo" },
    { label: "What's On", href: "#whats-on" },
    { label: "Our Story", href: "#story" },
    { label: "Visit", href: "#visit" },
  ],
} as const;
