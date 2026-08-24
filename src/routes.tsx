import type { JSX } from "react";
import HomePage from "./pages/Home/HomePage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import SignUpPage from "./pages/SignUp/SignUpPage.tsx";

interface IRoute {
  path: string;
  element: JSX.Element;
}

export const routes: IRoute[] = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
];
