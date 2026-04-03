import prisma from "../prisma/client.js";
import { getPagination } from "../utils/pagination.js";
import { logAudit } from "./audit.service.js";

export const createVenta = async (items, userId) => {
  if (!items || items.length === 0) {
    throw new Error("La venta debe tener al menos un producto");
  }

  return await prisma.$transaction(async (tx) => {
    const productIds = items.map(i => i.productoId);
    
    // 1. Obtener todos los productos en una sola consulta
    const dbProducts = await tx.producto.findMany({
      where: { 
        id: { in: productIds },
        deletedAt: null // Solo productos activos
      }
    });

    if (dbProducts.length !== items.length) {
      throw new Error("Uno o más productos no existen o han sido eliminados");
    }

    const productsMap = new Map(dbProducts.map(p => [p.id, p]));
    let total = 0;

    // 2. Validar stock y vender
    for (const item of items) {
      const product = productsMap.get(item.productoId);
      if (product.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para ${product.nombre}`);
      }
      total += product.precioVenta * item.cantidad;
    }

    // 3. Crear cabecera de la venta
    const venta = await tx.venta.create({
      data: { total },
    });

    // 4. Auditoría (dentro de la transacción)
    await logAudit({
      usuarioId: userId,
      accion: "CREAR",
      entidad: "VENTA",
      entidadId: venta.id,
    }, tx); // Pasar el contexto de la transacción si logAudit lo soporta (opcional)

    // 5. Crear todos los detalles en una sola operación
    await tx.ventaDetalle.createMany({
      data: items.map(item => ({
        ventaId: venta.id,
        productoId: item.productoId,
        cantidad: item.cantidad,
        precio: productsMap.get(item.productoId).precioVenta,
      })),
    });

    // 6. Actualizar stock y registrar movimientos en paralelo
    await Promise.all(items.map(async (item) => {
      const product = productsMap.get(item.productoId);
      const nuevoStock = product.stock - item.cantidad;

      return Promise.all([
        tx.producto.update({
          where: { id: item.productoId },
          data: { stock: nuevoStock },
        }),
        tx.movimientoInventario.create({
          data: {
            tipo: "SALIDA",
            cantidad: item.cantidad,
            productoId: item.productoId,
            motivo: `Venta #${venta.id}`,
            stockResultante: nuevoStock,
          },
        })
      ]);
    }));

    return venta;
  });
};

export const getVentas = async ({ page, limit }) => {
  const { skip, take } = getPagination(page, limit);

  const [data, total] = await Promise.all([
    prisma.venta.findMany({
      include: { detalles: true },
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
      lastPage: Math.ceil(total / take),
    },
  };
};

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
