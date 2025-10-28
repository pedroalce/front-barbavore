import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext) ?? {};
  const navigate = useNavigate();

  const handleLogout = () => {
    logout?.();
    navigate("/", { replace: true });
  };

  const linkClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <div className="header">
      <div>
        <div className="title">Painel • Barbavore</div>
        <div className="meta">Organize seus agendamentos</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <NavLink to="/appointments" className={linkClass}>
          Agendar
        </NavLink>
        <NavLink to="/clients" className={linkClass}>
          Clientes
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          Configurações
        </NavLink>

        <input
          placeholder="Buscar..."
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            border: "1px solid #eaeaea",
          }}
        />

        {user ? (
          <>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>
              {user.email}
            </div>
            <button className="btn btn-ghost" onClick={handleLogout}>
              Sair
            </button>
          </>
        ) : (
          <NavLink to="/login" className={linkClass}>
            <button className="btn btn-primary">Entrar</button>
          </NavLink>
        )}
      </div>
    </div>
  );
}