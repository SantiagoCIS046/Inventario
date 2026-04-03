import prisma from "../prisma/client.js";

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
