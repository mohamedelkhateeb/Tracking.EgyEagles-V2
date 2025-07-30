import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NuqsAdapter } from "nuqs/adapters/react";

import "./index.css";
import App from "./App.tsx";
import QueryProvider from "./context/query-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { QueryLoadingBoundary } from "./context/QueryLoadingBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <NuqsAdapter>
        <QueryLoadingBoundary>
          <App />
        </QueryLoadingBoundary>
      </NuqsAdapter>
      <Toaster />
    </QueryProvider>
  </StrictMode>
);
