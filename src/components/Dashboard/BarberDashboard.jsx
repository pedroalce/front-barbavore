import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getBarberAppointments, updateAppointmentStatus } from "../../services/Appointments";
import Sidebar from "../Shared/Sidebar";

const BarberDashboard = () => {
  const { user } = useContext(AuthContext) ?? {};
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }
    getBarberAppointments(user.email)
      .then((list) => {
        if (mounted) setItems(list || []);
      })
      .catch((e) => {
        console.error("Falha ao carregar agendamentos do barbeiro", e);
        if (mounted) setItems([]);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [user]);

  const changeStatus = async (id, status) => {
    try {
      const updated = await updateAppointmentStatus(id, { status });
      setItems((s) => s.map((it) => (it.id === id ? updated : it)));
    } catch (e) {
      console.error("Falha ao atualizar status", e);
      alert("Não foi possível atualizar o status.");
    }
  };

  if (!user) return <div style={{ padding: 24 }}>Faça login para acessar o painel do barbeiro.</div>;
  return (
    <div className="dashboard">
      <Sidebar role="barber" />
      <main style={{ padding: 16 }}>
        <h1>Bem-vindo, Pedro!</h1>
        <section>
          <h2>Próximo corte</h2>
          <p>Terça, 29 de Outubro – 16:00</p>
          <p>Cliente: Ignácio Timóteo</p>
        </section>
        <section>
          <h2>Agenda de hoje</h2>
          {loading ? (
            <div>Carregando agendamentos...</div>
          ) : items.length === 0 ? (
            <div>Nenhum agendamento.</div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {items.map((a) => (
                <div key={a.id} style={{ padding: 12, borderRadius: 10, background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{a.date}</div>
                    <div style={{ color: "var(--muted)" }}>{a.user}</div>
                    <div style={{ marginTop: 6 }}>{a.note ?? "—"}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {a.status !== "completed" && (
                      <button className="btn btn-primary" onClick={() => changeStatus(a.id, "completed")}>
                        Marcar como concluído
                      </button>
                    )}
                    {a.status !== "cancelled" && (
                      <button className="btn btn-ghost" onClick={() => changeStatus(a.id, "cancelled")}>
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <section>
          <h2>Histórico de cortes</h2>
          {/* Cards com estilos */}
        </section>
      </main>
    </div>
  );
};

export default BarberDashboard;