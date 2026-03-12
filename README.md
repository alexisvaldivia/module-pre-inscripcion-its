# Módulo de Pre-Inscripción

## API REST diseñada para gestionar el flujo de registro inicial de aspirantes, permitiendo la carga de datos personales, información académica y la administración de estados de inscripción.
Tecnologías

* Lenguaje: JavaScript (Node.js)
* Framework: Express.js
* ODM: Mongoose (MongoDB)
* Validación: Joi
* Gestión de archivos: Multer
* Variables de entorno: Dotenv

Seguridad y Middleware
El sistema opera mayoritariamente con endpoints públicos para facilitar el acceso a los aspirantes, exceptuando las consultas de gestión y administración que requieren validación:

* authApiKeyMiddleware: Validación de API Key para consultas del equipo de autenticación.
* adminApiKey: Validación de clave para acceso al panel administrativo.

Endpoints1. Registro de aspirante
POST /registrarPreInscripto
Crea un nuevo registro de preinscripción con los datos básicos del usuario.
Cuerpo de la petición (JSON):

{
    "carrera": "devops",
    "datosPersonales": {
        "nombreCompleto": "Pepe Juan",
        "apellidoCompleto": "Argento Maradona",
        "dni": "12312312",
        "cuit": "20123123123",
        "email": "ejemplo@gmail.com",
        "numeroTelefono": "123123123",
        "provincia": "Rio Negro",
        "ciudad": "Cipolletti",
        "direccion": "Peru 1200",
        "fechaNacimiento": "2003-04-01"
    }
}

2. Actualización de información académica
PATCH /preinscripto/:dni/estudios
Permite adjuntar o actualizar la información de estudios secundarios y la URL del certificado analítico.

* Parámetros: dni (Documento Nacional de Identidad).

Cuerpo de la petición (JSON):

{
    "secundarioCompleto": true,
    "institucion": "ESRN 120",
    "anioEgreso": 2020,
    "ciudadInstitucion": "Cipolletti",
    "provinciaInstitucion": "Rio Negro",
    "analiticoConstanciaUrl": "path/al/archivo"
}

3. Consulta de aspirantes aceptados
GET /aceptados
Retorna el listado de aspirantes cuyo estado es "aceptado".

* Seguridad: Requiere API Key de autenticación.

4. Consulta de estados pendientes y aceptados
GET /aceptados-pendientes
Retorna el listado de aspirantes que aún no han sido procesados o que ya fueron admitidos.

* Seguridad: Requiere API Key de autenticación.

5. Gestión administrativa de estados
PATCH /preinscripto/admin/:dni
Actualiza el estado de la preinscripción para determinar la admisión del aspirante.

* Parámetros: dni.
* Seguridad: Requiere API Key de administración.

Cuerpo de la petición (JSON):

{
  "estado": "aceptado"
}

Estados de Preinscripción

* pendiente: Información cargada, pendiente de revisión administrativa.
* aceptado: El aspirante cumple con los requisitos mínimos.
* rechazado: No cumple con los requisitos o fue desestimado manualmente.

------------------------------
¿Necesitas que incluya una sección con los ejemplos de respuesta (200 OK, 400 Bad Request) para cada endpoint?

