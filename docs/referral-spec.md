# SubSnoop Referral System — Specification

**Status:** Approved for development
**Version:** 1.0
**Last updated:** June 2026
**Owner:** Growth Team

---

## Overview

The referral system rewards existing users for inviting new users. Both parties receive **1 month of Pro** (valued at €5.99). The mechanism is simple: give €2 of value, get €2 of value — except we deliver it as Pro time rather than cash.

**Why Pro time instead of cash?** Lower friction (no payout threshold, no PayPal fees), natural re-engagement (Pro users churn less), and the referral "earns" by discovery — the moment they invite someone, they're actively engaged with the product.

---

## Reward Structure

| | Referrer | Referee |
|---|---|---|
| **Reward** | 1 month Pro | 1 month Pro |
| **Trigger** | Referee completes sign-up AND connects bank or uploads CSV | Account creation |
| **Value** | €5.99 | €5.99 |
| **Stacking** | Unlimited (each successful referral adds 1 month) | One-time only |
| **Expiry of reward** | Pro time starts immediately on trigger, lasts 30 calendar days from activation | Same |
| **Existing Pro user** | Reward as additional Pro month (extends current plan) | If already on Pro, converts to "banked Pro month" after current plan ends |
| **Premium user** | 1 month Pro does not downgrade — instead, reward is donated or converted to charity contribution (€2 to charity of choice) | N/A |

---

## Referral Link Format

### URL Structure

```
https://subsnoop.ee/r/{referral_code}
```

### Referral Code Rules

- Format: 8-character alphanumeric, case-insensitive, no ambiguous characters
- Character set: `[A-HJ-NP-Z2-9]` — excludes `0`, `O`, `1`, `I`, `L` to avoid transcription errors
- Example codes: `SUBS7X2K`, `N0OPFG4M` (wait — no zero — correct: `NSOPFG4M`)
- One unique code per user, generated at account creation
- Codes are **non-transferable** (tied to account)
- Codes never expire

### Custom Aliases

Pro and Premium users can claim one custom alias:

```
https://subsnoop.ee/r/sten
```

Custom alias rules:
- 3–20 characters, alphanumeric + dashes
- Must be unique across system
- Cannot impersonate brands or other users
- One alias per user, changeable once per 90 days

---

## Tracking

### Funnel Events

Each stage of the referral funnel is tracked as a distinct analytics event:

| Event | Definition | Data captured |
|---|---|---|
| `referral_link_created` | User generates/shared a link | User ID, timestamp, channel (copy/tweet/email/whatsapp) |
| `referral_click` | Someone clicks a referral link | Referral code, referrer ID, landing page, timestamp, UTM params, `ref` param |
| `referral_landing` | Visitor arrives via referral | Referral code, referrer ID, IP hash, referrer URL, browser |
| `referral_signup_started` | Visitor starts sign-up flow | Referral code, referrer ID, email (hashed later) |
| `referral_signup_completed` | Visitor completes registration | Referral code, referrer ID, new user ID, timestamp |
| `referral_conversion` | New user connects bank or uploads CSV | Referral code, referrer ID, new user ID, conversion timestamp |
| `referral_reward_issued` | Pro month is granted to both parties | Referrer ID, referee ID, reward IDs, timestamp |

### Attribution Model

- **Last-click attribution.** The last referral code visited within 30 days before sign-up gets credit.
- **30-day cookie window.** If a user clicks a referral link but doesn't sign up within 30 days, the click expires.
- **Direct referral override.** If a user manually enters a known referral code at sign-up, that takes precedence over any stored cookie.

### Database Schema (Simplified)

