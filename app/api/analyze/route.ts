import { streamObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

const prosCons = z.object({
  type: z.literal("pros_cons"),
  decision: z.string(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  recommendation: z.string(),
});

const comparison = z.object({
  type: z.literal("comparison"),
  decision: z.string(),
  options: z.array(z.string()),
  criteria: z.array(
    z.object({
      name: z.string(),
      values: z.record(z.string(), z.string()),
      winner: z.string().optional(),
    })
  ),
  recommendation: z.string(),
});

const swot = z.object({
  type: z.literal("swot"),
  decision: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  opportunities: z.array(z.string()),
  threats: z.array(z.string()),
  recommendation: z.string(),
});

const systemPrompts: Record<string, string> = {
  pros_cons: `You are a thoughtful decision advisor. The user will describe a decision they need to make.
Generate a balanced pros and cons analysis.
- Provide 4-7 meaningful pros
- Provide 4-7 meaningful cons
- End with a concise, actionable recommendation (2-3 sentences)
Be specific and insightful, not generic.`,

  comparison: `You are a thoughtful decision advisor. The user will describe a decision involving multiple options.
- Identify the 2-4 key options being considered
- Create 5-8 meaningful comparison criteria relevant to this specific decision
- For each criterion, give each option a brief, specific value (not just "good" or "bad")
- Mark a winner for each criterion where there's a clear advantage
- End with a concise recommendation (2-3 sentences)
If options aren't explicitly named, infer them from context.`,

  swot: `You are a strategic decision advisor. The user will describe a decision or initiative.
Generate a SWOT analysis (Strengths, Weaknesses, Opportunities, Threats).
- Strengths: Internal positives that favor this decision/path
- Weaknesses: Internal negatives or limitations
- Opportunities: External factors that could be leveraged
- Threats: External risks or challenges
- Provide 3-5 items per quadrant
- End with a concise, actionable recommendation (2-3 sentences)`,
};

const providerNames: Record<string, string> = {
  anthropic: "Anthropic",
  openai: "OpenAI",
  google: "Google",
};

function getModel(provider: string, apiKey: string) {
  if (provider === "openai") {
    return createOpenAI({ apiKey })("gpt-4o");
  }
  if (provider === "google") {
    return createGoogleGenerativeAI({ apiKey })("gemini-2.0-flash");
  }
  return createAnthropic({ apiKey })("claude-sonnet-4-6");
}

export async function POST(req: Request) {
  const { decision, analysisType, provider = "anthropic", apiKey } = await req.json();

  if (!decision || !analysisType) {
    return new Response("Missing decision or analysisType", { status: 400 });
  }

  if (!apiKey) {
    const name = providerNames[provider] ?? provider;
    return new Response(
      `No API key configured for ${name}. Please add your ${name} API key in the settings panel.`,
      { status: 400 }
    );
  }

  const schema = analysisType === "pros_cons" ? prosCons : analysisType === "comparison" ? comparison : swot;

  try {
    const result = streamObject({
      model: getModel(provider, apiKey),
      schema,
      system: systemPrompts[analysisType],
      prompt: `Decision to analyze: ${decision}`,
      onError: (event) => {
        console.error("[analyze] stream error:", event.error);
      },
    });

    return result.toTextStreamResponse();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[analyze] error:", message);
    return new Response(message, { status: 500 });
  }
}
