import fs from 'fs'
const cartsPath = "./src/carrito.json"
const productsPath = "./src/productos.json"

async function loadCarts(){
    return JSON.parse(await fs.promises.readFile(cartsPath,'utf-8')) 
}
async function loadProducts(){
    return JSON.parse(await fs.promises.readFile(productsPath,'utf-8')) 
}
let carts = await loadCarts()

class CartsManager{
    constructor(){
        this.path = cartsPath
        this.carts = carts
    }

    async getCart(id){
        this.carts = await loadCarts()
        let cart = this.carts.find((e)=>e.id==id) //id viene como string
        return cart
    }

    async addProductToCart(cid,pid){
        //TODO error si no se encuentra el producto o el carrito
        let products = await loadProducts()
        if (!products.find((e)=>e.id==pid)){return {error:"producto no encontrado"}}
        let carts = await loadCarts()
        if (!carts.find((e)=>e.id==cid)){return {error:"carrito no encontrado"}}
        
        let cart = await this.getCart(cid)
        let i = cart.products.findIndex(e=>e.product==pid)//index del array products
        if(i === -1||i === undefined){cart.products.push({product:pid, quantity:1})}
        else {cart.products[i].quantity++}
        console.log(`producto (${pid}) agregado al carrito:${pid}`)
        let json = JSON.stringify(this.carts, null,'\t')
        await fs.promises.writeFile(this.path, json)
        return cart
    }

    async addCart(){
        this.carts = await loadCarts()
        let idArray = carts.map((e)=>e.id)
        class Cart{
            constructor(){
                this.id = 1 + idArray.reduce((acc,cur)=>cur>=acc?cur:acc,0);
                this.products = []
            }
        }
        const cart = new Cart
        this.carts.push(cart)
        console.log("carrito creado:")
        console.table(cart)
        let json = JSON.stringify(this.carts,null,'\t')
        await fs.promises.writeFile(this.path, json)
        return cart
    }
}



export default CartsManager;