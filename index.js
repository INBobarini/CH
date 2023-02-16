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
