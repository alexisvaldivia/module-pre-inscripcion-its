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
		institucion: String,
		anioEgreso: String,
		ciudadInstitucion: String,
		provinciaInstitucion: String,
		analiticoConstanciaUrl: String,
	},

	archivos: {
		dniFrente: { type: String },
		dniDorso: { type: String },
		tituloSecundario: { type: String },
		certificadoBuenaSalud: {type: String}
	},
});

const Preinscripto = mongoose.model('Preinscripto', preinscriptoSchema);

export default Preinscripto;
