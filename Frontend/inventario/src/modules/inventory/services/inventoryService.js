import api from "../../../api/axios";

export const getProducts = async () => {
  try {
    const res = await api.get("/products");
    return res.data?.data || res.data || [];
  } catch (error) {
    alert(error.response?.data?.message || "Error al obtener productos");
    throw error;
  }
};

export const createProduct = async (data) => {
  try {
    const res = await api.post("/products", data);
    return res.data;
  } catch (error) {
    alert(error.response?.data?.message || "Error al crear producto");
    throw error;
  }
};

export const updateProduct = async (id, data) => {
  try {
    const res = await api.put(`/products/${id}`, data);
    return res.data;
  } catch (error) {
    alert(error.response?.data?.message || "Error al actualizar producto");
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    alert(error.response?.data?.message || "Error al eliminar producto");
    throw error;
  }
};
