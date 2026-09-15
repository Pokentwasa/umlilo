import Image from "next/image";

type ImagePlaceholderProps = {
  /** Plain description of the real photograph — used as alt text once `src` is set. */
  brief: string;
  /** Short index/tag shown in the corner, e.g. "01" or "FOOD". */
  tag?: string;
  className?: string;
  /** Set true for images that are purely decorative in context. */
  decorative?: boolean;
  /** Real photo path under /public. Omit to render the placeholder frame. */
  src?: string;
  /** Mark true for above-the-fold images (e.g. the Hero background). */
  priority?: boolean;
};

/**
 * Renders real photography when `src` is supplied, and otherwise falls
 * back to a deliberate stand-in: a textured, captioned frame (in the
 * spirit of an annotated contact sheet) so a missing asset reads as
 * intentional editorial system, not a broken image. The `brief` text
 * documents exactly what to shoot until a photo lands.
 */
export default function ImagePlaceholder({
  brief,
  tag,
  className = "",
  decorative = false,
  src,
  priority = false,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`ph-frame ${className}`}
      role={src ? undefined : decorative ? "presentation" : "img"}
      aria-label={src || decorative ? undefined : brief}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={decorative ? "" : brief}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          {tag && (
            <span className="ph-frame__tag">{tag}</span>
          )}
        </>
      ) : (
        <div className="ph-frame__label">
          {tag && <span className="tag">{tag}</span>}
          <span className="truncate">{brief}</span>
        </div>
      )}
    </div>
  );
}
