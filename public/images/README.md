# Real photography goes here

Every image slot on the site currently renders via
`components/ImagePlaceholder.tsx` — a textured, captioned frame rather
than a stock photo — because no real Um-Lilo photography exists yet.
Each placeholder's caption (see `data/menu.ts`, `data/gallery.ts`, and
inline `brief` props in the section components) describes exactly what
should be shot.

Once photography is available:

1. Drop files in this folder (suggested: `og-cover.jpg` at 1200×630 for
   the Open Graph/Twitter card referenced in `app/layout.tsx`, plus one
   file per dish/gallery entry).
2. Replace the corresponding `<ImagePlaceholder brief="..." />` with
   `next/image`, using the same `brief` text as the `alt`.
