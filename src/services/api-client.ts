import axios from "axios";
import { getAccessToken } from "../store/auth.store";
import { EnvironmentManager } from "../utilities/environment-manager.utility";

const DEFAULT_API_URL = "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: EnvironmentManager.get("VITE_API_URL", {
    defaultValue: DEFAULT_API_URL,
  }),
});

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken === null) {
    return config;
  }

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});
