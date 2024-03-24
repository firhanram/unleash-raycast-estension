import { getPreferenceValues, showToast, Toast } from "@raycast/api";
import axios, { AxiosError } from "axios";
import { TError } from "../types";

const preferences = getPreferenceValues<Preferences>();

const api = axios.create({
  baseURL: preferences.api,
});

api.interceptors.request.use((config) => {
  const token = preferences.token;

  config.headers.Authorization = token;

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError<TError>) => {
    const errorCode = String(err.response?.status);

    await showToast({
      title: "Error",
      message: "An error occurred",
      style: Toast.Style.Failure,
    });

    return Promise.reject(new Error(errorCode));
  },
);

export default api;
