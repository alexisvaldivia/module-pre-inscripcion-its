import mongoose from 'mongoose';

const preinscriptoModel = new mongoose.Schema({
	_id: ObjectId,

	fechaCreacion: { type: Date, default: Date.now },

	estado: {
		type: String,
		enum: ['pendiente', 'aceptado', 'rechazado'],
		default: 'pendiente',
	},

	datosPersonales: {
		nombreCompleto: String,
		dni: String,
		cuit: String,
		email: String,
		provincia: String,
		ciudad: String,
	},
});

export default mongoose.model('Preinscripto', preinscriptoModel);