import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  login: async (email, password) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      // Nuestro backend devuelve { success: true, data: { token, user } }
      const { token, user } = res.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      set({ user, token });
    } catch (error) {
      console.error("Error login", error);
      throw error;
    }
  },

  register: async (nombre, email, password) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        nombre,
        email,
        password,
      });

      const { token, user } = res.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, token });
    } catch (error) {
      console.error("Error register", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));
