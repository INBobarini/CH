import { config } from '../config/config.js'
import winston from 'winston'

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'bold red whiteBG',
    error: 'red',
    warning: 'orange',
    info: 'blue',
    http: 'cyan',
    debug: 'green italic',
  }
}

const winstonLoggerDev = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({colors: customLevels.colors}),
        winston.format.simple()
      )
    })
  ]
})

const winstonLoggerProd = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.File({
      level: "info",
      filename: './errors.log',
      format: winston.format.simple()
    })
  ]
})

let winstonLogger
if (config.NODE_ENV === 'production') {
  winstonLogger = winstonLoggerProd
} else {
  winstonLogger = winstonLoggerDev
}

export default winstonLogger




/*
Possible options are below.
Font styles: bold, dim, italic, underline, inverse, hidden, strikethrough.
Font foreground colors: black, red, green, yellow, blue, magenta, cyan, white, gray, grey.
Background colors: blackBG, redBG, greenBG, yellowBG, blueBG magentaBG, cyanBG, whiteBG
*/