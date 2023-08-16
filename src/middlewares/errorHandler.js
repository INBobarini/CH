import {CustomError} from '../models/errors/customError.js'
import { winstonLogger as logger } from '../utils/winstonLogger.js'

export const errorHandler = function (err, req, res, next){
    if(!res.status) res.status = 500
    return res.send(`Handled error: ${err.message}`)
}

export const errorHandlerJson = function (err, req, res, next){
    if(!res.status) res.status = 500
    return res.json(`${err}`)
}
