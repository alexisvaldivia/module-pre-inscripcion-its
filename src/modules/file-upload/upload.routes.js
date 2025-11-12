import express from 'express';
import multer from 'multer';
import preincripcionController from '../pre-inscripcion-form/preinscripcion.controller.js';
import upload from '../../middlewares/multer.js';
const uploadRouter = express.Router();

uploadRouter.post(
	'/preinscripto/:dni/documentacion',
	upload.fields([
		{ name: 'dniFrente', maxCount: 1 },
		{ name: 'dniDorso', maxCount: 1 },
		{ name: 'tituloSecundario', maxCount: 1 },
		{ name: 'certificadoBuenaSalud', maxCount: 1 },
	]),
	preincripcionController.cargaArchivos
);

uploadRouter.use((err, req, res, next) => {
	console.error('Error en Multer:', err);
	if (err instanceof multer.MulterError) {
		return res.status(400).json({ msg: 'Error de Multer', error: err.message });
	}
	if (err) {
		return res
			.status(500)
			.json({ msg: 'Error al procesar archivo', error: err.message });
	}
	next();
});

export default uploadRouter;
