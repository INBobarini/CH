import {DAOFS} from './_DaoFs.js'
import ProductEntity from '../../models/productsEntity.js'

let path = '../database/products.json'

export default productsDAOFS = new DAOFS(ProductEntity, path)