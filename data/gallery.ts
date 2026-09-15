// Gallery + Imbizo collage content. `ratio` = 40% food / 40% people /
// 20% environment, matching the creative brief's photography mix.

export type GalleryImage = {
  id: string;
  caption: string;
  placeholder: string;
  category: "food" | "people" | "environment";
  orientation: "portrait" | "landscape" | "square";
  image?: string; // real photo path under /public, once available
};

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    caption: "Come hungry",
    placeholder: "Friend digging into a spread of fried chicken, greens, corn and stew",
    category: "people",
    orientation: "portrait",
    image: "/images/pexels-picha-6210452.jpg",
  },
  {
    id: "g2",
    caption: "On the fire",
    placeholder: "Boerewors coil and a cast-iron pot smoking over the coals",
    category: "environment",
    orientation: "portrait",
    image: "/images/pexels-hcdigital-3619859.jpg",
  },
  {
    id: "g3",
    caption: "The pass",
    placeholder: "Chicken and vegetables stirred in a spicy sauce, cooked to order",
    category: "food",
    orientation: "landscape",
    image: "/images/pexels-strawhat-soile-1657623-23228984.jpg",
  },
  { id: "g4", caption: "Pass the plate", placeholder: "Plate of tshisa nyama handed across a table", category: "food", orientation: "portrait" },
  { id: "g5", caption: "No one eats alone", placeholder: "Group laughing mid-meal, plates full", category: "people", orientation: "landscape" },
  { id: "g6", caption: "Steel and smoke", placeholder: "Close crop of the braai grid, smoke drifting", category: "environment", orientation: "square" },
  { id: "g7", caption: "Full house", placeholder: "Wide shot of the courtyard packed on a match day", category: "environment", orientation: "landscape" },
  { id: "g8", caption: "Tear, don't slice", placeholder: "Hands tearing steamed bread at the table", category: "food", orientation: "portrait" },
  { id: "g9", caption: "Eyes on the screen", placeholder: "Supporters watching the match, jerseys on", category: "people", orientation: "landscape" },
  { id: "g10", caption: "Cold one", placeholder: "Drink being poured over ice, condensation on glass", category: "food", orientation: "portrait" },
  { id: "g11", caption: "Old friends", placeholder: "Two elders sharing a plate and a laugh", category: "people", orientation: "square" },
  { id: "g12", caption: "Stay a little longer", placeholder: "Table late in the afternoon, golden light", category: "environment", orientation: "landscape" },
];

export const imbizoPhrases = [
  "COME HUNGRY.",
  "BRING YOUR PEOPLE.",
  "PASS THE PLATE.",
  "STAY A LITTLE LONGER.",
  "NO ONE EATS ALONE.",
] as const;
