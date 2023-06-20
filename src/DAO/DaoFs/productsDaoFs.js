import {DAOFS} from './_DaoFs.js'
import ProductEntity from '../../models/productsEntity.js'

let path = '../database/products.json'

export const productsDAOFS = new DAOFS(ProductEntity, path)