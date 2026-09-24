import type { Metadata } from "next";
import { CalendarEmbed } from "@/components/CalendarEmbed";
import { ContactForm } from "@/components/ContactForm";
import { SectionLabel } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | AImbase",
  description: "Tell us about the problem. Book an AImdoc demo or start a custom project with AImbase in South Portland, Maine.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const initial = type === "project" ? "project" : type === "demo" ? "demo" : "other";

  return (
    <section aria-labelledby="page-title" className="rule">
      <div className="frame">
        <SectionLabel>Contact</SectionLabel>
        <div className="grid border-t border-light-600 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <div className="relative flex flex-col justify-between gap-12 overflow-hidden bg-dark-500 px-6 py-14 md:px-10 md:py-20">
            <div aria-hidden className="dot-field pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_60%_at_0%_0%,#000,transparent)]" />
            <div className="relative">
              <h1 id="page-title" className="animate-rise display text-5xl text-light-50 md:text-7xl">Let&rsquo;s talk.</h1>
              <p className="animate-rise mt-6 max-w-[36ch] text-[17px] leading-relaxed text-dark-100 [animation-delay:100ms]">
                Tell us about the problem. Every message is read by the person who&rsquo;ll build the answer, and we reply by email.
              </p>
            </div>
            <dl className="relative space-y-6 text-[15px]">
              <div>
                <dt className="mono-label text-dark-200">Email</dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${site.contactEmail}`} data-event="contact_email_click" className="text-lg text-light-50 underline-offset-4 hover:text-accent-300 hover:underline">
                    {site.contactEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mono-label text-dark-200">Based in</dt>
                <dd className="mt-1.5 text-light-50">{site.location}</dd>
              </div>
              <div>
                <dt className="mono-label text-dark-200">Company</dt>
                <dd className="mt-1.5 text-dark-100">{site.legalEntity} · Maine charter {site.charter}</dd>
              </div>
            </dl>
          </div>
          <div className="bg-light-500 px-6 py-14 md:px-10 md:py-20">
            <ContactForm initial={initial} calendar={site.calendarLink ? <CalendarEmbed /> : undefined} />
          </div>
        </div>
      </div>
    </section>
  );
}
