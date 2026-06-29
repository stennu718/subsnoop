# Data Processing Agreement — GoCardless (Nordigen)

**SubSnoop OÜ × GoCardless Ltd**

*Effective date: 28 June 2026*

*Version: 1.0*

---

## 1. Parties

| Role | Entity |
|---|---|
| **Data Controller** | SubSnoop OÜ, Estonia |
| **Data Processor** | GoCardless Ltd (formerly Nordigen Solutions), incorporated in the United Kingdom, operating within the EU/EEA |

This Data Processing Agreement ("DPA") is made pursuant to **Article 28(3) GDPR** and supplements the GoCardless Open Banking Services Agreement.

---

## 2. Scope and Purpose of Processing

GoCardless (via its Nordigen Open Banking division) processes personal data on behalf of SubSnoop for the following purposes:

- Retrieving bank transaction data from user-authorised bank accounts via PSD2 Open Banking APIs.
- Providing account aggregation services (account identification, transaction listing).
- Delivering transaction data to SubSnoop for subscription detection processing.

**GoCardless does not process payment data.** Payment processing is handled exclusively by Stripe.

---

## 3. Categories of Personal Data

GoCardless processes the following categories of personal data on behalf of SubSnoop:

| Data Category | Examples |
|---|---|
| Identity data | Name (as held by bank), account holder identifier |
| Account data | IBAN (masked), account type, currency |
| Transaction data | Amount, date, counterparty name, transaction description, transaction ID |
| Consent data | PSD2 consent records, consent timestamps, consent scope |

**Note:** GoCardless acts as a licensed Account Information Service Provider (AISP) under PSD2 (Directive (EU) 2015/2366).

---

## 4. Data Subject Categories

- SubSnoop users who explicitly authorise a bank connection via GoCardless/Nordigen.
- EU/EEA bank account holders.

---

## 5. Obligations of GoCardless (Processor)

In accordance with Article 28(3) GDPR, GoCardless shall:

1. **Process personal data only on documented instructions** from SubSnoop.
2. **Ensure confidentiality** — all personnel authorised to process personal data are bound by confidentiality obligations.
3. **Implement appropriate security measures** in accordance with Article 32 GDPR, including encryption, access controls, and regular security assessments.
4. **Not engage another processor** without prior authorisation from SubSnoop.
5. **Assist SubSnoop** in fulfilling data subject rights requests (Art. 15–22 GDPR).
6. **Assist SubSnoop** in ensuring compliance with Articles 32–36 GDPR.
7. **Delete or return personal data** upon termination of services, unless retention is required by law.
8. **Make available all information** necessary for audits and compliance demonstrations.

---

## 6. PSD2 Compliance

GoCardless holds the following regulatory authorisations:
- **AISP licence** (Account Information Service Provider) granted by the **Bank of Lithuania** (Lietuvos bankas) under PSD2.
- Operates across the EU/EEA via passporting under Article 27 of PSD2.

GoCardless shall:
- Maintain valid regulatory authorisations.
- Comply with the **RTS on SCA and CSC** (Commission Delegated Regulation (EU) 2018/389).
- Implement **Strong Customer Authentication (SCA)** as required by PSD2.
- Only access data with explicit user consent, renewed every 90 days (or as required by the relevant National Competent Authority).

---

## 7. Sub-Processors

GoCardless may engage sub-processors for infrastructure and service delivery. GoCardless shall:
- Maintain an up-to-date list of sub-processors.
- Notify SubSnoop of changes to sub-processors.
- Ensure all sub-processors are bound by equivalent data protection obligations.

---

## 8. International Data Transfers

GoCardless processes personal data within the **EU/EEA**. As GoCardless Ltd is incorporated in the UK (a third country under GDPR), the following safeguards apply:

- **UK adequacy decision** — The European Commission has adopted an adequacy decision for the UK (June 2021), allowing free flow of personal data from the EU to the UK.
- **EU Standard Contractual Clauses** — Where the adequacy decision does not apply or is revoked, GoCardless relies on SCCs (Commission Implementing Decision (EU) 2021/914).
- **Data localisation** — All transaction data is processed and stored within EU/EEA data centres.

---

## 9. Data Retention

| Data Category | Retention Period |
|---|---|
| Transaction data (in SubSnoop systems) | 90 days (managed by SubSnoop) |
| Consent records | Duration of consent + 3 years (PSD2 requirement) |
| Aggregated/anonymised data | Indefinitely (non-personal) |

GoCardless does not retain transaction data on behalf of SubSnoop beyond the delivery of data to SubSnoop's systems.

---

## 10. Security Measures

GoCardless maintains the following security measures:
- **AES-256 encryption** for data at rest.
- **TLS 1.2+** for data in transit.
- **ISO 27001** certification.
- **SOC 2 Type II** certification.
- Regular penetration testing and vulnerability assessments.
- Role-based access control and multi-factor authentication.
- Incident response plan with documented breach notification procedures.

---

## 11. Data Breach Notification

GoCardless shall notify SubSnoop without undue delay (and in any event within **48 hours**) after becoming aware of a personal data breach affecting SubSnoop data, enabling SubSnoop to meet its 72-hour notification obligation under Article 33 GDPR.

---

## 12. Audit Rights

SubSnoop may audit GoCardless's compliance with this DPA:
- Upon **30 days' written notice**.
- No more than **once per year** (unless a breach or regulatory requirement necessitates additional audits).
- GoCardless may provide SOC 2 / ISO 27001 reports in lieu of on-site audits.

---

## 13. Contact Information

| Party | Contact |
|---|---|
| **SubSnoop DPO** | privacy@subsnoop.com |
| **GoCardless DPO** | dpo@gocardless.com |
| **GoCardless Legal** | GoCardless Ltd, 6th Floor, 2 London Wall Place, London EC2Y 5AU, United Kingdom |

---

## 14. Governing Law

This DPA is governed by the laws of **England and Wales** (as the jurisdiction of GoCardless Ltd), with due regard to the GDPR as applicable EU law and the UK GDPR as applicable UK law.

---

*This DPA summary is based on the [GoCardless Data Processing Agreement](https://gocardless.com/legal/dpa/) and is provided for transparency. The full GoCardless DPA is incorporated by reference into the GoCardless Services Agreement.*
