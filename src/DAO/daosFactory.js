import { cartsDAOMongoose } from './DaoMongoose/cartsDaoMongoose.js'
import { productsDAOMongoose } from './DaoMongoose/productsDaoMongoose.js'
import { ticketsDAOMongoose } from './DaoMongoose/ticketsDaoMongoose.js'
import { usersDAOMongoose } from './DaoMongoose/usersDaomongoose.js'
//import { DAOFs} from "./DaoMongoose/_DaoFs.js"; 
//daofs no implementado
import {config} from '../config/config.js'

let dao = {}
if (config.persistence === 'MONGOOSE'){
    dao.carts = cartsDAOMongoose,
    dao.products = productsDAOMongoose,
    dao.tickets = ticketsDAOMongoose,
    dao.users = usersDAOMongoose
}

if (config.persistence === 'FS'){
    dao.carts = cartsDAOFs,
    dao.products = productsDAOFs,
    dao.tickets = ticketsDAOFs,
    dao.users = usersDAOFs
}

export {dao}
