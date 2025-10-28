import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllAppointments } from "../services/Appointments";

export default function AppointmentDetails() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    useEffect(() => {
        let mounted = true;
        getAllAppointments()
            .then((all) => {
                if (!mounted) return;
                const found = (all || []).find((a) => a.id === id) || null;
                setItem(found);
            })
            .catch((e) => {
                console.error("Falha ao carregar agendamento", e);
            });
        return () => (mounted = false);
    }, [id]);

    if (!item) return <div style={{ padding: 24 }}>Agendamento não encontrado.</div>;
    return (
        <div style={{ padding: 24 }}>
            <h2>Detalhes do Agendamento</h2>
            <div style={{ marginTop: 12 }}>
                <div><strong>Data:</strong> {item.date}</div>
                <div><strong>Cliente:</strong> {item.user}</div>
                <div><strong>Barbeiro:</strong> {item.barber}</div>
                <div><strong>Status:</strong> {item.status}</div>
                <div style={{ marginTop: 8 }}><strong>Observações:</strong><div style={{ color: "var(--muted)" }}>{item.note ?? "—"}</div></div>
            </div>
        </div>
    );
}
