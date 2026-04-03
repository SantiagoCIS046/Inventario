import { z } from "zod";

export const createProductSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  categoria: z.string().min(2, "La categoría es requerida"),
  precioCompra: z.number().positive("El precio de compra debe ser mayor a 0"),
  precioVenta: z.number().positive("El precio de venta debe ser mayor a 0"),
  stock: z.number().int().nonnegative("El stock no puede ser negativo"),
});