```sql
CREATE TABLE referral_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  code VARCHAR(8) UNIQUE NOT NULL,
  custom_alias VARCHAR(20) UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE referral_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code_id UUID NOT NULL REFERENCES referral_codes(id),
  event_type VARCHAR(30) NOT NULL, -- click, signup, conversion
  ip_hash VARCHAR(64), -- SHA-256 of IP, not raw IP
  user_agent TEXT,
  referrer_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  converted_user_id UUID REFERENCES users(id)
);

CREATE TABLE referral_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES users(id),
  referee_id UUID NOT NULL REFERENCES users(id),
  reward_type VARCHAR(20) NOT NULL, -- 'pro_month', 'charity'
  status VARCHAR(20) DEFAULT 'pending', -- pending, issued, expired, revoked
  issued_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## Abuse Prevention

### Threats and Mitigations

| Threat | Mitigation |
|---|---|
| **Self-referral (fake accounts)** | One referral reward per unique bank account. If referee's bank account hash matches referrer's, reward is blocked. Also: one reward per device fingerprint (max 2 per device per 90 days). |
| **Referral farming (bots)** | CAPTCHA on sign-up. Rate limit: max 50 clicks per referral code per hour. If exceeded, flag for review. |
| **Code brute-forcing** | Referral codes are 8 chars from a 30-char alphabet = 30^8 ≈ 6.5×10^11 combinations. No brute-force risk. |
| **Cookie stuffing** | Referral cookie is `HttpOnly`, `Secure`, `SameSite=Lax`. JavaScript cannot set it. Only server-side redirect can plant it. |
| **Link sharing on deal sites** | Allowed and encouraged. No restriction on where links are shared. |
| **Collusion rings** | Manual review if a single referrer generates >20 conversions in 7 days. Pattern detection: if all referred users share IP subnet, device class, or sign-up time clustering, flag for review. |
| **Refund gaming** | Pro month is non-refundable. If referee deletes account within 7 days, referrer's reward is revoked. |

### Fraud Detection Rules (Automated)

1. **Velocity check:** >10 sign-ups from same IP in 24h → flag
2. **Device check:** >3 sign-ups from same device fingerprint in 30 days → flag
3. **Bank account overlap:** Referrer and referee share a bank account hash → block
4. **Time-to-conversion check:** Sign-up to bank connection <5 seconds → flag (bot indicator)
5. **Geographic anomaly:** Referrer in Estonia, referee signs up from 5 different countries in 1 hour → flag

Flagged referrals enter a manual review queue. Rewards are held as `pending` until reviewed (max 48h).

---

## Referrer Dashboard

Accessible at `/dashboard/referrals`. Shows the referring user their referral performance.

### Dashboard Sections

#### 1. Summary Cards (top of page)

| Metric | Description |
|---|---|
| **Total clicks** | All-time clicks on referral link |
| **Total sign-ups** | Users who registered via the link |
| **Total conversions** | Sign-ups who connected bank/uploaded CSV |
| **Active Pro months earned** | Total Pro time banked from referrals |
| **Conversion rate** | Conversions ÷ clicks (percentage) |

#### 2. Referral Link Box

- Full referral URL with one-click copy button
- Custom alias input (Pro/Premium only)
- Share buttons: Twitter, LinkedIn, WhatsApp, Email, Telegram
- QR code for the referral link (generated client-side)

#### 3. Activity Feed (table)

| Date | Event | Status |
|---|---|---|
| Jun 28, 14:32 | sten7x2k clicked your link | Click |
| Jun 28, 14:45 | New sign-up: a************m | Sign-up |
| Jun 28, 14:52 | a************m connected bank → **+1 Pro month** | Converted ✅ |
| Jun 27, 09:11 | Friend deleted account within 7 days → reward revoked | Revoked ❌ |

#### 4. Reward History

| Date | Source | Reward | Status |
|---|---|---|---|
| Jun 28 | Referral: a************m | +1 Pro month | Active until Jul 28 |
| Jun 15 | Referral: m*************i | +1 Pro month | Active until Jul 15 |
| May 20 | Referral: k*************s | +1 Pro month | Expired Jun 19 |

#### 5. Leaderboard (optional, gamification)

Top 10 referrers this month. Displayed as anonymous ranks (e.g., "#3 this month") to the logged-in user. Not a public leaderboard — only the user's own rank is shown.

---

## Email Notifications

| Trigger | Recipient | Email |
|---|---|---|
| Someone clicks your link | Referrer | "Someone just checked out SubSnoop →" (no PII, just notification) |
| Someone signs up via your link | Referrer | "🎉 [Name] just signed up with your link" |
| Referral converts (bank connected) | Referrer | "🎁 You earned 1 month of Pro!" |
| Referral converts | Referee | "Welcome! Your first month of Pro is on us 🎉" |
| Referral reward expires in 7 days | Referrer | "Your Pro month expires in 7 days" |

All emails include unsubscribe link. Referrer emails are batched (max 1 per hour during high-activity periods).

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/referrals/stats` | Referrer dashboard data |
| `GET` | `/api/referrals/activity` | Paginated activity feed |
| `POST` | `/api/referrals/alias` | Set custom alias (Pro/Premium only) |
| `GET` | `/r/:code` | Redirect to landing page with referral cookie set |

---

## Success Metrics

| Metric | Target (Month 1) | Target (Month 6) |
|---|---|---|
| % of users who share referral link | 15% | 25% |
| Click-to-signup rate | 20% | 25% |
| Signup-to-conversion rate | 60% | 70% |
| Referral share of new sign-ups | 10% | 30% |
| Fraud rate (blocked referrals) | <2% | <1% |

---

## Open Questions

1. Should we add a "referral leaderboard" as a public page? (Decision: no for v1 — privacy-first. Revisit at 10K users.)
2. Should charity option be available to all users or only Premium? (Decision: Premium only for now.)
3. Should we offer double rewards during launch week? (Decision: yes — 2 months Pro per referral during PH launch week only.)
