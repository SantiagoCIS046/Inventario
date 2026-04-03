import prisma from "../prisma/client.js";
import ExcelJS from "exceljs";

export const ventasPorFecha = async (fechaInicio, fechaFin) => {
  return await prisma.venta.findMany({
    where: {
      createdAt: {
        gte: new Date(fechaInicio),
        lte: new Date(fechaFin),
      },
    },
    include: {
      detalles: true,
    },
  });
};

export const ingresosTotales = async (fechaInicio, fechaFin) => {
  const result = await prisma.venta.aggregate({
    _sum: {
      total: true,
    },
    where: {
      createdAt: {
        gte: new Date(fechaInicio),
        lte: new Date(fechaFin),
      },
    },
  });

  return result._sum.total || 0;
};

export const productosMasVendidos = async () => {
  return await prisma.ventaDetalle.groupBy({
    by: ["productoId"],
    _sum: {
      cantidad: true,
    },
    orderBy: {
      _sum: {
        cantidad: "desc",
      },
    },
    take: 5,
  });
};

export const topProductos = async () => {
  const data = await prisma.ventaDetalle.groupBy({
    by: ["productoId"],
    _sum: { cantidad: true },
    orderBy: { _sum: { cantidad: "desc" } },
    take: 5,
  });

  const productIds = data.map(item => item.productoId);
  const products = await prisma.producto.findMany({
    where: { id: { in: productIds } },
    select: { id: true, nombre: true }
  });

  const productsMap = new Map(products.map(p => [p.id, p]));

  return data.map(item => ({
    producto: productsMap.get(item.productoId)?.nombre || "Producto no encontrado",
    totalVendido: item._sum.cantidad,
  }));
};

export const exportVentasExcel = async () => {
  const ventas = await prisma.venta.findMany({
    include: {
      detalles: {
        include: {
          producto: true,
        },
      },
    },
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Ventas");

  sheet.columns = [
    { header: "Venta ID", key: "ventaId", width: 10 },
    { header: "Producto", key: "producto", width: 20 },
    { header: "Cantidad", key: "cantidad", width: 10 },
    { header: "Precio", key: "precio", width: 10 },
    { header: "Total", key: "total", width: 15 },
    { header: "Fecha", key: "fecha", width: 20 },
  ];

  ventas.forEach((venta) => {
    venta.detalles.forEach((detalle) => {
      sheet.addRow({
        ventaId: venta.id,
        producto: detalle.producto.nombre,
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        total: detalle.cantidad * detalle.precio,
        fecha: venta.createdAt,
      });
    });
  });

  return workbook;
};
