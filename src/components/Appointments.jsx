import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAvailableBarbers } from "../services/barbers"; // nova função

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Faça login para agendar.");
      return;
    }
    const payload = { user: user.email, barber, date, note };
    console.log("Novo agendamento:", payload);
    alert("Agendamento criado (exemplo).");
    setDate("");
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <label>
        Data/Hora:
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <label>
        Observações:
        <input value={note} onChange={(e) => setNote(e.target.value)} />
      </label>
      <button type="submit">Agendar</button>
    </form>
  );
}