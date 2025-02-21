/** EN LA TERMINAL AGREGAMOS EN DEPENDENCIAS DE DESARROLLO
 * npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D
 * tambien aparte npm install @eslint/js --save-dev

 */
/** USAMOS "https://www.toptal.com/developers/gitignore" PARA CREAR TODO PARA ".gitignore" AGREGAMOS El "node","windows", "linux" y "macos"
 */
/** AGREGAMOS TAREAS EN EL "script" ASI COMO EL "dev","start" y "lint" PARA CORRERLOS SIN PROBLEMA POR COMANDO "npm run dev(dev)" HACIENDOLO CORRER EN NODEMON y "npm run start(produccion) corriendo en el mismo node QUE NOS DA 1 VEZ NO COMO EL "nodemon" QUE SE QUEDA SIEMPRE
 * "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js",
    "lint": "eslint"
  },
 */

  const express = require('express');

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
  app.get("/products", (req, res) => {
    res.json([
      {
        name: "Product 1",
        price: 1000,
        store: "VEGA"
      },
      {
        name: "Product 2",
        price: 1200,
        store: "OXXO"
      }
    ]);
  })
  // Endpoint para recibir o devolver el DETALLE DE UN PRODUCTO recibiendo el "id"
  // RECIBIMOS UN IDENTIFICADOR(id) LA CUAL LE AGREGAMOS LOS ":"(DOS PUNTOS) PARA DECIR QUE VA A SER UN PARAMETRO
  // DESDE LA PARTE DEL CLIENTE NOS DARAN EL PARAMETRO "id" PARA USARLO EN LA PARTE SERVIDOR USANDO EL "req"
  // USAMOS EL "req.params" PARA RECIBIR EL ID DEL PRODUCTO
  // LO SIGUIENTE DEL "req.params" por ejemplo id, o productId VIENE A SER DE ACUERDO A LO QUE COLOQUES EN LA RUTA(PATH) '/products/:id' o '/products/:productId' SERA LO SIGUIENTE DEL "req.params" por ejemplo "req.params.id" o "req.params.productId"
  // PUEDES TAMBIEN HACERLO DE OTRA FORMA QUE ES MAS LIMPIA Y ES USANDO LA DESTRUCTURACION DE "ECMASCRIPT"
  // Esta sintaxis "req.params" HACE QUE DE TODOS LOS PARAMETROS QUE PUEDE TENER ESTE OBJETO SOLO ME INTERESA EL "id" HACIENDO LA DESTRUCTURACION DE ESTA MANERA { id }
  // const { id } = req.params
  app.get('/products/:id', (req, res) =>{
    const id = req.params.id;
    res.json({
      id,
      name: "Product 1",
      price: 1000,
      store: "VEGA"
    })
  });

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
  })

/**
 *  Conclusión
app.listen() inicia un servidor Express en un puerto.
Puede recibir hasta tres argumentos: port, hostname y un callback opcional.
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

