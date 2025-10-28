import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./MyAppointments.css";

export default function MyAppointments() {
  const { user } = useContext(AuthContext) ?? {};
  const [items, setItems] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }
    try {
      // exemplo: carregar agendamentos fictícios por usuário
      const raw = localStorage.getItem(`appointments_${user.email}`);
      const parsed = raw ? JSON.parse(raw) : [];
      setItems(parsed);
    } catch (e) {
      console.error("Falha ao carregar agendamentos", e);
      setItems([]);
    }
  }, [user]);

  const handleCancel = async (id) => {
    try {
      // lógica para cancelar agendamento (atualizar localStorage, etc.)
      setItems((prev) => prev.filter((item) => item.id !== id));
      setFeedback("Agendamento cancelado com sucesso.");
    } catch (err) {
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
      <ul className="appointments-list">
        {items.map((a, i) => (
          <li key={i} className="appointment-card">
            <p><strong>Serviço:</strong> {a.service}</p>
            <p><strong>Data:</strong> {a.date}</p>
            <p><strong>Hora:</strong> {a.time}</p>
            <button onClick={() => handleCancel(a.id)} className="btn-cancel">
              Cancelar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}