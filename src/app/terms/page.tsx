import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use | AImbase",
  description: "The terms that apply when you use aimebase.com.",
};

const mail = <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>;

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="September 23, 2026"
      intro="These terms apply when you use aimebase.com. By using the site, you agree to them. Using AImdoc or hiring us for a custom build is covered by a separate written agreement, which takes priority over these terms for that work."
      sections={[
        {
          heading: "About us",
          body: (
            <p>
              aimebase.com is operated by {site.legalEntity}, a Maine limited liability company based in {site.location}{" "}
              (Maine charter {site.charter}).
            </p>
          ),
        },
        {
          heading: "Using the site",
          body: (
            <ul>
              <li>Use the site lawfully and don&rsquo;t try to disrupt it, break into it, or scrape it at scale.</li>
              <li>Don&rsquo;t submit anything through our forms that you don&rsquo;t have the right to share, including health information about the people you support.</li>
              <li>Tell us the truth about who you are when you contact us.</li>
            </ul>
          ),
        },
        {
          heading: "Information on the site",
          body: (
            <p>
              We work to keep what&rsquo;s here accurate and current, but the site is general information about AImbase and our
              products. It isn&rsquo;t medical, legal, or compliance advice, and it isn&rsquo;t an offer or contract. Product details
              and availability can change.
            </p>
          ),
        },
        {
          heading: "Our content",
          body: (
            <p>
              The AImbase and AImdoc names, the site design, text, and graphics belong to {site.legalEntity} or are used with
              permission. You&rsquo;re welcome to share links to our pages. Please ask before reusing anything else. Client names
              and project details appear with their permission and remain theirs.
            </p>
          ),
        },
        {
          heading: "Links to other sites",
          body: <p>Where we link to other websites, we don&rsquo;t control them and aren&rsquo;t responsible for their content or practices.</p>,
        },
        {
          heading: "Disclaimers and liability",
          body: (
            <p>
              The site is provided &ldquo;as is&rdquo;. To the fullest extent the law allows, {site.legalEntity} isn&rsquo;t liable for
              indirect or consequential losses arising from your use of the website. Nothing in these terms limits liability that
              can&rsquo;t be limited by law.
            </p>
          ),
        },
        {
          heading: "Governing law",
          body: <p>These terms are governed by the laws of the State of Maine, and any dispute will be handled in the courts of Maine.</p>,
        },
        {
          heading: "Changes and contact",
          body: (
            <p>
              We may update these terms from time to time and will change the date above when we do. Questions? Write to {mail}.
            </p>
          ),
        },
      ]}
    />
  );
}
