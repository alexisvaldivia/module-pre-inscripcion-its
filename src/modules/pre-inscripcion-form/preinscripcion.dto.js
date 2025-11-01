import Joi from 'joi';

export const datosPersonalesSchema = new Joi.object({
	nombreCompleto: Joi.string().required(),
	apellidoCompleto: Joi.string().required(),
	dni: Joi.string().required().length(8),
	cuit: Joi.string().required().length(11),
	email: Joi.string().required(),
	numeroTelefono: Joi.string().required(),
	provincia: Joi.string().required(),
	ciudad: Joi.string().required(),
	direccion: Joi.string().required(),
	fechaNacimiento: Joi.date().format('YYYY-MM-DD').required(),
});

export const estudiosSchema = new Joi.object({
	secundarioCompleto: Joi.boolean().required(),
	institucion: Joi.string().required().allow(null),
	anioEgreso: Joi.number().required().allow(null).min(1000).max(9999),
	ciudadInstitucion: Joi.string().required().allow(null),
	provinciaInstitucion: Joi.string().required().allow(null),
	analiticoUrl: Joi.string().required().allow(null),
});
