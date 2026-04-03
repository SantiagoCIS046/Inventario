import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";

export const getAllUsers = async () => {
  return await prisma.usuario.findMany({
    where: { deletedAt: null },
    select: {
      id: true,
      nombre: true,
      email: true,
      rol: true,
      createdAt: true,
    },
  });
};

export const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await prisma.usuario.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      password: hashedPassword,
      rol: data.rol || "VENDEDOR",
    },
    select: {
      id: true,
      nombre: true,
      email: true,
      rol: true,
    },
  });
};

export const updateUser = async (id, data) => {
  const updateData = {
    nombre: data.nombre,
    email: data.email,
    rol: data.rol,
  };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  return await prisma.usuario.update({
    where: { id: Number(id) },
    data: updateData,
    select: {
      id: true,
      nombre: true,
      email: true,
      rol: true,
    },
  });
};

export const deleteUser = async (id) => {
  // Soft delete
  return await prisma.usuario.update({
    where: { id: Number(id) },
    data: { deletedAt: new Date() },
  });
};
