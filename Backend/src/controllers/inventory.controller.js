import { createMovimiento, getKardex } from "../services/inventory.service.js";
import { success } from "../utils/response.js";

export const registrarMovimiento = async (req, res, next) => {
  try {
    const movimiento = await createMovimiento(req.body);
    return success(res, movimiento, 201);
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

    return success(res, result);
  } catch (error) {
    next(error);
  }
};
