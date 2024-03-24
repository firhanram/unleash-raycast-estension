import api from "../configs/api";
import { GetAllProjectsResponse } from "../types";

export const getAllProjects = async () => {
  const res = await api.get<GetAllProjectsResponse>("/admin/projects");

  return res.data;
};
