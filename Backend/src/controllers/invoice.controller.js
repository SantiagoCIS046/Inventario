import * as salesService from "../services/sales.service.js";
import { success } from "../utils/response.js";

export const getInvoicesController = async (req, res, next) => {
  try {
    const data = await salesService.getVentas(req.query);
    return success(res, data);
  } catch (error) {
    next(error);
  }
};

export const getInvoiceByIdController = async (req, res, next) => {
  try {
    const data = await salesService.getVentaById(req.params.id);
    return success(res, data);
  } catch (error) {
    next(error);
  }
};

export const createInvoiceController = async (req, res, next) => {
  try {
    const { items } = req.body;
    const data = await salesService.createVenta(items, req.user.id);
    return success(res, data);
  } catch (error) {
    next(error);
  }
};
