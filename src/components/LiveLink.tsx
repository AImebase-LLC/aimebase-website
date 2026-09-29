import { ArrowChip } from "./Icon";

/** External link to a project's live site. Opens in a new tab. */
export function LiveLink({
  href,
  label,
  tone = "light",
  variant = "text",
  className = "",
}: {
  href: string;
  label?: string;
  tone?: "light" | "dark";
  variant?: "text" | "button";
  className?: string;
}) {
  if (!href) return null;
  const host = href.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const common = {
    href,
    target: "_blank",
    rel: "noopener noreferrer",
    "data-event": "live_site_click",
  } as const;
  if (variant === "button") {
    return (
      <a
        {...common}
        className={`inline-flex h-11 items-center gap-3 rounded-sm border pr-2.5 pl-4 text-[15px] font-medium transition-colors ${
          tone === "dark" ? "border-white/15 text-light-50 hover:border-white/30" : "border-light-600 bg-light-50 text-dark-500 hover:border-light-700"
        } ${className}`}
      >
        {label ?? "Visit live site"}
        <ArrowChip direction="up-right" tone={tone} />
        <span className="sr-only">(opens {host} in a new tab)</span>
      </a>
    );
  }
  return (
    <a
      {...common}
      className={`inline-flex items-center gap-2.5 whitespace-nowrap text-[15px] font-medium transition-colors ${
        tone === "dark" ? "text-accent-300" : "text-dark-500"
      } ${className}`}
    >
      <span className="link-sweep">{label ?? host}</span>
      <ArrowChip direction="up-right" size="sm" tone={tone} />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
