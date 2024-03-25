import { getPreferenceValues, showToast } from "@raycast/api";
import axios, { AxiosError } from "axios";
import { TError } from "../types";
import { generateErrorMessage } from "../helpers";

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
      title: generateErrorMessage(errorCode),
    });

    return Promise.reject(new Error(errorCode));
  },
);

export default api;
