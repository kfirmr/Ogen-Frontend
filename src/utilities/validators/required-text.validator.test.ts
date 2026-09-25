import { describe, it, expect } from "vitest";
import { validateRequiredText } from "./required-text.validator";

describe("validateRequiredText", () => {
  it("accepts any non-blank text, whatever its length or language", () => {
    expect(
      validateRequiredText("Hello שלום 123 — long text.\nSecond line"),
    ).toEqual({
      isValid: true,
      errorText: "",
    });
  });

  it("rejects empty or whitespace-only text", () => {
    expect(validateRequiredText("  \n ")).toEqual({
      isValid: false,
      errorText: "שדה חובה",
    });
  });
});
