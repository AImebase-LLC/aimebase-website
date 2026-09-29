import type React from "react";

/**
 * Browser window frame, adapted from Cult UI's BrowserWindow to the AImbase
 * tokens (no shadcn theme variables). Adds:
 *  - size "auto": no fixed height, the content sets it (screenshots keep their ratio)
 *  - size "compact": small chrome for cover illustrations and step cards
 *  - fadeBottom: the original mask-b fade, off by default so screens stay whole
 *  - theme "dark" for frames that sit on dark or glass surfaces
 */

const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

type Theme = "light" | "dark";

interface SidebarItem {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string | number;
}

const palette = {
  light: {
    frame: "bg-light-50 border-light-600",
    header: "bg-light-500 border-light-600",
    muted: "bg-light-600",
    mutedText: "text-light-900",
    text: "text-dark-500",
    address: "bg-light-50 border-light-600 text-light-900",
    sidebar: "bg-light-500 border-light-600",
    active: "bg-accent-500/[0.08] text-accent-700 border-accent-500/15",
    shadow:
      "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5),0_24px_60px_-30px_rgb(107_28_2/0.4)]",
  },
  dark: {
    frame: "bg-[#141414] border-white/10",
    header: "bg-white/[0.04] border-white/10",
    muted: "bg-white/10",
    mutedText: "text-white/55",
    text: "text-white",
    address: "bg-white/[0.06] border-white/10 text-white/60",
    sidebar: "bg-white/[0.03] border-white/10",
    active: "bg-white/10 text-white border-white/10",
    shadow:
      "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.3)_inset,0px_0px_0px_1px_hsla(0,0%,0%,0.2)_inset,0px_0px_1px_0px_rgba(255,255,255,0.1),0_30px_70px_-30px_rgb(0_0_0/0.8)]",
  },
} as const;

function WindowControls({
  variant = "macos",
  headerStyle = "full",
  compact = false,
  theme = "light",
}: {
  variant?: "macos" | "windows" | "chrome" | "safari";
  headerStyle?: "minimal" | "full";
  compact?: boolean;
  theme?: Theme;
}) {
  const dot = compact ? "size-1.5" : "size-2.5";
  const p = palette[theme];

  if (variant === "windows") {
    return (
      <div className="flex gap-1">
        <div className={cn("flex h-4 w-6 items-center justify-center", p.muted)}>
          <div className="h-0.5 w-2 bg-current opacity-60" />
        </div>
        <div className={cn("flex h-4 w-6 items-center justify-center", p.muted)}>
          <div className="h-2 w-2 border border-current opacity-60" />
        </div>
        <div className="relative flex h-4 w-6 items-center justify-center bg-[#e81123]/80">
          <div className="h-0.5 w-2 rotate-45 bg-white" />
          <div className="absolute h-0.5 w-2 -rotate-45 bg-white" />
        </div>
      </div>
    );
  }

  const colored = headerStyle === "full";
  const colors = colored
    ? ["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"]
    : [p.muted, p.muted, p.muted];
  return (
    <div className={cn("flex shrink-0", compact ? "gap-1" : "gap-2")} aria-hidden>
      {colors.map((c, i) => (
        <span key={i} className={cn(dot, "rounded-full border border-black/10", c)} />
      ))}
    </div>
  );
}

