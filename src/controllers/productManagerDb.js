import mongoose from 'mongoose'
import productosDb from '../database/mongoose.js'

//let prodLibraryPath = "./src/public/productos.json"
//let productLibrary =  await loadProducts()


async function loadProducts(){//carga en memoria por primera vez
    const productos = await productosDb.create()
}
class ProductManager{
    static idCounter = 0;
    constructor(){
        this.path = prodLibraryPath
        this.products = productLibrary
    }

    async addProduct(obj){ 
        if(!validProduct(obj)){return {"error":"producto inválido"}}
        if(repeatedCode(obj.code)){return ({"error":`producto ya presente`})}
        this.products = await loadProducts()
        let idArray = this.products.map((e)=>e.id)
        class Product{
            constructor(obj){
                this.title = obj.title;
                this.description = obj.description;
                this.code = obj.code;
                this.price = obj.price;
                this.thumbnail = obj.thumbnail||[];
                this.stock = obj.stock;
                this.status = obj.status;
                this.id = 1 + idArray.reduce((acc,cur)=>cur>=acc?cur:acc,0);
                //el id a asignar es el maximo id encontrado +1, 0 por si no hay productos cargados
            }
        }
        let product = new Product(obj)
        this.products.push(product) //guardar en el arreglo
        console.log(`product○ agregado:`)
        console.table(product)
        let json = JSON.stringify(this.products,null,'\t')
        await fs.promises.writeFile(this.path, json)
        return product;
    }
    async getProducts(){ //leer el archivo de productos y devolver un arreglo con los productos
        let productos = JSON.parse(await fs.promises.readFile(this.path,'utf-8'))
        this.products = productos;
        return this.products;
    }
    async getProductById(id){//lee el archivo, busca el producto con el id y lo devuelve como objeto
        let products = await this.getProducts()
        let found = products.find(e=>e.id==id)
        return found? found : {error:"No encontrado"}
    }
    async updateProduct(id,obj){//recibir el id del producto a actualizar y campo a actualizar/objeto completo, no borrar ID. 
        if (obj.hasOwnProperty("id")){delete obj.id} //eliminamos el key id si viene para ser actualizado
        this.products = await this.getProducts()
        let i = this.products.findIndex(e=>{return e.id==id}) //index se pasa como string
        if(i===-1){return {error:"No encontrado"}}
        if(obj.hasOwnProperty("thumbnail")&&this.products[i].thumbnail.length){
            obj.thumbnail = this.products[i].thumbnail.concat(obj.thumbnail)
        }
        let productToUpdate = this.products[i]
        let updatedProduct = Object.assign(productToUpdate,obj)
        this.products[i] = updatedProduct //guardar en el arreglo
        console.log(`product○ modificado:`)
        console.table(this.products[i])
        let json = JSON.stringify(this.products,null,'\t')
        await fs.promises.writeFile(this.path, json)
        return this.products[i];
    }
    async deleteProduct(id){//eliminar el producto que tenga ese id de archivo
        let products = await this.getProducts()
        let i = products.findIndex(e=>{return e.id==id})
        if (i===-1) return {error:"No encontrado"}
        let deletedProduct = products[i]
        products.splice(i, 1)
        let json = JSON.stringify(products, null,'\t')
        await fs.promises.writeFile(this.path, json)
        return deletedProduct
    }
}
function repeatedCode(newCode){//verifica si el codigo se repitió retorna falso si es único, el id si está reptido
    let repeated = false;
    for (const product of productLibrary){
        if (product.code === newCode){
            repeated = true; 
        }
    };
    return repeated
}

const pAttReq = {
    title: true,
    description: true,
    code: true,
    price: true,
    stock: true,
    category: true,
    thumbnails: false,
    status: true,
}
const pAttTypes = {
    title: "string",
    description: "string",
    code: "string",
    price: "number",
    stock: "number",
    category: "string", 
    thumbnails: "object", //un array es de tipo objeto
    status: "boolean",
}
function validProduct(obj){
    if (!obj.hasOwnProperty("status")){//agrega la key "status" si no está
        Object.assign(obj,{status:true})
    }
    
    let hasSameLength = Object.keys(pAttReq).length === Object.keys(obj).length 
    if (!hasSameLength) {return {hasSameLength}}//chequea que el producto nuevo tenga tantas propiedades como el producto modelo

    return validData(obj)
}

function validData(obj){// validData() va separado de validProduct() porque se usa en el metodo put/update y no sólo en el post/add
    let hasSameKeys = Object.keys(obj).reduce((acc,val)=>{//chequea que las propiedades del nuevo producto sean las del producto modelo
        return acc && pAttReq.hasOwnProperty(val)},true
    )
    if (!hasSameKeys) {return {hasSameKeys}}
    
    let hasReqValues = true
    for (const key in obj){
        if(pAttReq[key]){// solo chequear los campos obligatorios
            if(obj[key]===0){return true} // pasa si el valor es 0, porque 0 es falso en JS
            if((obj[key]=="")||(obj[key]==[])) { //verifica si es empty string/array
                hasReqValues = false
                return
            }
        }
    }   
    if (!hasReqValues) {return {hasReqValues}}
    
    let hasCorrectTypes = true
    for (const key in obj){//verifica los tipos de los valores contra el modelo de producto
        if(pAttTypes[key]!=typeof(obj[key])) hasCorrectTypes = false
    }
    if (!hasCorrectTypes) {return {hasCorrectTypes}}

    return true
}


export default ProductManager;