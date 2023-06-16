import {DAOFS} from './_DaoFs.js'
import TicketsEntity from '../../models/ticketsEntity.js'

let path = '../database/tickets.json'

export default ticketsDAOFS = new DAOFS(TicketsEntity, path)