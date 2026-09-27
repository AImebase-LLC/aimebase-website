import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { ArrowRight02Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";


/** Hugeicons with brand defaults. Decorative unless a `label` is given. */
export function Icon({
  icon,
  size = 18,
  strokeWidth = 1.8,
  className = "",
  label,
}: {
  icon: IconSvgElement;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
}) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={strokeWidth}
      color="currentColor"
      className={`shrink-0 ${className}`}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}

/**
 * Link affordance: a square chip whose arrow slides out as a fresh one slides
 * in when the nearest link/button (or [data-arrow-host]) is hovered or focused.
 */
export function ArrowChip({
  direction = "right",
  size = "md",
  tone = "light",
  className = "",
}: {
  direction?: "right" | "up-right";
  size?: "sm" | "md";
  tone?: "light" | "dark" | "accent";
  className?: string;
}) {
  const icon = direction === "right" ? ArrowRight02Icon : ArrowUpRight01Icon;
  const px = size === "sm" ? 12 : 14;
  const tones = {
    light: "border-dark-500/15 bg-dark-500/[0.04] text-current",
    dark: "border-white/20 bg-white/[0.06] text-current",
    accent: "border-transparent bg-accent-500 text-[#0b0b0b]",
  };
  return (
    <span aria-hidden className={`arrow-chip ${direction === "up-right" ? "arrow-chip-ur" : ""} ${size === "sm" ? "size-5" : "size-6"} ${tones[tone]} ${className}`}>
      <span className="arrow-a">
        <HugeiconsIcon icon={icon} size={px} strokeWidth={2} color="currentColor" />
      </span>
      <span className="arrow-b">
        <HugeiconsIcon icon={icon} size={px} strokeWidth={2} color="currentColor" />
      </span>
    </span>
  );
}
