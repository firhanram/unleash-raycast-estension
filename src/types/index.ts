export type TProject = {
  id: string;
  name: string;
  description: string | null;
  health: number;
  featureCount: number;
  staleFeatureCount: number;
  potentiallyStaleFeatureCount: number;
  memberCount: number;
  createdAt: string;
  updatedAt: string | null;
  favorite: boolean;
  mode: "open" | "protected" | "private";
  defaultStickiness: string;
  avgTimeToProduction: number;
};

export type GetAllProjectsResponse = {
  version: string;
  projects: TProject[];
};
