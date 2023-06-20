import { cartsDAOMongoose } from './DaoMongoose/cartsDaoMongoose.js'
import { productsDAOMongoose } from './DaoMongoose/productsDaoMongoose.js'
import { ticketsDAOMongoose } from './DaoMongoose/ticketsDaoMongoose.js'
import { usersDAOMongoose } from './DaoMongoose/usersDaomongoose.js'
//import { DAOFs} from "./DaoMongoose/_DaoFs.js"; 
//
import {cartsDAOFS} from './DaoFs/cartsDaoFs.js'
import {productsDAOFS} from './DaoFs/productsDaoFs.js'
import {ticketsDAOFS} from './DaoFs/ticketsDaoFs.js'
import {usersDAOFS} from './DaoFs/usersDaoFs.js'

import {config} from '../config/config.js'

let dao = {}

if (config.persistence === 'MONGOOSE'){
    dao.carts = cartsDAOMongoose,
    dao.products = productsDAOMongoose,
    dao.tickets = ticketsDAOMongoose,
    dao.users = usersDAOMongoose
}

if (config.persistence === 'FS'){
    dao.carts = cartsDAOFS,
    dao.products = productsDAOFS,
    dao.tickets = ticketsDAOFS,
    dao.users = usersDAOFS
}

export {dao}
