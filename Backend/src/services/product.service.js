import prisma from "../prisma/client.js";

export const createProduct = async (data) => {
  return await prisma.producto.create({
    data,
  });
};

export const getProducts = async () => {
  return await prisma.producto.findMany();
};
