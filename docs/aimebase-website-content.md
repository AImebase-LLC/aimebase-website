# AImbase Website: Content Spec for Build Agent

> **How to use this file:** This is the single source of truth for the aimebase.com website's content, structure, and project system. Build pages exactly from the sections below. Anything in `[BRACKETS]` is a placeholder the founder must fill in. Never invent numbers, quotes, client names, or compliance claims to fill a placeholder. Leave the placeholder visible, or hide the element until real data exists.

---

## 0. Agent Rules (read first)

1. **Do not fabricate.** Metrics, testimonials, logos, certifications, and dates come only from this file or from the founder. If a value is missing, use the placeholder or omit the component.
2. **Brand spelling:** the company name is **AImbase** (capital A-I, lowercase m-b-a-s-e). The domain is **aimebase.com**. Never write "Aimbase", "AIMBASE", or "AI-mbase" in body copy. `[OPEN DECISION: founder to confirm whether the name and domain spellings will be unified. Until then, use AImbase for the name and aimebase.com for links.]`
3. **Product spelling:** **AImdoc** (same capitalization pattern).
4. **Voice:** honest, capable, human, focused. The site must never feel corporate, hyped, robotic, or distant. See §3.
5. **Copy bans:** no "revolutionary", "cutting-edge", "unlock", "supercharge", "seamless", "game-changer", "leverage", "empower", "harness the power of AI". Avoid stacked three-item lists in headlines and "no X, no Y, just Z" constructions. Avoid em dashes in headlines.
6. **One primary CTA per page.** The primary CTA on the homepage and on AImdoc pages is **Book an AImdoc demo**. The secondary CTA across the site is **Start a project**.
7. **Projects live in `/content/projects/*.md`**, one file per project, using the schema in §7. Pages that list projects render from those files. Do not hardcode project content into page templates.
8. **Accessibility:** WCAG 2.1 AA, alt text on every image, a visible focus state, and at least 4.5:1 text contrast.
9. **Bilingual readiness:** community projects involve Kinyarwanda and English. Structure copy so a future `/rw/` locale can be added. Do not translate for now.

---

## 1. Company Facts (canonical)

| Field | Value |
|---|---|
| Legal entity | AImbase LLC |
| Location | South Portland, Maine |
| Maine charter | 202611027DC (2026) |
| Founder | Aime Fidele Mbabazi Sole |
| Founder background | Born in Rwanda, studied in Italy, based in Maine. Master's in AI (in progress) at the Roux Institute, Northeastern University. Former Direct Support Professional (DSP) in Maine. |
| Pronunciation | "AY-EYE-base" |
| Name meaning | AI as the foundation. "Base" means foundation, ground, home. |
| Tagline | **Faster work. Lighter days.** |
| One-liner | AImbase builds AI-powered software that makes people superfast at what they already do, starting with documentation. |
| Vision | Make humans superfast at their work, not replace them. |
| Mission | Find one big problem where AI can save people time. Solve it well. Then find the next one. |
| Contact email | `[CONTACT EMAIL]` |
| Demo booking link | `[CALENDAR LINK]` |
| Social links | `[LINKEDIN]` `[X / OTHER]` |

---

## 2. Positioning

**Positioning statement (internal, not shown on the site verbatim):**
For frontline teams and community organizations that big tech overlooks, AImbase is a focused AI product studio that builds software for the actual work. The founder lived these problems, and AImbase ships working software in days instead of selling generic tools.

**Category:** a focused AI product studio. Do not call AImbase an "agency" or an "AI platform".

**Primary audience (conversion target):** leaders of home and community-based service agencies, meaning directors, program managers, and compliance leads at organizations that employ DSPs and caregivers. They buy AImdoc.

**Secondary audience:** community organizations, nonprofits, and small organizations that need custom software (voting, websites, payments, member tools). They start a project.

**Tertiary audience:** partners, researchers, press, and future hires. They read About and Projects.

**Buyer vs. user note:** caregivers use AImdoc, but agency leaders pay for it. Emotional copy speaks to the caregiver's reality. Proof and CTAs speak to the buyer: compliance, audit-readiness, staff time, and retention.

**Key messages, in priority order:**
1. Caregivers lose the end of long shifts to paperwork. AImdoc gives that time back.
2. Built by someone who did the job. This is not a tech company guessing at the problem.
3. We ship real software fast, and it's already in production.
4. Sensitive data is treated as a responsibility, not a feature.
5. We go deep on one problem at a time.

