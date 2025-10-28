import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="header">
      <div>
        <div className="title">Painel • Barbavore</div>
        <div className="meta">Organize seus agendamentos</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <input
          placeholder="Buscar..."
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            border: "1px solid #eaeaea",
          }}
        />
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          U
        </div>
      </div>
    </div>
  );
}