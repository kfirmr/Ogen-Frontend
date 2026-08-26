import LoginPage from "./LoginPage";
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

const renderLoginPage = () =>
  render(
    <MemoryRouter>
      <LoginPage />
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

const fillCredentials = async (email: string, password: string) => {
  const user = userEvent.setup();

  await user.type(getInput("email"), email);
  await user.type(getInput("password"), password);

  return user;
};

describe("LoginPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    navigate.mockClear();
    clearSession();
  });

  it("shows the login form", () => {
    renderLoginPage();

    expect(screen.getByText("ברוכים הבאים לעוגן")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "התחבר" })).toBeInTheDocument();
  });

  it("does not call the server when a field is empty", async () => {
    const login = vi.spyOn(authService, "login");
    renderLoginPage();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "התחבר" }));

    expect(login).not.toHaveBeenCalled();
    expect(screen.getByText(AUTH_MESSAGES.MISSING_DETAILS)).toBeInTheDocument();
  });

  it("stores the session and goes home on success", async () => {
    const login = vi.spyOn(authService, "login").mockResolvedValue(AUTH_RESULT);

    renderLoginPage();

    const user = await fillCredentials(
      "michal@ogen.co.il",
      "correct-horse-battery",
    );
    await user.click(screen.getByRole("button", { name: "התחבר" }));

    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/"));

    expect(login).toHaveBeenCalledWith({
      email: "michal@ogen.co.il",
      password: "correct-horse-battery",
    });
    expect(getAccessToken()).toBe(AUTH_RESULT.accessToken);
  });

  it("shows an error and stays put when the credentials are wrong", async () => {
    vi.spyOn(authService, "login").mockRejectedValue({
      isAxiosError: true,
      response: { status: 401 },
    });

    renderLoginPage();

    const user = await fillCredentials("michal@ogen.co.il", "wrong-password");
    await user.click(screen.getByRole("button", { name: "התחבר" }));

    await waitFor(() =>
      expect(
        screen.getByText(AUTH_MESSAGES.INVALID_CREDENTIALS),
      ).toBeInTheDocument(),
    );

    expect(navigate).not.toHaveBeenCalled();
    expect(getAccessToken()).toBeNull();
  });
});
