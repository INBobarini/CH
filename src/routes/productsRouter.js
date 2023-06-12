import {Router} from 'express'
import * as productsController from '../controllers/productsController.js'
import {productsResponseFormatter} from '../middlewares/responseFormatter.js'
import {auth} from '../middlewares/auth.js' 

const productosRouter = Router()

//productosRouter.use(responseFormatter)

productosRouter.route(['/:_id','/'])
.get(
    productsController.handleGet, 
    productsResponseFormatter
    )

productosRouter.route('/')
.post(
    await auth({notUser:true}),
    productsController.handlePost, 
    productsResponseFormatter
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

export default productosRouter 