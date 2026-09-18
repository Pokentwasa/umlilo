// Structured menu content. Prices are intentionally omitted where
// not supplied/verified — `price: null` renders as "MP" (market
// price) rather than a fabricated number. A CMS can populate later.

export type Dish = {
  slug: string;
  name: string;
  category: "Tshisa Nyama" | "Traditional" | "Sharing Platters" | "Sides";
  description: string;
  price: number | null;
  placeholder: string; // alt text once `image` is set; description of the shot still needed otherwise
  image?: string; // real photo path under /public, once available
};

export const dishes: Dish[] = [
  {
    slug: "bunty-special",
    name: "Bunty Special",
    category: "Tshisa Nyama",
    description:
      "One brisket, one lamb chop, one sausage — the house sampler, straight off the coals.",
    price: 180,
    placeholder: "Boerewors, steak and charred peppers laid across the coals, shot from above",
    image: "/images/pexels-didsss-4294500.jpg",
  },
  {
    slug: "smiley",
    name: "Smiley",
    category: "Traditional",
    description:
      "Slow-grilled sheep head, split and shared. Old-school, honest, and not for the shy.",
    price: null,
    placeholder: "Smiley served whole on an enamel tray, hands reaching in",
  },
  {
    slug: "mutton-tripe",
    name: "Mutton Tripe",
    category: "Traditional",
    description:
      "Simmered low and slow until it falls apart, finished with a chakalaka bite.",
    price: null,
    placeholder: "Mutton tripe in a rich tomato sauce, plated with bread and rosemary on the side",
    image: "/images/pexels-jose-antonio-otegui-auzmendi-2150489988-31372370.jpg",
  },
  {
    slug: "ugheme-brisket",
    name: "uGheme / Brisket",
    category: "Tshisa Nyama",
    description:
      "Beef brisket, fire-kissed and rested, sliced thick at the pass.",
    price: null,
    placeholder: "Steak fire-kissed on the grid, tongs lifting a piece, smoke rising",
    image: "/images/Geme.jpg",
  },
  {
    slug: "hardbody-chicken",
    name: "Hardbody Chicken",
    category: "Tshisa Nyama",
    description:
      "Whole chicken, marinated hard and grilled harder — the crowd favourite on any given Sunday.",
    price: null,
    placeholder: "Whole hardbody chicken over open flame, grill marks visible",
  },
  {
    slug: "wings",
    name: "Wings",
    category: "Tshisa Nyama",
    description: "Six pieces, charred and sticky — gone before the second round of drinks arrives.",
    price: 180,
    placeholder: "Tray of grilled wings, hand reaching for one",
  },
  {
    slug: "beef-stew",
    name: "Beef Stew",
    category: "Traditional",
    description: "A Sunday-table stew, rich and unhurried, built for pap.",
    price: null,
    placeholder: "Beef stew in a three-legged pot, wooden spoon resting",
    image: "/images/rimsha-noor-RVWHhDVjBNI-unsplash.jpg",
  },
  {
    slug: "pap",
    name: "Pap",
    category: "Sides",
    description: "Stiff, steaming, stirred the traditional way.",
    price: null,
    placeholder: "Mound of pap being served, steam catching the light",
  },
  {
    slug: "steamed-bread",
    name: "Steamed Bread",
    category: "Sides",
    description: "Torn, not sliced — the way it's meant to be shared.",
    price: null,
    placeholder: "Fire-toasted bread rolls fresh off the tray, char marks visible",
    image: "/images/pexels-philippe-alamazani-508356-20831590.jpg",
  },
  {
    slug: "chakalaka",
    name: "Chakalaka",
    category: "Sides",
    description: "Sharp, spiced, and non-negotiable on the side of anything from the fire.",
    price: null,
    placeholder: "Peppers and tomato simmered together in a pan, bread alongside",
    image: "/images/pexels-istvanpszabo-10338629.jpg",
  },
];

export const sharingPlatters: Dish[] = [
  {
    slug: "the-imbizo-platter",
    name: "The Imbizo Platter",
    category: "Sharing Platters",
    description:
      "A table of its own — a mix off the fire built for a full house and no plan to leave early.",
    price: null,
    placeholder: "Overhead shot of a full sharing platter surrounded by hands",
  },
];

export const menuCategories = [
  "Tshisa Nyama",
  "Traditional",
  "Sharing Platters",
  "Sides",
] as const;
