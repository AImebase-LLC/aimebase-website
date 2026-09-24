import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | AImbase",
  description: "How AImbase LLC collects, uses, and protects information on aimebase.com.",
};

const mail = <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>;

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 23, 2026"
      intro="This policy explains what information AImbase LLC collects through aimebase.com, how we use it, and the choices you have. We collect as little as we can, we never sell it, and we use it only to answer you and run this website."
      sections={[
        {
          heading: "Who we are",
          body: (
            <p>
              {site.legalEntity} (&ldquo;AImbase&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a Maine limited liability company based in{" "}
              {site.location}. We build AI-powered software, including AImdoc. Questions about this policy can go to {mail}.
            </p>
          ),
        },
        {
          heading: "What this policy covers",
          body: (
            <>
              <p>
                This policy covers aimebase.com and the forms on it. It does not cover information processed inside AImdoc on
                behalf of a care agency. That information, including anything about the people an agency supports, is handled
                under the written agreement between AImbase and that agency, and our{" "}
                <Link href="/aimdoc/security">security and privacy practices for AImdoc</Link>.
              </p>
              <p>Please don&rsquo;t send health information about the people you support through our website forms or email.</p>
            </>
          ),
        },
        {
          heading: "Information we collect",
          body: (
            <>
              <p>
                <strong className="font-medium text-dark-500">What you send us.</strong> When you use our contact, project, or demo
                forms, or email us, we receive what you choose to share: typically your name, work email, organization, role, team
                size, and a description of your problem or project.
              </p>
              <p>
                <strong className="font-medium text-dark-500">Basic technical information.</strong> Like most websites, our hosting
                provider automatically records standard request data such as IP address, browser type, and pages requested, to keep
                the site secure and working. We may also use privacy-respecting analytics to count visits and see which pages are
                useful. We don&rsquo;t use advertising trackers.
              </p>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <ul>
              <li>To reply to you, schedule demos, and scope projects you ask us about.</li>
              <li>To understand how the website is used, so we can improve it.</li>
              <li>To keep the site secure and prevent abuse.</li>
              <li>To meet legal obligations.</li>
            </ul>
          ),
        },
        {
          heading: "Who we share it with",
          body: (
            <>
              <p>We don&rsquo;t sell or rent personal information. We share it only with:</p>
              <ul>
                <li>Service providers who help us run the site, such as hosting, email delivery, and scheduling, under terms that limit their use of it.</li>
                <li>Authorities, when the law requires it.</li>
                <li>A successor, if AImbase is ever part of a merger or acquisition, under the same protections described here.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              We keep messages and contact details for as long as we&rsquo;re in conversation with you and for a reasonable period
              afterward for our records. You can ask us to delete them at any time.
            </p>
          ),
        },
        {
          heading: "Your choices",
          body: (
            <p>
              You can ask us to show you, correct, or delete the personal information we hold about you by emailing {mail}. We&rsquo;ll
              respond promptly and won&rsquo;t treat you differently for asking.
            </p>
          ),
        },
        {
          heading: "Security",
          body: (
            <p>
              We use reasonable technical and organizational measures to protect the information you send us. No method of
              transmission over the internet is completely secure, so we encourage you not to send sensitive information through
              website forms.
            </p>
          ),
        },
        {
          heading: "Children",
          body: <p>This website is meant for organizations and professionals. We don&rsquo;t knowingly collect information from children under 13.</p>,
        },
        {
          heading: "Changes and contact",
          body: (
            <p>
              If we change this policy, we&rsquo;ll update the date at the top of this page. For any question about privacy, write to{" "}
              {mail}, or {site.legalEntity}, {site.location}.
            </p>
          ),
        },
      ]}
    />
  );
}
