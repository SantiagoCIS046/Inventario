import api from "../../../api/axios";

export const getDashboardStats = async () => {
  const res = await api.get("/reports/dashboard");
  return res.data;
};

export const exportVentasExcel = async () => {
  const res = await api.get("/reports/ventas/excel", {
    responseType: "blob",
  });
  
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "ventas.xlsx");
  document.body.appendChild(link);
  link.click();
  link.remove();
};
