import express from 'express';
import preincripcionController from './preinscripcion.controller.js';

const preInscripcionRouter = express.Router();

preInscripcionRouter.post(
	'/registrarPreInscripto',
	preincripcionController.crearPreinscripto
);

preInscripcionRouter.patch('/preinscripto/:dni/estudios', preincripcionController.agregarEstudios)

export default preInscripcionRouter;
