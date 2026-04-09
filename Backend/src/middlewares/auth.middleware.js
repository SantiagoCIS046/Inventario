import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const SECRET = process.env.JWT_SECRET;

  if (!SECRET) {
    console.error("❌ JWT_SECRET no definido en el servidor");
    return res.status(500).json({ error: "Error interno de configuración" });
  }

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No autorizado: Token mal formado o inexistente" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const message = error.name === "TokenExpiredError" 
      ? "Sesión expirada" 
      : "Token inválido";
    res.status(401).json({ error: message });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.rol !== "ADMIN") {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  next();
};
