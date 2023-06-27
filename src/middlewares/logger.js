import {winstonLogger}  from '../utils/winstonLogger.js'

export const logger = (req, res, next) => {
    req.logger = winstonLogger
    if((req.url==='/loggerTest'))return next()//to avoid infinite loop
    req.logger.http(`${req.method} in ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}


