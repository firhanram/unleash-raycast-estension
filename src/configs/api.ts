import { getPreferenceValues, openCommandPreferences, showToast, Toast } from "@raycast/api";
import axios, { AxiosError } from "axios";

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
  async (err: AxiosError) => {
    if (err.status === 401) {
      await showToast({
        title: "Unauthorized",
        message: "Token is invalid or expired",
        style: Toast.Style.Failure,
      });
      await openCommandPreferences();
    }
  },
);

export default api;
