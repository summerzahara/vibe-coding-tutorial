"use client";

import { useState, useEffect } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AnalysisType } from "@/lib/types";
import { ProsConsResult } from "@/components/pros-cons-result";
import { ComparisonResult } from "@/components/comparison-result";
import { SwotResult } from "@/components/swot-result";
import { ApiKeySettings, type AIProvider } from "@/components/api-key-settings";
import { ScaleIcon, ListChecksIcon, TableIcon, BarChart3Icon, SparklesIcon, RotateCcwIcon } from "lucide-react";

/* ─── Clay brand colors per analysis type ─── */
const typeStyle: Record<AnalysisType, { active: string; text: string; icon: string }> = {
  pros_cons:  { active: "bg-[#ffb084] border-[#ffb084]",   text: "text-[#0a0a0a]", icon: "text-[#0a0a0a]" },
  comparison: { active: "bg-[#b8a4ed] border-[#b8a4ed]",   text: "text-[#0a0a0a]", icon: "text-[#0a0a0a]" },
  swot:       { active: "bg-[#1a3a3a] border-[#1a3a3a]",   text: "text-white",      icon: "text-white" },
};

const typeTabActive: Record<AnalysisType, string> = {
  pros_cons:  "bg-[#ffb084] text-[#0a0a0a]",
  comparison: "bg-[#b8a4ed] text-[#0a0a0a]",
  swot:       "bg-[#1a3a3a] text-white",
};

const providerMeta: Record<AIProvider, { name: string; billingUrl: string; billingLabel: string; keyUrl: string; keyLabel: string }> = {
  anthropic: {
    name: "Anthropic",
    billingUrl: "https://console.anthropic.com/settings/billing",
    billingLabel: "console.anthropic.com/settings/billing",
    keyUrl: "https://console.anthropic.com/settings/keys",
    keyLabel: "console.anthropic.com/settings/keys",
  },
  openai: {
    name: "OpenAI",
    billingUrl: "https://platform.openai.com/account/billing",
    billingLabel: "platform.openai.com/account/billing",
    keyUrl: "https://platform.openai.com/api-keys",
    keyLabel: "platform.openai.com/api-keys",
  },
  google: {
    name: "Google",
    billingUrl: "https://aistudio.google.com/",
    billingLabel: "aistudio.google.com",
    keyUrl: "https://aistudio.google.com/apikey",
    keyLabel: "aistudio.google.com/apikey",
  },
};

function getErrorInfo(
  error: Error | undefined,
  noOutput: boolean,
  provider: AIProvider
): { title: string; detail: string; link: { href: string; label: string } | null } {
  const meta = providerMeta[provider];
  const msg = (error?.message ?? "").toLowerCase();

  const isMissingKey = msg.includes("no api key configured");
  const isAuthError =
    !isMissingKey &&
    (msg.includes("401") || msg.includes("unauthorized") || msg.includes("invalid") ||
      msg.includes("api key") || msg.includes("authentication") || msg.includes("incorrect api key"));
  const isQuotaError =
    msg.includes("429") || msg.includes("quota") || msg.includes("credit") ||
    msg.includes("rate limit") || msg.includes("insufficient_quota");

  if (isMissingKey) return {
    title: `No ${meta.name} API Key`,
    detail: `Open the AI Provider settings above and add your ${meta.name} API key. Get one at`,
    link: { href: meta.keyUrl, label: meta.keyLabel },
  };
  if (isAuthError) return {
    title: `Invalid ${meta.name} API Key`,
    detail: `The API key you entered was rejected. Verify it at`,
    link: { href: meta.keyUrl, label: meta.keyLabel },
  };
  if (isQuotaError || noOutput) return {
    title: `${meta.name} quota or billing issue`,
    detail: `Your ${meta.name} account may have run out of credits. Check billing at`,
    link: { href: meta.billingUrl, label: meta.billingLabel },
  };
  return {
    title: "Something went wrong",
    detail: error?.message ?? "An unexpected error occurred. Please try again.",
    link: null,
  };
}

