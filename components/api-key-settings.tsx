"use client";

import { useState, useEffect } from "react";
import { KeyIcon, ChevronDownIcon, ChevronUpIcon, EyeIcon, EyeOffIcon, CheckIcon, XIcon } from "lucide-react";

export type AIProvider = "anthropic" | "openai" | "google";

const providers: { id: AIProvider; label: string; placeholder: string }[] = [
  { id: "anthropic", label: "Anthropic (Claude)", placeholder: "sk-ant-..." },
  { id: "openai",    label: "OpenAI (GPT-4o)",    placeholder: "sk-..."     },
  { id: "google",    label: "Google (Gemini)",     placeholder: "AIza..."   },
];

const STORAGE_PREFIX = "tiebreaker_key_";
const STORAGE_PROVIDER = "tiebreaker_provider";

interface ApiKeySettingsProps {
  provider: AIProvider;
  apiKey: string;
  onProviderChange: (provider: AIProvider) => void;
  onApiKeyChange: (key: string) => void;
  initiallyOpen?: boolean;
}

export function ApiKeySettings({
  provider,
  apiKey,
  onProviderChange,
  onApiKeyChange,
  initiallyOpen = false,
}: ApiKeySettingsProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [inputValue, setInputValue] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setInputValue(apiKey);
  }, [apiKey, provider]);

  const handleProviderChange = (p: AIProvider) => {
    onProviderChange(p);
    const stored = localStorage.getItem(STORAGE_PREFIX + p) ?? "";
    onApiKeyChange(stored);
    setInputValue(stored);
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_PREFIX + provider, inputValue);
    localStorage.setItem(STORAGE_PROVIDER, provider);
    onApiKeyChange(inputValue);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setIsOpen(false);
    }, 800);
  };

  const handleClear = () => {
    localStorage.removeItem(STORAGE_PREFIX + provider);
    setInputValue("");
    onApiKeyChange("");
    setSaved(false);
  };

  const currentProvider = providers.find((p) => p.id === provider)!;
  const hasKey = !!apiKey;

  return (
    <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden">
      {/* Collapsed header */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#faf5e8] transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
            hasKey ? "bg-[#0a0a0a]" : "bg-[#f5f0e0]"
          }`}>
            <KeyIcon className={`w-4 h-4 ${hasKey ? "text-white" : "text-[#6a6a6a]"}`} />
          </div>
          <div>
            <span className="text-sm font-semibold text-[#0a0a0a]">AI Provider</span>
            <span className="ml-2 text-xs text-[#9a9a9a]">
              {currentProvider.label}
              {hasKey ? " · key saved" : " · no key set"}
            </span>
          </div>
        </div>
        {isOpen
          ? <ChevronUpIcon className="w-4 h-4 text-[#9a9a9a] flex-shrink-0" />
          : <ChevronDownIcon className="w-4 h-4 text-[#9a9a9a] flex-shrink-0" />
        }
      </button>

      {/* Expanded panel */}
      {isOpen && (
        <div className="px-5 pb-5 pt-4 border-t border-[#f5f0e0] space-y-4">

          {/* Provider selector */}
          <div>
            <p className="text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest mb-2">Provider</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {providers.map((p) => {
                const storedKey = typeof window !== "undefined"
                  ? localStorage.getItem(STORAGE_PREFIX + p.id)
                  : null;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleProviderChange(p.id)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      provider === p.id
                        ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                        : "bg-[#f5f0e0] text-[#3a3a3a] border-[#e5e5e5] hover:border-[#c5c0b0]"
                    }`}
                  >
                    <span>{p.label}</span>
                    {storedKey && (
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ml-1.5 ${
                        provider === p.id ? "bg-[#a4d4c5]" : "bg-[#a4d4c5]"
                      }`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* API Key input */}
          <div>
            <p className="text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest mb-2">
              API Key
              <span className="ml-1.5 font-normal normal-case text-[#9a9a9a]">
                (saved in your browser, sent only to this app)
              </span>
            </p>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value); setSaved(false); }}
                placeholder={currentProvider.placeholder}
                className="w-full pr-10 pl-3 py-2.5 text-sm bg-[#fffaf0] border border-[#e5e5e5] rounded-xl text-[#0a0a0a] placeholder:text-[#9a9a9a] font-mono focus:outline-none focus:border-[#0a0a0a] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a9a9a] hover:text-[#0a0a0a] transition-colors"
              >
                {showKey ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={!inputValue.trim() || inputValue === apiKey}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] disabled:opacity-40 transition-colors"
            >
              {saved && <CheckIcon className="w-3.5 h-3.5" />}
              {saved ? "Saved!" : "Save Key"}
            </button>
            {hasKey && (
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-[#f5f0e0] text-[#6a6a6a] hover:text-[#ef4444] hover:bg-[#fff0ee] border border-[#e5e5e5] transition-colors"
              >
                <XIcon className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>

          <p className="text-xs text-[#9a9a9a]">
            Your key is saved only in your browser. Leave blank to use the app&apos;s built-in key, if one is configured.
          </p>
        </div>
      )}
    </div>
  );
}
