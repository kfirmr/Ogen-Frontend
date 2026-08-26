import type {
  IAuthSession,
  ILoginRequest,
  ISignUpRequest,
} from "../interfaces/auth.interface";

import { apiClient } from "./api-client";
import { isAuthSession } from "../utilities/auth-response.utility";

const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  SIGN_UP: "/auth/sign-up",
} as const;

const toAuthSession = (data: unknown): IAuthSession => {
  if (!isAuthSession(data)) {
    throw new Error("Invalid auth response structure");
  }

  return data;
};

class AuthService {
  async login(credentials: ILoginRequest): Promise<IAuthSession> {
    const response = await apiClient.post<unknown>(
      AUTH_ENDPOINTS.LOGIN,
      credentials,
    );

    return toAuthSession(response.data);
  }

  async signUp(details: ISignUpRequest): Promise<IAuthSession> {
    const response = await apiClient.post<unknown>(
      AUTH_ENDPOINTS.SIGN_UP,
      details,
    );

    return toAuthSession(response.data);
  }
}

export const authService = new AuthService();
