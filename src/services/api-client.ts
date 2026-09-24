import axios from "axios";
import type { AxiosError } from "axios";
import { AUTH_ENDPOINTS } from "../constants/auth.constants";
import { EnvironmentManager } from "../utilities/environment-manager.utility";
import {
  getAccessToken,
  setAccessToken,
  clearSession,
} from "../store/auth.store";

declare module "axios" {
  interface InternalAxiosRequestConfig {
    _isRetryAfterRefresh?: boolean;
  }
}

const DEFAULT_API_URL = "http://localhost:3000";

export const apiClient = axios.create({
  withCredentials: true,
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

const refreshState: { pending: Promise<string> | null } = { pending: null };

const isRefreshRequest = (url?: string): boolean =>
  url === AUTH_ENDPOINTS.REFRESH;

const refreshAccessToken = (): Promise<string> => {
  if (refreshState.pending !== null) {
    return refreshState.pending;
  }

  refreshState.pending = apiClient
    .post<{ accessToken: string }>(AUTH_ENDPOINTS.REFRESH)
    .then((response) => {
      setAccessToken(response.data.accessToken);

      return response.data.accessToken;
    })
    .finally(() => {
      refreshState.pending = null;
    });

  return refreshState.pending;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config ?? null;
    const isUnauthorized = error.response?.status === 401;
    const canRetryWithRefresh =
      config !== null &&
      !config._isRetryAfterRefresh &&
      !isRefreshRequest(config.url);

    if (!isUnauthorized || !canRetryWithRefresh) {
      return Promise.reject(error);
    }

    config._isRetryAfterRefresh = true;

    try {
      await refreshAccessToken();

      return apiClient(config);
    } catch (refreshError) {
      clearSession();

      return Promise.reject(refreshError);
    }
  },
);
