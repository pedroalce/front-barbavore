import React, { useState, useEffect } from "react";

export default function Settings() {
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        const t = localStorage.getItem("barbavore_theme") || "light";
        setTheme(t);
    }, []);
    const save = () => {
        localStorage.setItem("barbavore_theme", theme);
        alert("Configurações salvas (exemplo).");
    };
    return (
        <div style={{ padding: 24 }}>
            <h2>Configurações</h2>
            <div style={{ marginTop: 12 }}>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input type="radio" name="theme" value="light" checked={theme === "light"} onChange={() => setTheme("light")} /> Claro
                </label>
                <label style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
                    <input type="radio" name="theme" value="dark" checked={theme === "dark"} onChange={() => setTheme("dark")} /> Escuro
                </label>
            </div>
            <div style={{ marginTop: 12 }}>
                <button className="btn btn-primary" onClick={save}>Salvar</button>
            </div>
        </div>
    );
}
