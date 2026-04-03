import { createMovimiento, getKardex } from "../services/inventory.service.js";

export const registrarMovimiento = async (req, res, next) => {
  try {
    const movimiento = await createMovimiento(req.body);
    res.json(movimiento);
  } catch (error) {
    next(error);
  }
};

export const obtenerKardex = async (req, res, next) => {
  try {
    const { productoId, fechaInicio, fechaFin, page = 1, limit = 10 } = req.query;

    const result = await getKardex({
      productoId: productoId ? Number(productoId) : undefined,
      fechaInicio,
      fechaFin,
      page: Number(page),
      limit: Number(limit)
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};
