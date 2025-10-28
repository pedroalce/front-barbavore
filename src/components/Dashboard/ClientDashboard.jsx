import React, { useContext, lazy, Suspense } from "react";
import { AuthContext } from "../../context/AuthContext";
import ErrorBoundary from "../ErrorBoundary";

// Usar lazy simples e tratar erros via ErrorBoundary
const AppointmentForm = lazy(() => import("../Appointments"));
const MyAppointments = lazy(() => import("../MyAppointments"));

export default function ClientDashboard() {
  const { user } = useContext(AuthContext) ?? {};

  // Proteção caso o user não esteja definido
  if (!user) {
    return <div>Por favor, faça login para acessar o painel.</div>;
  }

  return (
    <div className="client-dashboard">
      <h2>Bem-vindo, {user?.email ?? "usuário"}</h2>

      <section>
        <h3>Agendar novo horário</h3>
        <ErrorBoundary>
          <Suspense fallback={<div>Carregando formulário...</div>}>
            <AppointmentForm />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section>
        <ErrorBoundary>
          <Suspense fallback={<div>Carregando agendamentos...</div>}>
            <MyAppointments />
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  );
}