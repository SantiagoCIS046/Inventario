import { createProduct, getProducts, deleteProduct } from "../services/product.service.js";
import { logAudit } from "../services/audit.service.js";

export const createProductController = async (req, res, next) => {
  try {
    const product = await createProduct(req.body);

    // Auditoría
    await logAudit({
      usuarioId: req.user.id,
      accion: "CREAR",
      entidad: "PRODUCTO",
      entidadId: product.id,
    });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const getProductsController = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, nombre } = req.query;

    const result = await getProducts({ 
      page: Number(page), 
      limit: Number(limit), 
      nombre 
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const borrarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteProduct(Number(id));
    res.json({ message: "Producto eliminado correctamente (Soft Delete)" });
  } catch (error) {
    next(error);
  }
};
