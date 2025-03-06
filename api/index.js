
  const express = require('express');
  const cors = require('cors');
  // NO TENGO QUE LLAMAR AL "./routes/index" PORQUE YA ES ALGO QUE SE LLAMA POR AUTOMATICO(DEFECTO) POR SER EL ARCHIVO PRINCIPAL
  // EL ARCHIVO "index" ES EL QUE SE BUSCA POR AUTOMATICO
  const routerApi = require('./routes');

  // IMPORTAMOS LOS "middlewares"
  const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');

  const app = express();
  const port = process.env.PORT || 3000;

  // IMPLEMENTAMOS UN "MIDDLEWARE" NATIVO QUE TIENE "express" QUE ES "express.json()"
  // ESTE "middleware" LO VAMOS A USAR CUANDO NOSOTROS QUEREMOS EMPEZAR A RECIBIR INFORMACION EN EL FORMATO DE "JSON"
  // CON ESTE AJUSTE DEBERIAMOS DE RECIBIR INFORMACION DE TIPO JSON QUE NOS ENVIAN POR  "POST"
  app.use(express.json());

  // DE ESTA MANERA ESTARIAMOS DICIENDOLE QUE VAMOS A HABILITAR ESTOS DOMINIOS, ESTOS ORIGENES Q VAN A TENER PERMISO DE HACER "REQUEST"
  // Y ASI HACEMOS QUE EL VECTOR DE ATAQUE SEA MUCHO MENOR Y CUALQUIER PERSONA NO PUEDA ENVIAR REQUES ASI POR ASI
  const whitelist = ['http://127.0.0.1:5500', 'https://myapp.com','http://127.0.0.1:3000'];
  // INSTALAMOS "npm install -g http-server" QUE ES PARA NODEJS
  // LUEGO USAMOS EN OTRA TERMINAL EL http-server -p 3000 O CUALQUIER OTRO NUMERO PARA CORRER EL PUERTO
  // PARA QUE FUNCIONE HACEMOS ESTO
  const options = {
    origin: (origin, callback) => {
      // SI REALMENTE ESE ORIGEN(DOMINIO) ESTA EN MI "whitelist" LA DEJAMOS PASAR Y EJECUTAMOS EL "callback" SINO PUES NO DEBERIAMOS DEJARLO PASAR
      // tambien hacemos esta condicional "!origin" para aceptar el mismo origen
      if (whitelist.includes(origin) || !origin) {
      // ACA LE DECIMOS ESE "origen" ESTA INCLUIDO? SI ES ASI, EJECUTAMOS UN "callback" DONDE LE DECIMO QUE NO HAY NINGUN ERROR(null) Y LE DECIMOS QUE EL ACCESO ESTA PERMITIDO(true)
      callback(null, true);
      } else { // Y SI NO EJECUTAMOS NUEVAMENTE NUESTRO "callback" Y LO QUE HACEMOS ES RETORNAR DIRECTAMENTE UN ERROR
        callback(new Error("NO PERMITIDO...!"))
      }
    }
  }
  // SIN ESTO POR DEFECTO SOLO ACEPTA SU MISMO ORIGEN(DOMINIO)
  // 'cors()' CON ESTA CONFIGURACION AHORA ACEPTARIA CUALQUIER ORIGEN(DOMINIO)
  app.use(cors(options));

  app.get("/api", (req, res) =>{
    //console.log(req); // Esto imprimirá todo el objeto req en la consola
    //COMO NOSOTROS NECESITAMOS RETORNAR ENTONCES USAMOS EL RESPONSE
    res.send("Hola Mi Server en Express");
    //console.log("Respuesta del servidor "  ,res)
  });

  app.get("/api/nueva-ruta", (req, res) => {
    res.send("<h1>Esta es la ruta nueva</h1>");
  });

  app.get("/api/home", (req, res) => {
    res.send("<h1>ESTA ES LA RUTA PRINCIPAL</h1>");
  });

  /***** SINGLE RESPONSABILITY PRINCIPLE ****/
  /*** PRINCIPIO DE RESPONSABILIDAD UNICA ***/
  // Usamos `routerApi` pasando `app` como argumento
  routerApi(app);

  /*** USAMOS LAS FUNCIONES "MIDDLEWARES" ***/
  // En el orden que los pongamos en estas lineas va a ser el orden con el cual se va a ejecutar uno tras el otro
  app.use(logErrors);
  app.use(boomErrorHandler);  // Este middleware maneja las excepciones de Boom y las convierte en respuestas HTTP adecuadas
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
