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
  const icon = (
    <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5">
      <path d="M4 2.5h5.5V8M9.5 2.5L2.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (variant === "button") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-event="live_site_click"
        className={`group/live inline-flex h-11 items-center gap-2 rounded-sm border px-4 text-[15px] font-medium transition-colors ${
          tone === "dark" ? "border-white/15 text-light-50 hover:border-white/30" : "border-light-600 bg-light-50 text-dark-500 hover:border-light-700"
        } ${className}`}
      >
        {label ?? "Visit live site"} {icon}
        <span className="sr-only">(opens {host} in a new tab)</span>
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-event="live_site_click"
      className={`group/live inline-flex items-center gap-1.5 text-[15px] font-medium transition-colors ${
        tone === "dark" ? "text-accent-300 hover:text-accent-200" : "text-dark-500 hover:text-accent-700"
      } ${className}`}
    >
      {label ?? host} {icon}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