**Keep off the site:** the undecided "next industry" list (agriculture, defense, fraud detection). "Defense" in particular clashes with the brand's human, community tone. Use a neutral "What's next" line only.

---

## 3. Voice & Style Guide

- **Short sentences.** Plain words. Write like the founder is talking to a tired shift supervisor.
- **Show, don't claim.** Replace adjectives with specifics: "built in [X] days" beats "fast". "[X] minutes saved per shift" beats "efficient".
- **First-person plural ("we")** for the company. **First-person singular ("I")** only inside the founder story and the founder quote.
- **Respectful framing of the people served.** Say "people with disabilities" and "the people they support". Never say "patients" for DSP clients, and never say "users" in public copy for caregivers.
- **The AI is the means, not the headline.** Lead with the work and the time saved, then explain how AI does it.

**Tone examples**

| Instead of | Write |
|---|---|
| "Revolutionize your documentation workflow with AI." | "Finish your notes in minutes, not the last hour of your shift." |
| "Enterprise-grade security." | "Your clients' records are protected at every step. Here's how." |
| "We empower communities through technology." | "We built the Rwandan Community of Maine's election platform in [X] days." |

---

## 4. Sitemap & Navigation

```
/                       Home
/aimdoc                 AImdoc product page
/aimdoc/security        Security & privacy (AImdoc)
/projects               All projects (index, filterable)
/projects/[slug]        Individual project case study
/custom                 Custom builds for organizations
/about                  Founder story + values
/contact                Contact + project intake
/demo                   AImdoc demo booking (can redirect to calendar)
/privacy  /terms        Legal
```

**Header nav:** AImdoc · Projects · Custom builds · About · **[Book a demo]** (button)
**Footer:** tagline "Faster work. Lighter days." · nav links · contact email · "AImbase LLC · South Portland, Maine" · Privacy · Terms · © 2026

---

## 5. Page-by-Page Content

### 5.1 Home (`/`)

**Goal:** get agency leaders to book an AImdoc demo. Route custom-build prospects to Start a project.

**Section 1: Hero**
- Eyebrow: `AImdoc by AImbase`
- H1: **Caregivers shouldn't spend the last hour of a 16-hour shift on paperwork.**
- Sub: AImdoc turns a few guided answers into complete, compliant care notes. Built by a former Direct Support Professional who worked that shift.
- Primary CTA: `Book an AImdoc demo` → `/demo`
- Secondary link: `Need something custom built? Start a project →` → `/contact?type=project`
- Visual: product screenshot showing the guided questions on the left and the finished note on the right. `[PRODUCT SCREENSHOT]`

**Section 2: Proof strip** (render only the items that have real data)
- `In production with [AGENCY NAME or "a Maine care provider"]`
- `[X] minutes saved per shift` `[PILOT METRIC]`
- `Bilingual community election for [X] voters across Maine`
- Optional logos: `[CLIENT LOGOS, with permission only]`

**Section 3: The problem**
- H2: **The work doesn't end when the shift does.**
- Body: After a long shift supporting people with disabilities, DSPs still have to read pages of client goals and document every meal, every activity, every moment. It's the most tiring hour of the day, and it's spent on a form instead of rest.
- Optional stat callout: `[INDUSTRY STAT WITH SOURCE, e.g. share of shift spent on documentation]`. Only use this with a cited source.

**Section 4: How AImdoc works** (3 steps, numbered)
1. **Answer short guided questions.** AImdoc asks about the shift in plain language, tied to each person's goals.
2. **Get a complete draft note.** It writes a professional note that follows your agency's format and the client's plan.
3. **Review and submit.** The caregiver checks the note, edits anything, and signs off. A human stays in control.

**Section 5: Before / after**
- Left, "Before": 10 paragraphs of client goals and a blank note field at 11:40 pm.
- Right, "After": 5 quick answers and a finished note, ready for review.
- `[BEFORE/AFTER VISUAL]`