const analysisOptions: { type: AnalysisType; label: string; description: string; icon: React.ReactNode }[] = [
  { type: "pros_cons",  label: "Pros & Cons",      description: "Weigh the advantages and disadvantages",    icon: <ListChecksIcon className="w-5 h-5" /> },
  { type: "comparison", label: "Comparison Table",  description: "Compare your options side by side",          icon: <TableIcon className="w-5 h-5" /> },
  { type: "swot",       label: "SWOT Analysis",     description: "Strengths, weaknesses, opportunities, threats", icon: <BarChart3Icon className="w-5 h-5" /> },
];

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
  criteria: z.array(z.object({
    name: z.string(),
    values: z.record(z.string(), z.string()),
    winner: z.string().optional(),
  })),
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

const schemaMap = { pros_cons: prosCons, comparison, swot };

const STORAGE_PREFIX = "tiebreaker_key_";
const STORAGE_PROVIDER = "tiebreaker_provider";

export default function Home() {
  const [decision, setDecision] = useState("");
  const [analysisType, setAnalysisType] = useState<AnalysisType>("pros_cons");
  const [submitted, setSubmitted] = useState(false);
  const [provider, setProvider] = useState<AIProvider>("anthropic");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const savedProvider = (localStorage.getItem(STORAGE_PROVIDER) as AIProvider) ?? "anthropic";
    const savedKey = localStorage.getItem(STORAGE_PREFIX + savedProvider) ?? "";
    setProvider(savedProvider);
    setApiKey(savedKey);
  }, []);

  const { object, submit, isLoading, error, stop } = useObject({
    api: "/api/analyze",
    schema: schemaMap[analysisType],
  });

  const handleSubmit = () => {
    if (!decision.trim()) return;
    setSubmitted(true);
    submit({ decision, analysisType, provider, apiKey: apiKey || undefined });
  };

  const handleSwitchAnalysis = (newType: AnalysisType) => {
    if (newType === analysisType && isLoading) return;
    setAnalysisType(newType);
    submit({ decision, analysisType: newType, provider, apiKey: apiKey || undefined });
  };

  const handleReset = () => {
    setSubmitted(false);
    setDecision("");
    stop();
  };

  return (
    <div className="min-h-screen bg-[#fffaf0]">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-[#0a0a0a] rounded-2xl flex items-center justify-center mx-auto mb-5">
            <ScaleIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-[#0a0a0a] mb-2">
            The Tiebreaker
          </h1>
          <p className="text-[#6a6a6a] text-base">
            AI-powered clarity for your toughest decisions
          </p>
        </div>

        {!submitted ? (
          <div className="space-y-5">

            {/* API Key — required, at top */}
            <ApiKeySettings
              provider={provider}
              apiKey={apiKey}
              onProviderChange={setProvider}
              onApiKeyChange={setApiKey}
              initiallyOpen={!apiKey}
            />

            {/* Decision Input */}
            <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6">
              <label className="block text-sm font-semibold text-[#0a0a0a] mb-3">
                What decision are you trying to make?
              </label>
              <Textarea
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                placeholder="e.g. Should I take the new job offer or stay at my current company? The new role pays 20% more but requires relocating..."
                className="min-h-[120px] text-base resize-none bg-[#fffaf0] border-[#e5e5e5] rounded-xl text-[#0a0a0a] placeholder:text-[#9a9a9a] focus:border-[#0a0a0a] focus:ring-0 focus-visible:ring-0 focus-visible:border-[#0a0a0a]"
              />
            </div>

            {/* Analysis Type */}
            <div>
              <p className="text-sm font-semibold text-[#0a0a0a] mb-3">Analysis type</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {analysisOptions.map((opt) => {
                  const isActive = analysisType === opt.type;
                  const s = typeStyle[opt.type];
                  return (
                    <button
                      key={opt.type}
                      onClick={() => setAnalysisType(opt.type)}
                      className={`relative flex flex-col items-start gap-2.5 p-5 rounded-3xl border-2 text-left transition-all duration-150 ${
                        isActive
                          ? `${s.active} ${s.text}`
                          : "bg-[#f5f0e0] border-[#e5e5e5] text-[#0a0a0a] hover:border-[#c5c0b0]"
                      }`}
                    >
                      <span className={isActive ? s.icon : "text-[#6a6a6a]"}>
                        {opt.icon}
                      </span>
                      <div>
                        <p className="font-semibold text-sm">{opt.label}</p>
                        <p className={`text-xs mt-0.5 ${isActive ? "opacity-70" : "text-[#6a6a6a]"}`}>
                          {opt.description}
                        </p>
                      </div>
                      {isActive && (
                        <div className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-current opacity-60" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <div className="space-y-2">
              <Button
                onClick={handleSubmit}
                disabled={!decision.trim() || !apiKey}
                className="w-full h-11 bg-[#0a0a0a] text-white rounded-xl text-sm font-semibold hover:bg-[#1a1a1a] disabled:opacity-40 border-0 shadow-none"
              >
                <SparklesIcon className="w-4 h-4 mr-2" />
                Analyze Decision
              </Button>
              {!apiKey && (
                <p className="text-center text-xs text-[#9a9a9a]">
                  Add your API key above to continue
                </p>
              )}
            </div>
          </div>

        ) : (
          <div className="space-y-5">

            {/* Decision summary */}
            <div className="flex items-start justify-between gap-4 bg-white rounded-2xl border border-[#e5e5e5] p-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest mb-1.5">
                  Your Decision
                </p>
                <p className="text-sm text-[#0a0a0a] leading-relaxed line-clamp-2">{decision}</p>
              </div>
              <button
                onClick={handleReset}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl text-[#9a9a9a] hover:text-[#0a0a0a] hover:bg-[#f5f0e0] transition-colors"
              >
                <RotateCcwIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Analysis type switcher */}
            <div className="bg-[#f5f0e0] rounded-2xl border border-[#e5e5e5] p-1 flex gap-1">
              {analysisOptions.map((opt) => {
                const isActive = analysisType === opt.type;
                return (
                  <button
                    key={opt.type}
                    onClick={() => handleSwitchAnalysis(opt.type)}
                    disabled={isLoading && isActive}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? `${typeTabActive[opt.type]} shadow-sm`
                        : "text-[#6a6a6a] hover:text-[#0a0a0a] hover:bg-white/60"
                    }`}
                  >
                    <span className="hidden sm:block">{opt.icon}</span>
                    {opt.label}
                    {isLoading && isActive && (
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-current opacity-50 border-t-transparent animate-spin" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Loading */}
            {isLoading && (!object || object.type !== analysisType) && (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-9 h-9 rounded-full border-2 border-[#e5e5e5] border-t-[#0a0a0a] animate-spin" />
                <p className="text-sm text-[#6a6a6a]">Thinking through your decision…</p>
              </div>
            )}

            {/* Error */}
            {!isLoading && (error || !object) && (() => {
              const { title, detail, link } = getErrorInfo(error, !object && !error, provider);
              return (
                <div className="bg-white border border-[#e5e5e5] rounded-2xl p-5">
                  <p className="font-semibold text-[#ef4444] text-sm mb-1">{title}</p>
                  <p className="text-sm text-[#6a6a6a]">
                    {detail}
                    {link && (
                      <>{" "}<a href={link.href} target="_blank" rel="noopener noreferrer" className="underline text-[#0a0a0a] font-medium">{link.label}</a>{" "}and try again.</>
                    )}
                  </p>
                </div>
              );
            })()}

            {/* Results */}
            {object && object.type === analysisType && (
              <>
                {object.type === "pros_cons"  && <ProsConsResult  data={object as any} isLoading={isLoading} />}
                {object.type === "comparison" && <ComparisonResult data={object as any} isLoading={isLoading} />}
                {object.type === "swot"       && <SwotResult       data={object as any} isLoading={isLoading} />}
              </>
            )}

            {/* New decision */}
            {!isLoading && object && object.type === analysisType && (
              <button
                onClick={handleReset}
                className="w-full h-11 rounded-xl border border-[#e5e5e5] text-sm font-semibold text-[#0a0a0a] bg-[#fffaf0] hover:bg-[#f5f0e0] transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcwIcon className="w-4 h-4" />
                Analyze Another Decision
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
