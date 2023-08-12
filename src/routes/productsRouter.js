import {Router} from 'express'
import * as productsController from '../controllers/productsController.js'
import {productsResponseFormatter} from '../middlewares/responseFormatter.js'
import {auth, checkAuthorizations} from '../middlewares/auth.js' 
import { errorHandler } from '../middlewares/errorHandler.js'



const productosRouter = Router()

productosRouter.route(['/:_id','/'])
.get(
    productsController.handleGet, 
    productsResponseFormatter,
    )

productosRouter.route('/')
.post(
    await checkAuthorizations("isAdmin", "isPremium"),
    productsController.handlePost, 
    productsResponseFormatter,
    )

productosRouter.route('/:_id')
.put(
    await checkAuthorizations("isAdmin", "isPremiumAndOwner"),
    productsController.handlePut, 
    productsResponseFormatter,
    )

productosRouter.route('/:_id')
.delete(
    await checkAuthorizations("isAdmin", "isPremiumAndOwner"),
    productsController.handleDelete, 
    productsResponseFormatter,
)

//productosRouter.use(responseFormatter)
productosRouter.use(errorHandler)

export default productosRouter 