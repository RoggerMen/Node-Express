

const boom = require('@hapi/boom');
// NO VAMOS A RECIBIR DIRECTAMENTE EL (req, res, next) SI NO QUE RECIBIREMOS EL ESQUEMA(productSchema) QUE VAMOS A VALIDAR Y LA PROPIEDAD(EN DONDE ENCONTRAR LA INFORMACION)
// Y LIEGO AL RETORNA SI ENVIAMOS (req, res, next) Y ASI ARMAMOS "MIDDLEWARES DE FORMA DINAMICA"
function validatorHandler(schema, property) {
  console.log("validatorHandler");
  // RETORNA UN MIDDLEWARE DE FORMA DINAMICA UTILIZANDO LA PROPIEDAD DE "CLOSURE"
  /** DEPENDE DE SI ES UN POST, GET, PUT TE DARA LA PROPIEDAD "property"
   *🔹 Si property = 'body', entonces estamos validando req.body.
    🔹 Si property = 'params', estamos validando req.params.
    🔹 Si property = 'query', estamos validando req.query.

  Así, el middleware es dinámico, porque puede validar cualquier parte del request.
   */
    return (req, res, next) =>{
      // COMO ES VALOR DEL OBJETO "req" Y TAMBIEN ES OBJETO EL "property"(body) ENTONCES HACEMOS QUE EL "req" QUE VIENE A SER LA CLAVE OBTENGA A SU VALOR PROPERTY QUE VIENE A SER "body"
      const data = req[property];
      // SE AGREGO LAS LLAVES "{}" => {error}
      // AGREGAMOS EL "aboutEarly: false" PARA ENCONTRAR TODOS LOS ERRORES Y ENVIARTE TODOS Y NO ERROR POR ERROR SINO QUE TE CORRIGE TODOS LOS ERRORES
      const {error} = schema.validate(data, { abortEarly: false });
      if (error) {
        // SI HAY ERROR EN LA VALIDACIÓN, ENVIAMOS EL ERROR COMO UN STATUS 400
        // ENVIAMOS EL "error" QUE NOS ESTA ENVIANDO NUESTRO "schema"
        // LO ENVOLVEMOS EN "next()" PARA HACER QUE LOS "MIDDLWARES" DE TIPO ERROR LO PROCESEN
        // EL "MIDDLWARE" QUE PROCESA LOS ERRORES SE DARA CUENTA QUE ES UN ERROR DE TIPO "Boom" Y LO VA A ENVIAR EN FORMATO QUE NOSOTROS QUEREMOS
        next(boom.badRequest(error));
      }// SI NO HAY ERROR QUE PASE AL SIGUIENTE MIDDLEWARE O QUE PERMITA SEGUIR A INGRESAR A SERVICIO
      next();
    }
}

// SE LE QUITO LAS "{}" LLAVES
module.exports = validatorHandler;



