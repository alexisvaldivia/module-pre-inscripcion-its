import mongoose from 'mongoose';

const preinscriptoSchema = new mongoose.Schema({
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
		direccion: String,
	},

	estudios: {
		secundarioCompleto: Boolean,
		institucion: String,
		anioEgreso: Number,
		ciudadInstitucion: String,
		provinciaInstitucion: String,
		analiticoUrl: String,
	},
});

const Preinscripto = mongoose.model('Preinscripto', preinscriptoSchema);

export default Preinscripto;
