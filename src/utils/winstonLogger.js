import { config } from '../config/config.js'
import winston from 'winston'

const levels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5,
}
const colors = {
  fatal: 'red',
  error: 'red',
  warning: 'yellow',
  info: 'blue',
  http: 'cyan',
  debug: 'green italic'
}

const winstonLoggerDev = winston.createLogger({
  levels: levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({colors: colors}),
        winston.format.simple()
      )
    })
  ],
})

const winstonLoggerProd = winston.createLogger({
  levels: levels,
  transports: [
    new winston.transports.File({
      level: "error",
      filename: './errors.log',
      format: winston.format.simple()
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log' })
  ]
})

let winstonLogger
if (config.NODE_ENV === 'production') {
  winstonLogger = winstonLoggerProd
} else {
  winstonLogger = winstonLoggerDev
}

export {winstonLogger}




/*
Possible options are below.
Font styles: bold, dim, italic, underline, inverse, hidden, strikethrough.
Font foreground colors: black, red, green, yellow, blue, magenta, cyan, white, gray, grey.
Background colors: blackBG, redBG, greenBG, yellowBG, blueBG magentaBG, cyanBG, whiteBG
*/