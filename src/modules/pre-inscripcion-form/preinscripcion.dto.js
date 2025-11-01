import Joi from 'joi';

export const preinscripcionSchema = new Joi.object({
	carrera: Joi.string().required(),
	datosPersonales: Joi.object({
		nombreCompleto: Joi.string().required(),
		apellidoCompleto: Joi.string().required(),
		dni: Joi.string().required().length(8),
		cuit: Joi.string().required().length(11),
		email: Joi.string().email().required(),
		numeroTelefono: Joi.string().required(),
		provincia: Joi.string().required(),
		ciudad: Joi.string().required(),
		direccion: Joi.string().required(),
		fechaNacimiento: Joi.date().required(),
	}),
});

export const estudiosSchema = new Joi.object({
	secundarioCompleto: Joi.boolean().required(),
	institucion: Joi.when('secundarioCompleto',{
		is:true,
		then: Joi.string().required(),
		otherwise: Joi.allow(null)
	}),
	anioEgreso: Joi.when('secundarioCompleto', {
		is:true,
		then: Joi.number().required().min(1900).max(new Date().getFullYear()),
		otherwise: Joi.number().allow(null)
	}),
	ciudadInstitucion: Joi.when('secundarioCompleto', {
		is:true,
		then: Joi.string().required(),
		otherwise: Joi.string().allow(null)
	}),
	provinciaInstitucion: Joi.when('secundarioCompleto', {
		is:true,
		then: Joi.string().required(),
		otherwise: Joi.string().allow(null)
	}),
	analiticoUrl: Joi.when('secundarioCompleto', {
		is:true,
		then: Joi.string().required(),
		otherwise: Joi.string().allow(null)
	}),
	
});
