import prisma from "../prisma/client.js";
import { getPagination } from "../utils/pagination.js";

export const createProduct = async (data) => {
  return await prisma.producto.create({
    data,
  });
};

export const getProducts = async ({ page, limit, nombre }) => {
  const { skip, take } = getPagination(page, limit);

  const where = {
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
