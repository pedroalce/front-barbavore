import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/global.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <Router>
      {/* Cabeçalho sempre visível */}
      <header style={{ padding: 16, borderBottom: "1px solid #eee", background: "var(--panel)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
            B
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Barbavore</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Agendamentos</div>
          </div>
        </div>
      </header>

      <main style={{ padding: 24 }}>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </main>
    </Router>
  );
}