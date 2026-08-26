import HomePage from "./HomePage";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import {
  setSession,
  clearSession,
  restoreSession,
} from "../../store/auth.store";

const SESSION = {
  accessToken: "a.jwt.token",
  user: {
    id: "a5f0c0de-0000-4000-8000-000000000001",
    email: "michal@ogen.co.il",
    fullName: "מיכל בדיקה",
  },
};

const renderHomePage = () =>
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

describe("HomePage", () => {
  beforeEach(() => {
    clearSession();
  });

  it("greets the signed-in user", () => {
    setSession(SESSION);

    renderHomePage();

    expect(screen.getByText("שלום, מיכל בדיקה")).toBeInTheDocument();
  });

  it("still greets the right user after a refresh restores the session", () => {
    setSession(SESSION);
    restoreSession();

    renderHomePage();

    expect(screen.getByText("שלום, מיכל בדיקה")).toBeInTheDocument();
  });
});
