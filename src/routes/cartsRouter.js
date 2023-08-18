import {Router} from 'express'
import * as cartsController from '../controllers/cartsController.js'
import {errorHandler, errorHandlerJson} from '../middlewares/errorHandler.js'

//consider getting multiple routes for every method, using arrays, adjust controller accordingly

const cartsRouter = Router()

cartsRouter.route('/userCart')
.get(
    cartsController.handleGetUserCart,
)
cartsRouter.route('/:cid')
.get(
    cartsController.handleGet,
    
)

cartsRouter.route('/:cid')
.get(
    cartsController.handleGetPopulated,
    
)

cartsRouter.route('/')
.post(
    cartsController.handlePostCart,
    
)

cartsRouter.route('/:cid/product/:pid')
.post(
    cartsController.handlePostProductInCart,
    

)
cartsRouter.route('/:cid/purchase')
.post(
    cartsController.handleCartPurchase,
    
)
cartsRouter.route('/:cid')
.put(
    cartsController.handlePutProductsInCart,
    
)

cartsRouter.route('/:cid/products/:pid')
.put(
    cartsController.handlePutUpdateQuantity,
    
)

cartsRouter.route('/:cid')
.delete(
    cartsController.handleDeleteCart, 
    
)

cartsRouter.route('/:cid/product/:pid')
.delete(
    cartsController.handleDeleteProductInCart,
    
)

cartsRouter.use(errorHandlerJson)

export default cartsRouter 