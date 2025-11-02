import express from 'express';
import preinscripcionController from './preinscripcion.controller.js';
import authApiKeyMiddleware from '../../middlewares/authApiKey.middleware.js';
import adminApiKey from '../../middlewares/adminApiKey.middleware.js';

const preInscripcionRouter = express.Router();

preInscripcionRouter.post(
	'/registrarPreInscripto',
	preinscripcionController.crearPreinscripto
);

preInscripcionRouter.patch(
	'/preinscripto/:dni/estudios',
	preinscripcionController.agregarEstudios
);

// Equipo de auth

preInscripcionRouter.get(
	'/aceptados',
	authApiKeyMiddleware,
	preinscripcionController.obtenerAceptados
);

preInscripcionRouter.get(
	'/aceptados-pendientes',
	authApiKeyMiddleware,
	preinscripcionController.obtenerAceptadosYPendientes
);

// admin

preInscripcionRouter.patch(
	'/preinscripto/admin/:dni/',
	adminApiKey,
	preinscripcionController.cambiarEstadoPreinscripcion
);

preInscripcionRouter.get(
	'/admin/preinscripciones',
	adminApiKey,
	preinscripcionController.obtenerTodosLosPreinscriptos
);

export default preInscripcionRouter;
