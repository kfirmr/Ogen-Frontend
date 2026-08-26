import {
  authStore,
  setSession,
  clearSession,
  getAccessToken,
  restoreSession,
  getIsAuthenticated,
} from "./auth.store";

import { describe, it, expect, beforeEach } from "vitest";
import { LOCAL_STORAGE_KEYS } from "../constants/storage.constants";

const SESSION = {
  accessToken: "a.jwt.token",
  user: {
    id: "a5f0c0de-0000-4000-8000-000000000001",
    email: "michal@ogen.co.il",
    fullName: "מיכל",
  },
};

describe("auth.store", () => {
  beforeEach(() => {
    clearSession();
  });

  it("starts unauthenticated", () => {
    expect(getIsAuthenticated()).toBe(false);
    expect(getAccessToken()).toBeNull();
  });

  it("holds the session after logging in", () => {
    setSession(SESSION);

    expect(getIsAuthenticated()).toBe(true);
    expect(getAccessToken()).toBe(SESSION.accessToken);
    expect(authStore.getState().user).toEqual(SESSION.user);
  });

  it("persists the session so a refresh keeps the user signed in", () => {
    setSession(SESSION);
    authStore.setState({ user: null, accessToken: null });

    restoreSession();

    expect(getAccessToken()).toBe(SESSION.accessToken);
    expect(authStore.getState().user).toEqual(SESSION.user);
  });

  it("clears the persisted session on logout", () => {
    setSession(SESSION);
    clearSession();

    expect(getIsAuthenticated()).toBe(false);
    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_SESSION)).toBeNull();
  });

  it("ignores a corrupted persisted session", () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_SESSION, "{not-json");

    restoreSession();

    expect(getIsAuthenticated()).toBe(false);
  });
});
