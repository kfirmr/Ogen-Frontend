import type {
  ILoginRequest,
  ISignUpRequest,
} from "../interfaces/auth.interface";

import { authService } from "../services/auth.service";
import { setSession, clearSession } from "../store/auth.store";
import { getAuthErrorMessage } from "../utilities/auth-error.utility";

export interface IAuthActionResult {
  errorMessage: string | null;
}

const SUCCESS: IAuthActionResult = { errorMessage: null };

export const loginAction = async (
  credentials: ILoginRequest,
): Promise<IAuthActionResult> => {
  try {
    const session = await authService.login(credentials);

    setSession(session);

    return SUCCESS;
  } catch (error) {
    return { errorMessage: getAuthErrorMessage(error) };
  }
};

export const logoutAction = (): void => {
  clearSession();
};

export const signUpAction = async (
  details: ISignUpRequest,
): Promise<IAuthActionResult> => {
  try {
    const session = await authService.signUp(details);

    setSession(session);

    return SUCCESS;
  } catch (error) {
    return { errorMessage: getAuthErrorMessage(error) };
  }
};
