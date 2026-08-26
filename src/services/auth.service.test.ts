import { apiClient } from "./api-client";
import { authService } from "./auth.service";
import { describe, it, vi, expect, beforeEach } from "vitest";

const AUTH_RESULT = {
  accessToken: "a.jwt.token",
  user: {
    id: "a5f0c0de-0000-4000-8000-000000000001",
    email: "michal@ogen.co.il",
    fullName: "מיכל",
  },
};

describe("auth.service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("login", () => {
    it("posts the credentials to the login endpoint", async () => {
      const post = vi
        .spyOn(apiClient, "post")
        .mockResolvedValue({ data: AUTH_RESULT });

      const result = await authService.login({
        email: "michal@ogen.co.il",
        password: "correct-horse-battery",
      });

      expect(post).toHaveBeenCalledWith("/auth/login", {
        email: "michal@ogen.co.il",
        password: "correct-horse-battery",
      });
      expect(result).toEqual(AUTH_RESULT);
    });

    it("rejects a response that is not an auth result", async () => {
      vi.spyOn(apiClient, "post").mockResolvedValue({
        data: { accessToken: 42 },
      });

      await expect(
        authService.login({ email: "a@b.co", password: "12345678901" }),
      ).rejects.toThrow();
    });
  });

  describe("signUp", () => {
    it("posts the details to the sign-up endpoint", async () => {
      const post = vi
        .spyOn(apiClient, "post")
        .mockResolvedValue({ data: AUTH_RESULT });

      const result = await authService.signUp({
        fullName: "מיכל",
        email: "michal@ogen.co.il",
        password: "correct-horse-battery",
      });

      expect(post).toHaveBeenCalledWith("/auth/sign-up", {
        fullName: "מיכל",
        email: "michal@ogen.co.il",
        password: "correct-horse-battery",
      });
      expect(result).toEqual(AUTH_RESULT);
    });
  });
});
