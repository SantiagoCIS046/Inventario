import { createVenta } from "../services/sales.service.js";

export const crearVenta = async (req, res) => {
  try {
    const venta = await createVenta(req.body.items);
    res.json(venta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
