import { createMovimiento, getKardex } from "../services/inventory.service.js";

export const registrarMovimiento = async (req, res) => {
  try {
    const movimiento = await createMovimiento(req.body);
    res.json(movimiento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerKardex = async (req, res) => {
  try {
    const { productoId, fechaInicio, fechaFin } = req.query;

    const kardex = await getKardex({
      productoId: productoId ? Number(productoId) : undefined,
      fechaInicio,
      fechaFin,
    });

    res.json(kardex);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
