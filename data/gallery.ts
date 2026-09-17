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
  {
    id: "g5",
    caption: "Fresh off the fire",
    placeholder: "Staff member serving up trays of brisket and wings, big smile",
    category: "people",
    orientation: "landscape",
    image: "/images/Screenshot%202026-09-15%20at%2022.38.02.png",
  },
  { id: "g6", caption: "Steel and smoke", placeholder: "Close crop of the braai grid, smoke drifting", category: "environment", orientation: "square" },
  { id: "g7", caption: "Full house", placeholder: "Wide shot of the courtyard packed on a match day", category: "environment", orientation: "landscape" },
  { id: "g8", caption: "Tear, don't slice", placeholder: "Hands tearing steamed bread at the table", category: "food", orientation: "portrait" },
  {
    id: "g9",
    caption: "Made himself at home",
    placeholder: "Customer settled in at a table, string lights and timber beams overhead",
    category: "people",
    orientation: "landscape",
    image: "/images/Screenshot%202026-09-15%20at%2022.38.58.png",
  },
  { id: "g10", caption: "Cold one", placeholder: "Drink being poured over ice, condensation on glass", category: "food", orientation: "portrait" },
  {
    id: "g11",
    caption: "Old friends",
    placeholder: "Two friends at the counter, the day's specials chalked up behind them",
    category: "people",
    orientation: "square",
    image: "/images/Screenshot%202026-09-15%20at%2022.38.13.png",
  },
  { id: "g12", caption: "Stay a little longer", placeholder: "Table late in the afternoon, golden light", category: "environment", orientation: "landscape" },
];
