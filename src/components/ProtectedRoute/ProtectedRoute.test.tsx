import ProtectedRoute from "./ProtectedRoute";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import { setSession, clearSession } from "../../store/auth.store";

const SESSION = {
  accessToken: "a.jwt.token",
  user: {
    id: "a5f0c0de-0000-4000-8000-000000000001",
    email: "michal@ogen.co.il",
    fullName: "מיכל",
  },
};

const renderProtected = () =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div>תוכן מוגן</div>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<div>מסך התחברות</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("ProtectedRoute", () => {
  beforeEach(() => {
    clearSession();
  });

  it("sends an anonymous visitor to the login screen", () => {
    renderProtected();

    expect(screen.getByText("מסך התחברות")).toBeInTheDocument();
    expect(screen.queryByText("תוכן מוגן")).not.toBeInTheDocument();
  });

  it("renders the protected content for a signed-in user", () => {
    setSession(SESSION);

    renderProtected();

    expect(screen.getByText("תוכן מוגן")).toBeInTheDocument();
  });
});
