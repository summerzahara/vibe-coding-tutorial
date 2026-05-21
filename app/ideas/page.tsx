"use client";

import { useState, useEffect } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ApiKeySettings, type AIProvider } from "@/components/api-key-settings";
import { IdeaCard } from "@/components/idea-card";
import { projectIdeasSchema } from "@/lib/idea-schema";
import {
  SparklesIcon,
  RotateCcwIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  VideoIcon,
} from "lucide-react";

const STORAGE_PREFIX = "tiebreaker_key_";
const STORAGE_PROVIDER = "tiebreaker_provider";

const FORMAT_OPTIONS = [
  { value: "any",               label: "Any" },
  { value: "tutorial",          label: "Tutorial" },
  { value: "project_walkthrough", label: "Project walkthrough" },
  { value: "case_study",        label: "Case study" },
  { value: "tool_demo",         label: "Tool demo" },
];

const providerMeta: Record<AIProvider, { name: string; billingUrl: string; billingLabel: string; keyUrl: string; keyLabel: string }> = {
  anthropic: { name: "Anthropic", billingUrl: "https://console.anthropic.com/settings/billing", billingLabel: "console.anthropic.com/settings/billing", keyUrl: "https://console.anthropic.com/settings/keys", keyLabel: "console.anthropic.com/settings/keys" },
  openai:    { name: "OpenAI",    billingUrl: "https://platform.openai.com/account/billing",    billingLabel: "platform.openai.com/account/billing",    keyUrl: "https://platform.openai.com/api-keys",        keyLabel: "platform.openai.com/api-keys" },
  google:    { name: "Google",    billingUrl: "https://aistudio.google.com/",                   billingLabel: "aistudio.google.com",                    keyUrl: "https://aistudio.google.com/apikey",          keyLabel: "aistudio.google.com/apikey" },
};

function getErrorInfo(error: Error | undefined, noOutput: boolean, provider: AIProvider) {
  const meta = providerMeta[provider];
  const msg = (error?.message ?? "").toLowerCase();
  const isMissingKey = msg.includes("no api key configured");
  const isAuthError  = !isMissingKey && (msg.includes("401") || msg.includes("unauthorized") || msg.includes("invalid") || msg.includes("api key") || msg.includes("authentication"));
  const isQuotaError = msg.includes("429") || msg.includes("quota") || msg.includes("credit") || msg.includes("rate limit");

  if (isMissingKey) return { title: `No ${meta.name} API Key`,         detail: `Open the AI Provider settings above and add your ${meta.name} API key. Get one at`, link: { href: meta.keyUrl, label: meta.keyLabel } };
  if (isAuthError)  return { title: `Invalid ${meta.name} API Key`,    detail: `The API key you entered was rejected. Verify it at`,                               link: { href: meta.keyUrl, label: meta.keyLabel } };
  if (isQuotaError || noOutput) return { title: `${meta.name} quota or billing issue`, detail: `Your ${meta.name} account may have run out of credits. Check billing at`, link: { href: meta.billingUrl, label: meta.billingLabel } };
  return { title: "Something went wrong", detail: error?.message ?? "An unexpected error occurred. Please try again.", link: null };
}

