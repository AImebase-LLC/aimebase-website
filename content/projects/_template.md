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
