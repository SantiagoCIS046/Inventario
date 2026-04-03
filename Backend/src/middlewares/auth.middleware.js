import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new Error("No autorizado");

    const decoded = jwt.verify(token, SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.rol !== "ADMIN") {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  next();
};
