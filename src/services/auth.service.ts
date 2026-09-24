import type {
  IAuthSession,
  ILoginRequest,
  ISignUpRequest,
} from "../interfaces/auth.interface";

import { apiClient } from "./api-client";
import { AUTH_ENDPOINTS } from "../constants/auth.constants";
import { isAuthSession } from "../utilities/auth-response.utility";

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
