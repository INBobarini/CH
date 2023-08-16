import {Router} from 'express'
import * as productsController from '../controllers/productsController.js'
import {productsResponse} from '../middlewares/successfulResponse.js'
import {auth, checkAuthorizations} from '../middlewares/auth.js' 
import { errorHandler } from '../middlewares/errorHandler.js'



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
    productsResponse,
    )

productosRouter.route('/:_id')
.put(
    await checkAuthorizations("isAdmin", "isPremiumAndOwner"),
    productsController.handlePut, 
    productsResponse,
    )

productosRouter.route('/:_id')
.delete(
    await checkAuthorizations("isAdmin", "isPremiumAndOwner"),
    productsController.handleDelete, 
    productsResponse,
)


productosRouter.use(errorHandler)

export default productosRouter 