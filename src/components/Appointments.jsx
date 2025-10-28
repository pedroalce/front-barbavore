import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAvailableBarbers } from "../services/barbers";
import { createAppointment } from "../services/Appointments";

export default function AppointmentForm() {
  const { user } = useContext(AuthContext) ?? {};
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [barber, setBarber] = useState("");
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    let mounted = true;
    getAvailableBarbers()
      .then((list) => {
        if (mounted) {
          setBarbers(list || []);
          if (list && list.length > 0)
            setBarber((prev) => prev || list[0].email || list[0].id);
        }
      })
      .catch((e) => {
        console.error("Failed to load barbers", e);
        if (mounted) setBarbers([]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Faça login para agendar.");
      return;
    }
    try {
      const payload = { user: user.email, barber, date, note };
      await createAppointment(payload);
      alert("Agendamento criado.");
      setDate("");
      setNote("");
    } catch (err) {
      console.error("Failed to create appointment", err);
      alert("Erro ao criar agendamento.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Selecione barbeiro:
          <select value={barber} onChange={(e) => setBarber(e.target.value)}>
            <option value="">— selecione —</option>
            {barbers.map((b) => (
              <option key={b.id ?? b.email} value={b.email ?? b.id}>
                {b.name ?? b.email}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>
          Data/Hora:
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Observações:
          <input value={note} onChange={(e) => setNote(e.target.value)} />
        </label>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn-primary" type="submit">
          Agendar
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            setDate("");
            setNote("");
          }}
        >
          Limpar
        </button>
      </div>
    </form>
  );
}