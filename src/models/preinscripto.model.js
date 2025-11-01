import mongoose from 'mongoose';

const preinscriptoSchema = new mongoose.Schema({
	fechaCreacion: { type: Date, default: Date.now },

	estado: {
		type: String,
		enum: ['pendiente', 'aceptado', 'rechazado'],
		default: 'pendiente',
	},

	carrera: String,

	datosPersonales: {
		nombreCompleto: String,
		apellidoCompleto: String,
		dni: String,
		cuit: String,
		email: String,
		numeroTelefono: String,
		provincia: String,
		ciudad: String,
		direccion: String,
		fechaNacimiento: Date,
	},

	estudios: {
		secundarioCompleto: Boolean,
		institucion: { type: String, required: false },
		anioEgreso: { type: Number, required: false },
		ciudadInstitucion: { type: Number, required: false },
		provinciaInstitucion: { type: Number, required: false },
		analiticoUrl: { type: Number, required: false },
	},
});

const Preinscripto = mongoose.model('Preinscripto', preinscriptoSchema);

export default Preinscripto;
