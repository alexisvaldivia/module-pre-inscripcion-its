import express from 'express';
import preinscripcionController from './preinscripcion.controller.js';
import apiKeyMiddleware from './../../middlewares/apiKey.middleware.js';

const preInscripcionRouter = express.Router();

preInscripcionRouter.post(
	'/registrarPreInscripto',
	preinscripcionController.crearPreinscripto
);

preInscripcionRouter.patch(
	'/preinscripto/:dni/estudios',
	preinscripcionController.agregarEstudios
);
preInscripcionRouter.get(
	'/preinscripciones',
	preinscripcionController.obtenerTodosLosPreinscriptos
);

preInscripcionRouter.get(
	'/aceptados',
	apiKeyMiddleware,
	preinscripcionController.obtenerAceptados
);

preInscripcionRouter.get(
	'/aceptados-pendientes',
	apiKeyMiddleware,
	preinscripcionController.obtenerAceptadosYPendientes
);

preInscripcionRouter.patch(
	'/preinscripto/:dni/datosPersonales',
	preinscripcionController.actualizarDatosPersonales
);

export default preInscripcionRouter;
