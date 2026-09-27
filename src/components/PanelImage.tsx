import Image from "next/image";

/**
 * Background photo for dark info panels. The photo is strongest at the top and
 * fades into the panel's black toward the bottom, so the copy stays readable.
 * `textTop` adds a soft shade behind copy that starts at the top of the panel.
 */
export function PanelImage({
  src,
  position = "50% 30%",
  textTop = false,
  priority = false,
}: {
  src: string;
  position?: string;
  textTop?: boolean;
  priority?: boolean;
}) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="pointer-events-none -z-10 object-cover"
        style={{ objectPosition: position }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(11_11_11/0.12)_0%,rgb(11_11_11/0.45)_38%,rgb(11_11_11/0.88)_68%,#0b0b0b_100%)]"
      />
      {textTop && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(110%_60%_at_0%_0%,rgb(11_11_11/0.78),rgb(11_11_11/0.35)_55%,transparent_80%)]"
        />
      )}
    </>
  );
}
