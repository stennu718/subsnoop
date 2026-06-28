# SubSnoop Design System

> Figma-equivalent design spec. All tokens, components, and layouts defined here.
> Source of truth for frontend implementation.

---

## 1. Design Tokens

### Colors

| Token | Value | Role |
|-------|-------|------|
| `--bg` | `#ffffff` | Page background |
| `--surface` | `#f4f4f4` | Card backgrounds, secondary buttons |
| `--surface-2` | `#fafafa` | Hover states, upload area bg |
| `--text-primary` | `#191c1f` | Headings, primary text |
| `--text-secondary` | `#505a63` | Body text, descriptions |
| `--text-muted` | `#8d969e` | Labels, meta text, timestamps |
| `--accent` | `#494fdf` | Primary brand, links, active states |
| `--accent-hover` | `#3d44d0` | Accent hover |
| `--success` | `#00a87e` | Active badge, health, "connected" |
| `--warning` | `#ec7e00` | Upcoming renewal, unused? |
| `--danger` | `#e23b4a` | Cancellation, cost increase |
| `--border` | `#e8e8ea` | Dividers, card borders |

### Typography

| Role | Size | Weight | Letter-spacing | Line-height |
|------|------|--------|----------------|-------------|
| Display | 136px | 500 | -2.72px | 1.00 |
| Hero | 80px | 500 | -0.8px | 1.00 |
| Section | 48px | 500 | -0.48px | 1.21 |
| Card Title | 32px | 500 | -0.32px | 1.19 |
| Heading | 24px | 400 | normal | 1.33 |
| Body | 16px | 400 | 0.24px | 1.50 |
| Body Semi | 16px | 600 | 0.16px | 1.50 |
| Small | 13px | 500 | normal | 1.50 |
| Tiny | 11px | 600 | 0.3px | 1.40 |

**Font:** Inter (Google Fonts). Fallback: system-ui, -apple-system, sans-serif.

### Spacing

Base unit: 8px.

| Token | Value | Use |
|-------|-------|-----|
| `--space-xs` | 4px | Tight inline gaps |
| `--space-sm` | 8px | Icon + text gaps |
| `--space-md` | 16px | Padding within elements |
| `--space-lg` | 24px | Card padding, section gaps |
| `--space-xl` | 32px | Page padding |
| `--space-2xl` | 48px | Section vertical spacing |
| `--space-3xl` | 64px | Hero padding |

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 8px | Bank logos, avatars, chart bars |
| `--radius-md` | 12px | Input fields, select dropdowns |
| `--radius-lg` | 20px | Cards, panels |
| `--radius-pill` | 9999px | Buttons, badges, toggles |

### Shadows

**None.** Depth is achieved through:
- Surface color alternation (`#ffffff` ↔ `#f4f4f4`)
- Border usage on cards
- Whitespace between sections

---

## 2. Components

### Button

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `btn-primary` | `#191c1f` | `#fff` | none | opacity 0.85 |
| `btn-secondary` | `#f4f4f4` | `#191c1f` | none | opacity 0.85 |
| `btn-accent` | `#494fdf` | `#fff` | none | darker bg |
| `btn-outline` | transparent | `#191c1f` | `2px solid #191c1f` | — |
| `btn-outline-danger` | transparent | `#e23b4a` | `2px solid #e23b4a` | — |
| `btn-danger` | `#e23b4a` | `#fff` | none | opacity 0.85 |
| `btn-ghost` | transparent | `#505a63` | none | color → `#191c1f` |

**All buttons:** `border-radius: 9999px` (pill), `padding: 10px 20px`, `font-weight: 500`.

**Sizes:**
- `btn-sm`: 6px 14px, 13px font
- `btn-md`: 10px 20px, 14px font (default)
- `btn-lg`: 14px 32px, 16px font

### Card

```css
.card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--bg);
  overflow: hidden;
}
```

### Toggle Switch

