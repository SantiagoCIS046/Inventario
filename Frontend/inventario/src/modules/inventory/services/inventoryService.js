import axios from "axios";

const API = "http://localhost:3000/api/products";

export const getProducts = async () => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (error) {
    alert(error.response?.data?.message || "Error al obtener productos");
    throw error;
  }
};

export const createProduct = async (data) => {
  try {
    const res = await axios.post(API, data);
    return res.data;
  } catch (error) {
    alert(error.response?.data?.message || "Error al crear producto");
    throw error;
  }
};

export const updateProduct = async (id, data) => {
  try {
    const res = await axios.put(`${API}/${id}`, data);
    return res.data;
  } catch (error) {
    alert(error.response?.data?.message || "Error al actualizar producto");
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API}/${id}`);
  } catch (error) {
    alert(error.response?.data?.message || "Error al eliminar producto");
    throw error;
  }
};
