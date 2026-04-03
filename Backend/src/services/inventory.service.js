import prisma from "../prisma/client.js";
import { getPagination } from "../utils/pagination.js";

export const createMovimiento = async ({ tipo, cantidad, productoId, motivo }) => {
  return await prisma.$transaction(async (tx) => {

    const producto = await tx.producto.findUnique({
      where: { 
        id: productoId,
        deletedAt: null // Solo productos activos
      },
    });

    if (!producto) {
      throw new Error("Producto no encontrado o eliminado");
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

export const getKardex = async ({ productoId, fechaInicio, fechaFin, page, limit }) => {
  const { skip, take } = getPagination(page, limit);

  const where = {
    ...(productoId && { productoId }),
    producto: {
      deletedAt: null // Filtrar movimientos de productos eliminados (opcional, según lógica PRO)
    },
    ...(fechaInicio && fechaFin && {
      createdAt: {
        gte: new Date(fechaInicio),
        lte: new Date(fechaFin),
      },
    }),
  };

  const [data, total] = await Promise.all([
    prisma.movimientoInventario.findMany({
      where,
      include: { producto: true },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.movimientoInventario.count({ where }),
  ]);

  return {
    data,
    meta: {
      total,
      page: Number(page),
      lastPage: Math.ceil(total / take),
    },
  };
};
