import Preinscripto from '../../models/preinscripto.model.js';
import { preinscripcionSchema, estudiosSchema } from './preinscripcion.dto.js';

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
				{ 'datosPersonales.dni': value.datosPersonales.dni },
				{ 'datosPersonales.email': value.datosPersonales.email },
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
		const dni = req.params.dni;

		const { error, value } = estudiosSchema.validate(req.body);
		console.log(value);

		if (error) {
			return res
				.status(409)
				.json({ msg: 'La informacion enviada no es valida', error });
		}

		const preinscriptoActualizado = await Preinscripto.findOneAndUpdate(
			{
				'datosPersonales.dni': dni,
			},
			{
				estudios: value,
			},
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
	try {
		const dni = req.params.dni;
		if (!dni) {
			return res.status(400).json({ msg: 'DNI requerido' });
		}

		const archivo = req.files;

		if (!archivo) {
			return res.status(400).json({ msg: 'No se recibieron archivos.' });
		}

		const rutasArchivos = {
			dniFrente: archivo.dniFrente?.[0]?.path || null,
			dniDorso: archivo.dniDorso?.[0]?.path || null,
			tituloSecundario: archivo.tituloSecundario?.[0]?.path || null,
			certificadoBuenaSalud: archivo.certificadoBuenaSalud?.[0]?.path || null,
		};

		const preinscripto = await Preinscripto.findOneAndUpdate(
			{ 'datosPersonales.dni': dni },
			{ $set: { archivos: rutasArchivos } },
			{ new: true }
		);

		if (!preinscripto) {
			return res.status(404).json({ msg: 'Preinscripto no encontrado.' });
		}

		res.status(200).json({
			msg: 'Archivos subidos correctamente',
			data: preinscripto,
		});
		console.log("📥 Petición recibida para cargar archivos...");
		console.log("Archivos recibidos:", req.files);
		console.log("DNI:", req.params.dni);
	}catch(err){
		console.error("Error al subir archivos:", err);
    	res.status(500).json({ msg: "Error interno del servidor.", error: err });
	}
};

const obtenerAceptados = async (req, res) => {
	const result = await Preinscripto.find({ estado: 'aceptado' });

	if (!result || result.length === 0)
		res
			.status(404)
			.json({ msg: 'No se encontraron preinscripciones aceptadas.' });

	res.status(201).json({ data: result });
};

const obtenerAceptadosYPendientes = async (req, res) => {
	try {
		const result = await Preinscripto.find({
			estado: { $ne: 'rechazado' },
		});

		if (!result || result.length === 0) {
			return res.status(404).json({
				msg: 'No se encontraron preinscripciones aceptadas o pendientes.',
			});
		}

		res.status(200).json({ data: result });
	} catch (err) {
		console.error('Error al obtener las preinscripciones', err);
		res.status(500).json({ msg: 'Error del servidor', error: err });
	}
};

const actualizarDatosPersonales = async (req, res) => {
	try {
		const dni = req.params.dni;
		const datosActualizados = req.body;

		if (!datosActualizados)
			res.send(400).json({ msg: 'No hay datos a actualizar.' });

		const camposActualizados = {};

		for (let key in datosActualizados) {
			camposActualizados[`datosPersonales[${key}]`] = datosActualizados[key];
		}

		const preinscriptoActualizado = await Preinscripto.findOneAndUpdate(
			{
				'datosPersonales.dni': dni,
			},
			{
				$set: camposActualizados,
			},
			{
				new: true,
			}
		);

		if (preinscriptoActualizado)
			res.status(202).json({ preinscriptoActualizado });
	} catch (err) {
		console.error(err);
		res.status(409).json({ msg: 'Error al actualizar los datos', error: err });
	}
};

// Metodos para la secre

const cambiarEstadoPreinscripcion = async (req, res) => {
	try {
		const dni = req.params.dni;

		const nuevoEstado = req.body.estado;

		if (!nuevoEstado || !dni)
			res.status(400).json({
				msg: 'Se requiere el DNI del preinscripto y el nuevo estado para poder actualizar.',
			});

		const preinscripto = await Preinscripto.findOneAndUpdate(
			{
				'datosPersonales.dni': dni,
			},
			{
				estado: nuevoEstado,
			},
			{ new: true }
		);

		if (!preinscripto)
			res.status(404).json({
				msg: `No se encontró una inscripción registrada con el DNI: ${dni}`,
			});

		res.status(201).json({
			msg: `El preinscripto registrado con el DNI: ${dni} cambio su estado a '${nuevoEstado}'`,
			preinscripto,
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({
			msg: 'Ocurrió un error al cambiar el estado del preinscripto',
			err,
		});
	}
};

const obtenerTodosLosPreinscriptos = async (req, res) => {
	try {
		const preinscriptos = await Preinscripto.find({});

		if (!preinscriptos)
			res.status(404).json({ msg: 'No se encontraron preinscripciones.' });

		res.status(200).json({ data: preinscriptos });
	} catch (err) {
		console.log(err);
		res
			.status(400)
			.json({ msg: 'Ocurrió un error al obtener todas las preinscripciones.' });
	}
};

const preinscripcionController = {
	crearPreinscripto,
	agregarEstudios,
	obtenerTodosLosPreinscriptos,
	obtenerAceptadosYPendientes,
	obtenerAceptados,
	cargaArchivos,
	actualizarDatosPersonales,
	cambiarEstadoPreinscripcion,
};

export default preinscripcionController;
