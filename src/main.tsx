import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NuqsAdapter } from "nuqs/adapters/react";

import "./index.css";
import App from "./App.tsx";
import QueryProvider from "./context/query-provider.tsx";
import { QueryLoadingBoundary } from "./context/QueryLoadingBoundary.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <NuqsAdapter>
        <QueryLoadingBoundary>
          <App />
          <ToastContainer />
        </QueryLoadingBoundary>
      </NuqsAdapter>
    </QueryProvider>
  </StrictMode>
);
