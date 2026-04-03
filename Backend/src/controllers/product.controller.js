import * as productService from "../services/product.service.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, nombre } = req.query;

    const result = await productService.getProducts({ 
      page: Number(page), 
      limit: Number(limit), 
      nombre 
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};
