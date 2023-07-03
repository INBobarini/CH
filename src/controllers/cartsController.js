import * as cartsService from '../services/cartsService.js'
import { cartsRepository } from '../repository/cartsRepository.js'
import { current } from '../middlewares/auth.js'
import { checkReqResult } from './utils/checkNotEmptyResult.js'

export async function handleGetUserCart(req,res,next){
    try{
        req.result = await cartsRepository.getCart(req.user.cart)
        req.statusCode = checkReqResult(req.result, 200)
        next()
    }
    catch(err){
        next(err)
    }
}

export async function handleGet(req,res,next){
    try{
        req.result = await cartsRepository.getCart(req.params.cid)
        req.statusCode = checkReqResult(req.result, 200)
        next()
    }
    catch(err){
        next(err)
    }
}

export async function handleGetPopulated(req,res,next){
    try{
        req.result = await cartsService.getCartwithPopulatedProducts(req.params.cid)
        req.statusCode = checkReqResult(req.result, 200)
        next()
    }
    catch(err){
        next (err)
    }
}

export async function handlePostCart(req,res,next){
    try{
        req.result = await cartsRepository.createCart()
        req.statusCode = checkReqResult(req.result, 201)
        next()
    }
    catch(err){
        next (err)
    }
}

export async function handlePostProductInCart(req,res,next){
    try {
        req.result = await cartsService.addProductToCart(req.params.cid, req.params.pid)
        req.statusCode = checkReqResult(req.result, 201)
        next()
    } 
    catch (err) {
        next (err)
    }
}

export async function handleCartPurchase(req,res,next){
    try{ 
        let purchaser = current(req.session) //email
        req.result = await cartsService.purchaseCart(req.params.cid, purchaser.email )
        req.statusCode = req.result? 201 : 400
        return res.status(req.statusCode).send(req.result)//fix this
        next()
    }
    catch(err){
        next(err)
    }
}
//continue here
export async function handlePutProductsInCart(req,res,next){//req.body es un arreglo [{product_Id:,quantity:x}]
    req.result = await cartsService.fillCart(req.params.cid, req.body)
    req.statusCode = req.result? 201 : 400
    next()
}

export async function handlePutUpdateQuantity(req,res,next){//req.body = {"quantity":"9"}
    req.result = await cartsService.updateQuantOfProductInCart(
        req.params.cid, req.params.pid, req.body[0].quantity
    )
    req.statusCode = req.result? 201 : 400
    next()
}

export async function handleDeleteCart(req,res,next){
    req.result = await cartsService.emptyCart(req.params.cid)
    req.statusCode = req.result? 200 : 404
    next() 
}

export async function handleDeleteProductInCart(req,res,next){
    req.result = await cartsService.removeProductFromCart(req.params.cid, req.params.pid)
    req.statusCode = req.result? 200 : 404
    next()
}