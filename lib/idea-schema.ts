import { z } from "zod";

export const projectIdea = z.object({
  title: z.string(),
  businessScenario: z.string(),
  datasetName: z.string(),
  datasetSource: z.string(),
  datasetNotes: z.string(),
  deliverable: z.string(),
  steps: z.array(z.string()),
  tools: z.array(z.string()),
  skillSignal: z.string(),
  videoHook: z.string(),
  videoAngle: z.string(),
});

export const projectIdeasSchema = z.object({
  ideas: z.array(projectIdea),
});

export type ProjectIdea = z.infer<typeof projectIdea>;
