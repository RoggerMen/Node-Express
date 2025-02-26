
const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');

  // Tambien podemos USAR otro tipo de formato el JSON ".json"(javascript object notetion)

  // obtener un endpoint con 2 PARAMETROS
  // ACA MOSTRAMOS LA DESTRUCTURACION
  // DE ESTA MANERA ESTAMOS CAPTURANDO LOS PARAMETROS QUE VIENEN POR URL Y LOS ESTAMOS RECOGIENDO DESDE NUESTRO PROGRAMA Y LOS IMPRIMIMOS DE RETORNO
  router.get('/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;
    res.json({
      categoryId,
      productId,
    });
  });

  router.get('/:categoryId', (req, res) => {
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

  router.get('/',(req,res)=>{
    const categories = [];
    const products = [];
    for(let n=1; n <= 5 ; n++){
      products.push({
        productId: n,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        store: faker.company.name()
      })
    }
    for( let i=1; i <= 15 ; i++){
      categories.push({
        categoryId: i,
        category: faker.commerce.department(),
        products
      })
    }
    res.json(categories);

  });


module.exports = router;

