import {Router} from 'express'
//import ProductManager from '../controllers/ProductManager.js';
import {pManager} from '../DAO/productManagerDb.js'
import express from 'express'

import * as productsController from '../controllers/productsController.js'
import {productsResponseFormatter} from '../middlewares/responseFormatter.js'

const productosRouter = Router()

//productosRouter.use(responseFormatter)

productosRouter.route(['/:_id','/'])
.get(
    productsController.handleGet, 
    productsResponseFormatter)

productosRouter.route('/').post(productsController.handlePost, productsResponseFormatter)

productosRouter.route('/:_id').put(productsController.handlePut, productsResponseFormatter)

productosRouter.route('/:_id').delete(productsController.handleDelete, productsResponseFormatter)

export default productosRouter 