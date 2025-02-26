const express = require('express');
const { faker } = require('@faker-js/faker');

// CON CADA "router" de "express.Router" ESTAMOS DEFINIENDO LAS RUTAS PARA PRODUCTOS
const router = express.Router();
/***** SINGLE RESPONSABILITY PRINCIPLE ******/
//CADA ARTEFACTO PIEZA DE CODIGO DEBERIA TENER SOLO UNA UNICA RESPONSABILIDAD
// ESO SE PUEDE APLICAR PARA CLASES, ARCHIVOS O METODOS

// DE ESTA MANERA ESTAMOS SEPARANDO LA RESPONSABILIDAD PORQUE SABEMOS QUE EN "productsRouter" VAMOS A ENCONTRAR TODAS LAS RUTAS QUE TENGAN QUE VER CON LOS "PRODUCTOS"

  // SI ES UNA LISTA DE PRODUCTOS TENEMOS QUE HACERLOS EN ARRAYS "[]"
  /******* ESTA PARTE AGREGAMOS TAMBIEN EL "req.query" *********/
  /**** SEPARANDO RESPONSABILIDAD *******/
  // GENERAMOS UN "ROUTER" ESPECIFICO PARA LOS PRODUCTOS
  // COMO PODEMOS VER AQUI NO ESTA "/products" solo dejamos los detalles, lo que iria despues del SLASH(/) ENDPOINT PRINCIPAL Y ASI CON LOS DEMAS
  // ESTOS LO EXPORTAMOS COMO UN "MODULO" "module.exports = router"
  // DONDE DESPUES IMPORTAREMOS ESTE MODULO EN EL "index.js" DE LA CARPETA "routes" PARA USAR LAS RUTAS CREADAS AQUI
  router.get("/", (req, res) => {
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

  router.get('/filter', (req,res)=>{
    res.send('YO SOY UN FILTER');
  })


  router.get('/:id', (req, res) =>{
    const id = req.params.id;
    res.json({
      id,
      name: "Product 1",
      price: 1000,
      store: "VEGA"
    })
  });

// CADA UNO DE LAS RUTAS TENDRIA UN MODULO EN ESTE CASO "router"
module.exports = router;


