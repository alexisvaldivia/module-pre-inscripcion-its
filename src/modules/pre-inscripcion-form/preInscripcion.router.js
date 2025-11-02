import express from 'express';
import preincripcionController from './preinscripcion.controller.js';
import apiKeyMiddleware from './../../middlewares/apiKey.middleware.js';

const preInscripcionRouter = express.Router();

preInscripcionRouter.post(
	'/registrarPreInscripto',
	preincripcionController.crearPreinscripto
);

preInscripcionRouter.patch(
	'/preinscripto/:dni/estudios',
	preincripcionController.agregarEstudios
);
preInscripcionRouter.get(
	'/preinscripciones',
	preincripcionController.obtenerTodosLosPreinscriptos
);

preInscripcionRouter.get(
	'/aceptados',
	apiKeyMiddleware,
	preincripcionController.obtenerAceptados
);

preInscripcionRouter.get(
	'/aceptados-pendientes',
	apiKeyMiddleware,
	preincripcionController.obtenerAceptadosYPendientes
);

preInscripcionRouter.patch(
	'/preinscripto/:dni',
	preincripcionController.actualizarDatosPreinscripto
);

export default preInscripcionRouter;
