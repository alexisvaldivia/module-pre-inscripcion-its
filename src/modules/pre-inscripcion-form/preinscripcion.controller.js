import Preinscripto from '../../models/preinscripto.model.js';

const crearPreinscripto = async (req, res) => {
	// Crear una 'cuenta' y una vez que se genera el post en la bd, se manda a una pantalla de login

	try {
		const datosPersonales = req.body;
		const dni = req.body.dni;
		const email = req.body.email;

		if (!datosPersonales)
			res.status(500).json({ msg: 'Faltan datos personales.' });

		const registroCreadoDni = await Preinscripto.findOne({
			'datosPersonales.dni': dni,
		});
		const registroCreadoMail = await Preinscripto.findOne({
			'datosPersonales.email': email,
		});

		if (registroCreadoDni || registroCreadoMail)
			res.status(401).json({
				msg: `Ya hay un registro de preinscripción con el número de DNI o email.`,
			});

		const preinscripto = new Preinscripto({ datosPersonales });
		const result = await preinscripto.save();

		if (result)
			res
				.status(201)
				.json({ msg: 'Se generó una preinscripción.', data: preinscripto });
	} catch (err) {
		console.error('Error al generar preincripcion');
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
		res.status(500).json({ msg: 'Error al agregar los estudios', err });
	}
};

const preincripcionController = {
	crearPreinscripto,
	agregarEstudios,
};

export default preincripcionController;
