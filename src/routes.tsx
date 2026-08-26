import type { JSX } from "react";
import HomePage from "./pages/Home/HomePage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import SignUpPage from "./pages/SignUp/SignUpPage.tsx";
import { AUTH_ROUTES } from "./constants/auth.constants.ts";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";

interface IRoute {
  path: string;
  element: JSX.Element;
}

export const routes: IRoute[] = [
  {
    path: AUTH_ROUTES.HOME,
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  { path: AUTH_ROUTES.LOGIN, element: <LoginPage /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUpPage /> },
];
