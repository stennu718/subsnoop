# SubSnoop — Code of Ethics & Development Principles

> Version 1.0 — June 2026
> Author: Sten (Product Owner, Legal & Technical Auditor)
> License: MIT (code), CC BY-SA 4.0 (this document)

---

## 1. Preamble

SubSnoop ("the Product") is an EU-based subscription intelligence platform that processes bank transaction data to detect recurring payments. We operate under the principle that **users own their financial data at all times**. This document defines the ethical boundaries and development principles that govern all decisions — technical, business, and product.

---

## 2. Core Principles

### 2.1 Privacy by Design (Article 25 GDPR)

- **Data Minimization:** Collect only what is necessary for detection. Never: store PII (names, addresses, account numbers) beyond what is technically required.
- **Purpose Limitation:** Transaction data is used solely for subscription detection. Never: sell, share, or use for advertising or credit scoring.
- **Storage Limitation:** Cached bank data has TTL. Auto-purge after 90 days or on user request.
- **Default Privacy:** New accounts have the most restrictive settings. Opt-in, never opt-out.

### 2.2 Data Sovereignty

- **EU-only Processing:** All data is processed on servers physically located in the European Economic Area (EEA). No US data transfers.
- **Right to Export:** Users can export all their data in machine-readable formats (CSV, JSON) at any time.
- **Right to Erasure:** Full account deletion within 30 seconds. Cascade delete all associated data. No soft deletes for PII.
- **No Data Monetization:** We do not sell, lease, or share user financial data. We will never. Period.

### 2.3 AI Ethical Integrity (EU AI Act — Article 5)

SubSnoop's subscription detection algorithm qualifies as **limited-risk AI** under the EU AI Act. We commit to:

- **Transparency:** Users are informed when automated processing affects their account.
- **Human Override:** Users can dismiss, confirm, or modify any AI-detected subscription.
- **Non-discrimination:** The algorithm does not classify users by income, ethnicity, or any protected characteristic.
- **Explainability:** Every detected subscription includes confidence score and reasoning (e.g., "Detected as monthly: €59.99 charged every 30 days for 6 occurrences").
- **Audit Trail:** All model decisions are logged and auditable upon user request.
- **No Black-Box Decisions:** The detection algorithm is deterministic and explainable. No neural networks without interpretable output.

### 2.4 Fair Monetization

- **Free Tier with Real Value:** Up to 5 subscriptions, CSV import, basic detection. No bait-and-switch.
- **Transparent Pricing:** Pricing page clearly states what you get at each tier. No hidden fees.
- **No Predatory Patterns:** No artificial scarcity, dark patterns, or forced continuity.
- **No Lock-in:** Cancel anytime. Full data export on cancellation. No retention tricks.

### 2.5 Security & Trust (Zero-Trust Principle)

- **Zero-Knowledge Architecture:** CSV processing happens client-side. Encrypted data servers cannot decrypt user data without session key.
- **Authentication:** JWT tokens with 24h expiry, refresh token rotation, rate limiting on auth endpoints.
- **Encryption:** TLS 1.3 in transit. AES-256 at rest. Key rotation every 90 days.
- **Incident Response:** Breach notification within 72 hours (Article 33 GDPR). Public disclosure within 7 days.
- **Penetration Testing:** Quarterly security audits. Results published to users.
- **Least Privilege:** Developers have no direct access to production data. All access is logged and time-limited.

### 2.6 Accessibility & Inclusion

- **WCAG 2.2 AA Compliance:** All interfaces meet accessibility standards. Screen reader compatible. Keyboard navigable.
- **Language Parity:** Estonian is primary (UI, support, documentation). English secondary.
- **Financial Inclusion:** Free tier ensures low-income users have access to financial tools.
- **No Financial Advice:** The Product provides information, not financial advice. Clear disclaimers on all projections.

---

## 3. Development Principles

### 3.1 Code Quality Standards

| Principle | Implementation |
|-----------|---------------|
| **TDD** | Write failing test → implement → verify pass. Minimum 80% coverage on backend. |
| **DRY** | Extract shared logic into utilities. No copy-paste across modules. |
| **YAGNI** | Don't build features "just in case". Ship the minimum, iterate based on data. |
| **SOLID** | Single responsibility per module. Interface segregation for services. |
| **Type Safety** | Full TypeScript on frontend. Pydantic models on backend. No `any` types. |
| **Immutability** | Prefer immutable data structures. No mutation of API responses. |

### 3.2 Architecture Principles

- **Microservice-Ready:** Modular design. Detection, auth, and notification services can be deployed independently.
- **API Versioning:** All APIs versioned (`/api/v1/`). Breaking changes require new version.
- **Event-Driven:** Subscription state changes emit events. Loose coupling between modules.
- **Idempotency:** All write operations are idempotent. Safe to retry without side effects.
- **Graceful Degradation:** PSD2 API down? CSV mode still works. Auth down? Cached read-only view.

### 3.3 Testing Standards

| Layer | Tool | Coverage Target |
|-------|------|-----------------|
| Unit Tests | pytest (backend), vitest (frontend) | ≥ 85% |
| Integration | pytest + testcontainers | Critical paths |
| E2E | Playwright | 10 core flows |
| Security | OWASP ZAP, bandit | Zero high/critical |
| Accessibility | axe-core | WCAG 2.2 AA |
| Performance | Lighthouse | ≥ 90 score |

### 3.4 Git & Deployment

