import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const register = async ({ nombre, email, password, rol }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.usuario.create({
    data: {
      nombre,
      email,
      password: hashedPassword,
      rol,
    },
    select: {
      id: true,
      nombre: true,
      email: true,
      rol: true,
    },
  });
};

export const login = async ({ email, password }) => {
  const user = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!user || user.deletedAt) throw new Error("Usuario no existe o ha sido eliminado");

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) throw new Error("Contraseña incorrecta");

  const token = jwt.sign(
    {
      id: user.id,
      rol: user.rol,
    },
    SECRET,
    { expiresIn: "8h" }
  );

  return { token };
};
