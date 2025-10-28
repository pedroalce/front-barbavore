import React, { useContext, lazy, Suspense } from "react";
import { AuthContext } from "../../context/AuthContext";
import ErrorBoundary from "../ErrorBoundary";
import Sidebar from "../Shared/Sidebar";
import Navbar from "../Shared/Navbar";

// Usar lazy simples e tratar erros via ErrorBoundary
const AppointmentForm = lazy(() => import("../Appointments"));
const MyAppointments = lazy(() => import("../MyAppointments"));

export default function ClientDashboard() {
  const { user } = useContext(AuthContext) ?? {};

  if (!user) {
    return <div style={{ padding: 24 }}>Por favor, faça login para acessar o painel.</div>;
  }

  return (
    <div className="app-wrapper">
      <Sidebar />

      <main className="main">
        <Navbar />

        <ErrorBoundary>
          <Suspense fallback={<div className="panel">Carregando formulário...</div>}>
            <div className="grid cols-2" style={{ alignItems: "start" }}>
              <div className="panel">
                <h3 style={{ marginTop: 0 }}>Agendar novo horário</h3>
                <AppointmentForm />
              </div>

              <aside className="panel card">
                <h4 style={{ marginTop: 0 }}>Meus agendamentos</h4>
                <Suspense fallback={<div>Carregando...</div>}>
                  <MyAppointments />
                </Suspense>
              </aside>
            </div>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}