import {CustomError} from '../models/errors/customError.js'
import { winstonLogger as logger } from '../utils/winstonLogger.js'

export const errorHandler = function (err, req, res, next){
    return res.status(err.code||500).send(`Handled: ${err.code}, ${err.message}`)
}

export const errorHandlerJson = function (err, req, res, next){
    return res.status(err.code||500).json(`Handled: ${err.code}, ${err.message}`)
}
