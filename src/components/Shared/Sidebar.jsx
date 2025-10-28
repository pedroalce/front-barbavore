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
                {links.map(({ to, icon, label }) => (
                    <a key={to} href={to} className="sidebar-link">
                        <span style={{ display: "inline-flex", alignItems: "center", marginRight: 10 }}>
                            {icon}
                        </span>
                        {label}
                    </a>
                ))}
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