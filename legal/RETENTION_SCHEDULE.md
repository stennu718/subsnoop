# Data Retention Schedule

**SubSnoop OÜ**

*Last updated: 28 June 2026*

**Version:** 1.0

---

## 1. Purpose and Scope

This Retention Schedule defines the retention periods, legal bases, and deletion methods for all personal data processed by SubSnoop OÜ. It is maintained in accordance with:

- **Article 5(1)(e) GDPR** — Storage limitation principle
- **Article 30 GDPR** — Records of processing activities
- **Estonian Accounting Act (Raamatupidamise seadus)** — § 37 (7-year retention for accounting records)
- **Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)**

---

## 2. Retention Schedule by Data Category

### 2.1 Account Data

| Field | Retention Period | Legal Basis | Deletion Method |
|---|---|---|---|
| Email address | Duration of account + 30 days | Art. 6(1)(b) GDPR (contract) | Hard delete (irreversible) |
| Account UUID | Duration of account + 30 days | Art. 6(1)(b) GDPR | Hard delete |
| Account creation date | Duration of account + 30 days | Art. 6(1)(b) GDPR | Hard delete |
| Account activity timestamps | Duration of account + 30 days | Art. 6(1)(b) GDPR | Hard delete |
| Encrypted auth tokens | Duration of session / 30 days | Art. 6(1)(b) GDPR | Token revocation + deletion |

### 2.2 Subscription Data

| Field | Retention Period | Legal Basis | Deletion Method |
|---|---|---|---|
| Detected subscription records | Duration of account + 30 days | Art. 6(1)(b) GDPR | Hard delete |
| User-categorised subscriptions | Duration of account + 30 days | Art. 6(1)(b) GDPR | Hard delete |
| Subscription analytics (aggregated) | Indefinite (anonymised) | Art. 6(1)(f) GDPR (legitimate interest) | N/A — non-personal data |

### 2.3 Bank Transaction Data

| Field | Retention Period | Legal Basis | Deletion Method |
|---|---|---|---|
| Transaction amounts | **90 days** from retrieval | Art. 6(1)(a) GDPR (consent) | Automated purge (irreversible) |
| Transaction dates | **90 days** from retrieval | Art. 6(1)(a) GDPR | Automated purge |
| Counterparty identifiers | **90 days** from retrieval | Art. 6(1)(a) GDPR | Automated purge |
| Transaction descriptions | **90 days** from retrieval | Art. 6(1)(a) GDPR | Automated purge |
| Bank account identifiers (masked) | **90 days** from retrieval | Art. 6(1)(a) GDPR | Automated purge |

### 2.4 Payment Data (via Stripe)

| Field | Retention Period | Legal Basis | Deletion Method |
|---|---|---|---|
| Payment transaction records | **7 years** | Estonian Accounting Act § 37; Art. 6(1)(c) GDPR | Retained by Stripe per legal obligation |
| Payment receipts | **7 years** | Estonian Accounting Act § 37 | Retained by Stripe |
| Billing address | Duration of account + 7 years | Art. 6(1)(c) GDPR | Hard delete after legal period |
| Stripe customer ID | Duration of account + 7 years | Art. 6(1)(c) GDPR | Hard delete after legal period |

### 2.5 Technical Data

| Field | Retention Period | Legal Basis | Deletion Method |
|---|---|---|---|
| IP addresses (anonymised) | 30 days | Art. 6(1)(f) GDPR (security) | Automated deletion |
| User-agent strings | 30 days | Art. 6(1)(f) GDPR | Automated deletion |
| Session logs | 30 days | Art. 6(1)(f) GDPR | Automated deletion |
| Security audit logs | 12 months | Art. 6(1)(f) GDPR (security) | Automated deletion |

### 2.6 Cookie and Consent Data

| Field | Retention Period | Legal Basis | Deletion Method |
|---|---|---|---|
| Cookie consent preferences | Duration of account + 1 year | Art. 6(1)(a) GDPR (consent) | Hard delete |
| Analytics data (PostHog) | 13 months | Art. 6(1)(a) GDPR (consent) | Automated deletion by PostHog |

### 2.7 Communication Data

| Field | Retention Period | Legal Basis | Deletion Method |
|---|---|---|---|
| Support tickets | Duration of account + 1 year | Art. 6(1)(b) GDPR | Hard delete |
| Email correspondence | Duration of account + 1 year | Art. 6(1)(b) GDPR | Hard delete |

---

## 3. Automated 90-Day Transaction Purge Procedure

### 3.1 Overview
Bank transaction data is automatically and irreversibly purged 90 days after retrieval. This procedure is critical to compliance with the storage limitation principle (Art. 5(1)(e) GDPR) and our Privacy Policy commitments.

### 3.2 Technical Implementation

