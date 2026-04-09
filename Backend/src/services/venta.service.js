import prisma from "../prisma/client.js";
import { getPagination } from "../utils/pagination.js";

/**
 * Crea una nueva venta con sus detalles, descuenta stock y registra movimientos.
 */
export const crearVenta = async (data) => {
  const { productos, metodoPago } = data;

  if (!productos || productos.length === 0) {
    throw new Error("No hay productos en la venta");
  }

  const normalizedMetodo = metodoPago?.toLowerCase();
  if (!["efectivo", "transferencia"].includes(normalizedMetodo)) {
    throw new Error("Método de pago inválido");
  }

  return await prisma.$transaction(async (tx) => {
    let totalAcumulado = 0;
    const detalles = [];

    // 1. Validar productos y calcular totales
    for (const item of productos) {
      const producto = await tx.producto.findUnique({
        where: { id: item.productoId }
      });

      if (!producto) {
        throw new Error(`Producto ID ${item.productoId} no existe`);
      }

      if (producto.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para: ${producto.nombre}`);
      }

      const subtotal = Number(producto.precio) * item.cantidad;
      totalAcumulado += subtotal;

      detalles.push({
        productoId: producto.id,
        cantidad: item.cantidad,
        precioUnitario: producto.precio,
        subtotal
      });
    }

    // 2. Crear cabecera de la venta con detalles anidados
    const venta = await tx.venta.create({
      data: {
        total: totalAcumulado,
        metodoPago: normalizedMetodo,
        detalles: {
          create: detalles
        }
      },
      include: {
        detalles: true
      }
    });

    // 3. Actualizar stock y registrar movimientos
    for (const item of productos) {
      const productoActual = await tx.producto.findUnique({
        where: { id: item.productoId }
      });
      const nuevoStock = productoActual.stock - item.cantidad;

      // Actualizar producto
      await tx.producto.update({
        where: { id: item.productoId },
        data: { stock: nuevoStock }
      });

      // Crear movimiento de inventario para trazabilidad
      await tx.movimientoInventario.create({
        data: {
          productoId: item.productoId,
          tipo: "SALIDA",
          cantidad: item.cantidad,
          stockResultante: nuevoStock,
          motivo: `VENTA #${venta.id}`
        }
      });
    }

    return venta;
  });
};

/**
 * Obtiene el historial de ventas paginado.
 */
export const getVentas = async ({ page = 1, limit = 10 }) => {
  const { skip, take } = getPagination(page, limit);

  const [data, total] = await Promise.all([
    prisma.venta.findMany({
      include: { detalles: { include: { producto: true } } },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.venta.count(),
  ]);

  return {
    data,
    meta: {
      total,
      page: Number(page),
      lastPage: Math.ceil(total / (take || 1)),
    },
  };
};

/**
 * Obtiene una venta específica por su ID.
 */
export const getVentaById = async (id) => {
  const venta = await prisma.venta.findUnique({
    where: { id: Number(id) },
    include: {
      detalles: {
        include: {
          producto: true
        }
      }
    }
  });

  if (!venta) {
    throw new Error("Venta no encontrada");
  }

  return venta;
};
