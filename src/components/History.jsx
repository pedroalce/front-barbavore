import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getUserAppointments } from "../services/Appointments";

export default function History() {
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
    getUserAppointments(user.email)
      .then((list) => {
        if (mounted) setItems(list || []);
      })
      .catch((e) => {
        console.error("Falha ao carregar histórico", e);
        if (mounted) setItems([]);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [user]);

  if (!user) return <div style={{ padding: 24 }}>Faça login para ver seu histórico.</div>;
  if (loading) return <div style={{ padding: 24 }}>Carregando histórico...</div>;
  if (items.length === 0) return <div style={{ padding: 24 }}>Você não possui agendamentos no histórico.</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Histórico de Agendamentos</h2>
      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        {items.map((a) => (
          <div key={a.id} style={{ padding: 12, borderRadius: 10, background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700 }}>{a.date}</div>
              <div style={{ color: "var(--muted)" }}>{a.barber ?? "—"}</div>
              <div style={{ marginTop: 6 }}>{a.note ?? "—"}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Link to={`/appointments/${a.id}`} style={{ textDecoration: "none" }} className="btn">Ver</Link>
              {/* Visualmente não altera dados — para cancelar/editar use as páginas adequadas */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
