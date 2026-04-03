import { createVenta, getVentas } from "../services/sales.service.js";

export const crearVenta = async (req, res) => {
  try {
    const venta = await createVenta(req.body.items);
    res.json(venta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerVentas = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await getVentas({
      page: Number(page),
      limit: Number(limit)
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
