import {CustomError} from '../models/errors/customError.js'
import { winstonLogger as logger } from '../utils/winstonLogger.js'

export const errorHandler = function (err, req, res, next){
    const statusCode = err.statusCode || 500
    logger.fatal(err)
    return res.status(statusCode).send(`Handled error: ${err.message || 'Internal Server Error'}`)
}

export const errorHandlerJson = function (err, req, res, next){
    const statusCode = err.statusCode || 500
    logger.fatal(err)
    return res.status(statusCode).json(`Handled error: ${err.message || 'Internal Server Error'}`)
}
