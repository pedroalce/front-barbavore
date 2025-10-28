import React, { createContext, useState, useEffect } from "react";

// Criando o contexto
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("barbavore_user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.error("AuthContext: failed to read user", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Simulação de login
  const login = (email) => {
    const u = { email };
    setUser(u);
    try {
      localStorage.setItem("barbavore_user", JSON.stringify(u));
    } catch (e) {
      console.error("AuthContext: failed to save user", e);
    }
  };

  // Simulação de logout
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("barbavore_user");
    } catch (e) {
      console.error("AuthContext: failed to remove user", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ...compatibilidade: export default também para casos que importam default...
export default AuthProvider;
