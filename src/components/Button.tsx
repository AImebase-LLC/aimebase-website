import Link from "next/link";
import { ArrowChip } from "./Icon";

type Variant = "primary" | "secondary" | "dark" | "light" | "outlineDark";

const styles: Record<Variant, string> = {
  // Dark text on accent-500 keeps 5.7:1 contrast (white on accent-500 is only 3.5:1).
  primary:
    "bg-accent-500 text-[#0b0b0b] shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_1px_2px_rgb(107_28_2/0.3)] hover:bg-accent-400 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_6px_18px_-6px_rgb(255_67_5/0.6)]",
  secondary: "bg-light-50 text-dark-500 border border-light-600 hover:border-light-700",
  dark: "bg-dark-500 text-light-50 hover:bg-dark-400",
  light: "bg-light-50 text-dark-500 hover:bg-light-500",
  outlineDark: "border border-white/15 bg-white/[0.03] text-light-50 hover:border-white/30 hover:bg-white/[0.07]",
};

export function Button({
  href,
  children,
  variant = "primary",
  event,
  size = "md",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  event?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = { sm: "h-9 px-3.5 text-sm", md: "h-11 px-4 text-[15px]", lg: "h-12 px-5 text-base" };
  return (
    <Link
      href={href}
      data-event={event}
      className={`group/btn inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-[background-color,border-color,box-shadow,transform] duration-200 active:scale-[0.98] ${sizes[size]} ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  event,
  tone = "light",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  event?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "dark" ? "text-dark-50 hover:text-light-50" : "text-dark-500";
  return (
    <Link
      href={href}
      data-event={event}
      className={`inline-flex items-center gap-2.5 whitespace-nowrap text-[15px] font-medium transition-colors ${color} ${className}`}
    >
      <span className="link-sweep">{children}</span>
      <ArrowChip tone={tone === "dark" ? "dark" : "light"} />
    </Link>
  );
}
