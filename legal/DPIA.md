# Data Protection Impact Assessment (DPIA)

**SubSnoop OÜ — Subscription Detection Service**

*Date: 28 June 2026*

*Version: 1.0*

*Classification: Internal — Confidential*

---

## Executive Summary

This Data Protection Impact Assessment ("DPIA") has been prepared in accordance with **Article 35 of Regulation (EU) 2016/679** (GDPR) to assess the risks associated with the processing of personal data — specifically financial transaction data — for the purpose of subscription detection.

**Conclusion:** After the implementation of all identified mitigation measures, the **residual risk level is LOW**. The processing is proportionate, necessary, and adequately safeguarded.

---

## 1. Introduction

### 1.1 Legal Basis for DPIA
Article 35(1) GDPR requires a DPIA where processing is "likely to result in a high risk to the rights and freedoms of natural persons." Article 35(3)(a) specifically identifies systematic processing of special categories of data or data relating to criminal convictions as requiring a DPIA. While financial data is not a special category per se, the **systematic and large-scale processing of financial transaction data** triggers the requirement under Article 35(3)(b) (systematic monitoring) and the guidelines of the Article 29 Working Party (WP248).

### 1.2 Scope
This DPIA covers:
- The collection, processing, and storage of bank transaction data via PSD2 Open Banking APIs.
- The algorithmic analysis of transaction data to detect recurring payment patterns.
- The storage and display of detected subscription information to users.

### 1.3 Methodology
This DPIA follows the methodology outlined in:
- **Article 35 GDPR**
- **WP248 Guidelines on DPIA** (Article 29 Working Party, as endorsed by EDPB)
- **Estonian Data Protection Inspectorate guidance**

---

## 2. Systematic Description of Processing

### 2.1 Processing Activity Overview

| Element | Description |
|---|---|
| **Controller** | SubSnoop OÜ |
| **Processor(s)** | GoCardless Ltd (Nordigen), Stripe Payments Europe Ltd, Vercel Inc. |
| **Purpose** | Detection and management of recurring subscription payments |
| **Data subjects** | Registered users of the SubSnoop service (B2C) |
| **Data categories** | Email, account data, bank transaction data (amounts, dates, counterparties), subscription records |
| **Technology** | PSD2 Open Banking APIs, PostgreSQL, AES-256 encryption, TLS 1.3 |
| **Scale** | All users who opt to connect a bank account |

### 2.2 Data Flow Description

```
[User] → [SubSnoop Web App] → [GoCardless/Nordigen API] → [Bank (PSD2)]
                ↓
        [Transaction Data Retrieved]
                ↓
        [AES-256 Encrypted Storage (PostgreSQL)]
                ↓
        [Subscription Detection Algorithm]
                ↓
        [Detected Subscriptions Displayed to User]
                ↓
        [90-Day Automated Purge of Raw Transaction Data]
```

### 2.3 Detailed Processing Steps

1. **User authorisation:** User explicitly consents to bank data retrieval via GoCardless/Nordigen's OAuth2 consent flow (PSD2-compliant).
2. **Data retrieval:** Transaction data is fetched from the user's bank via the GoCardless Open Banking API.
3. **Data storage:** Transaction data is encrypted (AES-256) and stored in our PostgreSQL database hosted on EU infrastructure.
4. **Detection processing:** A pattern-matching algorithm analyses transaction data to identify recurring payments (same amount, same counterparty, regular intervals).
5. **Result presentation:** Detected subscriptions are displayed to the user in the dashboard. Users may confirm, edit, or dismiss detections.
6. **Data purging:** Raw transaction data is automatically and irreversibly deleted after 90 days.
7. **Account deletion:** Upon account deletion, all personal data is hard-deleted within 30 days.

### 2.4 Technical Architecture

- **Hosting:** Vercel (EU region — Frankfurt)
- **Database:** PostgreSQL with pgcrypto extension (AES-256 at rest)
- **Transit encryption:** TLS 1.3
- **Access control:** Role-based access control (RBAC), principle of least privilege
- **Authentication:** OAuth2 / JWT with short-lived tokens
- **Audit logging:** All data access logged with timestamps and actor identification

---

## 3. Necessity and Proportionality Assessment

### 3.1 Purpose Limitation (Art. 5(1)(b) GDPR)
The processing is limited to the specific, explicit, and legitimate purpose of **subscription detection and management**. Transaction data is not used for any other purpose (e.g., credit scoring, profiling for marketing, or sale to third parties).

