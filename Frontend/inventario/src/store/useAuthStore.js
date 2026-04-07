import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axios";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: async (email, password) => {
        try {
          const res = await api.post("/auth/login", { email, password });
          const { token, user } = res.data.data;
          set({ user, token });
        } catch (error) {
          console.error("Error login", error);
          throw error;
        }
      },

      register: async (nombre, email, password) => {
        try {
          const res = await api.post("/auth/register", { nombre, email, password });
          const { token, user } = res.data.data;
          set({ user, token });
        } catch (error) {
          console.error("Error register", error);
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", // Nombre de la llave en localStorage
    }
  )
);
