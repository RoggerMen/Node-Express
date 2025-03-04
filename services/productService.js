
const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

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
        // en el "id" TAMBIEN podriamos usar  id : faker.database.mongodbObjectId(),
        // PARA NO TENER PROBLEMAS MAS ADELANTE POR EL TEMA DEL ".length + 1" EN LA FUNCION CREATE
        id : String(i+1),
        name: faker.commerce.productName(),
        // Lo parseamos porque el precio nos viene como un "string" y lo CONVERTIMOS A NUMERO EN BASE 10
        price: parseInt(faker.commerce.price(),10),
        store: faker.company.name(),
        country: faker.location.country(),
        image: faker.image.url(),
        // PRODUCTO QUE NO SE PUEDE VER OSEA QUE LO BLOQUEA(PRODUCTO BLOQUEADO)
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id : String(this.products.length + 1),
      ...data
    }
    // LE DECIMOS QUE QUEREMOS INSERTAR ESE NUEVO PRODUCTO A NUESTRO ARRAY
    this.products.push(newProduct);
    return newProduct;
  }

  find(){
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve(this.products);
      }, 1000);
    })
  }

  async findOne(id){

    // NOS RETORNA EL PRIMER OBJETO ENCONTRADO
    const product = this.products.find(item => item.id === id );
    if (!product) {
      // GENERAMOS UNA VALIDACION POR SI HAY ERROR
      throw boom.notFound("Product not found");
    }
    if (product.isBlock) {
      // "conflict" es un error de tipo 409
      throw boom.conflict("Product is block");
    }
    return product;
  }

  async update(id, changes){
    // NOS RETORNA LA POSICION EN LA QUE ESTA EL OBJETO(INDICE)
    const index = this.products.findIndex(item => item.id === id);
    // HACEMOS UNA VALIDACION
    // SI "findIndex" NO ENCUENTRA EL ELEMENTO LO MAS NORMAL ES QUE NOS DEVUELVA EL -1
    if(index === -1){
      throw boom.notFound("Product not found");
    } else {
      const product = this.products[index];
      // COMO YA TENEMOS EL "id" Y LOS "changes" Y YA SABEMOS CUAL ES LA POSICION
      // VAMOS A NUESTRO ARRAY EN MEMORIA("this.products") Y LE DECIMOS "[index" EN LA POSICION EN LA QUE ENCUENTRE EL OBJETO PUES APLIQUE ESOS "CAMBIOS"(changes)
      this.products[index] = {
        // NO QUIERO ELIMINAR O CAMBIAR TODO QUIERO PERSISTIR TODO LO QUE HAY DE LOS ATRIBUTOS DEL PRODUCTO Y QUE APLIQUES TODOS LOS NUEVOS CAMBIOS
       ...product,
       ...changes
      };

    }
    return this.products[index]; // NOS RETORNA EL PRODUCTO CON LOS CAMBIO
  }

  async delete(id){
     // NOS RETORNA LA POSICION EN LA QUE ESTA EL OBJETO(INDICE)
     const index = this.products.findIndex(item => item.id === id);
     // HACEMOS UNA VALIDACION
     // SI "findIndex" NO ENCUENTRA EL ELEMENTO LO MAS NORMAL ES QUE NOS DEVUELVA EL -1
     if(index === -1){
      throw boom.notFound("Product not found");
  } else {
    // LO QUE NOS PERMITE EL ".splice" ES ENVIAR UNA POSICION PARA PODER ELIMINARLA Y CUANTOS ELEMENTOS ELIMINAR APARTIR DE ESA POSICION
    // CON "1" LE DECIMOS QUE QUEREMOS ELIMINAR UN ELEMENTO APARTIR DE ESA POSICION OSEA A EL MISMO
    this.products.splice(index, 1)
  }
  return {message: `El producto con ID => ${id} fue eliminado`};
  }
}


module.exports = ProductsService;
