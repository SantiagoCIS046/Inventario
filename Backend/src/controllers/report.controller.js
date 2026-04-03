import * as reportService from "../services/report.service.js";
import { success } from "../utils/response.js";

export const getDashboard = async (req, res, next) => {
  try {
    const stats = await reportService.getAdvancedDashboardStats(); // Usar la nueva versión avanzada
    return success(res, stats);
  } catch (error) {
    next(error);
  }
};

export const exportVentas = async (req, res, next) => {
  try {
    const workbook = await reportService.exportVentasExcel();
    
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=ventas.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
};
