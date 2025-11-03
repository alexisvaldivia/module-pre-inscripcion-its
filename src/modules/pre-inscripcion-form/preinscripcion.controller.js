import Preinscripto from '../../models/preinscripto.model.js';
import { preinscripcionSchema } from './preinscripcion.dto.js';
import path from 'path';
const crearPreinscripto = async (req, res) => {
	// Crear una 'cuenta' y una vez que se genera el post en la bd, se manda a una pantalla de login
	try {
		const { error, value } = preinscripcionSchema.validate(req.body);

		if (error) {
			console.error(
				'Falta datos personales o la informacion enviada no es valida',
				error
			);
			return res.status(400).json({
				msg: 'Falta datos personales o la informacion enviada no es valida',
				datosRecibidos: req.body,
				error
			});
		}

		const preinscripcionExistente = await Preinscripto.findOne({
			$or: [
				{ 'datosPersonales.dni': value.dni },
				{ 'datosPersonales.email': value.email },
			],
		});

		if (preinscripcionExistente) {
			console.error(
				'Ya existe una preinscripcion con ese email o DNI.',
				preinscripcionExistente
			);

			return res.status(409).json({
				msg: 'Ya existe una preinscripcion con ese email o DNI.',
			});
		}

		const preinscripto = new Preinscripto({
			carrera: value.carrera,
			datosPersonales: value.datosPersonales,
		});

		const result = await preinscripto.save();

		if (result)
			res.status(201).json({
				msg: 'Se generó una preinscripción.',
				data: preinscripto,
			});
	} catch (err) {
		console.error('Error al generar preincripcion', err);
		res
			.status(500)
			.json({ msg: 'Error al generar una nueva preinscripcion', err });
	}
};

const agregarEstudios = async (req, res) => {
	try {
		
		
		const estudios = req.body;
		const dni = req.params.dni;

		if (!estudios || !dni)
			res.status(500).json({
				msg: 'Faltan datos de sus estudios o el dni del preinscripto.',
			});

		const preinscriptoActualizado = await Preinscripto.findOneAndUpdate(
			{
				'datosPersonales.dni': dni,
			},
			{ $push: { estudios: estudios } },
			{ new: true }
		);

		if (!preinscriptoActualizado)
			res.status(401).json({ msg: 'No se encontro al preinscripto' });

		res.status(200).json({
			msg: 'Estudios agregados con éxito.',
			data: preinscriptoActualizado,
		});
	} catch (err) {
		console.error('Error al agregar estudios', err);
		res.status(500).json({ msg: 'Error al agregar los estudios', error: err });
	}
};

//Se encarga de subir las imagenes a la base de datos
const cargaArchivos = async (req, res) => {
	try{
		const dni = req.params.dni
		if(!dni) {
			return res.status(400).json({msg: "DNI requerido"})

		}

		const archivo = req.files;

		if(!archivo){
			return res.status(400).json({ msg: "No se recibieron archivos." });
		}

		const rutasArchivos = {
			dniFrente: archivo.dniFrente?.[0]?.path || null,
			dniDorso: archivo.dniDorso?.[0]?.path || null,
			tituloSecundario: archivo.tituloSecundario?.[0]?.path ||null,
			certificadoBuenaSalud: archivo.certificadoBuenaSalud?.[0]?.path || null
		}

		const preinscripto = await Preinscripto.findOneAndUpdate(
			{"datosPersonales.dni": dni },
			{$set: {archivos: rutasArchivos}},
			{new: true}
		);

		if(!preinscripto){
			 return res.status(404).json({ msg: "Preinscripto no encontrado." });
		}

		res.status(200).json({
			msg: "Archivos subidos correctamente",
			data: preinscripto
		});
		console.log("📥 Petición recibida para cargar archivos...");
		console.log("Archivos recibidos:", req.files);
		console.log("DNI:", req.params.dni);
	}catch(err){
		console.error("Error al subir archivos:", err);
    	res.status(500).json({ msg: "Error interno del servidor.", error: err });
	}
}

const obtenerTodosLosPreinscriptos = async (req, res) => {
	const result = await Preinscripto.find({});

	if (!result)
		res.status(404).json({ msg: 'No se encontraron preinscripciones.' });

	res.status(201).json({ data: result });
};

const preincripcionController = {
	crearPreinscripto,
	agregarEstudios,
	obtenerTodosLosPreinscriptos,
	cargaArchivos
};

export default preincripcionController;
