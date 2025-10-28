import React, { useEffect, useState } from "react";
import { getAllAppointments } from "../services/Appointments";

export default function Clients() {
    const [clients, setClients] = useState([]);
    useEffect(() => {
        let mounted = true;
        getAllAppointments()
            .then((all) => {
                if (!mounted) return;
                const map = {};
                (all || []).forEach((a) => {
                    if (a.user) map[a.user] = (map[a.user] || 0) + 1;
                });
                setClients(Object.entries(map).map(([email, count]) => ({ email, count })));
            })
            .catch((e) => {
                console.error("Falha ao carregar clientes", e);
                if (mounted) setClients([]);
            });
        return () => (mounted = false);
    }, []);
    return (
        <div style={{ padding: 24 }}>
            <h2>Clientes</h2>
            {clients.length === 0 ? (
                <div>Nenhum cliente encontrado.</div>
            ) : (
                <ul>
                    {clients.map((c) => (
                        <li key={c.email} style={{ padding: 8 }}>
                            {c.email} <small style={{ color: "var(--muted)" }}>({c.count} agend.)</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
