import * as productService from "../services/product.service.js";

export const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, nombre } = req.query;

    const result = await productService.getProducts({ 
      page: Number(page), 
      limit: Number(limit), 
      nombre 
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
