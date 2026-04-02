import { Router } from 'express'
import { crear, listar, obtenerPorId, actualizar, eliminar } from '../controllers/producto.controller.js'

const router = Router()

router.post('/', crear)
router.get('/', listar)
router.get('/:id', obtenerPorId)
router.put('/:id', actualizar)
router.delete('/:id', eliminar)

export default router