- Track: 48×26px, pill shape
- Off: `#e8e8ea`, On: `#494fdf`
- Circle: 20×20px white, box-shadow
- Transition: 0.2s

### Select Dropdown

- Height: 40px, border-radius: 8px
- Border: `1px solid var(--border)`
- Font: Inter 14px

### Badge

**Status badges:**
- Active (success): bg `rgba(0,168,126,0.1)`, text `#00a87e`
- Unused/Warning (soon): bg `rgba(238,126,0,0.1)`, text `#ec7e00`
- Irregular: bg `rgba(79,79,79,0.1)`, text `#8d969e`

**All:** pill, 11px, weight 600, uppercase, letter-spacing 0.3px.

### Stat Card

- Background: `#f4f4f4` (or inverted for highlight)
- Border-radius: 20px
- Padding: 24px
- Label: 13px, uppercase, `#8d969e`
- Value: 28px, weight 600, `#191c1f`
- Change: 13px, up=red / down=green

### Subscription Row

- Flex layout: icon (40×40 radius-8) + info + badge + amount
- Hover: bg `#fafafa`
- Clickable → detail view
- Divider: bottom 1px `#e8e8ea`
- Padding: 16px 24px

### Icon (Subscription Logo)

- 40×40px, border-radius 8px
- Colored initial letter fallback (when no logo image)
- Brand colors: Netflix `#E50914`, Spotify `#1DB954`, GitHub `#24292e`, etc.

---

## 3. Page Layouts

### Dashboard

```
┌────────────────────────────────────────────────────�
│ NAV: [Logo] Dashboard Scan Subs Settings  [Bank]  │
├────────────────────────────────────────────────────┤
│ HEADING: "Dashboard" + Subtitle + Action Buttons  │
├────────────────────────────────────────────────────┤
│ STATS ROW: 4 cards (highlight first)               │
├──────────────────────────────┬─────────────────────┤
│ SUBSCRIPTION LIST (flex:1)   │ SIDEBAR            │
│ - Filter bar                 │ - Health Score Ring │
│ - Row per subscription       │ - Spending Chart    │ │
│ - Click → detail view        │ - Category Breakdown│
│                              │ - Upcoming Renewals│
└──────────────────────────────┴─────────────────────┘
```

Max width: 1200px. Gap: 24px. Padding: 40px 32px.

### Scan Flow

```
┌──────────────────────────────────────────┐
│ NAV                                       │
├──────────────────────────────────────────┤
│ STEPPER: ✓ Connect → 2 Upload → 3 → 4  │
├──────────────────────────────────────────┤
│ HEADING: "Upload your bank statement"    │
│ SUBTITLE + CENTERED                      │
├──────────────────────────────────────────┤
│ BANK CARDS: 3-col grid                  │
├──────────────────────────────────────────┤
│ UPLOAD ZONE: Dashed border, drag area   │
│ + Format badges (CSV, Excel, Nordigen)   │
├──────────────────────────────────────────┤
│ SECURITY NOTE: Lock icon + text          │
├──────────────────────────────────────────┤
│ CTA: "Scan Transactions" (pill, black)  │
└──────────────────────────────────────────�
```

States: Upload → Loading (spinner + progress bar) → Results (stats + buttons).

### Subscription Detail

```
┌──────────────────────────────────────────────────┐
│ NAV                                               │
├──────────────────────────────────────────────────┤
│ ← Back to Dashboard                               │
├──────────────────────────────────────────────────┤
│ HEADER: [Icon 64px] Name + Plan    Amount + Btns│
├────────────────────────┬─────────────────────────┤
│ INFO CARD              │ COST ANALYSIS CARD     │
│ - Plan                 │ - Yearly cost          │
│ - Billing cycle        │ - Weekly equivalent   │
│ - First charged        │ - Rank by cost         │
│ - Last charged         │ - Cost trend           │
│ - Next renewal         │ - Usage confidence      │
│ - Total tracking       │ - 💡 SAVINGS TIP       │
│ - Total spent          │                        │
├────────────────────────┴─────────────────────────┤
│ BILLING TIMELINE: Vertical, 4 recent txns       │
├──────────────────────────────────────────────────┤
│ RENEWAL CALENDAR: 2 months side by │
│ Legend: green=charged, orange=upcoming          │
├──────────────────────────────────────────────────┤
│ DANGER ZONE: Remove tracking (bordered red)     │
└──────────────────────────────────────────────────┘
```

