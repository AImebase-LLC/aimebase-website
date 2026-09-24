import { ArrowLink } from "@/components/Button";
import { Section, SectionLabel } from "@/components/Section";

export default function NotFound() {
  return (
    <Section aria-labelledby="nf-title" className="bg-light-50">
      <SectionLabel>404</SectionLabel>
      <div className="border-t border-light-600 px-6 py-24 md:px-10">
        <h1 id="nf-title" className="display text-5xl md:text-6xl">This page isn&rsquo;t here.</h1>
        <ArrowLink href="/" className="mt-8">Back to home</ArrowLink>
      </div>
    </Section>
  );
}
