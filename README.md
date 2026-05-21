# The Tiebreaker

AI-powered clarity for your toughest decisions.

The Tiebreaker helps you work through hard choices by running your decision through one of three structured AI analyses — Pros & Cons, a side-by-side Comparison Table, or a full SWOT Analysis. You can switch between analysis types for the same question without re-entering anything.

Built with Next.js, the Vercel AI SDK, and a Clay-inspired design system.

---

## Features

- **Three analysis modes** — Pros & Cons, Comparison Table, SWOT Analysis
- **Switch analysis types mid-session** — run the same decision through multiple frameworks without starting over
- **Bring your own API key** — supports Anthropic (Claude), OpenAI (GPT-4o), and Google (Gemini). Keys are saved in your browser only; nothing is stored server-side
- **Streaming results** — answers appear progressively as the model generates them

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

### 3. Add your API key

The app requires an API key from one of the supported providers. Click **AI Provider** at the top of the page, choose your provider, paste your key, and click **Save Key**. The key is stored in your browser's `localStorage` and sent only to the local Next.js server to make the AI call.

| Provider | Where to get a key |
|---|---|
| Anthropic (Claude) | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| OpenAI (GPT-4o) | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google (Gemini) | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |

---

## How to Use

1. **Set your API key** — expand the AI Provider panel and save a key for your chosen provider.
2. **Describe your decision** — type the choice you're wrestling with in as much detail as you like.
3. **Pick an analysis type** — choose Pros & Cons, Comparison Table, or SWOT Analysis.
4. **Click Analyze Decision** — results stream in progressively.
5. **Switch analysis types** — click a different tab at the top of the results to re-run the same decision under a different framework.
6. **Start fresh** — click the reset icon to analyze a new decision.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| AI | [Vercel AI SDK](https://sdk.vercel.ai) — `streamObject` with structured output |
| Providers | `@ai-sdk/anthropic`, `@ai-sdk/openai`, `@ai-sdk/google` |
| UI | [shadcn/ui](https://ui.shadcn.com), [Tailwind CSS v4](https://tailwindcss.com) |
| Validation | [Zod](https://zod.dev) |
| Language | TypeScript |

---

## Project Structure

```
tiebreaker/
├── app/
│   ├── api/analyze/route.ts   # AI streaming endpoint
│   ├── layout.tsx
│   └── page.tsx               # Main UI
├── components/
│   ├── api-key-settings.tsx   # Provider + key management
│   ├── pros-cons-result.tsx
│   ├── comparison-result.tsx
│   └── swot-result.tsx
└── lib/
    └── types.ts
```

---

## Environment Variables

No environment variables are required — users supply their own API keys through the UI. If you want to pre-configure a server-side fallback key, add it to a `.env.local` file (not committed):

```
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GOOGLE_GENERATIVE_AI_API_KEY=AIza...
```
