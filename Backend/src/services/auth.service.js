import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const register = async ({ nombre, email, password, rol }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  // Lógica para asignar ADMIN automáticamente a Santiago
  const finalRol = email === "santiagocisneros046@gmail.com" ? "ADMIN" : (rol || "VENDEDOR");

  const user = await prisma.usuario.create({
    data: {
      nombre,
      email,
      password: hashedPassword,
      rol: finalRol,
    },
    select: {
      id: true,
      nombre: true,
      email: true,
      rol: true,
    },
  });

  // Generar token para login automático tras registro
  const token = jwt.sign(
    {
      id: user.id,
      rol: user.rol,
    },
    SECRET,
    { expiresIn: "8h" }
  );

  return { token, user };
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

  return { 
    token,
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol
    }
  };
};
