import * as cartsService from '../services/cartsService.js'
import { cartsRepository } from '../repository/cartsRepository.js'
import { current } from '../middlewares/auth.js'
import { checkReqResult } from './utils/checkNotEmptyResult.js'
import { winstonLogger as logger } from '../utils/winstonLogger.js'

export async function handleGetUserCart(req,res,next){
    try{
        req.result = await cartsRepository.getCart(req.user.cart)
        next()
    }
    catch(err){
        next(err)
    }
}

export async function handleGet(req,res,next){
    try{
        req.result = await cartsRepository.getCart(req.params.cid)
        next()
    }
    catch(err){
        next(err)
    }
}

export async function handleGetPopulated(req,res,next){
    try{
        req.result = await cartsService.getCartWithPopulatedProducts(req.params.cid)
        if(req.result instanceof Error){
            throw req.result
        }
        next()
    }
    catch(err){
        next (err)
    }
}

export async function handlePostCart(req,res,next){
    try{
        req.result = await cartsRepository.createCart()
        next()
    }
    catch(err){
        next (err)
    }
}

export async function handlePostProductInCart(req,res,next){
    try {
        req.result = await cartsService.addProductToCart(req.params.cid, req.params.pid)
        next()
    } 
    catch (err) {
        next (err)
    }
}

export async function handleCartPurchase(req,res,next){
    try{ 
        let purchaser = await current(req.session) //email
        req.result = await cartsService.purchaseCart(req.params.cid, purchaser.email )
        next()
    }
    catch(err){
        next(err)
    }
}

export async function handlePutProductsInCart(req,res,next){//req.body es un arreglo [{product_Id:,quantity:x}]
    req.result = await cartsService.fillCart(req.params.cid, req.body)
    next()
}

export async function handlePutUpdateQuantity(req,res,next){//req.body = {"quantity":"9"}
    req.result = await cartsService.updateQuantOfProductInCart(
        req.params.cid, req.params.pid, req.body[0].quantity
    )
    next()
}

export async function handleDeleteCart(req,res,next){
    req.result = await cartsService.emptyCart(req.params.cid)
    
    next() 
}

export async function handleDeleteProductInCart(req,res,next){
    req.result = await cartsService.removeProductFromCart(req.params.cid, req.params.pid)
    
    next()
}