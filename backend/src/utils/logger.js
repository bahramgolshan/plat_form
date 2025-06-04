import winston from 'winston'
import { config } from '../config/index.js'

const isProduction = config.environment === 'production'

const transports = [
  new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  new winston.transports.File({ filename: 'logs/combined.log' }),
]

if (!isProduction) {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    })
  )
}

const logger = winston.createLogger({
  level: isProduction ? 'info' : 'debug',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports,
})

export default logger
