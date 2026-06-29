# SubSnoop SEO Strategy

**Status:** Active
**Version:** 1.0
**Last updated:** June 2026
**Owner:** Growth Team

---

## Goals

1. Rank on page 1 for subscription-management keywords in Estonia (ET) and English (EN)
2. Drive 5,000 organic monthly visitors within 6 months
3. Build topical authority around "subscription management," "PSD2," and "Open Banking"
4. Support Product Hunt launch with strong on-page SEO foundation

---

## Target Keywords

### English (Primary — International Audience)

| Keyword | Monthly Volume (est.) | KD | Intent | Target Page |
|---|---|---|---|---|
| subscription tracker | 8,100 | Medium | Commercial | / |
| find forgotten subscriptions | 2,400 | Low | Informational | / + blog |
| cancel subscriptions | 12,000 | High | Transactional | / |
| subscription management app | 3,600 | Medium | Commercial | / |
| recurring charge finder | 880 | Low | Informational | / |
| open banking estonia | 1,200 | Low | Informational | /how-it-works |
| PSD2 subscription tracker | 210 | Low | Commercial | / |
| bank subscription detector | 720 | Low | Commercial | / |
| how to find all my subscriptions | 4,400 | Low | Informational | blog/en-forgotten-subs |
| subscription fatigue | 1,800 | Medium | Informational | blog |
| best subscription tracker 2026 | 2,900 | Medium | Commercial | / |
| money saving apps europe | 1,100 | Medium | Commercial | / |

### Estonian (Primary — Local Audience)

| Keyword | Monthly Volume (est.) | KD | Intent | Target Page |
|---|---|---|---|---|
| tellimuste jälgimine | 320 | Low | Commercial | / |
| tellimused ära tühistada | 210 | Low | Transactional | / |
| kõik tellimused ühes kohas | 140 | Low | Informational | / |
| pangakonto tellimused | 110 | Low | Informational | / |
| PSD2 Eesti | 480 | Low | Informational | /how-it-works |
| rakendus tellimuste leidmiseks | 90 | Low | Commercial | / |
| unustatud tellimused | 170 | Low | Informational | blog/ee-tellimused |
| kuidas tühistada tellimust | 390 | Low | Informational | blog |
| säästa raha tellimused | 70 | Low | Informational | / |
| pangaühendus turvaline | 140 | Low | Informational | /security |

### Keyword Strategy Notes

- **Long-tail first.** Estonian market is small — long-tail keywords with <500 monthly volume are still worth targeting because competition is near-zero.
- **English content targets international audience** and builds domain authority. Estonian content targets local audience and captures high-intent local searches.
- **KD (Keyword Difficulty)** is estimated. Estonian keywords are uniformly low-difficulty due to limited competition.
- **Primary keyword for homepage:** "subscription tracker" (EN) and "tellimuste jälgimine" (ET).

---

## Page Structure

### `/` (Homepage)

**Target keyword:** subscription tracker / tellimuste jälgimine

**Structure:**
- H1: "Find subscriptions you forgot you had"
- H2: "How it works" (3-step process)
- H2: "Why SubSnoop?" (value props)
- H2: "Pricing" (3-tier table)
- H2: "FAQ" (5 questions — see FAQ schema below)
- H2: "What users say" (testimonials)

**Technical:**
- Title tag: `SubSnoop — Find & Cancel Forgotten Subscriptions in 30 Seconds`
- Meta description: `Connect your bank via PSD2. SubSnoop finds every recurring charge automatically. Free tier available. Used by 500+ Estonians to find €47/month in forgotten subs.`
- Canonical: `https://subsnoop.ee/`
- Hreflang: `en`, `et`

---

### `/pricing`

**Target keyword:** subscription tracker pricing / tellimuste rakenduse hind

**Structure:**
- H1: "Simple pricing. No surprises."
- Pricing table (Free / Pro €5.99 / Premium €9.99)
- Feature comparison table
- FAQ section (3 questions: Can I cancel? Refund policy? Free forever?)
- CTA: "Start free"

