import "dotenv/config";
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    console.log("Testing dashboard query...");
    const lastWeek = new Date();
    lastWeek.setDate(new Date().getDate() - 7);

    // Test product endpoints
    const products = await prisma.producto.findMany({});
    console.log("Products: ", products.length);
    
    // Test the dashboard query logic that might fail
    const topProductsRaw = await prisma.detalleVenta.groupBy({
      by: ["productoId"],
      _sum: { cantidad: true },
      orderBy: { _sum: { cantidad: "desc" } },
      take: 5
    });
    console.log("topProductsRaw: ", topProductsRaw.length);

  } catch (error) {
    console.error("Prisma error: ", error);
  } finally {
    await pool.end();
  }
}

main();
