import prisma from "../prisma/client.js";

export const createVenta = async (items) => {
  return await prisma.$transaction(async (tx) => {

    let total = 0;

    // 1. Validar productos y calcular total
    for (const item of items) {
      const producto = await tx.producto.findUnique({
        where: { id: item.productoId },
      });

      if (!producto) {
        throw new Error(`Producto ${item.productoId} no existe`);
      }

      if (producto.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para ${producto.nombre}`);
      }

      total += producto.precioVenta * item.cantidad;
    }

    // 2. Crear venta
    const venta = await tx.venta.create({
      data: {
        total,
      },
    });

    // 3. Crear detalles + actualizar stock + movimientos
    for (const item of items) {
      const producto = await tx.producto.findUnique({
        where: { id: item.productoId },
      });

      const nuevoStock = producto.stock - item.cantidad;

      // detalle
      await tx.ventaDetalle.create({
        data: {
          ventaId: venta.id,
          productoId: item.productoId,
          cantidad: item.cantidad,
          precio: producto.precioVenta,
        },
      });

      // actualizar stock
      await tx.producto.update({
        where: { id: item.productoId },
        data: {
          stock: nuevoStock,
        },
      });

      // movimiento inventario
      await tx.movimientoInventario.create({
        data: {
          tipo: "SALIDA",
          cantidad: item.cantidad,
          productoId: item.productoId,
          motivo: `Venta #${venta.id}`,
          stockResultante: nuevoStock,
        },
      });
    }

    return venta;
  });
};
