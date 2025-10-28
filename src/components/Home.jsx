import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
    const { login } = useContext(AuthContext) ?? {};
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleQuickLogin = () => {
        login?.("cliente@exemplo");
    };

    const validateEmail = (em) => /\S+@\S+\.\S+/.test(em);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!email) {
            setError("Informe seu email.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Email inválido.");
            return;
        }

        try {
            setLoading(true);
            // login é síncrono no AuthContext atual, mantemos a estrutura async por segurança
            await Promise.resolve(login?.(email));
        } catch (err) {
            console.error("Login failed", err);
            setError("Falha ao tentar entrar.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 36 }}>
            <section className="hero panel">
                <div className="hero-content">
                    <h1>Barbavore — Agende seu corte com facilidade</h1>
                    <p>
                        Encontre barbeiros, escolha horário e gerencie seus agendamentos em um só lugar.
                        Simples, rápido e elegante.
                    </p>

                    <div style={{ marginTop: 18, display: "flex", gap: 12, alignItems: "center" }}>
                        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #e6e6e6" }}
                                disabled={loading}
                            />
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {loading ? "Entrando..." : "Entrar"}
                            </button>
                        </form>

                        <button className="btn btn-ghost" onClick={handleQuickLogin} disabled={loading}>
                            Entrar (demo)
                        </button>
                    </div>

                    {error && <div style={{ color: "crimson", marginTop: 10 }}>{error}</div>}
                </div>

                <div className="hero-illustration" aria-hidden>
                    <div
                        style={{
                            width: 260,
                            height: 160,
                            borderRadius: 12,
                            background: "linear-gradient(90deg,var(--accent),var(--accent-dark))",
                        }}
                    />
                </div>
            </section>

            <section style={{ marginTop: 18 }}>
                <h3>Por que escolher o Barbavore?</h3>
                <div
                    className="grid"
                    style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", marginTop: 12 }}
                >
                    <div className="card">
                        <strong>Agendamento rápido</strong>
                        <div style={{ color: "var(--muted)" }}>Reserve em segundos sem complicação.</div>
                    </div>
                    <div className="card">
                        <strong>Barbeiros confiáveis</strong>
                        <div style={{ color: "var(--muted)" }}>Escolha entre profissionais avaliados.</div>
                    </div>
                    <div className="card">
                        <strong>Gerencie facilmente</strong>
                        <div style={{ color: "var(--muted)" }}>Veja, cancele e edite seus horários com facilidade.</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
