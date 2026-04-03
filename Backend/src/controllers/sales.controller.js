import { createVenta, getVentas } from "../services/sales.service.js";

export const crearVenta = async (req, res, next) => {
  try {
    const venta = await createVenta(req.body.items);
    res.json(venta);
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

    res.json(result);
  } catch (error) {
    next(error);
  }
};
