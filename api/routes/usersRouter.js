const express = require('express');
const { faker } = require('@faker-js/faker');

// CON CADA "router" de "express.Router" ESTAMOS DEFINIENDO LAS RUTAS PARA PRODUCTOS
const router = express.Router();

router.get('/', function(req, res) {
  const users =[];
  const { size } = req.query;
  const limit = size || 20
  for ( let i = 0 ; i < limit ; i++){
    users.push({
      id: i+1,
      nombre: faker.person.firstName,
      apellido: faker.person.lastName,
      email: faker.internet.email(),
      telefono: faker.phone.number(),
      direccion: faker.location.direction()
    });
  }
  res.json(users);
})

router.get('/prueba', (req,res) => {
  const { limit, offset } = req.query;
  // Como son opcionales deberiamos hacer una validacion
  if(limit && offset){
    res.json({
      limit,
      offset
    });
    //http://localhost:3000/api/users/prueba?limit=100&offset=0
    console.log(`Este es el limit => ${limit}`);
    console.log(`Este el offset => ${offset}`);
  } else {
    res.send("No hay parámetros de /prueba");
  }
});

router.get('/:id', function (req, res) {
  const { id } = req.params;
  // Como son opcionales deberiamos hacer una validacion
  if(id){
    res.json({
      id,
      nombre: faker.person.firstName(),
      apellido: faker.person.lastName(),
      email: faker.internet.email(),
      telefono: faker.phone.number(),
      direccion: faker.location.direction()
    });
    //http://localhost:3000/users/123
    console.log(`Este es el id => ${id}`);
  }
});



module.exports = router;