**Section 6: Why agencies choose AImdoc** (benefit cards, written for the buyer)
- **Notes that hold up.** Consistent structure mapped to client goals, ready for audits. `[CONFIRM COMPLIANCE SCOPE]`
- **Time back for your team.** Less after-shift paperwork means less overtime and burnout. `[METRIC]`
- **Built with care for sensitive data.** `[CONFIRMED SECURITY FACTS, see §5.3]`
- **Made by someone who did the job.** Designed from real DSP shifts, not guessed from the outside.

**Section 7: Testimonial**
- Quote: `[QUOTE FROM PILOT SUPERVISOR OR DSP]`
- Attribution: `[NAME, ROLE, ORGANIZATION]`. This section is hidden if no approved quote exists.

**Section 8: Featured projects**
- H2: **What we've shipped**
- Render the 3 projects with `featured: true`, sorted by `order`. Card format per §7.4.
- Link: `See all projects →` → `/projects`

**Section 9: Founder note**
- Photo: `[FOUNDER PHOTO]`
- Quote: "I did 16-hour shifts as a Direct Support Professional in Maine. At the end of each one I watched great caregivers spend their last hour on paperwork. I knew AI could fix that, so I built it." (Aime Fidele Mbabazi Sole, Founder)
- Link: `Read our story →` → `/about`

**Section 10: Final CTA**
- H2: **Give your caregivers their evenings back.**
- Primary CTA: `Book an AImdoc demo`
- Secondary: `Have a different problem? Start a project →`
- Sign-off line: *Faster work. Lighter days.*

---

### 5.2 AImdoc (`/aimdoc`)

**Goal:** demo bookings from agency leaders.

- **Hero H1:** Care documentation that takes minutes, not the end of the shift.
- **Sub:** AImdoc turns short guided answers into professional, compliant notes, so DSPs spend less time writing and more time with the people they support.
- **CTA:** `Book an AImdoc demo`

**Sections:**
1. **Who it's for:** home and community-based service agencies, DSP teams, and group homes. `[CONFIRM TARGET SEGMENTS AND STATES]`
2. **How it works:** reuse the 3 steps from Home, with more detail and a screenshot per step.
3. **Features** (a short grid; confirm every item with the founder before publishing):
   - Guided shift questions tied to each individual's goals
   - Drafts in your agency's note format `[CONFIRM]`
   - Caregiver review and sign-off on every note
   - Supervisor view `[CONFIRM EXISTS]`
   - Export / EHR integration `[CONFIRM: which systems]`
4. **Results from the pilot:** a metrics block rendered from the AImdoc project file (§7). Placeholders: `[TIME SAVED]` `[NOTES COMPLETED]` `[ADOPTION %]`
5. **Security summary:** 3 or 4 lines, linking to `/aimdoc/security`.
6. **FAQ** (see §6)
7. **Pricing:** `[PRICING MODEL, or "Pricing based on team size. Book a demo for a quote."]`
8. **Final CTA**

---

### 5.3 Security & Privacy (`/aimdoc/security`)

**Rule:** every statement on this page must be confirmed by the founder. Do not publish "HIPAA-compliant" without the confirmations below.

Fields to fill:
- Hosting provider and region: `[e.g., AWS us-east-1]`
- HIPAA posture: `[e.g., "HIPAA-eligible infrastructure; we sign a BAA with every agency"]`
- BAA available: `[YES/NO]`
- Encryption: `[at rest / in transit specifics]`
- Access control & audit logs: `[details]`
- AI model data handling: `[e.g., "Client data is not used to train models"; name the model provider's data terms]`
- Data retention & deletion: `[policy]`
- Incident contact: `[security email]`

Intro copy: "The people our customers support trust them with their most personal information. We treat that trust as the foundation of the product, not an add-on. Here is exactly how AImdoc handles data."

---

### 5.4 Custom Builds (`/custom`)

**Goal:** qualified project inquiries from community organizations and small organizations.

- **H1:** Software for organizations that big tech doesn't build for.
- **Sub:** We build AI-powered and custom software for community groups, nonprofits, and small organizations. We ship working products in days, not quarters.
- **CTA:** `Start a project` → `/contact?type=project`

**Sections:**
1. **What we build:** voting and election platforms, community websites, member contributions and donations, and internal tools with AI assistance. Render as cards, each linking to a matching project filtered by `type`.
2. **How a project works:**
   1. *Talk:* a free call to understand the problem. `[CONFIRM FREE]`
   2. *Scope:* a short, plain-language plan with a fixed timeline and price. `[CONFIRM]`
   3. *Build:* working versions early, so you can react to real software.
   4. *Launch & support:* we stay on after launch. `[CONFIRM SUPPORT TERMS]`
