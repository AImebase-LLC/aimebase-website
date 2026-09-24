/** Firecrawl-style section: full-bleed top rule, framed column with rails. */
export function Section({
  children,
  id,
  className = "",
  frameClassName = "",
  "aria-labelledby": labelledBy,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  frameClassName?: string;
  "aria-labelledby"?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`rule ${className}`}>
      <div className={`frame ${frameClassName}`}>{children}</div>
    </section>
  );
}

/** "[ 03 / 10 ] · THE PROBLEM" label with an accent tick on the left rail. */
export function SectionLabel({ index, total, children, tone = "light" }: { index?: number; total?: number; children: React.ReactNode; tone?: "light" | "dark" }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const muted = tone === "dark" ? "text-dark-200" : "text-light-900";
  return (
    <div className={`relative flex items-center gap-3 px-6 py-5 md:px-10 mono-label ${muted}`}>
      <span aria-hidden className="absolute -left-px top-1/2 h-4 w-0.5 -translate-y-1/2 bg-accent-500" />
      {index !== undefined && total !== undefined && (
        <span aria-hidden>
          [ <span className={tone === "dark" ? "text-accent-300" : "text-accent-700"}>{pad(index)}</span> / {pad(total)} ]
        </span>
      )}
      {index !== undefined && <span aria-hidden>·</span>}
      <span>{children}</span>
    </div>
  );
}

export function Heading({ id, children, className = "", as: Tag = "h2" }: { id?: string; children: React.ReactNode; className?: string; as?: "h1" | "h2" | "h3" }) {
  return (
    <Tag id={id} data-reveal className={`display text-balance ${className}`}>
      {children}
    </Tag>
  );
}
