import winstonLogger  from '../utils/winstonLogger.js'

export const logger = (req, res, next) => {
    req.logger = winstonLogger
    winstonLogger.info(`${req.method} in ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}