- **Branch Protection:** `main` requires PR review + CI pass. No direct pushes.
- **Conventional Commits:** `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `security:`
- **Semantic Versioning:** `MAJOR.MINOR.PATCH`. Breaking changes = major bump.
- **Changelog:** Every release includes CHANGELOG.md entry.
- **Rollback:** Every deployment is reversible within 5 minutes.

---

## 4. Data Processing Agreement

### 4.1 Data Categories

| Category | Examples | Retention | Legal Basis |
|----------|----------|-----------|-------------|
| Transaction data | Amount, date, merchant | 90 days cache, user-controlled | Legitimate interest (Art. 6.1.f) |
| Detected subscriptions | Merchant, frequency, amount | Until user deletes | Performance of service (Art. 6.1.b) |
| User profile | Email, hashed password | Until account deletion | Contract (Art. 6.1.b) |
| Usage analytics | Page views, feature usage | 12 months, anonymized | Legitimate interest (Art. 6.1.f) |

### 4.2 Third-Party Processors

| Processor | Purpose | DPA | Location |
|-----------|---------|-----|----------|
| Nordigen (GoCardless) | PSD2 bank connection | Yes | EU (Lithuania) |
| Railway | Hosting | Yes | EU (Estonia) |
| Resend | Transactional email | Yes | EU (Ireland) |
| PostHog | Analytics (self-hosted) | N/A | EU (own infra) |

**No US-based processors. No sub-processors without explicit DPA.**

### 4.3 User Rights (GDPR Chapter III)

| Right | How to Exercise | Response Time |
|-------|-----------------|---------------|
| Access (Art. 15) | Settings → Export Data | Immediate |
| Rectification (Art. 16) | Edit in UI | Immediate |
| Erasure (Art. 17) | Settings → Delete Account | ≤ 30 seconds |
| Portability (Art. 20) | Settings → Export CSV | Immediate |
| Restriction (Art. 18) | Contact support | ≤ 72 hours |
| Objection (Art. 21) | Opt-out in Settings | Immediate |

---

## 5. AI/ML Ethics Specific to SubSnoop

### 5.1 Algorithm Transparency

The subscription detection algorithm uses **rule-based heuristics** (not black-box ML):

```
Detection Logic:
1. Group transactions by normalized merchant name
2. Calculate inter-transaction gaps (days)
3. Classify frequency: weekly (5-9d), monthly (25-35d), yearly (350-380d)
4. Calculate confidence score (0-1) based on:
   - Occurrence count (more = higher confidence)
   - Amount consistency (low variance = higher)
   - Timing consistency (low gap variance = higher)
   - Known subscription keyword match (boost)
5. Flag as subscription if confidence ≥ 0.5
```

### 5.2 Bias Mitigation

- **No demographic data:** The algorithm does not know user age, gender, location, or income.
- **No price sensitivity scoring:** We do not classify users by spending power.
- **Equal treatment:** Same detection thresholds for all users regardless of total spend.
- **Audit:** Quarterly review of false positive/negative rates across user segments.

### 5.3 Human-in-the-Loop

- Users can **confirm** detected subscriptions (improves model for them)
- Users can **dismiss** false positives (prevents re-detection)
- Users can **manually add** subscriptions the algorithm missed
- All feedback is used to improve detection accuracy

---

## 6. Business Ethics

### 6.1 Honest Marketing

- No fake urgency ("Only 2 left!")
- No fake social proof ("Join 10,000 users!" without data)
- No hidden costs in pricing
- Clear distinction between "detected" and "confirmed" subscriptions
- No selling of "anonymized insights" to third parties

### 6.2 Investor Transparency

- Monthly burn rate and runway reported to investors
- User metrics (MAU, churn, NPS) reported honestly
- AI algorithm limitations disclosed
- Security incidents disclosed within 7 days

### 6.3 Employee & Contractor Ethics

- No crunch culture. Sustainable pace.
- Open-source contributions encouraged.
- Psychological safety: no blame culture for reporting bugs.
- Diversity in hiring. No discrimination.

---

## 7. Compliance Checklist

### Pre-Launch (MVP)

- [ ] GDPR privacy policy published (Estonian + English)
- [ ] Terms of Service published
- [ ] Cookie consent banner (if applicable)
- [ ] Data Processing Agreements signed with all processors
- [ ] Security audit completed
- [ ] Accessibility audit (WCAG 2.2 AA)
- [ ] AI algorithm documentation published
- [ ] Incident response plan documented
- [ ] User rights exercise flow tested

### Ongoing

- [ ] Quarterly security audits
- [ ] Annual GDPR compliance review
- [ ] Algorithm bias audit (quarterly)
- [ ] Dependency vulnerability scan (weekly, automated)
- [ ] User feedback analysis (monthly)

---

## 8. Enforcement

Violations of this Code of Ethics are treated as **critical bugs** — they take priority over features. Any team member can flag an ethics concern without fear of retaliation.

**Reporting:** ethics@subsnoop.app (monitored by Product Owner)

**Review Cycle:** This document is reviewed quarterly and updated as the product evolves.

---

## 9. References

| Framework | Relevance |
|-----------|-----------|
| GDPR (EU 2016/679) | Data protection law |
| EU AI Act (2024/1689) | AI regulation |
| WCAG 2.2 | Accessibility |
| OWASP Top 10 | Security |
| ISO 27001 | Information security |
| Estonian Personal Data Protection Act | Local implementation |
| Äriseadustik (Commercial Code) | Business registration |

---

*This is a living document. Last updated: 2026-06-28.*
