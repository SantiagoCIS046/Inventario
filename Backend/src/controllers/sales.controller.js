import { createVenta, getVentas } from "../services/sales.service.js";
import { success } from "../utils/response.js";

export const crearVenta = async (req, res, next) => {
  try {
    // Pasar req.user.id al servicio para auditoría
    const venta = await createVenta(req.body.items, req.user.id);
    return success(res, venta, 201);
  } catch (error) {
    next(error);
  }
};

export const obtenerVentas = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await getVentas({
      page: Number(page),
      limit: Number(limit)
    });

    return success(res, result);
  } catch (error) {
    next(error);
  }
};
