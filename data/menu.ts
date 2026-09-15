// Structured menu content. Prices are intentionally omitted where
// not supplied/verified — `price: null` renders as "MP" (market
// price) rather than a fabricated number. A CMS can populate later.

export type Dish = {
  slug: string;
  name: string;
  category: "Tshisa Nyama" | "Traditional" | "Sharing Platters" | "Sides";
  description: string;
  price: number | null;
  placeholder: string; // description of the real photo this awaits
};

export const dishes: Dish[] = [
  {
    slug: "buntu-special",
    name: "Buntu Special",
    category: "Tshisa Nyama",
    description:
      "The house cut, straight off the coals — our fire-keeper's own recipe, seasoned the night before and never rushed.",
    price: null,
    placeholder: "Buntu Special plated straight off the grid, steam rising",
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
    placeholder: "Pot of mutton tripe simmering, close crop with steam",
  },
  {
    slug: "ugheme-brisket",
    name: "uGheme / Brisket",
    category: "Tshisa Nyama",
    description:
      "Beef brisket, fire-kissed and rested, sliced thick at the pass.",
    price: null,
    placeholder: "Brisket being sliced on a wooden board at the braai pass",
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
    description: "Charred, sticky, gone before the second round of drinks arrives.",
    price: null,
    placeholder: "Tray of grilled wings, hand reaching for one",
  },
  {
    slug: "beef-stew",
    name: "Beef Stew",
    category: "Traditional",
    description: "A Sunday-table stew, rich and unhurried, built for pap.",
    price: null,
    placeholder: "Beef stew in a three-legged pot, wooden spoon resting",
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
    placeholder: "Hands tearing steamed bread over the table",
  },
  {
    slug: "chakalaka",
    name: "Chakalaka",
    category: "Sides",
    description: "Sharp, spiced, and non-negotiable on the side of anything from the fire.",
    price: null,
    placeholder: "Bowl of chakalaka, bright colour against enamel plate",
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
