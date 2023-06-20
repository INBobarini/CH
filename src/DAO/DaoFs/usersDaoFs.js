import {DAOFS} from './_DaoFs.js'
import UserEntity from '../../models/usersEntity.js'

let path = '../database/usuarios.json'

export const usersDAOFS = new DAOFS(UserEntity, path)