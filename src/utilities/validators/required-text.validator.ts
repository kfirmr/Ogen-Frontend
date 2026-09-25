import { VALIDATION_MESSAGES } from "../../constants/validation.constants";
import { type IValidationResult } from "../../interfaces/validation-result.interface";

export const validateRequiredText = (value: string): IValidationResult => {
  const isValid = value.trim() !== "";

  return {
    isValid,
    errorText: isValid ? "" : VALIDATION_MESSAGES.REQUIRED,
  };
};
