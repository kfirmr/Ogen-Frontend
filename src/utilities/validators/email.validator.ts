import { REGEX_VALIDATION } from "../../constants/regex.constants";
import { type IValidationResult } from "../../interfaces/validation-result.interface";

export const validateEmail = (email: string): IValidationResult => {
  if (!email) {
    return { isValid: false, errorText: "" };
  }

  const isValid = REGEX_VALIDATION.EMAIL.test(email);

  return {
    isValid,
    errorText: isValid ? "" : "כתובת דוא״ל לא תקינה",
  };
};
