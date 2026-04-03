import prisma from "../prisma/client.js";
import { getPagination } from "../utils/pagination.js";
import { logAudit } from "./audit.service.js";

export const createProduct = async (data, userId) => {
  const product = await prisma.producto.create({ data });

  await logAudit({
    usuarioId: userId,
    accion: "CREAR",
    entidad: "PRODUCTO",
    entidadId: product.id,
  });

  return product;
};

export const getProducts = async ({ page, limit, nombre }) => {
  const { skip, take } = getPagination(page, limit);

  const where = {
    deletedAt: null, // Filtro de Soft Delete
    ...(nombre && {
      nombre: {
        contains: nombre,
        mode: "insensitive",
      },
    }),
  };

  const [data, total] = await Promise.all([
    prisma.producto.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
    prisma.producto.count({ where }),
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

export const updateProduct = async (id, data, userId) => {
  const product = await prisma.producto.update({
    where: { id },
    data,
  });

  await logAudit({
    usuarioId: userId,
    accion: "ACTUALIZAR",
    entidad: "PRODUCTO",
    entidadId: id,
  });

  return product;
};

export const deleteProduct = async (id, userId) => {
  const product = await prisma.producto.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  await logAudit({
    usuarioId: userId,
    accion: "ELIMINAR",
    entidad: "PRODUCTO",
    entidadId: id,
  });

  return product;
};