**Technical:**
- Title tag: `SubSnoop Pricing — Free Forever, Pro €5.99/mo`
- Meta description: `SubSnoop Free tracks up to 5 subscriptions forever. Pro at €5.99/mo unlocks unlimited tracking, 12-month history, and spending analytics. Cancel anytime.`
- Canonical: `https://subsnoop.ee/pricing`

---

### `/how-it-works`

**Target keyword:** how to find all my subscriptions / kuidas leida kõik tellimused

**Structure:**
- H1: "How SubSnoop works"
- Step 1: Connect bank (with PSD2 explanation)
- Step 2: We scan transactions
- Step 3: You see all subscriptions
- Step 4: Cancel what you don't need
- Embedded video/GIF showing the flow (30 seconds)
- Trust section: "Is it safe?" (PSD2 explanation, link to /security)

**Technical:**
- Title tag: `How SubSnoop Works — Find Subscriptions in 30 Seconds`
- Meta description: `SubSnoop connects to your bank via PSD2, scans 12 months of transactions, and finds every recurring charge. See how it works in 4 simple steps.`
- Canonical: `https://subsnoop.ee/how-it-works`

---

### `/security`

**Target keyword:** is subscription tracker safe / pangaühendus turvaline / PSD2 security

**Structure:**
- H1: "Your security is non-negotiable"
- Section: How PSD2 protects you
- Section: What data we access (and what we don't)
- Section: Encryption and storage
- Section: GDPR compliance
- Section: How to revoke access
- Section: Bug bounty / security contact
- FAQ (5 questions)

**Technical:**
- Title tag: `Is SubSnoop Safe? PSD2 Security & Privacy Explained`
- Meta description: `SubSnoop uses PSD2 Open Banking — read-only access, bank-grade encryption, EU-only data storage. Learn exactly how we protect your financial data.`
- Canonical: `https://subsnoop.ee/security`

---

### `/blog` (Index)

**Structure:**
- H1: "The SubSnoop Blog"
- Category filters: All, Product, Personal Finance, Security, Estonia
- Article cards with title, excerpt, date, reading time

**Technical:**
- Title tag: `SubSnoop Blog — Subscription Management, PSD2 & Personal Finance`
- Meta description: `Tips on managing subscriptions, understanding Open Banking, and saving money. New articles twice a week.`
- Canonical: `https://subsnoop.ee/blog`

---

### Blog Posts (Individual)

Each post targets 1–2 long-tail keywords. Structure:

- H1: Article title
- Table of contents (jump links)
- H2 sections every 300 words
- Internal links to other posts and core pages
- CTA at bottom: "Try SubSnoop free →"
- Author bio
- Published date + modified date (for freshness signal)

---

## Schema Markup Plan

### 1. FAQ Schema (on homepage and /security)

Applied to the FAQ sections. Google often surfaces these as rich results.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is SubSnoop safe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. SubSnoop uses PSD2 Open Banking APIs..."
      }
    }
  ]
}
```

**Pages with FAQ schema:** `/`, `/security`, `/pricing`

### 2. Product Schema (on homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "SubSnoop",
  "description": "Subscription tracker that finds forgotten recurring charges via PSD2 bank connection.",
  "brand": { "@type": "Brand", "name": "SubSnoop" },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "0",
    "highPrice": "9.99",
    "priceCurrency": "EUR"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}
```

### 3. Article Schema (on blog posts)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "author": { "@type": "Person", "name": "..." },
  "datePublished": "2026-06-28",
  "dateModified": "2026-06-28",
  "publisher": {
    "@type": "Organization",
    "name": "SubSnoop",
    "logo": { "@type": "ImageObject", "url": "https://subsnoop.ee/logo.png" }
  }
}
```

### 4. BreadcrumbList Schema (all pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://subsnoop.ee/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://subsnoop.ee/blog" }
  ]
}
```

