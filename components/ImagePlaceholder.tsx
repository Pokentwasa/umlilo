type ImagePlaceholderProps = {
  /** Plain description of the real photograph this frame is standing in for. */
  brief: string;
  /** Short index/tag shown in the corner, e.g. "01" or "FOOD". */
  tag?: string;
  className?: string;
  /** Set true for images that are purely decorative in context. */
  decorative?: boolean;
};

/**
 * Deliberate stand-in for real photography. Renders as a textured,
 * captioned frame (in the spirit of an annotated contact sheet) so a
 * missing asset reads as intentional editorial system, not a broken
 * image. Swap for next/image once photography exists — the `brief`
 * text documents exactly what to shoot.
 */
export default function ImagePlaceholder({
  brief,
  tag,
  className = "",
  decorative = false,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`ph-frame ${className}`}
      role={decorative ? "presentation" : "img"}
      aria-label={decorative ? undefined : brief}
    >
      <div className="ph-frame__label">
        {tag && <span className="tag">{tag}</span>}
        <span className="truncate">{brief}</span>
      </div>
    </div>
  );
}
