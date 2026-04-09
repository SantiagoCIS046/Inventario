import prisma from "../prisma/client.js";

export const ventasHoy = async () => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const data = await prisma.venta.groupBy({
    by: ["metodoPago"],
    _sum: {
      total: true
    },
    where: {
      fecha: {
        gte: hoy
      }
    }
  });

  return data;
};
