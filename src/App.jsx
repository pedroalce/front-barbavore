import React, { Suspense, lazy, useContext } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/global.css";
// proteger import do AuthContext para evitar erro se for default ou named export
import * as AuthModule from "./context/AuthContext";
const AuthContext = AuthModule?.AuthContext ?? AuthModule?.default ?? null;

import Loader from "./components/Shared/Loader";
import Home from "./components/Home";

const ClientDashboard = lazy(() => import("./components/Dashboard/ClientDashboard"));

export default function App() {
  const { user, loading } = useContext(AuthContext) ?? {};

  return (
    <div id="app-root">
      <ErrorBoundary>
        <Suspense fallback={<div>Carregando painel...</div>}>
          {loading ? (
            <Loader />
          ) : user ? (
            <ClientDashboard />
          ) : (
            <Home />
          )}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}