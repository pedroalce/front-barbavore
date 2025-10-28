import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

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