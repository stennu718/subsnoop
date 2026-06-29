# SUB LAUNCH RUNBOOK — SubSnoop on Product Hunt

_Operational guide for June 28, 2026. All times are EEST (Estonian summer time, UTC+3). PH runs on PT (UTC-7), so PH midnight = 10:01 EEST._

This is the **action-only** document. Context lives in:
- Checklist: `PH_LAUNCH_CHECKLIST.md`
- Timeline: `content/product-hunt/timeline.md`
- Social copy: `content/social-posts.md`
- Press kit: `content/press-kit.md`

---

## Pre-Flight (June 27 — day before)

Run through `PH_LAUNCH_CHECKLIST.md` T-1 items if not already complete. Specifically:

- ✅ 23:00 EEST (13:00 PT): All-hands sync confirmed — everyone knows their assignment.
- ✅ SubSnoop page in PH draft mode. Screenshot 1-5, tagline, description, thumbnail — all uploaded but **unpublished**.
- ✅ Founders first comment pre-written, saved in Notion.
- ✅ VIP DM list of 20 ready with personalised messages.
- ✅ Server load read: c≥2x, Redis warmed, Plausible tracking verified.

---

## 09:00 — Final QA Sweep

Scan the site:
- `/` loads < 2 s, non-blocking
- `/auth/register` produces no console errors
- `/auth/login` produces no console errors
- `/scan` renders
- `/legal/terms`, `/legal/privacy` both live

Sentry dashboard: clean.

---

## 10:00 — Ready to Go

Open these in separate browser tabs:

- Product Hunt creator dashboard (PH publish page)
- PLAUSIBLE dashboard (`plausible.ee/subsnoop.ee`)
- Server load monitor
- `#ph-launch` Slack channel
- Twitter compose window with pre-written launch tweet
- LinkedIn compose window with pre-written launch post

---

## 10:03 — HIT PUBLISH 🚀

1. Click "Publish" on Product Hunt.
2. Take a screenshot of the live page immediately — post it to `#ph-launch` Slack.
3. Paste the PH URL into the pre-written Twitter post. Send.
4. Paste the PH URL into the pre-written LinkedIn post. Send.

**Both posts must be live within 100 s of hitting publish.** If they aren't, post anyway — broken-clock is still worth something.

---

## 10:05 — First Comment + VIPs

1. Post the pre-written first comment (from `content/product-hunt/final-description.md`).
2. Pin it to the top of the comment section.
3. DM 20 VIP supporters (friends, family, beta users, investors). Use this template, personalise the name:

> Hey [name], we just launched SubSnoop on PH. A quick upvote would genuinely mean the world. Takes 5 s → [link]. Thanks for the beta support 🙏

4. Post on `#ph-launch` Slack: "LIVE. Tweet + LinkedIn out. First comment pinned. 20 DMs sent."

---

## 10:15 — Hour-0 Check-in #1

Report back in `#ph-launch`:

| Question | Your answer |
|---|---|
| Upvote count | ? |
| First PH comment beyond founder? | ? |
| Site up (Plausible has traffic)? | ? |
| Any bug reports? | ? |
| Route they took (PH → which page?)? | ? |

---

## 10:30 — 11:00 — Reply Window

For the next 90 minutes, **reply to every PH comment within <5 minutes**. Use your name, not the company's. Be specific — "thanks" is not enough; say what excited you about their question or feedback.

Monitor the site for:
- 404s on `/auth/*`
- Clicks on "Connect Bank" that don't round-trip
- Console errors in Sentry

---

## 11:00 — Check-in #2

Report same 5 questions. Add:
- Conversion rate (`# visitors → # /auth/register` page views) — aim for >10%.
- If <8%, revisit PH comment with a sharper hook (mention €47/mo stat).

---

## 12:00 — US East Coast Awake (Their 06:00 → Your 13:00)

1. Post Twitter #3 (the data tweet) — `content/social-posts.md` post 3.
2. Email to waitlist segment that missed the June 27 pre-launch email (use different subject line — "We're live on Product Hunt (and 300+ people are already searching their bank)").
3. Continue replying to PH comments.

---

## 14:00 — Mid-Day Social

1. Post Twitter #2 (founder story thread) — pinned timeline row.
2. Send notification to Slack: "�@channel Midday check in — tweet thread out. Current upvotes? Signups? Rank?"
3. Founder Twitter Spaces or LinkedIn Audio (optional — skip only if you're slammed).

---

## 17:00 — Check-in #4

- Final all-channel audit: any comment unanswered? Reply now.
- Any negative feedback? Don't delete. Acknowledge, be vulnerable, offer a concrete fix in the next 48 hours.
- Server load still healthy?

---

## 18:00 — Evening Burst

1. Post the English-language Reddit post (r/Estonia) — community-first AMA framing.
2. Post the Estonian-language Reddit post (r/Eesti) — local launch framing.
3. Final email to waitlist: "Last push on PH. Help us finish strong."

---

## 20:00 — Thank-you Thread

Post Twitter #4 — name 10 specific supporters. This drives retweets and closes the loop with your early community.

---

## 22:00 — Wind-Down

- Reply window: continue, but don't push new content.
- Let natural momentum carry.
- Last check-in before sleep.

---

## 23:59 — Launch Closes (06:59 PT June 29)

1. Take a screenshot of the final upvote count and ranking.
2. Post to `#ph-launch`: final numbers.
3. Update `content/social-posts.md` retrospective with real numbers (where TBD).
4. Get some real sleep — the post-mortem is morning.

---

## Emergency playbooks

### Server Down / 5xx

1. Switch to status page banner ("We're experiencing high load — we'll be right back").
2. Pin a PH comment: "We're temporarily offline due to traffic — back within 30 min, promise."
3. Founder tweet: "Traffic is wild � give us 30 min."
4. Restart/redeploy with extra instances.
5. Verify with a curl to `/healthz`.

### Negative PR / Toxic Comment on PH

**Do not delete or argue.**
Acknowledge publicly:
> "Thanks for the honest feedback, [name]. You're right that [concrete thing]. We're working on [fix]. Here's what we've already done [link to the privacy page / FAQ]."
Then DM them: "Happy to hop on a call if you want to dig deeper."

### Wrong Tagline or Screenshot on PH Listing

1. Edit the PH listing — you can change the thumbnail and tagline within the first few hours. After that, lock it.
2. Founder comment: "Quick fix, updated the tagline. Thanks for the catches."

### Bank Connection Broken (specific bank)

1. PH comment: "We're aware of an issue with [bank name]. Working on it ASAP. CSV export works in the meantime."
2. Engineering: raise P1, fix.
3. Founder tweet once fixed.

---

## Post-Launch Metrics (morning of July 29)

Capture these before the 09:00 EEST post-mortem:

| Metric | Where to find it |
|---|---|
| Final upvote count | PH listing page |
| PH rank (position of day) | PH "Top Products Today" |
| Referral sign-ups | Plausible / GA4 |
| Referral conversion rate (visitor → /auth/register) | Plausible / GA4 |
| Revenue Stripe (first 24 h) | Stripe dashboard |
| Server uptime | Uptime monitor |
| Top PH comments (good + bad) | PH comments tab |
| Top tweets by impressions | Twitter analytics |

---

_Post these in `#ph-launch` and set them as the retrospective's starting point._
