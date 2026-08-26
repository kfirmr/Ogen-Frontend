import { MIN_PASSWORD_LENGTH } from "../../constants/auth.constants";
import { type IValidationResult } from "../../interfaces/validation-result.interface";

export const validatePassword = (password: string): IValidationResult => {
  if (!password) {
    return { isValid: false, errorText: "" };
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return { isValid: false, errorText: "סיסמה קצרה מדי" };
  }

  return { isValid: true, errorText: "" };
};
