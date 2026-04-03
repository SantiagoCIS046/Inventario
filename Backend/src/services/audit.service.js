import prisma from "../prisma/client.js";

export const logAudit = async ({ usuarioId, accion, entidad, entidadId }) => {
  return await prisma.auditoria.create({
    data: {
      usuarioId,
      accion,
      entidad,
      entidadId,
    },
  });
};