```
┌─────────────────────────────────────────────────────────┐
│                  DAILY PURGE JOB (00:00 UTC)            │
├─────────────────────────────────────────────────────────┤
│  1. Query: SELECT * FROM transactions                   │
│     WHERE retrieved_at < NOW() - INTERVAL '90 days'     │
│                                                         │
│  2. For each matching record:                           │
│     a. Overwrite sensitive fields with NULL             │
│     b. Delete the record                                │
│     c. Log the deletion (record ID, timestamp)          │
│                                                         │
│  3. Verify: SELECT COUNT(*) FROM transactions           │
│     WHERE retrieved_at < NOW() - INTERVAL '90 days'     │
│     Expected result: 0                                  │
│                                                         │
│  4. Report: Send summary to ops@subsnoop.com            │
│     - Records purged: N                                 │
│     - Errors: N                                         │
│     - Job duration: N seconds                           │
│                                                         │
│  5. Alert: If verification fails → PagerDuty alert      │
└─────────────────────────────────────────────────────────┘
```

### 3.3 Monitoring and Verification
- The purge job runs daily at 00:00 UTC.
- A verification query confirms zero records older than 90 days remain.
- Failures trigger an immediate alert to the engineering team.
- Monthly compliance reports are generated for DPO review.

### 3.4 Audit Trail
- Each purge execution is logged with: timestamp, records purged, errors, duration.
- Logs are retained for 12 months.
- The DPO may request a purge verification report at any time.

---

## 4. Account Deletion Procedure (30-Day Hard Delete)

### 4.1 Overview
Upon account deletion request, a 30-day recovery window is provided, after which all personal data is permanently and irreversibly deleted.

### 4.2 Procedure

```
┌─────────────────────────────────────────────────────────┐
│              ACCOUNT DELETION WORKFLOW                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  T+0: User requests deletion (via settings or email)    │
│    ↓                                                    │
│  T+0: Account immediately deactivated                   │
│    ↓                                                    │
│  T+0: User data soft-deleted (marked as deleted)        │
│    ↓                                                    │
│  T+0: Confirmation email sent (recovery instructions)   │
│    ↓                                                    │
│  T+0 to T+30: Recovery window                           │
│    - User may reactivate account                        │
│    - Data remains in soft-deleted state                 │
│    - No processing occurs during this period            │
│    ↓                                                    │
│  T+30: Hard delete job executes                         │
│    - All personal data permanently deleted              │
│    - Associated records cascaded (subscriptions, etc.)  │
│    - Confirmation email sent                            │
│    ↓                                                    │
│  T+31: Verification query confirms zero personal data   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 4.3 Data Exceptions
The following data is **not** deleted upon account deletion (retained per legal obligation):

| Data | Retention | Legal Basis |
|---|---|---|
| Payment records (Stripe) | 7 years | Estonian Accounting Act § 37 |
| Invoices | 7 years | Estonian Accounting Act § 37 |
| Tax records | 7 years | Estonian Taxation Act |

These records are retained by Stripe and are not linked to the deleted account's personal identifiers.

### 4.4 Verification
- After hard delete, a verification query confirms no personal data remains for the deleted user.
- The DPO may request a deletion verification report.

---

## 5. Retention Schedule Summary Table

| Data Category | Retention | Trigger | Deletion Method |
|---|---|---|---|
| Account data | Account life + 30 days | Account deletion | Hard delete |
| Bank transactions | 90 days | Data retrieval date | Automated purge |
| Subscription records | Account life + 30 days | Account deletion | Hard delete |
| Payment records | 7 years | Transaction date | Retained by Stripe |
| Technical logs | 30 days – 12 months | Log creation date | Automated deletion |
| Cookie consent | Account life + 1 year | Account deletion | Hard delete |
| Support communications | Account life + 1 year | Account deletion | Hard delete |
| Analytics (PostHog) | 13 months | Data collection date | Automated by PostHog |

---

## 6. Responsibilities

| Role | Responsibility |
|---|---|
| **Engineering** | Implement and maintain automated purge and deletion jobs. Monitor job execution. |
| **DPO** | Review retention compliance. Approve exceptions. Conduct annual retention audit. |
| **Legal** | Update retention periods as legislation changes. Advise on new data categories. |
| **Operations** | Respond to deletion requests. Manage recovery window communications. |

---

## 7. Exceptions

Any exception to this Retention Schedule must be:
1. Documented in writing.
2. Approved by the DPO.
3. Justified by a specific legal or operational requirement.
4. Logged in the retention exceptions register.

---

## 8. Review Schedule

This Retention Schedule is reviewed:
- **Annually** by the DPO.
- **Upon material change** to processing activities.
- **Upon change** in applicable legislation.
- **After any data breach** that may affect retention compliance.

---

## 9. Contact

For questions about this Retention Schedule or to exercise your data rights:

> **SubSnoop OÜ**
> **Email:** privacy@subsnoop.com
> **DPO:** privacy@subsnoop.com

---

*This Retention Schedule is compliant with Article 5(1)(e) GDPR, Article 30 GDPR, the Estonian Accounting Act, and the Estonian Personal Data Protection Act.*
