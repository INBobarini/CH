import {DAOFS} from './_DaoFs.js'
import CartEntity from '../../models/entities/cartsEntity.js'
import { __dirname } from '../../utils.js'


let path = __dirname + '/DAO/DaoFs/database/carritos.json'

export const cartsDAOFS = new DAOFS(CartEntity, path)

//let carts = await cartsDAOFS.readOne({_id:"647e3eb165e4e94bd72913f9"})


