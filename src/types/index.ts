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

export type Response = {
  version: string;
};

export type GetAllProjectsResponse = {
  projects: TProject[];
} & Response;

export type TError = {
  id: string;
  name: string;
  message: string;
  details: {
    message: string;
    description: string;
  }[];
};

export type TEnvironment = "development" | "production";

export type TEnvironmentObj = {
  name: string;
  featureName: string;
  environment: TEnvironment;
  type: TEnvironment;
  enabled: boolean;
  sortOrder: number;
  variantCount: number;
};

export type TFeature = {
  name: string;
  type: string;
  description: string | null;
  impressionData: boolean;
  stale: boolean;
  createdAt: string | null;
  lastSeenAt: string | null;
  environments: TEnvironmentObj[];
};

export type GetAllFeaturesResponse = {
  features: TFeature[];
} & Response;

export type TFeatureToggleParams = {
  environment: TEnvironment;
  featureName: string;
  projectId: string;
};
