import {fileURLToPath} from 'url'
import {dirname} from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname =  dirname(__filename)

import bcrypt from 'bcrypt'
const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

export {__dirname, createHash, isValidPassword}

import {v4 as uuidv4} from 'uuid'

class Uuid {
    constructor(){
        this.uuid = uuidv4()
    }
    toString(){
        return this.uuid
    }
}

export {Uuid}