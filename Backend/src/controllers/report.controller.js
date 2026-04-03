import * as reportService from "../services/report.service.js";

export const getDashboard = async (req, res, next) => {
  try {
    const { fechaInicio, fechaFin } = req.query;

    const ingresos = await reportService.ingresosTotales(fechaInicio, fechaFin);
    const productos = await reportService.topProductos();

    res.json({
      ingresos,
      productos,
    });
  } catch (error) {
    next(error);
  }
};

