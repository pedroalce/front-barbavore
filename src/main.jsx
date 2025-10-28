import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error('Root element not found. Ensure index.html has a <div id="root"></div>');
}
const root = createRoot(rootEl);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </AuthProvider>
  </React.StrictMode>
);