function AddressBar({
  url = "https://example.com",
  secure = true,
  variant = "chrome",
  compact = false,
  theme = "light",
  className = "",
}: {
  url?: string;
  secure?: boolean;
  variant?: "chrome" | "safari";
  compact?: boolean;
  theme?: Theme;
  className?: string;
}) {
  const p = palette[theme];
  return (
    <div className={cn("flex min-w-0 flex-1 justify-center", className)}>
      <div
        className={cn(
          "flex max-w-md min-w-0 items-center gap-1.5 border shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)_inset]",
          variant === "chrome" ? "rounded-full" : "rounded-md",
          compact ? "px-2 py-0.5 font-mono text-[8px]" : "px-3.5 py-1.5 font-mono text-[11px]",
          p.address,
        )}
      >
        {secure && (
          <svg viewBox="0 0 12 12" fill="currentColor" className={compact ? "h-2 w-2 shrink-0" : "h-3 w-3 shrink-0"} aria-hidden>
            <path d="M6 1a2.5 2.5 0 0 1 2.5 2.5V5h.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h.5V3.5A2.5 2.5 0 0 1 6 1z" />
          </svg>
        )}
        <span className="truncate">{url.replace(/^https?:\/\//, "")}</span>
      </div>
    </div>
  );
}

function SidebarContent({ items = [], theme = "light", className = "" }: { items?: SidebarItem[]; theme?: Theme; className?: string }) {
  const p = palette[theme];
  return (
    <div className={cn("space-y-1 p-3", className)}>
      {items.map((item, i) => (
        <div
          key={`${item.label}-${i}`}
          className={cn(
            "flex items-center gap-2 rounded-sm border px-2 py-1.5 text-sm",
            item.active ? p.active : cn("border-transparent", p.mutedText),
          )}
        >
          {item.icon && <div className="h-4 w-4 shrink-0">{item.icon}</div>}
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge !== undefined && <span className={cn("min-w-4 rounded-full px-1.5 py-0.5 text-center text-xs", p.active)}>{item.badge}</span>}
        </div>
      ))}
    </div>
  );
}

export interface BrowserWindowProps {
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  size?: "sm" | "md" | "lg" | "xl" | "auto" | "compact";
  showSidebar?: boolean;
  sidebarPosition?: "left" | "right" | "top" | "bottom";
  headerStyle?: "minimal" | "full";
  variant?: "chrome" | "safari" | "generic";
  theme?: Theme;
  url?: string;
  secure?: boolean;
  fadeBottom?: boolean;
  sidebarItems?: SidebarItem[];
  /** Optional right-side header content (status pill, etc.) */
  headerRight?: React.ReactNode;
}

export function BrowserWindow({
  children,
  className = "",
  contentClassName = "",
  size = "auto",
  showSidebar = false,
  sidebarPosition = "left",
  headerStyle = "full",
  variant = "chrome",
  theme = "light",
  url,
  secure = true,
  fadeBottom = false,
  sidebarItems,
  headerRight,
}: BrowserWindowProps) {
  const compact = size === "compact";
  const p = palette[theme];
  const sizeClasses: Record<NonNullable<BrowserWindowProps["size"]>, string> = {
    sm: "h-64 max-w-sm",
    md: "h-80 max-w-2xl",
    lg: "h-96 max-w-4xl",
    xl: "h-[32rem] max-w-6xl",
    auto: "",
    compact: "",
  };
  const sidebarSizes = { sm: "w-32", md: "w-48", lg: "w-56", xl: "w-64", auto: "w-52", compact: "w-24" };
  const fixedHeight = size !== "auto" && size !== "compact";

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden border",
        compact ? "rounded-lg" : "rounded-xl",
        fadeBottom && "[mask-image:linear-gradient(to_bottom,#000_50%,transparent)]",
        p.frame,
        p.shadow,
        sizeClasses[size],
        className,
      )}
    >
      <div className={cn("flex shrink-0 items-center border-b", compact ? "h-6 gap-2 px-2" : "h-11 gap-3 px-4", p.header)}>
        <WindowControls variant={variant === "generic" ? "macos" : variant} headerStyle={headerStyle} compact={compact} theme={theme} />
        {headerStyle === "full" && url && (
          <AddressBar url={url} secure={secure} variant={variant === "safari" ? "safari" : "chrome"} compact={compact} theme={theme} />
        )}
        {headerRight ? <div className="ml-auto shrink-0">{headerRight}</div> : headerStyle === "full" && url ? <div className={compact ? "w-6" : "w-12"} aria-hidden /> : null}
      </div>

      {showSidebar && sidebarPosition === "top" && (
        <div className={cn("border-b", p.sidebar)}>
          <SidebarContent items={sidebarItems} theme={theme} className="flex gap-1 space-y-0" />
        </div>
      )}

      <div className={cn("flex min-h-0", fixedHeight ? "h-0 flex-1" : "")}>
        {showSidebar && sidebarPosition === "left" && (
          <div className={cn("h-full shrink-0 border-r", sidebarSizes[size], p.sidebar)}>
            <SidebarContent items={sidebarItems} theme={theme} />
          </div>
        )}
        <div className={cn("relative min-w-0 flex-1", fixedHeight && "h-full", contentClassName)}>{children}</div>
        {showSidebar && sidebarPosition === "right" && (
          <div className={cn("h-full shrink-0 border-l", sidebarSizes[size], p.sidebar)}>
            <SidebarContent items={sidebarItems} theme={theme} />
          </div>
        )}
      </div>

      {showSidebar && sidebarPosition === "bottom" && (
        <div className={cn("border-t", p.sidebar)}>
          <SidebarContent items={sidebarItems} theme={theme} className="flex gap-1 space-y-0" />
        </div>
      )}
    </div>
  );
}
