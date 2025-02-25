
  const express = require('express');
  const { faker } = require('@faker-js/faker');

  const app = express();
  const port = 3000;

  // Este "callback" casi siempre tiene 2 parametros EL REQUEST Y EL RESPONSE
  // ESTE ES LA RESPUESTA QUE NOSOTROS ENVIAMOS A NUESTRO CLIENTES
  // EL PRIMERO QUE MUESTRA "/" ES LA RUTA POR DEFECTO
  app.get("/", (req, res) =>{
    //console.log(req); // Esto imprimirá todo el objeto req en la consola
    //COMO NOSOTROS NECESITAMOS RETORNAR ENTONCES USAMOS EL RESPONSE
    res.send("Hola Mi Server en Express");
    //console.log("Respuesta del servidor "  ,res)
  });

  app.get("/nueva-ruta", (req, res) => {
    res.send("<h1>Esta es la ruta nueva</h1>");
  });

  // Tambien podemos USAR otro tipo de formato el JSON ".json"(javascript object notetion)
  // SE USAN MAS PARA APIS, DONDE COMUNICARAN DATOS A LOS CLIENTES LA CUAL LOS FRONTEND SE ENCARGAN DE RENDERIZAR ESTOS DATOS(LA INFORMACION) AL LADO DEL CLIENTE PARA QUE LO PUEDA VER DE MANERA DISEÑADA Y ORGANIZADA EN LA PAGINA(CLIENTE)
  // SI ES UNA LISTA DE PRODUCTOS TENEMOS QUE HACERLOS EN ARRAYS "[]"
  /******* ESTA PARTE AGREGAMOS TAMBIEN EL "req.query" *********/
  app.get("/products", (req, res) => {
    const products = [];
    const { size } = req.query;
    // Con esto hacemos que limit sea por defecto de 10 si no colocamos ningún parametro de consulta(query param)
    // El "||" es un operador OR, en caso de que "size" no venga seteado, se tomará el valor de 10 como limite
    const limit = size  || 10;
    // ACA LO HACEMOS MAS DINAMICO AL QUERER MOSTRAR NUESTROS PRODUCTOS CON FAKER
    // SEGUN EL TAMAÑO QUE COLOQUEMOS AL "size" NOS VA A HACER EL RECORRIDO EL FOR DE ACUERDO AL "limit" QUE POR SI NO VIENE NADA EN "size" nos dara el valor de 10 como limite y si COLOCAMOS UN PARAMETRO EN LA URL al "size" POR EJEMPLO "?size=1000" ESTE RECORRIDO SERA DE 1000 PRODUCTOS ES DEACUERDO A LO QUE LE COLOQUEMOS AL "size"
    for (let i = 0; i < limit ; i++) {
      products.push({
        id : i+1,
        name: faker.commerce.productName(),
        // Lo parseamos porque el precio nos viene como un "string" y lo CONVERTIMOS A NUMERO EN BASE 10
        price: parseInt(faker.commerce.price(),10),
        store: faker.company.name(),
        country: faker.location.country(),
        image: faker.image.url()
      });
    }
    res.json(products);
  })


  // obtener un endpoint con 2 PARAMETROS
  // ACA MOSTRAMOS LA DESTRUCTURACION
  // DE ESTA MANERA ESTAMOS CAPTURANDO LOS PARAMETROS QUE VIENEN POR URL Y LOS ESTAMOS RECOGIENDO DESDE NUESTRO PROGRAMA Y LOS IMPRIMIMOS DE RETORNO
  app.get('/categories/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;
    res.json({
      categoryId,
      productId,
    });
  });

  // CON CONDICIONAL PARA AGARRAR Y MOSTRAR SI CUMPLE CON LA QUE EN EL PATH EL PARAMETRO ES 1 ENTONCES MUESTRA ESE sino el otro por defecto
  app.get('/categories/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    console.log(categoryId);

    let responseData = {
      categoryId,
      name: 'Others',
      products: 2000
    };

    if (categoryId === "1") {
      responseData = {
        categoryId,
        name: 'Food',
        products: 1000
      };
    }

    res.json(responseData);
  });

  app.get('/categories',(req,res)=>{
    const {categoryId}= req.params
    res.json([
      {
        categoryId,
        category: 'Food',
        products: []
      },
      {
        categoryId,
        category: 'Games',
        products: []
      },
      {
        categoryId,
        category: 'clothes',
        products: []
      },
    ])
  });


/********** ESTAS DOS RUTAS CHOCAN ************/
/**************** SOLUCION ******************/
/*********** CAMBIAR ORDEN *****************/
// todo ENDPOINTS ESPECIFICOS (app.get('/products/filter',funcion callback) debe ir antes de ENDPOINTS DINAMICOS(app.get('/products/:id',funcion callback)

// EL DE PARAMETROS DE RUTA"route parameters".(req.params) Y PARAMETROS DE CONSULTA"query parameters"(req.query)
// EL DE PARAMETROS DE RUTA"route parameters" TIENE MAS FUERZA Y LLAMARIA LA RUTA "filter" COMO UN "ID" Y  CUMPLIRIA LO DE LA PRIMERA RUTA LA DE '/products/:id' Y NO EL '/products/filter' QUE DEBERIA MOSTRAR AL res.send('YO SOY UN FILTER');
app.get('/products/filter', (req,res)=>{
  res.send('YO SOY UN FILTER');
})


app.get('/products/:id', (req, res) =>{
  const id = req.params.id;
  res.json({
    id,
    name: "Product 1",
    price: 1000,
    store: "VEGA"
  })
});


/******* PRAMETROS QUERY(query params) ******/
// COMO EL PARAMETRO ES OPCIONAL NO VIENE DEFINIDO DIRECTAMENTE EN LA RUTA
// VIENE CON PARAMETROS DENTRO DE NUESTRO REQUEST
app.get('/users', (req,res) => {
  const { limit, offset } = req.query;
  // Como son opcionales deberiamos hacer una validacion
  if(limit && offset){
    res.json({
      limit,
      offset
    });
    //http://localhost:3000/users?limit=100&offset=0
    console.log(`Este es el limit => ${limit}`);
    console.log(`Este el offset => ${offset}`);
  } else {
    res.send("No hay parámetros");
  }
})



/**
 *  Conclusión
app.listen() inicia un servidor Express en un puerto.
Puede recibir hasta tres argumentos: port, hostname(opcional) y un callback opcional.
El callback se ejecuta cuando el servidor se inicia correctamente.
Se puede manejar errores con .on('error', callback).
.on('error', (err) => {
    console.error("Error al iniciar el servidor:", err.message);
});
 */
  // DECIRLE A NUESTRA APLICACION QUE DEBE ESCUCHAR EN UN PUERTO EN ESPECIFICO
  app.listen(port, () =>{
    console.log(`Escuchando en http://localhost:${port}`);
  });

