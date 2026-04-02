import prisma from '../prisma/prisma.js'

// Crear un producto
export const crearProducto = async (data) => {
  return await prisma.producto.create({ data })
}

// Obtener todos los productos
export const obtenerProductos = async () => {
  return await prisma.producto.findMany()
}

// Obtener un producto por ID
export const obtenerProductoPorId = async (id) => {
  return await prisma.producto.findUnique({
    where: { id: Number(id) }
  })
}

// Actualizar un producto
export const actualizarProducto = async (id, data) => {
  return await prisma.producto.update({
    where: { id: Number(id) },
    data
  })
}

// Eliminar un producto
export const eliminarProducto = async (id) => {
  return await prisma.producto.delete({
    where: { id: Number(id) }
  })
}
