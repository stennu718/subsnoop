# Privacy Policy

**SubSnoop OÜ**

*Last updated: 28 June 2026*

**Version:** 1.0

---

## 1. Data Controller

In accordance with Article 13 and Article 14 of the General Data Protection Regulation (EU) 2016/679 ("GDPR"), the data controller is:

> **SubSnoop OÜ**
> Registry code: [to be entered]
> Registered address: Estonia, European Union
> Email: privacy@subsnoop.com
> ("SubSnoop", "we", "us", "our")

Our supervisory authority is **Eesti Andmekaitse Infoamet** (Estonian Data Protection Inspectorate):
https://www.aki.ee | info@aki.ee

---

## 2. Data Protection Officer

We have appointed a Data Protection Officer ("DPO") in accordance with Article 37 GDPR:

> **Email:** privacy@subsnoop.com
> **Postal address:** SubSnoop OÜ, Attn: DPO, Estonia

All data subject requests and privacy enquiries should be directed to our DPO.

---

## 3. Categories of Personal Data Collected

We collect and process the following categories of personal data:

### 3.1 Account Data
- Email address
- Account identifier (UUID)
- Account creation date and activity timestamps
- Subscription plan tier (Free / Pro / Premium)
- Encrypted authentication tokens

### 3.2 Subscription Data
- Detected subscription service names
- Subscription amounts, currencies, and billing cycles
- Subscription status (active / cancelled / detected)
- User-categorised subscription records

### 3.3 Bank Transaction Data *(Temporary)*
- Transaction amounts, dates, and counterparty identifiers
- Bank account identifiers (masked / pseudonymised)
- Transaction descriptions
- **Purpose:** Used solely for the detection of recurring payment patterns
- **Retention:** Maximum 90 days (see Section 6)

### 3.4 Technical Data
- IP addresses (anonymised where possible)
- Browser user-agent strings
- Session identifiers
- Cookie consent preferences

---

## 4. Purposes and Legal Bases for Processing

In accordance with Article 6(1) GDPR, we process personal data under the following legal bases:

| Purpose | Legal Basis | GDPR Article |
|---|---|---|
| Account creation and management | Performance of a contract | Art. 6(1)(b) |
| Subscription detection and display | Performance of a contract | Art. 6(1)(b) |
| Bank transaction retrieval (via Nordigen/GoCardless) | Consent | Art. 6(1)(a) |
| Payment processing (via Stripe) | Performance of a contract | Art. 6(1)(b) |
| Service improvement analytics (opt-in) | Consent | Art. 6(1)(a) |
| Legal obligation compliance (tax, accounting) | Legal obligation | Art. 6(1)(c) |
| Fraud prevention and security | Legitimate interests | Art. 6(1)(f) |

### 4.1 Consent
Where we rely on consent (Art. 6(1)(a)), you have the right to withdraw consent at any time without affecting the lawfulness of processing based on consent before its withdrawal. You may withdraw consent via your account settings or by contacting privacy@subsnoop.com.

### 4.2 Contractual Necessity
Where we rely on contractual necessity (Art. 6(1)(b)), the relevant processing is necessary for the performance of our contract with you (Terms of Service). Failure to provide such data will prevent us from delivering the service.

---

## 5. Data Sources

We collect personal data from the following sources:

1. **Directly from you** — when you create an account, link a bank account, or interact with the service.
2. **Nordigen / GoCardless** — via PSD2-compliant Open Banking APIs, when you explicitly authorise a bank connection.
3. **Stripe** — when you subscribe to a paid plan and make a payment.
4. **Automatically** — technical data collected through cookies and similar technologies (see Cookie Policy).

---

## 6. Data Retention

| Data Category | Retention Period | Justification |
|---|---|---|
| Account data (active) | Duration of account existence + 30 days after deletion | Contractual necessity, legal obligations |
| Bank transaction data | **90 days** from retrieval | Limited to detection purpose; purged automatically |
| Deleted account data | **30 days** from deletion request | Recovery window, then hard-deleted |
| Payment records (Stripe) | 7 years | Estonian accounting law (§ 37 Accounting Act) |
| Cookie consent records | Duration of account + 1 year | Demonstrating compliance with ePrivacy Directive |
| Analytics data (opt-in) | 13 months | Aggregated, anonymised after 13 months |

### 6.1 Automated Transaction Purge
Bank transaction data is automatically and irreversibly purged 90 days after retrieval. This process runs daily via an automated scheduled job. No manual intervention is required.

### 6.2 Account Deletion
Upon account deletion request:
1. Account is immediately deactivated and data is soft-deleted.
2. A 30-day recovery window is provided.
3. After 30 days, all personal data is permanently and irreversibly deleted from our systems, except where retention is required by law (e.g., accounting records).

---

## 7. Sub-Processors

We engage the following sub-processors in accordance with Article 28 GDPR. All sub-processors are bound by data processing agreements that meet the requirements of Article 28(3) GDPR.

