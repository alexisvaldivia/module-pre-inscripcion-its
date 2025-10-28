import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let db = null;

const getDb = async () => {
	try {
		if (db) return db;

		db = await mongoose.connect(process.env.URI);

		console.log('Conectado a la base de datos.');
	} catch (err) {
		console.error('Error al conectar la base de datos.', err);
	}
};

export default getDb;