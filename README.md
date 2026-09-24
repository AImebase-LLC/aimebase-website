# aimebase.com

Marketing site for AImbase and AImdoc. Built from `docs/aimebase-website-content.md` (content spec) and
`docs/Mode 1.tokens.json` (color tokens).

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
```

## Positioning

The home page presents AImbase as a focused AI product studio: hero, partners, proof, how we work, the project
bento, what we build, founder note, and a "Start a project" close. AImdoc is one product. Its full story (problem,
how it works, before/after, benefits, security, FAQ, pricing) lives on `/aimdoc`, where the header CTA switches to
"Book a demo". Featured projects (`featured: true`) drive the hero showcase and the home bento.

## Where things live

| What | Where |
|---|---|
| Company facts, CTAs, FAQ, security fields | `src/lib/site.ts` |
| Projects (one Markdown file each, §7) | `content/projects/*.md`, copy `_template.md` |
| Project images (1600×1000 cover + gallery) | `public/projects/[slug]/` |
| Color, radius, font tokens | `src/app/globals.css` (`@theme`) |

Project cards, the projects index, filters and detail pages all render from `content/projects`. Nothing about a
project is hardcoded into a page. Set `featured: true` on up to 3 projects for the homepage.

## Content

All copy is sourced from the content spec. Where the spec leaves a number, quote, or compliance fact open, the site
says only what's known (for example "built in a few days", "in a production pilot") and invents nothing. Things
still to confirm are marked as `# [CONFIRM …]` YAML comments in `content/projects/*.md`: client permission, the
website project's status (`in-development`, switch to `live` at launch).

Optional pieces that appear automatically once supplied:

| Asset | Where | Until then |
|---|---|---|
| Booking link | `NEXT_PUBLIC_CALENDAR_LINK` | `/demo` shows a demo request form |
| Founder photo | `site.founderPhoto` in `src/lib/site.ts` | a founder-journey card (Rwanda → Italy → Maine) |
| Partner logos | `partners[].logo` in `src/lib/site.ts` (with permission) | styled wordmarks with the real relationship |
| Project screenshots | `public/projects/[slug]/cover.jpg` | an illustrated cover drawn for the project type |
| Testimonial | `homeTestimonial` in `src/lib/site.ts` | section hidden |
| Social links | `site.social` | hidden |

## Forms

`/api/contact` handles the contact, project, and demo forms. Set `RESEND_API_KEY` (emails `CONTACT_TO`) or
`CONTACT_WEBHOOK_URL` (POSTs JSON). With neither configured it returns 503 and the form tells the visitor to email
hello@aimebase.com. It never fakes a success. There's a honeypot field against bots.

## Design system

- **Colors:** only the token file's scales (`dark`, `light`, `accent`, `secondary`). The one addition is the
  status badge colors §7.4 asks for (green, blue, amber), which aren't in the token file.
- **Contrast:** white on `accent-500` is 3.5:1, which fails AA. Buttons use `accent-500` with `dark-500` text
  (5.7:1), and accent-colored text on light backgrounds uses `accent-700` (5.9:1).
- **Radius:** from rulebase.co. 4px (`rounded-sm`, buttons and inputs), 8px (`rounded-md`, cards), 12px
  (`rounded-lg`, large panels), plus 2px and a pill.
- **Layout:** a firecrawl-style framed 1200px column with full-height rails, full-bleed rules with `+` marks,
  and `[ 01 / 06 ]` mono section labels.
- **Type:** ABC Diatype for headlines (`.display` / `font-display`), Geist for everything else, Geist Mono for
  labels.

### ABC Diatype

ABC Diatype is a licensed font from Dinamo and is **not included**. After buying a web license, add:

```
public/fonts/ABCDiatype-Regular.woff2
public/fonts/ABCDiatype-Medium.woff2
```

The root layout detects the files at build time, then injects the `@font-face` rules and preloads. Until then,
headlines use Geist and no font requests are made.

## Interaction

- Hero: a live AImdoc demo (`ProductPreview`) types five answers, drafts the note goal by goal, and shows sign-off.
  It loops while on screen and pauses off screen.
- Partners: an infinite marquee (`components/ui/infinite-slider`, Web Animations API) with progressive-blur edges;
  hover slows it down.
- Scroll reveal (`[data-reveal]`) and a cursor spotlight on cards (`[data-spotlight]`), both from one small client
  component, `Interactions.tsx`.
- Everything respects `prefers-reduced-motion`.

## Analytics

Clicks on elements with `data-event` push `{ event, href, label }` to `window.dataLayer`:
`demo_click`, `project_cta_click`, `project_card_click`, `contact_email_click`, and `project_form_submit` on a
successful form send (`demo_booked` for demo requests). Wire up GTM or Plausible to read `dataLayer`.
