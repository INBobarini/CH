import {Router} from 'express'
import { cManager } from '../controllers/cartsManagerDb.js'
import {responseObj as responseInstance} from '../middlewares/responseFormatter.js'
import { populateCartProducts } from '../middlewares/populateProductsInCarts.js'

const carritosRouter = Router()

carritosRouter.get('/last', async(req,res)=>{//temporario para usar el mismo carrito en los test
    //rutas sin populate van arriba porque si no, el middleware arranca 
    //y queda colgado esperando un id cuando no hace falta
    let result = await cManager.getLast()
    return res.status(200).send({status:"success", payload:result})
})
carritosRouter.get('/:cid', populateCartProducts, async(req,res)=>{
    await cManager.getOne(req.params.cid)
    let result = req.cart //esto sale del populate
    return res.status(200).send({status:"success", payload:result})
})

carritosRouter.post('/:cid/product/:pid', async(req,res)=>{
    let result = await cManager.addProduct(req.params.cid, req.params.pid)
    return res.status(200).send({status:"success", payload:result})
})

carritosRouter.post('/', async(req,res)=>{
    let result = await cManager.createOne()
    res.status(200).send({status:"success", payload:result})
})

carritosRouter.put('/:cid', async(req,res)=>{
    let result = await cManager.addProducts(req.params.cid, req.body) //body es array de {prodId,quant}
    res.status(200).send({status:"success", payload:result})
})

carritosRouter.put('/:cid/products/:pid', async(req,res)=>{ //req.body = {"quantity":"9"}
    let result = await cManager.updateQuantity(req.params.cid, req.params.pid, req.body[0].quantity)
    return res.status(200).send({status:"success", payload:result})
})

carritosRouter.delete('/:cid', async(req,res)=>{
    let result = await cManager.emptyCart(req.params.cid)
    res.status(200).send({status:"success", payload:result})
})

carritosRouter.delete('/:cid/product/:pid', async(req,res)=>{
    let result = await cManager.removeProduct(req.params.cid, req.params.pid)
    return res.status(200).send({status:"success", payload:result})
})



export default carritosRouter 