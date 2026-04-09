import { fail } from "../utils/response.js";
import { logError } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  console.error('🔥 [ERROR-HANDLER]:', err);
  logError(err.message || err);

  const status = err.status || 500;

  // Manejo especial para errores de validación de Zod
  if (err.name === "ZodError") {
    return fail(res, err.errors, 400);
  }

  return fail(res, err.message || "Error interno del servidor", status);
};
