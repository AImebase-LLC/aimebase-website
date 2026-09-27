"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState } from "react";

/**
 * Contextual cursor for [data-cursor] targets on fine-pointer devices:
 *  explore  "Explore" + search icon (capability / product cards, dropdown features)
 *  visit    "Visit" + ↗ (reserved for external destinations)
 * Project cards and plain content cards keep the normal system cursor.
 * An optional data-cursor-label overrides the text.
 */
type Kind = "visit" | "explore";

const labels: Record<Kind, string> = { visit: "Visit", explore: "Explore" };

export function CustomCursor() {
  const el = useRef<HTMLDivElement>(null);
  const [kind, setKind] = useState<Kind | null>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-ready");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let x = -100, y = -100, cx = -100, cy = -100, raf = 0;
    const loop = () => {
      const k = reduced ? 1 : 0.22;
      cx += (x - cx) * k;
      cy += (y - cy) * k;
      if (el.current) el.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    let current: Element | null = null;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as Element | null)?.closest("[data-cursor]") ?? null;
      if (target !== current) {
        current = target;
        const k = (target?.getAttribute("data-cursor") as Kind | null) ?? null;
        setKind(k);
        setLabel(target?.getAttribute("data-cursor-label") ?? (k ? labels[k] : ""));
      }
    };
    const onLeave = () => {
      current = null;
      setKind(null);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("cursor-ready");
    };
  }, []);

  if (!enabled) return null;
  const active = kind !== null;
  const icon = kind === "visit" ? ArrowUpRight01Icon : Search01Icon;

  return (
    <div ref={el} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[80]">
      <div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1.5 whitespace-nowrap transition-[width,height,opacity,background-color,border-radius] duration-300 ease-out ${
          !active
            ? "h-0 w-0 opacity-0"
            : "h-10 rounded-full bg-dark-500 px-4 text-[13px] font-medium text-light-50 opacity-100 shadow-[0_10px_30px_-10px_rgb(11_11_11/0.6)]"
        }`}
      >
        {active && (
          <>
            <span className="animate-rise">{label}</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-[#0b0b0b]">
              <HugeiconsIcon icon={icon} size={12} strokeWidth={2.2} color="currentColor" />
            </span>
          </>
        )}
      </div>
    </div>
  );
}