Two-column grid: 1fr / 1fr, gap 24px.

### Settings

```
┌────────────────────────────────────────�
│ NAV                                     │
├────────────────────────────────────────�
│ HEADING: "Settings" + Subtitle         │
├────────────────────────────────────────┤
│ SECTION: Connected Accounts            │
│ - Bank rows (logo + info + disconnect) │
│ - Add new bank row                     │
├────────────────────────────────────────┤
│ SECTION: Notifications                 │
│ - Toggle rows (4 settings)             │
├────────────────────────────────────────┤
│ SECTION: Detection Preferences         │
│ - Select dropdowns (3 settings)        │
├────────────────────────────────────────┤
│ SECTION: Data Management               │
│ - Export / Purge / Delete All          │
├────────────────────────────────────────┤
│ SECTION: Referral (DARK CARD)          │
│ - "Give €5, Get €5"                    │
│ - Referral link input + Copy button     │
├────────────────────────────────────────┤
│ SECTION: Current Plan                  │
│ - Free Plan badge + Upgrade button     │
└────────────────────────────────────────┘
```

Max width: 720px. Single column.

---

## 4. Interaction Rules

### Navigation
- Active page: underline on nav link (2px `#191c1f`, offset -20px from nav bottom)
- All nav links: 14px, weight 500, color `#505a63` → `#191c1f` on hover

### Button Feedback
- Active (click): `transform: scale(0.97)`
- Hover: opacity 0.85 for solid buttons
- Disabled: opacity 0.5, `cursor: not-allowed`

### Row Interactions
- Hover: background transition 0.1s
- Click: brief flash (`background: var(--surface-2)`, 200ms)

### Animations
- Chart bars: staggered height animation on load (0.4s per bar, 0.05s delay)
- Progress bar: smooth width transition (0.3s)
- All transitions: use CSS transitions, no JS animation loops
- `prefers-reduced-motion`: disable all non-essential animations

---

## 5. Responsive

| Breakpoint | Name | Changes |
|-----------|------|---------|
| < 400px | xs | Single column everything, compact nav |
| < 640px | sm | Dashboard grid → 1-col, stats → 2-col grid |
| < 720px | md | Detail grid → 1-col, smaller headings |
| < 1024px | lg | Sidebar stays but narrower |
| ≥ 1024px | xl | Full layout as spec'd |

---

## 6. Copy

### Tone
- Professional, direct, no fluff
- Estonian by default (`lang="et"`), English secondary
- Numbers: dot decimal, comma thousand separator (EU)

### Key Copy Strings

| Key | Value |
|-----|-------|
| `app.name` | SubSnoop |
| `dashboard.title` | Dashboard |
| `dashboard.subtitle` | Your subscription overview — {month} {year} |
| `stat.monthly` | Monthly Burn |
| `stat.active` | Active Subscriptions |
| `stat.yearly` | Yearly Estimate |
| `stat.savings` | Potential Savings |
| `nav.dashboard` | Dashboard |
| `nav.scan` | Scan |
| `nav.subscriptions` | Subscriptions |
| `nav.settings` | Settings |
| `cta.scan` | Scan Now |
| `cta.export` | Export CSV |
| `cta.connect` | Connect |
| `cta.disconnect` | Disconnect |
| `cta.upgrade` | Upgrade |
| `cta.cancel` | Cancel Track |
| `cta.remove` | Remove from SubSnoop |
| `empty.title` | No subscriptions found |
| `empty.subtitle` | Connect your bank or upload a CSV to get started |
