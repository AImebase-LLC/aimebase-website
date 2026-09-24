/**
 * Canonical company facts (content spec §1) and site copy.
 *
 * Every line here is sourced from docs/aimebase-website-content.md. Where the
 * spec left a number, quote or compliance fact open, the copy says only what
 * is known and never invents the rest. Optional assets (founder photo,
 * calendar link, social links) are empty strings until supplied; components
 * hide themselves while a value is empty.
 */

/** Review mode: show dashed chips for any [BRACKET] value still in content files. */
export const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

export const isPlaceholder = (value: string | null | undefined): boolean =>
  !value || /\[[^\]]+\]/.test(value);

/** True when a value is real, or when placeholders are being shown for review. */
export const canRender = (value: string | null | undefined): boolean =>
  showPlaceholders || !isPlaceholder(value);

export const site = {
  name: "AImbase",
  product: "AImdoc",
  domain: "aimebase.com",
  url: "https://aimebase.com",
  legalEntity: "AImbase LLC",
  location: "South Portland, Maine",
  charter: "202611027DC",
  founder: "Aime Fidele Mbabazi Sole",
  founderFirst: "Aime",
  pronunciation: "AY-EYE-base",
  tagline: "Faster work. Lighter days.",
  oneLiner:
    "AImbase builds AI-powered software that makes people superfast at what they already do, starting with documentation.",
  vision: "Make humans superfast at their work, not replace them.",
  mission: "Find one big problem where AI can save people time. Solve it well. Then find the next one.",

  contactEmail: "hello@aimebase.com",
  securityEmail: "hello@aimebase.com",
  /** Booking page URL (Cal.com, Calendly…). Empty = the demo page shows a request form. */
  calendarLink: process.env.NEXT_PUBLIC_CALENDAR_LINK ?? "",
  /** Path under /public, e.g. "/founder.jpg". Empty = a founder-journey card is shown instead. */
  founderPhoto: "",
  social: [] as { label: string; href: string }[],
  year: 2026,
} as const;

export const nav = [
  { href: "/aimdoc", label: "AImdoc" },
  { href: "/projects", label: "Projects" },
  { href: "/custom", label: "Custom builds" },
  { href: "/about", label: "About" },
] as const;

export const cta = {
  demo: { href: "/demo", label: "Book an AImdoc demo", event: "demo_click" },
  demoShort: { href: "/demo", label: "Book a demo", event: "demo_click" },
  project: { href: "/contact?type=project", label: "Start a project", event: "project_cta_click" },
} as const;

/** Home proof strip: studio-level facts from the content spec. */
export const proofStrip = [
  { value: "3 projects", label: "built in 2026, two already in real use" },
  { value: "A few days", label: "from request to launch for a statewide community election" },
  { value: "In production", label: "AImdoc, our first product, piloting with a Maine care provider" },
  { value: "2 languages", label: "Kinyarwanda and English, on every ballot we shipped" },
];

/** How we work (§3 mission, §5.7 values). */
export const approach = [
  {
    title: "Find one big problem.",
    body: "We start with the people doing the work, not the technology. Caregivers, organizers, small teams: where does their time actually go?",
  },
  {
    title: "Build it with them.",
    body: "Working versions early, in front of the people who'll use them, so the software fits the job instead of the other way around.",
  },
  {
    title: "Ship it.",
    body: "Software in production beats a perfect roadmap. We launched a statewide community election platform in a few days.",
  },
  {
    title: "Go deep, then find the next one.",
    body: "We stay with a problem until it's solved well. Then we look for the next place AI can give people their time back.",
  },
];

/** What we build (§5.4 plus the product line). */
export const capabilities = [
  {
    title: "AI products",
    body: "Focused software that does one job for a whole industry. First up: AImdoc, for care documentation.",
    href: "/aimdoc",
    link: "Explore AImdoc",
  },
  {
    title: "Voting and election platforms",
    body: "Secure, bilingual ballots members can cast from anywhere, ready by election day.",
    href: "/projects/rcm-election-2026",
    link: "See the election platform",
  },
  {
    title: "Community websites and payments",
    body: "One home online for your organization, with recurring contributions and donations built in.",
    href: "/projects/rcm-community-website",
    link: "See the community website",
  },
  {
    title: "Internal tools with AI assistance",
    body: "The manual, repetitive work that slows a small team down, handled with AI help and a person in control.",
    href: "/custom",
    link: "Custom builds",
  },
];

