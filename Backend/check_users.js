import { PrismaClient } from '@prisma/client';
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.usuario.findMany();
    console.log('USUARIOS EN DB:', users);
  } catch (error) {
    console.error('ERROR AL LISTAR USUARIOS:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
