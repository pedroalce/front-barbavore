import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
    const { user, logout } = useContext(AuthContext) ?? {};
    if (!user) return <div style={{ padding: 24 }}>Faça login para ver o perfil.</div>;
    return (
        <div style={{ padding: 24 }}>
            <h2>Meu Perfil</h2>
            <div style={{ marginTop: 12 }}>
                <div><strong>Email:</strong> {user.email}</div>
                {/* ...existing code... additional profile fields can go here */}
            </div>
            <div style={{ marginTop: 18 }}>
                <button className="btn btn-ghost" onClick={() => { logout(); }}>
                    Sair
                </button>
            </div>
        </div>
    );
}