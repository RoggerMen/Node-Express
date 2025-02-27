
const { faker } = require('@faker-js/faker');

class ProductsService{

  constructor(){
    this.products = [];
    // ESTE "this.generate()" LO CORREMOS DIRECTAMENTE EN EL CONSTRUCTOR
    // QUIERE DECIR QUE CADA VEZ QUE GENEREMOS UNA INSTANCIA DEL SERVICIO VA A EMPEZAR Y GENERAR ESOS 100 PRODUCTOS INICIALES
    this.generate(); // LLenamos los productos al iniciar la clase
  }

  // METODOS
  generate(){
    const limit = 100;

  /*** AQUI LLENAMOS NUESTRO PRODUCTOS ****/
    for (let i = 0; i < limit ; i++) {
      this.products.push({
        id : String(i+1),
        name: faker.commerce.productName(),
        // Lo parseamos porque el precio nos viene como un "string" y lo CONVERTIMOS A NUMERO EN BASE 10
        price: parseInt(faker.commerce.price(),10),
        store: faker.company.name(),
        country: faker.location.country(),
        image: faker.image.url()
      });
    }
  }

  create() {

  }

  find(){
    return this.products;
  }

  findOne(id){
    return this.products.find(item => item.id === id );
  }

  update(){

  }

  delete(){

  }

}


module.exports = ProductsService;
