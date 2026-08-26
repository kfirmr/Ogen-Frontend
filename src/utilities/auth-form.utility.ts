import {
  AUTH_MESSAGES,
  MIN_PASSWORD_LENGTH,
} from "../constants/auth.constants";

interface ILoginFormValues {
  email: string;
  password: string;
}

interface ISignUpFormValues {
  email: string;
  fullName: string;
  password: string;
  agreedToTerms: boolean;
}

export const getLoginFormError = (values: ILoginFormValues): string | null => {
  const hasEmptyField =
    values.email.trim().length === 0 || values.password.length === 0;

  if (hasEmptyField) {
    return AUTH_MESSAGES.MISSING_DETAILS;
  }

  return null;
};

export const getSignUpFormError = (
  values: ISignUpFormValues,
): string | null => {
  if (values.fullName.trim().length === 0) {
    return AUTH_MESSAGES.NAME_REQUIRED;
  }

  if (values.email.trim().length === 0) {
    return AUTH_MESSAGES.MISSING_DETAILS;
  }

  if (!values.agreedToTerms) {
    return AUTH_MESSAGES.TERMS_REQUIRED;
  }

  if (values.password.length < MIN_PASSWORD_LENGTH) {
    return AUTH_MESSAGES.PASSWORD_TOO_SHORT;
  }

  return null;
};