### 5. Organization Schema (all pages, in footer)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SubSnoop",
  "url": "https://subsnoop.ee",
  "logo": "https://subsnoop.ee/logo.png",
  "sameAs": [
    "https://twitter.com/subsnoop",
    "https://github.com/stennu718/subsnoop"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@subsnoop.ee",
    "contactType": "customer support"
  }
}
```

---

## Blog Cadence

**Frequency:** 2 posts per week (Tuesday + Thursday)

### Content Pillars

| Pillar | % of content | Purpose | Example topics |
|---|---|---|---|
| **Subscription management** | 40% | Core topical authority | "How to audit your subscriptions," "Annual vs monthly: which saves more?" |
| **PSD2 / Open Banking** | 20% | Differentiation + trust | "How PSD2 works," "Is Open Banking safe?" |
| **Personal finance** | 25% | Broad traffic | "€150/month on subscriptions," "Budgeting with recurring costs" |
| **Product / Company** | 15% | Brand + engagement | "How we built SubSnoop," "What we learned from 500 users" |

### 6-Month Content Calendar (First Month)

| Week | Tuesday | Thursday |
|---|---|---|
| 1 (Launch) | "You're spending €150/month on subscriptions you forgot about" | "How PSD2 lets you see all your subscriptions (safely)" |
| 2 | "Eestlased kulutavad tellimustele rohkem kui arvavad" (ET) | "5 subscriptions you probably forgot you have" |
| 3 | "Annual vs monthly subscriptions: the math" | "Is Open Banking safe? A technical deep-dive" |
| 4 | "How to cancel any subscription (even the tricky ones)" | "SubSnoop launch retrospective: what we learned" |

### Content Production Workflow

1. **Keyword research** (Monday): Pick target keyword(s) for the week's posts. Check volume and difficulty.
2. **Outline** (Monday): 500-word outline with H2s, target keyword placement, internal links.
3. **Draft** (Tuesday AM / Wednesday AM): Full draft. Data-backed where possible.
4. **Review** (Tuesday PM / Wednesday PM): Fact-check, SEO review (keyword density, meta tags, schema).
5. **Publish** (Tuesday 10:00 EEST / Thursday 10:00 EEST): Schedule for morning publish.
6. **Promote** (Publish day): Share on Twitter, LinkedIn, Reddit, relevant communities.
7. **Update** (30 days later): Refresh with new data, update "modified" date, re-promote.

---

## Technical SEO Checklist

- [ ] XML sitemap at `/sitemap.xml` (auto-generated, includes all pages + blog posts)
- [ ] Robots.txt at `/robots.txt` (allows all, references sitemap)
- [ ] Hreflang tags on all pages (`en` and `et` variants)
- [ ] Canonical URLs on all pages
- [ ] Open Graph tags on all pages (title, description, image, type)
- [ ] Twitter Card tags on all pages
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Mobile-first responsive design
- [ ] HTTPS everywhere (HSTS enabled)
- [ ] Structured data validated via Google Rich Results Test
- [ ] 301 redirects for any legacy URLs
- [ ] 404 page with search + navigation
- [ ] Internal linking: every blog post links to at least 2 other pages/posts
- [ ] Image alt text on all images
- [ ] Lazy loading for below-fold images

---

## Link Building Strategy

| Tactic | Effort | Expected Impact | Timeline |
|---|---|---|---|
| Guest posts on fintech blogs | Medium | High | Month 2+ |
| HARO / journalist requests | Low | High | Ongoing |
| Product Hunt launch backlink | Low | Medium | Launch day |
| Estonian tech media outreach | Medium | High (local) | Month 1 |
| GitHub repo (open-source components) | Low | Low-Medium | Ongoing |
| Partner with Estonian fintech influencers | Medium | Medium | Month 2+ |
| Write for Estonian personal finance sites | Medium | High (local) | Month 1+ |
| Create shareable data studies ("€47/month" stat) | High | High | Month 1 |

---

## Measurement

| Tool | What it tracks |
|---|---|
| Google Search Console | Impressions, clicks, average position, CTR |
| Plausible / GA4 | Traffic, conversions, bounce rate |
| Ahrefs / Semrush (free tier) | Keyword rankings, backlinks |
| Google Rich Results Test | Schema validation |

### KPIs (6-month targets)

| Metric | Month 1 | Month 3 | Month 6 |
|---|---|---|---|
| Organic monthly visitors | 500 | 2,000 | 5,000 |
| Keywords in top 10 | 5 | 25 | 60 |
| Blog posts published | 8 | 24 | 48 |
| Domain rating (Ahrefs) | 5 | 12 | 20 |
| Backlinks | 10 | 50 | 150 |
