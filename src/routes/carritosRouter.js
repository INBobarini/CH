import {Router} from 'express'
import CartsManager from "../controllers/cartsManager.js"

const carritosRouter = Router()

const cManager = new CartsManager;

carritosRouter.get('/:cid', async(req,res)=>{
    let cart = await cManager.getCart(req.params.cid)  
    console.log("GET CARRITO: " + req.params.cid)
    res.send(cart)
})

carritosRouter.post('/:cid/product/:pid', async(req,res)=>{
    console.log(`GET CARRITOS: C(${req.params.cid}) P(${req.params.pid})`)
    let updatedCart = await cManager.addProductToCart(req.params.cid,req.params.pid)
    res.send(updatedCart)
})

carritosRouter.post('/', async(req,res)=>{
    
    let cart = await cManager.addCart()
    res.send(cart)
})



export default carritosRouter 