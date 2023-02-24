import express from 'express';
import { registrar, perfil, confirmar, autenticar } from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

//Aqui van a ir las diferentes rutas (endpoints)

//Rutas Públicas
router.post('/registrar', registrar)

//Ruta dinámica
router.get('/confirmar/:token', confirmar)

router.post('/login', autenticar)

//Rutas Privadas
router.get('/perfil', checkAuth, perfil)

export default router;