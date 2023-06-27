import {CustomError} from '../models/errors/customError.js'
import { winstonLogger as logger } from '../utils/winstonLogger.js'

export const errorHandler = function (err, req, res, next){
    console.log(err)
    return res.status(err.code).send(`${err.name}: ${err.message}`)
}
