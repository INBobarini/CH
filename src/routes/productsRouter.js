import {Router} from 'express'
import * as productsController from '../controllers/productsController.js'
import {productsResponseFormatter} from '../middlewares/responseFormatter.js'
import {auth} from '../middlewares/auth.js' 
import { errorHandler } from '../middlewares/errorHandler.js'



const productosRouter = Router()

productosRouter.route(['/:_id','/'])
.get(
    productsController.handleGet, 
    productsResponseFormatter,
    errorHandler
    )

productosRouter.route('/')
.post(
    await auth({notUser:true}),
    productsController.handlePost, 
    productsResponseFormatter,
    errorHandler
    )

productosRouter.route('/:_id')
.put(
    //await auth({notUser:true}),
    productsController.handlePut, 
    productsResponseFormatter
    )

productosRouter.route('/:_id')
.delete(
    await auth({notUser:true}),
    productsController.handleDelete, 
    productsResponseFormatter
    )

//productosRouter.use(responseFormatter)
productosRouter.use(errorHandler)

export default productosRouter 