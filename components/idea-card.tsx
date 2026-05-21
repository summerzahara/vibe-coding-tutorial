"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon, DatabaseIcon, PackageIcon, ListIcon, WrenchIcon, TrendingUpIcon, VideoIcon } from "lucide-react";
interface IdeaData {
  title?: string;
  businessScenario?: string;
  datasetName?: string;
  datasetSource?: string;
  datasetNotes?: string;
  deliverable?: string;
  steps?: (string | undefined)[];
  tools?: (string | undefined)[];
  skillSignal?: string;
  videoHook?: string;
  videoAngle?: string;
}

interface Props {
  idea: IdeaData;
  index: number;
  isStreaming: boolean;
}

function Section({ icon, label, children, className = "" }: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#6a6a6a]">{icon}</span>
        <p className="text-xs font-semibold text-[#6a6a6a] uppercase tracking-widest">{label}</p>
      </div>
      {children}
    </div>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-white/60 rounded-lg animate-pulse ${className}`} />;
}

export function IdeaCard({ idea, index, isStreaming }: Props) {
  const [copied, setCopied] = useState(false);

  const copyTitle = () => {
    if (!idea.title) return;
    navigator.clipboard.writeText(idea.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden">

      {/* Card header */}
      <div className="flex items-start gap-4 px-5 py-4 border-b border-[#f5f0e0]">
        <div className="w-7 h-7 rounded-xl bg-[#b8a4ed]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-xs font-bold text-[#7a5acf]">{index + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          {idea.title
            ? <h3 className="font-semibold text-[#0a0a0a] text-base leading-snug">{idea.title}</h3>
            : <Skeleton className="h-5 w-3/4" />
          }
        </div>
        {idea.title && (
          <button
            onClick={copyTitle}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#6a6a6a] hover:bg-[#f5f0e0] transition-colors flex-shrink-0"
          >
            {copied
              ? <><CheckIcon className="w-3 h-3 text-[#2a8a70]" /><span className="text-[#2a8a70]">Copied</span></>
              : <><CopyIcon className="w-3 h-3" />Title</>
            }
          </button>
        )}
      </div>

      <div className="p-4 space-y-3">

        {/* Business scenario */}
        <Section icon={<TrendingUpIcon className="w-3.5 h-3.5" />} label="Business Scenario" className="bg-[#e8f5f1]">
          {idea.businessScenario
            ? <p className="text-sm text-[#3a3a3a] leading-relaxed">{idea.businessScenario}</p>
            : isStreaming ? <><Skeleton className="h-4 w-full mb-1.5" /><Skeleton className="h-4 w-4/5" /></> : null
          }
        </Section>

        {/* Dataset + Deliverable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Section icon={<DatabaseIcon className="w-3.5 h-3.5" />} label="Dataset" className="bg-[#f0ecfb]">
            {idea.datasetName
              ? (
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-[#0a0a0a]">{idea.datasetName}</p>
                  {idea.datasetSource && <p className="text-xs text-[#7a5acf] font-medium break-all">{idea.datasetSource}</p>}
                  {idea.datasetNotes && <p className="text-xs text-[#6a6a6a] leading-relaxed">{idea.datasetNotes}</p>}
                </div>
              )
              : isStreaming ? <><Skeleton className="h-4 w-2/3 mb-1.5" /><Skeleton className="h-3 w-full" /></> : null
            }
          </Section>

          <Section icon={<PackageIcon className="w-3.5 h-3.5" />} label="Deliverable" className="bg-[#fff6ee]">
            {idea.deliverable
              ? <p className="text-sm text-[#3a3a3a] leading-relaxed">{idea.deliverable}</p>
              : isStreaming ? <><Skeleton className="h-4 w-full mb-1.5" /><Skeleton className="h-4 w-3/4" /></> : null
            }
          </Section>
        </div>

        {/* Steps */}
        <Section icon={<ListIcon className="w-3.5 h-3.5" />} label="Project Steps" className="bg-[#f5f0e0]">
          {idea.steps && idea.steps.length > 0
            ? (
              <ol className="space-y-2">
                {idea.steps.filter((s): s is string => !!s).map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#3a3a3a]">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0a0a0a] text-white text-xs font-semibold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            )
            : isStreaming ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-white/60 animate-pulse flex-shrink-0" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            ) : null
          }
        </Section>

        {/* Tools */}
        {(idea.tools && idea.tools.length > 0) && (
          <Section icon={<WrenchIcon className="w-3.5 h-3.5" />} label="Tools" className="bg-white border border-[#e5e5e5]">
            <div className="flex flex-wrap gap-1.5">
              {idea.tools.filter((t): t is string => !!t).map((tool, i) => (
                <span key={i} className="px-2.5 py-1 bg-[#0a0a0a] text-white text-xs font-medium rounded-lg">
                  {tool}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Skill signal + Video angle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Section icon={<TrendingUpIcon className="w-3.5 h-3.5" />} label="Skill Signal to Clients" className="bg-[#e8f5f1]">
            {idea.skillSignal
              ? <p className="text-sm text-[#3a3a3a] leading-relaxed">{idea.skillSignal}</p>
              : isStreaming ? <><Skeleton className="h-4 w-full mb-1.5" /><Skeleton className="h-4 w-3/4" /></> : null
            }
          </Section>

          <Section icon={<VideoIcon className="w-3.5 h-3.5" />} label="Video Angle" className="bg-[#fdf5dc]">
            {idea.videoHook || idea.videoAngle
              ? (
                <div className="space-y-2">
                  {idea.videoHook && (
                    <div>
                      <p className="text-xs font-semibold text-[#9a9a9a] uppercase tracking-widest mb-0.5">Hook</p>
                      <p className="text-sm text-[#3a3a3a] leading-relaxed">{idea.videoHook}</p>
                    </div>
                  )}
                  {idea.videoAngle && (
                    <div>
                      <p className="text-xs font-semibold text-[#9a9a9a] uppercase tracking-widest mb-0.5">Narrative</p>
                      <p className="text-sm text-[#3a3a3a] leading-relaxed">{idea.videoAngle}</p>
                    </div>
                  )}
                </div>
              )
              : isStreaming ? <><Skeleton className="h-4 w-full mb-1.5" /><Skeleton className="h-4 w-4/5" /></> : null
            }
          </Section>
        </div>

      </div>
    </div>
  );
}
