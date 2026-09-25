import Link from "next/link";
import { nav, site } from "@/lib/site";
import { LogoMark, Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="rule rule-dark bg-dark-500 text-dark-50">
      <div className="frame relative overflow-hidden px-6 pt-16 pb-10 md:px-10">
        <LogoMark className="pointer-events-none absolute -right-10 -bottom-16 h-72 w-auto opacity-[0.06] md:h-96" />
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <LogoMark className="h-10 w-auto" />
              <span aria-hidden className="h-8 w-px bg-dark-400" />
              <Wordmark tone="light" className="h-[18px]" />
            </div>
            <p className="display mt-6 text-3xl text-light-50 md:text-4xl">{site.tagline}</p>
            <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-dark-100">{site.oneLiner}</p>
          </div>
          <div>
            <p className="mono-label text-dark-200">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[15px] text-dark-50 hover:text-accent-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mono-label text-dark-200">Contact</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li>
                <a href={`mailto:${site.contactEmail}`} data-event="contact_email_click" className="text-light-50 hover:text-accent-300">
                  {site.contactEmail}
                </a>
              </li>
              <li className="text-dark-100">{site.location}</li>
              <li>
                <Link href="/contact?type=project" className="text-dark-100 hover:text-accent-300">Start a project →</Link>
              </li>
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="text-dark-100 hover:text-accent-300">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-dark-400 pt-6 text-sm text-dark-100 md:flex-row md:items-center md:justify-between">
          <p>
            {site.legalEntity} · {site.location} · Maine charter {site.charter}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-light-50">Privacy</Link>
            <Link href="/terms" className="hover:text-light-50">Terms</Link>
            <span>© {site.year}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
