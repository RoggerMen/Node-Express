
// VALIDA LA DATA QUE LLEGA DESDE EL CLIENTE
const Joi = require('joi');

// LA VALIDACION ES EL TIPO DE CAMPO(el "uuid"), NO EL TIPO DE DATO
const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(15);
const price = Joi.number().integer().min(10);
const store = Joi.string().alphanum().min(3).max(25);
const country = Joi.string().alphanum().min(3).max(30);
const imageUrl = Joi.string().alphanum().min(12).max(80);


// PARA LA CREACION NO ES REQUERIDO EL "id" SI ALGO ES REQUERIDO COLOCAMOS EL METODO ".required()"
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  store: store.required(),
  country: country.required(),
  imageUrl: imageUrl.required(),
});

const updateProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  store: store.required(),
  country: country.required(),
  imageUrl: imageUrl.required(),
});
// ESTE APESAR QUE TIENE SOLO UN CAMPO LA MEJOR PRACTICA ES DEJARLO COMO OBJETO PARA LUEGO SIMPLEMENTE ENVIARLO DE FORMA MAS FACIL A NUESTRO VALIDADOR EL "MIDDLEWARE" QUE SE ENCARGA DE VALIDARLO
// ADEMAS DEJA QUE SEA FLEXIBLE, PUEDE QUE EN EL "get" PRODUCTO PUEDE QUE NO SEA POR "id" SINO POR PRECIO CON "query.params(req.params)"
const getProductSchema = Joi.object({
  id : id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
