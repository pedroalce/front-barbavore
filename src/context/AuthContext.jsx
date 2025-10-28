import React, { createContext, useState, useEffect } from "react";

// Criando o contexto
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("barbavore_user");
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to load user from storage", e);
    }
  }, []);

  // Simulação de login
  const login = (email) => {
    const u = { email };
    setUser(u);
    try {
      localStorage.setItem("barbavore_user", JSON.stringify(u));
    } catch (e) {
      console.error("Failed to save user", e);
    }
  };

  // Simulação de logout
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("barbavore_user");
    } catch (e) {
      console.error("Failed to remove user", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
