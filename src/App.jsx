import React, { Suspense, lazy, useContext } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/global.css";
import { AuthContext } from "./context/AuthContext";
import Loader from "../components/Shared/Loader";
import Home from "./components/Home";

const ClientDashboard = lazy(() => import("./components/Dashboard/ClientDashboard"));

export default function App() {
  const { user, loading } = useContext(AuthContext);

  return (
    <div id="app-root">
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
          {loading ? (
            <Loader />
          ) : user ? (
            <Suspense fallback={<div>Carregando painel...</div>}>
              <ClientDashboard />
            </Suspense>
          ) : (
            // Home contém o formulário de login — será exibido imediatamente na página inicial
            <Home />
          )}
        </ErrorBoundary>
      </main>
    </div>
  );
}