import {Router} from 'express'
import * as cartsController from '../controllers/cartsController.js'
import {errorHandler, errorHandlerJson} from '../middlewares/errorHandler.js'
import { cartsResponse } from '../middlewares/successfulResponse.js'

//consider getting multiple routes for every method, using arrays, adjust controller accordingly

const cartsRouter = Router()

cartsRouter.route('/userCart')
.get(
    cartsController.handleGetUserCart,
)
cartsRouter.route('/:cid')
.get(
    cartsController.handleGet,
    //cartsResponseFormatter,
)

cartsRouter.route('/:cid')
.get(
    cartsController.handleGetPopulated,
    //cartsResponseFormatter,
)

cartsRouter.route('/')
.post(
    cartsController.handlePostCart,
    //cartsResponseFormatter,
)

cartsRouter.route('/:cid/product/:pid')
.post(
    cartsController.handlePostProductInCart,
    //cartsResponseFormatter,

)
cartsRouter.route('/:cid/purchase')
.post(
    cartsController.handleCartPurchase,
    //cartsResponseFormatter,
)
cartsRouter.route('/:cid')
.put(
    cartsController.handlePutProductsInCart,
    //cartsResponseFormatter,
)

cartsRouter.route('/:cid/products/:pid')
.put(
    cartsController.handlePutUpdateQuantity,
    //cartsResponseFormatter,
)

cartsRouter.route('/:cid')
.delete(
    cartsController.handleDeleteCart, 
    //cartsResponseFormatter,
)

cartsRouter.route('/:cid/product/:pid')
.delete(
    cartsController.handleDeleteProductInCart,
    //cartsResponseFormatter,
)

cartsRouter.use(cartsResponse, errorHandlerJson)

export default cartsRouter 