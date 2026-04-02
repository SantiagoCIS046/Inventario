import express from 'express'
import cors from 'cors'
import productoRoutes from './routes/producto.routes.js'

const app = express()

// Middlewares globales
app.use(cors())
app.use(express.json())

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando 🚀')
})

// Rutas
app.use('/productos', productoRoutes)

export default app
