import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // On mount, decode the token to restore the user
  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    const jwt = data.data.token;
    const payload = JSON.parse(atob(jwt.split(".")[1]));

    localStorage.setItem("token", jwt);
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    setToken(jwt);
    setUser(payload);

    return payload;
  };

  const register = async (formData) => {
    const { data } = await axios.post(`${API_URL}/auth/register`, formData);
    return data.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.rol === "ADMIN";

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
