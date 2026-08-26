import { create } from "zustand";
import { isAuthSession } from "../utilities/auth-response.utility";
import { LOCAL_STORAGE_KEYS } from "../constants/storage.constants";
import type { IAuthSession, IAuthUser } from "../interfaces/auth.interface";
import { WebLocalStorageManager } from "../utilities/web-local-storage.manager";

interface IAuthState {
  user: IAuthUser | null;
  accessToken: string | null;
}

export const authStore = create<IAuthState>(() => ({
  user: null,
  accessToken: null,
}));

export const getAccessToken = () => authStore.getState().accessToken;

export const getCurrentUser = () => authStore.getState().user;

export const getIsAuthenticated = () => getAccessToken() !== null;

export const setSession = (session: IAuthSession) => {
  WebLocalStorageManager.setJson(LOCAL_STORAGE_KEYS.AUTH_SESSION, session);
  authStore.setState({
    user: session.user,
    accessToken: session.accessToken,
  });
};

export const clearSession = () => {
  WebLocalStorageManager.removeItem(LOCAL_STORAGE_KEYS.AUTH_SESSION);
  authStore.setState({ user: null, accessToken: null });
};

export const restoreSession = () => {
  const session = WebLocalStorageManager.getJson(
    LOCAL_STORAGE_KEYS.AUTH_SESSION,
    isAuthSession,
  );

  if (session === null) {
    return;
  }

  authStore.setState({
    user: session.user,
    accessToken: session.accessToken,
  });
};
