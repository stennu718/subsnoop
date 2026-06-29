# PH_LAUNCH_CHECKLIST.md — SubSnoop Launch

Pre-launch countdown, launch-day tasks, and post-launch follow-up. Every item has an owner + checkbox so nothing is missed.

Claim owners with:

```
export PH_OWNER_FOUNDER=sten
export PH_OWNER_ENG=lead-engineer
export PH_OWNER_MARKETING=marketer
```

---

## Pre-Launch: T-7 Days (June 21)

| ✅ | Task | Owner | Blocked by |
|---|---|---|---|
| � | [ ] Freeze main branch — no new features, only bugfixes | Engineering | — |
| ☐ | [ ] Open `release/ph-launch` branch, bump version to 1.0.0 | Engineering | freeze above |
| � | [ ] Run full QA pass: register → login → connect bank → scan → results → cancel link | Engineering | — |
| ☐ | [ ] Performance check: public routes render < 2 s p95 from Frankfurt | Engineering | QA pass |
| ☐ | [ ] Lighthouse audit: all public pages ≥ 90 on performance, a11y, SEO | Engineering | — |
| ☐ | [ ] Confirm DNS + SSL for subsnoop.ee (valid, not expiring) | Engineering | — |
| ☐ | [ ] Upload Sentry DSN, verify SSR + client errors land in dashboard | Engineering | — |
| ☐ | [ ] Finalise tagline (see `content/product-hunt/final-tagline.md`) | Founder | — |
| ☐ | [ ] Finalise first-comment description (`content/product-hunt/final-description.md`) | Founder | — |
| ☐ | [ ] Commission / produce 5 screenshots (see `content/product-hunt/gallery-spec.md`) | Marketing | — |
| ☐ | [ ] Produce 1 short GIF or video teaser (connect → scan → results, < 30 s) | Marketing | screenshots |
| � | [ ] Draft all social copy (`content/social-posts.md`) | Marketing | tagline |
| ☐ | [ ] Press kit ready (`content/press-kit.md`) | Marketing | screenshots + tagline |
| ☐ | [ ] Send "coming soon" teaser email to waitlist (subject: "SubSnoop launches in 7 days") | Marketing | — |
| ☐ | [ ] Order founder sweater with SubSnoop logo (optional but iconic) | Founder | — |

---

## Pre-Launch: T-3 Days (June 25)

| ✅ | Task | Owner |
|---|---|---|
| ☐ | [ ] Staging deployed, smoke-tested | Engineering |
| ☐ | [ ] All PH assets (screenshots, GIF, tagline) uploaded in **draft** mode — do not publish | Marketing |
| ☐ | [ ] Founder pre-writes first comment, saves in Notion | Founder |
| ☐ | [ ] Schedule Tweets & LinkedIn posts via Buffer (launch-day burst) | Marketing |
| � | [ ] Draft personalised DM list for first 20 VIP supporters | Founder |
| ☐ | [ ] Verify Plausible / GA4 tracking fires on /auth/register and /scan | Engineering |
| ☐ | [ ] Confirm Stripe test-mode works for €5.99 / €9.99 tiers | Engineering |
| ☐ | [ ] Run referral-commission smoke test | Engineering |

---

## Pre-Launch: T-1 Day (June 27)

Time is Pacific Time (PT).

| ✅ | Time (PT) | Task | Owner |
|---|---|---|---|
| ☐ | 18:00 | End-to-end QA on staging: register, login, bank connect, scan | Engineering |
| ☐ | 19:00 | Upload all PH assets (screenshots, GIF, tagline, description) in draft mode. **Do not publish** | Marketing |
| ☐ | 20:00 | Send pre-launch email to waitlist (subject: "We launch tomorrow. Here's what to do.") | Marketing |
| � | 21:00 | Founder posts personal Twitter / LinkedIn teaser with timer link | Founder |
| ☐ | 22:00 | Test referral links, analytics pixels, Sentry | Engineering |
| ☐ | 23:00 | All-hands 15-min sync: confirm assignments for `timeline.md` | All |

---

## Launch Day (June 28)

Every action, check-in, and emergency step is documented in:
→ [`content/product-hunt/timeline.md`](content/product-hunt/timeline.md)

On launch day, **that timeline is the single source of truth**. This checklist just markers the phases.

| ✅ | Phase |
|---|---|
| ☐ | Hour 0 — publish & first push (timeline rows 00:01 - 02:00) |
| ☐ | Morning Momentum (02:01 - 06:00) |
| � | US East Coast Morning (06:01 - 10:00) |
| � | US Midday Push (10:01 - 14:00) |
| � | US Afternoon (14:01 - 18:00) |
| ☐ | Evening Wind-Down (18:01 - 23:59) |

---

## Post-Launch: T+1 Day (June 29)

| ✅ | Time (EEST) | Task | Owner |
|---|---|---|---|
| ☐ | 09:00 | Launch post-mortem in `#ph-launch`: upvote count, rank, sign-ups, conversion %, revenue, bugs, top learnings | All |
| ☐ | 09:30 | P1: file issues for any bugs discovered on launch day (tag `ph-launch`) | Engineering |
| ☐ | 10:00 | Send "thank you" email to PH upvoters who signed up (include referral link) | Marketing |
| ☐ | 12:00 | Draft transparent blog post "We launched on Product Hunt — here's what happened" | Founder |
| ☐ | 14:00 | Send referral bonus payouts (if any) | Founder |
| � | End of day | Distribute final metrics screenshot + PH rank graphic on social | Marketing |

---

## Post-Launch: T+7 Days (July 5)

| ✅ | Task | Owner |
|---|---|---|
| ☐ | Publish blog post on subsnoop.ee/blog | Founder |
| ☐ | Send follow-up "you missed it" email to the half of the waitlist that didn't open launch emails, with + bonus referral offer | Marketing |
| ☐ | Close `release/ph-launch` branch, merge to main | Engineering |
| ☐ | Retrospective: what to do differently next launch | All |
| � | Update `PH_LAUNCH_CHECKLIST.md` with lessons learned for next time | Founder |

---

## Emergency Contacts

| Situation | Who | How |
|---|---|---|
| PH page broken (bad tagline, wrong screenshots) | Founder | Phone, `#ph-launch` Slack |
| Server down / bank connection failure | Engineering | PagerDuty → `#ph-launch` |
| Negative / sensitive comment on PH | Founder | Phone — draft reply before posting |

## Throughout: Monitor These Metrics

| Metric | Target | Tool |
|---|---|---|
| Upvotes | 300+ | Product Hunt |
| PH Rank | Top 5 of day | Product Hunt |
| Referral sign-ups | 200+ | Plausible / GA4 |
| Visitor → sign-up | ≥ 10% | GA4 |
| Server uptime | 99.9%+ | Up-time monitor |
| Comments replied to | 100% | PH dashboard |

---

_This document pairs with:_
- _Launch day timeline — [`content/product-hunt/timeline.md`](content/product-hunt/timeline.md)_
- _Operational runbook — [`LAUNCH_RUNBOOK.md`](LAUNCH_RUNBOOK.md)_
- _Social copy — [`content/social-posts.md`](content/social-posts.md)_
- _Press kit — [`content/press-kit.md`](content/press-kit.md)_
