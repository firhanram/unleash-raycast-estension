import api from "../configs/api";
import { GetAllFeaturesResponse, GetAllProjectsResponse } from "../types";

export const getAllProjects = async () => {
  const res = await api.get<GetAllProjectsResponse>("/admin/projects");

  return res.data;
};

export const getAllFeatures = async (projectId: string) => {
  const res = await api.get<GetAllFeaturesResponse>(`/admin/projects/${projectId}/features`);

  return res.data;
};
