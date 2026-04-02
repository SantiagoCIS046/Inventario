import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto
} from '../services/producto.service.js'

// POST /productos
export const crear = async (req, res) => {
  try {
    const { nombre, categoria, precioCompra, precioVenta, stock } = req.body
    const nuevoProducto = await crearProducto({ nombre, categoria, precioCompra, precioVenta, stock })
    res.status(201).json(nuevoProducto)
  } catch (error) {
    console.error('🔥 Error al crear producto:', error)
    res.status(500).json({ error: error.message })
  }
}

// GET /productos
export const listar = async (req, res) => {
  try {
    const productos = await obtenerProductos()
    res.json(productos)
  } catch (error) {
    console.error('🔥 Error al obtener productos:', error)
    res.status(500).json({ error: 'Error al obtener productos' })
  }
}

// GET /productos/:id
export const obtenerPorId = async (req, res) => {
  try {
    const producto = await obtenerProductoPorId(req.params.id)

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    res.json(producto)
  } catch (error) {
    console.error('🔥 Error al buscar producto:', error)
    res.status(500).json({ error: 'Error al buscar producto' })
  }
}

// PUT /productos/:id
export const actualizar = async (req, res) => {
  try {
    const producto = await actualizarProducto(req.params.id, req.body)
    res.json(producto)
  } catch (error) {
    console.error('🔥 Error al actualizar producto:', error)
    res.status(500).json({ error: 'Error al actualizar' })
  }
}

// DELETE /productos/:id
export const eliminar = async (req, res) => {
  try {
    await eliminarProducto(req.params.id)
    res.json({ message: 'Producto eliminado' })
  } catch (error) {
    console.error('🔥 Error al eliminar producto:', error)
    res.status(500).json({ error: 'Error al eliminar' })
  }
}
