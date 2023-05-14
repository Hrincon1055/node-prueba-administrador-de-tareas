import express from 'express';
import {
  actualizarTarea,
  agregarTarea,
  eliminarTarea,
  obtenerTarea,
  obtenerTareas,
} from '../controllers/tareasController.js';
import checkAuth from '../middleware/authMiddleware.js';
const router = express.Router();
router
  .route('/')
  .post(checkAuth, agregarTarea)
  .get(checkAuth, obtenerTareas);
router
  .route('/:id')
  .get(checkAuth, obtenerTarea)
  .put(checkAuth, actualizarTarea)
  .delete(checkAuth, eliminarTarea);
export default router;
