"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cta, nav, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  // AImdoc pages sell the product; everywhere else the studio's CTA leads.
  const productPage = pathname.startsWith("/aimdoc") || pathname.startsWith("/demo") || pathname === "/projects/aimdoc";
  const headerCta = productPage ? cta.demoShort : cta.project;

  return (
    <header
      className={`sticky top-0 z-50 border-b border-light-600 transition-[background-color,box-shadow] duration-300 ${
        open
          ? "bg-light-500"
          : scrolled
            ? "bg-light-500/85 shadow-[0_8px_24px_-18px_rgb(11_11_11/0.25)] backdrop-blur-md"
            : "bg-light-500"
      }`}
    >
      <div className="frame flex h-16 items-center justify-between px-5 md:px-10">
        <Wordmark />
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative rounded-sm px-3 py-2 text-[15px] transition-colors hover:bg-light-600/50 hover:text-dark-500 ${
                isActive(item.href) ? "text-dark-500" : "text-light-900"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span aria-hidden className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-accent-500" />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={headerCta.href}
            data-event={headerCta.event}
            className="inline-flex h-9 items-center gap-1.5 rounded-sm bg-dark-500 px-3.5 text-sm font-medium text-light-50 transition-[background-color,transform] hover:bg-dark-400 active:scale-[0.98]"
          >
            {headerCta.label}
          </Link>
          <button
            type="button"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-sm border border-light-600 bg-light-50 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className={`absolute h-px w-4 bg-dark-500 transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
            <span aria-hidden className={`absolute h-px w-4 bg-dark-500 transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={`fixed inset-x-0 top-16 bottom-0 bg-light-500 transition-[opacity,visibility] duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex h-full flex-col px-5 pt-4 pb-8">
          {[...nav, { href: "/contact", label: "Contact" }].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
              className={`flex items-center justify-between border-b border-light-600 py-4 font-display text-[28px] font-medium tracking-[-0.03em] transition-[opacity,transform] duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              } ${isActive(item.href) ? "text-dark-500" : "text-dark-400"}`}
            >
              {item.label}
              <span aria-hidden className="text-lg text-light-800">→</span>
            </Link>
          ))}
          <div className="mt-auto space-y-3">
            <Link
              href={productPage ? cta.demo.href : cta.project.href}
              data-event={productPage ? cta.demo.event : cta.project.event}
              className="flex h-12 w-full items-center justify-center rounded-sm bg-accent-500 font-medium text-dark-500"
            >
              {productPage ? cta.demo.label : cta.project.label}
            </Link>
            <a href={`mailto:${site.contactEmail}`} data-event="contact_email_click" className="block text-center text-sm text-light-900">
              {site.contactEmail}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
