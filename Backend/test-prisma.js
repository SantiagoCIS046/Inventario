require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log("Conectando a:", process.env.DATABASE_URL);
  const dummyProduct = await prisma.producto.create({
    data: {
      nombre: "Producto de prueba",
      categoria: "Prueba",
      precioCompra: 10,
      precioVenta: 20,
      stock: 5
    }
  });
  console.log("Producto creado con éxito:", dummyProduct);
  const productos = await prisma.producto.findMany();
  console.log("Total de productos en la base de datos:", productos.length);
}

main()
  .catch(e => {
    console.error("Error al conectar o insertar:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
