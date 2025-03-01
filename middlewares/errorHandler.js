const { error } = require("console");

function logErrors(error, req, res, next) {
  console.log("logErrors")
    console.error(error);
    // al enviar nuestro "next" le estamos ejecutando como un "middleware" de TIPO ERROR
    // Cuando no lo enviamos nada va a ser un "middleware" de TIPO NORMAL
    next(error);
}

// ASI NO ESTES UTILIZANDO "next" DEBEMOS PONERLA PORQUE ASI SE IDENTIFICA QUE ES UN "middleware" del TIPO ERROR DEBE TENER LOS 4 PARAMETROS
function errorHandler(error, req, res, next) {
  console.log("errorHandler")
    res.status(500).json({
        message: error.message,
        stack: error.stack
    });
}
// CREAMOS UN MIDDLEWARE PARA EL "BOOM"
// Si hay un error y es de tipo "BOOM" SE EJECUTA ESE "MIDDLEWARE" Y SI NO LO ES CON EL "next(error)" HACEMOS QUE EJECUTE OTRO MIDDLEWARE
function boomErrorHandler(error, req, res, next) {
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(error)
  }
}


module.exports = { logErrors, errorHandler, boomErrorHandler };
