import SignUpPage from "./SignUpPage";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { authService } from "../../services/auth.service";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { AUTH_MESSAGES } from "../../constants/auth.constants";
import { render, screen, waitFor } from "@testing-library/react";
import { clearSession, getAccessToken } from "../../store/auth.store";

const navigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return { ...actual, useNavigate: () => navigate };
});

const AUTH_RESULT = {
  accessToken: "a.jwt.token",
  user: {
    id: "a5f0c0de-0000-4000-8000-000000000001",
    email: "michal@ogen.co.il",
    fullName: "מיכל",
  },
};

const renderSignUpPage = () =>
  render(
    <MemoryRouter>
      <SignUpPage />
    </MemoryRouter>,
  );

const getInput = (type: string) => {
  const input = document.querySelector<HTMLInputElement>(
    `input[type="${type}"]`,
  );

  if (input === null) {
    throw new Error(`No ${type} input rendered`);
  }

  return input;
};

const fillForm = async (password: string) => {
  const user = userEvent.setup();

  await user.type(getInput("text"), "מיכל");
  await user.type(getInput("email"), "michal@ogen.co.il");
  await user.type(getInput("password"), password);

  return user;
};

describe("SignUpPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    navigate.mockClear();
    clearSession();
  });

  it("shows the sign-up form", () => {
    renderSignUpPage();

    expect(screen.getByText("הצטרפו לעוגן")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "יצירת חשבון" }),
    ).toBeInTheDocument();
  });

  it("requires agreeing to the terms", async () => {
    const signUp = vi.spyOn(authService, "signUp");
    renderSignUpPage();

    const user = await fillForm("correct-horse-battery");
    await user.click(screen.getByRole("button", { name: "יצירת חשבון" }));

    expect(signUp).not.toHaveBeenCalled();
    expect(screen.getByText(AUTH_MESSAGES.TERMS_REQUIRED)).toBeInTheDocument();
  });

  it("rejects a password the server would refuse", async () => {
    const signUp = vi.spyOn(authService, "signUp");
    renderSignUpPage();

    const user = await fillForm("short");
    await user.click(screen.getByText("תנאי השימוש"));
    await user.click(screen.getByRole("button", { name: "יצירת חשבון" }));

    expect(signUp).not.toHaveBeenCalled();
    expect(
      screen.getByText(AUTH_MESSAGES.PASSWORD_TOO_SHORT),
    ).toBeInTheDocument();
  });

  it("stores the session and goes home on success", async () => {
    const signUp = vi
      .spyOn(authService, "signUp")
      .mockResolvedValue(AUTH_RESULT);

    renderSignUpPage();

    const user = await fillForm("correct-horse-battery");
    await user.click(screen.getByText("תנאי השימוש"));
    await user.click(screen.getByRole("button", { name: "יצירת חשבון" }));

    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/"));

    expect(signUp).toHaveBeenCalledWith({
      fullName: "מיכל",
      email: "michal@ogen.co.il",
      password: "correct-horse-battery",
    });
    expect(getAccessToken()).toBe(AUTH_RESULT.accessToken);
  });

  it("shows an error when the email is already registered", async () => {
    vi.spyOn(authService, "signUp").mockRejectedValue({
      isAxiosError: true,
      response: { status: 409 },
    });

    renderSignUpPage();

    const user = await fillForm("correct-horse-battery");
    await user.click(screen.getByText("תנאי השימוש"));
    await user.click(screen.getByRole("button", { name: "יצירת חשבון" }));

    await waitFor(() =>
      expect(screen.getByText(AUTH_MESSAGES.EMAIL_TAKEN)).toBeInTheDocument(),
    );

    expect(navigate).not.toHaveBeenCalled();
  });
});
