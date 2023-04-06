import {Router} from 'express'
//import ProductManager from '../controllers/ProductManager.js';
import mongoose from 'mongoose'
import {productosModel} from '../database/mongoose.js'

const productosRouter = Router()

//const pManager = new ProductManager; 

//const pManager = productosDb

productosRouter.get('/', async(req,res)=>{
    const result = await productosModel.find()
    console.log(`GET con limit: ${req.query.limit}`)
    let limit = req.query.limit
    if(limit!==undefined){
        products.splice(limit)
    }
    res.send({status:"success", payload:result})
})

productosRouter.get('/:pid', async(req,res)=>{
    console.log("GET: "+ req.params.pid)
    let result = await pManager.getProductById(req.params.pid)
    res.send({status:"success", payload:result})
})

productosRouter.post('/', async(req,res)=>{
    let {title, description, code, price, thumbnail, stock, status} = req.body
    let result = ""
    try{
        result = await productosModel.create({
        title, description, code, price, thumbnail, stock, status,
    })
    res.send({status:"success", payload:result})
    }
    catch(error){
        console.log(error)
        res.send({status:"failure", payload:{}})
    }
})

productosRouter.put('/:pid', async(req,res)=>{
    console.log("PUT" + [req.params.pid,req.body])
    
    let {pid}=req.params.pid
    
    //res.send(updatedProduct)
})

productosRouter.delete('/:pid', async(req,res)=>{
    console.log({"DELETE":req.params.pid})
    let deletedProduct = await pManager.deleteProduct(req.params.pid)
    res.send(deletedProduct)
})

export default productosRouter 