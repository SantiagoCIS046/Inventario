import * as ventaService from "../services/venta.service.js";
import { success } from "../utils/response.js";

export const crearVenta = async (req, res, next) => {
  try {
    const venta = await ventaService.crearVenta(req.body);
    return success(res, venta, "Venta realizada correctamente", 201);
  } catch (error) {
    next(error); // El middleware de error manejará el status 400 si es necesario
  }
};
