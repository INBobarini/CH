class ProductManager{    
   static products = [];
   static idCounter = 0;

   constructor (product){
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.thumbnail = product.thumbnail;
        this.code = product.code;
        this.stock = product.stock;
        this.id = ProductManager.idCounter;
   }

   addProduct(){
      let newProduct = {...this}
      
      let codePresent = ProductManager.products.findIndex((e)=>e.code===newProduct.code)
      if(codePresent!==-1){return console.error("Código presente")}
      
      let emptyEntry = false;
      Object.values(newProduct).forEach((e)=>{
         if(e===""||e===undefined) {
            emptyEntry = true;
         }
      })
      if(emptyEntry){
         return console.error("campo vacío o indefinido")
      }

      ProductManager.products.push(newProduct);
      ProductManager.idCounter++;
      return product;
   }
   getProducts(){
      return ProductManager.products;
   }
   getProductById(id){
      let productFound = ProductManager.products.find(e=>e.id===id)
      return productFound === undefined? "Not Found" : productFound
   }
}


/*
let test = new ProductManager(product);

console.log(test.getProducts())
test.addProduct(product)
test = new ProductManager(product2)
test.addProduct(product2)
console.log(test.getProducts())
test.addProduct(product)
console.log(test.getProductById(1))
console.log(test.getProductById(5))

const product = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price:200,
    thumbnail:"Sin imagen",
    code:"abc123",
    stock:25
}
const product2 = {
   title: " producto 2",
   description: "Este es un producto prueba",
   price:50,
   thumbnail:"Sin imagen",
   code:"def456",
   stock:25
}
*/


 


   

/*
1. --Realizar una clase "ProductManager" que gestione un conjunto de productos.
Incluir: 
--Creación desde su constructor con el elemento products, el cual será un arregla vacío.
Propiedades de cada producto:
--title, description, price, thumbnail, code, stock
Metodo "addProduct" que agrega un producto al arreglo de productos inicial. Validar que no se repita el campo "code" y que todos los campos sean obligatorios
Metodo "getProducts" que devuelve el arreglo con todos los productos creados hasta ese momento
Metodo getProductById: busaca el arreglo que coincida con el id, si no coincide mostrar en consola un error "Not Found"
*/
/*
-- Testing --
Se creará una instancia de la clase “ProductManager”
Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
Se llamará al método “addProduct” con los campos:
title: “producto prueba”
description:”Este es un producto prueba”
price:200,
thumbnail:”Sin imagen”
code:”abc123”,
stock:25
El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
*/