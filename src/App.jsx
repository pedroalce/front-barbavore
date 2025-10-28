import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/global.css";

const ClientDashboard = lazy(() => import("./components/Dashboard/ClientDashboard"));
// opcional: se existir, manter o import do BarberDashboard
const BarberDashboard = lazy(() => import("./components/Dashboard/BarberDashboard"));

export default function App() {
  return (
    <Router>
      <div id="app-root">
        <h1>Barbavore</h1>

        <ErrorBoundary>
          <Suspense fallback={<div>Carregando painel...</div>}>
            {/* Rendera o dashboard do cliente por padrão */}
            <ClientDashboard />
            {/* <BarberDashboard /> // descomente se desejar exibir o painel do barbeiro também */}
          </Suspense>
        </ErrorBoundary>
      </div>
    </Router>
  );
}