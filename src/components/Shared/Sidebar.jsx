import React from "react";

const Sidebar = ({ role }) => {
    const links = [
        { to: "/dashboard", icon: "🏠", label: "Dashboard" },
        { to: "/agenda", icon: "📅", label: "Agenda" },
        { to: "/historico", icon: "📜", label: "Histórico" },
        { to: "/perfil", icon: "👤", label: "Perfil" },
        { to: "/logout", icon: "🚪", label: "Sair" },
    ];

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
                <a href="#" className="active">
                    <span style={{ display: "inline-flex", alignItems: "center", marginRight: 10 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M3 11.5L12 3l9 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    Painel
                </a>

                <a href="#">
                    <span style={{ display: "inline-flex", alignItems: "center", marginRight: 10 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                            <path d="M8 12h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                    </span>
                    Agendar
                </a>

                <a href="#"><span style={{ display: "inline-flex", alignItems: "center", marginRight: 10 }}>📅</span> Meus horários</a>
                <a href="#"><span style={{ display: "inline-flex", alignItems: "center", marginRight: 10 }}>👥</span> Clientes</a>
                <a href="#"><span style={{ display: "inline-flex", alignItems: "center", marginRight: 10 }}>⚙️</span> Configurações</a>
            </nav>

            <div style={{ marginTop: "auto", fontSize: 13, opacity: 0.85 }}>
                <div style={{ marginBottom: 8 }}>Usuário: <strong>cliente@exemplo</strong></div>
                <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-ghost" style={{ flex: 1 }}>Sair</button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;