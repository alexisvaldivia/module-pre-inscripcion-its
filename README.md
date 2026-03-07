# Módulo de Pre Inscripción

Tecnologías usadas: JavaScript, Nodejs, Expressjs, Mongoose, joi, dotenv, multer, 

La mayoría de los endpoints son públicos.

Los únicos endpoints protegidos:

authApiKeyMiddleware: Validación para consultas del equipo de autenticación.

adminApiKey: Validación de clave para panel administrativo de la secre.

## 1. Registrar preinscripto

POST /registrarPreInscripto

Crea un nuevo registro de preinscripción.
Body (JSON):

{
    "carrera": "devops",
    "datosPersonales": {
        "nombreCompleto": "Pepe Juan",
        "apellidoCompleto": "Argento Maradona",
        "dni": "12312312",
        "cuit": "20123123123",
        "email": "asdasd12@gmail.com",
        "numeroTelefono": "123123123",
        "provincia": "Rio Negro",
        "ciudad": "Cipolletti",
        "direccion": "Peru 1200",
        "fechaNacimiento": "2003-04-01"
    }
}

## 2. Agregar información de estudios secundarios

PATCH /preinscripto/:dni/estudios

Agrega datos del módulo "Estudios" para un preinscripto. (Me di cuenta que me falto el metodo para actualizar=

Ruta params:

dni — DNI del preinscripto

Body (JSON):

{
    "secundarioCompleto": true,
    "institucion": "ESRN 120",
    "anioEgreso": 2020,
    "ciudadInstitucion": "Cipolletti",
    "provinciaInstitucion": "Rio Negro",
    "analiticoConstanciaUrl": "pathAlAnalitico"
}

## 3. Obtener solo aceptados

Este es el endpoin que me pidió el equipo de Auth.

GET /aceptados

Devuelve la lista de preinscriptos aceptados.
Requiere API Key de autenticación

## 4. Obtener aceptados y pendientes

Este lo hice por las dudas.

GET /aceptados-pendientes

Devuelve todos los preinscriptos con estado pendiente o aceptado.
Requiere API Key de autenticación

## 5. Cambiar estado de preinscripción (secre)

PATCH /preinscripto/admin/:dni

Actualiza el estado de un preinscripto a aceptado o rechazado.

Ruta params:

dni — DNI del preinscripto

Body (JSON):

{
  "estado": "aceptado"
}

- Requiere API Key de administración

Estados posibles del preinscripto
- pendiente	Información cargada, sin revisar
- aceptado	Cumple con los requisitos
- rechazado	No cumple requisitos o fue rechazado manualmente