### 3.2 Data Minimisation (Art. 5(1)(c) GDPR)
- We retrieve only the transaction data fields necessary for detection (amount, date, counterparty, description).
- We do not retrieve account balances, non-transaction account details, or data unrelated to subscription detection.
- Bank account identifiers are masked/pseudonymised after detection processing.

### 3.3 Storage Limitation (Art. 5(1)(e) GDPR)
- Raw transaction data is retained for a maximum of **90 days** — the minimum period necessary for detection accuracy and user review.
- After 90 days, raw transaction data is automatically purged. Only aggregated subscription records (which do not constitute personal financial data) are retained for the duration of the account.

### 3.4 Accuracy (Art. 5(1)(d) GDPR)
- Users may review, correct, and delete detected subscription records.
- Transaction data is retrieved directly from banks via PSD2 APIs, ensuring high accuracy at source.

### 3.5 Proportionality Conclusion
The processing is **proportionate** to the stated purpose. The intrusion into privacy (temporary access to financial data) is balanced by:
- Explicit user consent for bank data retrieval.
- Strict 90-day retention limit.
- No secondary use of financial data.
- User control over detected results.

---

## 4. Risk Identification

### 4.1 Risk Register

| ID | Risk | Likelihood (1-5) | Impact (1-5) | Risk Score | Affected Rights |
|---|---|---|---|---|---|
| R1 | **Unauthorised access to financial data** (breach of database) | 2 | 5 | 10 | Confidentiality, financial privacy |
| R2 | **Data leak via API vulnerability** (injection, misconfiguration) | 2 | 4 | 8 | Confidentiality, integrity |
| R3 | **Re-identification of pseudonymised data** | 1 | 4 | 4 | Privacy, anonymity |
| R4 | **Profiling beyond stated purpose** (using financial data for unintended profiling) | 1 | 3 | 3 | Autonomy, non-discrimination |
| R5 | **Sub-processor data misuse** (GoCardless, Stripe) | 1 | 5 | 5 | All GDPR rights |
| R6 | **Inadequate consent mechanism** (user does not understand what they consent to) | 2 | 3 | 6 | Autonomy, informed consent |
| R7 | **Retention beyond stated period** (failure of automated purge) | 1 | 4 | 4 | Storage limitation |
| R8 | **Cross-border data transfer** (data leaving EU/EEA) | 1 | 5 | 5 | All GDPR rights |

### 4.2 Risk Descriptions

**R1 — Unauthorised Access to Financial Data**
An attacker gains access to the database containing encrypted financial transaction data. Even with encryption, a sophisticated attack could attempt decryption.

**R2 — Data Leak via API Vulnerability**
An API vulnerability (e.g., SQL injection, broken authentication) could expose transaction data to unauthorised parties.

**R3 — Re-identification of Pseudonymised Data**
Pseudonymised transaction data could potentially be re-identified by combining with external datasets.

**R4 — Profiling Beyond Stated Purpose**
Financial data could be used to build spending profiles beyond the scope of subscription detection.

**R5 — Sub-processor Data Misuse**
A sub-processor (GoCardless, Stripe) could misuse or inadequately protect the data they process on our behalf.

**R6 — Inadequate Consent Mechanism**
Users may not fully understand the scope of data they are consenting to share.

**R7 — Retention Beyond Stated Period**
The automated purge mechanism could fail, resulting in data being retained beyond 90 days.

**R8 — Cross-border Data Transfer**
Data could inadvertently be transferred outside the EU/EEA.

---

## 5. Mitigation Measures

### 5.1 Technical Measures

| Measure | Risks Addressed | Implementation |
|---|---|---|
| **AES-256 encryption at rest** | R1, R2 | All personal data encrypted in PostgreSQL using pgcrypto. Keys managed via AWS KMS (EU region). |
| **TLS 1.3 in transit** | R1, R2 | All data transmissions encrypted with TLS 1.3. HSTS enforced. |
| **Pseudonymisation** | R1, R3 | Bank account identifiers replaced with pseudonyms after detection. Transaction data linked to internal UUIDs only. |
| **Access control (RBAC)** | R1, R2, R4 | Role-based access with principle of least privilege. Multi-factor authentication for admin access. |
| **API security** | R2 | Input validation, rate limiting, OWASP Top 10 mitigation, regular penetration testing. |
| **Automated 90-day purge** | R7 | Daily scheduled job that irreversibly deletes transaction data older than 90 days. Monitored with alerts. |
| **Audit logging** | R1, R2, R4 | All access to personal data logged with actor, timestamp, action, and data scope. Logs retained for 12 months. |
| **EU-only infrastructure** | R8 | All hosting, databases, and CDN within EU/EEA. No US-based services. |
| **Encryption key rotation** | R1 | AES keys rotated every 90 days. Previous keys securely destroyed. |

