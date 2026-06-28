# SubSnoop — Sprint Planning

> Agile sprint board for SubSnoop MVP.
> Sprint length: 2 weeks. Estimation: story points (1-2-3-5-8).

---

## Backlog (prioritized)

### Sprint 1: Foundation + Dashboard [Start → Done]

| # | Task | Points | Status |
|---|------|--------|--------|
| S1.1 | Design system → CSS variables + component classes | 3 | ✅ Done (DESIGN.md) |
| S1.2 | HTML wireframes (Dashboard Scan, Detail, Settings) | 5 | ✅ Done |
| S1.3 | Next.js project scaffold (App Router, Tailwind) | 3 | � |
| S1.4 | Dashboard page — static UI | 5 | ⬜ |
| S1.5 | Dashboard page — mock data integration | 3 | ⬜ |
| S1.6 | Scan flow page — all 3 states | 5 | ⬜ |
| S1.7 | Subscription detail page | 5 | ⬜ |
| S1.8 | Settings page | 3 | ⬜ |
| S1.9 | Mobile responsive pass | 3 | ⬜ |

### Sprint 2: Backend + Data

| # | Task | Points | Status |
|---|------|--------|--------|
| S2.1 | FastAPI project scaffold + SQLite config | 3 | ⬜ |
| S2.2 | Data models (User, Subscription, Transaction) | 3 | ⬜ |
| S2.3 | CSV parser (EE bank formats) | 5 | � |
| S2.4 | Subscription detection algorithm | 5 | ⬜ |
| S2.5 | REST API endpoints (CRUD) | 5 | � |
| S2.6 | pytest suite (unit + integration) | 5 | � |

### Sprint 3: Auth + Multi-user

| # | Task | Points | Status |
|---|------|--------|--------|
| S3.1 | JWT auth (register/login/token) | 5 | � |
| S3.2 | User-scoped data isolation | 3 | ⬜ |
| S3.3 | Frontend auth flow (login page, protected routes) | 5 | � |
| S3.4 | Session management + refresh tokens | 3 | ⬜ |

### Sprint 4: PSD2 Integration

| # | Task | Points | Status |
|---|------|--------|--------|
| S4.1 | Nordigen API client | 5 | � |
| S4.2 | OAuth flow (bank connection) | 5 | ⬜ |
| S4.3 | Transaction sync + auto-detect | 5 | ⬜ |
| S4.4 | Webhook: renewal alerts | 3 | � |

---

## Definition of Done

- [ ] Code compiles / lints clean
- [ ] Unit tests pass (`pytest` / `vitest`)
- [ ] Visual verified in browser (screenshot attached)
- [ ] Mobile responsive (640px tested)
- [ ] PR reviewed + merged to `main`
- [ ] DESIGN.md updated if visual changes made

---

## Team Roles

| Role | Person | Responsibility |
|------|--------|----------------|
| Product Owner | Sten | Prioritization, acceptance criteria |
| Design Lead | Sten + Agent | Visual spec, component architecture |
| Frontend Dev | Agent | Next.js, Tailwind, responsive |
| Backend Dev | Agent | FastAPI, detection algorithm, PSD2 |
| QA | Agent | Test coverage, E2E flows |

---

## Sprint Velocity Target

- Sprint 1: 30 points (wireframes + static UI)
- Sprint 2: 26 points (backend + data)
- Sprint 3: 16 points (auth)
- Sprint 4: 18 points (PSD2)

**Total MVP: 90 points ≈ 8 weeks (4 sprints × 2 weeks)**

---

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Frontend | Next.js 16, App Router | RSC, streaming, Vercel deploy |
| CSS | Tailwind CSS | Rapid prototyping, design tokens |
| Backend | FastAPI + Python | Async, type hints, existing code |
| Database | PostgreSQL (prod), SQLite (dev) | JSONB for metadata, migrations |
| ORM | SQLAlchemy 2.0 | Async, type-annotated |
| Auth | JWT (python-jose) | Stateless, mobile-friendly |
| PSD2 | Nordigen (GoCardless) | Free tier, EE bank coverage |
| Testing | pytest + Playwright | Unit + E2E |
| CI | GitHub Actions | Free for public repos |
| Deploy | Railway | Simple, Docker-based |

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| PSD2 API rate limits | High | Cache aggressively, manual sync option |
| Bank CSV format changes | Medium | Pluggable parser per bank |
| False positive detection | Medium | User can dismiss/mark "not subscription" |
| User adoption (cold start) | High | CSV mode works without PSD2 |
| GDPR compliance | High | Data minimization, export, delete-all |
