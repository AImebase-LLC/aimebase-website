"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cta, navGroups, site, type NavGroup, type NavItem } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import {
  Appointment02Icon,
  ArrowDown01Icon,
  BlocksIcon,
  Cancel01Icon,
  DashboardSquare01Icon,
  Flowchart01Icon,
  Globe02Icon,
  HeartCheckIcon,
  Mail01Icon,
  MedicalFileIcon,
  Menu01Icon,
  Route01Icon,
  SecurityValidationIcon,
  VoteIcon,
  WebDesign01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { ArrowChip, Icon } from "./Icon";

export type NavProject = { slug: string; title: string; status: string; summary: string };

const statusDot: Record<string, string> = {
  live: "bg-status-live",
  pilot: "bg-status-pilot",
  "in-development": "bg-[#c98a12]",
};

function itemsFor(group: NavGroup, projects: NavProject[]): NavItem[] {
  if (group.items !== "projects") return group.items;
  return [
    ...projects.map((p) => ({
      href: `/projects/${p.slug}`,
      title: p.title.split(":").pop()!.trim(),
      desc: p.summary,
      tag: p.status,
    })),
    { href: "/projects", title: "All projects", desc: "Everything we've shipped, filterable by type" },
  ];
}

function Chevron({ open }: { open: boolean }) {
  return <Icon icon={ArrowDown01Icon} size={14} strokeWidth={2} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />;
}

/** Hugeicon per destination. */
const navIcons: Record<string, IconSvgElement> = {
  "/aimdoc": MedicalFileIcon,
  "/aimdoc/security": SecurityValidationIcon,
  "/demo": Appointment02Icon,
  "/projects/aimdoc": MedicalFileIcon,
  "/projects/rcm-election-2026": VoteIcon,
  "/projects/rcm-community-website": WebDesign01Icon,
  "/projects": DashboardSquare01Icon,
  "/custom": BlocksIcon,
  "/custom#process": Flowchart01Icon,
  "/about": Route01Icon,
  "/about#values": HeartCheckIcon,
  "/contact": Mail01Icon,
};

