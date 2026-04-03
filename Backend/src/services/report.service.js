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

  return await Promise.all(
    data.map(async (item) => {
      const producto = await prisma.producto.findUnique({
        where: { id: item.productoId },
      });

      return {
        producto: producto.nombre,
        totalVendido: item._sum.cantidad,
      };
    })
  );
};
