import prisma from "../prisma/client.js";

export const createMovimiento = async ({ tipo, cantidad, productoId, motivo }) => {
  return await prisma.$transaction(async (tx) => {

    const producto = await tx.producto.findUnique({
      where: { id: productoId },
    });

    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    let nuevoStock = producto.stock;

    if (tipo === "ENTRADA") {
      nuevoStock += cantidad;
    }

    if (tipo === "SALIDA") {
      if (producto.stock < cantidad) {
        throw new Error("Stock insuficiente");
      }
      nuevoStock -= cantidad;
    }

    const movimiento = await tx.movimientoInventario.create({
      data: {
        tipo,
        cantidad,
        motivo,
        productoId,
        stockResultante: nuevoStock,
      },
    });

    await tx.producto.update({
      where: { id: productoId },
      data: {
        stock: nuevoStock,
      },
    });

    return movimiento;
  });
};

export const getKardex = async ({ productoId, fechaInicio, fechaFin }) => {
  return await prisma.movimientoInventario.findMany({
    where: {
      ...(productoId && { productoId }),

      ...(fechaInicio && fechaFin && {
        createdAt: {
          gte: new Date(fechaInicio),
          lte: new Date(fechaFin),
        },
      }),
    },
    include: {
      producto: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
