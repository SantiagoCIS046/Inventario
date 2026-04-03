import api from "../../../api/axios";

export const getInvoices = async () => {
  const res = await api.get("/invoices");
  return res.data?.data || res.data || [];
};

export const getInvoiceById = async (id) => {
  const res = await api.get(`/invoices/${id}`);
  return res.data?.data || res.data || null;
};

export const createInvoice = async (data) => {
  const res = await api.post("/invoices", data);
  return res.data;
};
