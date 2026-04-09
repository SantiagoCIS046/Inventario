import { z } from "zod";

export const createProductSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  categoria: z.string().min(2, "La categoría es requerida"),
  precio: z.number().positive("El precio debe ser mayor a 0"),
  stock: z.number().int().nonnegative("El stock no puede ser negativo"),
  codigoBarras: z.string().optional(),
  talla: z.string().optional(),
});
