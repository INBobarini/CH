import {Router} from 'express'
import * as productsController from '../controllers/productsController.js'
import {productsResponse} from '../middlewares/successfulResponse.js'
import {checkAuthorizations, hasSession} from '../middlewares/auth.js' 
import { errorHandler, errorHandlerJson } from '../middlewares/errorHandler.js'



const productosRouter = Router()

productosRouter.route(['/:_id','/'])
.get(
    productsController.handleGet, 
    productsResponse,
    )

productosRouter.route('/')
.post(
    await checkAuthorizations("isAdmin", "isPremium"),
    productsController.handlePost, 
    )

productosRouter.route('/:_id')
.put(
    hasSession,
    await checkAuthorizations("isAdmin", "isPremiumAndOwner"),
    productsController.handlePut, 
    productsResponse,
    )

productosRouter.route('/:_id')
.delete(
    hasSession,
    await checkAuthorizations("isAdmin", "isPremiumAndOwner"),
    productsController.handleDelete, 
)

productosRouter.use(errorHandlerJson)

export default productosRouter 