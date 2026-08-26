import {
  setSession,
  clearSession,
  restoreSession,
} from "../../store/auth.store";

import HomePage from "./HomePage";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { levelService } from "../../services/level.service";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const SESSION = {
  accessToken: "a.jwt.token",
  user: {
    id: "a5f0c0de-0000-4000-8000-000000000001",
    email: "michal@ogen.co.il",
    fullName: "מיכל בדיקה",
  },
};

const USER_PROGRESS = {
  totalXp: 150,
  currentLevel: 2,
  xpToNextLevel: 150,
  currentLevelTitle: "חוסך מתמיד",
  nextLevelTitle: "מנהל תקציב",
  nextLevelNumber: 3,
  xpRequiredForNextLevel: 300,
};

const renderHomePage = () =>
  render(
    <QueryClientProvider
      client={
        new QueryClient({ defaultOptions: { queries: { retry: false } } })
      }
    >
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </QueryClientProvider>,
  );

describe("HomePage", () => {
  beforeEach(() => {
    clearSession();
    vi.restoreAllMocks();
    vi.spyOn(levelService, "getUserProgress").mockResolvedValue(USER_PROGRESS);
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

  it("shows the level and xp fetched from the server", async () => {
    setSession(SESSION);

    renderHomePage();

    expect(await screen.findByText("רמה 2 · חוסך מתמיד")).toBeInTheDocument();
    expect(screen.getByText("רמה 2 · 150 XP")).toBeInTheDocument();
    expect(
      screen.getByText("עוד 150 XP כדי להגיע לדרגת מנהל תקציב"),
    ).toBeInTheDocument();
  });

  it("does not request progress for a signed-out visitor", () => {
    renderHomePage();

    expect(levelService.getUserProgress).not.toHaveBeenCalled();
  });
});
