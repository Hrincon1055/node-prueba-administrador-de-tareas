import express from 'express';
import {
  actualizarPerfil,
  autenticar,
  perfil,
  registrar,
} from '../controllers/authController.js';
import checkAuth from '../middleware/authMiddleware.js';
const router = express.Router();
// RUTAS PUBLICAS
router.post('/', registrar);
router.post('/login', autenticar);
// RUTAS PRIVADAS
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil);
export default router;
