import { z } from "zod";

export const createVentaSchema = z.object({
  items: z.array(
    z.object({
      productoId: z.number().int(),
      cantidad: z.number().int().positive("La cantidad debe ser mayor a 0"),
    })
  ).min(1, "Debe incluir al menos un producto en la venta"),
});
