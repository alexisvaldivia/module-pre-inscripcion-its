import express from 'express';
import dotenv from 'dotenv';
import preinscripcionRouter from './modules/pre-inscripcion-form/preInscripcion.router.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(preinscripcionRouter);
app.set('port', process.env.PORT);

app.get('/', (req, res) => res.send('Pre Inscripcion'));

export default app;