### 5.2 Organisational Measures

| Measure | Risks Addressed | Implementation |
|---|---|---|
| **Data Processing Agreements (Art. 28)** | R5 | DPAs in place with all sub-processors (Stripe, GoCardless, Vercel, PostHog). |
| **Sub-processor due diligence** | R5 | Annual review of sub-processor security practices and certifications (SOC 2, ISO 27001). |
| **Clear consent flow** | R6 | Granular consent via GoCardless OAuth2 flow. Plain-language explanation of data use. |
| **Privacy by design** | R1–R8 | DPIA conducted prior to launch. Privacy integrated into system architecture. |
| **Data Protection Officer** | R1–R8 | DPO appointed (Art. 37 GDPR). Contact: privacy@subsnoop.com. |
| **Incident response plan** | R1, R2 | Documented breach response procedure. 72-hour notification to supervisory authority (Art. 33 GDPR). |
| **Employee training** | R1, R4 | Annual GDPR and security training for all staff with data access. |
| **Data minimisation review** | R4 | Quarterly review of data collection to ensure only necessary data is processed. |

### 5.3 Residual Risk Assessment

| Risk | Pre-Mitigation Score | Post-Mitigation Likelihood | Post-Mitigation Impact | Residual Score |
|---|---|---|---|---|
| R1 | 10 | 1 | 3 | **3 (LOW)** |
| R2 | 8 | 1 | 3 | **3 (LOW)** |
| R3 | 4 | 1 | 2 | **2 (LOW)** |
| R4 | 3 | 1 | 2 | **2 (LOW)** |
| R5 | 5 | 1 | 2 | **2 (LOW)** |
| R6 | 6 | 1 | 2 | **2 (LOW)** |
| R7 | 4 | 1 | 2 | **2 (LOW)** |
| R8 | 5 | 1 | 1 | **1 (LOW)** |

**Overall Residual Risk: LOW**

---

## 6. Compliance with EU AI Act

While our subscription detection algorithm is a relatively simple pattern-matching system (not machine learning-based), we note the following for completeness:

- The system is classified as **minimal risk** under the EU AI Act (Regulation (EU) 2024/1689), as it does not involve biometric data, social scoring, or manipulative techniques.
- We maintain transparency about the algorithm's function and limitations.
- Users may review, correct, and override all automated detections.
- No solely automated decisions with legal or significant effects are made.

---

## 7. Consultation

### 7.1 Data Protection Officer
This DPIA has been reviewed by the appointed DPO.

### 7.2 Supervisory Authority Consultation
In accordance with Article 36 GDPR, prior consultation with the supervisory authority is required where a DPIA indicates that the processing would result in a **high risk** in the absence of mitigation measures. Given that our residual risk after mitigation is **LOW**, prior consultation is **not required** at this time.

However, we will consult with Eesti Andmekaitse Infoamet if:
- The scope of processing expands significantly.
- New risks are identified that cannot be adequately mitigated.
- Required by the supervisory authority.

---

## 8. DPO Review and Sign-Off

| Field | Details |
|---|---|
| **DPO Name:** | *[To be completed]* |
| **DPO Review Date:** | *[To be completed]* |
| **DPO Assessment:** | *[To be completed — e.g., "DPIA is adequate. Residual risk is LOW. Processing may proceed."]* |
| **DPO Signature:** | _________________________ |
| **Date:** | _________________________ |

---

## 9. Approval and Review Schedule

| Action | Responsible | Frequency |
|---|---|---|
| DPIA review | DPO | Annually, or upon material change to processing |
| Penetration testing | External security firm | Annually |
| Sub-processor review | DPO / Legal | Annually |
| Automated purge verification | Engineering | Monthly |
| Risk register update | DPO | Quarterly |

---

## 10. Conclusion

This DPIA demonstrates that the processing of personal data by SubSnoop OÜ for subscription detection purposes:

1. Is **necessary and proportionate** to the stated purpose.
2. Has been assessed against all identified risks.
3. Implements **comprehensive technical and organisational mitigation measures**.
4. Results in a **LOW residual risk** to data subjects' rights and freedoms.
5. Complies with **Articles 35 and 36 GDPR**, the ePrivacy Directive, PSD2, and Estonian data protection law.

**The processing is approved for MVP launch.**

---

*This DPIA is a living document and will be updated as the service evolves, new risks are identified, or regulatory requirements change.*

*Prepared by: SubSnoop Compliance Team*
*Approved by: [DPO Name] — pending sign-off*
