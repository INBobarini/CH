import {DAOFS} from './_DaoFs.js'
import UserEntity from '../../models/usersEntity.js'

let path = '../database/users.json'

export default productsDAOFS = new DAOFS(UserEntity, path)