| Sub-Processor | Purpose | Location | DPA Reference |
|---|---|---|---|
| **Stripe Inc.** (via Stripe Payments Europe, Ltd) | Payment processing | EU (Ireland) | [Stripe DPA](https://www.stripe.com/dpa) |
| **GoCardless Ltd** (formerly Nordigen) | PSD2 bank data aggregation | EU (UK/EU) | [GoCardless DPA](https://gocardless.com/legal/dpa/) |
| **Vercel Inc.** (via EU data centres) | Application hosting and CDN | EU (Frankfurt) | [Vercel DPA](https://vercel.com/legal/dpa) |
| **PostHog Inc.** (via EU Cloud) | Product analytics (opt-in only) | EU | [PostHog DPA](https://posthog.com/dpa) |

### 7.1 Due Diligence
We conduct due diligence on all sub-processors prior to engagement and periodically thereafter, in accordance with Article 28(1) GDPR. Sub-processors are required to:
- Process personal data only on our documented instructions.
- Implement appropriate technical and organisational measures.
- Assist us in fulfilling data subject rights requests.
- Delete or return personal data upon termination of services.
- Make available all information necessary for audits.

---

## 8. International Data Transfers

**All data processing occurs within the European Union / European Economic Area (EU/EEA).**

We do not transfer personal data to countries outside the EU/EEA. Our sub-processors operate exclusively within EU/EEA data centres. In the event that a sub-processor processes data outside the EU/EEA, we ensure appropriate safeguards are in place in accordance with Chapter V GDPR (Standard Contractual Clauses, adequacy decisions, or equivalent mechanisms).

---

## 9. Your Rights Under GDPR

In accordance with Articles 15–22 GDPR, you have the following rights:

### 9.1 Right of Access (Art. 15)
You have the right to obtain confirmation as to whether we process your personal data and, if so, to access that data along with supplementary information about the processing.

### 9.2 Right to Rectification (Art. 16)
You have the right to obtain the rectification of inaccurate personal data and to have incomplete data completed.

### 9.3 Right to Erasure ("Right to Be Forgotten") (Art. 17)
You have the right to obtain the erasure of your personal data where:
- The data is no longer necessary for the purpose it was collected;
- You withdraw consent and there is no other legal basis;
- You object to processing and there are no overriding legitimate grounds;
- The data has been unlawfully processed.

### 9.4 Right to Restriction of Processing (Art. 18)
You have the right to obtain restriction of processing where:
- You contest the accuracy of the data (restriction lasts for the verification period);
- The processing is unlawful and you oppose erasure;
- We no longer need the data but you require it for legal claims;
- You have objected to processing pending verification of legitimate grounds.

### 9.5 Right to Data Portability (Art. 20)
You have the right to receive your personal data in a structured, commonly used, and machine-readable format (e.g., JSON, CSV) and to transmit it to another controller without hindrance, where the processing is based on consent or contract and is carried out by automated means.

### 9.6 Right to Object (Art. 21)
You have the right to object to processing based on legitimate interests (Art. 6(1)(f)), including profiling. We shall cease processing unless we demonstrate compelling legitimate grounds that override your interests, rights, and freedoms, or the processing is necessary for the establishment, exercise, or defence of legal claims.

### 9.7 Right Not to Be Subject to Automated Decision-Making (Art. 22)
You have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects or similarly significantly affects you. Our subscription detection algorithm does not produce legally binding decisions; it provides informational recommendations that you may review and modify.

### 9.8 Right to Lodge a Complaint
You have the right to lodge a complaint with a supervisory authority, in particular in the EU Member State of your habitual residence, place of work, or place of the alleged infringement:

> **Eesti Andmekaitse Infoamet**
> Tatari 39, 10134 Tallinn, Estonia
> https://www.aki.ee | info@aki.ee

### 9.9 How to Exercise Your Rights
Submit requests to: **privacy@subsnoop.com**
We will respond within **30 days** in accordance with Article 12(3) GDPR. We may request identity verification before processing your request.

---

## 10. Security Measures

We implement appropriate technical and organisational measures in accordance with Article 32 GDPR, including but not limited to:

- **Encryption at rest:** AES-256 encryption for all stored personal data.
- **Encryption in transit:** TLS 1.3 for all data transmissions.
- **Access control:** Role-based access control (RBAC) with principle of least privilege.
- **Pseudonymisation:** Bank transaction data is pseudonymised after detection processing.
- **Audit logging:** All access to personal data is logged and monitored.
- **Incident response:** Documented breach notification procedures (72-hour notification to supervisory authority per Art. 33 GDPR).
- **Penetration testing:** Annual third-party security assessments.

---

## 11. Data Breach Notification

In the event of a personal data breach, we will:
1. Notify the competent supervisory authority (Eesti Andmekaitse Infoamet) within **72 hours** of becoming aware of the breach, in accordance with Article 33 GDPR.
2. Notify affected data subjects without undue delay where the breach is likely to result in a **high risk** to their rights and freedoms, in accordance with Article 34 GDPR.
3. Document the breach, its effects, and the remedial actions taken.

---

## 12. Children's Privacy

Our service is not directed at individuals under the age of 16. We do not knowingly collect personal data from children. If we become aware that we have collected personal data from a child without parental consent, we will take steps to delete such data promptly.

---

## 13. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. Where changes are material, we will provide at least **30 days' notice** via email and/or in-app notification before the changes take effect. Continued use of the service after the effective date constitutes acceptance of the revised policy.

---

## 14. Contact Information

For all privacy-related enquiries, data subject requests, or complaints:

> **SubSnoop OÜ**
> **Email:** privacy@subsnoop.com
> **DPO:** privacy@subsnoop.com
> **Supervisory Authority:** Eesti Andmekaitse Infoamet (https://www.aki.ee)

---

*This Privacy Policy is compliant with Regulation (EU) 2016/679 (GDPR), the Estonian Personal Data Protection Act (Isikuandmete kaitse seadus), and Directive 2002/58/EC (ePrivacy Directive).*
