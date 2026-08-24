import { routes } from "./routes.tsx";
import { createBrowserRouter } from "react-router-dom";

const fallbackRoute = {
  path: "*",
  element: <></>,
};

export const router = createBrowserRouter(
  routes.length > 0 ? routes : [fallbackRoute],
);
