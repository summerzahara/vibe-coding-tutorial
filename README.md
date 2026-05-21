# Vibe Apps

Two tools built with Next.js, Vercel AI SDK, and a Clay-inspired design system.

---

## The Tiebreaker

AI-powered clarity for your toughest decisions.

The Tiebreaker helps you work through hard choices by running your decision through one of three structured AI analyses — Pros & Cons, a side-by-side Comparison Table, or a full SWOT Analysis. You can switch between analysis types for the same question without re-entering anything.

### Features

- **Three analysis modes** — Pros & Cons, Comparison Table, SWOT Analysis
- **Switch analysis types mid-session** — run the same decision through multiple frameworks without starting over
- **Bring your own API key** — supports Anthropic (Claude), OpenAI (GPT-4o), and Google (Gemini). Keys are saved in your browser only; nothing is stored server-side
- **Streaming results** — answers appear progressively as the model generates them

---

## Sales Dashboard

An interactive data visualization dashboard for exploring sales data.

Comes preloaded with a clothing store sales dataset (116 orders, Aug–Oct 2025) so you can explore it immediately. You can also upload your own spreadsheet — CSV or Excel — and the dashboard automatically detects your columns, infers data types, and generates charts that fit your data.

### Features

- **Demo data** — preloaded clothing store sales dataset with 116 orders across 12 products
- **Upload your own spreadsheet** — supports CSV, .xlsx, and .xls files; drag-and-drop or click to upload
- **Automatic chart generation** — detects date, numeric, and category columns and generates appropriate charts (line chart for time series, bar charts for categories)
- **KPI cards** — key metrics computed from whichever dataset is active
- **Filters** — filter demo data by time period (all time, last 30 days, last 14 days) and payment method
- **Data table** — full row-level view of all data with hover highlights

### How the upload works

1. Click **Your data** tab on the dashboard page
2. Drag and drop a CSV or Excel file onto the upload zone, or click to browse
3. The app parses the file in your browser — nothing is sent to a server
4. Column types are auto-detected: dates trigger a time-series line chart, numeric columns become KPI cards, low-cardinality string columns become bar charts
5. Click **Demo data** at any time to switch back to the built-in dataset

---

## Getting Started

### 1. Install dependencies

```bash
cd tiebreaker
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Add your API key (Tiebreaker only)

The Tiebreaker requires an API key. Click **AI Provider** at the top of the page, choose your provider, paste your key, and click **Save Key**. The key is stored in your browser's `localStorage` and sent only to the local Next.js server to make the AI call.

| Provider | Where to get a key |
|---|---|
| Anthropic (Claude) | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| OpenAI (GPT-4o) | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google (Gemini) | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |

The Sales Dashboard works without any API key.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| AI | [Vercel AI SDK](https://sdk.vercel.ai) — `streamObject` with structured output |
| Providers | `@ai-sdk/anthropic`, `@ai-sdk/openai`, `@ai-sdk/google` |
| Charts | [Recharts](https://recharts.org) |
| File parsing | [PapaParse](https://www.papaparse.com) (CSV), [SheetJS / xlsx](https://sheetjs.com) (Excel) |
| UI | [shadcn/ui](https://ui.shadcn.com), [Tailwind CSS v4](https://tailwindcss.com) |
| Validation | [Zod](https://zod.dev) |
| Language | TypeScript |

---

## Project Structure

```
tiebreaker/
├── app/
│   ├── api/analyze/route.ts      # AI streaming endpoint (Tiebreaker)
│   ├── dashboard/page.tsx        # Sales Dashboard page
│   ├── layout.tsx                # Shared layout + navbar
│   └── page.tsx                  # Tiebreaker UI
├── components/
│   ├── navbar.tsx                # Shared navigation
│   ├── api-key-settings.tsx      # Provider + key management
│   ├── pros-cons-result.tsx
│   ├── comparison-result.tsx
│   ├── swot-result.tsx
│   └── dashboard/
│       ├── kpi-card.tsx
│       ├── revenue-chart.tsx
│       ├── product-chart.tsx
│       ├── payment-donut.tsx
│       ├── upload-zone.tsx       # File upload + drag-and-drop
│       └── dynamic-dashboard.tsx # Auto-generated charts for uploads
└── lib/
    ├── types.ts                  # Tiebreaker Zod schemas
    ├── sales-data.ts             # Demo dataset + filter/compute helpers
    └── parse-upload.ts           # CSV/Excel parser + column type detection
```

---

## Environment Variables

No environment variables are required — users supply their own API keys through the UI. If you want to pre-configure a server-side fallback key for the Tiebreaker, add it to a `.env.local` file (not committed):

```
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GOOGLE_GENERATIVE_AI_API_KEY=AIza...
```