3. **Proof:** project cards filtered to `category: custom`.
4. **Fit check:** "We're a good fit if you serve a real community, you're slowed down by manual work, and generic tools haven't fit." (List format is fine here.)
5. **Final CTA**

---

### 5.5 Projects Index (`/projects`)

- **H1:** What we've shipped
- **Sub:** Real software in production, built for real people. Each project started with one problem.
- **Filters** (from project frontmatter): `All` · `Products` · `Custom builds`. Optional tag filter by `industry`.
- **Grid:** cards per §7.4, sorted by `order` and then `date` descending.
- **Empty/coming state:** a card for `status: research` projects labeled "What's next" with a one-line teaser and no industry named unless the founder approves it.
- **Bottom CTA:** "Have a problem worth solving? Start a project →"

### 5.6 Project Detail (`/projects/[slug]`)

Rendered entirely from the project file. The layout is in §7.5.

---

### 5.7 About (`/about`)

**Section 1: Hero**
- H1: **It started with a 16-hour shift.**
- Photo: `[FOUNDER PHOTO, candid preferred]`

**Section 2: Origin story** (use close to verbatim; this is the founder's voice)

> I worked as a Direct Support Professional in Maine while pursuing my Master's in AI at Northeastern's Roux Institute. I did 16-hour shifts caring for people with disabilities. At the end of each shift, exhausted, I had to read through ten paragraphs of client goals and write detailed documentation of everything I did: every meal, every activity, every moment.
>
> I watched my coworkers struggle with the same thing. Great caregivers, exhausted, spending their last hour of a shift on paperwork instead of resting. I knew AI could fix this. That's how AImdoc was born.
>
> Then the Rwandan Community of Maine asked me to build a platform for their 2026 community election. I built it in a few days, and voters across Maine cast ballots online in both Kinyarwanda and English. Afterward, they asked me to build their community website, with recurring member contributions and donations.
>
> The industries will change. The mission won't: find one big problem, solve it well, and make people superfast at their work.

**Section 3: Mission & vision**
- Vision: Make humans superfast at their work, not replace them.
- Mission: Find one big problem where AI can save people time. Solve it well. Then find the next one.

**Section 4: What we believe** (the 5 values; render as a list, not a hero)
1. **Solve one thing at a time.** Depth beats spread. We stay with one problem until it's solved well.
2. **Real problems, real people.** We build for workers on the ground: caregivers, community organizers, small business owners.
3. **Faster, not replaced.** AI should make people better at what they already do.
4. **Ship it.** Software in production beats a perfect roadmap.
5. **Trust matters.** Healthcare records, community votes, personal data: security and privacy are non-negotiable.

**Section 5: The name**
AImbase (pronounced "AY-EYE-base"). The AI is capitalized because artificial intelligence is our foundation. *Base* means foundation, ground, home. Everything we build stands on it.

**Section 6: What's next**
"We're researching the next big problem to solve. When we find it, we'll go as deep on it as we did on documentation." (Do not name industries unless the founder approves.)

**Section 7: Founder facts** (small card)
Aime Fidele Mbabazi Sole · Born in Rwanda · Studied in Italy · Based in South Portland, Maine · MS in AI, Roux Institute (Northeastern University)

**CTA:** `Book an AImdoc demo` · `Start a project`

---

### 5.8 Contact (`/contact`)

- **H1:** Let's talk.
- **Sub:** Tell us about the problem. We reply within `[X]` business days.
- **Form fields:** Name · Email · Organization · I'm interested in (radio: `AImdoc demo` / `Custom project` / `Something else`) · What problem are you trying to solve? (textarea) · Timeline (optional select)
- If `type=project` is in the URL, preselect "Custom project".
- If "AImdoc demo" is selected, show the calendar embed `[CALENDAR LINK]` inline instead of the form.
- Direct email: `[CONTACT EMAIL]` · Location: South Portland, Maine

---

## 6. FAQ Bank (AImdoc)

Confirm all answers with the founder before publishing. Answers marked `[CONFIRM]` are drafts.

- **Does AImdoc replace the caregiver's judgment?** No. AImdoc drafts the note, and the caregiver reviews, edits, and signs off on every one.
- **Is it HIPAA-compliant?** `[CONFIRM exact wording and BAA availability]`
- **Will it match our agency's note format?** `[CONFIRM]`
- **Does it work with our EHR / billing system?** `[CONFIRM integrations]`
- **How long does setup take?** `[CONFIRM, e.g., "Most agencies are live within [X] days."]`
- **Do caregivers need training?** `[CONFIRM]` Draft: "If they can answer a text message, they can use AImdoc. We run a short onboarding session for each team."
- **Is client data used to train AI?** `[CONFIRM with model provider terms]`
- **What does it cost?** `[PRICING]`

---

## 7. Projects System

Projects are the main proof on the site. Every project is one Markdown file with YAML frontmatter. The site generates project cards, the projects index, filters, and detail pages from these files.

### 7.1 File location & naming

```
/content/projects/
  aimdoc.md
  rcm-election-2026.md
  rcm-community-website.md
  _template.md          ← copy this for new projects (excluded from build)
/public/projects/[slug]/ ← images for each project
  cover.jpg             (1600×1000, used for cards and the detail hero)
  1.jpg, 2.jpg...       (gallery)
```

### 7.2 Frontmatter schema

```yaml
---
title: ""                 # required. Project name, e.g. "AImdoc"
slug: ""                  # required. URL-safe, matches the filename
category: ""              # required. "product" | "custom"
type: ""                  # required. e.g. "documentation", "voting-platform", "website", "payments"
industry: ""              # required. e.g. "healthcare", "community", "nonprofit"
client: ""                # client/org name, or "Internal" for AImbase products
client_public: true       # false = show a generic label instead of the client name
status: ""                # required. "live" | "pilot" | "in-development" | "research"
date: ""                  # YYYY-MM (launch or start)
featured: false           # true = eligible for the homepage "What we've shipped"
order: 99                 # lower = shown first
summary: ""               # required. One sentence, max ~140 chars, used on cards
problem: ""               # required. One or two sentences
outcome_headline: ""      # the single strongest result, e.g. "Built and launched in 4 days"
metrics:                  # 0–4 items. Real numbers only
  - value: ""             # e.g. "4 days"
    label: ""             # e.g. "from first call to launch"
tags: []                  # e.g. ["AI", "Bilingual", "Payments", "HIPAA"]
stack: []                 # optional. Shown in small text on the detail page
languages: []             # optional. e.g. ["Kinyarwanda", "English"]
cover: ""                 # /projects/[slug]/cover.jpg
cover_alt: ""             # required if cover is set
gallery: []               # list of {src, alt}
testimonial:
  quote: ""
  name: ""
  role: ""
link: ""                  # optional live URL (only if public and approved)
cta: ""                   # "demo" | "project". Picks the CTA on the detail page
---
```

### 7.3 Body structure (Markdown under the frontmatter)

Every project body uses these H2 sections in this order. Skip a section only if there is truly nothing to say.

```markdown
## The problem
Who was struggling, with what, and why it mattered. Human and specific.

## What we built
The solution in plain language. What the person actually does with it.

## How it works
Short technical and product explanation. Where AI is used, and where it isn't.

## Results
The outcome in words, expanding on the metrics. Quote the client if possible.

## What we learned
One or two honest sentences. This supports the "Honest" brand trait.
```

### 7.4 Project card (used on Home, Projects, Custom)

```
┌─────────────────────────────────┐
│ [cover image]                   │
│ ─────────────────────────────── │
│ STATUS BADGE · CATEGORY         │  e.g. "LIVE · Custom build"
│ Title                           │
│ summary (1 line)                │
│ ▸ outcome_headline              │  bold, accent color
│ tag  tag  tag                   │  max 3 tags
└─────────────────────────────────┘
```
- The whole card is clickable and goes to `/projects/[slug]`.
- Status badge colors: `live` = green, `pilot` = blue, `in-development` = amber, `research` = neutral gray.
- If `client_public: false`, show the `industry` label instead of the client name.

### 7.5 Project detail page layout

1. Breadcrumb: Projects / Title
2. Hero: title, summary, status badge, client, date, and cover image
3. **Metrics bar:** up to 4 `metrics` as large number + label. Hide it if the list is empty.
4. Body sections from §7.3
5. Gallery (if any)
6. Testimonial block (if any)
7. Meta sidebar or footer: industry, type, languages, tags, stack, live link
8. CTA block: if `cta: demo`, show "Book an AImdoc demo". If `cta: project`, show "Have a similar problem? Start a project".
9. "More projects": 2 other cards, same category first

### 7.6 Seed project files

**`/content/projects/aimdoc.md`**
```markdown
---
title: "AImdoc"
slug: "aimdoc"
category: "product"
type: "documentation"
industry: "healthcare"
client: "Internal"
client_public: true
status: "pilot"
date: "[YYYY-MM]"
featured: true
order: 1
summary: "AI documentation for frontline caregivers. Short guided answers become complete, compliant care notes."
problem: "Direct Support Professionals spend the last hour of long shifts reading client goals and writing detailed notes."
outcome_headline: "[PILOT RESULT, e.g. 'X minutes saved per shift']"
metrics:
  - value: "[X min]"
    label: "saved per shift"
  - value: "[X]"
    label: "notes completed in pilot"
tags: ["AI", "Healthcare", "Documentation"]
stack: []
languages: ["English"]
cover: "/projects/aimdoc/cover.jpg"
cover_alt: "AImdoc turning guided shift answers into a finished care note"
gallery: []
testimonial:
  quote: "[APPROVED QUOTE]"
  name: "[NAME]"
  role: "[ROLE, ORGANIZATION]"
link: ""
cta: "demo"
---

## The problem
After 16-hour shifts supporting people with disabilities, DSPs in Maine had to read through pages of client goals and document every meal, activity, and moment. Great caregivers were spending their last, most exhausted hour on paperwork instead of rest.

## What we built
AImdoc asks caregivers a few short, guided questions about the shift, tied to each person's goals, then drafts a professional note ready for review and sign-off.

## How it works
[FOUNDER TO CONFIRM: guided question flow, how goals are pulled in, which AI model drafts the note, review/sign-off step, where data is stored.]

## Results
AImdoc is in a production pilot in Maine. [PILOT RESULTS AND QUOTE.]

## What we learned
[e.g., "Caregivers trusted the drafts more once every note required their review, so we made sign-off mandatory."]
```

**`/content/projects/rcm-election-2026.md`**
```markdown
---
title: "Rwandan Community of Maine: 2026 Election Platform"
slug: "rcm-election-2026"
category: "custom"
type: "voting-platform"
industry: "community"
client: "Rwandan Community of Maine"
client_public: true   # [CONFIRM permission]
status: "live"        # [CONFIRM: "live" or "completed"]
date: "2026-[MM]"
featured: true
order: 2
summary: "A bilingual online voting platform that let community members across Maine vote in Kinyarwanda or English."
problem: "The community needed members spread across Maine to vote securely in their 2026 election, in the language they're most comfortable with."
outcome_headline: "Built in [X] days, used by voters across Maine"
metrics:
  - value: "[X] days"
    label: "from request to launch"
  - value: "[X]"
    label: "ballots cast"
  - value: "2"
    label: "languages"
tags: ["Voting", "Bilingual", "Community"]
stack: []
languages: ["Kinyarwanda", "English"]
cover: "/projects/rcm-election-2026/cover.jpg"
cover_alt: "Ballot screen of the Rwandan Community of Maine election platform in Kinyarwanda and English"
gallery: []
testimonial:
  quote: "[APPROVED QUOTE FROM COMMUNITY LEADER]"
  name: "[NAME]"
  role: "[ROLE], Rwandan Community of Maine"
link: ""
cta: "project"
---

## The problem
The Rwandan Community of Maine needed to run its 2026 community election with members living across the state. In-person voting would have left people out, and any tool had to work in both Kinyarwanda and English.

## What we built
A secure online voting platform where each eligible member could cast one ballot in their preferred language.

## How it works
[FOUNDER TO CONFIRM: voter verification method, one-vote enforcement, results tallying, hosting.]

## Results
Built in a few days, the platform let voters across Maine cast ballots online in both languages. After the election, the community asked AImbase to build its website.

## What we learned
[FOUNDER INPUT]
```

**`/content/projects/rcm-community-website.md`**
```markdown
---
title: "Rwandan Community of Maine: Community Website"
slug: "rcm-community-website"
category: "custom"
type: "website"
industry: "community"
client: "Rwandan Community of Maine"
client_public: true   # [CONFIRM permission]
status: "[live | in-development]"
date: "2026-[MM]"
featured: true
order: 3
summary: "A community website with recurring member contributions and donations built in."
problem: "The community needed one home online, plus a simple way for members to contribute and donate on a recurring basis."
outcome_headline: "[e.g. 'Recurring contributions live for X members']"
metrics: []
tags: ["Website", "Payments", "Community"]
stack: []
languages: ["[CONFIRM]"]
cover: "/projects/rcm-community-website/cover.jpg"
cover_alt: "Homepage of the Rwandan Community of Maine website"
gallery: []
testimonial:
  quote: ""
  name: ""
  role: ""
link: "[LIVE URL IF PUBLIC]"
cta: "project"
---

## The problem
After the election, the community wanted a permanent online home and a reliable way to collect recurring member contributions and donations.

## What we built
[FOUNDER TO CONFIRM: pages, member area, payment provider, recurring billing.]

## How it works
[DETAILS]

## Results
[RESULTS]

## What we learned
[FOUNDER INPUT]
```

**`/content/projects/_template.md`**: copy the §7.2 frontmatter and the §7.3 body verbatim, with empty values.

### 7.7 Rules for adding a new project

1. Copy `_template.md` to `[slug].md`. The slug should be lowercase with hyphens.
2. Fill every required field. `summary` must be one sentence.
3. Metrics must be real and verifiable. If there are none, use `metrics: []`.
4. Get the client's permission before `client_public: true`, before using any logo, and before publishing a testimonial.
5. Set `featured: true` for at most 3 projects at a time, and set `order` to control their placement.
6. Add a cover image at 1600×1000 with alt text.
7. `status: research` projects show only title, summary, and a "What's next" badge. They have no detail page until they move to `in-development`.

---

## 8. SEO & Metadata

| Page | Title tag | Meta description |
|---|---|---|
| Home | AImbase: AI software for frontline work · AImdoc | AImdoc turns short guided answers into complete, compliant care notes for DSPs and caregivers. Built in Maine by a former Direct Support Professional. |
| AImdoc | AImdoc: AI care documentation for DSPs \| AImbase | Cut after-shift paperwork. AImdoc drafts professional, compliant notes from a few guided questions, with caregiver review on every note. |
| Projects | Projects \| AImbase | Software in production for caregivers and community organizations, including a bilingual election platform built in days. |
| Custom | Custom software for community organizations \| AImbase | We build voting platforms, websites, payments, and AI tools for community groups and nonprofits, and ship in days. |
| About | About AImbase: It started with a 16-hour shift | How a DSP and AI master's student in Maine built AImbase to make people superfast at their work. |
| Project detail | `{title} \| AImbase Projects` | `{summary}` |

- Open Graph image: `[OG IMAGE 1200×630]` with the tagline and logo.
- Schema.org: `Organization` on all pages, `SoftwareApplication` on `/aimdoc`, and `CreativeWork` for each project.
- Target keywords: DSP documentation software, caregiver documentation AI, direct support professional notes, progress notes AI, community voting platform, Maine AI company.

---

## 9. Conversion & Analytics

- Track as events: `demo_click`, `demo_booked`, `project_form_submit`, `project_card_click`, `contact_email_click`.
- The primary CTA appears at least 3 times on Home and on `/aimdoc`: hero, mid-page, and final.
- Put the calendar booking inline. Don't send demo seekers to a generic form.
- A sticky header CTA ("Book a demo") appears after the visitor scrolls past the hero.
- Target load time is under 2.5s LCP. Compress images, use a system font or 1 web font, and use minimal JS.

---

## 10. Asset Checklist (founder to provide)

- [ ] Logo (SVG, light and dark versions) and favicon
- [ ] Brand colors and font `[not defined in the brief; founder to decide]`
- [ ] Founder photo (candid + headshot)
- [ ] AImdoc screenshots: guided questions, finished note, and review screen
- [ ] Pilot metrics and an approved testimonial
- [ ] Confirmed security and HIPAA facts (§5.3)
- [ ] Election platform screenshots, ballot count, and build time
- [ ] Community website screenshots and live URL
- [ ] Client permissions for names, logos, and quotes
- [ ] Contact email and calendar link
- [ ] Pricing approach
- [ ] Decision on the name/domain spelling
