import type { Metadata } from "next";
import { Approach } from "@/components/home/Approach";
import { Capabilities } from "@/components/home/Capabilities";
import { FinalCta } from "@/components/home/FinalCta";
import { Founder } from "@/components/home/Founder";
import { Hero } from "@/components/home/Hero";
import { Partners } from "@/components/home/Partners";
import { ProjectsBento } from "@/components/home/ProjectsBento";
import { ProofStrip } from "@/components/home/ProofStrip";

export const metadata: Metadata = {
  title: "AImbase: AI product studio in Maine",
  description:
    "AImbase builds AI-powered software that makes people superfast at what they already do. Products like AImdoc, and custom builds for community organizations, shipped in days.",
};

const TOTAL = 4;

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <ProofStrip />
      <Approach index={1} total={TOTAL} />
      <ProjectsBento index={2} total={TOTAL} />
      <Capabilities index={3} total={TOTAL} />
      <Founder index={4} total={TOTAL} />
      <FinalCta variant="studio" title="Have a problem worth solving?" />
    </>
  );
}
