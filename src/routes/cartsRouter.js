import {Router} from 'express'
import { cManager } from '../DAO/cartsManagerDb.js'
import * as cartsController from '../controllers/cartsController.js'
import { cartsResponseFormatter } from '../middlewares/responseFormatter.js'

//consider getting multiple routes for every method, using arrays, adjust controller accordingly

const carritosRouter = Router()

carritosRouter.route('/usercart')
.get(
    cartsController.handleGetUserCart,
    cartsResponseFormatter
)
carritosRouter.route('/:cid')
.get(
    cartsController.handleGet,
    cartsResponseFormatter
)

carritosRouter.route('/')
.post(
    cartsController.handlePostCart,
    cartsResponseFormatter
)

carritosRouter.route('/:cid/product/:pid')
.post(
    cartsController.handlePostProductInCart,
    cartsResponseFormatter
)
carritosRouter.route('/:cid')
.put(
    cartsController.handlePutProductsInCart,
    cartsResponseFormatter
)

carritosRouter.route('/:cid/products/:pid')
.put(
    cartsController.handlePutUpdateQuantity,
    cartsResponseFormatter
)

carritosRouter.route('/:cid')
.delete(
    cartsController.handleDeleteCart, 
    cartsResponseFormatter
)

carritosRouter.route('/:cid/product/:pid')
.delete(
    cartsController.handleDeleteProductInCart,
    cartsResponseFormatter
)



export default carritosRouter 