export default function IdeasPage() {
  const [skill, setSkill] = useState("");
  const [targetClient, setTargetClient] = useState("");
  const [preferredFormat, setPreferredFormat] = useState("any");
  const [contextOpen, setContextOpen] = useState(false);
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
    api: "/api/generate-ideas",
    schema: projectIdeasSchema,
  });

  const handleSubmit = () => {
    if (!skill.trim()) return;
    setSubmitted(true);
    submit({ skill, targetClient: targetClient || undefined, preferredFormat, provider, apiKey: apiKey || undefined });
  };

  const handleReset = () => {
    setSubmitted(false);
    setSkill("");
    setTargetClient("");
    setPreferredFormat("any");
    stop();
  };

  const ideas = object?.ideas ?? [];
  const hasResults = ideas.length > 0;

  return (
    <div className="min-h-screen bg-[#fffaf0]">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-[#b8a4ed] rounded-2xl flex items-center justify-center mx-auto mb-5">
            <VideoIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-[#0a0a0a] mb-2">
            The Content Engine
          </h1>
          <p className="text-[#6a6a6a] text-base">
            Buildable YouTube project ideas that showcase your data skills
          </p>
        </div>

        {!submitted ? (
          <div className="space-y-5">

            {/* API Key */}
            <ApiKeySettings
              provider={provider}
              apiKey={apiKey}
              onProviderChange={setProvider}
              onApiKeyChange={setApiKey}
              initiallyOpen={!apiKey}
            />

            {/* Skill input */}
            <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6">
              <label className="block text-sm font-semibold text-[#0a0a0a] mb-3">
                What skill or knowledge area do you want to demonstrate?
              </label>
              <Textarea
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="e.g. SQL window functions, building executive dashboards in Looker, Python for business reporting, customer segmentation with clustering..."
                className="min-h-[100px] text-base resize-none bg-[#fffaf0] border-[#e5e5e5] rounded-xl text-[#0a0a0a] placeholder:text-[#9a9a9a] focus:border-[#0a0a0a] focus:ring-0 focus-visible:ring-0 focus-visible:border-[#0a0a0a]"
              />
            </div>

            {/* Optional context */}
            <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden">
              <button
                onClick={() => setContextOpen((o) => !o)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#faf5e8] transition-colors text-left"
              >
                <div>
                  <span className="text-sm font-semibold text-[#0a0a0a]">Optional context</span>
                  <span className="ml-2 text-xs text-[#9a9a9a]">target client · video format</span>
                </div>
                {contextOpen
                  ? <ChevronUpIcon className="w-4 h-4 text-[#9a9a9a]" />
                  : <ChevronDownIcon className="w-4 h-4 text-[#9a9a9a]" />
                }
              </button>

              {contextOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-[#f5f0e0] space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest mb-2">
                      Target client type
                    </label>
                    <input
                      type="text"
                      value={targetClient}
                      onChange={(e) => setTargetClient(e.target.value)}
                      placeholder="e.g. e-commerce founders, marketing teams, small law firms..."
                      className="w-full px-3 py-2.5 text-sm bg-[#fffaf0] border border-[#e5e5e5] rounded-xl text-[#0a0a0a] placeholder:text-[#9a9a9a] focus:outline-none focus:border-[#0a0a0a] transition-colors"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest mb-2">Preferred format</p>
                    <div className="flex flex-wrap gap-2">
                      {FORMAT_OPTIONS.map((f) => (
                        <button
                          key={f.value}
                          onClick={() => setPreferredFormat(f.value)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                            preferredFormat === f.value
                              ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                              : "bg-[#f5f0e0] text-[#3a3a3a] border-[#e5e5e5] hover:border-[#c5c0b0]"
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="space-y-2">
              <Button
                onClick={handleSubmit}
                disabled={!skill.trim() || !apiKey}
                className="w-full h-11 bg-[#b8a4ed] text-white rounded-xl text-sm font-semibold hover:bg-[#a48edb] disabled:opacity-40 border-0 shadow-none"
              >
                <SparklesIcon className="w-4 h-4 mr-2" />
                Generate Project Ideas
              </Button>
              {!apiKey && (
                <p className="text-center text-xs text-[#9a9a9a]">Add your API key above to continue</p>
              )}
            </div>
          </div>

        ) : (
          <div className="space-y-5">

            {/* Skill summary */}
            <div className="flex items-start justify-between gap-4 bg-white rounded-2xl border border-[#e5e5e5] p-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest mb-1.5">Skill area</p>
                <p className="text-sm text-[#0a0a0a] leading-relaxed line-clamp-2">{skill}</p>
              </div>
              <button
                onClick={handleReset}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl text-[#9a9a9a] hover:text-[#0a0a0a] hover:bg-[#f5f0e0] transition-colors"
              >
                <RotateCcwIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Loading — before any ideas appear */}
            {isLoading && !hasResults && (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-9 h-9 rounded-full border-2 border-[#e5e5e5] border-t-[#b8a4ed] animate-spin" />
                <p className="text-sm text-[#6a6a6a]">Generating project ideas…</p>
              </div>
            )}

            {/* Error */}
            {!isLoading && (error || (!hasResults)) && (() => {
              const { title, detail, link } = getErrorInfo(error, !hasResults && !error, provider);
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

            {/* Idea cards — stream in */}
            {ideas.map((idea, i) =>
              idea ? <IdeaCard key={i} idea={idea} index={i} isStreaming={isLoading} /> : null
            )}

            {/* New ideas button */}
            {!isLoading && hasResults && (
              <button
                onClick={handleReset}
                className="w-full h-11 rounded-xl border border-[#e5e5e5] text-sm font-semibold text-[#0a0a0a] bg-[#fffaf0] hover:bg-[#f5f0e0] transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcwIcon className="w-4 h-4" />
                Generate ideas for a different skill
              </button>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
