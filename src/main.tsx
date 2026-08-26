import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { restoreSession } from "./store/auth.store.ts";
import { queryClient } from "./providers/query-client.ts";
import { QueryClientProvider } from "@tanstack/react-query";

restoreSession();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
