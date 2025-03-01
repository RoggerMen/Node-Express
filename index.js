
  const express = require('express');
  // NO TENGO QUE LLAMAR AL "./routes/index" PORQUE YA ES ALGO QUE SE LLAMA POR AUTOMATICO(DEFECTO) POR SER EL ARCHIVO PRINCIPAL
  // EL ARCHIVO "index" ES EL QUE SE BUSCA POR AUTOMATICO
  const routerApi = require('./routes');

  // IMPORTAMOS LOS "middlewares"
  const { logErrors, errorHandler } = require('./middlewares/errorHandler');

  const app = express();
  const port = 3000;

  // IMPLEMENTAMOS UN "MIDDLEWARE" NATIVO QUE TIENE "express" QUE ES "express.json()"
  // ESTE "middleware" LO VAMOS A USAR CUANDO NOSOTROS QUEREMOS EMPEZAR A RECIBIR INFORMACION EN EL FORMATO DE "JSON"
  // CON ESTE AJUSTE DEBERIAMOS DE RECIBIR INFORMACION DE TIPO JSON QUE NOS ENVIAN POR  "POST"
  app.use(express.json());

  app.get("/", (req, res) =>{
    //console.log(req); // Esto imprimirá todo el objeto req en la consola
    //COMO NOSOTROS NECESITAMOS RETORNAR ENTONCES USAMOS EL RESPONSE
    res.send("Hola Mi Server en Express");
    //console.log("Respuesta del servidor "  ,res)
  });

  app.get("/nueva-ruta", (req, res) => {
    res.send("<h1>Esta es la ruta nueva</h1>");
  });

  app.get("/home", (req, res) => {
    res.send("<h1>ESTA ES LA RUTA PRINCIPAL</h1>");
  });

  /***** SINGLE RESPONSABILITY PRINCIPLE ****/
  /*** PRINCIPIO DE RESPONSABILIDAD UNICA ***/
  // Usamos `routerApi` pasando `app` como argumento
  routerApi(app);

  /*** USAMOS LAS FUNCIONES "MIDDLEWARES" ***/
  // En el orden que los pongamos en estas lineas va a ser el orden con el cual se va a ejecutar uno tras el otro
  app.use(logErrors);
  app.use(errorHandler);

  // DECIRLE A NUESTRA APLICACION QUE DEBE ESCUCHAR EN UN PUERTO EN ESPECIFICO
  app.listen(port, () =>{
    console.log(`Escuchando en http://localhost:${port}`);
  });

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
