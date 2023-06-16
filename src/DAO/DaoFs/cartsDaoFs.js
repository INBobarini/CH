import {DAOFS} from './_DaoFs.js'
import CartEntity from '../../models/cartsEntity.js'

let path = '../database/carts.json'

export default cartsDAOFS = new DAOFS(CartEntity, path)

