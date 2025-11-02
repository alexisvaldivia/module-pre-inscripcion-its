import express from "express";
import preInscripcionRouter from "../pre-inscripcion-form/preInscripcion.router";
import preincripcionController from "../pre-inscripcion-form/preinscripcion.controller";

const preInscripcionRouter = express.Router();


preInscripcionRouter.post(
  "/preinscripto/:dni/upload",
  upload.fields([
    { name: "dniFrente", maxCount: 1 },
    { name: "dniDorso", maxCount: 1 },
    { name: "tituloSecundario", maxCount: 1 },
    { name: "certificadoBuenaSalud", maxCount: 1}
  ]),
  preincripcionController.cargaArchivos
);

export default preInscripcionRouter;