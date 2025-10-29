import express from 'express';
import preincripcionController from './preinscripcion.controller';

const preInscripcionRouter = express.Router();

preInscripcionRouter.get('/', preincripcionController);

export default preInscripcionRouter;