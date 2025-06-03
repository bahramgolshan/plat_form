import httpStatus from 'http-status'
import ApiError from '../utils/ApiError.js'
import logger from '../utils/logger.js'

export const errorConverter = (err, req, res, next) => {
  console.log("errorConverter Callen \n")
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || err.message
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

export const errorHandler = (err, req, res, next) => {
  console.log("errorHandler Callen \n")
  const { statusCode, message } = err

  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = err.message
  }

  res.locals.errorMessage = message

  const response = {
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  }

  if (process.env.NODE_ENV === 'development') {
    logger.error(err)
  }

  res.status(statusCode).json(response)
}
