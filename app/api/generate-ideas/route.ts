import { streamObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { projectIdeasSchema } from "@/lib/idea-schema";

const systemPrompt = `You are an expert content strategist for a fractional data analyst who creates YouTube videos to attract business clients.

Generate exactly 4 detailed, buildable project ideas. Each project:
- Solves a specific, realistic business problem a client would actually pay to fix
- Uses a named, publicly accessible dataset (Kaggle, data.gov, Google Trends, etc.) or provides clear instructions for generating realistic synthetic data
- Produces a tangible, demonstrable deliverable (a dashboard, a trained model, a cleaned pipeline, an automated report, etc.)
- Can be realistically built and filmed in a 2–4 hour session
- Demonstrates professional-grade skill that potential clients will recognize

Field guidance:
- title: Punchy and specific. Good: "I Automated My Client's Weekly Excel Report in Python — Saved 8 Hours a Week". Bad: "Python Data Analysis Tutorial".
- businessScenario: 2–3 sentences — the exact client situation, industry, problem, and stakes.
- datasetName: The specific dataset name.
- datasetSource: Where to find it — a URL, Kaggle search term, or platform + instructions.
- datasetNotes: Prep steps, size, caveats, or how to generate synthetic data if no public dataset fits.
- deliverable: The concrete output — be specific about format and what it shows/does.
- steps: 4–6 ordered steps. Each step is actionable and specific enough to actually execute.
- tools: 3–6 specific tools/libraries (e.g. "Python", "pandas", "Tableau Public" — not just "data tools").
- skillSignal: 1–2 sentences on what this video proves to a potential client watching it.
- videoHook: The opening 30–60 seconds — what you say and show to immediately hook the viewer.
- videoAngle: The narrative arc — how the project unfolds as a story, what the tension and payoff are.

Make the 4 ideas varied across industries, tool stacks, and deliverable types.`;

const providerNames: Record<string, string> = {
  anthropic: "Anthropic",
  openai: "OpenAI",
  google: "Google",
};

function getModel(provider: string, apiKey: string) {
  if (provider === "openai") return createOpenAI({ apiKey })("gpt-4o");
  if (provider === "google") return createGoogleGenerativeAI({ apiKey })("gemini-2.0-flash");
  return createAnthropic({ apiKey })("claude-sonnet-4-6");
}

export async function POST(req: Request) {
  const { skill, targetClient, preferredFormat, provider = "anthropic", apiKey } = await req.json();

  if (!skill?.trim()) {
    return new Response("Missing skill or knowledge area", { status: 400 });
  }

  if (!apiKey) {
    const name = providerNames[provider] ?? provider;
    return new Response(
      `No API key configured for ${name}. Please add your ${name} API key in the settings panel.`,
      { status: 400 }
    );
  }

  const contextLines = [
    `Skill or knowledge area: ${skill}`,
    targetClient?.trim() ? `Target client type: ${targetClient}` : null,
    preferredFormat && preferredFormat !== "any" ? `Preferred video format: ${preferredFormat}` : null,
  ].filter(Boolean).join("\n");

  try {
    const result = streamObject({
      model: getModel(provider, apiKey),
      schema: projectIdeasSchema,
      system: systemPrompt,
      prompt: contextLines,
      onError: (event) => {
        console.error("[generate-ideas] stream error:", event.error);
      },
    });

    return result.toTextStreamResponse();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[generate-ideas] error:", message);
    return new Response(message, { status: 500 });
  }
}
