import httpStatus from 'http-status'
import ApiError from '../utils/ApiError.js'
import logger from '../utils/logger.js'
import { config } from '../config/index.js'

export const errorConverter = (err, req, res, next) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || err.message
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

export const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err

  if (config.environment === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = err.message
  }

  res.locals.errorMessage = message

  const response = {
    code: statusCode,
    message,
    ...(config.environment === 'development' && { stack: err.stack }),
  }

  if (config.environment === 'development') {
    logger.error(err)
  }

  res.status(statusCode).json(response)
}
