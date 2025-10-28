import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext) ?? {};
    const linkClass = ({ isActive }) => (isActive ? "active" : "");

    return (
        <aside className="sidebar">
            <div className="logo">
                <div className="mark">B</div>
                <div>
                    <div style={{ fontSize: 12, opacity: 0.9 }}>BARBAVORE</div>
                    <div style={{ fontSize: 11, opacity: 0.6 }}>Be styled & relaxed</div>
                </div>
            </div>

            <nav aria-label="main">
                <NavLink to="/dashboard" className={linkClass}>
                    <span style={{ display: "inline-flex", alignItems: "center", marginRight: 10 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M3 11.5L12 3l9 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    Painel
                </NavLink>

                <NavLink to="/appointments" className={linkClass}>
                    <span style={{ display: "inline-flex", alignItems: "center", marginRight: 10 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                            <path d="M8 12h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                    </span>
                    Agendar
                </NavLink>

                <NavLink to="/clients" className={linkClass}>
                    <span style={{ display: "inline-flex", alignItems: "center", marginRight: 10 }}>👥</span> Clientes
                </NavLink>
                <NavLink to="/settings" className={linkClass}>
                    <span style={{ display: "inline-flex", alignItems: "center", marginRight: 10 }}>⚙️</span> Configurações
                </NavLink>
            </nav>

            <div style={{ marginTop: "auto", fontSize: 13, opacity: 0.85 }}>
                <div style={{ marginBottom: 8 }}>
                    Usuário: <strong>{user?.email ?? "convidado"}</strong>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    {user ? (
                        <button className="btn btn-ghost" style={{ flex: 1 }} onClick={logout}>
                            Sair
                        </button>
                    ) : (
                        <NavLink to="/login" className="btn btn-ghost" style={{ textDecoration: "none", textAlign: "center", padding: 10 }}>
                            Entrar
                        </NavLink>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;