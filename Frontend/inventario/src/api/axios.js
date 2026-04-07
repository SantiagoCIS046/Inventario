import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  try {
    const authStorage = localStorage.getItem("auth-storage");
    if (!authStorage) return config;

    const parsed = JSON.parse(authStorage);
    const token = parsed?.state?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error al leer el token de seguridad:", error);
    // Si los datos están corruptos, limpiamos para prevenir el bloqueo
    localStorage.removeItem("auth-storage");
  }

  return config;
});

export default api;
