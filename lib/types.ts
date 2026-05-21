export type AnalysisType = "pros_cons" | "comparison" | "swot";

export interface ProsCons {
  type: "pros_cons";
  decision: string;
  pros: string[];
  cons: string[];
  recommendation: string;
}

export interface Comparison {
  type: "comparison";
  decision: string;
  options: string[];
  criteria: {
    name: string;
    values: Record<string, string>;
    winner?: string;
  }[];
  recommendation: string;
}

export interface Swot {
  type: "swot";
  decision: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  recommendation: string;
}

export type AnalysisResult = ProsCons | Comparison | Swot;
