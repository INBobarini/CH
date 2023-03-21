import {Router} from 'express'
import ProductManager from '../controllers/ProductManager.js';

const productosRouter = Router()

const pManager = new ProductManager; 


productosRouter.get('/', async(req,res)=>{
    console.log(`GET con limit: ${req.query.limit}`)
    let limit = req.query.limit
    let products = await pManager.getProducts()
    if(limit!==undefined){
        products.splice(limit)
    }
    return res.send (products)
})

productosRouter.get('/:pid', async(req,res)=>{
    console.log("GET: "+ req.params.pid)
    let product = await pManager.getProductById(req.params.pid)
    res.send(product)
})

productosRouter.post('/', async(req,res)=>{
    console.log("POST " + req.body)
    let product = await pManager.addProduct(req.body)
    res.send(product)
})

productosRouter.put('/:pid', async(req,res)=>{
    console.log("PUT" + [req.params.pid,req.body])
    let updatedProduct = await pManager.updateProduct(req.params.pid,req.body)
    res.send(updatedProduct)
})

productosRouter.delete('/:pid', async(req,res)=>{
    console.log({"DELETE":req.params.pid})
    let deletedProduct = await pManager.deleteProduct(req.params.pid)
    res.send(deletedProduct)
})

export default productosRouter 