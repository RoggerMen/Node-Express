// "index.js" ES EL ARCHIVO QUE VA A CONFIGURAR ESTAS RUTAS
// DEACUERDO A LA LINEA 4 DE productsRouter
// AQUI ESTAMOS DICIENDO EN QUE ENDPOINT DEBERIA ESTAR CADA MODULO
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');
// LO QUE HACE "index.js" ES DECIR EN QUE ENDPOINT DEBERIA ESTAR ESE MODULO
function routerApi(app){
  app.use('/api/products', productsRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/categories', categoriesRouter);
}

module.exports = routerApi;
