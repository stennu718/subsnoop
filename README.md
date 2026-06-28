# SubSnoop — Subscription Intelligence Platform

> AI-powered subscription detection and expense tracking for the Baltics.
> Built with PSD2 Open Banking — no screen scraping, no manual entry.

## Problem

The average Estonian has 8-12 recurring subscriptions (Spotify, Netflix, gym, SaaS, telecom, insurance). Most people underestimate their monthly burn by 30-40%. Existing solutions (TrueLayer, Mint) are UK/US-first and don't support Estonian banks.

## Solution

**SubSnoop** connects to your bank via PSD2 Open Banking (Nordigen/GoCardless), automatically detects all recurring payments, and gives you a single dashboard to track, analyze, and optimize your subscriptions.

## Features

- **Auto-detect** — Identifies subscriptions from transaction patterns (monthly, weekly, yearly, irregular)
- **Cost analysis** — Yearly projection, spending trends, category breakdown
- **Renewal alerts** — Get notified before charges hit
- **Savings tips** — Suggests plan downgrades and annual billing
- **Multi-bank** — LHV, Swedbank, SEB, Coop, Luminor, Bigbank via PSD2
- **Privacy-first** — CSV mode processes in browser, zero-knowledge server

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS |
| Backend | FastAPI, Python 3.11 |
| Database | PostgreSQL (prod), SQLite (local) |
| PSD2 | Nordigen (GoCardless) API |
| Deployment | Docker, Railway |
| CI/CD | GitHub Actions |

## Project Structure

```
subsnoop/
├── frontend/          # Next.js app
│   ├── app/           # App router pages
│   ├── components/    # Reusable UI components
│   ├── lib/           # Utilities, hooks
│   └── styles/        # Tailwind config
├── backend/           # FastAPI server
│   ├── app/
│   │   ├── api/       # REST endpoints
│   │   ├── models/    # SQLAlchemy models
│   │   ├── services/  # Business logic
│   │   └── psd2/      # Nordigen client
│   └── tests/         # pytest suite
├── docker/            # Docker configs
└── docs/              # Architecture, API spec
```

## Wireframes

Interactive prototypes (HTML) in `/wireframe/`:

1. **Dashboard** — Overview stats, subscription list, spending trends
2. **Scan** — Upload CSV or connect bank, loading animation, results
3. **Subscription Detail** — Cost analysis, billing timeline, renewal calendar, savings tips
4. **Settings** — Connected banks, notifications, detection preferences, referral

## Quick Start

```bash
# Clone
git clone https://github.com/stennu718/subsnoop.git
cd subsnoop

# Backend
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd ../frontend
npm install
npm run dev
```

## API Keys

| Service | Key | Purpose |
|---------|-----|---------|
| Nordigen | `NORDIGEN_SECRET_ID`, `NORDIGEN_SECRET_KEY` | PSD2 bank connection |
| Telegram | `TELEGRAM_BOT_TOKEN` | Bot notifications |

## Roadmap

- [ ] PSD2 live connection (Nordigen)
- [ ] Multi-user auth (JWT)
- [ ] Mobile app (React Native)
- [ ] Subscription cancellation flow
- [ ] Annual billing optimizer
- [ ] Team/family plans

## License

MIT
