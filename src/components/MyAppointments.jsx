import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserAppointments, deleteAppointment } from "../services/Appointments";
import "./MyAppointments.css";

export default function MyAppointments() {
  const { user } = useContext(AuthContext) ?? {};
  const [items, setItems] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    let mounted = true;
    if (!user) {
      setItems([]);
      return;
    }
    getUserAppointments(user.email)
      .then((list) => {
        if (mounted) setItems(list || []);
      })
      .catch((e) => {
        console.error("Falha ao carregar agendamentos", e);
        if (mounted) setItems([]);
      });
    return () => { mounted = false; };
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      setItems((s) => s.filter((i) => i.id !== id));
      setFeedback("Agendamento cancelado com sucesso.");
    } catch (e) {
      console.error("Failed to delete appointment", e);
      setFeedback("Erro ao cancelar agendamento.");
    }
  };

  if (!user) {
    return <div>Faça login para ver seus agendamentos.</div>;
  }

  if (items.length === 0) {
    return <div>Você não tem agendamentos.</div>;
  }

  return (
    <div className="appointments-container">
      <h3>Meus Agendamentos</h3>
      {feedback && <p className="feedback-message">{feedback}</p>}
      <div className="app-list">
        {items.map((a) => (
          <div className="app-item" key={a.id}>
            <div>
              <div style={{fontWeight:600}}>{a.date}</div>
              <div style={{color:"var(--muted)"}}>{a.note ?? "—"}</div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <button className="btn" onClick={() => alert("Detalhes (exemplo)")}>Ver</button>
              <button className="btn btn-ghost" onClick={() => handleDelete(a.id)}>Cancelar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}