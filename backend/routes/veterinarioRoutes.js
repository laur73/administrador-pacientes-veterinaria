import express from 'express';
import {
	registrar,
	perfil,
	confirmar,
	autenticar,
	recuperarPassword,
	comprobarToken,
	nuevoPassword,
	actualizarPerfil,
	actualizarPassword
}
	from '../controllers/veterinarioController.js';

import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

//Aqui van a ir las diferentes rutas (endpoints)

//Rutas Públicas
router.post('/registrar', registrar);

//Ruta dinámica
router.get('/confirmar/:token', confirmar);

router.post('/login', autenticar);

//Enviar email del password a recuperar
router.post('/recuperar-password', recuperarPassword);

//Verificar que el token generado sea válido
router.get('/recuperar-password/:token', comprobarToken);

//Enviar el nuevo password
router.post('/recuperar-password/:token', nuevoPassword);

//Rutas Privadas
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil);
router.put('/actualizar-password', checkAuth, actualizarPassword);

export default router;