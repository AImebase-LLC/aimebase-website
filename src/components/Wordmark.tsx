import Link from "next/link";

/** Text wordmark until the founder supplies the logo SVG (§10). */
export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="AImbase home"
      className={`font-display text-[22px] font-medium tracking-[-0.04em] ${tone === "light" ? "text-light-50" : "text-dark-500"}`}
    >
      AImbase
    </Link>
  );
}
