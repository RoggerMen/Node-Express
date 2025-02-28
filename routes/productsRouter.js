const express = require('express');
// TRAEMOS EL SERVICIO
const ProductsService = require('../services/productService');

// CON CADA "router" de "express.Router" ESTAMOS DEFINIENDO LAS RUTAS PARA PRODUCTOS
const router = express.Router();

// CREAMOS UNA INSTANCIA DE SERVICIO
const service = new ProductsService

/***** SINGLE RESPONSABILITY PRINCIPLE ******/
//CADA ARTEFACTO PIEZA DE CODIGO DEBERIA TENER SOLO UNA UNICA RESPONSABILIDAD
// ESO SE PUEDE APLICAR PARA CLASES, ARCHIVOS O METODOS

// DE ESTA MANERA ESTAMOS SEPARANDO LA RESPONSABILIDAD PORQUE SABEMOS QUE EN "productsRouter" VAMOS A ENCONTRAR TODAS LAS RUTAS QUE TENGAN QUE VER CON LOS "PRODUCTOS"

  router.get("/", async (req, res) => {
    // COMO EL "service.find()" SE VUELVE UNA PROMESA LE COLOCAMOS EL "await"
    // SE CONVIERTE EN PROMESA PORQUE EN EL ARCHIVO DE "productService.js" LO HACEMOS ASYNC Y TODA FUNCION ASINCRONA SE CONVIERTE EN PROMESA
    const products = await service.find();
    res.json(products);
  })

  router.get('/filter', (req,res)=>{
    res.send('YO SOY UN FILTER');
  })


  router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const product = await service.findOne(id);
    res.json(product);
  });

  router.post('/', async (req, res) => {
    // PEDIMOS TODO EL CUERPO
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  });

  // el "PATCH" ES MUY PARECIDO A NUESTRO "POST" PORQUE TODO LO VA A RECIBIR EN UN CUERPO
  // LA UNICA DIFERENCIA ES QUE AQUI RECIBIMOS UN "id" EL ID DEL PRODUCTO QUE YO QUIERO EDITAR
  // EL "PATCH" NO NOS OBLIGA A ENVIAR TODOS LOS CAMPOS O ATRIBUTOS DEL PRODUCTO A ACTUALIZAR SINO QUE ES MAS FLEXIBLE Y PODEMOS ENVIARLE SOLO LOS QUE QUEREMOS ACTUALIZAR Y NO TODO EL OBJETO COMO LO HACE EL "PUT"
  router.patch('/:id', async (req, res) => {
    try {
      const id = req.params.id;
    // PEDIMOS TODO EL CUERPO
      const body = req.body;
      const productPatched = await service.update(id, body);
      res.json(productPatched);
    } catch (e) {
      res.status(404).json({
        message: 'Error Producto No Encontrado',
        // ESTE SE TRAE DEL ARCHIVO "productService.js" del "Throw new Error" SU MENSAJE
        error: e.message,
      })
    }
  });


  // EL "PUT" ES EXACTAMENTE IGUAL SOLO QUE NOS PIDE TODO EL OBJETO, TODO LOS CAMPOS Y ATRIBUTOS QUE SEAN COMPLETADOS PARA PODER ACTUALIZAR
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    // PEDIMOS TODO EL CUERPO
    const body = req.body;
    // PODEMOS HACERLO DE ESTA MANERA O COMO EL DEL PATCH
    res.json({
      message: 'update all products field with id: ' + id,
      data: {...body,
      id}
    })
  });

  // EL "DELETE" ES TAMBIEN SIMILAR AL PUT Y PATCH SOLO QUE NO VA A RECIBIR UN CUERPO SOLO EL "id"
  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const productDeleted = await service.delete(id);
    res.json(productDeleted)
  });


// CADA UNO DE LAS RUTAS TENDRIA UN MODULO EN ESTE CASO "router"
module.exports = router;


