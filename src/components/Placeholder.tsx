import { isPlaceholder, showPlaceholders } from "@/lib/site";

/** A visible placeholder chip. Renders nothing when placeholders are hidden. */
export function Ph({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  if (!showPlaceholders) return null;
  return (
    <span
      className={`inline rounded-xs border border-dashed border-accent-300 bg-accent-50/70 px-1 font-mono text-[0.8em] font-normal tracking-normal text-accent-800 [box-decoration-break:clone] ${className}`}
    >
      {children}
    </span>
  );
}

/** Renders copy that may contain [PLACEHOLDER] segments, marking each one. */
export function Fill({ text }: { text: string }) {
  if (!isPlaceholder(text)) return <>{text}</>;
  const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? <Ph key={i}>{part}</Ph> : <span key={i}>{part}</span>,
      )}
    </>
  );
}

/** A framed empty slot for a founder-supplied asset (screenshot, photo, visual). */
export function AssetSlot({ label, className = "", dark = false }: { label: string; className?: string; dark?: boolean }) {
  if (!showPlaceholders) return null;
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={`flex items-center justify-center rounded-md border border-dashed p-6 text-center font-mono text-xs ${
        dark ? "border-dark-300 text-dark-100" : "border-accent-300 bg-accent-50/40 text-accent-800"
      } ${className}`}
    >
      {label}
    </div>
  );
}
