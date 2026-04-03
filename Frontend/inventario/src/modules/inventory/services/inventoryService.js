import axios from "axios";

const API = "http://localhost:3000/api/products";

export const getProducts = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API}/${id}`);
};
