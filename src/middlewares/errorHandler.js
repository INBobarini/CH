import {customError} from '../../src/models/errors/errorsDictionary.js'

export function errorHandler(error, req, res, next){
    if(error){
        res.status(error.status).json(error, error.type,error.description)
    }
}
