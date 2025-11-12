import express from 'express';
import dotenv from 'dotenv';
import preinscripcionRouter from './modules/pre-inscripcion-form/preInscripcion.router.js';
import uploadRouter from './modules/file-upload/upload.routes.js';
import cors from 'cors';

dotenv.config();

app.use(
	cors({
		origin: '*',
		methods: ['GET', 'PUT', 'PATCH', 'POST'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);

const app = express();

app.use(uploadRouter);
app.use(express.json());
app.use(preinscripcionRouter);


app.set('port', process.env.PORT);

app.get('/', (req, res) => res.send('Pre Inscripcion'));

export default app;
