import express from 'express';
import prisma from './lib/prisma.js';
import 'dotenv/config';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// 🔹 POST - Crear producto
app.post('/productos', async (req, res) => {
  try {
    const { nombre, categoria, precioCompra, precioVenta, stock } = req.body;

    const nuevoProducto = await prisma.producto.create({
      data: {
        nombre,
        categoria,
        precioCompra,
        precioVenta,
        stock
      }
    });

    res.json(nuevoProducto);

  } catch (error) {
    console.error("🔥 ERROR REAL:", error); // 👈 AQUÍ ESTÁ LA CLAVE
    res.status(500).json({
      error: error.message,   // 👈 ahora verás el error real
      detalle: error
    });
  }
});

// 🔹 GET - Obtener productos
app.get('/productos', async (req, res) => {
  try {
    const productos = await prisma.producto.findMany();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// 🔹 GET por ID - Obtener un producto
app.get('/productos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await prisma.producto.findUnique({
      where: { id: Number(id) }
    });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar producto' });
  }
});

// 🔹 PUT - Actualizar producto
app.put('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const producto = await prisma.producto.update({
      where: { id: Number(id) },
      data
    });

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar' });
  }
});

// 🔹 DELETE - Eliminar producto
app.delete('/productos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.producto.delete({
      where: { id: Number(id) }
    });

    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
