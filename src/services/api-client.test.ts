import { AxiosError } from "axios";
import { apiClient } from "./api-client";
import type { AxiosAdapter, AxiosResponse } from "axios";
import { AUTH_ENDPOINTS } from "../constants/auth.constants";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { setSession, clearSession, getAccessToken } from "../store/auth.store";

const SESSION = {
  accessToken: "expired.jwt.token",
  user: {
    id: "a5f0c0de-0000-4000-8000-000000000001",
    email: "michal@ogen.co.il",
    fullName: "מיכל",
  },
};

const toResponse = (
  data: unknown,
  config: AxiosResponse["config"],
): AxiosResponse => ({
  data,
  config,
  status: 200,
  headers: {},
  statusText: "OK",
});

const toUnauthorizedError = (config: AxiosResponse["config"]): AxiosError =>
  new AxiosError(
    "Unauthorized",
    AxiosError.ERR_BAD_REQUEST,
    config,
    {},
    { data: {}, config, status: 401, headers: {}, statusText: "Unauthorized" },
  );

describe("apiClient", () => {
  const originalAdapter = apiClient.defaults.adapter;

  beforeEach(() => {
    clearSession();
    setSession(SESSION);
  });

  afterEach(() => {
    apiClient.defaults.adapter = originalAdapter;
  });

  it("refreshes the access token and retries the original request once", async () => {
    const seenUrls: (string | undefined)[] = [];

    const adapter: AxiosAdapter = async (config) => {
      seenUrls.push(config.url);

      if (config.url === AUTH_ENDPOINTS.REFRESH) {
        return toResponse({ accessToken: "fresh.jwt.token" }, config);
      }

      if (config._isRetryAfterRefresh) {
        return toResponse({ ok: true }, config);
      }

      throw toUnauthorizedError(config);
    };

    apiClient.defaults.adapter = adapter;

    const response = await apiClient.get("/protected");

    expect(response.data).toEqual({ ok: true });
    expect(getAccessToken()).toBe("fresh.jwt.token");
    expect(seenUrls).toEqual([
      "/protected",
      AUTH_ENDPOINTS.REFRESH,
      "/protected",
    ]);
  });

  it("shares a single refresh call across requests that fail at the same time", async () => {
    let refreshCallCount = 0;

    const adapter: AxiosAdapter = async (config) => {
      if (config.url === AUTH_ENDPOINTS.REFRESH) {
        refreshCallCount += 1;

        return toResponse({ accessToken: "fresh.jwt.token" }, config);
      }

      if (config._isRetryAfterRefresh) {
        return toResponse({ ok: true }, config);
      }

      throw toUnauthorizedError(config);
    };

    apiClient.defaults.adapter = adapter;

    await Promise.all([
      apiClient.get("/protected-a"),
      apiClient.get("/protected-b"),
    ]);

    expect(refreshCallCount).toBe(1);
  });

  it("clears the session and rejects when the refresh itself is unauthorized", async () => {
    const adapter: AxiosAdapter = async (config) => {
      throw toUnauthorizedError(config);
    };

    apiClient.defaults.adapter = adapter;

    await expect(apiClient.get("/protected")).rejects.toMatchObject({
      response: { status: 401 },
    });

    expect(getAccessToken()).toBeNull();
  });

  it("does not retry a request that already went through a refresh", async () => {
    let protectedCallCount = 0;

    const adapter: AxiosAdapter = async (config) => {
      if (config.url === AUTH_ENDPOINTS.REFRESH) {
        return toResponse({ accessToken: "fresh.jwt.token" }, config);
      }

      protectedCallCount += 1;
      throw toUnauthorizedError(config);
    };

    apiClient.defaults.adapter = adapter;

    await expect(apiClient.get("/protected")).rejects.toMatchObject({
      response: { status: 401 },
    });

    expect(protectedCallCount).toBe(2);
  });
});
