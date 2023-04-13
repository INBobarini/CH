import {Router} from 'express'
import CartsManager from "../controllers/cartsManager.js"
import {productosModel} from '../models/schemas.js'
import {cartsModel} from '../models/schemas.js'
import { cManager } from '../controllers/productManagerDb.js'



const carritosRouter = Router()

//const cManager = new CartsManager;

carritosRouter.get('/:cid', async(req,res)=>{
    let result = await cManager.getOne(req.params.cid)
    console.log(req.params.cid)
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

export default carritosRouter 