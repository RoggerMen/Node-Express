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
  app.get("/products", (req, res) => {
    res.json({
      name: "Product 1",
      price: 1000,
      store: "VEGA"
    });
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

