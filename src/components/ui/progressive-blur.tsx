/**
 * Stacked backdrop blurs, each masked to its own band, so content blurs more
 * the closer it is to the edge.
 */
export function ProgressiveBlur({
  direction = "left",
  blurLayers = 6,
  blurIntensity = 1,
  className = "",
}: {
  direction?: "left" | "right" | "top" | "bottom";
  blurLayers?: number;
  blurIntensity?: number;
  className?: string;
}) {
  const angle = { top: 0, right: 90, bottom: 180, left: 270 }[direction];
  const segment = 1 / (blurLayers + 1);
  return (
    <div aria-hidden className={`relative ${className}`}>
      {Array.from({ length: blurLayers }).map((_, i) => {
        const stops = [i * segment, (i + 1) * segment, (i + 2) * segment, (i + 3) * segment].map(
          (p, j) => `rgba(255,255,255,${j === 1 || j === 2 ? 1 : 0}) ${p * 100}%`,
        );
        const mask = `linear-gradient(${angle}deg, ${stops.join(", ")})`;
        return (
          <div
            key={i}
            className="pointer-events-none absolute inset-0"
            style={{
              maskImage: mask,
              WebkitMaskImage: mask,
              backdropFilter: `blur(${i * blurIntensity}px)`,
              WebkitBackdropFilter: `blur(${i * blurIntensity}px)`,
            }}
          />
        );
      })}
    </div>
  );
}
