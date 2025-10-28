import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext) ?? {};
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      await Promise.resolve(login?.(email));
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login failed", err);
      setError("Falha ao tentar entrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "12px auto", padding: 24 }}>
      <div className="panel">
        <h2 style={{ marginTop: 0 }}>Entrar no Barbavore</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </label>
          </div>

          {error && (
            <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
            <Link to="/">
              <button type="button" className="btn btn-ghost">
                Voltar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}