/** Real relationships only (§1, §7.6). Add `logo` (a path under /public) once a file is supplied with permission. */
export const partners: { name: string; role: string; logo?: string }[] = [
  { name: "Rwandan Community of Maine", role: "Client · Election platform and website" },
  { name: "A Maine care provider", role: "AImdoc production pilot" },
  { name: "The Roux Institute", role: "Northeastern University · Founder's MS in AI" },
];

/** Home §7. Stays hidden until an approved quote from a pilot supervisor or DSP is added. */
export const homeTestimonial = { quote: "", attribution: "" };

/** Founder's closing line from the origin story (§5.7). Leads the home founder note. */
export const founderMission =
  "The industries will change. The mission won't: find one big problem, solve it well, and make people superfast at their work.";

export const founderQuote =
  "I did 16-hour shifts as a Direct Support Professional in Maine. At the end of each one I watched great caregivers spend their last hour on paperwork. I knew AI could fix that, so I built it.";

/** Founder journey (§1, §5.7). Used where a photo would go until one is supplied. */
export const founderJourney = [
  { place: "Rwanda", note: "Born" },
  { place: "Italy", note: "Studied" },
  { place: "Maine", note: "Direct Support Professional, 16-hour shifts" },
  { place: "Roux Institute", note: "Master's in AI (in progress), Northeastern University" },
  { place: "South Portland", note: "Founded AImbase, 2026" },
];

/** §6 FAQ bank. Answers say only what the spec establishes; specifics are covered live on the demo. */
export const faq = [
  {
    q: "Does AImdoc replace the caregiver's judgment?",
    a: "No. AImdoc drafts the note, and the caregiver reviews, edits, and signs off on every one. Nothing is submitted without a person's approval.",
  },
  {
    q: "Is it HIPAA-compliant?",
    a: "We treat every record as protected health information from the first line of code. On your demo, we walk your compliance lead through exactly where data is stored, how it's encrypted, who can access it, and the agreements we put in place with your agency, so you can judge it against your own requirements.",
  },
  {
    q: "Will it match our agency's note format?",
    a: "Yes. AImdoc drafts in the structure your agency already uses and maps each note to the goals in the person's plan, so notes read the same way every shift.",
  },
  {
    q: "Does it work with our EHR or billing system?",
    a: "Finished notes are reviewed and signed in AImdoc, ready for the system your agency already uses. Tell us what you use and we'll show you how it fits during the demo.",
  },
  {
    q: "How long does setup take?",
    a: "Setup starts with your note format and the goals of the people you support. We do the configuration, then run a short onboarding session with each team, so caregivers start on a working tool, not a blank one.",
  },
  {
    q: "Do caregivers need training?",
    a: "If they can answer a text message, they can use AImdoc. We run a short onboarding session for each team.",
  },
  {
    q: "Is client data used to train AI?",
    a: "Your clients' records are there to write their notes. Before you share a single record, we'll show you how the AI model handles data, including our model provider's data terms, in writing.",
  },
  {
    q: "What does it cost?",
    a: "Pricing is based on team size. Book a demo and we'll give you a quote for your agency.",
  },
];

/** §5.3. Framed as what we cover with an agency, never as unconfirmed claims. */
export const securityPrinciples = [
  {
    title: "A person signs every note.",
    body: "AImdoc drafts. The caregiver reviews, edits, and signs off. Nothing reaches a record without human approval.",
  },
  {
    title: "Records are there to write notes.",
    body: "The goals and details AImdoc sees exist to draft that person's note. That is the only job they have in the product.",
  },
  {
    title: "Built by someone who handled these files.",
    body: "Our founder read the same client goals and wrote the same notes your caregivers do. The product is built around that responsibility.",
  },
  {
    title: "Nothing is hidden from your compliance lead.",
    body: "Hosting, encryption, access logs, AI data terms, retention: we answer in writing, before you share any data.",
  },
];

export const securityReview = [
  { label: "Hosting and region", body: "Where AImdoc runs and where your data physically lives." },
  { label: "HIPAA and BAA", body: "Our HIPAA posture and the business associate agreement we put in place with your agency." },
  { label: "Encryption", body: "How data is protected in transit and at rest." },
  { label: "Access control and audit logs", body: "Who can see which records, and how every access is logged." },
  { label: "AI model data handling", body: "Which model drafts the notes and our model provider's data terms, in writing." },
  { label: "Retention and deletion", body: "How long records are kept, and how they're deleted when you ask." },
];
