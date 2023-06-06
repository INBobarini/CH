import * as cartsService from '../DAO/managers/cartsService.js'
import { cartsRepository } from '../repository/cartsRepository.js'

export async function handleGetUserCart(req,res,next){//descartar y usar get comun
    req.result = await cartsRepository.getCart(req.user.cart)
    req.statusCode = req.result? 200 : 401
    next()
}

export async function handleGet(req,res,next){
    req.result = await cartsRepository.getCart(req.params.cid)
    req.statusCode = req.result? 200 : 404
    next()
}

export async function handleGetPopulated(req,res,next){
    req.result = await cartsService.getCartwithPopulatedProducts(req.params.cid)
    req.statusCode = req.result? 200 : 404
    next()
}

export async function handlePostCart(req,res,next){
    req.result = await cartsRepository.createCart()
    req.statusCode = req.result? 201 : 400
    next()
}

export async function handlePostProductInCart(req,res,next){
    req.result = await cartsService.addProductToCart(req.params.cid, req.params.pid)
    req.statusCode = req.result? 201 : 400
    next()
}

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