function ItemIcon({ href, tag }: { href: string; tag?: string }) {
  return (
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center border border-light-600 bg-light-50 text-dark-400 transition-colors group-hover/item:border-accent-500 group-hover/item:bg-accent-500 group-hover/item:text-[#0b0b0b]">
      <Icon icon={navIcons[href] ?? Globe02Icon} size={19} />
      {tag && statusDot[tag] && <span className={`absolute -top-1 -right-1 h-2 w-2 rounded-full ring-2 ring-light-50 ${statusDot[tag]}`} />}
    </span>
  );
}

export function Header({ projects }: { projects: NavProject[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<number | null>(null);
  const [panelLeft, setPanelLeft] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const productPage = pathname.startsWith("/aimdoc") || pathname.startsWith("/demo") || pathname === "/projects/aimdoc";
  const headerCta = productPage ? cta.demoShort : cta.project;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobile]);

  // Escape and outside click close everything.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open !== null) triggers.current[open]?.focus();
      setOpen(null);
      setMobile(false);
    };
    const onDown = (e: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const place = useCallback((i: number) => {
    const t = triggers.current[i];
    const w = wrap.current;
    if (!t || !w) return;
    const tr = t.getBoundingClientRect();
    const wr = w.getBoundingClientRect();
    const panelW = Math.min(680, wr.width - 24);
    const left = Math.max(12, Math.min(tr.left - wr.left - 16, wr.width - panelW - 12));
    setPanelLeft(left);
  }, []);

  const show = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    place(i);
    setOpen(i);
  };
  const hide = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  // Each group owns its section; dropdown links into other sections don't light it up.
  const sections: Record<string, string[]> = { Products: ["/aimdoc", "/demo"], Company: ["/about", "/contact"] };
  const groupActive = (g: NavGroup) =>
    (sections[g.label] ?? [g.href]).some((h) => pathname === h || pathname.startsWith(h + "/"));

  const group = open !== null ? navGroups[open] : null;

  return (
    <header className="sticky top-0 z-50">
      {/* Full-bleed liquid glass, flush to the top edge. A sibling layer, so dropdowns can blur the page themselves. */}
      <div
        aria-hidden
        className={`glass absolute inset-0 rounded-none border-b border-light-600 transition-shadow duration-300 ${
          scrolled ? "shadow-[inset_0_1px_0_rgb(255_255_255/0.95),0_12px_32px_-18px_rgb(11_11_11/0.45)]" : "!shadow-[inset_0_1px_0_rgb(255_255_255/0.95)]"
        }`}
      />
      <div ref={wrap} className="frame relative" onMouseLeave={hide}>
        {/* The bar, on the page grid */}
        <div className="flex h-16 items-center justify-between gap-3 pr-3 pl-4 sm:pl-5 md:pr-4 md:pl-10">
          <Wordmark className="h-5 sm:h-[22px] md:h-[26px]" />

          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
            {navGroups.map((g, i) => {
              const active = groupActive(g);
              return (
                <button
                  key={g.label}
                  ref={(el) => {
                    triggers.current[i] = el;
                  }}
                  type="button"
                  aria-expanded={open === i}
                  aria-controls="nav-panel"
                  onMouseEnter={() => show(i)}
                  onFocus={() => place(i)}
                  onClick={() => (open === i ? setOpen(null) : show(i))}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      show(i);
                      requestAnimationFrame(() => document.querySelector<HTMLElement>("#nav-panel a")?.focus());
                    }
                  }}
                  className={`relative inline-flex h-16 items-center gap-1.5 px-3.5 text-[14.5px] transition-colors ${
                    open === i ? "bg-dark-500/[0.05] text-dark-500" : active ? "text-dark-500" : "text-dark-400 hover:bg-dark-500/[0.03] hover:text-dark-500"
                  }`}
                >
                  {g.label}
                  <Chevron open={open === i} />
                  {active && <span aria-hidden className="absolute inset-x-3.5 bottom-0 h-0.5 bg-accent-500" />}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href={headerCta.href}
              data-event={headerCta.event}
              className="inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm bg-dark-500 px-3.5 text-sm font-medium text-light-50 max-[359px]:hidden sm:px-4 shadow-[inset_0_1px_0_rgb(255_255_255/0.15)] transition-[background-color,transform] hover:bg-dark-400 active:scale-[0.98]"
            >
              {headerCta.label}
            </Link>
            <button
              type="button"
              className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-dark-500/10 bg-light-50/60 lg:hidden"
              aria-expanded={mobile}
              aria-controls="mobile-nav"
              aria-label={mobile ? "Close menu" : "Open menu"}
              onClick={() => setMobile((v) => !v)}
            >
              <Icon icon={Menu01Icon} size={20} className={`absolute transition-[transform,opacity] duration-300 ${mobile ? "rotate-90 opacity-0" : "opacity-100"}`} />
              <Icon icon={Cancel01Icon} size={20} className={`absolute transition-[transform,opacity] duration-300 ${mobile ? "opacity-100" : "-rotate-90 opacity-0"}`} />
            </button>
          </div>
        </div>

        {/* Desktop dropdown */}
        <div
          id="nav-panel"
          role="region"
          aria-label={group ? `${group.label} menu` : undefined}
          onMouseEnter={() => closeTimer.current && clearTimeout(closeTimer.current)}
          style={{ left: panelLeft }}
          className={`absolute top-full hidden w-[min(680px,calc(100%-24px))] transition-[opacity,transform] duration-200 lg:block ${
            group ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          {group && (
            <div className="glass glass-panel grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-2 rounded-none border border-t-0 border-light-600 p-2">
              <ul className="grid content-start gap-0.5 p-1">
                {itemsFor(group, projects).map((it) => (
                  <li key={it.href + it.title}>
                    <Link
                      href={it.href}
                      className="group/item flex items-start gap-3 p-2.5 transition-colors hover:bg-dark-500/[0.045] focus-visible:bg-dark-500/[0.045]"
                    >
                      <ItemIcon href={it.href} tag={it.tag} />
                      <span className="min-w-0">
                        <span className="flex items-center gap-2 text-[14px] font-medium text-dark-500">
                          {it.title}
                          {it.tag && !statusDot[it.tag] && (
                            <span className="rounded-xs bg-status-pilot-bg px-1 font-mono text-[9px] tracking-wide text-status-pilot uppercase">{it.tag}</span>
                          )}
                        </span>
                        <span className="mt-0.5 line-clamp-1 text-[12.5px] leading-snug text-light-900">{it.desc}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={group.feature.href}
                data-cursor="explore"
                className={`group/f relative flex flex-col justify-between gap-8 overflow-hidden p-5 ${
                  group.feature.tone === "dark" ? "bg-dark-500 text-light-50" : "bg-secondary-100 text-dark-500"
                }`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 ${group.feature.tone === "dark" ? "dot-field" : "dot-grid"} [mask-image:radial-gradient(90%_80%_at_100%_0%,#000,transparent)]`}
                />
                <span className={`relative font-mono text-[10px] tracking-wide uppercase ${group.feature.tone === "dark" ? "text-accent-300" : "text-accent-700"}`}>
                  {group.feature.eyebrow}
                </span>
                <span className="relative">
                  <span className="display block text-xl leading-snug">{group.feature.title}</span>
                  <span className={`mt-4 inline-flex items-center gap-2.5 text-sm font-medium ${group.feature.tone === "dark" ? "text-accent-300" : "text-accent-700"}`}>
                    <span className="link-sweep">{group.feature.cta}</span> <ArrowChip size="sm" tone={group.feature.tone === "dark" ? "dark" : "light"} />
                  </span>
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-nav"
          className={`glass glass-panel pointer-events-auto absolute inset-x-0 top-full max-h-[calc(100dvh-64px)] overflow-y-auto rounded-none border-b border-light-600 transition-[opacity,transform,visibility] duration-300 lg:hidden ${
            mobile ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
          }`}
        >
          <nav aria-label="Mobile" className="p-2">
            {navGroups.map((g, i) => (
              <div key={g.label} className="border-b border-dark-500/[0.07] last:border-0">
                <button
                  type="button"
                  aria-expanded={mobileGroup === i}
                  onClick={() => setMobileGroup(mobileGroup === i ? null : i)}
                  className="flex w-full items-center justify-between px-3 py-3.5 font-display text-[22px] font-medium tracking-[-0.03em] text-dark-500"
                >
                  {g.label}
                  <Chevron open={mobileGroup === i} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${mobileGroup === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <ul className="overflow-hidden">
                    {itemsFor(g, projects).map((it) => (
                      <li key={it.href + it.title}>
                        <Link href={it.href} className="group/item flex items-start gap-3 px-3 py-2.5 active:bg-dark-500/[0.05]">
                          <ItemIcon href={it.href} tag={it.tag} />
                          <span className="min-w-0">
                            <span className="block text-[15px] font-medium text-dark-500">{it.title}</span>
                            <span className="block text-[13px] leading-snug text-light-900">{it.desc}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                    <li className="h-2" />
                  </ul>
                </div>
              </div>
            ))}
            <div className="space-y-2 p-2 pt-4">
              <Link
                href={productPage ? cta.demo.href : cta.project.href}
                data-event={productPage ? cta.demo.event : cta.project.event}
                className="flex h-12 w-full items-center justify-center rounded-sm bg-accent-500 font-medium text-[#0b0b0b]"
              >
                {productPage ? cta.demo.label : cta.project.label}
              </Link>
              <a href={`mailto:${site.contactEmail}`} data-event="contact_email_click" className="block py-2 text-center text-sm text-light-900">
                {site.contactEmail}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
