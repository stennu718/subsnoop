# How PSD2 Lets You See All Your Subscriptions (Safely)

**Published:** June 2026
**Reading time:** 5 min
**Author:** SubSnoop Team

---

When you connect your bank account to a third-party app, a reasonable question follows: **is this safe?**

It's the right question. And the answer — thanks to PSD2, the EU's Open Banking regulation — is a qualified but emphatic **yes**, as long as the service you're connecting to is properly authorised.

Here's exactly how PSD2 protects you, how SubSnoop uses it, and what to look for before trusting any financial app with your bank data.

---

## What Is PSD2?

PSD2 (Payment Services Directive 2) is an EU regulation that came into full force in 2019. Its goal: give consumers control over their own financial data and create a safer, more competitive banking ecosystem.

Before PSD2, if you wanted an app to read your bank transactions, the only options were:

1. **Enter your bank username and password into the third-party app.** The app would essentially pretend to be you. (This practice is called "screen scraping.")
2. **Manually download and upload CSV exports.** Impractical, slow, and not real-time.

Both options were bad. Screen scraping meant the third party had full access to your account — they could see everything and, if malicious, do everything. CSV uploads were so cumbersome that nobody did them.

PSD2 introduced a third option: **regulated API access.** Banks are required to provide a standardised, secure API that third-party services can use to access specific account data — with your explicit consent and under strict supervision.

---

## Two Types of PSD2 Access

PSD2 defines two relevant roles for third-party services:

### Account Information Service Provider (AISP)

An AISP can **read** your account data: balances, transactions, payees. It cannot initiate payments, transfer money, or change anything in your account.

**SubSnoop is an AISP.** We read transactions. We cannot touch your money.

### Payment Initiation Service Provider (PISP)

A PISP can initiate payments from your account — send money on your behalf, with your explicit authorisation for each payment.

SubSnoop is **not** a PISP and does not need to be. We don't want to move money; we want to analyse it.

---

## How SubSnoop Connects to Your Bank

When you click "Connect Bank" in SubSnoop, here's exactly what happens under the hood:

1. **You select your bank** from a list of supported Estonian banks (Swedbank, SEB, LHV, Luminor, Coop Pank, Inbank).

2. **Your bank's authentication page opens** — hosted by the bank, not by SubSnoop. You authenticate using whatever method your bank requires (Mobile-ID, Smart-ID, ID card, bank link).

3. **Your bank asks for your consent** to share transaction data with SubSnoop. This is a mandatory PSD2 step. The consent screen explicitly lists:
   - What data we're requesting (transaction history, typically 3–12 months)
   - How long the consent is valid (90 days by default)
   - How to revoke it (in-app or through your bank)

4. **Your bank issues a secure token** (OAuth2-based) scoped to read-only access. SubSnoop uses this token to call the bank's API and pull transaction data.

5. **SubSnoop scans for recurring patterns** and shows you your detected subscriptions.

At no point does SubSnoop ever see your bank username, password, or PIN. Authentication happens entirely between you and your bank. We receive a scoped, time-limited, read-only token.

---

## What If SubSnoop Gets Hacked?

This is the right question to ask. Here's why a breach would not compromise your bank account:

| SubSnoop holds | SubSnoop does NOT hold |
|---|---|
| Transaction history (amounts, dates, merchant names) | Your bank login credentials |
| Subscription detection results | Your password, PIN, Mobile-ID, or Smart-ID |
| Your email address and profile info | The ability to initiate payments or transfers |
| An OAuth2 token scoped to read-only access | Full account access |

Your bank login credentials are **never transmitted to us.** Authentication happens directly with your bank. Even if an attacker gained access to SubSnoop's database, they would see transaction data and email addresses — but not the keys to anyone's bank account.

Additionally, you can revoke our access at any time: through the SubSweep app settings, or by logging into your bank and revoking the API consent. Once revoked, the token is invalidated immediately and we lose all access.

---

## How to Verify a Financial App Is Legitimate

Not every financial app uses PSD2 correctly. Before connecting your bank to any service, check the following:

### 1. Is it registered with a financial regulator?

In the EU, AISPs must register with their national financial supervisory authority. SubSnoop is registered with the **Estonian Financial Supervision Authority (Finantsinspektsioon)**. You can verify any provider in the [EBA register of registered PSPs](https://www.eba.europa.eu/risk-analysis-and-data/register-of-payment-services-providers).

### 2. Does it ask for your bank credentials?

If a financial app asks for your online banking username and password directly (not through your bank's authentication page), it's using screen scraping — not PSD2. That's a red flag. A legitimate PSD2 service redirects you to your bank's own login page.

### 3. Is the consent flow explicit?

PSD2 requires that the consent page comes from your bank, not the third party. You should see your bank's branding, your bank's domain in the URL, and a clear description of what data is being shared and for how long.

### 4. Is the access read-only?

Check the consent scope. An AISP can only read account data. If the consent asks for the ability to make payments, you're dealing with a PISP — make sure you trust them and understand why they need that power.

### 5. Can you revoke consent easily?

You should be able to revoke API access in two places: within the app's settings and through your own bank's interface. Both should work instantly.

---

## GDPR and Your Data

PSD2 governs *how* you connect. GDPR governs *what happens to the data* once it's shared.

Under GDPR, you have the following rights regarding your data at SubSnoop:

- **Right to access:** Export all your data at any time (JSON or CSV)
- **Right to erasure:** Delete your account and all associated data permanently, one click
- **Right to portability:** Take your data with you
- **Right to restriction:** Limit how we process your data

SubSnoop's data processing agreement is published at [subsnoop.ee/legal/dpa](https://subsnoop.ee/legal/dpa). Data is stored exclusively on EU-based servers (Frankfurt, Germany). We never sell, share, or monetise your financial data.

Questions? Our Data Protection Officer is reachable at dpo@subsnoop.ee.

---

## The Bottom Line

PSD2 was designed so you can safely use services like SubSnoop without giving up your bank password. The regulation requires:

- Bank-grade authentication (the bank verifies it's really you)
- Scoped, limited access (we see transactions, nothing else)
- Time-limited consent (renewed every 90 days)
- Revocability (you can cut access at any time, from either side)

SubSnoop uses exactly this mechanism. Not screen scraping. Not credential storage. Regulated, audited, revocable API access.

**Connect your bank to SubSnoop safely → [subsnoop.ee](https://subsnoop.ee)**

*No credit card required. Full control of your data. Revoke access anytime.*
