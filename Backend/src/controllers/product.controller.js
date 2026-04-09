import { createProduct, getProducts, updateProduct, deleteProduct, getProductById } from "../services/product.service.js";
import { success } from "../utils/response.js";

export const createProductController = async (req, res, next) => {
  try {
    // Pasar req.user.id al servicio para auditoría
    const product = await createProduct(req.body, req.user.id);
    return success(res, product, 201);
  } catch (error) {
    next(error);
  }
};

export const getProductsController = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, nombre, codigoBarras } = req.query;

    const result = await getProducts({ 
      page: Number(page), 
      limit: Number(limit), 
      nombre,
      codigoBarras
    });

    return success(res, result);
  } catch (error) {
    next(error);
  }
};

export const updateProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await updateProduct(Number(id), req.body, req.user.id);
    return success(res, product);
  } catch (error) {
    next(error);
  }
};

export const borrarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Pasar req.user.id al servicio para auditoría
    await deleteProduct(Number(id), req.user.id);
    return success(res, { message: "Producto eliminado correctamente (Soft Delete)" });
  } catch (error) {
    next(error);
  }
};

export const getProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductById(Number(id));
    return success(res, product);
  } catch (error) {
    next(error);
  }
};
