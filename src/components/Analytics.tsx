"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Pushes a conversion event (§9) to window.dataLayer for whichever analytics tool is wired up. */
export function track(event: string, detail: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...detail });
}

/** Tracks clicks on any element carrying data-event="…". */
export function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-event]");
      if (!el?.dataset.event) return;
      track(el.dataset.event, { href: el.getAttribute("href"), label: el.textContent?.trim() });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
